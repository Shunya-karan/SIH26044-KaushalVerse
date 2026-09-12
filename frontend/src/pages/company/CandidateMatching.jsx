import React, { useState } from "react";
import { toast } from "sonner";
import { Sparkles, ThumbsUp, ThumbsDown, Lightbulb } from "lucide-react";
import { PageHeader } from "@/components/common/States";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { MatchScore } from "@/components/dashboard/DashboardWidgets";
import { SkillBadgeList } from "@/components/opportunities/OpportunityComponents";
import { CANDIDATES_FOR_MATCHING } from "@/data/mockStudents";
import { OPPORTUNITIES } from "@/data/mockOpportunities";
import { initials } from "@/lib/utils";

export default function CandidateMatching() {
  const [opportunityId, setOpportunityId] = useState(OPPORTUNITIES[0].id);
  const opportunity = OPPORTUNITIES.find((o) => o.id === opportunityId);
  const [candidates, setCandidates] = useState(CANDIDATES_FOR_MATCHING);

  const shortlist = (id) => {
    toast.success("Candidate shortlisted");
  };
  const reject = (id) => {
    setCandidates(candidates.filter((c) => c.id !== id));
    toast.success("Candidate removed from list");
  };

  return (
    <div>
      <PageHeader title="Smart Candidate Matching" description="Ranked, explainable candidate matches for your open opportunity." />

      <Card className="mb-6">
        <CardContent className="p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Opportunity:</span>
          </div>
          <div className="w-full sm:max-w-xs">
            <Select value={opportunityId} onValueChange={setOpportunityId}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {OPPORTUNITIES.map((o) => <SelectItem key={o.id} value={o.id}>{o.title}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {[...candidates].sort((a, b) => b.match - a.match).map((c, i) => (
          <Card key={c.id}>
            <CardContent className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <Avatar className="h-11 w-11"><AvatarFallback>{initials(c.name)}</AvatarFallback></Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">{c.name}</p>
                      {i === 0 && <Badge variant="success">Top Match</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{c.college}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Resume Score: {c.resumeScore}/100</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MatchScore score={c.match} />
                  <div className="flex gap-1.5">
                    <Button size="sm" onClick={() => shortlist(c.id)}><ThumbsUp className="h-4 w-4" /> Shortlist</Button>
                    <Button size="sm" variant="outline" onClick={() => reject(c.id)}><ThumbsDown className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="mb-1.5 text-xs font-medium text-success">Skills Matched</p>
                  <SkillBadgeList skills={c.matched} variant="success" />
                </div>
                <div>
                  <p className="mb-1.5 text-xs font-medium text-error">Missing</p>
                  {c.missing.length === 0 ? <span className="text-xs text-muted-foreground">None</span> : <SkillBadgeList skills={c.missing} variant="error" />}
                </div>
              </div>

              <div className="mt-4 flex items-start gap-2 rounded-lg bg-primary-soft/50 p-3">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-xs text-foreground">
                  Why this candidate matches: {c.matched.length} of {c.matched.length + c.missing.length} required skills
                  are matched directly from their profile — a transparent score, not a black-box calculation.
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
