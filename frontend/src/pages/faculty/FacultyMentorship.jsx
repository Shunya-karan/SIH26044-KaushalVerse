import React, { useState } from 'react';
import { Users, CalendarClock, CheckCircle2, StickyNote, Plus } from 'lucide-react';
import { PageHeader } from '@/components/common/States';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FACULTY_MENTORSHIP_SESSIONS, FACULTY_STUDENTS } from '@/data/sihDemoData';
import { toast } from 'sonner';

export default function FacultyMentorship() {
  const [sessions, setSessions] = useState(FACULTY_MENTORSHIP_SESSIONS);
  const [draftNote, setDraftNote] = useState({});

  const upcoming = sessions.filter((s) => s.status === 'Scheduled');
  const completed = sessions.filter((s) => s.status === 'Completed');

  const markComplete = (id) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: 'Completed', notes: draftNote[id] || s.notes || 'Session completed — no notes added.' }
          : s
      )
    );
    toast.success('Session marked as completed');
  };

  const scheduleFollowUp = (studentName) => {
    const newSession = {
      id: `ms-${Date.now()}`,
      student: studentName,
      topic: 'Follow-up mentoring session',
      scheduled: 'To be confirmed',
      status: 'Scheduled',
      notes: '',
    };
    setSessions((prev) => [newSession, ...prev]);
    toast.success(`Follow-up scheduled with ${studentName}`);
  };

  return (
    <div>
      <PageHeader
        title="Mentorship"
        description="Track mentoring sessions, log notes and schedule follow-ups with your mentees."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <Users className="h-5 w-5 text-primary" />
            <p className="mt-3 text-xs text-muted-foreground">Active mentees</p>
            <p className="text-2xl font-bold">{FACULTY_STUDENTS.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <CalendarClock className="h-5 w-5 text-accent" />
            <p className="mt-3 text-xs text-muted-foreground">Upcoming sessions</p>
            <p className="text-2xl font-bold">{upcoming.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <CheckCircle2 className="h-5 w-5 text-secondary" />
            <p className="mt-3 text-xs text-muted-foreground">Completed this month</p>
            <p className="text-2xl font-bold">{completed.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Upcoming Sessions</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {upcoming.length === 0 && <p className="text-sm text-muted-foreground">No sessions scheduled.</p>}
            {upcoming.map((s) => (
              <div key={s.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{s.student}</p>
                  <Badge variant="outline">{s.scheduled}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{s.topic}</p>
                <Textarea
                  className="mt-3"
                  placeholder="Add a note for this session..."
                  rows={2}
                  value={draftNote[s.id] || ''}
                  onChange={(e) => setDraftNote({ ...draftNote, [s.id]: e.target.value })}
                />
                <Button size="sm" className="mt-2" onClick={() => markComplete(s.id)}>
                  <CheckCircle2 className="h-3.5 w-3.5" /> Mark Completed
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Session History</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {completed.map((s) => (
              <div key={s.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{s.student}</p>
                  <Badge variant="success">Completed</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{s.topic}</p>
                {s.notes && (
                  <p className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
                    <StickyNote className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {s.notes}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle>Schedule a Follow-up</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {FACULTY_STUDENTS.map((s) => (
            <Button key={s.name} variant="outline" size="sm" onClick={() => scheduleFollowUp(s.name)}>
              <Plus className="h-3.5 w-3.5" /> {s.name}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
