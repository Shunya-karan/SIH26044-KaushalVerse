import React, { useState } from 'react';
import { CheckCircle2, ClipboardCheck } from 'lucide-react';
import { PageHeader } from '@/components/common/States';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { INTERNSHIP_EVALUATION } from '@/data/sihDemoData';
import { useSIH } from '@/context/SIHContext';
import { toast } from 'sonner';

export default function InternshipEvaluation() {
  const { saveEvaluation, evaluationSaved } = useSIH();
  const [scores, setScores] = useState(INTERNSHIP_EVALUATION.skills);
  const submit = () => { saveEvaluation(scores); toast.success('Industry evaluation added to student skill passport'); };
  return <div><PageHeader title="Internship Evaluation" description="Close the loop by turning industry mentor feedback into verified skill evidence." />
    <Card className="mb-6"><CardContent className="p-6"><div className="flex items-start gap-4"><div className="rounded-xl bg-secondary-soft p-3"><ClipboardCheck className="h-6 w-6 text-secondary" /></div><div><h2 className="text-xl font-bold">{INTERNSHIP_EVALUATION.role}</h2><p className="text-sm text-muted-foreground">{INTERNSHIP_EVALUATION.company} · Mentor: {INTERNSHIP_EVALUATION.mentor}</p></div></div></CardContent></Card>
    <Card><CardHeader><CardTitle>Skill performance</CardTitle></CardHeader><CardContent className="space-y-4">{scores.map((s) => <div key={s.name} className="flex flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-medium">{s.name}</p><p className="text-xs text-muted-foreground">Industry mentor score</p></div><select className="rounded-md border bg-white px-3 py-2 text-sm" value={s.score} onChange={(e) => setScores((old) => old.map((x) => x.name === s.name ? { ...x, score: Number(e.target.value) } : x))}>{[1,2,3,4,5].map(v => <option key={v} value={v}>{v}/5</option>)}</select></div>)}
      <div className="grid gap-4 md:grid-cols-2"><div className="rounded-lg bg-muted p-4"><p className="text-sm font-semibold">Strengths</p><p className="mt-1 text-sm text-muted-foreground">Reliable problem solving, teamwork and data handling.</p></div><div className="rounded-lg bg-muted p-4"><p className="text-sm font-semibold">Improvement area</p><p className="mt-1 text-sm text-muted-foreground">Communicate analysis insights more clearly to non-technical stakeholders.</p></div></div>
      <div className="flex items-center justify-between border-t pt-4"><div>{evaluationSaved && <Badge variant="success"><CheckCircle2 className="mr-1 h-3.5 w-3.5" />Saved to Skill Passport</Badge>}</div><Button onClick={submit}>{evaluationSaved ? 'Update Evaluation' : 'Submit Evaluation'}</Button></div>
    </CardContent></Card></div>;
}
