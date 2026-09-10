import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Badge, Button } from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { Briefcase } from 'lucide-react';
import { toast } from 'sonner';

export const AdminOpportunities = () => {
  const { opportunities } = useApp();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Institutional Opportunity Moderation"
        subtitle="Review, approve, and verify incoming corporate internship and full-time listings."
        breadcrumbs={[{ label: 'Dashboard', link: '/admin/dashboard' }, { label: 'Opportunities' }]}
      />

      <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-subtle">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-border text-subtext font-semibold uppercase tracking-wider">
            <tr>
              <th className="p-4">Title & Company</th>
              <th className="p-4">Type</th>
              <th className="p-4">Stipend</th>
              <th className="p-4">Mode & Location</th>
              <th className="p-4">Deadline</th>
              <th className="p-4 text-right">Moderation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {opportunities.map((opp) => (
              <tr key={opp.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-main">{opp.title}</p>
                  <p className="text-subtext text-[11px]">{opp.companyName}</p>
                </td>
                <td className="p-4"><Badge variant="default">{opp.type}</Badge></td>
                <td className="p-4 font-bold text-main">{opp.stipend}</td>
                <td className="p-4 text-subtext">{opp.location} ({opp.workMode})</td>
                <td className="p-4 text-accent font-semibold">{opp.deadline}</td>
                <td className="p-4 text-right">
                  <Badge variant="success">Approved</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
