import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button, Badge } from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { careerRoles } from '../../data/mockSkills';
import { calculateSkillMatch } from '../../lib/matchCalculator';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Target, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, Info, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SkillGapAnalysis = () => {
  const { skills, targetRoleId, setTargetRoleId } = useApp();

  const currentRole = careerRoles.find(r => r.id === targetRoleId) || careerRoles[0];

  const matchResult = calculateSkillMatch(
    skills,
    currentRole.coreSkills,
    currentRole.optionalSkills
  );

  // Radar dataset comparing student competency vs required benchmark
  const radarData = [
    {
      subject: 'Core Programming',
      Student: skills.some(s => s.name === 'JavaScript' || s.name === 'Python') ? 90 : 50,
      Industry: 85,
    },
    {
      subject: 'Frameworks',
      Student: skills.some(s => s.name === 'React') ? 92 : 45,
      Industry: 85,
    },
    {
      subject: 'Backend & APIs',
      Student: skills.some(s => s.name === 'Node.js' || s.name === 'REST APIs') ? 80 : 40,
      Industry: 80,
    },
    {
      subject: 'Databases (SQL)',
      Student: skills.some(s => s.name === 'SQL') ? 85 : 50,
      Industry: 80,
    },
    {
      subject: 'Containerization',
      Student: skills.some(s => s.name === 'Docker') ? 35 : 20,
      Industry: 75,
    },
    {
      subject: 'Testing & QA',
      Student: skills.some(s => s.name.includes('Testing')) ? 30 : 25,
      Industry: 70,
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Skill Gap Analysis Engine"
        subtitle="Mathematical comparison of your verified competencies against industry hiring benchmarks."
        breadcrumbs={[{ label: 'Dashboard', link: '/student/dashboard' }, { label: 'Skill Gap' }]}
        badge={<Badge variant="secondary">Deterministic SIH Algorithm</Badge>}
      />

      {/* Target Role Selector Bar */}
      <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-subtext">
          Select Target Career Pathway
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {careerRoles.map((role) => (
            <button
              key={role.id}
              onClick={() => setTargetRoleId(role.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                targetRoleId === role.id
                  ? 'bg-primary-soft border-primary text-primary font-bold shadow-xs'
                  : 'bg-slate-50/70 border-border text-main hover:bg-slate-100 font-medium'
              }`}
            >
              <p className="text-xs">{role.title}</p>
              <p className="text-[10px] text-subtext mt-0.5">{role.averageCtc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Core Gap Summary Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Score Card */}
        <div className="lg:col-span-4 bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-subtext">Role Match Score</span>
            <Badge variant={matchResult.matchScore >= 80 ? 'success' : matchResult.matchScore >= 60 ? 'warning' : 'error'}>
              {matchResult.matchScore >= 80 ? 'High Readiness' : 'Gap Exists'}
            </Badge>
          </div>

          <div className="text-center py-4">
            <span className="text-5xl font-black text-primary tracking-tight">
              {matchResult.matchScore}%
            </span>
            <p className="text-xs font-semibold text-main mt-2">
              {currentRole.title}
            </p>
            <p className="text-[11px] text-subtext">
              {matchResult.totalMatched} of {matchResult.totalRequired} Core Skills Possessed
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-500"
              style={{ width: `${matchResult.matchScore}%` }}
            />
          </div>

          {/* Transparent Score Explanation */}
          <div className="p-3.5 rounded-xl bg-primary-soft/60 border border-primary-light text-xs space-y-1">
            <div className="flex items-center gap-1 text-primary font-bold text-[11px]">
              <Info className="w-3.5 h-3.5" />
              Explain My Score
            </div>
            <p className="text-primary-950 text-[11px] leading-relaxed">
              {matchResult.explanation}
            </p>
          </div>

          <Link to="/student/roadmap" className="block">
            <Button variant="roadmap" size="sm" className="w-full" icon={BookOpen}>
              Start Targeted Learning Plan
            </Button>
          </Link>
        </div>

        {/* Right: Radar Chart Visualization */}
        <div className="lg:col-span-8 bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-main">Competency Radar Comparison</h3>
              <p className="text-xs text-subtext">Visualizing your skill depth against market demand</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 font-semibold text-primary">
                <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
                Your Profile
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block"></span>
                Industry Standard
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Radar name="Your Profile" dataKey="Student" stroke="#0F766E" fill="#0F766E" fillOpacity={0.4} />
                <Radar name="Industry Standard" dataKey="Industry" stroke="#94A3B8" fill="#94A3B8" fillOpacity={0.15} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Matched vs Missing Skills Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matched Skills */}
        <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary" />
              Matched Core Skills ({matchResult.matchedSkills.length})
            </h3>
            <span className="text-xs text-secondary font-bold">Acquired</span>
          </div>

          <div className="space-y-2">
            {matchResult.matchedSkills.map((skill) => (
              <div key={skill} className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-950">{skill}</span>
                <span className="text-[11px] text-emerald-800 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                  Verified in Profile
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Missing Skills (The Gap) */}
        <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="text-sm font-bold text-orange-950 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-accent" />
              Missing Skills to Bridge ({matchResult.missingSkills.length})
            </h3>
            <span className="text-xs text-accent font-bold">Required Gap</span>
          </div>

          <div className="space-y-2">
            {matchResult.missingSkills.map((skill) => (
              <div key={skill} className="p-3 rounded-xl bg-orange-50/60 border border-orange-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-orange-950">{skill}</span>
                  <p className="text-[10px] text-orange-800">Critical prerequisite for {currentRole.title}</p>
                </div>
                <Link to="/student/roadmap">
                  <span className="text-xs font-semibold text-accent hover:underline">
                    View Course &rarr;
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
