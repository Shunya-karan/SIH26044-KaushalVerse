import React, { useRef, useState } from 'react';
import { CalendarDays, ExternalLink, FileArchive, FileText, FolderGit2, Image as ImageIcon, Pencil, Plus, Trash2, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader, EmptyState } from '@/components/common/States';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSIH } from '@/context/SIHContext';
import { deleteFile, getFile, saveFile } from '@/lib/fileStorage';

const MAX_PROOF_SIZE = 25 * 1024 * 1024;
const MAX_SCREENSHOT_SIZE = 5 * 1024 * 1024;
const PROOF_TYPES = ['application/zip', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const SCREENSHOT_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

const emptyForm = { title: '', description: '', technologies: '', startDate: '', completionDate: '', liveDemoUrl: '' };
const formatDate = (value) => value ? new Date(`${value}T00:00:00`).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
const proofIcon = (type = '') => type.includes('zip') ? FileArchive : FileText;

export default function ProjectsPortfolio() {
  const { projects, addProject, updateProject, deleteProject } = useSIH();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [proof, setProof] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [removeExistingProof, setRemoveExistingProof] = useState(false);
  const proofRef = useRef(null);
  const screenshotRef = useRef(null);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setProof(null); setScreenshots([]); setRemoveExistingProof(false); setDialogOpen(true); };
  const openEdit = (project) => {
    setEditing(project);
    setForm({ title: project.title || '', description: project.description || '', technologies: project.technologies || '', startDate: project.startDate || '', completionDate: project.completionDate || '', liveDemoUrl: project.liveDemoUrl || '' });
    setProof(null); setScreenshots([]); setRemoveExistingProof(false); setDialogOpen(true);
  };

  const handleProof = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const extension = file.name.toLowerCase().split('.').pop();
    if (!PROOF_TYPES.includes(file.type) && !['zip', 'pdf', 'doc', 'docx'].includes(extension)) { toast.error('Project proof must be ZIP, PDF, DOC or DOCX.'); event.target.value = ''; return; }
    if (file.size > MAX_PROOF_SIZE) { toast.error('Project proof must be 25 MB or smaller.'); event.target.value = ''; return; }
    setProof(file);
  };

  const handleScreenshots = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    if (files.length > 5) { toast.error('You can upload up to 5 screenshots.'); event.target.value = ''; return; }
    const invalid = files.find((file) => !SCREENSHOT_TYPES.includes(file.type));
    if (invalid) { toast.error('Screenshots must be PNG, JPG, JPEG or WEBP.'); event.target.value = ''; return; }
    const oversized = files.find((file) => file.size > MAX_SCREENSHOT_SIZE);
    if (oversized) { toast.error('Each screenshot must be 5 MB or smaller.'); event.target.value = ''; return; }
    setScreenshots(files);
  };

  const save = async () => {
    if (!form.title.trim()) return toast.error('Project title is required.');
    if (!form.description.trim()) return toast.error('Project description is required.');
    if (!form.technologies.trim()) return toast.error('Add at least one technology.');
    if (!form.startDate || !form.completionDate) return toast.error('Start and completion dates are required.');
    if (new Date(form.completionDate) < new Date(form.startDate)) return toast.error('Completion date cannot be before the start date.');
    if (form.liveDemoUrl.trim()) { try { new URL(form.liveDemoUrl.trim()); } catch { return toast.error('Enter a valid Live Demo URL.'); } }
    if (!form.liveDemoUrl.trim() && !proof && !(!removeExistingProof && editing?.proof?.storageKey) && !screenshots.length && !(editing?.screenshots?.length)) {
      return toast.error('Add a Live Demo URL, project proof, or at least one screenshot.');
    }
    try {
      const projectId = editing?.id || `new-${Date.now()}`;
      const next = { ...form, title: form.title.trim(), description: form.description.trim(), technologies: form.technologies.trim(), liveDemoUrl: form.liveDemoUrl.trim(), proof: removeExistingProof ? null : (editing?.proof || null), screenshots: editing?.screenshots || [] };
      if (removeExistingProof && editing?.proof?.storageKey && !proof) await deleteFile(editing.proof.storageKey);
      if (proof) {
        const key = `project-proof:${projectId}:${Date.now()}`;
        await saveFile(key, proof);
        next.proof = { storageKey: key, name: proof.name, size: proof.size, type: proof.type };
      }
      if (screenshots.length) {
        const uploaded = [];
        for (const file of screenshots) {
          const key = `project-screenshot:${projectId}:${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
          await saveFile(key, file);
          uploaded.push({ storageKey: key, name: file.name, size: file.size, type: file.type });
        }
        next.screenshots = [...(next.screenshots || []), ...uploaded].slice(-5);
      }
      if (editing) updateProject(editing.id, next);
      else addProject(next);
      setDialogOpen(false);
      toast.success(editing ? 'Project updated successfully.' : 'Project added successfully.');
    } catch (error) { toast.error(error.message || 'Unable to save project.'); }
  };

  const removeProject = async (project) => {
    if (!window.confirm(`Delete “${project.title}”? This cannot be undone.`)) return;
    try {
      if (project.proof?.storageKey) await deleteFile(project.proof.storageKey);
      for (const image of project.screenshots || []) if (image.storageKey) await deleteFile(image.storageKey);
      deleteProject(project.id);
      toast.success('Project deleted.');
    } catch (error) { toast.error(error.message || 'Unable to delete project files.'); }
  };

  const openStoredFile = async (item, download = false) => {
    if (!item?.storageKey) return toast.error('Uploaded file is unavailable.');
    try {
      const file = await getFile(item.storageKey);
      if (!file) throw new Error('Uploaded file is unavailable.');
      const url = URL.createObjectURL(file);
      const anchor = document.createElement('a');
      anchor.href = url;
      if (download) { anchor.download = item.name; anchor.click(); }
      else window.open(url, '_blank', 'noopener,noreferrer');
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (error) { toast.error(error.message || 'Unable to open file.'); }
  };

  return <div>
    <PageHeader title="Projects / Portfolio" description="Showcase your work and use projects as evidence for skill verification." action={<Button onClick={openAdd}><Plus className="h-4 w-4" /> Add Project</Button>} />
    {projects.length === 0 ? <EmptyState title="No projects yet" description="Add a project to build your portfolio and use it as skill evidence." action={<Button onClick={openAdd}><Plus className="mr-1 h-4 w-4" /> Add Project</Button>} /> : <div className="grid gap-4 lg:grid-cols-2">{projects.map((project) => {
      const ready = Boolean(project.liveDemoUrl || project.proof?.storageKey || project.screenshots?.length);
      return <Card key={project.id}>
        <CardHeader><div className="flex items-start justify-between gap-3"><div className="min-w-0"><CardTitle className="flex items-center gap-2"><FolderGit2 className="h-5 w-5 shrink-0" /> <span className="truncate">{project.title}</span></CardTitle><div className="mt-2 flex flex-wrap gap-1.5"><Badge variant={ready ? 'success' : 'outline'}>{ready ? 'Ready for Evidence' : 'Draft'}</Badge><Badge variant="outline">Updated {formatDate(project.updatedAt?.slice?.(0, 10))}</Badge></div></div><div className="flex gap-1"><Button size="icon" variant="ghost" onClick={() => openEdit(project)} aria-label="Edit project"><Pencil className="h-4 w-4" /></Button><Button size="icon" variant="ghost" onClick={() => removeProject(project)} aria-label="Delete project"><Trash2 className="h-4 w-4" /></Button></div></div></CardHeader>
        <CardContent><p className="text-sm leading-6 text-muted-foreground">{project.description}</p><p className="mt-3 text-sm"><span className="font-semibold">Technologies:</span> {project.technologies}</p><div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {formatDate(project.startDate)} – {formatDate(project.completionDate)}</span></div>
          <div className="mt-4 flex flex-wrap gap-2">{project.liveDemoUrl && <Button size="sm" variant="outline" asChild><a href={project.liveDemoUrl} target="_blank" rel="noreferrer"><ExternalLink className="mr-1 h-3.5 w-3.5" /> Live Demo</a></Button>}{project.proof?.storageKey && <Button size="sm" variant="outline" onClick={() => openStoredFile(project.proof)}><FileText className="mr-1 h-3.5 w-3.5" /> Open proof</Button>}{project.proof?.storageKey && <Button size="sm" variant="ghost" onClick={() => openStoredFile(project.proof, true)}>Download</Button>}</div>
          {project.screenshots?.length > 0 && <div className="mt-4"><p className="mb-2 flex items-center gap-1 text-xs font-semibold"><ImageIcon className="h-3.5 w-3.5" /> Screenshots ({project.screenshots.length}/5)</p><div className="grid grid-cols-5 gap-2">{project.screenshots.map((image) => <button key={image.storageKey} type="button" onClick={() => openStoredFile(image)} className="overflow-hidden rounded-lg border bg-muted/30" title={`Preview ${image.name}`}><div className="flex aspect-square items-center justify-center"><ImageIcon className="h-5 w-5 text-muted-foreground" /></div></button>)}</div></div>}
        </CardContent>
      </Card>;
    })}</div>}

    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>{editing ? 'Edit Project' : 'Add Project'}</DialogTitle><DialogDescription>Add project details and at least one proof source: Live Demo URL, project proof, or screenshot.</DialogDescription></DialogHeader>
      <div className="space-y-4"><div className="space-y-1.5"><Label>Project title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. PriceShield" /></div><div className="space-y-1.5"><Label>Description *</Label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="min-h-24 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="What did you build and what problem does it solve?" /></div><div className="space-y-1.5"><Label>Technologies *</Label><Input value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} placeholder="React, Node.js, MongoDB" /></div><div className="grid gap-4 sm:grid-cols-2"><div className="space-y-1.5"><Label>Start date *</Label><Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} /></div><div className="space-y-1.5"><Label>Completion date *</Label><Input type="date" value={form.completionDate} onChange={(e) => setForm({ ...form, completionDate: e.target.value })} /></div></div><div className="space-y-1.5"><Label>Live Demo URL</Label><Input type="url" value={form.liveDemoUrl} onChange={(e) => setForm({ ...form, liveDemoUrl: e.target.value })} placeholder="https://..." /></div>
        <div className="rounded-xl border p-4"><Label>Project Proof <span className="text-muted-foreground">(optional)</span></Label><p className="mt-1 text-xs text-muted-foreground">ZIP / PDF / DOC / DOCX · up to 25 MB</p><input ref={proofRef} type="file" className="hidden" accept=".zip,.pdf,.doc,.docx,application/zip,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleProof} /><Button type="button" variant="outline" className="mt-3" onClick={() => proofRef.current?.click()}><Upload className="mr-1 h-4 w-4" /> {proof ? proof.name : editing?.proof?.name ? `Replace: ${editing.proof.name}` : 'Choose proof file'}</Button>{editing?.proof && !proof && !removeExistingProof && <Button type="button" variant="ghost" className="ml-2" onClick={() => setRemoveExistingProof(true)}>Remove existing proof</Button>}{removeExistingProof && <span className="ml-2 text-xs text-destructive">Existing proof will be removed on save.</span>}</div>
        <div className="rounded-xl border p-4"><Label>Screenshots <span className="text-muted-foreground">(optional)</span></Label><p className="mt-1 text-xs text-muted-foreground">PNG / JPG / JPEG / WEBP · up to 5 files · 5 MB each</p><input ref={screenshotRef} type="file" multiple className="hidden" accept="image/png,image/jpeg,image/webp" onChange={handleScreenshots} /><Button type="button" variant="outline" className="mt-3" onClick={() => screenshotRef.current?.click()}><ImageIcon className="mr-1 h-4 w-4" /> Add screenshots</Button>{screenshots.length > 0 && <div className="mt-3 space-y-1">{screenshots.map((file) => <div key={file.name} className="flex items-center gap-2 text-xs"><ImageIcon className="h-3.5 w-3.5" /><span className="min-w-0 flex-1 truncate">{file.name}</span></div>)}</div>}{editing?.screenshots?.length > 0 && !screenshots.length && <p className="mt-2 text-xs text-muted-foreground">{editing.screenshots.length} existing screenshot(s) will be kept. New uploads replace the oldest when the limit is exceeded.</p>}</div>
      </div><DialogFooter><Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={save}>{editing ? 'Save Changes' : 'Add Project'}</Button></DialogFooter></DialogContent></Dialog>
  </div>;
}
