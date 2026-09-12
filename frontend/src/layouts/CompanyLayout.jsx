import React from "react";
import {
  LayoutDashboard, Building2, PlusCircle, Briefcase, Users, Target, BarChart3, Bell, Settings, Layers3, ClipboardCheck,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";

const navItems = [
  { to: "/company/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/company/profile", label: "Company Profile", icon: Building2 },
  { to: "/company/post-opportunity", label: "Post Opportunity", icon: PlusCircle },
  { to: "/company/blueprints", label: "Competency Blueprints", icon: Layers3 },
  { to: "/company/opportunities", label: "My Opportunities", icon: Briefcase },
  { to: "/company/applications", label: "Applications", icon: Users },
  { to: "/company/matching", label: "Candidate Matching", icon: Target },
  { to: "/company/evaluation", label: "Internship Evaluation", icon: ClipboardCheck },
  { to: "/company/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/company/notifications", label: "Notifications", icon: Bell },
  { to: "/company/settings", label: "Settings", icon: Settings },
];

export default function CompanyLayout() {
  return <DashboardShell navItems={navItems} roleLabel="Company Portal" roleBadgeVariant="secondary" />;
}
