import { Building2, Search, Eye, Ban } from 'lucide-react';
import { PageHeader } from '@/components/common/Shared';
import { Card, Badge, Button, Avatar, Input } from '@/components/ui';
import { mockCompanies } from '@/data/mockCompanies';

export default function AdminCompanies() {
  return (
    <div className="space-y-6">
      <PageHeader title="Company Management" subtitle="View and manage all registered companies" icon={Building2} />

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <Input placeholder="Search by company name or industry..." className="pl-10" />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Company</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Industry</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Location</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Opportunities</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Applications</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Status</th>
                <th className="text-right px-4 py-3 font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockCompanies.map(c => (
                <tr key={c.id} className="hover:bg-bg/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar name={c.name} size="sm" />
                      <div>
                        <p className="font-medium text-main">{c.name}</p>
                        <p className="text-xs text-text-muted">{c.size} employees</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{c.industry}</td>
                  <td className="px-4 py-3 text-text-secondary">{c.location}</td>
                  <td className="px-4 py-3 text-text-secondary">{c.opportunities}</td>
                  <td className="px-4 py-3 text-text-secondary">{c.applications}</td>
                  <td className="px-4 py-3"><Badge variant="success">{c.status}</Badge></td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" className="text-error"><Ban className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
