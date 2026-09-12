import React, { useState } from 'react';
import { BadgeCheck, Plus, GitBranch, FileCheck2, FolderGit2, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader, EmptyState } from '@/components/common/States';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { SKILL_CATALOG } from '@/data/mockSkills';
import { useSIH } from '@/context/SIHContext';
import GitHubRepositoryPicker from '@/components/GitHubRepositoryPicker';

export default function StudentSkills() {
  const { skills, addSkill, submitEvidence } = useSIH();
  const [dialogOpen, setDialogOpen] = useState(false); const [evidenceOpen, setEvidenceOpen] = useState(false); const [githubOpen, setGithubOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(''); const [form, setForm] = useState({ name: '', level: 'Intermediate' });
  const [evidence, setEvidence] = useState({ github: null, certificate: '', project: '' });
  const openAdd = () => { setForm({ name: '', level: 'Intermediate' }); setDialogOpen(true); };
  const submit = () => { if (!form.name) return toast.error('Select a skill'); if (!addSkill(form.name, form.level)) return toast.error('Skill already exists'); setDialogOpen(false); setSelectedSkill(form.name); setEvidenceOpen(true); };
  const sendEvidence = () => {
    if (!evidence.github && !evidence.certificate && !evidence.project) return toast.error('Add at least one evidence source');
    submitEvidence(selectedSkill, [evidence.github && { type: 'GitHub Project', value: evidence.github.name, metadata: evidence.github }, evidence.certificate && { type: 'Certificate', value: evidence.certificate }, evidence.project && { type: 'Project / Portfolio', value: evidence.project }].filter(Boolean));
    setEvidenceOpen(false); setEvidence({ github: null, certificate: '', project: '' }); toast.success('Evidence submitted for institute verification');
  };
  const chooseGithub = (repoEvidence) => { setEvidence({ ...evidence, github: repoEvidence.repository ? repoEvidence : repoEvidence }); setGithubOpen(false); };
  return <div><PageHeader title="My Skills" description="Add skills, prove them with evidence, and get institute verification." action={<Button onClick={openAdd}><Plus className="h-4 w-4"/> Add Skill</Button>} />
    {skills.length===0 ? <EmptyState title="No skills" description="Add your first skill."/> : <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{skills.map(s=><Card key={s.id}><CardContent className="p-5"><div className="flex items-start justify-between gap-3"><div><div className="flex items-center gap-2"><p className="font-semibold">{s.name}</p>{s.verified&&<BadgeCheck className="h-4 w-4 text-secondary"/>}</div><p className="mt-1 text-xs text-muted-foreground">{s.category} · Demand: {s.demand}</p></div><Badge variant={s.verified?'success':s.verificationStatus==='Pending Institute Review'?'outline':'muted'}>{s.verified?'Institute Verified':s.verificationStatus||'Self Declared'}</Badge></div><div className="mt-4 flex items-center justify-between text-xs"><span>Score {s.score}%</span><span>Target {s.target}/5</span></div><Progress className="mt-2" value={s.score}/><div className="mt-3 flex flex-wrap gap-1.5">{s.evidence.map(e=><Badge key={e} variant="outline">{e}</Badge>)}</div><div className="mt-4 flex items-center justify-between"><p className="text-xs text-muted-foreground">Last assessed: {s.assessed}</p>{!s.verified && <Button size="sm" variant="outline" onClick={()=>{setSelectedSkill(s.name);setEvidenceOpen(true)}}><ShieldCheck className="mr-1 h-3.5 w-3.5"/> Add Evidence</Button>}</div></CardContent></Card>)}</div>}
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogContent><DialogHeader><DialogTitle>Add Skill</DialogTitle><DialogDescription>Your skill will be added as self-declared and then you can submit proof for institute verification.</DialogDescription></DialogHeader><div className="space-y-4"><div className="space-y-1.5"><Label>Skill</Label><Select value={form.name} onValueChange={v=>setForm({...form,name:v})}><SelectTrigger><SelectValue placeholder="Select a skill"/></SelectTrigger><SelectContent>{SKILL_CATALOG.map(s=><SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div><div className="space-y-1.5"><Label>Current level</Label><Select value={form.level} onValueChange={v=>setForm({...form,level:v})}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{['Beginner','Intermediate','Advanced'].map(s=><SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div></div><DialogFooter><Button variant="outline" onClick={()=>setDialogOpen(false)}>Cancel</Button><Button onClick={submit}>Add & Verify</Button></DialogFooter></DialogContent></Dialog>
    <Dialog open={evidenceOpen} onOpenChange={setEvidenceOpen}><DialogContent className="sm:max-w-lg"><DialogHeader><DialogTitle>Verify {selectedSkill} skill</DialogTitle><DialogDescription>Choose evidence that proves your skill. GitHub evidence starts with account authentication and repository selection — no arbitrary repository URLs.</DialogDescription></DialogHeader><div className="space-y-4">
      <button type="button" onClick={()=>setGithubOpen(true)} className="w-full rounded-lg border p-4 text-left hover:bg-muted/50"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-md bg-foreground text-background"><GitBranch className="h-4 w-4"/></div><div className="flex-1"><p className="text-sm font-medium">{evidence.github ? `GitHub: ${evidence.github.repository?.name || evidence.github.value}` : 'Connect GitHub & select repository'}</p><p className="mt-1 text-xs text-muted-foreground">{evidence.github ? `Connected as @${evidence.github.account?.login || 'student'}` : 'Authenticate your account, then choose one of your repositories'}</p></div><Badge variant={evidence.github ? 'success' : 'outline'}>{evidence.github ? 'Selected' : 'Connect'}</Badge></div></button>
      <div className="rounded-lg border p-3"><div className="flex items-center gap-2 font-medium"><FileCheck2 className="h-4 w-4"/> Certificate</div><Input className="mt-2" placeholder="Certificate / course name or file reference" value={evidence.certificate} onChange={e=>setEvidence({...evidence,certificate:e.target.value})}/></div>
      <div className="rounded-lg border p-3"><div className="flex items-center gap-2 font-medium"><FolderGit2 className="h-4 w-4"/> Project / Portfolio</div><Input className="mt-2" placeholder="Project or portfolio link" value={evidence.project} onChange={e=>setEvidence({...evidence,project:e.target.value})}/></div>
      <div className="rounded-lg bg-muted p-3 text-xs text-muted-foreground">Submission status: <b>Pending Institute Review</b>. Students cannot mark their own evidence as verified.</div></div><DialogFooter><Button variant="outline" onClick={()=>setEvidenceOpen(false)}>Cancel</Button><Button onClick={sendEvidence}>Submit for Verification</Button></DialogFooter></DialogContent></Dialog>
    <GitHubRepositoryPicker open={githubOpen} onOpenChange={setGithubOpen} skill={selectedSkill} onSelect={chooseGithub} />
  </div>;
}
