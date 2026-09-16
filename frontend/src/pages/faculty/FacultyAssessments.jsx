import React, { useMemo, useState } from 'react';
import { ClipboardCheck, RotateCcw, CheckCircle2, TrendingUp } from 'lucide-react';
import { PageHeader } from '@/components/common/States';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { FACULTY_ASSESSMENT_ACTIVITY, ASSESSMENT_SKILLS } from '@/data/sihDemoData';
import { toast } from 'sonner';

export default function FacultyAssessments() {
  const [skillFilter, setSkillFilter] = useState('all');

  const filtered = useMemo(
    () => FACULTY_ASSESSMENT_ACTIVITY.filter((a) => skillFilter === 'all' || a.skill === skillFilter),
    [skillFilter]
  );

  const totalAttempts = FACULTY_ASSESSMENT_ACTIVITY.length;
  const passed = FACULTY_ASSESSMENT_ACTIVITY.filter((a) => a.status === 'Passed').length;
  const avgScore = Math.round(
    FACULTY_ASSESSMENT_ACTIVITY.reduce((sum, a) => sum + a.score, 0) / totalAttempts
  );
  const needsRetake = FACULTY_ASSESSMENT_ACTIVITY.filter((a) => a.status === 'Needs retake');

  return (
    <div>
      <PageHeader
        title="Assessments"
        description="Track skill-assessment attempts across your students and flag who needs a retake."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <ClipboardCheck className="h-5 w-5 text-primary" />
            <p className="mt-3 text-xs text-muted-foreground">Total attempts</p>
            <p className="text-2xl font-bold">{totalAttempts}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <TrendingUp className="h-5 w-5 text-secondary" />
            <p className="mt-3 text-xs text-muted-foreground">Average score</p>
            <p className="text-2xl font-bold">{avgScore}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <CheckCircle2 className="h-5 w-5 text-accent" />
            <p className="mt-3 text-xs text-muted-foreground">Pass rate</p>
            <p className="text-2xl font-bold">{Math.round((passed / totalAttempts) * 100)}%</p>
          </CardContent>
        </Card>
      </div>

      {needsRetake.length > 0 && (
        <Card className="mt-6 border-warning/30 bg-orange-50/40">
          <CardContent className="p-5">
            <p className="flex items-center gap-2 font-medium text-foreground">
              <RotateCcw className="h-4 w-4 text-warning" /> {needsRetake.length} student
              {needsRetake.length !== 1 ? 's' : ''} scored below the passing threshold
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {needsRetake.map((a) => `${a.student} (${a.skill}: ${a.score}%)`).join(' · ')}
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Assessment Activity</CardTitle>
          <Select value={skillFilter} onValueChange={setSkillFilter}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Skills</SelectItem>
              {ASSESSMENT_SKILLS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Student</th>
                  <th className="px-5 py-3 font-medium">Skill</th>
                  <th className="px-5 py-3 font-medium">Difficulty</th>
                  <th className="px-5 py-3 font-medium">Score</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((a) => (
                  <tr key={a.id}>
                    <td className="px-5 py-3.5 font-medium whitespace-nowrap">{a.student}</td>
                    <td className="px-5 py-3.5 whitespace-nowrap">{a.skill}</td>
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{a.difficulty}</td>
                    <td className="px-5 py-3.5 whitespace-nowrap">{a.score}%</td>
                    <td className="px-5 py-3.5">
                      <Badge variant={a.status === 'Passed' ? 'success' : 'warning'}>{a.status}</Badge>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap">{a.date}</td>
                    <td className="px-5 py-3.5 text-right">
                      {a.status === 'Needs retake' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toast.success(`Retake assigned to ${a.student} for ${a.skill}`)}
                        >
                          <RotateCcw className="h-3.5 w-3.5" /> Assign Retake
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
