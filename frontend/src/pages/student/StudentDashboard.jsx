import React from "react";
import { Link } from "react-router-dom";
import {
  Target, Sparkles, Briefcase, TrendingUp, ArrowRight, Bell, Calendar,
} from "lucide-react";
import { PageHeader } from "@/components/common/States";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StatCard, MatchScore, ActivityCard } from "@/components/dashboard/DashboardWidgets";
import { OpportunityCard } from "@/components/opportunities/OpportunityComponents";
import { CURRENT_STUDENT } from "@/data/mockStudents";
import { OPPORTUNITIES } from "@/data/mockOpportunities";
import { APPLICATIONS } from "@/data/mockApplications";
import { SKILL_DEMAND_TRENDS } from "@/data/mockSkills";
import { useAuth } from "@/context/AuthContext";
import { useSIH } from "@/context/SIHContext";

export default function StudentDashboard() {
  const { user } = useAuth();
  const { skills, improved, resetDemo } = useSIH();
  const student = { ...CURRENT_STUDENT, ...user };
  const topOpportunities = [...OPPORTUNITIES].sort((a, b) => b.match - a.match).slice(0, 3);
  const recentApplications = APPLICATIONS.slice(0, 3);

  const activities = [
    { title: "Application shortlisted", description: "Zoho Corporation — Backend Engineering Intern", time: "2 days ago", dotClass: "bg-secondary" },
    { title: "Interview scheduled", description: "Razorpay — Frontend Developer Intern", time: "3 days ago", dotClass: "bg-accent" },
    { title: "New skill verified", description: "React proficiency marked Advanced", time: "5 days ago", dotClass: "bg-primary" },
  ];

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${student.name.split(" ")[0]}`}
        description="Here's a snapshot of your skills, opportunities and placement readiness."
        action={
          <Button asChild>
            <Link to="/student/opportunities">Browse Opportunities <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        }
      />

      <Card className="mb-6 border-primary/20 bg-primary-soft/30"><CardContent className="p-5"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2"><Badge variant="outline">SIH Skill-to-Placement Loop</Badge>{improved && <Badge variant="success">Skill improved</Badge>}</div><h2 className="mt-2 text-lg font-semibold">Your next best action: {improved ? "Re-match with stronger evidence" : "Improve Power BI from 48% → 75%"}</h2><p className="mt-1 text-sm text-muted-foreground">{improved ? "Your assessment now verifies Power BI. Check opportunities with the updated match score." : "Power BI is the largest verified gap for your Healthcare Data Analyst target role and has high industry demand."}</p></div><div className="flex gap-2"><Button asChild><Link to={improved ? "/student/opportunities" : "/student/assessment"}>{improved ? "View Matches" : "Start Assessment"}</Link></Button><Button variant="ghost" onClick={resetDemo}>Reset Demo</Button></div></div></CardContent></Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Sparkles} label="Skill Score" value={`${student.skillScore}%`} change="4%" accent="primary" index={0} />
        <StatCard icon={Target} label="Placement Readiness" value={`${student.readinessScore}%`} change="2%" accent="accent" index={1} />
        <StatCard icon={Briefcase} label="Active Applications" value={APPLICATIONS.length} accent="secondary" index={2} />
        <StatCard icon={TrendingUp} label="Profile Completion" value={`${student.profileCompletion}%`} accent="violet" index={3} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recommended Opportunities</CardTitle>
            <Link to="/student/opportunities" className="text-sm font-medium text-primary hover:underline">View all</Link>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {topOpportunities.slice(0, 2).map((o) => <OpportunityCard key={o.id} opportunity={o} />)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Placement Readiness</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-3 py-2">
              <MatchScore score={student.readinessScore} size="lg" />
              <p className="text-center text-sm text-muted-foreground">
                You're on track. Complete your roadmap Phase 3 to improve readiness.
              </p>
              <Button variant="soft" size="sm" asChild className="w-full">
                <Link to="/student/skill-gap">View Skill Gap Analysis</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Applications</CardTitle>
            <Link to="/student/applications" className="text-sm font-medium text-primary hover:underline">View all</Link>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            {recentApplications.map((a) => (
              <div key={a.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{a.role}</p>
                  <p className="text-xs text-muted-foreground">{a.company} · Applied {a.appliedDate}</p>
                </div>
                <Badge variant="muted">{a.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Upcoming Activity</CardTitle></CardHeader>
          <CardContent>
            <ActivityCard items={activities} />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle>Industry Demand Snapshot</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SKILL_DEMAND_TRENDS.slice(0, 4).map((s) => (
              <div key={s.skill} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-medium text-foreground">{s.skill}</p>
                  <span className="text-xs text-muted-foreground">{s.demand}%</span>
                </div>
                <Progress value={s.demand} />
                <p className="mt-1.5 text-xs text-muted-foreground">{s.trend}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
