import React from "react";
import { toast } from "sonner";
import { FileBarChart, Download, Calendar } from "lucide-react";
import { PageHeader } from "@/components/common/States";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const REPORTS = [
  { title: "Monthly Placement Summary", desc: "Placements, internships and offers by branch — September 2026", type: "PDF" },
  { title: "Skill Gap Report", desc: "Institution-wide skill gap vs industry demand analysis", type: "XLSX" },
  { title: "Company Engagement Report", desc: "Company participation, postings and hiring activity", type: "PDF" },
  { title: "Student Readiness Report", desc: "Placement readiness scores across all branches", type: "XLSX" },
];

export default function AdminReports() {
  const handleDownload = (title) => toast.success(`Downloading "${title}" (demo)`);

  return (
    <div>
      <PageHeader title="Reports" description="Generate and download institutional reports." />
      <div className="grid gap-4 sm:grid-cols-2">
        {REPORTS.map((r) => (
          <Card key={r.title}>
            <CardContent className="p-5 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary-soft p-2.5 text-primary shrink-0"><FileBarChart className="h-5 w-5" /></div>
                <div>
                  <p className="font-semibold text-foreground">{r.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="muted">{r.type}</Badge>
                    <span className="flex items-center gap-1 text-xs text-subtle"><Calendar className="h-3 w-3" /> Updated weekly</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleDownload(r.title)}><Download className="h-4 w-4" /></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
