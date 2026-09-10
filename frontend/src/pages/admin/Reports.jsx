import { FileBarChart, Download, FileText, TrendingUp, Users, Award, Target } from 'lucide-react';
import { PageHeader } from '@/components/common/Shared';
import { Card, Button, Badge } from '@/components/ui';

export default function Reports() {
  const reports = [
    { title: 'Placement Report 2025', description: 'Comprehensive placement statistics, branch-wise analysis and hiring trends', date: 'Sep 2025', type: 'Placement' },
    { title: 'Skill Gap Analysis Report', description: 'Industry-wide skill gap analysis with supply vs demand comparison', date: 'Sep 2025', type: 'Skills' },
    { title: 'Student Engagement Report', description: 'Student activity, profile completion and platform usage metrics', date: 'Aug 2025', type: 'Engagement' },
    { title: 'Company Hiring Report', description: 'Company-wise hiring pipeline, application trends and conversion rates', date: 'Aug 2025', type: 'Hiring' },
    { title: 'Industry Trends Report', description: 'Emerging skills, role demand shifts and industry distribution changes', date: 'Aug 2025', type: 'Trends' },
    { title: 'Quarterly Summary Q2 2025', description: 'Overall platform performance, growth metrics and key achievements', date: 'Jul 2025', type: 'Summary' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Reports" subtitle="Generate and download platform analytics reports" icon={FileBarChart} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((r, i) => (
          <Card key={i} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <Badge variant="primary">{r.type}</Badge>
            </div>
            <h3 className="mt-3 font-semibold text-main text-sm">{r.title}</h3>
            <p className="mt-1 text-xs text-text-secondary">{r.description}</p>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <span className="text-xs text-text-muted">{r.date}</span>
              <Button variant="secondary" size="sm"><Download className="w-3.5 h-3.5" />Download</Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-main mb-4">Quick Stats Summary</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Students', value: '10,000+', icon: Users },
            { label: 'Placement Rate', value: '72%', icon: Award },
            { label: 'Active Companies', value: '500+', icon: TrendingUp },
            { label: 'Avg. Match Score', value: '85%', icon: Target },
          ].map((s, i) => (
            <div key={i} className="rounded-lg border border-border p-4 text-center">
              <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-main">{s.value}</p>
              <p className="text-xs text-text-secondary mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

