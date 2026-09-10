import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { mockAnalytics } from '../../data/mockAnalytics';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Award, DollarSign, PieChart as PieIcon } from 'lucide-react';

export const CareerInsightsPage = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Industry Career Insights & Skill Trends"
        subtitle="Live industry skill demand tracking, branch hiring benchmarks, and CTC distributions."
        breadcrumbs={[{ label: 'Dashboard', link: '/student/dashboard' }, { label: 'Career Insights' }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Chart 1: Skill Demand vs Supply */}
        <div className="lg:col-span-8 bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-main">Industry Demand vs Student Supply</h3>
              <p className="text-xs text-subtext">Highlighted gaps indicate highest placement salary leverage</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-primary">
                <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
                Industry Demand
              </span>
              <span className="flex items-center gap-1.5 text-secondary">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary inline-block"></span>
                Student Supply
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockAnalytics.topSkillsDemandVsSupply} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="skill" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip />
                <Bar dataKey="demand" fill="#0F766E" radius={[4, 4, 0, 0]} name="Industry Demand" />
                <Bar dataKey="supply" fill="#059669" radius={[4, 4, 0, 0]} name="Student Supply" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Industry Distribution */}
        <div className="lg:col-span-4 bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-4">
          <div>
            <h3 className="text-sm font-bold text-main">Top Hiring Sectors</h3>
            <p className="text-xs text-subtext">Distribution of active openings</p>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockAnalytics.industryDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                  innerRadius={45}
                  paddingAngle={3}
                >
                  {mockAnalytics.industryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {mockAnalytics.industryDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-subtext">
                  <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-semibold text-main">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Salary CTC Brackets */}
      <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-4">
        <h3 className="text-sm font-bold text-main">Placement CTC Package Brackets (Demo Data)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {mockAnalytics.salaryDistribution.map((sal) => (
            <div key={sal.range} className="p-4 rounded-xl bg-slate-50 border border-border">
              <span className="text-xs font-bold text-primary">{sal.range}</span>
              <p className="text-2xl font-extrabold text-main mt-1">{sal.percentage}%</p>
              <p className="text-[11px] text-subtext">{sal.count} placements</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
