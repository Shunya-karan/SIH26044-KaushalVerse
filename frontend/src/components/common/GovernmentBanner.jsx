import React from 'react';
import { ShieldCheck, Info, Award } from 'lucide-react';

export const GovernmentBanner = () => {
  return (
    <div className="bg-slate-900 text-slate-200 text-xs border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-primary/20 text-primary-light border border-primary/40 font-semibold tracking-wide text-[11px]">
            <Award className="w-3.5 h-3.5 text-primary-light" />
            Smart India Hackathon Prototype
          </span>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-slate-300 hidden md:inline">
            Ministry of Health & Family Welfare Context — Conceptual Demonstration
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-400 text-[11px]">
          <span className="hidden lg:inline">
            Institutional Leadership: Shri J.P. Nadda (Union Minister) &bull; Ms. Punya Salila Srivastava (Secretary, H&FW)
          </span>
          <span className="flex items-center gap-1 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
            Academia–Industry Framework
          </span>
        </div>
      </div>
    </div>
  );
};
