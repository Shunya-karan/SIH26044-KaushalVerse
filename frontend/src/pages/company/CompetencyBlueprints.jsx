import React, { useState } from 'react';
import { Plus, Save, Target } from 'lucide-react';
import { PageHeader } from '@/components/common/States';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { COMPETENCY_BLUEPRINT } from '@/data/sihDemoData';
import { toast } from 'sonner';

export default function CompetencyBlueprints() {
  const [saved, setSaved] = useState(false);
  const all = [...COMPETENCY_BLUEPRINT.mandatorySkills.map((x) => ({ ...x, type: 'Mandatory' })), ...COMPETENCY_BLUEPRINT.preferredSkills.map((x) => ({ ...x, type: 'Preferred' })), ...COMPETENCY_BLUEPRINT.softSkills.map((x) => ({ ...x, type: 'Soft Skill' }))];
  const save = () => { setSaved(true); toast.success('Competency blueprint saved'); };
  return <div><PageHeader title="Competency Blueprints" description="Define the capability required for an opportunity so matching is based on evidence, not keywords." action={<Button onClick={() => toast.info('Demo blueprint editor — fields are seeded for presentation')}><Plus className="h-4 w-4" /> New Blueprint</Button>} />
    <Card className="mb-6"><CardContent className="p-6"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div><Badge variant="secondary">Active Blueprint</Badge><h2 className="mt-2 text-xl font-bold">{COMPETENCY_BLUEPRINT.role}</h2><p className="text-sm text-muted-foreground">{COMPETENCY_BLUEPRINT.company} · {COMPETENCY_BLUEPRINT.industry}</p></div><div className="flex items-center gap-3"><Target className="h-5 w-5 text-primary" /><div><p className="text-xs text-muted-foreground">Defined competencies</p><p className="font-semibold">{all.length} skills</p></div></div></div></CardContent></Card>
    <div className="grid gap-6 lg:grid-cols-[1.4fr_.8fr]"><Card><CardHeader><CardTitle>Required competency levels</CardTitle></CardHeader><CardContent className="space-y-5">{all.map((s) => <div key={s.name}><div className="flex items-center justify-between"><div className="flex items-center gap-2"><p className="text-sm font-medium">{s.name}</p><Badge variant="outline">{s.type}</Badge></div><span className="text-sm font-semibold">{s.required}/5</span></div><Progress className="mt-2" value={s.required * 20} /><p className="mt-1 text-xs text-muted-foreground">Industry demand: {s.demand}</p></div>)}</CardContent></Card>
    <Card><CardHeader><CardTitle>Matching weights</CardTitle></CardHeader><CardContent className="space-y-3"><div className="flex justify-between text-sm"><span>Required skill match</span><b>50%</b></div><div className="flex justify-between text-sm"><span>Verified skills</span><b>20%</b></div><div className="flex justify-between text-sm"><span>Assessment</span><b>15%</b></div><div className="flex justify-between text-sm"><span>Projects / experience</span><b>10%</b></div><div className="flex justify-between text-sm"><span>Soft skills</span><b>5%</b></div><div className="rounded-lg bg-muted p-3 text-xs text-muted-foreground">This explainable model can be replaced by backend scoring later without changing the UX.</div><Button className="mt-2 w-full" onClick={save}><Save className="h-4 w-4" /> {saved ? 'Blueprint Saved' : 'Save Blueprint'}</Button></CardContent></Card></div>
  </div>;
}
