import React, { useState } from "react";
import { Search } from "lucide-react";
import { PageHeader, EmptyState } from "@/components/common/States";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { COMPANIES_LIST } from "@/data/mockCompanies";

export default function AdminCompanies() {
  const [search, setSearch] = useState("");
  const filtered = COMPANIES_LIST.filter((c) => `${c.name} ${c.industry}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <PageHeader title="Companies" description="Registered industry partners on the platform." />
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
            <Input className="pl-9" placeholder="Search by company or industry..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState title="No companies found" description="Try a different search term." />
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground">
                    <th className="px-5 py-3 font-medium">Company</th>
                    <th className="px-5 py-3 font-medium">Industry</th>
                    <th className="px-5 py-3 font-medium">Opportunities</th>
                    <th className="px-5 py-3 font-medium">Applications</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((c) => (
                    <tr key={c.id} className="hover:bg-muted/40">
                      <td className="px-5 py-3.5 font-medium text-foreground whitespace-nowrap">{c.name}</td>
                      <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{c.industry}</td>
                      <td className="px-5 py-3.5 text-foreground whitespace-nowrap">{c.opportunities}</td>
                      <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{c.applications}</td>
                      <td className="px-5 py-3.5"><Badge variant={c.status === "Verified" ? "success" : "warning"}>{c.status}</Badge></td>
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
