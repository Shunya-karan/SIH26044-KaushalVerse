import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { SIH_SKILLS_INITIAL } from '@/data/sihDemoData';
import { useAuth } from '@/context/AuthContext';

const SIHContext = createContext(null);
const DEMO_STORAGE_KEY = 'kv_sih_demo_state';
const STUDENT_STORAGE_PREFIX = 'kv_sih_student_state_';
const GLOBAL_VERIFICATION_KEY = 'kv_sih_verification_requests';

const createStudentState = () => ({
  skills: [],
  assessmentResults: {},
  assessmentCompleted: false,
  improved: false,
  evaluationSaved: false,
  verificationRequests: [],
  projects: [],
});

const DEFAULT_DEMO_STATE = {
  skills: SIH_SKILLS_INITIAL,
  assessmentResults: {},
  assessmentCompleted: false,
  improved: false,
  evaluationSaved: false,
  verificationRequests: [],
  projects: [],
};

const readStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : { ...fallback, ...parsed };
  } catch {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export function SIHProvider({ children }) {
  const { user } = useAuth();
  const isRealStudent = user?.role === 'student' && !user?.isDemo;
  const storageKey = isRealStudent && user?.email
    ? `${STUDENT_STORAGE_PREFIX}${user.email.toLowerCase()}`
    : DEMO_STORAGE_KEY;

  const [state, setState] = useState(() => {
    const base = isRealStudent ? readStorage(storageKey, createStudentState()) : readStorage(DEMO_STORAGE_KEY, DEFAULT_DEMO_STATE);
    const globalRequests = readStorage(GLOBAL_VERIFICATION_KEY, []);
    const verificationRequests = isRealStudent
      ? globalRequests.filter((request) => request.studentEmail?.toLowerCase() === user?.email?.toLowerCase())
      : user?.role === 'faculty'
        ? globalRequests
        : base.verificationRequests || [];
    return { ...base, verificationRequests };
  });

  useEffect(() => {
    const next = isRealStudent
      ? readStorage(storageKey, createStudentState())
      : readStorage(DEMO_STORAGE_KEY, DEFAULT_DEMO_STATE);
    const globalRequests = readStorage(GLOBAL_VERIFICATION_KEY, []);
    const verificationRequests = isRealStudent
      ? globalRequests.filter((request) => request.studentEmail?.toLowerCase() === user?.email?.toLowerCase())
      : user?.role === 'faculty'
        ? globalRequests
        : next.verificationRequests || [];
    setState({ ...next, verificationRequests });
  }, [isRealStudent, storageKey, user?.role, user?.email]);

  const persist = useCallback((next) => {
    setState(next);
    writeStorage(storageKey, next);
  }, [storageKey]);

  const resetDemo = useCallback(() => {
    const next = isRealStudent ? createStudentState() : DEFAULT_DEMO_STATE;
    persist(next);
  }, [isRealStudent, persist]);

  const addSkill = useCallback((skillName, level = 'Intermediate') => {
    if (state.skills.some((s) => s.name === skillName)) return false;
    const levelMap = { Beginner: 2, Intermediate: 3, Advanced: 4 };
    const newSkill = {
      id: `skill-${Date.now()}`,
      name: skillName,
      category: 'Added Skill',
      demand: 'High',
      score: 0,
      level: levelMap[level] || 3,
      proficiency: level,
      target: 4,
      verified: false,
      evidence: ['Self Declared'],
      assessed: 'Not assessed',
      verificationStatus: 'Not Submitted',
    };
    persist({ ...state, skills: [...state.skills, newSkill] });
    return true;
  }, [persist, state]);

  const addProject = useCallback((project) => {
    const id = `project-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const now = new Date().toISOString();
    const nextProject = { ...project, id, createdAt: now, updatedAt: now };
    persist({ ...state, projects: [...(state.projects || []), nextProject] });
    return nextProject;
  }, [persist, state]);

  const updateProject = useCallback((projectId, updates) => {
    const now = new Date().toISOString();
    const nextProjects = (state.projects || []).map((project) => project.id === projectId
      ? { ...project, ...updates, updatedAt: now }
      : project
    );
    persist({ ...state, projects: nextProjects });
    return nextProjects.find((project) => project.id === projectId) || null;
  }, [persist, state]);

  const deleteProject = useCallback((projectId) => {
    const nextProjects = (state.projects || []).filter((project) => project.id !== projectId);
    persist({ ...state, projects: nextProjects });
    return true;
  }, [persist, state]);

  const submitEvidence = useCallback((skillName, evidence) => {
    const request = {
      id: `vr-${Date.now()}`,
      student: user?.name || 'Student',
      studentEmail: user?.email?.toLowerCase() || '',
      skill: skillName,
      submittedAt: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Pending Institute Review',
      evidence,
    };
    const nextSkills = state.skills.map((s) => s.name === skillName ? {
      ...s,
      evidence: [...new Set([...(s.evidence || []).filter((e) => e !== 'Self Declared'), ...evidence.map((e) => e.type)])],
      verificationStatus: 'Pending Institute Review',
      verified: false,
    } : s);
    const globalRequests = readStorage(GLOBAL_VERIFICATION_KEY, []);
    writeStorage(GLOBAL_VERIFICATION_KEY, [...globalRequests, request]);
    persist({
      ...state,
      skills: nextSkills,
      verificationRequests: [...(state.verificationRequests || []), request],
    });
  }, [persist, state, user]);

  const verifyEvidence = useCallback((requestId, approved = true) => {
    const globalRequests = readStorage(GLOBAL_VERIFICATION_KEY, []);
    const target = globalRequests.find((r) => r.id === requestId);
    if (!target) return;
    const updatedRequests = globalRequests.map((r) => r.id === requestId
      ? { ...r, status: approved ? 'Institute Verified' : 'Rejected', reviewedAt: new Date().toISOString() }
      : r
    );
    writeStorage(GLOBAL_VERIFICATION_KEY, updatedRequests);

    if (target.studentEmail) {
      const studentKey = `${STUDENT_STORAGE_PREFIX}${target.studentEmail.toLowerCase()}`;
      const studentState = readStorage(studentKey, createStudentState());
      const nextStudentRequests = updatedRequests.filter((r) => r.studentEmail?.toLowerCase() === target.studentEmail?.toLowerCase());
      const nextStudentSkills = studentState.skills.map((s) => s.name === target.skill
        ? {
            ...s,
            verified: approved,
            verificationStatus: approved ? 'Institute Verified' : 'Rejected',
            evidence: approved ? [...new Set([...(s.evidence || []), 'Institute Verified'])] : s.evidence,
          }
        : s
      );
      writeStorage(studentKey, { ...studentState, skills: nextStudentSkills, verificationRequests: nextStudentRequests });
    }

    const nextSkills = target.studentEmail?.toLowerCase() === user?.email?.toLowerCase()
      ? state.skills.map((s) => s.name === target.skill
          ? { ...s, verified: approved, verificationStatus: approved ? 'Institute Verified' : 'Rejected', evidence: approved ? [...new Set([...(s.evidence || []), 'Institute Verified'])] : s.evidence }
          : s)
      : state.skills;
    const visibleRequests = user?.role === 'faculty' ? updatedRequests : updatedRequests.filter((r) => r.studentEmail?.toLowerCase() === user?.email?.toLowerCase());
    persist({ ...state, skills: nextSkills, verificationRequests: visibleRequests });
  }, [persist, state, user]);

  const completeAssessment = useCallback((skill, score) => {
    const targetScore = Math.min(100, Math.max(0, score));
    const level = targetScore >= 80 ? 'Advanced' : targetScore >= 60 ? 'Intermediate' : 'Beginner';
    const nextSkills = state.skills.map((s) => s.name === skill
      ? {
          ...s,
          score: targetScore,
          level: level === 'Advanced' ? 4 : level === 'Intermediate' ? 3 : 2,
          proficiency: level,
          evidence: [...new Set([...(s.evidence || []).filter((e) => e !== 'Self Declared'), 'Assessment'])],
          assessed: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
          assessedStatus: 'Completed',
        }
      : s
    );
    const nextResults = {
      ...(state.assessmentResults || {}),
      [skill]: {
        score: targetScore,
        level,
        attempts: ((state.assessmentResults || {})[skill]?.attempts || 0) + 1,
        assessed: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      },
    };
    persist({ ...state, skills: nextSkills, assessmentResults: nextResults, assessmentCompleted: true, improved: true });
  }, [persist, state]);

  const saveEvaluation = useCallback((scores) => {
    const nextSkills = state.skills.map((s) => {
      const match = scores.find((x) => x.name === s.name);
      if (!match) return s;
      const score = Math.max(s.score, Math.min(100, match.score * 20));
      return {
        ...s,
        score,
        level: Math.max(s.level, match.score),
        verified: true,
        evidence: [...new Set([...(s.evidence || []), 'Industry Verified'])],
        assessed: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      };
    });
    persist({ ...state, skills: nextSkills, evaluationSaved: true });
  }, [persist, state]);

  const value = useMemo(() => ({
    ...state,
    resetDemo,
    addSkill,
    submitEvidence,
    addProject,
    updateProject,
    deleteProject,
    verifyEvidence,
    completeAssessment,
    saveEvaluation,
  }), [state, resetDemo, addSkill, submitEvidence, addProject, updateProject, deleteProject, verifyEvidence, completeAssessment, saveEvaluation]);

  return <SIHContext.Provider value={value}>{children}</SIHContext.Provider>;
}

export function useSIH() {
  const ctx = useContext(SIHContext);
  if (!ctx) throw new Error('useSIH must be used within SIHProvider');
  return ctx;
}
