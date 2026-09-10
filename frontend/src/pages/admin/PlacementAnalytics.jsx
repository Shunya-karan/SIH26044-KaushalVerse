import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { mockAnalytics } from '../../data/mockAnalytics';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart as PieIcon, Award, DollarSign } from 'lucide-react';

export const PlacementAnalytics = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Institutional Placement Analytics"
        subtitle="Departmental placement success, average package benchmarks, and corporate recruiter distribution."
        breadcrumbs={[{ label: 'Dashboard', link: '/admin/dashboard' }, { label: 'Placement Analytics' }]}
      />

      <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-subtle space-y-4">
        <h3 className="text-base font-bold text-main">Department-wise Placement Percentage</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockAnalytics.branchPlacementRates}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="branch" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} unit="%" />
              <Tooltip />
              <Bar dataKey="placedRate" fill="#0F766E" radius={[4, 4, 0, 0]} name="Placed Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockAnalytics.branchPlacementRates.map((b) => (
          <div key={b.branch} className="p-4 rounded-xl bg-surface border border-border shadow-xs space-y-1 text-xs">
            <p className="font-bold text-main truncate">{b.branch}</p>
            <p className="text-2xl font-extrabold text-secondary">{b.placedRate}%</p>
            <p className="text-subtext">Avg CTC: <strong>₹{b.avgCtc} LPA</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};
