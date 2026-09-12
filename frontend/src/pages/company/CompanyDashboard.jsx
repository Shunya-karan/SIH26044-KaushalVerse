import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, Users, Target, TrendingUp, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/common/States";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/applications/ApplicationComponents";
import { StatCard } from "@/components/dashboard/DashboardWidgets";
import { CURRENT_COMPANY } from "@/data/mockCompanies";
import { OPPORTUNITIES } from "@/data/mockOpportunities";
import { COMPANY_APPLICANTS } from "@/data/mockApplications";
import { useAuth } from "@/context/AuthContext";

export default function CompanyDashboard() {
  const { user } = useAuth();
  const company = { ...CURRENT_COMPANY, ...user };
  const activeOpportunities = OPPORTUNITIES.slice(0, 4);
  const pipeline = [
    { stage: "Applied", count: 142 },
    { stage: "Under Review", count: 58 },
    { stage: "Shortlisted", count: 26 },
    { stage: "Interview", count: 12 },
    { stage: "Selected", count: 5 },
  ];

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${company.name}`}
        description="Here's an overview of your hiring activity on KaushalVerse."
        action={<Button asChild><Link to="/company/post-opportunity">Post Opportunity <ArrowRight className="h-4 w-4" /></Link></Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Briefcase} label="Active Opportunities" value={activeOpportunities.length} accent="primary" index={0} />
        <StatCard icon={Users} label="Total Applications" value="142" accent="secondary" index={1} />
        <StatCard icon={Target} label="Shortlisted Candidates" value="26" accent="accent" index={2} />
        <StatCard icon={TrendingUp} label="Interviews Scheduled" value="12" accent="violet" index={3} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Applicants</CardTitle>
            <Link to="/company/applications" className="text-sm font-medium text-primary hover:underline">View all</Link>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            {COMPANY_APPLICANTS.slice(0, 4).map((c) => (
              <div key={c.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.college} · {c.match}% match</p>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Hiring Pipeline</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {pipeline.map((p) => (
              <div key={p.stage} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{p.stage}</span>
                <span className="font-semibold text-foreground">{p.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Active Opportunities</CardTitle>
          <Link to="/company/opportunities" className="text-sm font-medium text-primary hover:underline">Manage all</Link>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Role</th>
                  <th className="px-5 py-3 font-medium">Type</th>
                  <th className="px-5 py-3 font-medium">Location</th>
                  <th className="px-5 py-3 font-medium">Deadline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {activeOpportunities.map((o) => (
                  <tr key={o.id}>
                    <td className="px-5 py-3.5 font-medium text-foreground whitespace-nowrap">{o.title}</td>
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{o.type}</td>
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{o.location}</td>
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{o.deadline}</td>
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
