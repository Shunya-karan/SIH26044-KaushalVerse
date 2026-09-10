import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { mockAnalytics } from '../../data/mockAnalytics';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertTriangle } from 'lucide-react';

export const SkillTrends = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Macro Skill Demand Trends"
        subtitle="Empirical analytics comparing actual corporate job description requirements against current college course supply."
        breadcrumbs={[{ label: 'Dashboard', link: '/admin/dashboard' }, { label: 'Skill Trends' }]}
      />

      <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-main">Industry Demand vs Curriculum Supply (Top 8 Tech Areas)</h3>
            <p className="text-xs text-subtext">Significant negative gaps warrant curriculum revision or supplemental bootcamps.</p>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockAnalytics.topSkillsDemandVsSupply} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="skill" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip />
              <Bar dataKey="demand" fill="#0F766E" radius={[4, 4, 0, 0]} name="Industry Demand" />
              <Bar dataKey="supply" fill="#059669" radius={[4, 4, 0, 0]} name="College Supply" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-surface border border-border space-y-2">
          <span className="text-xs font-bold text-accent uppercase">Fastest Growing</span>
          <p className="text-xl font-bold text-main">FHIR / ABDM Tech</p>
          <p className="text-xs text-subtext leading-relaxed">+62% YoY demand driven by national health data modernization.</p>
        </div>
        <div className="p-5 rounded-2xl bg-surface border border-border space-y-2">
          <span className="text-xs font-bold text-primary uppercase">Core Essential</span>
          <p className="text-xl font-bold text-main">React & JavaScript</p>
          <p className="text-xs text-subtext leading-relaxed">Present in 92% of all junior full stack & frontend job postings.</p>
        </div>
        <div className="p-5 rounded-2xl bg-surface border border-border space-y-2">
          <span className="text-xs font-bold text-roadmap uppercase">Primary Curriculum Gap</span>
          <p className="text-xl font-bold text-main">Docker & CI/CD</p>
          <p className="text-xs text-subtext leading-relaxed">44% supply deficit between student familiarity and industry hiring requisites.</p>
        </div>
      </div>
    </div>
  );
};
