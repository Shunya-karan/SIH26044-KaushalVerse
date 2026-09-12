import React, { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/States";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";

const TOGGLES = [
  { key: "emailNotifs", label: "Email notifications", desc: "Receive updates about applications and matches by email." },
  { key: "smsNotifs", label: "SMS alerts", desc: "Get SMS alerts for interview scheduling (demo)." },
  { key: "profileVisible", label: "Profile visible to companies", desc: "Allow companies to discover your profile in candidate search." },
  { key: "weeklyDigest", label: "Weekly digest", desc: "A weekly summary of new opportunities and roadmap progress." },
];

export default function SettingsPage() {
  const { user } = useAuth();
  const [toggles, setToggles] = useState({ emailNotifs: true, smsNotifs: false, profileVisible: true, weeklyDigest: true });

  const handleSave = () => toast.success("Settings saved");

  return (
    <div>
      <PageHeader title="Settings" description="Manage your notification preferences and account settings." />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Notification Preferences</CardTitle></CardHeader>
          <CardContent className="divide-y divide-border">
            {TOGGLES.map((t) => (
              <div key={t.key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{t.label}</p>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </div>
                <Switch checked={toggles[t.key]} onCheckedChange={(v) => setToggles({ ...toggles, [t.key]: v })} />
              </div>
            ))}
            <div className="pt-4">
              <Button onClick={handleSave}>Save Preferences</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Account</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div><p className="text-muted-foreground">Name</p><p className="font-medium text-foreground">{user?.name}</p></div>
            <Separator />
            <div><p className="text-muted-foreground">Email</p><p className="font-medium text-foreground">{user?.email}</p></div>
            <Separator />
            <div><p className="text-muted-foreground">Role</p><p className="font-medium text-foreground capitalize">{user?.role}</p></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
