import { BarChart3, Award, Target, TrendingUp } from 'lucide-react';
import { PageHeader } from '@/components/common/Shared';
import { StatCard } from '@/components/dashboard';
import { Card } from '@/components/ui';
import { PlacementTrendChart, SimpleBarChart, DemandPieChart } from '@/components/charts';
import { placementTrendData, branchWisePlacement, industryWisePlacement, topHiringSkills, industryDistribution } from '@/data/mockAnalytics';

export default function PlacementAnalytics() {
  return (
    <div className="space-y-6">
      <PageHeader title="Placement Analytics" subtitle="Comprehensive placement and hiring analytics" icon={BarChart3} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Placement Rate" value={72} suffix="%" icon={Award} color="primary" trend="+8%" />
        <StatCard label="Internship Rate" value={65} suffix="%" icon={TrendingUp} color="info" trend="+12%" />
        <StatCard label="Avg. Match Score" value={85} suffix="%" icon={Target} color="secondary" trend="+5%" />
        <StatCard label="Total Placed" value={1620} icon={Award} color="accent" trend="+18%" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-main mb-4">Placement Trends</h3>
          <PlacementTrendChart data={placementTrendData} height={300} />
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-main mb-4">Branch-wise Placement</h3>
          <SimpleBarChart data={branchWisePlacement} xKey="branch" bars={[
            { key: 'placed', color: '#0F766E', label: 'Placed' },
            { key: 'total', color: '#E2E8F0', label: 'Total' },
          ]} height={300} />
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-main mb-4">Industry-wise Placement</h3>
          <SimpleBarChart data={industryWisePlacement} xKey="industry" bars={[{ key: 'placements', color: '#7C3AED', label: 'Placements' }]} height={280} />
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-main mb-4">Top Hiring Skills</h3>
          <SimpleBarChart data={topHiringSkills} xKey="skill" bars={[{ key: 'hires', color: '#F97316', label: 'Hires' }]} height={280} />
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-main mb-4">Hiring Distribution by Industry</h3>
        <DemandPieChart data={industryDistribution} height={300} />
      </Card>
    </div>
  );
}
