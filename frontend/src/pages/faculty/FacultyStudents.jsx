import React from 'react';
import { CheckCircle2, MessageSquare, Target } from 'lucide-react';
import { PageHeader } from '@/components/common/States';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FACULTY_STUDENTS } from '@/data/sihDemoData';
import { toast } from 'sonner';
export default function FacultyStudents(){ return <div><PageHeader title="Students" description="Review evidence, skill gaps, internship progress and mentoring actions."/><div className="space-y-4">{FACULTY_STUDENTS.map(s=><Card key={s.name}><CardContent className="p-5"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div><p className="text-lg font-semibold">{s.name}</p><p className="text-sm text-muted-foreground">Readiness {s.readiness}% · Critical gap {s.gap} · {s.internship}</p><div className="mt-2 flex gap-2"><Badge variant="outline">Skill Profile</Badge><Badge variant="outline">Assessment</Badge><Badge variant="outline">Learning progress</Badge></div></div><div className="flex flex-wrap gap-2"><Button size="sm" variant="outline" onClick={()=>toast.success(`${s.gap} marked for mentoring`)}><Target className="h-4 w-4"/> Recommend Learning</Button><Button size="sm" onClick={()=>toast.success('Faculty verification recorded')}><CheckCircle2 className="h-4 w-4"/> Verify Skill</Button><Button size="sm" variant="ghost" onClick={()=>toast.info('Feedback panel ready in demo mode')}><MessageSquare className="h-4 w-4"/> Feedback</Button></div></div></CardContent></Card>)}</div></div> }
