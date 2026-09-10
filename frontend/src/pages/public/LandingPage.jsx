import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Badge } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Building2,
  Award,
  ShieldCheck,
  Zap,
  Target,
  FileText,
  Compass,
  HeartPulse,
  ExternalLink,
  ChevronRight,
  Layers
} from 'lucide-react';

export const LandingPage = () => {
  const { loginAs } = useAuth();
  const navigate = useNavigate();

  const handleQuickDemo = (role) => {
    loginAs(role);
    if (role === 'student') navigate('/student/dashboard');
    if (role === 'company') navigate('/company/dashboard');
    if (role === 'admin') navigate('/admin/dashboard');
  };

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-primary-soft/50 via-background to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-soft border border-primary-light text-primary text-xs font-semibold shadow-xs">
                <Award className="w-4 h-4 text-primary" />
                <span>Smart India Hackathon Prototype &bull; Ministry Context</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-main tracking-tight leading-[1.15]">
                Bridging Academia and Industry Through{' '}
                <span className="text-primary underline decoration-primary-light decoration-4 underline-offset-6">
                  Skills
                </span>
              </h1>

              <p className="text-base sm:text-lg text-subtext leading-relaxed max-w-2xl mx-auto lg:mx-0">
                KaushalVerse connects students, institutions and industry through intelligent skill mapping,
                internships, placement opportunities and personalized career pathways.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link to="/student/opportunities">
                  <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                    Explore Opportunities
                  </Button>
                </Link>

                <Link to="/how-it-works">
                  <Button variant="outline" size="lg">
                    See How It Works
                  </Button>
                </Link>
              </div>

              {/* Quick Evaluator Role Launcher */}
              <div className="pt-4 border-t border-border/80">
                <p className="text-xs font-semibold text-subtext mb-2 flex items-center justify-center lg:justify-start gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-accent" />
                  Evaluate live personas (1-Click SIH Evaluation):
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  <button
                    onClick={() => handleQuickDemo('student')}
                    className="px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-semibold text-main hover:border-primary hover:text-primary transition-all shadow-xs"
                  >
                    Student (Aarav Sharma)
                  </button>
                  <button
                    onClick={() => handleQuickDemo('company')}
                    className="px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-semibold text-main hover:border-accent hover:text-accent transition-all shadow-xs"
                  >
                    Recruiter (Razorpay)
                  </button>
                  <button
                    onClick={() => handleQuickDemo('admin')}
                    className="px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-semibold text-main hover:border-purple-600 hover:text-purple-600 transition-all shadow-xs"
                  >
                    Institutional Admin
                  </button>
                </div>
              </div>
            </div>

            {/* Right Hero: Visual Dashboard Preview Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative glow */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-roadmap/20 blur-xl opacity-60"></div>

                <div className="relative bg-surface rounded-2xl border border-border shadow-card p-6 space-y-5">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                        KV
                      </div>
                      <div>
                        <p className="text-xs font-bold text-main">Student Readiness Passport</p>
                        <p className="text-[10px] text-subtext">Verified Skill Mapping Engine</p>
                      </div>
                    </div>
                    <Badge variant="success">88% Placement Ready</Badge>
                  </div>

                  {/* Metrics grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-50 border border-border">
                      <p className="text-[11px] font-semibold text-subtext">Target Career</p>
                      <p className="text-sm font-bold text-main mt-0.5">Full Stack Developer</p>
                      <span className="text-[10px] text-primary font-medium">Core Match: 7/9 Skills</span>
                    </div>

                    <div className="p-3 rounded-xl bg-primary-soft/50 border border-primary-light">
                      <p className="text-[11px] font-semibold text-subtext">Skill Score</p>
                      <p className="text-xl font-extrabold text-primary mt-0.5">78%</p>
                      <span className="text-[10px] text-secondary font-medium">+14% with next phase</span>
                    </div>
                  </div>

                  {/* Skills Snapshot */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-main">Matched Core Skills</span>
                      <span className="text-xs text-success font-semibold">Matched</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['React', 'JavaScript', 'Node.js', 'Express', 'SQL', 'Git', 'REST APIs'].map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-secondary" />
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skill Gap */}
                  <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-orange-950 flex items-center gap-1">
                        <Target className="w-3.5 h-3.5 text-accent" />
                        Identified Skill Gap
                      </span>
                      <span className="text-[10px] font-semibold text-accent uppercase">2 skills missing</span>
                    </div>
                    <div className="flex gap-1.5 mt-1">
                      <span className="px-2 py-0.5 rounded bg-white text-orange-800 border border-orange-300 font-medium text-[11px]">
                        Docker
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white text-orange-800 border border-orange-300 font-medium text-[11px]">
                        Testing (Jest/Cypress)
                      </span>
                    </div>
                  </div>

                  {/* Top Match */}
                  <div className="p-3 rounded-xl bg-slate-900 text-white flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Top Opportunity Match</span>
                      <p className="text-xs font-bold text-white">Razorpay &bull; Frontend Intern</p>
                      <p className="text-[11px] text-slate-300">₹35,000/mo &bull; Bengaluru (Hybrid)</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-secondary">92%</span>
                      <p className="text-[10px] text-slate-400">Match Score</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PLATFORM STATISTICS (DEMO METRICS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface rounded-2xl border border-border shadow-subtle p-6 sm:p-8">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Demonstration Metrics</span>
            <h2 className="text-xl font-bold text-main mt-1">Impact of Standardized Skill Mapping</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-extrabold text-primary">10,400+</p>
              <p className="text-xs font-semibold text-main mt-1">Verified Students</p>
              <p className="text-[11px] text-subtext">Across 45+ Engineering & Science Colleges</p>
            </div>
            <div className="pt-4 md:pt-0 md:pl-6">
              <p className="text-3xl sm:text-4xl font-extrabold text-secondary">520+</p>
              <p className="text-xs font-semibold text-main mt-1">Industry Partners</p>
              <p className="text-[11px] text-subtext">Top MNCs, Fast-growth SaaS & Public Sector</p>
            </div>
            <div className="pt-4 md:pt-0 md:pl-6">
              <p className="text-3xl sm:text-4xl font-extrabold text-accent">2,680+</p>
              <p className="text-xs font-semibold text-main mt-1">Active Opportunities</p>
              <p className="text-[11px] text-subtext">Internships, Trainee Roles & Industry Capstones</p>
            </div>
            <div className="pt-4 md:pt-0 md:pl-6">
              <p className="text-3xl sm:text-4xl font-extrabold text-roadmap">85%</p>
              <p className="text-xs font-semibold text-main mt-1">Average Skill Match</p>
              <p className="text-[11px] text-subtext">Transparent, explainable criteria matching</p>
            </div>
          </div>
          <p className="text-center text-[11px] text-muted mt-6">
            * Figures shown above represent prototype simulation data for SIH jury demonstration.
          </p>
        </div>
      </section>

      {/* 3. HOW KAUSHALVERSE WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Workflow Architecture</span>
          <h2 className="text-3xl font-bold text-main mt-1.5">
            How KaushalVerse Bridges the Academia–Industry Chasm
          </h2>
          <p className="text-sm text-subtext mt-2">
            A cohesive 6-step lifecycle transforming classroom curricula into verified industry employability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { step: '01', title: 'Student Profile', desc: 'Academic records, branch, CGPA, and coursework mapped from accredited colleges.', icon: GraduationCap },
            { step: '02', title: 'Skill Mapping', desc: 'Granular verification of technical tools, frameworks, and practical experience.', icon: Layers },
            { step: '03', title: 'Skill Gap', desc: 'Real-time mathematical delta against live industry JD requirements.', icon: Target },
            { step: '04', title: 'Learning Paths', desc: 'Curated modular roadmaps with free high-quality national and open resources.', icon: Compass },
            { step: '05', title: 'Opportunities', desc: 'Direct discovery of internships and campus drives matching student profiles.', icon: Briefcase },
            { step: '06', title: 'Placement', desc: 'Transparent shortlisting, candidate review, and verified talent placement.', icon: CheckCircle2 },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-surface p-5 rounded-xl border border-border hover:border-primary/50 transition-all shadow-xs relative flex flex-col">
                <span className="text-xs font-black text-primary-light bg-primary/10 w-7 h-7 rounded-lg flex items-center justify-center mb-3">
                  {item.step}
                </span>
                <div className="mb-2">
                  <Icon className="w-5 h-5 text-primary mb-1.5" />
                  <h3 className="text-sm font-bold text-main">{item.title}</h3>
                </div>
                <p className="text-xs text-subtext leading-relaxed flex-1">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. CORE PLATFORM PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Core Modules</span>
          <h2 className="text-3xl font-bold text-main mt-1.5">Intelligent Features Built for Real Impact</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Skill Mapping */}
          <div className="bg-surface p-6 rounded-2xl border border-border shadow-subtle hover:shadow-card transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-main">Granular Skill Mapping</h3>
            <p className="text-xs text-subtext leading-relaxed">
              Standardized taxonomy covering 100+ modern engineering and digital health competencies, tracking proficiency level, years of hands-on practice, and verified certifications.
            </p>
            <Link to="/student/skills" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
              View Skill Management &rarr;
            </Link>
          </div>

          {/* Card 2: Skill Gap Analysis */}
          <div className="bg-surface p-6 rounded-2xl border border-border shadow-subtle hover:shadow-card transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-secondary flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-main">Explainable Skill Gap Engine</h3>
            <p className="text-xs text-subtext leading-relaxed">
              No black-box algorithms. KaushalVerse shows exact matched skills, missing requisites, and provides mathematical score rationales (e.g. 7 of 9 required skills matched).
            </p>
            <Link to="/student/skill-gap" className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:underline">
              Analyze Target Role &rarr;
            </Link>
          </div>

          {/* Card 3: Learning Roadmaps */}
          <div className="bg-surface p-6 rounded-2xl border border-border shadow-subtle hover:shadow-card transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-roadmap flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-main">Personalized Learning Roadmaps</h3>
            <p className="text-xs text-subtext leading-relaxed">
              Phase-by-phase curriculums linking missing skills with accredited coursework (NPTEL, Swayam, Coursera, official documentation) to bridge competency deficits quickly.
            </p>
            <Link to="/student/roadmap" className="inline-flex items-center gap-1 text-xs font-semibold text-roadmap hover:underline">
              Explore Career Pathways &rarr;
            </Link>
          </div>

          {/* Card 4: Opportunity Discovery */}
          <div className="bg-surface p-6 rounded-2xl border border-border shadow-subtle hover:shadow-card transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-info flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-main">Smart Opportunity Discovery</h3>
            <p className="text-xs text-subtext leading-relaxed">
              Filter by stipend, location, duration, and work mode. Every listing calculates real-time match compatibility based on your active verified skills.
            </p>
            <Link to="/student/opportunities" className="inline-flex items-center gap-1 text-xs font-semibold text-info hover:underline">
              Browse Open Roles &rarr;
            </Link>
          </div>

          {/* Card 5: Resume Intelligence */}
          <div className="bg-surface p-6 rounded-2xl border border-border shadow-subtle hover:shadow-card transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-accent flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-main">Resume Intelligence (ATS Scorer)</h3>
            <p className="text-xs text-subtext leading-relaxed">
              Automated parsing detecting technical keywords, project metrics, ATS compliance score (84/100), and targeted improvements before submission.
            </p>
            <Link to="/student/resume" className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline">
              Test Resume Scanner &rarr;
            </Link>
          </div>

          {/* Card 6: Institutional & Placement Analytics */}
          <div className="bg-surface p-6 rounded-2xl border border-border shadow-subtle hover:shadow-card transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-primary flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-main">Placement & Macro Skill Analytics</h3>
            <p className="text-xs text-subtext leading-relaxed">
              Comprehensive dashboards for college administrators, deans, and placement officers to identify curriculum supply vs industry demand gaps.
            </p>
            <Link to="/admin/placement-analytics" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
              View Institutional Analytics &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 5. ACADEMIA-INDUSTRY ECOSYSTEM DIAGRAM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 relative overflow-hidden">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-light">Unified National Pipeline</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-1 text-white">The Connected Collaboration Loop</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Eliminating friction between universities, graduating students, and hiring enterprises through standardized skill APIs.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
            {/* Step 1 */}
            <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700 text-center">
              <GraduationCap className="w-6 h-6 text-primary-light mx-auto mb-2" />
              <p className="text-xs font-bold text-white">1. Students</p>
              <p className="text-[11px] text-slate-400 mt-1">Skill verification, projects & verified transcripts</p>
            </div>

            <div className="hidden sm:flex justify-center text-primary-light font-bold text-xl">&rarr;</div>

            {/* Step 2 */}
            <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700 text-center">
              <Building2 className="w-6 h-6 text-secondary mx-auto mb-2" />
              <p className="text-xs font-bold text-white">2. Institutions</p>
              <p className="text-[11px] text-slate-400 mt-1">Curriculum alignment, accreditation & NOC approval</p>
            </div>

            <div className="hidden sm:flex justify-center text-secondary font-bold text-xl">&rarr;</div>

            {/* Step 3 */}
            <div className="bg-primary/20 p-4 rounded-xl border border-primary text-center">
              <Award className="w-6 h-6 text-primary-light mx-auto mb-2" />
              <p className="text-xs font-bold text-white">3. KaushalVerse</p>
              <p className="text-[11px] text-primary-light mt-1">Skill Gap Engine & Matching Gateway</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
            <div className="hidden sm:block"></div>
            <div className="hidden sm:block"></div>
            <div className="hidden sm:flex justify-center text-accent font-bold text-xl">&darr;</div>
            <div className="hidden sm:block"></div>
            <div className="hidden sm:block"></div>
          </div>

          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700 text-center">
              <Briefcase className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="text-xs font-bold text-white">4. Industry / Employers</p>
              <p className="text-[11px] text-slate-400 mt-1">Direct job post, ranked candidate shortlist, zero noise</p>
            </div>

            <div className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-500/40 text-center">
              <CheckCircle2 className="w-6 h-6 text-secondary mx-auto mb-2" />
              <p className="text-xs font-bold text-white">5. Placement & PPO</p>
              <p className="text-[11px] text-emerald-300 mt-1">Faster hiring turnaround, higher day-1 productivity</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INSTITUTIONAL & GOVERNMENT CONTEXT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Institutional Context & SIH Scope
              </div>
              <h3 className="text-xl font-bold text-main mt-2">
                Conceptual Demonstration — Smart India Hackathon
              </h3>
            </div>
            <p className="text-xs text-subtext max-w-md">
              Addressing Problem Statement: "Portal for Academia–Industry Collaboration for Skill Mapping, Internships and Placement".
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-border space-y-2">
              <h4 className="text-xs font-bold text-main uppercase tracking-wider">Problem Context</h4>
              <p className="text-xs text-subtext leading-relaxed">
                Associated with Government of India initiatives, bridging university talent with emerging digital health standards under the Ministry of Health & Family Welfare.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-border space-y-2">
              <h4 className="text-xs font-bold text-main uppercase tracking-wider">Ayushman Bharat Alignment</h4>
              <p className="text-xs text-subtext leading-relaxed">
                Incorporates specialized healthcare informatics skill mappings (FHIR standards, ABDM registry integration, and HIPAA/DISHA compliance).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-border space-y-2">
              <h4 className="text-xs font-bold text-main uppercase tracking-wider">Institutional Leadership Context</h4>
              <p className="text-xs text-subtext leading-relaxed">
                References institutional leadership: <strong>Shri Jagat Prakash Nadda</strong> (Hon'ble Union Minister of Health & Family Welfare) & <strong>Ms. Punya Salila Srivastava</strong> (Secretary, H&FW).
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-primary-soft border border-primary-light flex items-center justify-between flex-wrap gap-3 text-xs">
            <p className="text-primary-900 font-medium">
              Notice: KaushalVerse is developed exclusively as an academic prototype for Smart India Hackathon evaluation. It does not imply official ministry endorsement.
            </p>
            <Link to="/about" className="font-bold text-primary hover:underline flex items-center gap-1">
              Read Institutional Statement &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 7. DEMO SUCCESS STORIES (TESTIMONIALS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">User Perspectives</span>
          <h2 className="text-2xl font-bold text-main mt-1">Sample Stakeholder Feedback (Demo)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface p-5 rounded-xl border border-border shadow-xs space-y-3">
            <p className="text-xs text-subtext italic">
              "Being able to see exactly why my match score was 78% for a Full Stack role helped me identify that Docker was my bottleneck. The learning roadmap guided me directly to free NPTEL resources."
            </p>
            <div className="flex items-center gap-2.5 pt-2 border-t border-border">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                AS
              </div>
              <div>
                <p className="text-xs font-bold text-main">Aarav Sharma</p>
                <p className="text-[11px] text-subtext">IT Student, VESASC Mumbai</p>
              </div>
            </div>
          </div>

          <div className="bg-surface p-5 rounded-xl border border-border shadow-xs space-y-3">
            <p className="text-xs text-subtext italic">
              "In campus recruitment, screening 1,000 resumes manually is inefficient. KaushalVerse’s transparent candidate matching ranked students with verified skills, cutting shortlisting time by 65%."
            </p>
            <div className="flex items-center gap-2.5 pt-2 border-t border-border">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
                RI
              </div>
              <div>
                <p className="text-xs font-bold text-main">Rajesh Iyer</p>
                <p className="text-[11px] text-subtext">Campus Hiring Lead, Razorpay</p>
              </div>
            </div>
          </div>

          <div className="bg-surface p-5 rounded-xl border border-border shadow-xs space-y-3">
            <p className="text-xs text-subtext italic">
              "As a placement director, the macro skill trends dashboard showed us that Docker and Cloud pipelines were lagging in our 5th semester syllabus. We updated our lab electives accordingly."
            </p>
            <div className="flex items-center gap-2.5 pt-2 border-t border-border">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-800 font-bold flex items-center justify-center text-xs">
                PS
              </div>
              <div>
                <p className="text-xs font-bold text-main">Dr. Pradeep Sengupta</p>
                <p className="text-[11px] text-subtext">Dean & Placement Affairs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-primary text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-card">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight">Ready to bridge the skill gap?</h2>
            <p className="text-sm text-primary-light leading-relaxed">
              Explore the live prototype across student, recruiter, and institutional admin views with instant one-click demo profiles.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                onClick={() => handleQuickDemo('student')}
                className="px-5 py-2.5 rounded-xl bg-white text-primary font-bold text-sm shadow-md hover:bg-primary-soft transition-colors"
              >
                Launch Student Dashboard &rarr;
              </button>
              <Link to="/how-it-works">
                <Button variant="outline" size="md" className="border-white/40 text-white hover:bg-white/10">
                  Read Architecture Guide
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
