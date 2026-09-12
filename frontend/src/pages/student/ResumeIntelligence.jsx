import React, { useState } from "react";
import { toast } from "sonner";
import { Upload, FileCheck, Lightbulb, RefreshCcw } from "lucide-react";
import { PageHeader } from "@/components/common/States";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DemoBadge } from "@/components/common/Misc";
import { MatchScore } from "@/components/dashboard/DashboardWidgets";
import { RESUME_ANALYSIS } from "@/data/mockRoadmap";

export default function ResumeIntelligence() {
  const [uploaded, setUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleUpload = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setUploaded(true);
      toast.success("Resume analyzed successfully");
    }, 1200);
  };

  return (
    <div>
      <PageHeader title="Resume Intelligence" description="Get an instant score, ATS readiness check and improvement tips." action={<DemoBadge />} />

      {!uploaded ? (
        <Card>
          <CardContent className="p-10">
            <button
              onClick={handleUpload}
              disabled={analyzing}
              className="flex w-full flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border p-10 text-center hover:border-primary transition-colors disabled:opacity-60"
            >
              <Upload className="h-9 w-9 text-subtle" />
              <span className="font-medium text-foreground">{analyzing ? "Analyzing resume..." : "Upload your resume"}</span>
              <span className="text-xs text-muted-foreground">PDF or DOCX, up to 5MB — AI Resume Analysis (Demo)</span>
            </button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-4">
                <MatchScore score={RESUME_ANALYSIS.score} size="lg" />
                <div>
                  <p className="font-semibold text-foreground">Resume Score: {RESUME_ANALYSIS.score}/100</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5"><FileCheck className="h-3.5 w-3.5 text-success" /> resume_aarav_sharma.pdf</p>
                </div>
              </div>
              <Button variant="outline" onClick={() => setUploaded(false)}>
                <RefreshCcw className="h-4 w-4" /> Re-upload
              </Button>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Resume Breakdown</CardTitle></CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1.5">Skills Detected</p>
                  <div className="flex flex-wrap gap-1.5">
                    {RESUME_ANALYSIS.sections.skillsDetected.map((s) => <Badge key={s} variant="success">{s}</Badge>)}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><p className="text-muted-foreground">Experience</p><p className="text-foreground font-medium">{RESUME_ANALYSIS.sections.experience}</p></div>
                  <div><p className="text-muted-foreground">Projects</p><p className="text-foreground font-medium">{RESUME_ANALYSIS.sections.projects} listed</p></div>
                </div>
                <div><p className="text-muted-foreground">Education</p><p className="text-foreground font-medium">{RESUME_ANALYSIS.sections.education}</p></div>
                <div>
                  <div className="flex justify-between mb-1"><p className="text-muted-foreground">ATS Readiness</p><p className="font-medium text-foreground">{RESUME_ANALYSIS.sections.atsReadiness}%</p></div>
                  <Progress value={RESUME_ANALYSIS.sections.atsReadiness} />
                </div>
                <div>
                  <p className="text-muted-foreground mb-1.5">Missing Keywords</p>
                  <div className="flex flex-wrap gap-1.5">
                    {RESUME_ANALYSIS.sections.missingKeywords.map((s) => <Badge key={s} variant="error">{s}</Badge>)}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex-row items-center gap-2 space-y-0"><Lightbulb className="h-5 w-5 text-accent" /><CardTitle>Recommendations</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {RESUME_ANALYSIS.recommendations.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground rounded-lg border border-border p-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-light text-xs font-bold text-accent">{i + 1}</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
