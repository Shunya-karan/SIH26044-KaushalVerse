import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui';
import { Link } from 'react-router-dom';
import { GraduationCap, Building2, School, CheckCircle2, Target, Compass, Briefcase, BarChart } from 'lucide-react';

export const HowItWorksPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <PageHeader
        title="How KaushalVerse Works"
        subtitle="A tri-party collaborative digital framework aligning college students, academic institutions, and industry hiring partners."
        breadcrumbs={[{ label: 'Home', link: '/' }, { label: 'How It Works' }]}
      />

      {/* For Students */}
      <div className="bg-surface rounded-2xl border border-border p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-main">1. For Students & Job Aspirants</h2>
            <p className="text-xs text-subtext">From classroom fundamentals to verified employability</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-border space-y-2">
            <span className="text-xs font-bold text-primary uppercase">Step 1: Skill Mapping</span>
            <p className="text-sm font-semibold text-main">Create Your Skill Profile</p>
            <p className="text-xs text-subtext">Add frameworks, languages, and tools with verified academic transcripts and project evidence.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-border space-y-2">
            <span className="text-xs font-bold text-secondary uppercase">Step 2: Gap Analysis</span>
            <p className="text-sm font-semibold text-main">Target Any Career Role</p>
            <p className="text-xs text-subtext">Select Full Stack, AI/ML, Cloud or HealthTech to discover exact missing competencies with mathematical score breakdowns.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-border space-y-2">
            <span className="text-xs font-bold text-accent uppercase">Step 3: Discover & Apply</span>
            <p className="text-sm font-semibold text-main">Apply with 1-Click Match</p>
            <p className="text-xs text-subtext">Discover internships with real-time match badges. Submit verified credentials and track review timelines transparently.</p>
          </div>
        </div>
      </div>

      {/* For Industry */}
      <div className="bg-surface rounded-2xl border border-border p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-accent flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-main">2. For Industry & Corporate Recruiters</h2>
            <p className="text-xs text-subtext">Zero noise, verified talent shortlisting with explainable compatibility</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-border space-y-2">
            <span className="text-xs font-bold text-accent uppercase">Step 1: Post Requirements</span>
            <p className="text-sm font-semibold text-main">Specify Mandatory vs Preferred Skills</p>
            <p className="text-xs text-subtext">Define concrete role criteria, stipend, duration, and academic eligibility requirements.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-border space-y-2">
            <span className="text-xs font-bold text-primary uppercase">Step 2: Smart Matching</span>
            <p className="text-sm font-semibold text-main">Ranked Candidate Feed</p>
            <p className="text-xs text-subtext">Inspect pre-scored candidate profiles (94%, 88%, etc.) with transparent reasons why each candidate qualifies.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-border space-y-2">
            <span className="text-xs font-bold text-secondary uppercase">Step 3: Seamless Shortlisting</span>
            <p className="text-sm font-semibold text-main">Interview & Placement</p>
            <p className="text-xs text-subtext">Shortlist candidates, trigger technical evaluations, and issue pre-placement offers (PPOs) effortlessly.</p>
          </div>
        </div>
      </div>

      {/* For Institutions */}
      <div className="bg-surface rounded-2xl border border-border p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-roadmap flex items-center justify-center">
            <School className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-main">3. For Colleges, Deans & Placement Cells</h2>
            <p className="text-xs text-subtext">Macro insights, NIRF/NAAC accreditation readiness, and curriculum alignment</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-border space-y-2">
            <span className="text-xs font-bold text-roadmap uppercase">Analytics 1: Macro Trends</span>
            <p className="text-sm font-semibold text-main">Curriculum Supply vs Demand</p>
            <p className="text-xs text-subtext">Identify emerging industry requirements (e.g., Docker, ABDM standards) missing from standard departmental syllabi.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-border space-y-2">
            <span className="text-xs font-bold text-primary uppercase">Analytics 2: Placement Tracking</span>
            <p className="text-sm font-semibold text-main">Branch-wise Outcomes</p>
            <p className="text-xs text-subtext">Monitor real-time placement percentages, average CTCs, and top hiring sectors across all academic branches.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-border space-y-2">
            <span className="text-xs font-bold text-secondary uppercase">Analytics 3: Accreditation Reports</span>
            <p className="text-sm font-semibold text-main">Automated Compliance Exports</p>
            <p className="text-xs text-subtext">Export structured student skill progression records for AICTE, NIRF, and NAAC institutional evaluations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
