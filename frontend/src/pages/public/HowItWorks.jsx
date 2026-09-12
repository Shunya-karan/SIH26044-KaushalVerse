import React from "react";
import { Link } from "react-router-dom";
import {
  UserPlus, Sparkles, Target, Map, Briefcase, Award, ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/common/States";

const STEPS = [
  { icon: UserPlus, title: "Create Your Profile", desc: "Sign up as a student and build a structured profile with education, projects and skills." },
  { icon: Sparkles, title: "Map Your Skills", desc: "Add technical skills, soft skills, tools and certifications with proficiency levels." },
  { icon: Target, title: "Discover Your Skill Gap", desc: "Pick a target career and see a transparent, explainable match score against required skills." },
  { icon: Map, title: "Follow a Learning Roadmap", desc: "Get a personalized, phased roadmap to close the gap — with resources and duration estimates." },
  { icon: Briefcase, title: "Apply to Opportunities", desc: "Discover internships, jobs and projects ranked by your match score, and apply in a few steps." },
  { icon: Award, title: "Track Placement Progress", desc: "Follow your application through Applied → Review → Shortlisted → Interview → Selected." },
];

const ROLE_JOURNEYS = [
  { role: "Students", points: ["Map skills & track proficiency", "Run skill-gap analysis for target roles", "Follow personalized learning roadmaps", "Apply to matched internships & jobs"] },
  { role: "Companies", points: ["Post internships, jobs & projects", "View ranked, explainable candidate matches", "Manage applicant pipeline & shortlisting", "Access hiring analytics"] },
  { role: "Institutions", points: ["Monitor student readiness at scale", "Track skill trends vs industry demand", "View placement & internship analytics", "Generate institutional reports"] },
];

export default function HowItWorks() {
  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-2xl text-center">
        <SectionLabel>How It Works</SectionLabel>
        <h1 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">From classroom skills to career opportunities</h1>
        <p className="mt-3 text-muted-foreground">A simple, transparent journey connecting students, institutions and industry.</p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((s, i) => (
          <Card key={s.title} className="relative">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary-soft p-2.5 text-primary"><s.icon className="h-5 w-5" /></div>
                <span className="text-xs font-bold text-subtle">STEP {i + 1}</span>
              </div>
              <p className="mt-4 font-semibold text-foreground">{s.title}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-20">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>For Every Stakeholder</SectionLabel>
          <h2 className="mt-4 text-2xl font-bold text-foreground">Built for students, companies and institutions</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {ROLE_JOURNEYS.map((r) => (
            <Card key={r.role}>
              <CardContent className="p-6">
                <p className="font-semibold text-foreground">{r.role}</p>
                <ul className="mt-3 space-y-2">
                  {r.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" /> {p}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-16 flex justify-center">
        <Button size="lg" asChild>
          <Link to="/register">Get Started <ArrowRight className="h-4 w-4" /></Link>
        </Button>
      </div>
    </div>
  );
}
