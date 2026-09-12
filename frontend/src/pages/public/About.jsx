import React from "react";
import { Landmark, Target, Eye, Users, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionLabel } from "@/components/common/States";
import { GovernmentContextBanner } from "@/components/common/GovernmentContextBanner";

export default function About() {
  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-2xl text-center">
        <SectionLabel>About KaushalVerse</SectionLabel>
        <h1 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">Institutional Context</h1>
        <p className="mt-3 text-muted-foreground">
          Built as a Smart India Hackathon prototype addressing academia–industry collaboration, skill mapping,
          internships and placement.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="rounded-lg bg-primary-soft p-2.5 text-primary w-fit"><Target className="h-5 w-5" /></div>
            <p className="mt-4 font-semibold text-foreground">Our Mission</p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              To close the gap between what students learn and what industry needs, through transparent
              skill mapping and explainable matching — making employability measurable and improvable.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="rounded-lg bg-secondary-light p-2.5 text-secondary w-fit"><Eye className="h-5 w-5" /></div>
            <p className="mt-4 font-semibold text-foreground">Our Vision</p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              A connected ecosystem where every student has a clear, data-informed path from classroom
              skills to meaningful internships and placements, in partnership with institutions and industry.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <GovernmentContextBanner />
      </div>

      <div className="mt-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-muted p-2.5 text-muted-foreground shrink-0"><Landmark className="h-5 w-5" /></div>
              <div>
                <p className="font-semibold text-foreground">Problem Statement Context</p>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  This prototype was built for the Smart India Hackathon problem statement on a "Portal for
                  Academia–Industry Collaboration for Skill Mapping, Internships and Placement," associated with
                  the Government of India / Ministry of Health & Family Welfare context. It is a conceptual,
                  hackathon-stage demonstration and does not represent an officially deployed government system.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="muted">Government of India</Badge>
                  <Badge variant="muted">Ministry of Health & Family Welfare</Badge>
                  <Badge variant="muted">Ayushman Bharat (contextual reference)</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <p className="mb-3 text-sm font-semibold text-foreground flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" /> Institutional Leadership Reference
        </p>
        <p className="mb-4 text-xs text-muted-foreground max-w-2xl">
          The following names refer to institutional leadership in the associated ministry context, shown here
          purely for background reference — they are not members of the KaushalVerse project team and have not
          endorsed this prototype.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="p-5">
              <p className="font-semibold text-foreground">Shri Jagat Prakash Nadda</p>
              <p className="text-sm text-muted-foreground">Union Minister of Health & Family Welfare</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="font-semibold text-foreground">Ms. Punya Salila Srivastava</p>
              <p className="text-sm text-muted-foreground">Secretary, Health & Family Welfare</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card className="border-warning/30 bg-orange-50/40">
          <CardContent className="p-5 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-warning shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">
              <span className="font-semibold">Disclaimer:</span> KaushalVerse is a conceptual demonstration built
              for Smart India Hackathon. It is not government-approved, government-certified, or an official
              Ministry portal, and no endorsement by any official is implied or claimed.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
