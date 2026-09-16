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
  const isDemo = !user || user.isDemo;
  const student = user || { ...CURRENT_STUDENT, isDemo: true };
  const topOpportunities = [...OPPORTUNITIES].sort((a, b) => b.match - a.match).slice(0, 3);
  const recentApplications = isDemo ? APPLICATIONS.slice(0, 3) : [];

  const activities = isDemo ? [
    { title: "Application shortlisted", description: "Zoho Corporation — Backend Engineering Intern", time: "2 days ago", dotClass: "bg-secondary" },
    { title: "Interview scheduled", description: "Razorpay — Frontend Developer Intern", time: "3 days ago", dotClass: "bg-accent" },
    { title: "New skill verified", description: "React proficiency marked Advanced", time: "5 days ago", dotClass: "bg-primary" },
  ] : [];

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

      {!isDemo && student.profileCompletion < 100 && (
        <Card className="mb-6 overflow-hidden border-primary/15 bg-gradient-to-r from-primary-soft/50 via-background to-accent-light/30">
          <CardContent className="p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold text-foreground">Complete your profile</h2>
                    <Badge variant="outline">{student.profileCompletion}% complete</Badge>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Add more details about yourself to get more relevant skill insights, opportunity matches and placement recommendations.
                  </p>
                </div>
              </div>
              <Button asChild className="shrink-0">
                <Link to="/student/profile">Complete Profile <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
            <Progress className="mt-4" value={student.profileCompletion} />
          </CardContent>
        </Card>
      )}

      {isDemo && (
      <Card className="mb-6 border-primary/20 bg-primary-soft/30"><CardContent className="p-5"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2"><Badge variant="outline">SIH Skill-to-Placement Loop</Badge>{improved && <Badge variant="success">Skill improved</Badge>}</div><h2 className="mt-2 text-lg font-semibold">Your next best action: {improved ? "Re-match with stronger evidence" : isDemo ? "Improve Power BI from 48% → 75%" : "Build your skill profile"}</h2><p className="mt-1 text-sm text-muted-foreground">{improved ? "Your assessment now verifies Power BI. Check opportunities with the updated match score." : isDemo ? "Power BI is the largest verified gap for your Healthcare Data Analyst target role and has high industry demand." : "Add skills and complete assessments to unlock personalized skill-gap insights."}</p></div><div className="flex gap-2"><Button asChild><Link to={improved ? "/student/opportunities" : isDemo ? "/student/assessment" : "/student/profile"}>{improved ? "View Matches" : isDemo ? "Start Assessment" : "Complete Profile"}</Link></Button><Button variant="ghost" onClick={resetDemo}>Reset Demo</Button></div></div></CardContent></Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Sparkles} label="Skill Score" value={`${student.skillScore || 0}%`} change={isDemo ? "4%" : undefined} accent="primary" index={0} />
        <StatCard icon={Target} label="Placement Readiness" value={`${student.readinessScore || 0}%`} change={isDemo ? "2%" : undefined} accent="accent" index={1} />
        <StatCard icon={Briefcase} label="Active Applications" value={isDemo ? APPLICATIONS.length : 0} accent="secondary" index={2} />
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
                {isDemo
                  ? "You're on track. Complete your roadmap Phase 3 to improve readiness."
                  : "Complete your profile and assessments to calculate your placement readiness."}
              </p>
              <Button variant="soft" size="sm" asChild className="w-full">
                <Link to={isDemo ? "/student/skill-gap" : "/student/profile"}>
                  {isDemo ? "View Skill Gap Analysis" : "Complete Profile"}
                </Link>
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
            {recentApplications.length > 0 ? recentApplications.map((a) => (
              <div key={a.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{a.role}</p>
                  <p className="text-xs text-muted-foreground">{a.company} · Applied {a.appliedDate}</p>
                </div>
                <Badge variant="muted">{a.status}</Badge>
              </div>
            )) : (
              <div className="py-6 text-center text-sm text-muted-foreground">
                You haven't submitted any applications yet.
              </div>
            )}
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
