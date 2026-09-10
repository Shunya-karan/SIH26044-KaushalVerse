import { useState } from 'react';
import { FileText, Eye, FileCheck2, Star, X } from 'lucide-react';
import { PageHeader } from '@/components/common/Shared';
import { Card, Badge, Tabs, Button, Avatar } from '@/components/ui';
import { MatchScore } from '@/components/dashboard';
import { mockApplications } from '@/data/mockApplications';

const statusVariant = {
  'Applied': 'warning', 'Under Review': 'info', 'Shortlisted': 'primary',
  'Interview': 'violet', 'Selected': 'success', 'Rejected': 'error',
};

export default function CompanyApplications() {
  const [activeTab, setActiveTab] = useState('all');
  const tabs = [
    { id: 'all', label: 'All', count: mockApplications.length },
    { id: 'shortlisted', label: 'Shortlisted', count: mockApplications.filter(a => a.status === 'Shortlisted').length },
    { id: 'interview', label: 'Interview', count: mockApplications.filter(a => a.status === 'Interview').length },
    { id: 'selected', label: 'Selected', count: mockApplications.filter(a => a.status === 'Selected').length },
  ];

  let filtered = mockApplications;
  if (activeTab === 'shortlisted') filtered = mockApplications.filter(a => a.status === 'Shortlisted');
  if (activeTab === 'interview') filtered = mockApplications.filter(a => a.status === 'Interview');
  if (activeTab === 'selected') filtered = mockApplications.filter(a => a.status === 'Selected');

  return (
    <div className="space-y-6">
      <PageHeader title="Applications" subtitle="Review and manage candidate applications" icon={FileText} />
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="space-y-4">
        {filtered.map(app => (
          <Card key={app.id} className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <Avatar name={app.studentName} size="md" />
                <div>
                  <h3 className="font-semibold text-main">{app.studentName}</h3>
                  <p className="text-sm text-text-secondary">{app.role} · {app.college}</p>
                  <p className="text-xs text-text-muted">{app.degree}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <MatchScore score={app.matchScore} size="sm" />
                <div className="flex flex-wrap gap-1">
                  {app.skills.slice(0, 3).map(s => <Badge key={s} variant="default">{s}</Badge>)}
                </div>
                <Badge variant={statusVariant[app.status]}>{app.status}</Badge>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <span className="text-xs text-text-muted">Applied: {app.appliedDate} · Updated: {app.lastUpdated}</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm"><Eye className="w-4 h-4" />Profile</Button>
                <Button variant="ghost" size="sm"><FileCheck2 className="w-4 h-4" />Resume</Button>
                <Button variant="secondary" size="sm" className="text-success border-success/30 hover:bg-green-50"><Star className="w-4 h-4" />Shortlist</Button>
                <Button variant="secondary" size="sm" className="text-error border-error/30 hover:bg-red-50"><X className="w-4 h-4" />Reject</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && <Card className="p-12 text-center"><p className="text-text-secondary">No applications in this category.</p></Card>}
    </div>
  );
}
