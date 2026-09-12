import React from "react";
import { GraduationCap, Building2, Briefcase, FileText, Award, Target } from "lucide-react";
import { PageHeader } from "@/components/common/States";
import { StatCard } from "@/components/dashboard/DashboardWidgets";
import { TrendChart, BarTrendChart } from "@/components/charts/ChartComponents";
import { ADMIN_OVERVIEW, STUDENT_GROWTH, OPPORTUNITY_GROWTH, TOP_HIRING_SKILLS } from "@/data/mockAnalytics";

export default function AdminOverview() {
  const o = ADMIN_OVERVIEW;
  return (
    <div>
      <PageHeader title="Institution Overview" description="Platform-wide activity across students, companies and placements." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard icon={GraduationCap} label="Total Students" value={o.totalStudents.toLocaleString()} accent="primary" index={0} />
        <StatCard icon={Building2} label="Companies" value={o.registeredCompanies} accent="secondary" index={1} />
        <StatCard icon={Briefcase} label="Active Opportunities" value={o.activeOpportunities.toLocaleString()} accent="accent" index={2} />
        <StatCard icon={FileText} label="Applications" value={o.applications.toLocaleString()} accent="violet" index={3} />
        <StatCard icon={Award} label="Placements" value={o.placements.toLocaleString()} accent="primary" index={4} />
        <StatCard icon={Target} label="Avg. Skill Match" value={`${o.avgSkillMatch}%`} accent="secondary" index={5} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <TrendChart title="Student Growth" description="Registered students over time" data={STUDENT_GROWTH} xKey="month" yKey="students" color="#0F766E" />
        <TrendChart title="Opportunity Growth" description="New opportunities posted over time" data={OPPORTUNITY_GROWTH} xKey="month" yKey="opportunities" color="#F97316" />
      </div>
      <div className="mt-6">
        <BarTrendChart title="Top Skills Platform-wide" description="Most common skills among registered students" data={TOP_HIRING_SKILLS} xKey="skill" yKey="hires" color="#059669" />
      </div>
    </div>
  );
}
