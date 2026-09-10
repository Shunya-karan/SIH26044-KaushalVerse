import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui';
import { toast } from 'sonner';

export const StudentSettings = () => {
  const [allowMatching, setAllowMatching] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Student Settings"
        subtitle="Manage your privacy, candidate matching visibility, and notification preferences."
        breadcrumbs={[{ label: 'Dashboard', link: '/student/dashboard' }, { label: 'Settings' }]}
      />

      <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-6 text-xs">
        <h3 className="text-sm font-bold text-main border-b border-border pb-3">Privacy & Recruiter Discovery</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-main">Smart Recruiter Candidate Matching</p>
            <p className="text-subtext">Allow verified corporate hiring managers to discover your profile in ranked candidate lists.</p>
          </div>
          <input
            type="checkbox"
            checked={allowMatching}
            onChange={(e) => {
              setAllowMatching(e.target.checked);
              toast.success('Matching preferences updated.');
            }}
            className="h-4 w-4 text-primary rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-main">Interview & Shortlist Alerts</p>
            <p className="text-subtext">Receive immediate email alerts when a company moves your application to the interview stage.</p>
          </div>
          <input
            type="checkbox"
            checked={emailAlerts}
            onChange={(e) => {
              setEmailAlerts(e.target.checked);
              toast.success('Alert preferences updated.');
            }}
            className="h-4 w-4 text-primary rounded"
          />
        </div>
      </div>
    </div>
  );
};
