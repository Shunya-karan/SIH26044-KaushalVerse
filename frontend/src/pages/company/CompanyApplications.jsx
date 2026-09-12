import React, { useState } from "react";
import { toast } from "sonner";
import { FileText, ThumbsUp, ThumbsDown, Eye } from "lucide-react";
import { PageHeader, EmptyState } from "@/components/common/States";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { StatusBadge } from "@/components/applications/ApplicationComponents";
import { COMPANY_APPLICANTS } from "@/data/mockApplications";
import { initials } from "@/lib/utils";
import { MatchScore } from "@/components/dashboard/DashboardWidgets";

export default function CompanyApplications() {
  const [applicants, setApplicants] = useState(COMPANY_APPLICANTS);
  const [viewing, setViewing] = useState(null);

  const updateStatus = (id, status) => {
    setApplicants(applicants.map((a) => (a.id === id ? { ...a, status } : a)));
    toast.success(`Candidate ${status.toLowerCase()}`);
  };

  return (
    <div>
      <PageHeader title="Applications" description="Review and manage applicants across your opportunities." />

      {applicants.length === 0 ? (
        <EmptyState title="No applicants yet" description="Applicants for your opportunities will appear here." />
      ) : (
        <div className="grid gap-4">
          {applicants.map((a) => (
            <Card key={a.id}>
              <CardContent className="p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-11 w-11"><AvatarFallback>{initials(a.name)}</AvatarFallback></Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{a.name}</p>
                    <p className="text-sm text-muted-foreground">{a.college} · {a.degree}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {a.skills.map((s) => <Badge key={s} variant="outline">{s}</Badge>)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MatchScore score={a.match} size="sm" />
                  <StatusBadge status={a.status} />
                  <div className="flex gap-1.5">
                    <Button variant="outline" size="sm" onClick={() => setViewing(a)}><Eye className="h-4 w-4" /></Button>
                    <Button variant="outline" size="sm" onClick={() => updateStatus(a.id, "Shortlisted")}><ThumbsUp className="h-4 w-4 text-success" /></Button>
                    <Button variant="outline" size="sm" onClick={() => updateStatus(a.id, "Rejected")}><ThumbsDown className="h-4 w-4 text-error" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!viewing} onOpenChange={(v) => !v && setViewing(null)}>
        <DialogContent>
          {viewing && (
            <>
              <DialogHeader><DialogTitle>{viewing.name}</DialogTitle></DialogHeader>
              <div className="space-y-3 text-sm">
                <p><span className="text-muted-foreground">College:</span> {viewing.college}</p>
                <p><span className="text-muted-foreground">Degree:</span> {viewing.degree}</p>
                <p><span className="text-muted-foreground">Applied:</span> {viewing.appliedDate}</p>
                <p><span className="text-muted-foreground">Match Score:</span> {viewing.match}%</p>
                <p><span className="text-muted-foreground">Resume Score:</span> {viewing.resumeScore}/100</p>
                <div className="flex items-center gap-2 rounded-lg border border-border p-3">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground">resume_{viewing.name.toLowerCase().replace(" ", "_")}.pdf</span>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1.5">Skills</p>
                  <div className="flex flex-wrap gap-1.5">{viewing.skills.map((s) => <Badge key={s} variant="outline">{s}</Badge>)}</div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
