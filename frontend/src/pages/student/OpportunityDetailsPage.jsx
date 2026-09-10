import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { Button, Badge, Modal } from '../../components/ui';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Building,
  Calendar,
  DollarSign,
  ArrowRight,
  FileCheck2,
  ShieldCheck,
  Send
} from 'lucide-react';
import { toast } from 'sonner';

export const OpportunityDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { opportunities, skills, studentProfile, applyForOpportunity } = useApp();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyStep, setApplyStep] = useState(1);
  const [customNote, setCustomNote] = useState('');

  const opp = opportunities.find((o) => o.id === id) || opportunities[0];

  const matchedSkills = opp.requiredSkills.filter(r =>
    skills.some(s => s.name.toLowerCase() === r.toLowerCase())
  );
  const missingSkills = opp.requiredSkills.filter(r =>
    !skills.some(s => s.name.toLowerCase() === r.toLowerCase())
  );

  const handleCompleteApplication = () => {
    const res = applyForOpportunity(opp, { customNote });
    if (res.success) {
      toast.success(res.message);
      setIsApplyModalOpen(false);
      setApplyStep(1);
      navigate('/student/applications');
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <PageHeader
        title={opp.title}
        subtitle={`${opp.companyName} &bull; ${opp.location} (${opp.workMode})`}
        breadcrumbs={[
          { label: 'Dashboard', link: '/student/dashboard' },
          { label: 'Opportunities', link: '/student/opportunities' },
          { label: opp.title }
        ]}
        actions={
          <Button variant="primary" size="md" icon={Send} onClick={() => setIsApplyModalOpen(true)}>
            Apply for this Role
          </Button>
        }
      />

      {/* Why you're a good match Card (FLAGSHIP COMPONENT) */}
      <div className="bg-gradient-to-r from-emerald-50/70 via-surface to-surface rounded-2xl border border-emerald-200 p-6 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-secondary text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-emerald-950">Why You're a Strong Match</h3>
              <p className="text-xs text-emerald-800">
                Transparent compatibility calculation based on your verified skills profile
              </p>
            </div>
          </div>
          <span className="text-3xl font-black text-secondary">{opp.matchScore}% Match</span>
        </div>

        <p className="text-xs text-main leading-relaxed">
          You match <strong>{matchedSkills.length} of {opp.requiredSkills.length}</strong> mandatory skills required for this role.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-white border border-emerald-200 space-y-1">
            <span className="font-semibold text-secondary flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Matched Core Skills
            </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {matchedSkills.map((s) => (
                <span key={s} className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-medium text-[11px]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-orange-200 space-y-1">
            <span className="font-semibold text-accent flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Missing Requisites
            </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {missingSkills.length > 0 ? (
                missingSkills.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded bg-orange-50 text-orange-800 font-medium text-[11px]">
                    {s}
                  </span>
                ))
              ) : (
                <span className="text-[11px] text-muted">None! You possess all mandatory core skills.</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Job Description */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-4">
            <h3 className="text-base font-bold text-main">Role Overview</h3>
            <p className="text-xs text-subtext leading-relaxed">{opp.overview}</p>
          </div>

          <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-4">
            <h3 className="text-base font-bold text-main">Key Responsibilities</h3>
            <ul className="space-y-2 text-xs text-subtext">
              {opp.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-4">
            <h3 className="text-base font-bold text-main">Required & Preferred Competencies</h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-main block mb-1">Mandatory Skills:</span>
                <div className="flex flex-wrap gap-1.5">
                  {opp.requiredSkills.map((sk) => (
                    <span key={sk} className="px-2.5 py-1 rounded-lg bg-primary-soft text-primary font-semibold text-[11px] border border-primary-light">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {opp.preferredSkills && opp.preferredSkills.length > 0 && (
                <div className="pt-2">
                  <span className="font-semibold text-main block mb-1">Preferred Bonus Competencies:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {opp.preferredSkills.map((sk) => (
                      <span key={sk} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium text-[11px]">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Key Logistics Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-4">
            <h3 className="text-sm font-bold text-main border-b border-border pb-3">
              Opportunity Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-subtext">Compensation / Stipend</span>
                <p className="font-bold text-main text-sm">{opp.stipend}</p>
              </div>

              <div>
                <span className="text-subtext">Duration</span>
                <p className="font-bold text-main">{opp.duration}</p>
              </div>

              <div>
                <span className="text-subtext">Location & Mode</span>
                <p className="font-bold text-main">{opp.location} &bull; {opp.workMode}</p>
              </div>

              <div>
                <span className="text-subtext">Eligibility</span>
                <p className="font-semibold text-main">{opp.eligibility}</p>
              </div>

              <div>
                <span className="text-subtext">Application Deadline</span>
                <p className="font-semibold text-accent">{opp.deadline}</p>
              </div>
            </div>

            <Button variant="primary" size="md" className="w-full mt-4" icon={Send} onClick={() => setIsApplyModalOpen(true)}>
              Apply Now
            </Button>
          </div>

          <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-3 text-xs">
            <h4 className="font-bold text-main">About {opp.companyName}</h4>
            <p className="text-subtext leading-relaxed">{opp.aboutCompany}</p>
          </div>
        </div>
      </div>

      {/* Multi-Step Application Modal */}
      <Modal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)} title={`Apply: ${opp.title}`}>
        <div className="space-y-4 text-xs">
          {/* Steps Indicator */}
          <div className="flex items-center justify-between border-b border-border pb-3 text-[11px] font-semibold">
            <span className={applyStep === 1 ? 'text-primary font-bold' : 'text-subtext'}>1. Confirm Profile</span>
            <span className="text-muted">&rarr;</span>
            <span className={applyStep === 2 ? 'text-primary font-bold' : 'text-subtext'}>2. Resume & Note</span>
            <span className="text-muted">&rarr;</span>
            <span className={applyStep === 3 ? 'text-primary font-bold' : 'text-subtext'}>3. Submit</span>
          </div>

          {applyStep === 1 && (
            <div className="space-y-3">
              <p className="text-subtext">Verify that your academic records are up to date before submission:</p>
              <div className="p-3 rounded-xl bg-slate-50 border border-border space-y-1">
                <p className="font-bold text-main">{studentProfile.name}</p>
                <p className="text-subtext">{studentProfile.college}</p>
                <p className="text-subtext">{studentProfile.degree} &bull; CGPA: {studentProfile.cgpa}</p>
                <p className="text-primary font-semibold">Match Score: {opp.matchScore}%</p>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="primary" size="sm" onClick={() => setApplyStep(2)}>
                  Proceed to Resume &rarr;
                </Button>
              </div>
            </div>
          )}

          {applyStep === 2 && (
            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-main mb-1">Attached Verified Resume</label>
                <div className="p-3 rounded-xl bg-primary-soft/50 border border-primary-light flex items-center justify-between">
                  <span className="font-semibold text-primary">Aarav_Sharma_Resume_2026.pdf</span>
                  <span className="text-[10px] text-secondary font-bold">88 ATS Score</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-main mb-1">Applicant Note to Recruiter (Optional)</label>
                <textarea
                  rows={3}
                  className="w-full p-2 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
                  placeholder="Share a brief note explaining your relevant project experience..."
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                />
              </div>

              <div className="flex justify-between gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => setApplyStep(1)}>
                  Back
                </Button>
                <Button variant="primary" size="sm" onClick={() => setApplyStep(3)}>
                  Review & Confirm &rarr;
                </Button>
              </div>
            </div>
          )}

          {applyStep === 3 && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                <ShieldCheck className="w-8 h-8 text-secondary mx-auto" />
                <p className="font-bold text-emerald-950 text-sm">Ready for Submission</p>
                <p className="text-[11px] text-emerald-800">
                  Your application will be directly forwarded to the campus hiring desk at <strong>{opp.companyName}</strong>.
                </p>
              </div>

              <div className="flex justify-between gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => setApplyStep(2)}>
                  Back
                </Button>
                <Button variant="secondary" size="sm" icon={CheckCircle2} onClick={handleCompleteApplication}>
                  Confirm & Submit Application
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
