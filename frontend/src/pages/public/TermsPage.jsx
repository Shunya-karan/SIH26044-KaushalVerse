import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';

export const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6 text-xs text-subtext leading-relaxed">
      <PageHeader title="Terms of Use" subtitle="Guidelines governing usage of the KaushalVerse collaborative portal." />
      <div className="bg-surface p-8 rounded-2xl border border-border space-y-4 text-xs">
        <h3 className="text-sm font-bold text-main">1. Hackathon Scope</h3>
        <p>KaushalVerse is an open academic innovation prototype submitted under Smart India Hackathon problem statements.</p>
        <h3 className="text-sm font-bold text-main">2. Role Responsibilities</h3>
        <p>Students must provide truthful academic coursework details. Industry partners must honor posted stipends and work conditions.</p>
      </div>
    </div>
  );
};
