import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { mockAnalytics } from '../../data/mockAnalytics';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3, Users, Clock, Award } from 'lucide-react';

export const CompanyAnalytics = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Hiring Pipeline & Campus Analytics"
        subtitle="Measure campus hiring velocity, qualification rates, and university applicant distribution."
        breadcrumbs={[{ label: 'Dashboard', link: '/company/dashboard' }, { label: 'Analytics' }]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Average Time to Offer" value="14 Days" subtitle="Down from 38 days manual" color="secondary" />
        <StatCard title="Candidate Quality Index" value="92%" subtitle="Verified skill benchmark" color="primary" />
        <StatCard title="Offer Acceptance Rate" value="88%" subtitle="High intent campus candidates" color="accent" />
      </div>

      <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-4">
        <h3 className="text-sm font-bold text-main">Applicant Volume by Engineering Branch</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockAnalytics.branchPlacementRates}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="branch" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip />
              <Bar dataKey="placedRate" fill="#0F766E" radius={[4, 4, 0, 0]} name="Skill Qualification %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
