import React, { useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, ClipboardCheck, RotateCcw, Trophy } from 'lucide-react';
import { PageHeader } from '@/components/common/States';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useSIH } from '@/context/SIHContext';
import { ASSESSMENT_QUESTIONS, ASSESSMENT_SKILLS } from '@/data/sihDemoData';
import { toast } from 'sonner';

const levelFor = (score) => score >= 80 ? 'Advanced' : score >= 60 ? 'Intermediate' : 'Beginner';

export default function SkillAssessment() {
  const { assessmentResults, completeAssessment, resetDemo } = useSIH();
  const [skill, setSkill] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const questions = useMemo(() => ASSESSMENT_QUESTIONS.filter(q => q.skill === skill), [skill]);
  const score = questions.length ? Math.round((questions.filter(q => answers[q.id] === q.answer).length / questions.length) * 100) : 0;

  const start = (selectedSkill) => {
    setSkill(selectedSkill); setCurrent(0); setAnswers({}); setFinished(false);
  };
  const finish = () => {
    completeAssessment(skill, score);
    setFinished(true);
    toast.success(`${skill} assessment completed — skill profile updated`);
  };
  const back = () => { setSkill(null); setFinished(false); setAnswers({}); setCurrent(0); };
  const reset = () => { resetDemo(); back(); toast.success('Assessment demo reset'); };

  if (!skill) return <div>
    <PageHeader title="Skill Assessments" description="Validate each core skill separately and build an evidence-based competency profile." action={<Button variant="outline" onClick={reset}><RotateCcw className="h-4 w-4" /> Reset Demo</Button>} />
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {ASSESSMENT_SKILLS.map((s) => {
        const result = assessmentResults?.[s];
        return <Card key={s} className="transition hover:-translate-y-0.5 hover:shadow-md">
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3"><div className="rounded-xl bg-primary-soft p-3"><ClipboardCheck className="h-5 w-5 text-primary" /></div>{result ? <Badge variant="success">Completed</Badge> : <Badge variant="outline">Not Assessed</Badge>}</div>
            <h2 className="mt-4 text-lg font-semibold">{s}</h2>
            <p className="mt-1 text-sm text-muted-foreground">5 questions · ~5 minutes · Skill-specific validation</p>
            {result && <div className="mt-4 rounded-lg bg-muted/40 p-3"><div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Latest score</span><span className="font-semibold">{result.score}%</span></div><Progress className="mt-2" value={result.score} /><div className="mt-2 flex items-center justify-between text-xs"><span>{result.level}</span><span>Retake available</span></div></div>}
            <Button className="mt-5 w-full" variant={result ? 'outline' : 'default'} onClick={() => start(s)}>{result ? 'Retake Assessment' : 'Start Assessment'}</Button>
          </CardContent>
        </Card>;
      })}
    </div>
  </div>;

  if (finished) return <div>
    <PageHeader title={`${skill} Assessment Result`} description="The result has been added to the student's verified skill profile." action={<Button variant="outline" onClick={back}><ArrowLeft className="h-4 w-4" /> All Assessments</Button>} />
    <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
      <Card className="border-primary/20 bg-primary-soft/30"><CardContent className="p-6 text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white"><Trophy className="h-7 w-7 text-primary" /></div><p className="mt-4 text-sm text-muted-foreground">{skill} Assessment</p><p className="mt-1 text-5xl font-bold">{score}%</p><Badge variant="success" className="mt-3">{levelFor(score)}</Badge><p className="mt-4 text-sm text-muted-foreground">5 questions · Assessment evidence verified</p></CardContent></Card>
      <Card><CardHeader><CardTitle>Assessment impact</CardTitle></CardHeader><CardContent className="space-y-4"><div className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" /><div><p className="text-sm font-medium">Skill profile updated</p><p className="mt-1 text-sm text-muted-foreground">Your latest score and proficiency level are now available to Skill Gap Analysis and opportunity matching.</p></div></div><div className="rounded-lg border border-border bg-muted/30 p-4"><p className="text-sm font-semibold">Next best action</p><p className="mt-1 text-sm text-muted-foreground">Use the updated gap analysis to target learning, projects and another assessment round.</p></div><Button onClick={() => start(skill)} variant="outline"><RotateCcw className="h-4 w-4" /> Retake {skill}</Button></CardContent></Card>
    </div>
  </div>;

  const q = questions[current];
  return <div>
    <PageHeader title={`${skill} Assessment`} description={`Question ${current + 1} of ${questions.length}`} action={<Button variant="ghost" onClick={back}><ArrowLeft className="h-4 w-4" /> Exit</Button>} />
    <Card className="max-w-3xl"><CardContent className="p-6"><div className="flex items-center justify-between text-xs text-muted-foreground"><span>{q.difficulty}</span><span>{Math.round(((current) / questions.length) * 100)}% complete</span></div><Progress className="mt-2" value={(current / questions.length) * 100} /><h2 className="mt-6 text-xl font-semibold">{q.question}</h2><div className="mt-5 space-y-3">{q.options.map(option => <button key={option} onClick={() => setAnswers(a => ({ ...a, [q.id]: option }))} className={`w-full rounded-lg border p-4 text-left text-sm transition ${answers[q.id] === option ? 'border-primary bg-primary-soft/40' : 'border-border hover:bg-muted'}`}>{option}</button>)}</div><div className="mt-6 flex justify-between"><Button variant="outline" disabled={current === 0} onClick={() => setCurrent(c => c - 1)}>Previous</Button>{current < questions.length - 1 ? <Button disabled={!answers[q.id]} onClick={() => setCurrent(c => c + 1)}>Next</Button> : <Button disabled={!answers[q.id]} onClick={finish}>Submit Assessment</Button>}</div></CardContent></Card>
  </div>;
}
