import { Briefcase } from 'lucide-react';
import { PageHeader } from '@/components/common/Shared';
import { Card, Badge } from '@/components/ui';
import { mockOpportunities } from '@/data/mockOpportunities';

export default function AdminOpportunities() {
  return (
    <div className="space-y-6">
      <PageHeader title="Opportunities" subtitle="All platform opportunities overview" icon={Briefcase} />

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Title</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Company</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Type</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Location</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Deadline</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockOpportunities.map(o => (
                <tr key={o.id} className="hover:bg-bg/50">
                  <td className="px-4 py-3 font-medium text-main">{o.title}</td>
                  <td className="px-4 py-3 text-text-secondary">{o.companyName}</td>
                  <td className="px-4 py-3"><Badge variant={o.type === 'Internship' ? 'primary' : o.type === 'Job' ? 'secondary' : 'accent'}>{o.type}</Badge></td>
                  <td className="px-4 py-3 text-text-secondary">{o.location}</td>
                  <td className="px-4 py-3 text-text-secondary">{o.deadline}</td>
                  <td className="px-4 py-3"><Badge variant="success">{o.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
