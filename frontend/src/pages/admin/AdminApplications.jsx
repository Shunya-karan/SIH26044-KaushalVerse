import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Badge } from '../../components/ui';
import { useApp } from '../../context/AppContext';

export const AdminApplications = () => {
  const { applicantCandidates } = useApp();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cross-Institutional Application Pipeline"
        subtitle="Monitor application throughput and corporate selection ratios."
        breadcrumbs={[{ label: 'Dashboard', link: '/admin/dashboard' }, { label: 'Applications Flow' }]}
      />

      <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-4">
        <h3 className="text-sm font-bold text-main">Active Submissions (Cross-College)</h3>
        <div className="space-y-3">
          {applicantCandidates.map((c) => (
            <div key={c.id} className="p-4 rounded-xl bg-slate-50 border border-border flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-main">{c.studentName} &bull; {c.roleApplied}</p>
                <p className="text-subtext text-[11px]">{c.college} &bull; Match: <strong>{c.matchScore}%</strong></p>
              </div>
              <Badge variant={c.status === 'Shortlisted' ? 'secondary' : 'default'}>
                {c.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
