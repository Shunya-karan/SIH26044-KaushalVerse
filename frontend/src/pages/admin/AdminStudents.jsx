import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button, Badge } from '../../components/ui';
import { mockStudents } from '../../data/mockStudents';
import { GraduationCap, Search, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const AdminStudents = () => {
  const [search, setSearch] = useState('');

  const filtered = mockStudents.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.college.toLowerCase().includes(search.toLowerCase()) ||
    s.branch.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Talent Directory"
        subtitle="Manage student enrollment status, verified academic transcripts, and institutional readiness scores."
        breadcrumbs={[{ label: 'Dashboard', link: '/admin/dashboard' }, { label: 'Students' }]}
      />

      <div className="bg-surface rounded-2xl border border-border p-4 shadow-subtle flex items-center gap-3">
        <Search className="w-4 h-4 text-muted shrink-0" />
        <input
          type="text"
          placeholder="Search by student name, college, or engineering department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs outline-none bg-transparent"
        />
      </div>

      <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-border text-subtext font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">College / University</th>
                <th className="p-4">Branch & Batch</th>
                <th className="p-4">CGPA</th>
                <th className="p-4">Readiness Score</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((std) => (
                <tr key={std.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-bold text-main">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-[10px]">
                        {std.avatar}
                      </div>
                      <span>{std.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-subtext">{std.college}</td>
                  <td className="p-4 text-main">{std.branch} ({std.graduationYear})</td>
                  <td className="p-4 font-bold text-primary">{std.cgpa}</td>
                  <td className="p-4">
                    <Badge variant={std.readinessScore >= 85 ? 'success' : 'warning'}>
                      {std.readinessScore}% Ready
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast.info(`Viewing academic audit profile for ${std.name}`)}
                    >
                      Audit
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
