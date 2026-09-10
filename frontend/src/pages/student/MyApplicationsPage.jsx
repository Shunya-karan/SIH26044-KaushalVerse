import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button, Badge, Modal } from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { FileCheck2, Clock, CheckCircle2, ChevronRight, AlertCircle, Sparkles } from 'lucide-react';

export const MyApplicationsPage = () => {
  const { applications } = useApp();
  const [selectedApp, setSelectedApp] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Shortlisted':
        return <Badge variant="secondary">Shortlisted</Badge>;
      case 'Under Review':
        return <Badge variant="warning">Under Review</Badge>;
      case 'Interview':
        return <Badge variant="accent">Interview Scheduled</Badge>;
      case 'Selected':
        return <Badge variant="success">Selected / Offer</Badge>;
      case 'Rejected':
        return <Badge variant="error">Not Selected</Badge>;
      default:
        return <Badge variant="default">Applied</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Application Tracker"
        subtitle="Monitor the review progress, shortlist decisions, and interview schedules for all your submissions."
        breadcrumbs={[{ label: 'Dashboard', link: '/student/dashboard' }, { label: 'Applications' }]}
      />

      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-surface p-6 rounded-2xl border border-border shadow-subtle hover:border-primary/50 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-xs shadow-xs"
                  style={{ backgroundColor: app.companyColor || '#0F766E' }}
                >
                  {app.companyInitials}
                </div>
                <div>
                  <h3 className="text-base font-bold text-main">{app.role}</h3>
                  <p className="text-xs text-subtext">
                    <strong className="text-main">{app.companyName}</strong> &bull; Applied on {app.appliedDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-primary bg-primary-soft px-2.5 py-1 rounded-full border border-primary-light">
                  {app.matchScore}% Match
                </span>
                {getStatusBadge(app.status)}
              </div>
            </div>

            {/* Note & Last Update */}
            <div className="p-3 rounded-xl bg-slate-50 border border-border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-subtext italic">{app.notes}</span>
              <span className="text-[11px] text-muted shrink-0">Updated: {app.lastUpdated}</span>
            </div>

            <div className="flex justify-end pt-1">
              <Button variant="outline" size="sm" onClick={() => setSelectedApp(app)}>
                View Stage Timeline &rarr;
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Stage Timeline Modal */}
      {selectedApp && (
        <Modal isOpen={true} onClose={() => setSelectedApp(null)} title={`Timeline: ${selectedApp.role}`}>
          <div className="space-y-4 text-xs">
            <div className="border-b border-border pb-3">
              <p className="font-bold text-main">{selectedApp.companyName}</p>
              <p className="text-subtext">Applied on {selectedApp.appliedDate}</p>
            </div>

            <div className="space-y-3">
              {selectedApp.timeline.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    step.completed ? 'bg-secondary text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {step.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`font-semibold ${step.completed ? 'text-main' : 'text-subtext'}`}>
                        {step.step}
                      </p>
                      <span className="text-[10px] text-muted">{step.date}</span>
                    </div>
                    <p className="text-[11px] text-subtext leading-relaxed">{step.details}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-border flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setSelectedApp(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
