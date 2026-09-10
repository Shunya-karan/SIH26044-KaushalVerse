import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button, Badge } from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { Users, CheckCircle2, UserX, Clock, FileText } from 'lucide-react';
import { toast } from 'sonner';

export const ApplicationManagement = () => {
  const { applicantCandidates, updateCandidateStatus } = useApp();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Application Review Management"
        subtitle="Screen incoming student submissions, inspect ATS transcripts, and manage hiring pipeline status."
        breadcrumbs={[{ label: 'Dashboard', link: '/company/dashboard' }, { label: 'Applications' }]}
      />

      <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-border text-subtext font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">College & Degree</th>
                <th className="p-4">Applied Role</th>
                <th className="p-4">Match Score</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {applicantCandidates.map((cand) => (
                <tr key={cand.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-bold text-main">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-[10px]">
                        {cand.avatar}
                      </div>
                      <span>{cand.studentName}</span>
                    </div>
                  </td>
                  <td className="p-4 text-subtext">
                    <p className="text-main font-medium">{cand.college}</p>
                    <p className="text-[11px]">{cand.degree}</p>
                  </td>
                  <td className="p-4 font-semibold text-main">{cand.roleApplied}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded font-bold bg-emerald-50 text-secondary border border-emerald-200">
                      {cand.matchScore}%
                    </span>
                  </td>
                  <td className="p-4">
                    <Badge variant={cand.status === 'Shortlisted' ? 'secondary' : 'default'}>
                      {cand.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right space-x-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        updateCandidateStatus(cand.id, 'Shortlisted');
                        toast.success(`Candidate ${cand.studentName} shortlisted!`);
                      }}
                    >
                      Shortlist
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        updateCandidateStatus(cand.id, 'Rejected');
                        toast.info(`Candidate ${cand.studentName} rejected.`);
                      }}
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
