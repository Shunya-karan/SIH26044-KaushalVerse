import React from "react";
import { PageHeader } from "@/components/common/States";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarTrendChart, SkillRadarChart, IndustryPieChart } from "@/components/charts/ChartComponents";
import { SKILL_DEMAND_TRENDS, EMERGING_SKILLS } from "@/data/mockSkills";
import { SKILL_GAP_RADAR, INDUSTRY_WISE_PLACEMENT } from "@/data/mockAnalytics";

const chartData = SKILL_DEMAND_TRENDS.map((s) => ({ skill: s.skill, demand: s.demand }));

export default function AdminSkillTrends() {
  return (
    <div>
      <PageHeader title="Skill Trends" description="Industry skill demand versus student skill supply, platform-wide." />

      <div className="grid gap-6 lg:grid-cols-2">
        <BarTrendChart title="Top Industry Skills" description="Highest-demand skills across posted opportunities" data={chartData} xKey="skill" yKey="demand" color="#0F766E" />
        <SkillRadarChart title="Student Skill Supply vs Required" description="Aggregate supply-demand comparison" data={SKILL_GAP_RADAR} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>Skill Demand by Industry</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs text-muted-foreground">
                      <th className="px-5 py-3 font-medium">Skill</th>
                      <th className="px-5 py-3 font-medium">Demand Score</th>
                      <th className="px-5 py-3 font-medium">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {SKILL_DEMAND_TRENDS.map((s) => (
                      <tr key={s.skill}>
                        <td className="px-5 py-3.5 font-medium text-foreground">{s.skill}</td>
                        <td className="px-5 py-3.5 text-muted-foreground">{s.demand}/100</td>
                        <td className="px-5 py-3.5"><Badge variant={s.trend.includes("Very") ? "success" : s.trend === "Growing" ? "info" : s.trend === "Emerging" ? "violet" : "muted"}>{s.trend}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader><CardTitle>Emerging Skills</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {EMERGING_SKILLS.map((s) => <Badge key={s} variant="violet">{s}</Badge>)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <IndustryPieChart title="Industry Distribution" description="Share of opportunities by industry" data={INDUSTRY_WISE_PLACEMENT} />
      </div>
    </div>
  );
}
