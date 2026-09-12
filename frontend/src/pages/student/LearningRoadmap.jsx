import React from 'react';
import { ArrowRight, CheckCircle2, Circle, Clock, Lightbulb, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/common/States';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ROADMAP_STEPS } from '@/data/sihDemoData';
import { useSIH } from '@/context/SIHContext';

export default function LearningRoadmap() {
  const { assessmentCompleted, improved } = useSIH();
  const completed = assessmentCompleted ? 3 : 1;
  const progress = improved ? 100 : Math.round((completed / ROADMAP_STEPS.length) * 100);
  return <div>
    <PageHeader title="Learning & Growth Roadmap" description="Your roadmap is driven by the largest gaps against the Healthcare Data Analyst competency blueprint." action={<Button asChild><Link to="/student/skill-gap">View Skill Gap <ArrowRight className="h-4 w-4" /></Link></Button>} />
    <Card className="mb-6 border-roadmap/20 bg-roadmap-light/30"><CardContent className="p-5"><div className="flex items-center justify-between"><div><Badge variant="violet">Gap-driven recommendation</Badge><p className="mt-2 text-sm font-medium">Priority skill: Power BI</p><p className="text-xs text-muted-foreground">Reason: largest role gap + high industry demand.</p></div><span className="text-sm font-bold">{progress}% complete</span></div><Progress className="mt-4" value={progress} indicatorClassName="bg-roadmap" /></CardContent></Card>
    <div className="relative space-y-4">{ROADMAP_STEPS.map((step, i) => { const done = improved || (assessmentCompleted && i < 3) || (!assessmentCompleted && i === 0); const Icon = done ? CheckCircle2 : i === 1 ? PlayCircle : Circle; return <Card key={step.id} className={done ? 'border-success/20' : ''}><CardContent className="p-5"><div className="flex gap-4"><div className={`mt-0.5 rounded-full ${done ? 'bg-success/10' : 'bg-muted'} p-2`}><Icon className={`h-5 w-5 ${done ? 'text-success' : 'text-roadmap'}`} /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><div><p className="font-semibold">{step.title}</p><p className="text-xs text-muted-foreground">{step.type} · {step.skill}</p></div><Badge variant={done ? 'success' : 'outline'}>{done ? 'Completed' : 'Recommended'}</Badge></div><p className="mt-2 text-sm text-muted-foreground">{step.reason}</p><div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground"><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5"/>{step.duration}</span><span>{step.difficulty}</span><span>Expected {step.expected}</span></div><Progress className="mt-3" value={done ? 100 : step.progress} /></div></div></CardContent></Card>})}</div>
    <Card className="mt-6"><CardHeader><CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary"/>The closed-loop journey</CardTitle></CardHeader><CardContent><div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"><Badge>Skill Gap</Badge><ArrowRight className="h-4 w-4"/><Badge>Learning</Badge><ArrowRight className="h-4 w-4"/><Badge>Project</Badge><ArrowRight className="h-4 w-4"/><Badge>Assessment</Badge><ArrowRight className="h-4 w-4"/><Badge>Improved Skill</Badge><ArrowRight className="h-4 w-4"/><Badge>Re-match</Badge></div></CardContent></Card>
  </div>;
}
