import { Route, CheckCircle2, Clock, Circle, BookOpen, Zap } from 'lucide-react';
import { PageHeader } from '@/components/common/Shared';
import { Card, Badge, Progress } from '@/components/ui';
import { learningRoadmap } from '@/data/mockAnalytics';

export default function LearningRoadmap() {
  const statusConfig = {
    'Completed': { icon: CheckCircle2, color: 'text-success', bg: 'bg-green-100', badge: 'success' },
    'In Progress': { icon: Clock, color: 'text-violet', bg: 'bg-violet-light', badge: 'violet' },
    'Upcoming': { icon: Circle, color: 'text-text-muted', bg: 'bg-slate-100', badge: 'default' },
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Learning Roadmap" subtitle="Personalized recommendation preview — your path to becoming a Full Stack Developer" icon={Route} />

      <Card className="p-5 bg-violet-light/30 border-violet/20">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-violet text-white flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-main">Goal: Become a Full Stack Developer</h3>
            <p className="text-sm text-text-secondary mt-1">Estimated total duration: 29 weeks · 5 phases · Personalized recommendation preview</p>
          </div>
        </div>
      </Card>

      <div className="relative">
        {learningRoadmap.map((phase, i) => {
          const config = statusConfig[phase.status];
          const StatusIcon = config.icon;
          return (
            <div key={phase.phase} className="relative flex gap-4 pb-6 last:pb-0">
              {i < learningRoadmap.length - 1 && (
                <div className="absolute left-5 top-12 bottom-0 w-px bg-border" />
              )}
              <div className={`w-10 h-10 rounded-full ${config.bg} flex items-center justify-center shrink-0 z-10`}>
                <StatusIcon className={`w-5 h-5 ${config.color}`} />
              </div>
              <Card className="p-5 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-violet">Phase {phase.phase}</p>
                    <h3 className="font-semibold text-main mt-0.5">{phase.title}</h3>
                  </div>
                  <Badge variant={config.badge}>{phase.status}</Badge>
                </div>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-text-secondary">
                  <span>Duration: {phase.duration}</span>
                  <span>·</span>
                  <span>Difficulty: {phase.difficulty}</span>
                </div>
                {phase.status !== 'Upcoming' && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-text-secondary">Progress</span>
                      <span className="font-medium text-main">{phase.progress}%</span>
                    </div>
                    <Progress value={phase.progress} color={phase.status === 'Completed' ? 'success' : 'violet'} />
                  </div>
                )}
                <div className="mt-4">
                  <p className="text-xs font-medium text-main mb-1.5">Skills Gained</p>
                  <div className="flex flex-wrap gap-1.5">
                    {phase.skillsGained.map(s => <Badge key={s} variant="violet">{s}</Badge>)}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-xs font-medium text-main mb-1.5 flex items-center gap-1"><BookOpen className="w-3 h-3" />Recommended Resources</p>
                  <ul className="space-y-1">
                    {phase.resources.map(r => <li key={r} className="text-xs text-text-secondary">· {r}</li>)}
                  </ul>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
