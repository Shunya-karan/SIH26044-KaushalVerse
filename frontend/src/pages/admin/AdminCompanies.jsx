import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button, Badge } from '../../components/ui';
import { mockCompanies } from '../../data/mockCompanies';
import { Building2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const AdminCompanies = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Corporate Hiring Partners"
        subtitle="Vetted enterprise recruiters offering internships, live capstones, and campus placements."
        breadcrumbs={[{ label: 'Dashboard', link: '/admin/dashboard' }, { label: 'Companies' }]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCompanies.map((comp) => (
          <div key={comp.id} className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-xs shadow-xs"
                  style={{ backgroundColor: comp.color || '#0F766E' }}
                >
                  {comp.initials}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-main">{comp.name}</h3>
                  <p className="text-[11px] text-subtext">{comp.industry}</p>
                </div>
              </div>
              <Badge variant="success">MOU Active</Badge>
            </div>

            <p className="text-xs text-subtext line-clamp-2">{comp.about}</p>

            <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
              <span className="text-subtext">Active Listings: <strong>{comp.activeOpportunitiesCount}</strong></span>
              <Button variant="outline" size="sm" onClick={() => toast.info(`Contacting ${comp.name}`)}>
                Campus Desk
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
