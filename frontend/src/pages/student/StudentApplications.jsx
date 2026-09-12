import React, { useState } from "react";
import { PageHeader, EmptyState } from "@/components/common/States";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { StatusBadge } from "@/components/applications/ApplicationComponents";
import { APPLICATIONS } from "@/data/mockApplications";

export default function StudentApplications() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? APPLICATIONS : APPLICATIONS.filter((a) => a.status === filter);

  return (
    <div>
      <PageHeader
        title="My Applications"
        description="Track the status of every application you've submitted."
        action={
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Applied">Applied</SelectItem>
              <SelectItem value="Under Review">Under Review</SelectItem>
              <SelectItem value="Shortlisted">Shortlisted</SelectItem>
              <SelectItem value="Interview">Interview</SelectItem>
              <SelectItem value="Selected">Selected</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        }
      />

      {filtered.length === 0 ? (
        <EmptyState title="No applications found" description="Applications matching this filter will appear here." />
      ) : (
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
                    <th className="px-5 py-3 font-medium">Last Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((a) => (
                    <tr key={a.id} className="hover:bg-muted/40">
                      <td className="px-5 py-3.5 font-medium text-foreground whitespace-nowrap">{a.company}</td>
                      <td className="px-5 py-3.5 text-foreground whitespace-nowrap">{a.role}</td>
                      <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{a.appliedDate}</td>
                      <td className="px-5 py-3.5 text-foreground whitespace-nowrap">{a.match}%</td>
                      <td className="px-5 py-3.5"><StatusBadge status={a.status} /></td>
                      <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{a.lastUpdated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
