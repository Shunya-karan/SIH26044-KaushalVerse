import React, { useState } from "react";
import { toast } from "sonner";
import { Pencil, Check } from "lucide-react";
import { PageHeader } from "@/components/common/States";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { CURRENT_COMPANY } from "@/data/mockCompanies";
import { initials } from "@/lib/utils";

export default function CompanyProfile() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(CURRENT_COMPANY);
  const [draft, setDraft] = useState(CURRENT_COMPANY);

  const handleSave = () => {
    setProfile(draft);
    setEditing(false);
    toast.success("Company profile updated");
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
        title="Company Profile"
        description="Keep your company information up to date for candidates and admins."
        action={
          editing ? (
            <Button onClick={handleSave}><Check className="h-4 w-4" /> Save Changes</Button>
          ) : (
            <Button variant="outline" onClick={() => { setDraft(profile); setEditing(true); }}><Pencil className="h-4 w-4" /> Edit Profile</Button>
          )
        }
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Company Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 rounded-lg">
                  <AvatarFallback className="rounded-lg text-lg">{initials(profile.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{profile.name}</p>
                  <p className="text-sm text-muted-foreground">{profile.industry}</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {field("name", "Company Name")}
                {field("industry", "Industry")}
                {field("website", "Website")}
                {field("location", "Location")}
                {field("size", "Company Size")}
                {field("contactEmail", "Contact Email")}
              </div>
              {field("about", "About", "textarea")}
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
