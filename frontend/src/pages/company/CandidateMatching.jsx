import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button, Badge } from '../../components/ui';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  UserCheck,
  UserX,
  Calendar,
  Building,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';
import { toast } from 'sonner';

export const CandidateMatching = () => {
  const { applicantCandidates, updateCandidateStatus, opportunities } = useApp();
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('Frontend Developer Intern');

  const filteredCandidates = applicantCandidates.filter(c =>
    selectedRoleFilter === 'All' || c.roleApplied === selectedRoleFilter
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Smart Candidate Matching"
        subtitle="Algorithmic talent ranking for campus hiring based on verified student competencies and project artifacts."
        breadcrumbs={[{ label: 'Dashboard', link: '/company/dashboard' }, { label: 'Candidate Matching' }]}
        badge={
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
            <Sparkles className="w-3.5 h-3.5" />
            Transparent SIH Matching
          </span>
        }
      />

      {/* Role Selector Header */}
      <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-subtext">Active Position Filter</span>
          <h2 className="text-lg font-bold text-main mt-0.5">{selectedRoleFilter}</h2>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <label className="font-semibold text-subtext">Select Listing:</label>
          <select
            value={selectedRoleFilter}
            onChange={(e) => setSelectedRoleFilter(e.target.value)}
            className="p-2 rounded-lg border border-border bg-slate-50 focus:bg-white text-xs outline-none font-medium"
          >
            <option value="Frontend Developer Intern">Frontend Developer Intern (Razorpay)</option>
            <option value="Backend API Engineer">Backend API Engineer (Razorpay)</option>
            <option value="All">All Applied Positions</option>
          </select>
        </div>
      </div>

      {/* Candidates Ranked Feed */}
      <div className="space-y-6">
        {filteredCandidates.map((cand, index) => (
          <div
            key={cand.id}
            className="bg-surface rounded-2xl border border-border p-6 shadow-subtle hover:border-primary/50 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center shadow-xs shrink-0">
                  {cand.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-main">{cand.studentName}</h3>
                    <span className="text-xs text-subtext">#{index + 1} Ranked</span>
                  </div>
                  <p className="text-xs text-subtext">
                    {cand.college} &bull; {cand.degree} &bull; CGPA: <strong className="text-main">{cand.cgpa}</strong>
                  </p>
                </div>
              </div>

              {/* Match Score Badge */}
              <div className="text-right shrink-0">
                <span className="text-2xl font-black text-secondary">{cand.matchScore}%</span>
                <p className="text-[10px] text-subtext uppercase font-semibold">Match Score</p>
              </div>
            </div>

            {/* Why this candidate matches (Transparent Rationality) */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-950 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-secondary" />
                Transparent Match Rationale:
              </div>
              <p className="text-emerald-900 leading-relaxed text-[11px]">
                {cand.matchReason}
              </p>
            </div>

            {/* Matched vs Missing Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-semibold text-main block mb-1">Matched Required Skills:</span>
                <div className="flex flex-wrap gap-1.5">
                  {cand.matchedSkills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-secondary" />
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-semibold text-main block mb-1">Missing / In-Progress Skills:</span>
                <div className="flex flex-wrap gap-1.5">
                  {cand.missingSkills.length > 0 ? (
                    cand.missingSkills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-orange-50 text-orange-800 border border-orange-200 font-medium text-[11px]">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-[11px] text-muted">All mandatory skills matched!</span>
                  )}
                </div>
              </div>
            </div>

            {/* Recruiter Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/80 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-subtext">Current Status:</span>
                <Badge variant={cand.status === 'Shortlisted' ? 'secondary' : cand.status === 'Rejected' ? 'error' : 'default'}>
                  {cand.status}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.info(`Viewing verified academic transcript for ${cand.studentName}`)}
                >
                  View Transcript
                </Button>

                {cand.status !== 'Shortlisted' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={UserCheck}
                    onClick={() => {
                      updateCandidateStatus(cand.id, 'Shortlisted');
                      toast.success(`Shortlisted ${cand.studentName} for Technical Interview!`);
                    }}
                  >
                    Shortlist Candidate
                  </Button>
                )}

                {cand.status !== 'Rejected' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-subtext hover:text-error"
                    onClick={() => {
                      updateCandidateStatus(cand.id, 'Rejected');
                      toast.info(`Candidate marked as not selected.`);
                    }}
                  >
                    Reject
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
