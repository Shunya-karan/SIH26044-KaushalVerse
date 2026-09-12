import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  MapPin, Clock, Briefcase, Calendar, ArrowLeft, CheckCircle2, Upload, FileCheck,
} from "lucide-react";
import { PageHeader, ErrorState } from "@/components/common/States";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { MatchExplanation, SkillBadgeList } from "@/components/opportunities/OpportunityComponents";
import { OPPORTUNITIES } from "@/data/mockOpportunities";
import { CURRENT_STUDENT } from "@/data/mockStudents";
import { COMPETENCY_BLUEPRINT, MATCH_WEIGHTS } from "@/data/sihDemoData";
import { useSIH } from "@/context/SIHContext";

const STEPS = ["Confirm Profile", "Upload Resume", "Review", "Submit"];

export default function OpportunityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const opportunity = OPPORTUNITIES.find((o) => o.id === id);
  const { skills } = useSIH();

  const [applyOpen, setApplyOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!opportunity) {
    return (
      <ErrorState
        title="Opportunity not found"
        description="This opportunity may have been removed or the link is incorrect."
        action={<Button className="mt-2" onClick={() => navigate("/student/opportunities")}>Back to Opportunities</Button>}
      />
    );
  }

  const currentSkillNames = skills.map((s) => s.name);
  const matched = opportunity.skills.filter((s) => currentSkillNames.includes(s));
  const missing = opportunity.skills.filter((s) => !currentSkillNames.includes(s));
  const healthTech = opportunity.id === 'opp-health-001';
  const matchScore = healthTech
    ? Math.min(95, Math.round(opportunity.match + (skills.find((s) => s.name === 'Power BI')?.score > 70 ? 19 : 0)))
    : opportunity.match;

  const resetApply = () => {
    setStep(0);
    setResumeUploaded(false);
    setSubmitted(false);
  };

  const handleApplyOpen = () => {
    resetApply();
    setApplyOpen(true);
  };

  const handleNext = () => {
    if (step === 1 && !resumeUploaded) {
      toast.error("Please upload your resume to continue");
      return;
    }
    if (step === STEPS.length - 1) {
      setSubmitted(true);
      toast.success("Application submitted successfully.");
      return;
    }
    setStep(step + 1);
  };

  return (
    <div>
      <Link to="/student/opportunities" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to Opportunities
      </Link>

      <PageHeader
        title={opportunity.title}
        description={`${opportunity.company} · ${opportunity.companyIndustry}`}
        action={<Button size="lg" onClick={handleApplyOpen}>Apply Now</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{opportunity.location}</span>
                <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" />{opportunity.mode}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{opportunity.duration}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />Deadline: {opportunity.deadline}</span>
              </div>
              <p className="text-sm text-foreground">{opportunity.about}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Responsibilities</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {opportunity.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {r}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Required &amp; Preferred Skills</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="mb-1.5 text-xs font-medium text-muted-foreground">Required Skills</p>
                <SkillBadgeList skills={opportunity.skills} />
              </div>
              <div>
                <p className="mb-1.5 text-xs font-medium text-muted-foreground">Preferred Skills</p>
                <SkillBadgeList skills={opportunity.preferredSkills} variant="muted" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Eligibility</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-foreground">{opportunity.eligibility}</p></CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <MatchExplanation match={matchScore} matched={matched} missing={missing} total={opportunity.skills.length} />
          {healthTech && <Card className="border-primary/20 bg-primary-soft/20">
            <CardHeader><CardTitle>Why this match?</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {MATCH_WEIGHTS.map(([label, weight]) => <div key={label} className="flex items-center justify-between text-sm"><span className="text-muted-foreground">{label}</span><span className="font-semibold">{weight}%</span></div>)}
              <div className="rounded-lg bg-white p-3 text-xs text-muted-foreground">{skills.find((s) => s.name === 'Power BI')?.score > 70 ? 'Your Power BI reassessment moved this demo match from 72% to 91%.' : 'A Power BI skill gap is holding this match at 72%. Complete the assessment to improve it.'}</div>
              <Link to="/student/skill-passport" className="text-sm font-medium text-primary hover:underline">View Skill Passport →</Link>
            </CardContent>
          </Card>}
          <Card>
            <CardContent className="p-5 space-y-3">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Stipend / Salary</span><span className="font-semibold text-foreground">{opportunity.stipend}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Duration</span><span className="font-semibold text-foreground">{opportunity.duration}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Posted</span><span className="font-semibold text-foreground">{opportunity.postedDate}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Type</span><Badge variant="muted">{opportunity.type}</Badge></div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={applyOpen} onOpenChange={setApplyOpen}>
        <DialogContent>
          {!submitted ? (
            <>
              <DialogHeader>
                <DialogTitle>Apply to {opportunity.title}</DialogTitle>
              </DialogHeader>

              <div className="mb-5 flex items-center justify-between">
                {STEPS.map((s, i) => (
                  <div key={s} className="flex items-center flex-1">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${i <= step ? "bg-primary text-white" : "bg-muted text-subtle"}`}>
                      {i + 1}
                    </div>
                    {i !== STEPS.length - 1 && <div className={`h-0.5 flex-1 mx-1 ${i < step ? "bg-primary" : "bg-border"}`} />}
                  </div>
                ))}
              </div>

              {step === 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Confirm your profile details before applying.</p>
                  <div className="rounded-lg border border-border p-4 space-y-1.5 text-sm">
                    <p><span className="text-muted-foreground">Name:</span> {CURRENT_STUDENT.name}</p>
                    <p><span className="text-muted-foreground">College:</span> {CURRENT_STUDENT.college}</p>
                    <p><span className="text-muted-foreground">Branch:</span> {CURRENT_STUDENT.branch}</p>
                    <p><span className="text-muted-foreground">CGPA:</span> {CURRENT_STUDENT.cgpa}</p>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Upload your resume (demo upload — no file is actually transmitted).</p>
                  <button
                    onClick={() => { setResumeUploaded(true); toast.success("Resume uploaded"); }}
                    className="flex w-full flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border p-8 text-center hover:border-primary"
                  >
                    {resumeUploaded ? <FileCheck className="h-8 w-8 text-success" /> : <Upload className="h-8 w-8 text-subtle" />}
                    <span className="text-sm font-medium text-foreground">{resumeUploaded ? "resume_aarav_sharma.pdf uploaded" : "Click to upload your resume"}</span>
                    <span className="text-xs text-muted-foreground">PDF, up to 5MB</span>
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3 text-sm">
                  <p className="text-muted-foreground">Review your application before submitting.</p>
                  <div className="rounded-lg border border-border p-4 space-y-1.5">
                    <p><span className="text-muted-foreground">Role:</span> {opportunity.title}</p>
                    <p><span className="text-muted-foreground">Company:</span> {opportunity.company}</p>
                    <p><span className="text-muted-foreground">Resume:</span> resume_aarav_sharma.pdf</p>
                    <p><span className="text-muted-foreground">Match Score:</span> {opportunity.match}%</p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3 text-sm text-center py-4">
                  <p className="text-foreground">Ready to submit your application to <span className="font-semibold">{opportunity.company}</span>?</p>
                </div>
              )}

              <DialogFooter>
                {step > 0 && <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>}
                <Button onClick={handleNext}>{step === STEPS.length - 1 ? "Submit Application" : "Continue"}</Button>
              </DialogFooter>
            </>
          ) : (
            <div className="py-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Application submitted successfully.</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">Track its progress from My Applications.</p>
              <div className="mt-6 flex justify-center gap-2">
                <Button variant="outline" onClick={() => setApplyOpen(false)}>Close</Button>
                <Button onClick={() => navigate("/student/applications")}>View Applications</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
