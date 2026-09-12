import React from "react";
import { PageHeader } from "@/components/common/States";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OPPORTUNITIES } from "@/data/mockOpportunities";

export default function AdminOpportunities() {
  return (
    <div>
      <PageHeader title="Opportunities" description="All internships, jobs and projects posted platform-wide." />
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Title</th>
                  <th className="px-5 py-3 font-medium">Company</th>
                  <th className="px-5 py-3 font-medium">Type</th>
                  <th className="px-5 py-3 font-medium">Location</th>
                  <th className="px-5 py-3 font-medium">Posted</th>
                  <th className="px-5 py-3 font-medium">Deadline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {OPPORTUNITIES.map((o) => (
                  <tr key={o.id} className="hover:bg-muted/40">
                    <td className="px-5 py-3.5 font-medium text-foreground whitespace-nowrap">{o.title}</td>
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{o.company}</td>
                    <td className="px-5 py-3.5"><Badge variant="muted">{o.type}</Badge></td>
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{o.location}</td>
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{o.postedDate}</td>
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{o.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
