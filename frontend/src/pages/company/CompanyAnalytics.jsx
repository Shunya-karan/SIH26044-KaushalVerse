import React from "react";
import { PageHeader } from "@/components/common/States";
import { StatCard } from "@/components/dashboard/DashboardWidgets";
import { TrendChart, BarTrendChart } from "@/components/charts/ChartComponents";
import { Users, Briefcase, Target, Clock } from "lucide-react";
import { OPPORTUNITY_GROWTH, TOP_HIRING_SKILLS } from "@/data/mockAnalytics";

const applicationTrend = [
  { month: "Apr", applications: 28 },
  { month: "May", applications: 41 },
  { month: "Jun", applications: 55 },
  { month: "Jul", applications: 63 },
  { month: "Aug", applications: 89 },
  { month: "Sep", applications: 142 },
];

export default function CompanyAnalytics() {
  return (
    <div>
      <PageHeader title="Analytics" description="Hiring funnel performance and candidate quality trends." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Total Applicants" value="142" change="18%" accent="primary" index={0} />
        <StatCard icon={Briefcase} label="Active Listings" value="6" accent="secondary" index={1} />
        <StatCard icon={Target} label="Avg. Match Score" value="76%" change="5%" accent="accent" index={2} />
        <StatCard icon={Clock} label="Avg. Time to Shortlist" value="3.2 days" changeType="down" change="0.8d" accent="violet" index={3} />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <TrendChart title="Applications Over Time" description="Monthly applicant volume" data={applicationTrend} xKey="month" yKey="applications" color="#0F766E" />
        <BarTrendChart title="Top Skills Among Applicants" description="Most common skills in your candidate pool" data={TOP_HIRING_SKILLS} xKey="skill" yKey="hires" color="#059669" />
      </div>
    </div>
  );
}
