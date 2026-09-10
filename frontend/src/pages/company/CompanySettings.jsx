import { Settings as SettingsIcon, Building2, Bell, Shield } from 'lucide-react';
import { PageHeader } from '@/components/common/Shared';
import { Card, Button, Input } from '@/components/ui';

export default function CompanySettings() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Manage your company account preferences" icon={SettingsIcon} />

      <Card className="p-6">
        <h3 className="font-semibold text-main mb-4 flex items-center gap-2"><Building2 className="w-4 h-4 text-primary" />Company Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Company Name" defaultValue="TechVista Solutions" />
          <Input label="Industry" defaultValue="IT Services" />
          <Input label="Contact Email" defaultValue="careers@techvista.example.com" />
          <Input label="Contact Phone" defaultValue="+91 80 2345 6789" />
        </div>
        <div className="mt-4 flex justify-end"><Button>Save Changes</Button></div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-main mb-4 flex items-center gap-2"><Bell className="w-4 h-4 text-primary" />Notification Settings</h3>
        <div className="space-y-3">
          {['Email notifications for new applications', 'Daily application summary', 'Candidate match alerts', 'Weekly hiring analytics report'].map(item => (
            <label key={item} className="flex items-center justify-between py-2">
              <span className="text-sm text-main">{item}</span>
              <input type="checkbox" defaultChecked className="rounded border-border text-primary focus:ring-primary/20" />
            </label>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-main mb-4 flex items-center gap-2"><Shield className="w-4 h-4 text-primary" />Security</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary">Change Password</Button>
          <Button variant="secondary">Two-Factor Authentication</Button>
          <Button variant="secondary" className="text-error border-error/30 hover:bg-red-50">Delete Account</Button>
        </div>
      </Card>
    </div>
  );
}
