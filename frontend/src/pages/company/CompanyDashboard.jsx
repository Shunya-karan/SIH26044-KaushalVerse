import { Link } from 'react-router-dom';
import {
  Briefcase, FileText, Star, Calendar, PlusCircle, ArrowRight, Users, TrendingUp,
} from 'lucide-react';
import { StatCard } from '@/components/dashboard';
import { Card, Badge, Button, Avatar } from '@/components/ui';
import { companyDashboardStats, studentGrowthData } from '@/data/mockAnalytics';
import { GrowthLineChart } from '@/components/charts';
import { mockApplications } from '@/data/mockApplications';

export default function CompanyDashboard() {
  const recentApps = mockApplications.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-main">Company Dashboard</h1>
          <p className="mt-1 text-sm text-text-secondary">Manage your hiring pipeline and opportunities.</p>
        </div>
        <Link to="/company/post-opportunity"><Button><PlusCircle className="w-4 h-4" />Post Opportunity</Button></Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Opportunities" value={12} icon={Briefcase} color="primary" trend="+2" />
        <StatCard label="Total Applications" value={340} icon={FileText} color="info" trend="+45" />
        <StatCard label="Shortlisted" value={28} icon={Star} color="secondary" trend="+8" />
        <StatCard label="Interviews" value={12} icon={Calendar} color="accent" trend="+3" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h3 className="font-semibold text-main mb-4">Recent Applications</h3>
          <div className="space-y-1 divide-y divide-border">
            {recentApps.map(app => (
              <div key={app.id} className="flex items-center gap-3 py-3">
                <Avatar name={app.studentName} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-main">{app.studentName}</p>
                  <p className="text-xs text-text-secondary">{app.role} · {app.college}</p>
                </div>
                <div className="text-center shrink-0">
                  <p className="text-sm font-bold text-primary">{app.matchScore}%</p>
                  <p className="text-xs text-text-muted">match</p>
                </div>
                <Badge variant={app.status === 'Selected' ? 'success' : app.status === 'Rejected' ? 'error' : app.status === 'Interview' ? 'violet' : app.status === 'Shortlisted' ? 'primary' : 'info'}>
                  {app.status}
                </Badge>
              </div>
            ))}
          </div>
          <Link to="/company/applications" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
            View all applications <ArrowRight className="w-4 h-4" />
          </Link>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-main mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" />Application Trends</h3>
          <GrowthLineChart data={studentGrowthData.slice(-6)} keys={[{ key: 'students', color: '#0F766E', label: 'Applications' }]} height={220} />
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-main mb-4 flex items-center gap-2"><Users className="w-4 h-4 text-primary" />Hiring Pipeline</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { label: 'Applied', count: 340, color: 'bg-slate-100 text-slate-700' },
            { label: 'Under Review', count: 120, color: 'bg-sky-100 text-info' },
            { label: 'Shortlisted', count: 28, color: 'bg-primary-light text-primary' },
            { label: 'Interview', count: 12, color: 'bg-violet-light text-violet' },
            { label: 'Selected', count: 5, color: 'bg-green-100 text-success' },
            { label: 'Rejected', count: 15, color: 'bg-red-100 text-error' },
          ].map(stage => (
            <div key={stage.label} className="rounded-lg border border-border p-4 text-center">
              <div className={`w-10 h-10 rounded-lg ${stage.color} flex items-center justify-center mx-auto mb-2 text-sm font-bold`}>{stage.count}</div>
              <p className="text-xs font-medium text-text-secondary">{stage.label}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
