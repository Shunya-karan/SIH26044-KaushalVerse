import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';

export const PrivacyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6 text-xs text-subtext leading-relaxed">
      <PageHeader title="Privacy Policy" subtitle="Standards for academic transcript and personal skill data handling." />
      <div className="bg-surface p-8 rounded-2xl border border-border space-y-4 text-xs">
        <h3 className="text-sm font-bold text-main">1. Academic Consent & Data Sovereignty</h3>
        <p>Student profile data, grades, and skill verification assessments are recorded strictly for matching against verified internships. No student personal information is commercialized or shared with unvetted third parties.</p>
        <h3 className="text-sm font-bold text-main">2. Transparent Matching Criteria</h3>
        <p>Candidate ranking algorithms operate with deterministic explainability without opaque automated bias.</p>
        <h3 className="text-sm font-bold text-main">3. Prototype Demonstration Notice</h3>
        <p>All records stored in this application exist in local frontend mock state for Smart India Hackathon jury review.</p>
      </div>
    </div>
  );
};
