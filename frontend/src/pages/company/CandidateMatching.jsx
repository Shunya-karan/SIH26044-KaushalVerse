import { useState } from 'react';
import { Users, Info } from 'lucide-react';
import { PageHeader } from '@/components/common/Shared';
import { MatchScore } from '@/components/dashboard';
import { SkillBadge } from '@/components/opportunities';
import { Card, Badge, Avatar, Select, Button } from '@/components/ui';
import { mockOpportunities } from '@/data/mockOpportunities';
import { mockStudents } from '@/data/mockStudents';

export default function CandidateMatching() {
  const [selectedOpp, setSelectedOpp] = useState(mockOpportunities[0]);

  const candidates = mockStudents.map(student => {
    const matched = selectedOpp.requiredSkills.filter(s => student.skills.includes(s));
    const missing = selectedOpp.requiredSkills.filter(s => !student.skills.includes(s));
    const score = Math.round((matched.length / selectedOpp.requiredSkills.length) * 100);
    return { ...student, matched, missing, score };
  }).sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-6">
      <PageHeader title="Smart Candidate Matching" subtitle="Transparent, explainable candidate ranking" icon={Users} />

      <Card className="p-5">
        <Select label="Select Opportunity" value={selectedOpp.id} onChange={e => setSelectedOpp(mockOpportunities.find(o => o.id === e.target.value))}>
          {mockOpportunities.map(o => <option key={o.id} value={o.id}>{o.title} — {o.companyName}</option>)}
        </Select>
      </Card>

      <Card className="p-5 bg-primary-soft/30">
        <div className="flex items-center gap-3">
          <Info className="w-5 h-5 text-primary shrink-0" />
          <p className="text-sm text-text-secondary">
            Candidates are ranked by transparent match scores. Each score is calculated as (matched skills / required skills) × 100. No black-box AI.
          </p>
        </div>
      </Card>

      <div className="space-y-4">
        {candidates.map((candidate, i) => (
          <Card key={candidate.id} className="p-5">
            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="text-lg font-bold text-text-muted w-6">#{i + 1}</div>
                <Avatar name={candidate.name} size="md" />
                <div>
                  <h3 className="font-semibold text-main">{candidate.name}</h3>
                  <p className="text-sm text-text-secondary">{candidate.college} · {candidate.branch}</p>
                  <p className="text-xs text-text-muted">CGPA: {candidate.cgpa} · {candidate.graduationYear}</p>
                </div>
              </div>
              <MatchScore score={candidate.score} size="md" />
            </div>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-success mb-1.5">Matched Skills ({candidate.matched.length})</p>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.matched.length > 0 ? candidate.matched.map(s => <SkillBadge key={s} skill={s} variant="matched" />)
                    : <span className="text-xs text-text-muted">No matching skills</span>}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-error mb-1.5">Missing Skills ({candidate.missing.length})</p>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.missing.length > 0 ? candidate.missing.map(s => <SkillBadge key={s} skill={s} variant="missing" />)
                    : <span className="text-xs text-success">Fully matched!</span>}
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-text-secondary">
                <span className="font-medium text-main">Why this candidate matches:</span> {candidate.name} has {candidate.matched.length} of {selectedOpp.requiredSkills.length} required skills ({candidate.score}% match).
                {candidate.missing.length > 0 && ` Missing: ${candidate.missing.join(', ')}.`}
              </p>
              <div className="mt-3 flex gap-2">
                <Button variant="secondary" size="sm">View Profile</Button>
                <Button variant="secondary" size="sm">View Resume</Button>
                <Button size="sm">Shortlist</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
