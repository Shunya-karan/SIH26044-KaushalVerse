import React, { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { PageHeader, EmptyState } from "@/components/common/States";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { OpportunityCard } from "@/components/opportunities/OpportunityComponents";
import { OPPORTUNITIES } from "@/data/mockOpportunities";

const TYPE_TABS = ["All", "Internships", "Jobs", "Projects"];
const TYPE_MAP = { Internships: "Internship", Jobs: "Job", Projects: "Project" };

export default function StudentOpportunities() {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("all");
  const [mode, setMode] = useState("all");

  const locations = useMemo(() => ["all", ...new Set(OPPORTUNITIES.map((o) => o.location))], []);

  const filtered = useMemo(() => {
    return OPPORTUNITIES.filter((o) => {
      if (tab !== "All" && o.type !== TYPE_MAP[tab]) return false;
      if (location !== "all" && o.location !== location) return false;
      if (mode !== "all" && o.mode !== mode) return false;
      if (search && !`${o.title} ${o.company}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    }).sort((a, b) => b.match - a.match);
  }, [tab, search, location, mode]);

  return (
    <div>
      <PageHeader title="Opportunities" description="Discover internships, jobs and projects matched to your skills." />

      <Card className="mb-6">
        <CardContent className="p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
            <Input className="pl-9" placeholder="Search by role or company..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="flex items-center gap-1 text-xs"><SlidersHorizontal className="h-3.5 w-3.5" /> Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {locations.map((l) => <SelectItem key={l} value={l}>{l === "all" ? "All Locations" : l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Work Mode</Label>
              <Select value={mode} onValueChange={setMode}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modes</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                  <SelectItem value="On-site">On-site</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          {TYPE_TABS.map((t) => <TabsTrigger key={t} value={t}>{t}</TabsTrigger>)}
        </TabsList>
        <TabsContent value={tab}>
          {filtered.length === 0 ? (
            <EmptyState title="No opportunities found" description="Try adjusting your filters or search terms." />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((o) => <OpportunityCard key={o.id} opportunity={o} />)}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
