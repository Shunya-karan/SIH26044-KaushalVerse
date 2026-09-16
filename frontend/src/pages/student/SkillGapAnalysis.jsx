import React, { useMemo, useState } from 'react';
import { ArrowRight, Lightbulb, ShieldCheck, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/common/States';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CAREER_ROLES } from '@/data/mockSkills';
import { COMPETENCY_BLUEPRINT } from '@/data/sihDemoData';
import { useSIH } from '@/context/SIHContext';

export default function SkillGapAnalysis() {
  const { skills } = useSIH();
  const [roleId, setRoleId] = useState('healthcare-analyst');
  const role = roleId === 'healthcare-analyst' ? { id: roleId, name: COMPETENCY_BLUEPRINT.role, required: [...COMPETENCY_BLUEPRINT.mandatorySkills, ...COMPETENCY_BLUEPRINT.preferredSkills, ...COMPETENCY_BLUEPRINT.softSkills] } : CAREER_ROLES.find((r) => r.id === roleId);
  const skillMap = useMemo(() => Object.fromEntries(skills.map((s) => [s.name, s])), [skills]);
  const rows = role.required.map((r) => { const name = typeof r === 'string' ? r : r.name; const required = typeof r === 'string' ? 3 : r.required; const s = skillMap[name]; const current = s?.level || 0; const score = s?.score || 0; return { name, required, current, score, gap: Math.max(0, required - current), demand: s?.demand || 'Medium', verified: !!s?.verified }; });
  const weighted = rows.reduce((sum, r) => sum + Math.min(1, r.current / r.required), 0) / Math.max(rows.length, 1);
  const readiness = Math.round(weighted * 100);
  const gaps = rows.filter((r) => r.gap > 0).sort((a, b) => b.gap - a.gap);
  return <div>
    <PageHeader title="Skill Gap Analysis" description="Compare your demonstrated capability with the competency blueprint for your target role." action={<Button variant="outline" asChild><Link to="/student/skills">Manage Skills <ArrowRight className="h-4 w-4" /></Link></Button>} />
    <Card className="mb-6"><CardContent className="p-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="w-full lg:max-w-sm space-y-1.5"><Label>Target Role</Label><Select value={roleId} onValueChange={setRoleId}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="healthcare-analyst">{COMPETENCY_BLUEPRINT.role}</SelectItem>{CAREER_ROLES.map((r) => <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>)}</SelectContent></Select></div>
      <div className="flex items-center gap-5"><div className="text-right"><p className="text-xs text-muted-foreground">Role readiness</p><p className="text-3xl font-bold">{readiness}%</p></div><div className="w-36"><Progress value={readiness} /></div></div>
    </CardContent></Card>
    <div className="grid gap-6 lg:grid-cols-[1.55fr_.9fr]">
      <Card><CardHeader><CardTitle>Required competency vs demonstrated skill</CardTitle></CardHeader><CardContent className="space-y-5">{rows.map((r) => <div key={r.name}><div className="flex items-center justify-between gap-3"><div className="flex min-w-0 items-center gap-2"><p className="text-sm font-medium">{r.name}</p>{r.verified && <ShieldCheck className="h-4 w-4 text-secondary" title="Verified" />}</div><div className="text-xs text-muted-foreground">{r.score}% · {r.current}/{r.required}</div></div><div className="mt-2 grid grid-cols-[1fr_auto] items-center gap-3"><Progress value={r.score} /><Badge variant={r.gap ? 'warning' : 'success'}>{r.gap ? `Gap ${r.gap}` : 'Ready'}</Badge></div></div>)}</CardContent></Card>
      <div className="space-y-6">
        <Card className="border-primary/20 bg-primary-soft/30"><CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" />Priority gaps</CardTitle></CardHeader><CardContent className="space-y-3">{gaps.slice(0, 3).map((g) => <div key={g.name} className="rounded-lg border bg-white p-3"><div className="flex items-center justify-between"><p className="text-sm font-semibold">{g.name}</p><Badge variant={g.gap >= 2 ? 'error' : 'warning'}>{g.demand} demand</Badge></div><p className="mt-1 text-xs text-muted-foreground">Current {g.score}% · Required level {g.required}/5 · Gap {g.gap}</p></div>)}</CardContent></Card>
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary" />Next best action</CardTitle></CardHeader><CardContent><p className="text-sm font-medium">Improve {gaps[0]?.name || 'your weakest skill'} first</p><p className="mt-1 text-sm text-muted-foreground">{gaps[0]?.demand || 'High'} industry demand makes this the highest-impact gap to close.</p><Button className="mt-4 w-full" asChild><Link to="/student/roadmap">Open Growth Roadmap</Link></Button></CardContent></Card>
      </div>
    </div>
  </div>;
}
