import { FileText } from 'lucide-react';
import { PageHeader } from '@/components/common/Shared';
import { Card, Badge, Avatar } from '@/components/ui';
import { mockApplications } from '@/data/mockApplications';

const statusVariant = {
  'Applied': 'warning', 'Under Review': 'info', 'Shortlisted': 'primary',
  'Interview': 'violet', 'Selected': 'success', 'Rejected': 'error',
};

export default function AdminApplications() {
  return (
    <div className="space-y-6">
      <PageHeader title="Applications" subtitle="Platform-wide application tracking" icon={FileText} />

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Student</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Company</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Role</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Match</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Applied</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockApplications.map(a => (
                <tr key={a.id} className="hover:bg-bg/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar name={a.studentName} size="sm" />
                      <span className="font-medium text-main">{a.studentName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{a.company}</td>
                  <td className="px-4 py-3 text-text-secondary">{a.role}</td>
                  <td className="px-4 py-3"><span className="font-semibold text-primary">{a.matchScore}%</span></td>
                  <td className="px-4 py-3 text-text-secondary">{a.appliedDate}</td>
                  <td className="px-4 py-3"><Badge variant={statusVariant[a.status]}>{a.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
