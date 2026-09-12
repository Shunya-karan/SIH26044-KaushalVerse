import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Plus, Eye, Pencil, Copy, XCircle } from "lucide-react";
import { PageHeader, EmptyState } from "@/components/common/States";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { OPPORTUNITIES } from "@/data/mockOpportunities";

const STATUS_CYCLE = ["Active", "Draft", "Closed"];

export default function CompanyOpportunities() {
  const [opportunities, setOpportunities] = useState(
    OPPORTUNITIES.map((o, i) => ({ ...o, status: i % 5 === 0 ? "Draft" : i % 7 === 0 ? "Closed" : "Active" }))
  );
  const [tab, setTab] = useState("Active");

  const filtered = opportunities.filter((o) => o.status === tab);

  const handleAction = (id, action) => {
    if (action === "close") {
      setOpportunities(opportunities.map((o) => (o.id === id ? { ...o, status: "Closed" } : o)));
      toast.success("Opportunity closed");
    } else if (action === "duplicate") {
      toast.success("Opportunity duplicated as draft");
    } else {
      toast.success(`${action} action triggered (demo)`);
    }
  };

  return (
    <div>
      <PageHeader
        title="My Opportunities"
        description="Manage your posted internships, jobs and projects."
        action={<Button asChild><Link to="/company/post-opportunity"><Plus className="h-4 w-4" /> Post Opportunity</Link></Button>}
      />

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          {STATUS_CYCLE.map((s) => <TabsTrigger key={s} value={s}>{s}</TabsTrigger>)}
        </TabsList>
        <TabsContent value={tab}>
          {filtered.length === 0 ? (
            <EmptyState title={`No ${tab.toLowerCase()} opportunities`} description="Opportunities in this state will appear here." />
          ) : (
            <div className="grid gap-4">
              {filtered.map((o) => (
                <Card key={o.id}>
                  <CardContent className="p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground">{o.title}</p>
                        <Badge variant="muted">{o.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{o.location} · {o.mode} · Deadline {o.deadline}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={o.status === "Active" ? "success" : o.status === "Draft" ? "warning" : "muted"}>{o.status}</Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild><Link to={`/student/opportunities/${o.id}`}><Eye className="mr-2 h-4 w-4" /> View</Link></DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction(o.id, "Edit")}><Pencil className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction(o.id, "duplicate")}><Copy className="mr-2 h-4 w-4" /> Duplicate</DropdownMenuItem>
                          {o.status !== "Closed" && (
                            <DropdownMenuItem onClick={() => handleAction(o.id, "close")} className="text-error"><XCircle className="mr-2 h-4 w-4" /> Close</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
