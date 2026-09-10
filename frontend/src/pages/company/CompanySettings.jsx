import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui';
import { toast } from 'sonner';

export const CompanySettings = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Company Settings"
        subtitle="Manage recruitment team permissions, candidate notifications, and interview integrations."
        breadcrumbs={[{ label: 'Dashboard', link: '/company/dashboard' }, { label: 'Settings' }]}
      />

      <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-4 text-xs">
        <h3 className="text-sm font-bold text-main border-b border-border pb-3">Automated Candidate Match Threshold</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-main">Highlight Candidates with ≥ 80% Skill Match</p>
            <p className="text-subtext">Sends daily digest of high-compatibility applicants.</p>
          </div>
          <input type="checkbox" defaultChecked className="h-4 w-4 text-primary rounded" />
        </div>
      </div>
    </div>
  );
};
