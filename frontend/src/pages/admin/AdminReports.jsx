import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui';
import { FileSpreadsheet, Download, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const AdminReports = () => {
  const handleExport = (reportName) => {
    toast.success(`Generated ${reportName} (Simulated Download)`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Institutional Accreditation Reports"
        subtitle="Export standardized skill progression and placement verification datasets for NAAC / NIRF / AICTE compliance."
        breadcrumbs={[{ label: 'Dashboard', link: '/admin/dashboard' }, { label: 'Reports' }]}
      />

      <div className="space-y-4">
        {[
          { title: 'NIRF Criterion 3: Student Placement & Higher Studies Audit', format: 'Excel (.XLSX) & PDF', period: 'AY 2025-26' },
          { title: 'NAAC Metric 5.2.1: Competitive Exam & Campus Hiring Report', format: 'CSV Data Feed', period: 'Consolidated' },
          { title: 'AICTE Skill Matrix & Industry Internship Compliance Record', format: 'PDF Signed Summary', period: 'AY 2025-26' },
          { title: 'Ministry HealthTech Cohort Skill Certification Manifest', format: 'JSON / ABDM Export', period: 'Active Batches' }
        ].map((rep, idx) => (
          <div key={idx} className="bg-surface rounded-2xl border border-border p-5 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div>
              <h4 className="font-bold text-main">{rep.title}</h4>
              <p className="text-subtext mt-0.5">Format: {rep.format} &bull; Reporting Period: {rep.period}</p>
            </div>
            <Button variant="primary" size="sm" icon={Download} onClick={() => handleExport(rep.title)}>
              Download Export
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
