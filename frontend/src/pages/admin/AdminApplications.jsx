import React from "react";
import { PageHeader } from "@/components/common/States";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/applications/ApplicationComponents";
import { APPLICATIONS } from "@/data/mockApplications";

export default function AdminApplications() {
  return (
    <div>
      <PageHeader title="Applications" description="Platform-wide view of application activity." />
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Company</th>
                  <th className="px-5 py-3 font-medium">Role</th>
                  <th className="px-5 py-3 font-medium">Applied Date</th>
                  <th className="px-5 py-3 font-medium">Match</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {APPLICATIONS.map((a) => (
                  <tr key={a.id} className="hover:bg-muted/40">
                    <td className="px-5 py-3.5 font-medium text-foreground whitespace-nowrap">{a.company}</td>
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{a.role}</td>
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{a.appliedDate}</td>
                    <td className="px-5 py-3.5 text-foreground whitespace-nowrap">{a.match}%</td>
                    <td className="px-5 py-3.5"><StatusBadge status={a.status} /></td>
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
