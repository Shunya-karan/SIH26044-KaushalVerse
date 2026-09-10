import { BarChart3, TrendingUp, Briefcase, Users } from 'lucide-react';
import { PageHeader } from '@/components/common/Shared';
import { StatCard } from '@/components/dashboard';
import { Card } from '@/components/ui';
import { GrowthLineChart, SimpleBarChart, DemandPieChart } from '@/components/charts';
import { studentGrowthData, industryDistribution, topHiringSkills, skillDemandData } from '@/data/mockAnalytics';

export default function CompanyAnalytics() {
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" subtitle="Hiring insights and application trends" icon={BarChart3} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Views" value={1240} icon={Users} color="primary" trend="+18%" />
        <StatCard label="Applications" value={340} icon={Briefcase} color="info" trend="+45" />
        <StatCard label="Shortlisted" value={28} icon={TrendingUp} color="secondary" trend="+8" />
        <StatCard label="Hired" value={5} icon={Briefcase} color="accent" trend="+2" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-main mb-4">Application Trends</h3>
          <GrowthLineChart data={studentGrowthData.slice(-6)} keys={[{ key: 'students', color: '#0F766E', label: 'Applications' }]} height={280} />
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-main mb-4">Top Skills in Applicants</h3>
          <SimpleBarChart data={topHiringSkills} xKey="skill" bars={[{ key: 'hires', color: '#0F766E', label: 'Applicants' }]} height={280} />
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-main mb-4">Industry Distribution</h3>
          <DemandPieChart data={industryDistribution} height={280} />
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-main mb-4">Skill Demand Overview</h3>
          <SimpleBarChart data={skillDemandData.slice(0, 6)} xKey="skill" bars={[{ key: 'demand', color: '#F97316', label: 'Demand' }]} height={280} />
        </Card>
      </div>
    </div>
  );
}
