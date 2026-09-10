import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Award, ShieldCheck, HeartPulse, ExternalLink } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <PageHeader
        title="About & Institutional Context"
        subtitle="Bridging academic coursework with industrial requirements under Smart India Hackathon guidelines."
        breadcrumbs={[{ label: 'Home', link: '/' }, { label: 'About' }]}
      />

      {/* Problem Statement Card */}
      <div className="bg-surface rounded-2xl border border-border p-8 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-soft text-primary font-semibold text-xs border border-primary-light">
          <Award className="w-4 h-4" />
          Smart India Hackathon Problem Statement
        </div>
        <h2 className="text-2xl font-bold text-main">
          "Portal for Academia–Industry Collaboration for Skill Mapping, Internships and Placement"
        </h2>
        <p className="text-sm text-subtext leading-relaxed">
          The traditional academic ecosystem frequently experiences a lag between university syllabus cycles and rapidly evolving industry software engineering standards. KaushalVerse was conceived to eliminate this gap through transparent skill verification, actionable curriculum gap identification, and meritocratic candidate matching.
        </p>
      </div>

      {/* Ministry Context & Leadership */}
      <div className="bg-surface rounded-2xl border border-border p-8 space-y-6">
        <div className="flex items-center gap-2 text-main font-bold text-lg">
          <HeartPulse className="w-5 h-5 text-secondary" />
          Ministry & Public Health Context
        </div>
        <p className="text-sm text-subtext leading-relaxed">
          The problem statement is associated with the national digital modernization framework, specifically drawing context from the <strong>Ministry of Health & Family Welfare</strong> and the <strong>Ayushman Bharat Digital Mission (ABDM)</strong>. In health technology and public governance, verified digital capabilities—such as FHIR interoperability, electronic medical record security, and clinical API development—are vital national priorities.
        </p>

        {/* Leadership Reference Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="p-5 rounded-xl bg-slate-50 border border-border space-y-1">
            <span className="text-[11px] uppercase tracking-wider font-bold text-primary">Union Cabinet Leadership</span>
            <p className="text-base font-bold text-main">Shri Jagat Prakash Nadda</p>
            <p className="text-xs text-subtext">Hon'ble Union Minister of Health & Family Welfare</p>
            <p className="text-[11px] text-muted pt-2 border-t border-border/60">
              Government of India
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-border space-y-1">
            <span className="text-[11px] uppercase tracking-wider font-bold text-primary">Executive Leadership</span>
            <p className="text-base font-bold text-main">Ms. Punya Salila Srivastava</p>
            <p className="text-xs text-subtext">Secretary, Ministry of Health & Family Welfare</p>
            <p className="text-[11px] text-muted pt-2 border-t border-border/60">
              Government of India
            </p>
          </div>
        </div>
      </div>

      {/* Prototype Statement */}
      <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-2">
        <div className="flex items-center gap-2 font-bold text-sm">
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          Hackathon Disclaimer & Architectural Integrity
        </div>
        <p className="leading-relaxed">
          KaushalVerse is designed and implemented strictly as a prototype for the Smart India Hackathon. It does not represent an officially certified or commissioned Government of India web portal, nor does it imply official ministerial endorsement. All datasets, student records, and company listings provided herein serve demonstration purposes.
        </p>
      </div>
    </div>
  );
};
