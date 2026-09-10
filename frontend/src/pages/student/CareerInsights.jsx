import { BarChart3, TrendingUp, Flame, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/common/Shared';
import { Card, Badge } from '@/components/ui';
import { SkillDemandChart, DemandPieChart, GrowthLineChart, SimpleBarChart } from '@/components/charts';
import {
  skillDemandData, emergingSkills, roleDemandData, industryDistribution, studentGrowthData,
} from '@/data/mockAnalytics';

export default function CareerInsights() {
  return (
    <div className="space-y-6">
      <PageHeader title="Career Insights" subtitle="Industry trends and skill demand analysis" icon={BarChart3} />

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-main mb-1 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" />Most Demanded Skills</h3>
          <p className="text-xs text-text-muted mb-4">Based on current job postings across industries</p>
          <SkillDemandChart data={skillDemandData} height={300} />
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-main mb-1 flex items-center gap-2"><Flame className="w-4 h-4 text-accent" />Emerging Technologies</h3>
          <p className="text-xs text-text-muted mb-4">Fastest growing skills by year-over-year growth</p>
          <div className="space-y-3">
            {emergingSkills.map(s => (
              <div key={s.skill} className="flex items-center justify-between">
                <span className="text-sm font-medium text-main">{s.skill}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 rounded-full bg-slate-200">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${Math.min(100, s.growth)}%` }} />
                  </div>
                  <Badge variant="accent">+{s.growth}%</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-main mb-1 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-primary" />Role Demand</h3>
          <p className="text-xs text-text-muted mb-4">Open positions by role across all industries</p>
          <SimpleBarChart data={roleDemandData} xKey="role" bars={[{ key: 'demand', color: '#0F766E', label: 'Openings' }]} height={280} />
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-main mb-1 flex items-center gap-2"><Sparkles className="w-4 h-4 text-violet" />Industry Distribution</h3>
          <p className="text-xs text-text-muted mb-4">Opportunity distribution across industries</p>
          <DemandPieChart data={industryDistribution} height={280} />
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-main mb-1">Platform Growth Trends</h3>
        <p className="text-xs text-text-muted mb-4">Students and companies joining KaushalVerse over time</p>
        <GrowthLineChart data={studentGrowthData} keys={[
          { key: 'students', color: '#0F766E', label: 'Students' },
          { key: 'companies', color: '#F97316', label: 'Companies' },
        ]} height={300} />
      </Card>
    </div>
  );
}
