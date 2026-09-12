import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/common/States';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { INTERNSHIP_EVALUATION } from '@/data/sihDemoData';
export default function FacultyInternships(){return <div><PageHeader title="Internships" description="Track student internship progress and ensure industry feedback returns to academia."/><Card><CardContent className="p-5"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><Badge variant="success">In Progress</Badge><h2 className="mt-2 font-semibold">{INTERNSHIP_EVALUATION.role}</h2><p className="text-sm text-muted-foreground">Aarav Sharma · {INTERNSHIP_EVALUATION.company}</p></div><Button asChild><Link to="/company/evaluation">View Evaluation <ArrowRight className="h-4 w-4"/></Link></Button></div><div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="rounded-lg bg-muted p-3"><p className="text-xs text-muted-foreground">Mentor</p><p className="mt-1 text-sm font-medium">{INTERNSHIP_EVALUATION.mentor}</p></div><div className="rounded-lg bg-muted p-3"><p className="text-xs text-muted-foreground">Progress</p><p className="mt-1 text-sm font-medium">65%</p></div><div className="rounded-lg bg-muted p-3"><p className="text-xs text-muted-foreground">Feedback</p><p className="mt-1 text-sm font-medium"><CheckCircle2 className="mr-1 inline h-4 w-4 text-secondary"/>Pending update</p></div></div></CardContent></Card></div>}
