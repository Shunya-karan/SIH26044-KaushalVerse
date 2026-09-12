import React, { useState } from "react";
import { toast } from "sonner";
import { Pencil, Check, User } from "lucide-react";
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
import { STUDENT_SKILLS } from "@/data/mockSkills";
import { initials } from "@/lib/utils";

export default function StudentProfile() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(CURRENT_STUDENT);
  const [draft, setDraft] = useState(CURRENT_STUDENT);

  const handleSave = () => {
    setProfile(draft);
    setEditing(false);
    toast.success("Profile updated successfully");
  };

  const field = (key, label, type = "text") => (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {editing ? (
        type === "textarea" ? (
          <Textarea value={draft[key]} onChange={(e) => setDraft({ ...draft, [key]: e.target.value })} rows={4} />
        ) : (
          <Input value={draft[key]} onChange={(e) => setDraft({ ...draft, [key]: e.target.value })} />
        )
      ) : (
        <p className="text-sm text-foreground">{profile[key]}</p>
      )}
    </div>
  );

  return (
    <div>
      <PageHeader
        title="My Profile"
        description="Manage your personal information, education and skill snapshot."
        action={
          editing ? (
            <Button onClick={handleSave}><Check className="h-4 w-4" /> Save Changes</Button>
          ) : (
            <Button variant="outline" onClick={() => { setDraft(profile); setEditing(true); }}>
              <Pencil className="h-4 w-4" /> Edit Profile
            </Button>
          )
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">{initials(profile.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{profile.name}</p>
                  <p className="text-sm text-muted-foreground">{profile.email}</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {field("name", "Full Name")}
                {field("location", "Location")}
              </div>
              {field("about", "About", "textarea")}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Education</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {field("college", "College")}
              {field("degree", "Degree")}
              {field("branch", "Branch")}
              {field("graduationYear", "Graduation Year")}
              {field("cgpa", "CGPA")}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Skills Snapshot</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {STUDENT_SKILLS.map((s) => (
                  <Badge key={s.id} variant="outline">{s.name} · {s.proficiency}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader><CardTitle>Profile Completion</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Overall completion</span>
                <span className="text-sm font-bold text-foreground">{profile.profileCompletion}%</span>
              </div>
              <Progress value={profile.profileCompletion} />
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-success" /> Basic details added</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-success" /> Education added</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-success" /> Skills mapped</li>
                <li className="flex items-center gap-2 text-subtle"><User className="h-3.5 w-3.5" /> Add a resume file</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
