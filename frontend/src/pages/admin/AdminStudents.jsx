import React, { useState } from "react";
import { toast } from "sonner";
import { Search, Eye, Pencil, Ban, MoreVertical } from "lucide-react";
import { PageHeader, EmptyState } from "@/components/common/States";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { STUDENTS_LIST } from "@/data/mockStudents";

export default function AdminStudents() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState(STUDENTS_LIST);

  const filtered = students.filter((s) => `${s.name} ${s.college} ${s.branch}`.toLowerCase().includes(search.toLowerCase()));

  const handleAction = (id, action) => {
    if (action === "Suspend") {
      setStudents(students.map((s) => (s.id === id ? { ...s, status: s.status === "Suspended" ? "Active" : "Suspended" } : s)));
    }
    toast.success(`${action} action applied (demo)`);
  };

  return (
    <div>
      <PageHeader title="Students" description="Monitor and manage student profiles across institutions." />
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
            <Input className="pl-9" placeholder="Search by name, college or branch..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState title="No students found" description="Try a different search term." />
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground">
                    <th className="px-5 py-3 font-medium">Student</th>
                    <th className="px-5 py-3 font-medium">College</th>
                    <th className="px-5 py-3 font-medium">Branch</th>
                    <th className="px-5 py-3 font-medium">Skills</th>
                    <th className="px-5 py-3 font-medium">Readiness</th>
                    <th className="px-5 py-3 font-medium">Applications</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((s) => (
                    <tr key={s.id} className="hover:bg-muted/40">
                      <td className="px-5 py-3.5 font-medium text-foreground whitespace-nowrap">{s.name}</td>
                      <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{s.college}</td>
                      <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{s.branch}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex flex-wrap gap-1 max-w-[180px]">
                          {s.skills.slice(0, 2).map((sk) => <Badge key={sk} variant="outline">{sk}</Badge>)}
                          {s.skills.length > 2 && <Badge variant="muted">+{s.skills.length - 2}</Badge>}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-foreground whitespace-nowrap">{s.readiness}%</td>
                      <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{s.applications}</td>
                      <td className="px-5 py-3.5"><Badge variant={s.status === "Active" ? "success" : "error"}>{s.status}</Badge></td>
                      <td className="px-5 py-3.5">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleAction(s.id, "View")}><Eye className="mr-2 h-4 w-4" /> View</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction(s.id, "Edit")}><Pencil className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction(s.id, "Suspend")} className="text-error"><Ban className="mr-2 h-4 w-4" /> {s.status === "Suspended" ? "Reactivate" : "Suspend"}</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
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
