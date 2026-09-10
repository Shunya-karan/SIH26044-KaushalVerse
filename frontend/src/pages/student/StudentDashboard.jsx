import { Link } from 'react-router-dom';
import {
  TrendingUp, Target, Award, Briefcase, ArrowRight, FileText, Route,
  Calendar, CheckCircle2, Clock, BarChart3,
} from 'lucide-react';
import { StatCard, ProgressCard, ActivityCard, MatchScore } from '@/components/dashboard';
import { OpportunityCard } from '@/components/opportunities';
import { Badge, Card } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import { mockOpportunities } from '@/data/mockOpportunities';
import { mockApplications } from '@/data/mockApplications';
import { learningRoadmap, industryDemandSnapshot } from '@/data/mockAnalytics';

export default function StudentDashboard() {
  const { user } = useAuth();
  const recommendedOpps = mockOpportunities.slice(0, 3);
  const myApps = mockApplications.filter(a => a.studentId === 's1');
  const currentRoadmap = learningRoadmap.find(p => p.status === 'In Progress');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-main">Welcome back, {user?.name?.split(' ')[0] || 'Student'}!</h1>
        <p className="mt-1 text-sm text-text-secondary">Here's your career progress overview for today.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Profile Completion" value={user?.profileCompletion || 85} suffix="%" icon={Target} color="primary" trend="+5%" />
        <StatCard label="Placement Readiness" value={user?.placementReadiness || 78} suffix="%" icon={Award} color="secondary" trend="+8%" />
        <StatCard label="Current Skill Score" value={user?.skillScore || 82} suffix="%" icon={TrendingUp} color="accent" trend="+12%" />
        <StatCard label="Active Applications" value={myApps.length} icon={FileText} color="info" trend="+2" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-main">Recommended Opportunities</h3>
              <Link to="/student/opportunities" className="text-sm font-medium text-primary hover:underline">View all</Link>
            </div>
            <div className="space-y-3">
              {recommendedOpps.map(opp => <OpportunityCard key={opp.id} opportunity={opp} />)}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold text-main mb-4">Recent Applications</h3>
            <div className="space-y-1 divide-y divide-border">
              {myApps.map(app => (
                <ActivityCard
                  key={app.id}
                  icon={Briefcase}
                  title={app.role}
                  description={app.company}
                  date={app.appliedDate}
                  status={app.status}
                  statusVariant={
                    app.status === 'Selected' ? 'success' :
                    app.status === 'Rejected' ? 'error' :
                    app.status === 'Interview' ? 'info' :
                    app.status === 'Shortlisted' ? 'primary' : 'warning'
                  }
                />
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <ProgressCard title="Skill Gap" value={22} subtitle="22% gap to Full Stack Developer" color="accent" icon={Target} />
          <ProgressCard title="Placement Readiness" value={78} subtitle="On track for placement" color="secondary" icon={Award} />

          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Route className="w-4 h-4 text-violet" />
              <h3 className="font-semibold text-main text-sm">Current Learning Phase</h3>
            </div>
            {currentRoadmap && (
              <div>
                <p className="font-medium text-main text-sm">Phase {currentRoadmap.phase}: {currentRoadmap.title}</p>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-text-secondary">{currentRoadmap.progress}% complete</span>
                  <span className="text-text-muted">{currentRoadmap.duration}</span>
                </div>
                <div className="mt-1.5 w-full rounded-full bg-slate-200 h-2">
                  <div className="h-full rounded-full bg-violet" style={{ width: `${currentRoadmap.progress}%` }} />
                </div>
                <Link to="/student/roadmap" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-violet hover:gap-2 transition-all">
                  View full roadmap <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            )}
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-main text-sm">Industry Demand Snapshot</h3>
            </div>
            <div className="space-y-2.5">
              {industryDemandSnapshot.slice(0, 4).map(role => (
                <div key={role.role} className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">{role.role}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-main">{role.openings} openings</span>
                    <Badge variant={role.demand === 'Very High' ? 'success' : role.demand === 'High' ? 'primary' : 'warning'}>
                      {role.demand}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
