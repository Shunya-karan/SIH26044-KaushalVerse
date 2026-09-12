import React from 'react';
import { CheckCircle2, XCircle, GitBranch, FileCheck2, FolderGit2, Clock3 } from 'lucide-react';
import { PageHeader } from '@/components/common/States';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSIH } from '@/context/SIHContext';
import { toast } from 'sonner';

export default function SkillVerification() {
  const { verificationRequests, verifyEvidence } = useSIH();
  const pending = (verificationRequests || []).filter(r => r.status === 'Pending Institute Review');
  return <div>
    <PageHeader title="Skill Verification" description="Review student evidence before a skill receives the Institute Verified badge." />
    {pending.length === 0 ? <Card><CardContent className="py-12 text-center"><CheckCircle2 className="mx-auto h-10 w-10 text-secondary"/><p className="mt-3 font-semibold">No pending verification requests</p><p className="mt-1 text-sm text-muted-foreground">New student evidence submissions will appear here.</p></CardContent></Card> : <div className="space-y-4">{pending.map(r => <Card key={r.id}><CardHeader><div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><CardTitle>{r.student} · {r.skill}</CardTitle><Badge variant="outline"><Clock3 className="mr-1 h-3.5 w-3.5"/> Pending Institute Review</Badge></div></CardHeader><CardContent><div className="grid gap-3 md:grid-cols-3">{r.evidence.map((e, i) => <div key={i} className="rounded-lg border p-3"><div className="flex items-center gap-2 text-sm font-medium">{e.type === 'GitHub Project' ? <GitBranch className="h-4 w-4"/> : e.type === 'Certificate' ? <FileCheck2 className="h-4 w-4"/> : <FolderGit2 className="h-4 w-4"/>}{e.type}</div><p className="mt-2 break-all text-xs text-muted-foreground">{e.value}</p>{e.type === 'GitHub Project' && e.metadata?.account && <p className="mt-1 text-[11px] text-muted-foreground">Connected account: @{e.metadata.account.login} · repository selected from connected account</p>}</div>)}</div><p className="mt-4 text-xs text-muted-foreground">Submitted: {r.submittedAt} · Reviewer decision changes the student's Skill Passport.</p><div className="mt-4 flex gap-2"><Button onClick={()=>{verifyEvidence(r.id,true);toast.success(`${r.skill} verified for ${r.student}`)}}><CheckCircle2 className="mr-1 h-4 w-4"/> Verify Evidence</Button><Button variant="outline" onClick={()=>{verifyEvidence(r.id,false);toast.error('Evidence rejected')}}><XCircle className="mr-1 h-4 w-4"/> Reject</Button></div></CardContent></Card>)}</div>}
  </div>;
}
