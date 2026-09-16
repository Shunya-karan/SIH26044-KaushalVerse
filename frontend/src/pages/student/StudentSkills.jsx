import React, { useEffect, useRef, useState } from 'react';
import { BadgeCheck, Plus, GitBranch, FileCheck2, ShieldCheck, Upload, X, CheckCircle2, FolderGit2, ExternalLink } from 'lucide-react';
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
import { useAuth } from '@/context/AuthContext';
import GitHubRepositoryPicker from '@/components/GitHubRepositoryPicker';
import { saveFile } from '@/lib/fileStorage';
import { useNavigate } from 'react-router-dom';

const MAX_CERTIFICATE_SIZE = 10 * 1024 * 1024;
const CERTIFICATE_TYPES = [
  'image/png', 'image/jpeg', 'image/webp', 'application/pdf',
  'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export default function StudentSkills() {
  const { user } = useAuth();
  const { skills, projects, addSkill, submitEvidence } = useSIH();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [githubOpen, setGithubOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [form, setForm] = useState({ name: '', level: 'Intermediate' });
  const [evidence, setEvidence] = useState({ github: null, certificate: null, project: null });
  const [certificatePreview, setCertificatePreview] = useState(null);
  const certificateInputRef = useRef(null);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('github') === 'connected') {
      setEvidenceOpen(true);
      toast.success('GitHub connected. Select your repository.');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const resetEvidence = () => {
    if (certificatePreview) URL.revokeObjectURL(certificatePreview);
    setEvidence({ github: null, certificate: null, project: null });
    setCertificatePreview(null);
  };

  const openAdd = () => { setForm({ name: '', level: 'Intermediate' }); setDialogOpen(true); };

  const submit = () => {
    if (!form.name) return toast.error('Select a skill');
    if (!addSkill(form.name, form.level)) return toast.error('Skill already exists');
    setDialogOpen(false);
    setSelectedSkill(form.name);
    resetEvidence();
    setEvidenceOpen(true);
  };

  const handleCertificate = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!CERTIFICATE_TYPES.includes(file.type)) {
      toast.error('Use an image, PDF, DOC or DOCX certificate.');
      event.target.value = '';
      return;
    }
    if (file.size > MAX_CERTIFICATE_SIZE) {
      toast.error('Certificate must be 10 MB or smaller.');
      event.target.value = '';
      return;
    }
    if (certificatePreview) URL.revokeObjectURL(certificatePreview);
    setEvidence((current) => ({ ...current, certificate: file }));
    setCertificatePreview(file.type.startsWith('image/') ? URL.createObjectURL(file) : null);
  };

  const sendEvidence = async () => {
    if (!evidence.github && !evidence.certificate && !evidence.project) return toast.error('Add at least one evidence source: GitHub Project, Certificate, or Project / Portfolio.');
    try {
      const items = [];
      if (evidence.github) items.push({ type: 'GitHub Project', value: evidence.github.repository?.name || evidence.github.value, metadata: evidence.github });
      if (evidence.project) items.push({ type: 'Project / Portfolio', value: evidence.project.title, metadata: { projectId: evidence.project.id, project: evidence.project } });
      if (evidence.certificate) {
        const key = `certificate:${user?.email?.toLowerCase() || 'student'}:${Date.now()}`;
        await saveFile(key, evidence.certificate);
        items.push({ type: 'Certificate', value: evidence.certificate.name, metadata: { storageKey: key, name: evidence.certificate.name, size: evidence.certificate.size, type: evidence.certificate.type } });
      }
      submitEvidence(selectedSkill, items);
      setEvidenceOpen(false);
      resetEvidence();
      toast.success('Evidence submitted for institute verification');
    } catch (error) {
      toast.error(error.message || 'Unable to save certificate');
    }
  };

  const chooseGithub = (repoEvidence) => {
    setEvidence((current) => ({ ...current, github: repoEvidence }));
    setGithubOpen(false);
  };

  const chooseProject = (project) => {
    setEvidence((current) => ({ ...current, project }));
    setProjectOpen(false);
  };

  return <div>
    <PageHeader title="My Skills" description="Add skills, prove them with evidence, and get institute verification." action={<Button onClick={openAdd}><Plus className="h-4 w-4" /> Add Skill</Button>} />
    {skills.length === 0 ? <EmptyState title="No skills" description="Add your first skill." /> : <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{skills.map((s) => <Card key={s.id}><CardContent className="p-5"><div className="flex items-start justify-between gap-3"><div><div className="flex items-center gap-2"><p className="font-semibold">{s.name}</p>{s.verified && <BadgeCheck className="h-4 w-4 text-secondary" />}</div><p className="mt-1 text-xs text-muted-foreground">{s.category} · Demand: {s.demand}</p></div><Badge variant={s.verified ? 'success' : s.verificationStatus === 'Pending Institute Review' ? 'outline' : 'muted'}>{s.verified ? 'Institute Verified' : s.verificationStatus || 'Self Declared'}</Badge></div><div className="mt-4 flex items-center justify-between text-xs"><span>Score {s.score}%</span><span>{s.proficiency || 'Not assessed'}</span></div><Progress className="mt-2" value={s.score} /><div className="mt-3 flex flex-wrap gap-1.5">{s.evidence.map((e) => <Badge key={e} variant="outline">{e}</Badge>)}</div><div className="mt-4 flex items-center justify-between"><p className="text-xs text-muted-foreground">Last assessed: {s.assessed}</p>{!s.verified && <Button size="sm" variant="outline" onClick={() => { setSelectedSkill(s.name); resetEvidence(); setEvidenceOpen(true); }}><ShieldCheck className="mr-1 h-3.5 w-3.5" /> Add Evidence</Button>}</div></CardContent></Card>)}</div>}

    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader><DialogTitle>Add Skill</DialogTitle><DialogDescription>Your skill starts as self-declared. You can then submit evidence for faculty verification.</DialogDescription></DialogHeader>
        <div className="space-y-4"><div className="space-y-1.5"><Label>Skill</Label><Select value={form.name} onValueChange={(v) => setForm({ ...form, name: v })}><SelectTrigger><SelectValue placeholder="Select a skill" /></SelectTrigger><SelectContent>{SKILL_CATALOG.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div><div className="space-y-1.5"><Label>Current level</Label><Select value={form.level} onValueChange={(v) => setForm({ ...form, level: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{['Beginner', 'Intermediate', 'Advanced'].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div></div>
        <DialogFooter><Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={submit}>Add Skill</Button></DialogFooter>
      </DialogContent>
    </Dialog>

    <Dialog open={evidenceOpen} onOpenChange={(open) => { setEvidenceOpen(open); if (!open) resetEvidence(); }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader><DialogTitle>Prove your {selectedSkill} skill</DialogTitle><DialogDescription>Submit at least one trusted evidence source. Your evidence stays pending until an authorized faculty member verifies it.</DialogDescription></DialogHeader>
        <div className="space-y-4">
          <button type="button" onClick={() => setGithubOpen(true)} className="w-full rounded-xl border p-4 text-left transition hover:border-primary/30 hover:bg-muted/40"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background"><GitBranch className="h-5 w-5" /></div><div className="min-w-0 flex-1"><p className="text-sm font-semibold">{evidence.github ? `GitHub: ${evidence.github.repository?.name}` : 'Add a GitHub project'}</p><p className="mt-1 text-xs text-muted-foreground">{evidence.github ? `Connected as @${evidence.github.account?.login}` : 'Sign in with GitHub first, then select one of your repositories.'}</p></div><Badge variant={evidence.github ? 'success' : 'outline'}>{evidence.github ? 'Selected' : 'Connect'}</Badge></div></button>

          <button type="button" onClick={() => setProjectOpen(true)} className="w-full rounded-xl border p-4 text-left transition hover:border-primary/30 hover:bg-muted/40"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><FolderGit2 className="h-5 w-5" /></div><div className="min-w-0 flex-1"><p className="text-sm font-semibold">{evidence.project ? `Project: ${evidence.project.title}` : 'Add a Project / Portfolio'}</p><p className="mt-1 text-xs text-muted-foreground">{evidence.project ? 'Selected from your saved portfolio projects.' : 'Select one of your projects as evidence. Create one if you do not have a project yet.'}</p></div><Badge variant={evidence.project ? 'success' : 'outline'}>{evidence.project ? 'Selected' : 'Choose'}</Badge></div></button>

          <div className="rounded-xl border p-4"><div className="flex items-center gap-2 font-semibold"><FileCheck2 className="h-4 w-4" /> Certificate</div><p className="mt-1 text-xs text-muted-foreground">Upload an image, PDF, DOC or DOCX certificate.</p><input ref={certificateInputRef} type="file" className="hidden" accept="image/png,image/jpeg,image/webp,application/pdf,.doc,.docx" onChange={handleCertificate} /><button type="button" onClick={() => certificateInputRef.current?.click()} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed p-4 text-sm font-medium hover:bg-muted/40"><Upload className="h-4 w-4" /> {evidence.certificate ? 'Replace certificate' : 'Choose certificate file'}</button>{evidence.certificate && <div className="mt-3 rounded-lg bg-muted/50 p-3"><div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /><span className="min-w-0 flex-1 truncate text-sm font-medium">{evidence.certificate.name}</span><button type="button" onClick={() => { setEvidence((current) => ({ ...current, certificate: null })); if (certificatePreview) URL.revokeObjectURL(certificatePreview); setCertificatePreview(null); }}><X className="h-4 w-4" /></button></div>{certificatePreview && <img src={certificatePreview} alt="Certificate preview" className="mt-3 max-h-48 w-full rounded-lg border object-contain bg-white" />}</div>}</div>

          <div className="rounded-lg bg-muted p-3 text-xs text-muted-foreground"><b>Verification rule:</b> Add at least one of GitHub Project, Certificate, or Project / Portfolio. Multiple sources can be submitted together.</div>
        </div>
        <DialogFooter><Button variant="outline" onClick={() => setEvidenceOpen(false)}>Cancel</Button><Button onClick={sendEvidence}>Submit for Verification</Button></DialogFooter>
      </DialogContent>
    </Dialog>
    <Dialog open={projectOpen} onOpenChange={setProjectOpen}><DialogContent className="sm:max-w-xl"><DialogHeader><DialogTitle>Choose a Project / Portfolio</DialogTitle><DialogDescription>Select an existing project to use as evidence for {selectedSkill}. The project itself is the evidence; proof files and screenshots inside it are optional.</DialogDescription></DialogHeader><div className="max-h-[55vh] space-y-3 overflow-y-auto pr-1">{projects.length === 0 ? <div className="rounded-xl border border-dashed p-6 text-center"><FolderGit2 className="mx-auto h-8 w-8 text-muted-foreground" /><p className="mt-2 font-semibold">No projects yet</p><p className="mt-1 text-sm text-muted-foreground">Create a project first, then select it here.</p><Button className="mt-4" onClick={() => { setProjectOpen(false); setEvidenceOpen(false); navigate('/student/projects'); }}><Plus className="mr-1 h-4 w-4" /> Add Project</Button></div> : projects.map((project) => <button key={project.id} type="button" onClick={() => chooseProject(project)} className="w-full rounded-xl border p-4 text-left transition hover:border-primary/30 hover:bg-muted/40"><div className="flex items-start gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><FolderGit2 className="h-5 w-5" /></div><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><p className="font-semibold truncate">{project.title}</p><Badge variant={project.liveDemoUrl || project.proof?.storageKey || project.screenshots?.length ? 'success' : 'outline'}>{project.liveDemoUrl || project.proof?.storageKey || project.screenshots?.length ? 'Ready' : 'Draft'}</Badge></div><p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{project.description}</p><p className="mt-2 text-xs text-muted-foreground">{project.technologies}</p>{project.liveDemoUrl && <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary"><ExternalLink className="h-3 w-3" /> Live demo available</span>}</div></div></button>)}</div><DialogFooter><Button variant="outline" onClick={() => setProjectOpen(false)}>Cancel</Button><Button variant="outline" onClick={() => { setProjectOpen(false); setEvidenceOpen(false); navigate('/student/projects'); }}>Manage Portfolio</Button></DialogFooter></DialogContent></Dialog>
    <GitHubRepositoryPicker open={githubOpen} onOpenChange={setGithubOpen} skill={selectedSkill} onSelect={chooseGithub} />
  </div>;
}
