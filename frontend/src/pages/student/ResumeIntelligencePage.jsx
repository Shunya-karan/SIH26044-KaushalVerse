import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button, Badge } from '../../components/ui';
import { FileText, Upload, CheckCircle2, AlertCircle, Sparkles, Check, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export const ResumeIntelligencePage = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(true);

  const handleSimulatedUpload = (e) => {
    e.preventDefault();
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
      toast.success('Resume analyzed successfully!');
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <PageHeader
        title="Resume Intelligence Scanner"
        subtitle="Automated ATS parsing, competency extraction, and targeted bullet enhancement recommendations."
        breadcrumbs={[{ label: 'Dashboard', link: '/student/dashboard' }, { label: 'Resume Intel' }]}
        badge={
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary-soft text-primary border border-primary-light">
            <Sparkles className="w-3.5 h-3.5" />
            AI Resume Analysis — Demo
          </span>
        }
      />

      {/* Mock Upload Area */}
      <div className="bg-surface rounded-2xl border border-dashed border-border p-8 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-primary-soft text-primary flex items-center justify-center mx-auto">
          <Upload className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-main">Upload or Replace Resume PDF</h3>
          <p className="text-xs text-subtext mt-0.5">Supports PDF and DOCX up to 5MB (Simulated Demo)</p>
        </div>
        <Button variant="primary" size="sm" loading={analyzing} onClick={handleSimulatedUpload}>
          {analyzing ? 'Scanning Resume...' : 'Analyze Sample Resume (Aarav_Sharma.pdf)'}
        </Button>
      </div>

      {analyzed && (
        <div className="space-y-6">
          {/* ATS Score Header */}
          <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-subtext">Overall ATS Readiness</span>
              <h2 className="text-2xl font-bold text-main mt-1">High Recruiter Pass Probability</h2>
              <p className="text-xs text-subtext mt-1 max-w-xl">
                Your resume satisfies 8 of 10 structural parser checks. Adding missing cloud keywords and quantified impact metrics will boost your score to 95+.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center shrink-0">
              <span className="text-4xl font-black text-secondary">84</span>
              <span className="text-xs text-secondary font-bold"> / 100</span>
              <p className="text-[10px] text-emerald-800 font-semibold mt-0.5">ATS Score</p>
            </div>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Detected Skills */}
            <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-3">
              <h3 className="text-sm font-bold text-main flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                Detected Technical Keywords (12)
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {['JavaScript', 'React', 'Node.js', 'Express', 'SQL', 'Git', 'REST APIs', 'Tailwind CSS', 'PostgreSQL', 'HTML5', 'CSS3', 'Agile'].map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 text-xs font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Keywords */}
            <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-3">
              <h3 className="text-sm font-bold text-main flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-accent" />
                Recommended Missing Keywords (4)
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {['Docker Containerization', 'Unit Testing (Jest)', 'Redis Caching', 'CI/CD Pipelines'].map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded bg-orange-50 text-orange-800 border border-orange-200 text-xs font-medium">
                    + {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Actionable Recommendations */}
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-3">
            <h3 className="text-sm font-bold text-main">Recommended Resume Enhancements</h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-border flex items-start gap-2.5">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-main">Quantify your project achievements</p>
                  <p className="text-subtext text-[11px]">Instead of "Built a quiz application", write "Built a quiz application serving 500+ daily student assessments with sub-100ms render speeds."</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-border flex items-start gap-2.5">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-main">Highlight REST API and state management architecture</p>
                  <p className="text-subtext text-[11px]">Mention specific state strategies (Context API, TanStack React Query) in your KaushalVerse project section.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-border flex items-start gap-2.5">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-main">Include Docker in your active coursework</p>
                  <p className="text-subtext text-[11px]">Listing Docker fundamentals will raise your Full Stack role match from 78% to 88%.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
