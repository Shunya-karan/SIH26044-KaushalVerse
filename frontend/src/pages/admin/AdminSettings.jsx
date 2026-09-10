import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui';
import { toast } from 'sonner';

export const AdminSettings = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Institutional System Settings"
        subtitle="Manage academic calendar deadlines, college verification keys, and SIH nodal credentials."
        breadcrumbs={[{ label: 'Dashboard', link: '/admin/dashboard' }, { label: 'Settings' }]}
      />

      <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-4 text-xs">
        <h3 className="text-sm font-bold text-main border-b border-border pb-3">SIH Nodal Officer Details</h3>
        <p className="text-subtext leading-relaxed">
          Dr. Pradeep Sengupta &bull; Dean of Career Development & Placement Affairs &bull; placement.director@ves.ac.in
        </p>
      </div>
    </div>
  );
};
