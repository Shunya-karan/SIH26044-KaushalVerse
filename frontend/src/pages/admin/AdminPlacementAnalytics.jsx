import React from "react";
import { PageHeader } from "@/components/common/States";
import { StatCard } from "@/components/dashboard/DashboardWidgets";
import { TrendChart, BarTrendChart, IndustryPieChart } from "@/components/charts/ChartComponents";
import { Award, Briefcase, Target, TrendingUp } from "lucide-react";
import {
  PLACEMENT_TRENDS, BRANCH_WISE_PLACEMENT, INDUSTRY_WISE_PLACEMENT, TOP_HIRING_SKILLS,
} from "@/data/mockAnalytics";

export default function AdminPlacementAnalytics() {
  return (
    <div>
      <PageHeader title="Placement Analytics" description="Institution-wide placement and internship performance." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Award} label="Placement Rate" value="84%" change="5%" accent="primary" index={0} />
        <StatCard icon={Briefcase} label="Internship Rate" value="91%" change="3%" accent="secondary" index={1} />
        <StatCard icon={Target} label="Avg. Match Score" value="79%" accent="accent" index={2} />
        <StatCard icon={TrendingUp} label="Top Hiring Industry" value="IT Services" accent="violet" index={3} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <TrendChart title="Placement Trends" description="Year-on-year placement rate (%)" data={PLACEMENT_TRENDS} xKey="year" yKey="rate" color="#0F766E" />
        <BarTrendChart title="Branch-wise Placement" description="Placement rate by engineering branch (%)" data={BRANCH_WISE_PLACEMENT} xKey="branch" yKey="rate" color="#059669" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <IndustryPieChart title="Industry-wise Placement" description="Share of placements by industry" data={INDUSTRY_WISE_PLACEMENT} />
        <BarTrendChart title="Skill-wise Hiring" description="Students hired per top skill" data={TOP_HIRING_SKILLS} xKey="skill" yKey="hires" color="#F97316" />
      </div>
    </div>
  );
}
