import React from "react";
import { BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const PROFICIENCY_COLOR = {
  Beginner: "warning",
  Intermediate: "info",
  Advanced: "success",
};

export function SkillBadge({ name, className, variant = "default" }) {
  return (
    <Badge variant={variant} className={cn("px-3 py-1", className)}>
      {name}
    </Badge>
  );
}

export function SkillProgress({ skill, onRemove, onEdit }) {
  const proficiencyValue = { Beginner: 33, Intermediate: 66, Advanced: 100 }[skill.proficiency] || 40;
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-foreground">{skill.name}</p>
            {skill.verified && <BadgeCheck className="h-4 w-4 text-secondary" aria-label="Verified skill" />}
          </div>
          <Badge variant={PROFICIENCY_COLOR[skill.proficiency] || "muted"}>{skill.proficiency}</Badge>
        </div>
        <Progress value={proficiencyValue} className="mt-3" />
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>{skill.years} yr{skill.years !== 1 ? "s" : ""} experience</span>
          <div className="flex gap-3">
            {onEdit && (
              <button onClick={() => onEdit(skill)} className="font-medium text-primary hover:underline">
                Edit
              </button>
            )}
            {onRemove && (
              <button onClick={() => onRemove(skill.id)} className="font-medium text-error hover:underline">
                Remove
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SkillGapCard({ label, matched = [], missing = [] }) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="mb-3 text-sm font-semibold text-foreground">{label}</p>
        <div className="mb-3">
          <p className="mb-1.5 text-xs font-medium text-success">Matched ({matched.length})</p>
          <div className="flex flex-wrap gap-1.5">
            {matched.map((s) => (
              <SkillBadge key={s} name={s} variant="success" />
            ))}
          </div>
        </div>
        <div>
          <p className="mb-1.5 text-xs font-medium text-error">Missing ({missing.length})</p>
          <div className="flex flex-wrap gap-1.5">
            {missing.length === 0 && <span className="text-xs text-muted-foreground">No gaps — great fit!</span>}
            {missing.map((s) => (
              <SkillBadge key={s} name={s} variant="error" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
