import React from "react";
import { Users, Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/common/States";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const NOTIFICATIONS = [
  { icon: Users, title: "5 new applicants", desc: "Frontend Developer Intern received 5 new applications.", time: "1 day ago", unread: true },
  { icon: CheckCircle2, title: "Candidate confirmed interview slot", desc: "Rahul Verma confirmed the interview for Sep 15.", time: "2 days ago", unread: true },
  { icon: Briefcase, title: "Opportunity deadline approaching", desc: "Backend Engineering Intern closes in 3 days.", time: "3 days ago", unread: false },
  { icon: Calendar, title: "Interview reminder", desc: "2 interviews scheduled for tomorrow.", time: "4 days ago", unread: false },
];

export default function CompanyNotifications() {
  return (
    <div>
      <PageHeader title="Notifications" description="Stay updated on applicants and hiring activity." />
      <Card>
        <CardContent className="p-0 divide-y divide-border">
          {NOTIFICATIONS.map((n, i) => (
            <div key={i} className={cn("flex items-start gap-3 p-4", n.unread && "bg-primary-soft/40")}>
              <div className="rounded-full bg-white border border-border p-2 shrink-0"><n.icon className="h-4 w-4 text-primary" /></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{n.title}</p>
                <p className="text-sm text-muted-foreground">{n.desc}</p>
                <p className="mt-0.5 text-xs text-subtle">{n.time}</p>
              </div>
              {n.unread && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
