import React from "react";
import {
  LayoutDashboard, GraduationCap, Building2, Briefcase, FileText, TrendingUp, BarChart3, FileBarChart, Settings, LineChart,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";

const navItems = [
  { to: "/admin/overview", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/students", label: "Students", icon: GraduationCap },
  { to: "/admin/companies", label: "Companies", icon: Building2 },
  { to: "/admin/opportunities", label: "Opportunities", icon: Briefcase },
  { to: "/admin/applications", label: "Applications", icon: FileText },
  { to: "/admin/skill-trends", label: "Skill Trends", icon: TrendingUp },
  { to: "/admin/industry-demand", label: "Industry Demand", icon: LineChart },
  { to: "/admin/placement-analytics", label: "Placement Analytics", icon: BarChart3 },
  { to: "/admin/reports", label: "Reports", icon: FileBarChart },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout() {
  return <DashboardShell navItems={navItems} roleLabel="Institution Admin" roleBadgeVariant="violet" />;
}
