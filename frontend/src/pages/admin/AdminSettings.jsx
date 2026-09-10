import { Settings as SettingsIcon, Shield, Bell, User } from 'lucide-react';
import { PageHeader } from '@/components/common/Shared';
import { Card, Button, Input, Avatar } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';

export default function AdminSettings() {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Manage your admin account preferences" icon={SettingsIcon} />

      <Card className="p-6">
        <h3 className="font-semibold text-main mb-4 flex items-center gap-2"><User className="w-4 h-4 text-primary" />Admin Profile</h3>
        <div className="flex items-center gap-4 mb-4">
          <Avatar name={user?.name || 'Admin'} size="lg" />
          <Button variant="secondary" size="sm">Change Avatar</Button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Full Name" defaultValue={user?.name} />
          <Input label="Email" defaultValue={user?.email} />
          <Input label="Institution" defaultValue={user?.institution || 'IIT Bombay'} />
          <Input label="Role" defaultValue="Administrator" disabled />
        </div>
        <div className="mt-4 flex justify-end"><Button>Save Changes</Button></div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-main mb-4 flex items-center gap-2"><Bell className="w-4 h-4 text-primary" />Notification Settings</h3>
        <div className="space-y-3">
          {['New student registration alerts', 'New company registration alerts', 'Weekly platform analytics summary', 'Placement milestone notifications'].map(item => (
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
