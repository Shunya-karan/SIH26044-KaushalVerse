import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { Button, Badge } from '../../components/ui';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Filter,
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  Bookmark,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';
import { toast } from 'sonner';

export const OpportunitiesPage = () => {
  const { opportunities, savedOpportunityIds, toggleSaveOpportunity } = useApp();
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [workModeFilter, setWorkModeFilter] = useState('All');

  const filteredOpps = opportunities.filter((opp) => {
    const matchesTab = activeTab === 'All' ||
      (activeTab === 'Internships' && opp.type === 'Internship') ||
      (activeTab === 'Jobs' && opp.type === 'Job') ||
      (activeTab === 'Projects' && opp.type === 'Project');

    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesMode = workModeFilter === 'All' || opp.workMode.toLowerCase() === workModeFilter.toLowerCase();

    return matchesTab && matchesSearch && matchesMode;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Opportunity Discovery Feed"
        subtitle="Explore internships, full-time positions, and industry capstones with real-time match intelligence."
        breadcrumbs={[{ label: 'Dashboard', link: '/student/dashboard' }, { label: 'Opportunities' }]}
      />

      {/* Filter and Search Bar */}
      <div className="bg-surface rounded-2xl border border-border p-5 shadow-subtle space-y-4">
        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-1">
            {['All', 'Internships', 'Jobs', 'Projects'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-subtext hover:text-main hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-subtext font-semibold">Work Mode:</span>
            <select
              value={workModeFilter}
              onChange={(e) => setWorkModeFilter(e.target.value)}
              className="p-1.5 rounded-lg border border-border bg-slate-50 focus:bg-white text-xs outline-none"
            >
              <option value="All">All Modes</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by role, company name (e.g. Razorpay, TCS), or skill (e.g. React, Python)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-slate-50 focus:bg-white focus:border-primary text-xs outline-none"
          />
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filteredOpps.length === 0 ? (
          <div className="p-12 text-center bg-surface rounded-2xl border border-dashed border-border">
            <Briefcase className="w-8 h-8 text-muted mx-auto mb-2" />
            <h3 className="text-sm font-bold text-main">No opportunities match your filter</h3>
            <p className="text-xs text-subtext mt-1">Try broadening your search query or selecting a different work mode.</p>
          </div>
        ) : (
          filteredOpps.map((opp) => {
            const isSaved = savedOpportunityIds.includes(opp.id);
            return (
              <div
                key={opp.id}
                className="bg-surface p-6 rounded-2xl border border-border hover:border-primary/50 transition-all shadow-subtle space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-sm shadow-xs shrink-0"
                      style={{ backgroundColor: opp.companyColor || '#0F766E' }}
                    >
                      {opp.companyInitials}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <Link to={`/student/opportunities/${opp.id}`} className="text-base font-bold text-main hover:text-primary transition-colors">
                          {opp.title}
                        </Link>
                        <Badge variant="default">{opp.type}</Badge>
                      </div>
                      <p className="text-xs text-subtext mt-0.5">
                        <strong className="text-main">{opp.companyName}</strong> &bull; {opp.location} ({opp.workMode})
                      </p>
                    </div>
                  </div>

                  {/* Match score & stipend */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-border">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-secondary border border-emerald-200">
                      <Sparkles className="w-3.5 h-3.5" />
                      {opp.matchScore}% Compatibility
                    </span>
                    <p className="text-xs font-bold text-main">{opp.stipend}</p>
                  </div>
                </div>

                <p className="text-xs text-subtext leading-relaxed line-clamp-2">
                  {opp.overview}
                </p>

                {/* Footer bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/80 text-xs">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-subtext text-[11px] font-semibold mr-1">Required:</span>
                    {opp.requiredSkills.map((sk) => (
                      <span key={sk} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">
                        {sk}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => {
                        toggleSaveOpportunity(opp.id);
                        toast.info(isSaved ? 'Removed from saved' : 'Bookmarked opportunity');
                      }}
                      className={`p-2 rounded-lg border transition-colors ${
                        isSaved ? 'bg-primary-soft text-primary border-primary-light' : 'border-border text-subtext hover:bg-slate-50'
                      }`}
                      title={isSaved ? 'Bookmarked' : 'Save opportunity'}
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                    </button>

                    <Link to={`/student/opportunities/${opp.id}`}>
                      <Button variant="primary" size="sm">
                        View Opportunity
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
