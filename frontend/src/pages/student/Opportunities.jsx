import { useState } from 'react';
import { Briefcase, Search } from 'lucide-react';
import { PageHeader } from '@/components/common/Shared';
import { OpportunityCard, OpportunityFilters } from '@/components/opportunities';
import { Card, Tabs, Input } from '@/components/ui';
import { mockOpportunities } from '@/data/mockOpportunities';

export default function Opportunities() {
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({ location: 'All Locations', workMode: 'All Modes', industry: 'All Industries', type: 'All Types' });
  const [search, setSearch] = useState('');

  const tabs = [
    { id: 'all', label: 'All', count: mockOpportunities.length },
    { id: 'Internship', label: 'Internships', count: mockOpportunities.filter(o => o.type === 'Internship').length },
    { id: 'Job', label: 'Jobs', count: mockOpportunities.filter(o => o.type === 'Job').length },
    { id: 'Project', label: 'Projects', count: mockOpportunities.filter(o => o.type === 'Project').length },
  ];

  let filtered = mockOpportunities;
  if (activeTab !== 'all') filtered = filtered.filter(o => o.type === activeTab);
  if (filters.location !== 'All Locations') filtered = filtered.filter(o => o.location === filters.location);
  if (filters.workMode !== 'All Modes') filtered = filtered.filter(o => o.workMode === filters.workMode);
  if (filters.type !== 'All Types') filtered = filtered.filter(o => o.type === filters.type);
  if (search) filtered = filtered.filter(o => o.title.toLowerCase().includes(search.toLowerCase()) || o.companyName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader title="Opportunities" subtitle="Discover internships, jobs and projects matched to your skills" icon={Briefcase} />

      <div className="flex flex-col gap-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input placeholder="Search by role or company..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <OpportunityFilters filters={filters} onChange={setFilters} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map(opp => <OpportunityCard key={opp.id} opportunity={opp} />)}
      </div>

      {filtered.length === 0 && (
        <Card className="p-12 text-center"><p className="text-text-secondary">No opportunities match your filters. Try adjusting them.</p></Card>
      )}
    </div>
  );
}
