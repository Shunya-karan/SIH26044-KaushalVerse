import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import { PageHeader } from '../../components/common/PageHeader';
import { Button, Badge } from '../../components/ui';
import {
  GraduationCap,
  Target,
  Briefcase,
  Compass,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';

export const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const { studentProfile, skills, applications, opportunities, currentTargetRole } = useApp();

  const coreRequired = currentTargetRole.coreSkills;
  const matchedCount = coreRequired.filter(r => skills.some(s => s.name.toLowerCase() === r.toLowerCase())).length;
  const matchPct = Math.round((matchedCount / coreRequired.length) * 100);

  const recommendedOpps = opportunities.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-soft via-surface to-surface p-6 sm:p-8 rounded-2xl border border-primary-light/80 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Session 2025–2026 &bull; Pre-Final Year</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-main tracking-tight">
            Welcome back, {currentUser?.name || studentProfile.name}!
          </h1>
          <p className="text-xs sm:text-sm text-subtext max-w-xl leading-relaxed">
            {studentProfile.college} &bull; {studentProfile.branch} (CGPA: {studentProfile.cgpa})
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link to="/student/skill-gap">
            <Button variant="primary" size="sm" icon={Target}>
              Check Skill Gap
            </Button>
          </Link>
          <Link to="/student/roadmap">
            <Button variant="roadmap" size="sm" icon={Compass}>
              View My Roadmap
            </Button>
          </Link>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Placement Readiness"
          value="88%"
          subtitle="Top 10% in IT department"
          icon={CheckCircle2}
          trend="+6% this month"
          trendPositive={true}
          color="primary"
        />
        <StatCard
          title="Target Role Match"
          value={`${matchPct}%`}
          subtitle={`${matchedCount}/${coreRequired.length} core skills for ${currentTargetRole.title}`}
          icon={Target}
          trend="2 skills missing"
          trendPositive={false}
          color="accent"
        />
        <StatCard
          title="Verified Skills"
          value={skills.length}
          subtitle="8 academically endorsed"
          icon={Layers}
          color="secondary"
        />
        <StatCard
          title="Active Applications"
          value={applications.length}
          subtitle="1 shortlisted for interview"
          icon={Briefcase}
          color="roadmap"
        />
      </div>

      {/* Skill Gap Alert Banner */}
      <div className="p-5 rounded-2xl bg-orange-50/80 border border-orange-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-accent text-white shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-orange-950">
              Actionable Skill Gap Identified for {currentTargetRole.title}
            </h3>
            <p className="text-xs text-orange-800 mt-0.5 leading-relaxed">
              You match {matchedCount} of {coreRequired.length} core skills. Mastering <strong>Docker</strong> and <strong>Testing</strong> will elevate your match score from {matchPct}% to 95%.
            </p>
          </div>
        </div>
        <Link to="/student/skill-gap" className="shrink-0">
          <Button variant="accent" size="sm" icon={ArrowRight} iconPosition="right">
            Resolve Gap
          </Button>
        </Link>
      </div>

      {/* 2-Column Section: Recommended Opportunities & Active Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Recommended Opportunities */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-main">Recommended Opportunities</h2>
              <p className="text-xs text-subtext">Ranked by real-time compatibility with your verified skills</p>
            </div>
            <Link to="/student/opportunities" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
              View all ({opportunities.length}) &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {recommendedOpps.map((opp) => (
              <div
                key={opp.id}
                className="bg-surface p-5 rounded-2xl border border-border hover:border-primary/50 transition-all shadow-subtle space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-xs shadow-xs shrink-0"
                      style={{ backgroundColor: opp.companyColor || '#0F766E' }}
                    >
                      {opp.companyInitials}
                    </div>
                    <div>
                      <Link to={`/student/opportunities/${opp.id}`} className="text-sm font-bold text-main hover:text-primary transition-colors">
                        {opp.title}
                      </Link>
                      <p className="text-xs text-subtext">
                        {opp.companyName} &bull; {opp.location} ({opp.workMode})
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-secondary border border-emerald-200">
                      <Sparkles className="w-3 h-3" />
                      {opp.matchScore}% Match
                    </span>
                    <p className="text-[11px] font-semibold text-main mt-1">{opp.stipend}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/80 text-xs">
                  <div className="flex flex-wrap gap-1.5">
                    {opp.requiredSkills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>

                  <Link to={`/student/opportunities/${opp.id}`}>
                    <Button variant="subtle" size="sm">
                      View Details &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (5 cols): Roadmap Progress & Application Tracker */}
        <div className="lg:col-span-5 space-y-6">
          {/* Current Learning Roadmap Status */}
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-roadmap" />
                <h3 className="text-sm font-bold text-main">Personalized Roadmap</h3>
              </div>
              <span className="text-[10px] font-bold text-roadmap bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                AI Guided
              </span>
            </div>

            <div>
              <p className="text-xs font-semibold text-main">Phase 3: Backend API Engineering & Auth</p>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
                <div className="bg-roadmap h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between text-[11px] text-subtext mt-1.5">
                <span>In Progress (65%)</span>
                <span>2 weeks remaining</span>
              </div>
            </div>

            <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 text-xs space-y-1">
              <p className="font-semibold text-purple-950">Next recommended resource:</p>
              <p className="text-purple-800 text-[11px]">
                Designing RESTful Web APIs &bull; NPTEL / IIT Kharagpur
              </p>
            </div>

            <Link to="/student/roadmap" className="block text-center text-xs font-semibold text-roadmap hover:underline">
              Open Full 5-Phase Roadmap &rarr;
            </Link>
          </div>

          {/* Upcoming Interview Card */}
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-main flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" />
                Upcoming Activity
              </h3>
              <Badge variant="warning">Interview Scheduled</Badge>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-border text-xs space-y-1">
              <p className="font-bold text-main">Razorpay &bull; Round 1 Technical Screening</p>
              <p className="text-subtext flex items-center gap-1 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-muted" />
                14 Mar 2026 at 03:30 PM IST (Virtual)
              </p>
              <p className="text-[11px] text-slate-500 pt-1">
                Topics: JavaScript Core, React Virtual DOM, and REST API concepts.
              </p>
            </div>

            <Link to="/student/applications" className="block text-center text-xs font-semibold text-primary hover:underline">
              View Application Timeline &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
