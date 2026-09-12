import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Briefcase, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MatchScore } from "@/components/dashboard/DashboardWidgets";
import { initials } from "@/lib/utils";

export function OpportunityCard({ opportunity, index = 0 }) {
  const o = opportunity;
  return (
    <Card className="hover:shadow-soft transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <Avatar className="h-11 w-11 rounded-lg">
              <AvatarFallback className="rounded-lg">{initials(o.company)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-semibold text-foreground truncate">{o.title}</p>
              <p className="text-sm text-muted-foreground truncate">{o.company}</p>
            </div>
          </div>
          <MatchScore score={o.match} size="sm" />
        </div>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{o.location}</span>
          <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{o.mode}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{o.duration}</span>
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />Posted {o.postedDate}</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {o.skills.slice(0, 4).map((s) => (
            <Badge key={s} variant="outline">{s}</Badge>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">{o.stipend}</p>
            <Badge variant="muted" className="mt-1">{o.type}</Badge>
          </div>
          <Button asChild size="sm">
            <Link to={`/student/opportunities/${o.id}`}>View Opportunity</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function SkillBadgeList({ skills = [], variant = "outline" }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {skills.map((s) => (
        <Badge key={s} variant={variant}>{s}</Badge>
      ))}
    </div>
  );
}

export function MatchExplanation({ match, matched = [], missing = [], total }) {
  return (
    <Card className="border-primary/20 bg-primary-soft/50">
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <MatchScore score={match} size="lg" />
          <div>
            <p className="font-semibold text-foreground">Why you're a good match</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              {matched.length}/{total} required skills matched — a transparent, explainable score.
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="mb-1.5 text-xs font-semibold text-success">Matched skills</p>
            <SkillBadgeList skills={matched} variant="success" />
          </div>
          <div>
            <p className="mb-1.5 text-xs font-semibold text-error">Missing skills</p>
            {missing.length === 0 ? (
              <p className="text-xs text-muted-foreground">None — full match!</p>
            ) : (
              <SkillBadgeList skills={missing} variant="error" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
