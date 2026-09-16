import React from 'react';
import { BadgeCheck, BriefcaseBusiness, FileCheck2, GraduationCap, ShieldCheck, UserRound } from 'lucide-react';
import { PageHeader } from '@/components/common/States';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useSIH } from '@/context/SIHContext';
import { useAuth } from '@/context/AuthContext';
import { CURRENT_STUDENT } from '@/data/mockStudents';

export default function SkillPassport() {
  const { skills, evaluationSaved } = useSIH();
  const { user } = useAuth();
  const student = user || CURRENT_STUDENT;
  const readiness = Math.round(skills.reduce((a, s) => a + s.score, 0) / skills.length);
  return <div>
    <PageHeader title="Digital Skill Passport" description="A portable, evidence-based view of what you can demonstrate — not only what you claim." />
    <Card className="mb-6 overflow-hidden"><CardContent className="p-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft"><UserRound className="h-7 w-7 text-primary" /></div><div><h2 className="text-xl font-bold">{student.name}</h2><p className="text-sm text-muted-foreground">{student.degree || "Student"} {student.branch ? `· ${student.branch}` : ""} · {student.college || "Institution not added"}</p><Badge className="mt-2" variant="outline">Healthcare Data Analyst Intern</Badge></div></div>
        <div className="min-w-44"><p className="text-xs text-muted-foreground">Overall readiness</p><p className="text-3xl font-bold">{readiness}%</p><Progress className="mt-2" value={readiness} /></div>
      </div>
    </CardContent></Card>
    <div className="grid gap-6 lg:grid-cols-3">
      <Card><CardHeader><CardTitle className="flex items-center gap-2"><BadgeCheck className="h-5 w-5 text-primary" />Verified Skills</CardTitle></CardHeader><CardContent className="space-y-3">{skills.map((s) => <div key={s.id} className="rounded-lg border p-3"><div className="flex justify-between"><span className="font-medium">{s.name}</span><Badge variant={s.verified ? 'success' : 'muted'}>{s.verified ? 'Verified' : 'Self Declared'}</Badge></div><div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>{s.score}% · {s.proficiency}</span><span>Target {s.target}/5</span></div><Progress className="mt-2" value={s.score} /></div>)}</CardContent></Card>
      <Card><CardHeader><CardTitle className="flex items-center gap-2"><FileCheck2 className="h-5 w-5 text-secondary" />Evidence</CardTitle></CardHeader><CardContent className="space-y-3">{skills.slice(0, 5).map((s) => <div key={s.id}><p className="text-sm font-medium">{s.name}</p><div className="mt-1 flex flex-wrap gap-1.5">{s.evidence.map((e) => <Badge key={e} variant="outline">{e}</Badge>)}</div></div>)}</CardContent></Card>
      <Card><CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-roadmap" />Validation Trail</CardTitle></CardHeader><CardContent className="space-y-4"><div className="flex gap-3"><GraduationCap className="h-5 w-5 text-primary" /><div><p className="text-sm font-medium">Faculty validation</p><p className="text-xs text-muted-foreground">Communication & teamwork reviewed</p></div></div><div className="flex gap-3"><BriefcaseBusiness className="h-5 w-5 text-secondary" /><div><p className="text-sm font-medium">Industry validation</p><p className="text-xs text-muted-foreground">{evaluationSaved ? 'Mentor evaluation added to passport' : 'Available after internship evaluation'}</p></div></div><div className="rounded-lg bg-muted p-3 text-xs text-muted-foreground">Passport status combines assessments, projects, faculty validation and industry evidence.</div></CardContent></Card>
    </div>
  </div>;
}
