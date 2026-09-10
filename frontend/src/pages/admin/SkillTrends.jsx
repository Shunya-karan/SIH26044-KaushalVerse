import { TrendingUp, Flame, BarChart3 } from 'lucide-react';
import { PageHeader } from '@/components/common/Shared';
import { Card, Badge } from '@/components/ui';
import { SkillDemandChart, SkillRadarChart, SimpleBarChart, DemandPieChart } from '@/components/charts';
import { skillDemandData, emergingSkills, skillSupplyData, industryDistribution, roleDemandData } from '@/data/mockAnalytics';

export default function SkillTrends() {
  const radarData = skillSupplyData.map(s => ({ skill: s.skill, current: s.supply, required: s.demand }));

  return (
    <div className="space-y-6">
      <PageHeader title="Skill Trends" subtitle="Industry skill demand, supply and gap analysis" icon={TrendingUp} />

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-main mb-1 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" />Top Industry Skills</h3>
          <p className="text-xs text-text-muted mb-4">Demand score by skill across all industries</p>
          <SkillDemandChart data={skillDemandData} height={300} />
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-main mb-1 flex items-center gap-2"><Flame className="w-4 h-4 text-accent" />Emerging Skills</h3>
          <p className="text-xs text-text-muted mb-4">Fastest growing skills year-over-year</p>
          <div className="space-y-3">
            {emergingSkills.map(s => (
              <div key={s.skill} className="flex items-center justify-between">
                <span className="text-sm font-medium text-main">{s.skill}</span>
                <Badge variant="accent">+{s.growth}%</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-main mb-1 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-primary" />Skill Demand vs Supply</h3>
          <p className="text-xs text-text-muted mb-4">Radar comparison of student skill supply vs industry demand</p>
          <SkillRadarChart data={radarData} height={300} />
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-main mb-1">Skill Supply vs Demand</h3>
          <p className="text-xs text-text-muted mb-4">Bar comparison showing gap</p>
          <SimpleBarChart data={skillSupplyData} xKey="skill" bars={[
            { key: 'supply', color: '#0F766E', label: 'Student Supply' },
            { key: 'demand', color: '#F97316', label: 'Industry Demand' },
          ]} height={300} />
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-main mb-1">Role Demand</h3>
          <p className="text-xs text-text-muted mb-4">Open positions by role</p>
          <SimpleBarChart data={roleDemandData} xKey="role" bars={[{ key: 'demand', color: '#7C3AED', label: 'Openings' }]} height={280} />
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-main mb-1">Industry Distribution</h3>
          <p className="text-xs text-text-muted mb-4">Opportunity distribution by industry</p>
          <DemandPieChart data={industryDistribution} height={280} />
        </Card>
      </div>
    </div>
  );
}
