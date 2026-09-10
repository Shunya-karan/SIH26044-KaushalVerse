import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button, Badge } from '../../components/ui';
import { Building2, MapPin, Globe, Mail, Users, CheckCircle2 } from 'lucide-react';

export const CompanyProfile = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Company Profile"
        subtitle="Organization identity, campus talent relations, and enterprise verification."
        breadcrumbs={[{ label: 'Dashboard', link: '/company/dashboard' }, { label: 'Profile' }]}
      />

      <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-subtle space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 text-amber-300 text-xl font-bold flex items-center justify-center shadow-md shrink-0">
            RZ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-main">Razorpay Software Private Limited</h2>
              <Badge variant="success">Verified Recruiter</Badge>
            </div>
            <p className="text-xs text-primary font-semibold mt-0.5">FinTech / Digital Payments Infrastructure</p>
            <p className="text-xs text-subtext mt-1 max-w-xl">
              Powering developer-first payment gateways, neo-banking accounts, and institutional payroll across India.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border text-xs">
          <div>
            <span className="text-subtext">Official Website</span>
            <p className="font-semibold text-main">https://razorpay.com</p>
          </div>
          <div>
            <span className="text-subtext">HQ & Regional Locations</span>
            <p className="font-semibold text-main">Bengaluru &bull; Mumbai &bull; Delhi NCR</p>
          </div>
          <div>
            <span className="text-subtext">Company Size</span>
            <p className="font-semibold text-main">1,000 – 5,000 Employees</p>
          </div>
          <div>
            <span className="text-subtext">Campus Relations Desk</span>
            <p className="font-semibold text-main">campus-relations@razorpay.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
