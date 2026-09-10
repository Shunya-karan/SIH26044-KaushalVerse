import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { Button, Badge } from '../../components/ui';
import {
  Building2,
  Users,
  Briefcase,
  Sparkles,
  PlusCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  UserCheck
} from 'lucide-react';

export const CompanyDashboard = () => {
  const { currentUser } = useAuth();
  const { applicantCandidates, opportunities } = useApp();

  const activeOpps = opportunities.filter(o => o.companyName?.toLowerCase().includes('razorpay'));
  const shortlisted = applicantCandidates.filter(c => c.status === 'Shortlisted');

  return (
    <div className="space-y-8">
      {/* Recruiter Welcome Header */}
      <div className="bg-gradient-to-r from-amber-50/80 via-surface to-surface p-6 sm:p-8 rounded-2xl border border-amber-200/80 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Campus Talent Hub &bull; Razorpay</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-main tracking-tight">
            Welcome back, {currentUser?.name || 'Rajesh Iyer'}!
          </h1>
          <p className="text-xs sm:text-sm text-subtext max-w-xl leading-relaxed">
            Lead Campus Talent Partner &bull; Managing 4 active engineering listings across Mumbai and Bengaluru campuses.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link to="/company/candidate-matching">
            <Button variant="accent" size="sm" icon={Sparkles}>
              Smart Match Feed
            </Button>
          </Link>
          <Link to="/company/post-opportunity">
            <Button variant="primary" size="sm" icon={PlusCircle}>
              Post Opportunity
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Listings"
          value="4"
          subtitle="Frontend, Backend, Trainee"
          icon={Briefcase}
          color="accent"
        />
        <StatCard
          title="Total Applicants"
          value={applicantCandidates.length}
          subtitle="Pre-screened with verified skills"
          icon={Users}
          trend="+12 this week"
          trendPositive={true}
          color="primary"
        />
        <StatCard
          title="Shortlisted Candidates"
          value={shortlisted.length}
          subtitle="High compatibility (≥ 80%)"
          icon={UserCheck}
          color="secondary"
        />
        <StatCard
          title="Interviews Scheduled"
          value="6"
          subtitle="Next: Aarav Sharma (VESASC)"
          icon={Clock}
          color="roadmap"
        />
      </div>

      {/* Hiring Pipeline Funnel Overview */}
      <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-main">Hiring Pipeline Funnel</h3>
            <p className="text-xs text-subtext">Conversion stages across all active campus cohorts</p>
          </div>
          <span className="text-xs font-semibold text-secondary">68% Qualification Rate</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="p-3 rounded-xl bg-slate-50 border border-border">
            <p className="text-xs text-subtext font-semibold">1. Applied</p>
            <p className="text-xl font-bold text-main mt-1">48</p>
            <span className="text-[10px] text-muted">100% Volume</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-border">
            <p className="text-xs text-subtext font-semibold">2. Auto-Matched</p>
            <p className="text-xl font-bold text-primary mt-1">36</p>
            <span className="text-[10px] text-primary">75% Passed</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-xs text-amber-900 font-semibold">3. Shortlisted</p>
            <p className="text-xl font-bold text-accent mt-1">16</p>
            <span className="text-[10px] text-accent">33% Qualified</span>
          </div>
          <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
            <p className="text-xs text-purple-900 font-semibold">4. Technical Interview</p>
            <p className="text-xl font-bold text-roadmap mt-1">6</p>
            <span className="text-[10px] text-roadmap">12% In Screen</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <p className="text-xs text-emerald-900 font-semibold">5. PPO Offers</p>
            <p className="text-xl font-bold text-secondary mt-1">3</p>
            <span className="text-[10px] text-secondary">Final Stage</span>
          </div>
        </div>
      </div>

      {/* Recent High-Compatibility Applicants */}
      <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-main">Top Candidate Matches for Review</h3>
            <p className="text-xs text-subtext">Verified talent ordered by algorithmic skill compatibility</p>
          </div>
          <Link to="/company/candidate-matching" className="text-xs font-semibold text-primary hover:underline">
            View Smart Matching Hub &rarr;
          </Link>
        </div>

        <div className="space-y-3">
          {applicantCandidates.slice(0, 3).map((cand) => (
            <div
              key={cand.id}
              className="p-4 rounded-xl bg-slate-50/70 border border-border hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">
                  {cand.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-main text-sm">{cand.studentName}</p>
                    <Badge variant={cand.status === 'Shortlisted' ? 'secondary' : 'default'}>
                      {cand.status}
                    </Badge>
                  </div>
                  <p className="text-subtext">
                    {cand.college} &bull; CGPA: <strong>{cand.cgpa}</strong> &bull; Applied for: <strong>{cand.roleApplied}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-sm font-extrabold text-secondary">{cand.matchScore}% Match</span>
                  <p className="text-[10px] text-subtext">4/4 Core Skills</p>
                </div>
                <Link to="/company/candidate-matching">
                  <Button variant="outline" size="sm">
                    Inspect Match &rarr;
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
