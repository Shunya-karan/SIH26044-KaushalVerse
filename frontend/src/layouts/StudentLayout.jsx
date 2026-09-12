import React from "react";
import {
  LayoutDashboard, User, Sparkles, Target, Map, Briefcase, FileText,
  FileSearch, TrendingUp, Bell, Settings, ClipboardCheck, BadgeCheck,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";

const navItems = [
  { to: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/student/profile", label: "My Profile", icon: User },
  { to: "/student/skills", label: "My Skills", icon: Sparkles },
  { to: "/student/assessment", label: "Assessment", icon: ClipboardCheck },
  { to: "/student/skill-gap", label: "Skill Gap", icon: Target },
  { to: "/student/roadmap", label: "Learning Roadmap", icon: Map },
  { to: "/student/opportunities", label: "Opportunities", icon: Briefcase },
  { to: "/student/applications", label: "Applications", icon: FileText },
  { to: "/student/skill-passport", label: "Skill Passport", icon: BadgeCheck },
  { to: "/student/resume", label: "Resume", icon: FileSearch },
  { to: "/student/insights", label: "Career Insights", icon: TrendingUp },
  { to: "/student/notifications", label: "Notifications", icon: Bell },
  { to: "/student/settings", label: "Settings", icon: Settings },
];

export default function StudentLayout() {
  return <DashboardShell navItems={navItems} roleLabel="Student Portal" roleBadgeVariant="default" />;
}
