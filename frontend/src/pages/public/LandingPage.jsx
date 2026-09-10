import { Link } from 'react-router-dom';
import {
  ArrowRight, Code2, GitCompare, Briefcase, Route, FileCheck2, BarChart3,
  Users, Building2, GraduationCap, Sparkles, TrendingUp, CheckCircle2,
  Star, Network, Zap,
} from 'lucide-react';
import { Button, Badge, Card } from '@/components/ui';
import { platformStats, testimonials, skillDemandData } from '@/data/mockAnalytics';

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-soft/40 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="primary" className="mb-4 px-3 py-1">
                <Sparkles className="w-3.5 h-3.5" />
                Smart India Hackathon Prototype
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-main leading-[1.1] tracking-tight">
                Bridging Academia and Industry Through Skills
              </h1>
              <p className="mt-5 text-lg text-text-secondary leading-relaxed max-w-xl">
                KaushalVerse connects students, institutions and industry through intelligent skill mapping, internships, placement opportunities and personalized career pathways.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/register">
                  <Button size="lg">Explore Opportunities <ArrowRight className="w-4 h-4" /></Button>
                </Link>
                <Link to="/how-it-works">
                  <Button variant="secondary" size="lg">See How It Works</Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-text-secondary">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success" />Free for students</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success" />No backend required</span>
              </div>
            </div>

            {/* Dashboard preview */}
            <div className="relative">
              <Card className="p-5 shadow-lg border-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-text-secondary">Student Dashboard Preview</p>
                    <p className="font-semibold text-main">Rahul Sharma</p>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-border p-3">
                    <p className="text-xs text-text-secondary">Skill Score</p>
                    <p className="text-2xl font-bold text-primary mt-1">82%</p>
                    <div className="mt-2 h-1.5 rounded-full bg-slate-200">
                      <div className="h-full rounded-full bg-primary" style={{ width: '82%' }} />
                    </div>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <p className="text-xs text-text-secondary">Skill Gap</p>
                    <p className="text-2xl font-bold text-accent mt-1">22%</p>
                    <div className="mt-2 h-1.5 rounded-full bg-slate-200">
                      <div className="h-full rounded-full bg-accent" style={{ width: '22%' }} />
                    </div>
                  </div>
                </div>
                <div className="mt-3 rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-medium text-main">Placement Readiness</p>
                    <span className="text-xs font-semibold text-success">78%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    <div className="h-full rounded-full bg-secondary" style={{ width: '78%' }} />
                  </div>
                </div>
                <div className="mt-3 rounded-lg border border-border p-3">
                  <p className="text-xs font-medium text-main mb-2">Recommended Learning Path</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-secondary" style={{ width: '65%' }} />
                    </div>
                    <span className="text-xs text-text-secondary">Phase 3/5</span>
                  </div>
                </div>
                <div className="mt-3 rounded-lg border border-border p-3">
                  <p className="text-xs font-medium text-main mb-2">Internship Matches</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary">Frontend Dev Intern — TechVista</span>
                      <Badge variant="success">92%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary">ML Intern — DataForge</span>
                      <Badge variant="primary">85%</Badge>
                    </div>
                  </div>
                </div>
              </Card>
              <div className="absolute -top-3 -right-3 hidden sm:block">
                <div className="rounded-xl bg-violet-light px-3 py-2 text-xs font-medium text-violet flex items-center gap-1.5 shadow-sm">
                  <Zap className="w-3.5 h-3.5" />
                  Smart Matching
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform statistics */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {platformStats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-primary">{stat.value.toLocaleString()}{stat.suffix}</p>
                <p className="mt-1 text-sm text-text-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-text-muted">Sample/demo statistics for conceptual demonstration</p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="primary" className="mb-3">How KaushalVerse Works</Badge>
            <h2 className="text-3xl font-bold text-main">From classroom skills to career opportunities</h2>
            <p className="mt-3 text-text-secondary">A clear pathway that guides students from skill mapping to placement.</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: GraduationCap, title: 'Student', desc: 'Create profile & add skills' },
              { icon: Code2, title: 'Skill Mapping', desc: 'AI-driven skill assessment' },
              { icon: GitCompare, title: 'Skill Gap', desc: 'Identify missing skills' },
              { icon: Route, title: 'Learning', desc: 'Personalized roadmap' },
              { icon: Briefcase, title: 'Opportunities', desc: 'Smart-matched roles' },
              { icon: CheckCircle2, title: 'Placement', desc: 'Career success' },
            ].map((step, i) => (
              <div key={i} className="relative">
                <Card className="p-5 text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center mx-auto">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <p className="mt-3 text-xs font-semibold text-primary">Step {i + 1}</p>
                  <h4 className="mt-1 font-semibold text-main text-sm">{step.title}</h4>
                  <p className="mt-1 text-xs text-text-secondary">{step.desc}</p>
                </Card>
                {i < 5 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2.5 z-10 text-text-muted">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core features */}
      <section id="features" className="py-20 bg-white border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="primary" className="mb-3">Core Features</Badge>
            <h2 className="text-3xl font-bold text-main">Everything you need to bridge the skill gap</h2>
            <p className="mt-3 text-text-secondary">Comprehensive tools for students, institutions and industry to collaborate effectively.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Code2, title: 'Skill Mapping', desc: 'Map technical, soft and tool-based skills with proficiency levels and verification status.', color: 'primary' },
              { icon: Network, title: 'Smart Matching', desc: 'Transparent candidate-opportunity matching with explainable match scores.', color: 'secondary' },
              { icon: Briefcase, title: 'Internship Discovery', desc: 'Browse internships, jobs and projects filtered by skills, location and match score.', color: 'accent' },
              { icon: Route, title: 'Learning Roadmaps', desc: 'Personalized phase-by-phase learning paths tailored to your target career role.', color: 'violet' },
              { icon: FileCheck2, title: 'Resume Intelligence', desc: 'ATS readiness scoring, missing keyword detection and actionable resume recommendations.', color: 'info' },
              { icon: BarChart3, title: 'Placement Analytics', desc: 'Industry skill trends, demand analysis and comprehensive placement dashboards.', color: 'primary' },
            ].map((feature, i) => (
              <Card key={i} className="p-6 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  feature.color === 'primary' ? 'bg-primary-soft text-primary' :
                  feature.color === 'secondary' ? 'bg-secondary-light text-secondary' :
                  feature.color === 'accent' ? 'bg-accent-light text-accent' :
                  feature.color === 'violet' ? 'bg-violet-light text-violet' :
                  'bg-sky-100 text-info'
                }`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="mt-4 font-semibold text-main">{feature.title}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem visual */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="primary" className="mb-3">Academia-Industry Ecosystem</Badge>
            <h2 className="text-3xl font-bold text-main">A connected ecosystem for career success</h2>
          </div>
          <div className="flex flex-col items-center gap-3 max-w-md mx-auto">
            {[
              { icon: GraduationCap, label: 'Student', desc: 'Builds skills & profile', color: 'primary' },
              { icon: Building2, label: 'Academic Institution', desc: 'Provides education & guidance', color: 'info' },
              { icon: Network, label: 'KaushalVerse', desc: 'Bridges skills with opportunities', color: 'violet' },
              { icon: Building2, label: 'Industry', desc: 'Shares skill requirements & hires', color: 'accent' },
              { icon: CheckCircle2, label: 'Internship / Placement', desc: 'Career outcome achieved', color: 'secondary' },
            ].map((node, i) => (
              <div key={i} className="w-full flex flex-col items-center">
                <Card className="p-4 w-full max-w-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    node.color === 'primary' ? 'bg-primary-soft text-primary' :
                    node.color === 'info' ? 'bg-sky-100 text-info' :
                    node.color === 'violet' ? 'bg-violet-light text-violet' :
                    node.color === 'accent' ? 'bg-accent-light text-accent' :
                    'bg-secondary-light text-secondary'
                  }`}>
                    <node.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-main text-sm">{node.label}</p>
                    <p className="text-xs text-text-secondary">{node.desc}</p>
                  </div>
                </Card>
                {i < 4 && <div className="w-px h-6 bg-border" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Government / SIH context */}
      <section className="py-20 bg-white border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="primary" className="mb-3">Institutional Context</Badge>
              <h2 className="text-3xl font-bold text-main">Built for the Smart India Hackathon</h2>
              <p className="mt-4 text-text-secondary leading-relaxed">
                KaushalVerse is developed as a Smart India Hackathon prototype addressing the academia-industry collaboration problem statement — bridging the gap between academic skills and industry requirements through skill mapping, internships and placement.
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-main text-sm">Government of India Initiative</p>
                    <p className="text-sm text-text-secondary">Aligned with the Smart India Hackathon mission to solve real-world problems through technology.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary-light text-secondary flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-main text-sm">Ministry of Health & Family Welfare</p>
                    <p className="text-sm text-text-secondary">Associated with the Ministry's context for digital innovation and skill development.</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 rounded-xl border border-border bg-bg p-4">
                <p className="text-xs text-text-muted">
                  Conceptual Demonstration — Smart India Hackathon. This is a prototype and not an officially endorsed government product.
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-text-secondary">Union Minister, Health & FW</p>
                    <p className="font-medium text-main">Shri Jagat Prakash Nadda</p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Secretary, Health & FW</p>
                    <p className="font-medium text-main">Ms. Punya Salila Srivastava</p>
                  </div>
                </div>
              </div>
            </div>
            <Card className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                  <Network className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-bold text-main text-lg">KaushalVerse</p>
                  <p className="text-sm text-text-secondary">SIH Hackathon Prototype</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  'Bridging Skills. Connecting Academia & Industry.',
                  'From classroom skills to career opportunities.',
                  'Smart skill mapping with transparent match scores.',
                  'Personalized learning roadmaps for career growth.',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                    <span className="text-sm text-main">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-text-muted">
                  "Developed as a Smart India Hackathon prototype addressing academia-industry collaboration, skill mapping, internships and placement."
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="primary" className="mb-3">Success Stories</Badge>
            <h2 className="text-3xl font-bold text-main">Demo testimonials</h2>
            <p className="mt-3 text-text-secondary">Sample content for conceptual demonstration.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <Card key={i} className="p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">"{t.content}"</p>
                <div className="mt-4 flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-primary-soft text-primary font-semibold flex items-center justify-center text-sm">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-main text-sm">{t.name}</p>
                    <p className="text-xs text-text-secondary">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white border-t border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-main">Ready to bridge the skill gap?</h2>
          <p className="mt-4 text-lg text-text-secondary">Join KaushalVerse today and take the next step in your career journey.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/register">
              <Button size="lg">Get Started <ArrowRight className="w-4 h-4" /></Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg">Login</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
