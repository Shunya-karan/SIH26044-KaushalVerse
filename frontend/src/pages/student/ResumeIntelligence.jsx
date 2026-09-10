import { useState } from 'react';
import { FileCheck2, Upload, Zap, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';
import { PageHeader } from '@/components/common/Shared';
import { Card, Badge, Button, Progress } from '@/components/ui';
import { SimpleBarChart } from '@/components/charts';
import { resumeAnalysisData } from '@/data/mockAnalytics';

export default function ResumeIntelligence() {
  const [uploaded, setUploaded] = useState(false);
  const data = resumeAnalysisData;

  return (
    <div className="space-y-6">
      <PageHeader title="Resume Intelligence" subtitle="AI Resume Analysis — Demo" icon={FileCheck2} />

      <Card className="p-4 bg-violet-light/30 border-violet/20">
        <p className="text-xs text-violet">This is a demo feature. No actual AI processing occurs. Results are simulated for conceptual demonstration.</p>
      </Card>

      {!uploaded ? (
        <Card className="p-8">
          <div className="rounded-xl border-2 border-dashed border-border p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary-soft text-primary flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-main">Upload your resume</h3>
            <p className="mt-2 text-sm text-text-secondary">Upload your resume to get instant analysis, ATS readiness score, and personalized recommendations.</p>
            <p className="mt-1 text-xs text-text-muted">Supports PDF, DOC, DOCX up to 5MB</p>
            <Button className="mt-5" onClick={() => setUploaded(true)}><Upload className="w-4 h-4" />Upload Resume</Button>
          </div>
        </Card>
      ) : (
        <>
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="p-6 flex flex-col items-center justify-center">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 128 128">
                  <circle cx="64" cy="64" r="56" fill="none" stroke="#E2E8F0" strokeWidth="8" />
                  <circle cx="64" cy="64" r="56" fill="none" stroke="#0F766E" strokeWidth="8" strokeDasharray={2 * Math.PI * 56} strokeDashoffset={2 * Math.PI * 56 * (1 - data.score / 100)} strokeLinecap="round" className="transition-all duration-700" />
                </svg>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{data.score}</p>
                  <p className="text-xs text-text-secondary">out of 100</p>
                </div>
              </div>
              <p className="mt-3 text-sm font-medium text-main">Resume Score</p>
              <Button variant="secondary" size="sm" className="mt-3" onClick={() => setUploaded(false)}>Upload New</Button>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-main mb-3 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" />Skills Detected</h3>
              <div className="flex flex-wrap gap-2">
                {data.sections.skillsDetected.map(s => <Badge key={s} variant="success">{s}</Badge>)}
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-text-secondary">Experience</span><span className="font-medium text-main">{data.sections.experience}</span></div>
                <div className="flex justify-between"><span className="text-text-secondary">Education</span><span className="font-medium text-main text-xs">{data.sections.education}</span></div>
                <div className="flex justify-between"><span className="text-text-secondary">Projects Found</span><span className="font-medium text-main">{data.sections.projects}</span></div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-main mb-3 flex items-center gap-2"><AlertCircle className="w-4 h-4 text-error" />Missing Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {data.missingKeywords.map(s => <Badge key={s} variant="error">{s}</Badge>)}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-main">ATS Readiness</span>
                  <span className="text-sm font-semibold text-warning">{data.atsReadiness}%</span>
                </div>
                <Progress value={data.atsReadiness} color="warning" />
                <p className="mt-2 text-xs text-text-muted">Applicant Tracking System compatibility score</p>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="font-semibold text-main mb-4">Section-wise Scores</h3>
            <SimpleBarChart data={data.sectionScores} xKey="section" bars={[{ key: 'score', color: '#0F766E', label: 'Score' }]} height={250} />
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-main mb-4 flex items-center gap-2"><Zap className="w-4 h-4 text-violet" />Recommendations</h3>
            <div className="space-y-3">
              {data.recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <div className="w-6 h-6 rounded-full bg-violet-light text-violet flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
                  <p className="text-sm text-text-secondary">{rec}</p>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
