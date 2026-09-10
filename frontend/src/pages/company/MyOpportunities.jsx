import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { Button, Badge } from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { Briefcase, PlusCircle, Users, Sparkles, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';

export const MyOpportunities = () => {
  const { opportunities } = useApp();
  const [filterTab, setFilterTab] = useState('Active');

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Posted Opportunities"
        subtitle="Manage active job postings, capstone projects, and candidate application pipelines."
        breadcrumbs={[{ label: 'Dashboard', link: '/company/dashboard' }, { label: 'My Opportunities' }]}
        actions={
          <Link to="/company/post-opportunity">
            <Button variant="primary" size="sm" icon={PlusCircle}>
              Post Opportunity
            </Button>
          </Link>
        }
      />

      <div className="space-y-4">
        {opportunities.slice(0, 4).map((opp) => (
          <div
            key={opp.id}
            className="bg-surface rounded-2xl border border-border p-6 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-main">{opp.title}</h3>
                <Badge variant="success">Active</Badge>
              </div>
              <p className="text-xs text-subtext mt-1">
                {opp.location} ({opp.workMode}) &bull; {opp.stipend} &bull; Deadline: {opp.deadline}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {opp.requiredSkills.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <Link to="/company/candidate-matching">
                <Button variant="accent" size="sm" icon={Sparkles}>
                  Candidate Match
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.info('Opportunity details updated.')}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
