import { Building2, Globe, MapPin, Mail, Phone, Edit3 } from 'lucide-react';
import { PageHeader } from '@/components/common/Shared';
import { Card, Badge, Button, Avatar, Progress, Input } from '@/components/ui';
import { mockCompanies } from '@/data/mockCompanies';

export default function CompanyProfile() {
  const company = mockCompanies[0];

  return (
    <div className="space-y-6">
      <PageHeader title="Company Profile" subtitle="Manage your company information and branding" icon={Building2} />

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <Avatar name={company.name} size="xl" />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-main">{company.name}</h2>
            <p className="text-sm text-text-secondary mt-0.5">{company.industry} · {company.size} employees</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-text-secondary">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{company.location}</span>
              <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" />{company.website}</span>
              <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" />{company.contactEmail}</span>
            </div>
          </div>
          <Button variant="secondary" size="sm"><Edit3 className="w-4 h-4" />Edit</Button>
        </div>
        <div className="mt-5 pt-5 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-main">Profile Completion</span>
            <span className="text-sm font-semibold text-primary">{company.profileCompletion}%</span>
          </div>
          <Progress value={company.profileCompletion} color="primary" />
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-main mb-4">Company Information</h3>
          <div className="space-y-4">
            <Input label="Company Name" defaultValue={company.name} />
            <Input label="Industry" defaultValue={company.industry} />
            <Input label="Website" defaultValue={company.website} />
            <Input label="Location" defaultValue={company.location} />
            <div>
              <label className="label">About</label>
              <textarea className="input" rows={4} defaultValue={company.about} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-main mb-4">Contact Information</h3>
          <div className="space-y-4">
            <Input label="Contact Person" defaultValue={company.contactName} />
            <Input label="Contact Email" defaultValue={company.contactEmail} />
            <Input label="Contact Phone" defaultValue={company.contactPhone} />
            <Input label="Company Size" defaultValue={company.size} />
          </div>
          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="text-sm font-semibold text-main mb-3">Company Stats</h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg border border-border p-3"><p className="text-xl font-bold text-primary">{company.opportunities}</p><p className="text-xs text-text-secondary">Opportunities</p></div>
              <div className="rounded-lg border border-border p-3"><p className="text-xl font-bold text-info">{company.applications}</p><p className="text-xs text-text-secondary">Applications</p></div>
              <div className="rounded-lg border border-border p-3"><p className="text-xl font-bold text-success">5</p><p className="text-xs text-text-secondary">Placed</p></div>
            </div>
          </div>
          <div className="mt-4 flex justify-end"><Button>Save Changes</Button></div>
        </Card>
      </div>
    </div>
  );
}
