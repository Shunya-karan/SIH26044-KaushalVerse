import { useState } from 'react';
import { Briefcase, MoreVertical, Eye, Edit3, Copy, XCircle } from 'lucide-react';
import { PageHeader } from '@/components/common/Shared';
import { Card, Badge, Tabs, Button } from '@/components/ui';
import { mockOpportunities } from '@/data/mockOpportunities';

export default function MyOpportunities() {
  const [activeTab, setActiveTab] = useState('Active');
  const tabs = [
    { id: 'Active', label: 'Active', count: mockOpportunities.length },
    { id: 'Draft', label: 'Draft', count: 2 },
    { id: 'Closed', label: 'Closed', count: 3 },
  ];

  const filtered = activeTab === 'Active' ? mockOpportunities : [];

  return (
    <div className="space-y-6">
      <PageHeader title="My Opportunities" subtitle="Manage your posted opportunities" icon={Briefcase} />
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map(opp => (
          <Card key={opp.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="font-semibold text-main">{opp.title}</h3>
                <p className="text-sm text-text-secondary mt-0.5">{opp.type} · {opp.location}</p>
              </div>
              <div className="relative">
                <Button variant="ghost" size="sm"><MoreVertical className="w-4 h-4" /></Button>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant={opp.type === 'Internship' ? 'primary' : opp.type === 'Job' ? 'secondary' : 'accent'}>{opp.type}</Badge>
              <Badge variant="default">{opp.workMode}</Badge>
              <Badge variant="info">{opp.matchScore}% avg match</Badge>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-text-secondary">
              <span>Posted: {opp.postedDate}</span>
              <span>Deadline: {opp.deadline}</span>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <span className="text-sm font-medium text-main">{opp.stipend || opp.salary || '—'}</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                <Button variant="ghost" size="sm"><Edit3 className="w-4 h-4" /></Button>
                <Button variant="ghost" size="sm"><Copy className="w-4 h-4" /></Button>
                <Button variant="ghost" size="sm" className="text-error"><XCircle className="w-4 h-4" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && <Card className="p-12 text-center"><p className="text-text-secondary">No opportunities in this category.</p></Card>}
    </div>
  );
}
