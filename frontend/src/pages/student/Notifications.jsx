import { Bell, CheckCircle2, Briefcase, Award, FileText, Users } from 'lucide-react';
import { PageHeader } from '@/components/common/Shared';
import { Card, Badge, Button } from '@/components/ui';

const notifications = [
  { id: 1, icon: Briefcase, title: 'New opportunity match', description: 'Frontend Developer Intern at TechVista Solutions — 92% match', time: '2 hours ago', read: false, variant: 'primary' },
  { id: 2, icon: CheckCircle2, title: 'Application shortlisted', description: 'Your application for Frontend Developer Intern has been shortlisted', time: '1 day ago', read: false, variant: 'success' },
  { id: 3, icon: Award, title: 'Skill verified', description: 'Your React skill has been verified by your institution', time: '2 days ago', read: false, variant: 'info' },
  { id: 4, icon: FileText, title: 'New opportunity match', description: 'Machine Learning Intern at DataForge Analytics — 90% match', time: '3 days ago', read: true, variant: 'primary' },
  { id: 5, icon: Users, title: 'Profile viewed', description: 'Your profile was viewed by CloudNexus Systems', time: '5 days ago', read: true, variant: 'default' },
];

export default function Notifications() {
  return (
    <div className="space-y-6">
      <PageHeader title="Notifications" subtitle="Stay updated on your applications and opportunities" icon={Bell} />
      <div className="flex justify-end">
        <Button variant="ghost" size="sm">Mark all as read</Button>
      </div>
      <div className="space-y-3">
        {notifications.map(n => (
          <Card key={n.id} className={`p-4 ${!n.read ? 'border-primary/30 bg-primary-soft/20' : ''}`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                n.variant === 'primary' ? 'bg-primary-soft text-primary' :
                n.variant === 'success' ? 'bg-green-100 text-success' :
                n.variant === 'info' ? 'bg-sky-100 text-info' : 'bg-slate-100 text-text-secondary'
              }`}>
                <n.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-medium text-main text-sm">{n.title}</h4>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-accent shrink-0" />}
                </div>
                <p className="text-sm text-text-secondary mt-0.5">{n.description}</p>
                <p className="text-xs text-text-muted mt-1">{n.time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
