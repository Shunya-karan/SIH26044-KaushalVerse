import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Target, Sparkles, Briefcase, Map, FileSearch, BarChart3, ArrowRight, ArrowDown,
  GraduationCap, Landmark, Building2, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionLabel } from "@/components/common/States";
import { DemoBadge } from "@/components/common/Misc";
import { GovernmentContextBanner } from "@/components/common/GovernmentContextBanner";
import { Hero } from "@/pages/public/HeroSection";
import { PLATFORM_STATS, DEMO_TESTIMONIALS } from "@/data/mockAnalytics";

const FEATURES = [
  { icon: Sparkles, title: "Skill Mapping", desc: "Track technical skills, soft skills, tools and certifications in one structured profile.", color: "primary" },
  { icon: Target, title: "Smart Matching", desc: "Transparent, explainable matching between student skills and opportunity requirements.", color: "accent" },
  { icon: Briefcase, title: "Internship Discovery", desc: "Browse curated internships, jobs and projects filtered by skills, location and mode.", color: "secondary" },
  { icon: Map, title: "Learning Roadmaps", desc: "Personalized, phased learning paths to close skill gaps for a chosen career goal.", color: "violet" },
  { icon: FileSearch, title: "Resume Intelligence", desc: "Get resume scoring, ATS readiness checks and keyword recommendations.", color: "primary" },
  { icon: BarChart3, title: "Placement Analytics", desc: "Institution-level dashboards for skill trends, placement rates and industry demand.", color: "secondary" },
];

const FLOW_STEPS = ["Student", "Skill Mapping", "Skill Gap", "Learning", "Opportunities", "Placement"];
const ECOSYSTEM = [
  { icon: GraduationCap, label: "Student" },
  { icon: Landmark, label: "Academic Institution" },
  { icon: Sparkles, label: "KaushalVerse" },
  { icon: Building2, label: "Industry" },
  { icon: Briefcase, label: "Internship / Placement" },
];

const colorMap = {
  primary: "bg-primary-soft text-primary",
  accent: "bg-accent-light text-accent",
  secondary: "bg-secondary-light text-secondary",
  violet: "bg-roadmap-light text-roadmap",
};

export default function Landing() {
  return (
    <div>
      <Hero />

      {/* Stats */}
      <section className="border-y border-border bg-white py-10">
        <div className="container-page">
          <div className="mb-4 flex justify-center"><DemoBadge /></div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {PLATFORM_STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <p className="text-3xl font-extrabold text-primary sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works flow */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>How KaushalVerse Works</SectionLabel>
            <h2 className="mt-4 text-3xl font-bold text-foreground">A clear path from classroom to career</h2>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {FLOW_STEPS.map((step, i) => (
              <React.Fragment key={step}>
                <div className="rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground shadow-card">
                  {step}
                </div>
                {i !== FLOW_STEPS.length - 1 && <ArrowRight className="hidden h-4 w-4 text-subtle sm:block" />}
                {i !== FLOW_STEPS.length - 1 && <ArrowDown className="h-4 w-4 text-subtle sm:hidden" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Core features */}
      <section id="features" className="bg-white py-16 sm:py-20 border-y border-border">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Core Features</SectionLabel>
            <h2 className="mt-4 text-3xl font-bold text-foreground">Everything needed to close the skill gap</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className={`inline-flex rounded-lg p-2.5 ${colorMap[f.color]}`}>
                      <f.icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 font-semibold text-foreground">{f.title}</p>
                    <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Ecosystem</SectionLabel>
            <h2 className="mt-4 text-3xl font-bold text-foreground">One platform, four connected stakeholders</h2>
          </div>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-3">
            {ECOSYSTEM.map((e, i) => (
              <React.Fragment key={e.label}>
                <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-white px-6 py-5 shadow-card min-w-[140px]">
                  <div className="rounded-full bg-primary-soft p-2.5 text-primary"><e.icon className="h-5 w-5" /></div>
                  <p className="text-sm font-medium text-foreground text-center">{e.label}</p>
                </div>
                {i !== ECOSYSTEM.length - 1 && <ArrowDown className="h-4 w-4 text-subtle sm:hidden" />}
                {i !== ECOSYSTEM.length - 1 && <ArrowRight className="hidden h-4 w-4 text-subtle sm:block" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Government context */}
      <section className="bg-white py-16 border-y border-border">
        <div className="container-page">
          <GovernmentContextBanner />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Success Stories</SectionLabel>
            <h2 className="mt-4 text-3xl font-bold text-foreground">What the pilot cohort is saying</h2>
            <p className="mt-2 text-sm text-muted-foreground">Sample testimonials for demonstration purposes.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {DEMO_TESTIMONIALS.map((t) => (
              <Card key={t.name}>
                <CardContent className="p-6">
                  <Badge variant="muted" className="mb-3">{t.tag}</Badge>
                  <p className="text-sm text-foreground">"{t.quote}"</p>
                  <div className="mt-4 flex items-center gap-2">
                    <Users className="h-4 w-4 text-subtle" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="container-page text-center">
          <h2 className="text-3xl font-bold text-white">Ready to bridge the skill gap?</h2>
          <p className="mt-3 text-primary-light">Join as a student, institution or industry partner in this hackathon prototype.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
              <Link to="/how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
