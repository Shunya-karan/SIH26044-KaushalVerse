import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { Button, Badge } from '../../components/ui';
import { mockAnalytics } from '../../data/mockAnalytics';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import {
  GraduationCap,
  Building2,
  Briefcase,
  TrendingUp,
  Award,
  ShieldCheck,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';

export const AdminDashboard = () => {
  const summary = mockAnalytics.platformSummary;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50/80 via-surface to-surface p-6 sm:p-8 rounded-2xl border border-purple-200/80 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SIH Institutional Command Center &bull; Directorate of Higher Education</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-main tracking-tight">
            Institutional Oversight & Placement Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-subtext max-w-xl leading-relaxed">
            Consolidated metrics monitoring student skill readiness, industry recruiter drives, and curriculum demand alignment.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link to="/admin/skill-trends">
            <Button variant="primary" size="sm" icon={TrendingUp}>
              Macro Skill Trends
            </Button>
          </Link>
          <Link to="/admin/reports">
            <Button variant="outline" size="sm" icon={FileSpreadsheet}>
              Audit Reports
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={summary.totalStudents.toLocaleString('en-IN')}
          subtitle="Across 45+ colleges"
          icon={GraduationCap}
          trend="+11% this quarter"
          color="primary"
        />
        <StatCard
          title="Recruiting Companies"
          value={summary.totalCompanies.toLocaleString('en-IN')}
          subtitle="MNCs, Startups & Public Sector"
          icon={Building2}
          color="secondary"
        />
        <StatCard
          title="Active Opportunities"
          value={summary.totalOpportunities.toLocaleString('en-IN')}
          subtitle="Internships & Campus Hires"
          icon={Briefcase}
          color="accent"
        />
        <StatCard
          title="Average Skill Match"
          value={`${summary.averageSkillMatch}%`}
          subtitle="Verified competency index"
          icon={Award}
          color="roadmap"
        />
      </div>

      {/* Growth Trends Line Chart */}
      <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-main">Monthly Registration & Placement Momentum</h3>
            <p className="text-xs text-subtext">Cumulative progression over recent academic months</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-primary">
              <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
              Enrolled Students
            </span>
            <span className="flex items-center gap-1.5 text-secondary">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary inline-block"></span>
              Placements Concluded
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockAnalytics.monthlyGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip />
              <Line type="monotone" dataKey="students" stroke="#0F766E" strokeWidth={2.5} name="Students" />
              <Line type="monotone" dataKey="placements" stroke="#059669" strokeWidth={2.5} name="Placements" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Curriculum Alert Notice */}
      <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-2">
        <div className="flex items-center gap-2 text-amber-950 font-bold">
          <AlertCircle className="w-4 h-4 text-amber-700" />
          Curriculum Alignment Advisory (Academic Council)
        </div>
        <p className="text-amber-900 leading-relaxed">
          Industry demand for <strong>Containerization (Docker)</strong> and <strong>Healthcare Standards (FHIR / ABDM)</strong> has surged by 45% YoY, while only 38% of pre-final year engineering curricula currently provide hands-on lab electives.
        </p>
        <Link to="/admin/skill-trends" className="font-semibold text-amber-900 underline inline-block">
          Inspect Detailed Curriculum Supply Gap Analysis &rarr;
        </Link>
      </div>
    </div>
  );
};
