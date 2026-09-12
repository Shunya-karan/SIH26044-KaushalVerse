import React from 'react';
import { LayoutDashboard, GraduationCap, Target, ClipboardCheck, ShieldCheck, Users, BriefcaseBusiness, Handshake, BarChart3 } from 'lucide-react';
import { DashboardShell } from '@/components/layout/DashboardShell';
const navItems = [
 { to:'/faculty/dashboard', label:'Dashboard', icon:LayoutDashboard, end:true },
 { to:'/faculty/students', label:'Students', icon:GraduationCap },
 { to:'/faculty/skill-gaps', label:'Skill Gaps', icon:Target },
 { to:'/faculty/assessments', label:'Assessments', icon:ClipboardCheck },
 { to:'/faculty/skill-verification', label:'Skill Verification', icon:ShieldCheck },
 { to:'/faculty/mentorship', label:'Mentorship', icon:Users },
 { to:'/faculty/internships', label:'Internships', icon:BriefcaseBusiness },
 { to:'/faculty/collaboration', label:'Industry Collaboration', icon:Handshake },
 { to:'/faculty/analytics', label:'Analytics', icon:BarChart3 },
];
export default function FacultyLayout(){ return <DashboardShell navItems={navItems} roleLabel="Faculty / Academician" roleBadgeVariant="secondary" />; }
