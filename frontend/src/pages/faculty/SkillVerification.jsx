import React from 'react';
import { CheckCircle2, XCircle, GitBranch, FileCheck2, FolderGit2, Clock3, ExternalLink, Image as ImageIcon, FileText } from 'lucide-react';
import { PageHeader } from '@/components/common/States';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSIH } from '@/context/SIHContext';
import { toast } from 'sonner';
import { getFile } from '@/lib/fileStorage';

const formatDate = (value) => value ? new Date(`${value}T00:00:00`).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

export default function SkillVerification() {
  const { verificationRequests, verifyEvidence } = useSIH();
  const pending = (verificationRequests || []).filter((r) => r.status === 'Pending Institute Review');

  const openFile = async (item) => {
    if (!item?.storageKey) return toast.error('Uploaded file is unavailable.');
    try {
      const file = await getFile(item.storageKey);
      if (!file) throw new Error('Uploaded file is unavailable.');
      const url = URL.createObjectURL(file);
      window.open(url, '_blank', 'noopener,noreferrer');
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (error) { toast.error(error.message || 'Unable to open uploaded file.'); }
  };

  return <div>
    <PageHeader title="Skill Verification" description="Review student evidence before a skill receives the Institute Verified badge." />
    {pending.length === 0 ? <Card><CardContent className="py-12 text-center"><CheckCircle2 className="mx-auto h-10 w-10 text-secondary"/><p className="mt-3 font-semibold">No pending verification requests</p><p className="mt-1 text-sm text-muted-foreground">New student evidence submissions will appear here.</p></CardContent></Card> : <div className="space-y-4">{pending.map((r) => <Card key={r.id}><CardHeader><div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><CardTitle>{r.student} · {r.skill}</CardTitle><Badge variant="outline"><Clock3 className="mr-1 h-3.5 w-3.5"/> Pending Institute Review</Badge></div><p className="text-xs text-muted-foreground">Submitted: {r.submittedAt}</p></CardHeader><CardContent><div className="grid gap-3 md:grid-cols-3">{r.evidence.map((e, i) => {
            const project = e.metadata?.project;
            return <div key={i} className="rounded-lg border p-3"><div className="flex items-center gap-2 text-sm font-medium">{e.type === 'GitHub Project' ? <GitBranch className="h-4 w-4"/> : e.type === 'Certificate' ? <FileCheck2 className="h-4 w-4"/> : <FolderGit2 className="h-4 w-4"/>}{e.type}</div>
              {e.type === 'Project / Portfolio' && project ? <div className="mt-2 space-y-2"><p className="font-semibold">{project.title}</p><p className="text-xs leading-5 text-muted-foreground">{project.description}</p><p className="text-xs"><span className="font-semibold">Technologies:</span> {project.technologies}</p><p className="text-[11px] text-muted-foreground">{formatDate(project.startDate)} – {formatDate(project.completionDate)}</p><div className="flex flex-wrap gap-2">{project.liveDemoUrl && <a href={project.liveDemoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"><ExternalLink className="h-3 w-3"/> Live Demo</a>}{project.proof?.storageKey && <button type="button" onClick={() => openFile(project.proof)} className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"><FileText className="h-3 w-3"/> Open proof</button>}</div>{project.screenshots?.length > 0 && <div className="flex flex-wrap gap-1.5 pt-1">{project.screenshots.map((image) => <button key={image.storageKey} type="button" title={`Preview ${image.name}`} onClick={() => openFile(image)} className="rounded border p-1"><ImageIcon className="h-4 w-4"/></button>)}</div>}</div> : <p className="mt-2 break-all text-xs text-muted-foreground">{e.value}</p>}
              {e.type === 'GitHub Project' && e.metadata?.account && <><p className="mt-1 text-[11px] text-muted-foreground">Connected account: @{e.metadata.account.login} · repository selected from connected account</p>{e.metadata.repository?.html_url && <a href={e.metadata.repository.html_url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs font-semibold text-primary hover:underline">Open repository →</a>}</>}{e.type === 'Certificate' && e.metadata?.storageKey && <button type="button" onClick={() => openFile(e.metadata)} className="mt-2 inline-block text-xs font-semibold text-primary hover:underline">Open uploaded certificate →</button>}</div>;
          })}</div><p className="mt-4 text-xs text-muted-foreground">Reviewer decision changes the student's Skill Passport.</p><div className="mt-4 flex gap-2"><Button onClick={() => { verifyEvidence(r.id, true); toast.success(`${r.skill} verified for ${r.student}`); }}><CheckCircle2 className="mr-1 h-4 w-4"/> Verify Evidence</Button><Button variant="outline" onClick={() => { verifyEvidence(r.id, false); toast.error('Evidence rejected'); }}><XCircle className="mr-1 h-4 w-4"/> Reject</Button></div></CardContent></Card>)}</div>}
  </div>;
}
