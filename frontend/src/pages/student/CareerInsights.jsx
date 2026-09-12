import React from "react";
import { PageHeader, SectionLabel } from "@/components/common/States";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DemoBadge } from "@/components/common/Misc";
import { BarTrendChart } from "@/components/charts/ChartComponents";
import { SKILL_DEMAND_TRENDS, EMERGING_SKILLS } from "@/data/mockSkills";
import { TrendingUp } from "lucide-react";

const chartData = SKILL_DEMAND_TRENDS.map((s) => ({ skill: s.skill, demand: s.demand }));

export default function CareerInsights() {
  return (
    <div>
      <PageHeader title="Career Insights" description="Industry skill trends and role demand to guide your learning." action={<DemoBadge />} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BarTrendChart title="Most Demanded Skills" description="Relative industry demand score (0–100)" data={chartData} xKey="skill" yKey="demand" color="#0F766E" />
        </div>
        <Card>
          <CardHeader className="flex-row items-center gap-2 space-y-0"><TrendingUp className="h-5 w-5 text-secondary" /><CardTitle>Emerging Technologies</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {EMERGING_SKILLS.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Skills gaining traction across industry job postings on the platform (sample data).
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle>Skill Demand Detail</CardTitle></CardHeader>
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
  );
}
