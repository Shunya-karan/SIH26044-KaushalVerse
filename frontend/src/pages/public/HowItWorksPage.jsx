import { Link } from 'react-router-dom';
import {
  GraduationCap, Code2, GitCompare, Route, Briefcase, FileCheck2,
  BarChart3, ArrowRight, CheckCircle2, Network, Users, Building2,
} from 'lucide-react';
import { Badge, Card, Button } from '@/components/ui';

export default function HowItWorksPage() {
  const studentSteps = [
    { icon: GraduationCap, title: 'Create Your Profile', desc: 'Sign up as a student, add your education details, college, branch and personal information.' },
    { icon: Code2, title: 'Map Your Skills', desc: 'Add your technical, soft and tool-based skills with proficiency levels. Track verification status for each skill.' },
    { icon: GitCompare, title: 'Analyze Skill Gaps', desc: 'Select a target career role and see exactly which skills you have and which you need to develop.' },
    { icon: Route, title: 'Follow Learning Roadmap', desc: 'Get a personalized phase-by-phase learning path with recommended resources and estimated duration.' },
    { icon: Briefcase, title: 'Discover Opportunities', desc: 'Browse internships, jobs and projects matched to your skills with transparent match scores.' },
    { icon: CheckCircle2, title: 'Apply & Get Placed', desc: 'Track your applications through every stage — from applied to selected.' },
  ];

  const companySteps = [
    { title: 'Create Company Profile', desc: 'Set up your company with industry, location, size and contact details.' },
    { title: 'Post Opportunities', desc: 'Create internship, job or project listings with required skills and eligibility criteria.' },
    { title: 'Smart Candidate Matching', desc: 'View ranked candidates with transparent match scores and skill-by-skill breakdowns.' },
    { title: 'Manage Applications', desc: 'Shortlist, reject and schedule interviews through a visual hiring pipeline.' },
  ];

  return (
    <div>
      <section className="bg-white border-b border-border py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="primary" className="mb-3">How It Works</Badge>
          <h1 className="text-4xl font-bold text-main">A clear path from skills to success</h1>
          <p className="mt-4 max-w-2xl mx-auto text-text-secondary">KaushalVerse provides a structured, transparent workflow for students, companies and institutions to collaborate effectively.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-main mb-2">For Students</h2>
          <p className="text-text-secondary mb-10">Six steps from profile creation to placement.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {studentSteps.map((step, i) => (
              <Card key={i} className="p-6 relative">
                <div className="absolute top-5 right-5 text-5xl font-bold text-slate-100">{i + 1}</div>
                <div className="w-12 h-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="mt-4 font-semibold text-main">{step.title}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{step.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-main mb-2">For Companies</h2>
          <p className="text-text-secondary mb-10">Hire smarter with transparent candidate matching.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {companySteps.map((step, i) => (
              <Card key={i} className="p-6">
                <div className="w-10 h-10 rounded-lg bg-accent-light text-accent flex items-center justify-center text-sm font-bold">{i + 1}</div>
                <h3 className="mt-4 font-semibold text-main">{step.title}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{step.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-main mb-10">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Code2, title: 'Skill Mapping', desc: 'Add and manage skills across categories with proficiency levels.' },
              { icon: GitCompare, title: 'Skill Gap Analysis', desc: 'Compare your skills against target roles with explainable match scores.' },
              { icon: Briefcase, title: 'Opportunity Discovery', desc: 'Browse and filter internships, jobs and projects by match score.' },
              { icon: Route, title: 'Learning Roadmaps', desc: 'Phase-by-phase learning paths with resources and progress tracking.' },
              { icon: FileCheck2, title: 'Resume Intelligence', desc: 'ATS readiness scoring and keyword gap recommendations.' },
              { icon: BarChart3, title: 'Placement Analytics', desc: 'Industry trends, skill demand and placement dashboards.' },
            ].map((f, i) => (
              <Card key={i} className="p-6">
                <div className="w-11 h-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-semibold text-main">{f.title}</h3>
                <p className="mt-2 text-sm text-text-secondary">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-border text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-bold text-main">Ready to get started?</h2>
          <p className="mt-4 text-text-secondary">Create your account and start your journey with KaushalVerse.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/register"><Button size="lg">Get Started <ArrowRight className="w-4 h-4" /></Button></Link>
            <Link to="/login"><Button variant="secondary" size="lg">Login</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
