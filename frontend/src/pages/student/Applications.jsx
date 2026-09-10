import { useState } from 'react';
import { FileText, Filter } from 'lucide-react';
import { PageHeader } from '@/components/common/Shared';
import { Card, Badge, Tabs, Avatar } from '@/components/ui';
import { MatchScore } from '@/components/dashboard';
import { mockApplications, applicationTimeline } from '@/data/mockApplications';

const statusVariant = {
  'Applied': 'warning', 'Under Review': 'info', 'Shortlisted': 'primary',
  'Interview': 'violet', 'Selected': 'success', 'Rejected': 'error',
};

export default function Applications() {
  const [activeTab, setActiveTab] = useState('all');
  const myApps = mockApplications.filter(a => a.studentId === 's1');
  const tabs = [
    { id: 'all', label: 'All', count: myApps.length },
    { id: 'active', label: 'Active', count: myApps.filter(a => !['Selected', 'Rejected'].includes(a.status)).length },
    { id: 'selected', label: 'Selected', count: myApps.filter(a => a.status === 'Selected').length },
    { id: 'rejected', label: 'Rejected', count: myApps.filter(a => a.status === 'Rejected').length },
  ];

  let filtered = myApps;
  if (activeTab === 'active') filtered = myApps.filter(a => !['Selected', 'Rejected'].includes(a.status));
  if (activeTab === 'selected') filtered = myApps.filter(a => a.status === 'Selected');
  if (activeTab === 'rejected') filtered = myApps.filter(a => a.status === 'Rejected');

  return (
    <div className="space-y-6">
      <PageHeader title="My Applications" subtitle="Track your application status across companies" icon={FileText} />
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="space-y-4">
        {filtered.map(app => (
          <Card key={app.id} className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <Avatar name={app.company} size="md" />
                <div>
                  <h3 className="font-semibold text-main">{app.role}</h3>
                  <p className="text-sm text-text-secondary">{app.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-xs text-text-secondary">Applied</p>
                  <p className="text-sm font-medium text-main">{app.appliedDate}</p>
                </div>
                <MatchScore score={app.matchScore} size="sm" />
                <Badge variant={statusVariant[app.status]}>{app.status}</Badge>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs font-medium text-text-secondary mb-2">Application Timeline</p>
              <div className="flex items-center gap-2 overflow-x-auto">
                {applicationTimeline.map((step, i) => (
                  <div key={i} className="flex items-center gap-2 shrink-0">
                    <div className={`w-3 h-3 rounded-full ${step.completed ? 'bg-success' : 'bg-slate-200'}`} />
                    <span className={`text-xs ${step.completed ? 'text-main font-medium' : 'text-text-muted'}`}>{step.status}</span>
                    {i < applicationTimeline.length - 1 && <div className={`w-6 h-px ${step.completed ? 'bg-success' : 'bg-border'}`} />}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && <Card className="p-12 text-center"><p className="text-text-secondary">No applications in this category.</p></Card>}
    </div>
  );
}
