import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button, Badge } from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { learningRoadmapTemplates } from '../../data/mockSkills';
import { Compass, CheckCircle2, Clock, BookOpen, ExternalLink, Sparkles, Award } from 'lucide-react';

export const LearningRoadmap = () => {
  const { currentTargetRole } = useApp();
  const phases = learningRoadmapTemplates['role-fullstack'];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Personalized Learning Roadmap"
        subtitle="Step-by-step modular progression tailored to bridge your specific skill gaps for your target career."
        breadcrumbs={[{ label: 'Dashboard', link: '/student/dashboard' }, { label: 'Roadmap' }]}
        badge={
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-roadmap border border-purple-200">
            <Sparkles className="w-3.5 h-3.5" />
            Recommendation Preview (SIH Prototype)
          </span>
        }
      />

      {/* Pathway Overview Header */}
      <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-roadmap">Goal Orientation</span>
          <h2 className="text-2xl font-bold text-main mt-1">{currentTargetRole.title} Pathway</h2>
          <p className="text-xs text-subtext mt-1 max-w-xl">
            5 structured phases bridging client interfaces, database optimization, and cloud containerization with accredited, free study modules.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 text-center shrink-0">
          <p className="text-xs text-subtext font-semibold">Total Progress</p>
          <p className="text-3xl font-extrabold text-roadmap mt-0.5">53%</p>
          <span className="text-[10px] text-purple-800 font-medium">Phase 3 in progress</span>
        </div>
      </div>

      {/* Phased Roadmap Timeline */}
      <div className="space-y-6">
        {phases.map((item, idx) => {
          const isCompleted = item.status === 'Completed';
          const isInProgress = item.status === 'In Progress';

          return (
            <div
              key={idx}
              className={`bg-surface rounded-2xl border p-6 shadow-subtle transition-all ${
                isInProgress
                  ? 'border-roadmap shadow-card ring-2 ring-roadmap/10'
                  : isCompleted
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : 'border-border'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-4">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center ${
                    isCompleted
                      ? 'bg-emerald-100 text-secondary'
                      : isInProgress
                      ? 'bg-roadmap text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : `P${item.phase}`}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-main">{item.title}</h3>
                    <p className="text-xs text-subtext flex items-center gap-3 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {item.duration}
                      </span>
                      <span>&bull;</span>
                      <span>Difficulty: <strong>{item.difficulty}</strong></span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={isCompleted ? 'success' : isInProgress ? 'roadmap' : 'default'}>
                    {item.status}
                  </Badge>
                </div>
              </div>

              {/* Skills gained in this phase */}
              <div className="pt-4 space-y-3">
                <div>
                  <span className="text-xs font-semibold text-subtext">Competencies Acquired / Target:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {item.skillsGained.map((sk) => (
                      <span
                        key={sk}
                        className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                          isCompleted
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : isInProgress
                            ? 'bg-purple-50 text-purple-800 border-purple-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Resources */}
                <div>
                  <span className="text-xs font-semibold text-subtext">Curated Open Learning Resources:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1.5">
                    {item.resources.map((res, rIdx) => (
                      <div key={rIdx} className="p-2.5 rounded-xl bg-slate-50 border border-border flex items-center justify-between text-xs">
                        <div>
                          <p className="font-semibold text-main">{res.title}</p>
                          <span className="text-[10px] text-primary font-medium">{res.type}</span>
                        </div>
                        <span className="text-[10px] font-bold text-secondary bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          FREE
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
