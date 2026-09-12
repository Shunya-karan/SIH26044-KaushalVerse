import React from "react";
import { Bell, CheckCircle2, Briefcase, Sparkles, Calendar } from "lucide-react";
import { PageHeader } from "@/components/common/States";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const NOTIFICATIONS = [
  { icon: CheckCircle2, title: "You've been shortlisted", desc: "Zoho Corporation shortlisted you for Backend Engineering Intern.", time: "2 days ago", unread: true },
  { icon: Calendar, title: "Interview scheduled", desc: "Razorpay scheduled an interview for Frontend Developer Intern.", time: "3 days ago", unread: true },
  { icon: Briefcase, title: "New matching opportunity", desc: "Full Stack Developer at TCS matches 83% of your skills.", time: "4 days ago", unread: false },
  { icon: Sparkles, title: "Skill verified", desc: "Your React skill has been marked as verified.", time: "5 days ago", unread: false },
  { icon: Bell, title: "Roadmap reminder", desc: "You're 60% through Phase 3: Backend Development.", time: "1 week ago", unread: false },
];

export default function StudentNotifications() {
  return (
    <div>
      <PageHeader title="Notifications" description="Stay updated on applications, matches and roadmap progress." />
      <Card>
        <CardContent className="p-0 divide-y divide-border">
          {NOTIFICATIONS.map((n, i) => (
            <div key={i} className={cn("flex items-start gap-3 p-4", n.unread && "bg-primary-soft/40")}>
              <div className="rounded-full bg-white border border-border p-2 shrink-0">
                <n.icon className="h-4 w-4 text-primary" />
              </div>
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
