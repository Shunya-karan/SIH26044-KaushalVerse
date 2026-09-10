import { useState } from 'react';
import { GitCompare, Target, CheckCircle2, XCircle, Info } from 'lucide-react';
import { PageHeader } from '@/components/common/Shared';
import { MatchScore } from '@/components/dashboard';
import { SkillBadge } from '@/components/opportunities';
import { Card, Button, Progress } from '@/components/ui';
import { SkillRadarChart } from '@/components/charts';
import { careerRoles } from '@/data/mockSkills';
import { mockStudents } from '@/data/mockStudents';

export default function SkillGap() {
  const [selectedRole, setSelectedRole] = useState(careerRoles[0]);
  const student = mockStudents[0];
  const studentSkillsList = student.skills;

  const required = selectedRole.requiredSkills;
  const matched = required.filter(r => studentSkillsList.includes(r.name)).map(r => r.name);
  const missing = required.filter(r => !studentSkillsList.includes(r.name)).map(r => r.name);
  const matchScore = Math.round((matched.length / required.length) * 100);

  const radarData = required.slice(0, 8).map(r => ({
    skill: r.name,
    current: studentSkillsList.includes(r.name) ? 80 : 0,
    required: 100,
  }));

  const importanceColors = { Critical: 'error', Important: 'warning', Preferred: 'default' };

  return (
    <div className="space-y-6">
      <PageHeader title="Skill Gap Analysis" subtitle="Compare your skills against target career roles" icon={GitCompare} />

      <Card className="p-5">
        <p className="text-sm font-medium text-main mb-3">Select Target Career Role</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {careerRoles.map(role => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role)}
              className={`rounded-lg border p-3 text-sm font-medium transition-all text-left ${
                selectedRole.id === role.id ? 'border-primary bg-primary-soft text-primary' : 'border-border bg-white text-text-secondary hover:bg-bg'
              }`}
            >
              {role.name}
            </button>
          ))}
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 flex flex-col items-center justify-center">
          <p className="text-sm text-text-secondary mb-3">Match Score for {selectedRole.name}</p>
          <MatchScore score={matchScore} size="lg" />
          <p className="mt-3 text-sm text-text-secondary text-center">
            You match {matched.length} of {required.length} required skills
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-main mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-success" />Matched Skills ({matched.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {matched.length > 0 ? matched.map(s => <SkillBadge key={s} skill={s} variant="matched" />)
              : <p className="text-sm text-text-muted">No matching skills yet.</p>}
          </div>
          <h3 className="font-semibold text-main mt-5 mb-3 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-error" />Missing Skills ({missing.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {missing.length > 0 ? missing.map(s => <SkillBadge key={s} skill={s} variant="missing" />)
              : <p className="text-sm text-success">No missing skills — you're fully matched!</p>}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-main mb-3">Skill Comparison</h3>
          <SkillRadarChart data={radarData} height={250} />
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-main">Explain My Score</h3>
            <p className="mt-2 text-sm text-text-secondary leading-relaxed">
              Your score is <span className="font-bold text-primary">{matchScore}%</span> because you match {matched.length} of {required.length} core skills required for the {selectedRole.name} role.
              {missing.length > 0 && ` To improve your score, focus on learning: ${missing.join(', ')}.`}
            </p>
            <div className="mt-4 space-y-2">
              {required.map(r => (
                <div key={r.name} className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">{r.name}</span>
                  <div className="flex items-center gap-2">
                    {studentSkillsList.includes(r.name) ? (
                      <SkillBadge skill="Matched" variant="matched" />
                    ) : (
                      <SkillBadge skill="Missing" variant="missing" />
                    )}
                    <span className={`text-xs font-medium ${
                      r.importance === 'Critical' ? 'text-error' : r.importance === 'Important' ? 'text-warning' : 'text-text-muted'
                    }`}>{r.importance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
