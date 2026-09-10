import { useState } from 'react';
import { GraduationCap, Search, Eye, Edit3, Ban } from 'lucide-react';
import { PageHeader } from '@/components/common/Shared';
import { Card, Badge, Button, Avatar, Input } from '@/components/ui';
import { mockStudents } from '@/data/mockStudents';

const statusVariant = { 'Active': 'success', 'Placed': 'primary', 'Suspended': 'error' };

export default function AdminStudents() {
  const [search, setSearch] = useState('');
  const filtered = mockStudents.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.college.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader title="Student Management" subtitle="View and manage all registered students" icon={GraduationCap} />

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <Input placeholder="Search by name or college..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Student</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">College</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Branch</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Readiness</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Applications</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Status</th>
                <th className="text-right px-4 py-3 font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-bg/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar name={s.name} size="sm" />
                      <div>
                        <p className="font-medium text-main">{s.name}</p>
                        <p className="text-xs text-text-muted">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{s.college}</td>
                  <td className="px-4 py-3 text-text-secondary">{s.branch}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-slate-200">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${s.placementReadiness}%` }} />
                      </div>
                      <span className="text-xs font-medium text-main">{s.placementReadiness}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{s.applications}</td>
                  <td className="px-4 py-3"><Badge variant={statusVariant[s.status]}>{s.status}</Badge></td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm"><Edit3 className="w-4 h-4" /></Button>
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
