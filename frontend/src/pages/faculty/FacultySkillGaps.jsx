import React from 'react';
import { Target, AlertTriangle, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/common/States';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FACULTY_STUDENTS, INDUSTRY_DEMAND } from '@/data/sihDemoData';
import { toast } from 'sonner';

// Cross-reference each student's flagged gap skill against platform-wide
// industry demand to show severity — this is the "who needs what, and how
// urgently" view, distinct from Analytics' demand-vs-supply chart.
function severityFor(gapSkill) {
  const demand = INDUSTRY_DEMAND.find((d) => d.skill === gapSkill);
  if (!demand) return { level: 'Medium', demandScore: 60 };
  if (demand.demandScore >= 85) return { level: 'Critical', demandScore: demand.demandScore };
  if (demand.demandScore >= 70) return { level: 'High', demandScore: demand.demandScore };
  return { level: 'Medium', demandScore: demand.demandScore };
}

const SEVERITY_VARIANT = { Critical: 'error', High: 'warning', Medium: 'info' };

export default function FacultySkillGaps() {
  const gapsBoard = FACULTY_STUDENTS.map((s) => ({ ...s, severity: severityFor(s.gap) }));
  const criticalCount = gapsBoard.filter((g) => g.severity.level === 'Critical').length;

  return (
    <div>
      <PageHeader
        title="Skill Gaps"
        description="See each student's highest-priority skill gap, ranked by industry demand severity."
      />

      {criticalCount > 0 && (
        <Card className="mb-6 border-error/30 bg-red-50/40">
          <CardContent className="p-5 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-error shrink-0" />
            <p className="text-sm text-foreground">
              {criticalCount} student{criticalCount !== 1 ? 's have' : ' has'} a critical-severity gap in a
              high-demand skill — prioritize mentoring here first.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {gapsBoard.map((g) => (
          <Card key={g.name}>
            <CardContent className="p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary-soft p-2.5 text-primary shrink-0">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{g.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Critical gap: <span className="font-medium text-foreground">{g.gap}</span> · Readiness {g.readiness}%
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant={SEVERITY_VARIANT[g.severity.level]}>{g.severity.level} priority</Badge>
                      <span className="text-xs text-muted-foreground">
                        Industry demand for {g.gap}: {g.severity.demandScore}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-56">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Readiness</span>
                    <span className="font-medium">{g.readiness}%</span>
                  </div>
                  <Progress value={g.readiness} />
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-3 w-full"
                    onClick={() => toast.success(`${g.gap} learning path assigned to ${g.name}`)}
                  >
                    Assign Learning Path <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
