import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { SIH_SKILLS_INITIAL } from '@/data/sihDemoData';

const SIHContext = createContext(null);
const STORAGE_KEY = 'kv_sih_demo_state';

const DEFAULT_STATE = {
  skills: SIH_SKILLS_INITIAL,
  assessmentResults: {},
  assessmentCompleted: false,
  improved: false,
  evaluationSaved: false,
  verificationRequests: [],
};

const loadState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...DEFAULT_STATE, ...JSON.parse(saved) } : DEFAULT_STATE;
  } catch { return DEFAULT_STATE; }
};

export function SIHProvider({ children }) {
  const [state, setState] = useState(loadState);
  const persist = useCallback((next) => { setState(next); localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); }, []);
  const resetDemo = useCallback(() => persist(DEFAULT_STATE), [persist]);

  const addSkill = useCallback((skillName, level = 'Intermediate') => {
    if (state.skills.some((s) => s.name === skillName)) return false;
    const levelMap = { Beginner: 2, Intermediate: 3, Advanced: 4 };
    const newSkill = {
      id: `skill-${Date.now()}`, name: skillName, category: 'Added Skill', demand: 'High',
      score: 0, level: levelMap[level] || 3, proficiency: level, target: 4,
      verified: false, evidence: ['Self Declared'], assessed: 'Not assessed', verificationStatus: 'Not Submitted',
    };
    persist({ ...state, skills: [...state.skills, newSkill] });
    return true;
  }, [persist, state]);

  const submitEvidence = useCallback((skillName, evidence) => {
    const request = {
      id: `vr-${Date.now()}`, student: 'Aarav Sharma', skill: skillName,
      submittedAt: 'Sep 11, 2026', status: 'Pending Institute Review', evidence,
    };
    const nextSkills = state.skills.map((s) => s.name === skillName ? {
      ...s, evidence: [...new Set([...(s.evidence || []).filter((e) => e !== 'Self Declared'), ...evidence.map((e) => e.type)])],
      verificationStatus: 'Pending Institute Review', verified: false,
    } : s);
    persist({ ...state, skills: nextSkills, verificationRequests: [...(state.verificationRequests || []), request] });
  }, [persist, state]);

  const verifyEvidence = useCallback((requestId, approved = true) => {
    const requests = (state.verificationRequests || []).map((r) => r.id === requestId ? { ...r, status: approved ? 'Institute Verified' : 'Rejected' } : r);
    const target = (state.verificationRequests || []).find((r) => r.id === requestId);
    const nextSkills = target ? state.skills.map((s) => s.name === target.skill ? { ...s, verified: approved, verificationStatus: approved ? 'Institute Verified' : 'Rejected', evidence: approved ? [...new Set([...(s.evidence || []), 'Institute Verified'])] : s.evidence } : s) : state.skills;
    persist({ ...state, skills: nextSkills, verificationRequests: requests });
  }, [persist, state]);

  const completeAssessment = useCallback((skill, score) => {
    const targetScore = Math.min(100, Math.max(0, score));
    const level = targetScore >= 80 ? 'Advanced' : targetScore >= 60 ? 'Intermediate' : 'Beginner';
    const nextSkills = state.skills.map((s) => s.name === skill ? { ...s, score: targetScore, level: level === 'Advanced' ? 4 : level === 'Intermediate' ? 3 : 2, proficiency: level, evidence: [...new Set([...(s.evidence || []).filter(e => e !== 'Self Declared'), 'Assessment'])], assessed: 'Sep 11, 2026', assessedStatus: 'Completed' } : s);
    const nextResults = { ...(state.assessmentResults || {}), [skill]: { score: targetScore, level, attempts: ((state.assessmentResults || {})[skill]?.attempts || 0) + 1, assessed: 'Sep 11, 2026' } };
    persist({ ...state, skills: nextSkills, assessmentResults: nextResults, assessmentCompleted: true, improved: true });
  }, [persist, state]);

  const saveEvaluation = useCallback((scores) => {
    const nextSkills = state.skills.map((s) => {
      const match = scores.find((x) => x.name === s.name); if (!match) return s;
      const score = Math.max(s.score, Math.min(100, match.score * 20));
      return { ...s, score, level: Math.max(s.level, match.score), verified: true, evidence: [...new Set([...(s.evidence || []), 'Industry Verified'])], assessed: 'Sep 11, 2026' };
    });
    persist({ ...state, skills: nextSkills, evaluationSaved: true });
  }, [persist, state]);

  const value = useMemo(() => ({ ...state, resetDemo, addSkill, submitEvidence, verifyEvidence, completeAssessment, saveEvaluation }), [state, resetDemo, addSkill, submitEvidence, verifyEvidence, completeAssessment, saveEvaluation]);
  return <SIHContext.Provider value={value}>{children}</SIHContext.Provider>;
}
export function useSIH() { const ctx = useContext(SIHContext); if (!ctx) throw new Error('useSIH must be used within SIHProvider'); return ctx; }
