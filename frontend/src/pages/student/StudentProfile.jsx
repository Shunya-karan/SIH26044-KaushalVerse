import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Pencil, Check, User, Upload, FileText, X } from "lucide-react";
import { PageHeader } from "@/components/common/States";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CURRENT_STUDENT } from "@/data/mockStudents";
import { useAuth } from "@/context/AuthContext";
import { STUDENT_SKILLS } from "@/data/mockSkills";
import { initials } from "@/lib/utils";
import { saveFile } from "@/lib/fileStorage";

const RESUME_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const MAX_RESUME_SIZE = 10 * 1024 * 1024;

export default function StudentProfile() {
  const { user, updateUser } = useAuth();
  const baseProfile = user || { ...CURRENT_STUDENT, isDemo: true };
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(baseProfile);
  const [draft, setDraft] = useState(baseProfile);
  const [resume, setResume] = useState(null);
  const resumeInputRef = useRef(null);

  useEffect(() => {
    setProfile(baseProfile);
    setDraft(baseProfile);
  }, [user]);

  const handleSave = () => {
    const nextProfile = { ...draft };
    setProfile(nextProfile);
    updateUser(nextProfile);
    setEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleResume = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!RESUME_TYPES.includes(file.type)) return toast.error('Resume must be PDF, DOC or DOCX.');
    if (file.size > MAX_RESUME_SIZE) return toast.error('Resume must be 10 MB or smaller.');
    try {
      const key = `resume:${user?.email?.toLowerCase() || 'student'}`;
      await saveFile(key, file);
      const metadata = { storageKey: key, name: file.name, size: file.size, type: file.type, uploadedAt: new Date().toISOString() };
      updateUser({ resume: metadata, profileCompletion: Math.max(profile.profileCompletion || 0, 70) });
      setProfile((current) => ({ ...current, resume: metadata, profileCompletion: Math.max(current.profileCompletion || 0, 70) }));
      setDraft((current) => ({ ...current, resume: metadata, profileCompletion: Math.max(current.profileCompletion || 0, 70) }));
      setResume(file);
      toast.success('Resume uploaded successfully');
    } catch (error) {
      toast.error(error.message || 'Unable to save resume');
    }
    event.target.value = '';
  };

  const field = (key, label, type = "text") => (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {editing ? (
        type === "textarea" ? (
          <Textarea value={draft[key] || ''} onChange={(e) => setDraft({ ...draft, [key]: e.target.value })} rows={4} />
        ) : (
          <Input value={draft[key] || ''} onChange={(e) => setDraft({ ...draft, [key]: e.target.value })} />
        )
      ) : (
        <p className="text-sm text-foreground">{profile[key] || '—'}</p>
      )}
    </div>
  );

  const skillsForProfile = profile.skills?.length ? profile.skills : (profile.isDemo ? STUDENT_SKILLS : []);

  return (
    <div>
      <PageHeader title="My Profile" description="Manage your personal information, education and skill snapshot." action={editing ? <Button onClick={handleSave}><Check className="h-4 w-4" /> Save Changes</Button> : <Button variant="outline" onClick={() => { setDraft(profile); setEditing(true); }}><Pencil className="h-4 w-4" /> Edit Profile</Button>} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card><CardHeader><CardTitle>Personal Information</CardTitle></CardHeader><CardContent className="space-y-4"><div className="flex items-center gap-4"><Avatar className="h-16 w-16"><AvatarFallback className="text-lg">{initials(profile.name)}</AvatarFallback></Avatar><div><p className="font-semibold text-foreground">{profile.name}</p><p className="text-sm text-muted-foreground">{profile.email}</p></div></div><div className="grid gap-4 sm:grid-cols-2">{field("name", "Full Name")}{field("location", "Location")}</div>{field("about", "About", "textarea")}</CardContent></Card>

          <Card><CardHeader><CardTitle>Education</CardTitle></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2">{field("college", "College")}{field("degree", "Degree")}{field("branch", "Branch")}{field("currentYear", "Current Year")}{field("semester", "Current Semester")}{field("graduationYear", "Graduation Year")}{field("cgpa", "CGPA")}</CardContent></Card>

          <Card><CardHeader><CardTitle>Resume</CardTitle></CardHeader><CardContent><input ref={resumeInputRef} type="file" className="hidden" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleResume} /><div className="rounded-xl border border-dashed p-5"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary"><FileText className="h-5 w-5" /></div><div><p className="text-sm font-semibold">{profile.resume?.name || 'No resume uploaded'}</p><p className="text-xs text-muted-foreground">PDF, DOC or DOCX · Maximum 10 MB</p></div></div><Button variant="outline" onClick={() => resumeInputRef.current?.click()}><Upload className="mr-2 h-4 w-4" />{profile.resume ? 'Replace Resume' : 'Upload Resume'}</Button></div>{resume && <p className="mt-3 text-xs text-success">✓ {resume.name} is ready and stored for this student account.</p>}</div></CardContent></Card>

          <Card><CardHeader><CardTitle>Skills Snapshot</CardTitle></CardHeader><CardContent><div className="flex flex-wrap gap-2">{skillsForProfile.length ? skillsForProfile.map((s) => <Badge key={s.id} variant="outline">{s.name} · {s.proficiency}</Badge>) : <p className="text-sm text-muted-foreground">No skills added yet.</p>}</div></CardContent></Card>
        </div>

        <div><Card><CardHeader><CardTitle>Profile Completion</CardTitle></CardHeader><CardContent><div className="mb-2 flex items-center justify-between"><span className="text-sm text-muted-foreground">Overall completion</span><span className="text-sm font-bold text-foreground">{profile.profileCompletion || 0}%</span></div><Progress value={profile.profileCompletion || 0} /><ul className="mt-4 space-y-2 text-sm text-muted-foreground"><li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-success" /> Basic details added</li><li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-success" /> Education added</li>{skillsForProfile.length > 0 ? <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-success" /> Skills mapped</li> : <li className="flex items-center gap-2 text-subtle"><User className="h-3.5 w-3.5" /> Add your skills</li>}{profile.resume ? <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-success" /> Resume uploaded</li> : <li className="flex items-center gap-2 text-subtle"><User className="h-3.5 w-3.5" /> Add a resume file</li>}</ul></CardContent></Card></div>
      </div>
    </div>
  );
}
