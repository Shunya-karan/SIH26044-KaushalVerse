import { LayoutDashboard, Users, Building2, Briefcase, FileText, Award, Target } from 'lucide-react';
import { StatCard } from '@/components/dashboard';
import { Card } from '@/components/ui';
import { GrowthLineChart, SimpleBarChart, DemandPieChart } from '@/components/charts';
import { studentGrowthData, industryDistribution, topHiringSkills, roleDemandData } from '@/data/mockAnalytics';

export default function AdminOverview() {
  const stats = [
    { label: 'Total Students', value: 10000, suffix: '+', icon: Users, color: 'primary', trend: '+12%' },
    { label: 'Companies', value: 500, suffix: '+', icon: Building2, color: 'info', trend: '+8%' },
    { label: 'Opportunities', value: 2500, suffix: '+', icon: Briefcase, color: 'accent', trend: '+15%' },
    { label: 'Applications', value: 18500, icon: FileText, color: 'violet', trend: '+22%' },
    { label: 'Placements', value: 1620, icon: Award, color: 'secondary', trend: '+18%' },
    { label: 'Avg. Match', value: 85, suffix: '%', icon: Target, color: 'primary', trend: '+5%' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-main">Platform Overview</h1>
        <p className="mt-1 text-sm text-text-secondary">Ecosystem-wide statistics and growth trends.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-main mb-4">Student & Company Growth</h3>
          <GrowthLineChart data={studentGrowthData} keys={[
            { key: 'students', color: '#0F766E', label: 'Students' },
            { key: 'companies', color: '#F97316', label: 'Companies' },
          ]} height={300} />
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-main mb-4">Industry Distribution</h3>
          <DemandPieChart data={industryDistribution} height={300} />
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-main mb-4">Top Hiring Skills</h3>
          <SimpleBarChart data={topHiringSkills} xKey="skill" bars={[{ key: 'hires', color: '#0F766E', label: 'Hires' }]} height={280} />
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-main mb-4">Role Demand</h3>
          <SimpleBarChart data={roleDemandData} xKey="role" bars={[{ key: 'demand', color: '#7C3AED', label: 'Openings' }]} height={280} />
        </Card>
      </div>
    </div>
  );
}
