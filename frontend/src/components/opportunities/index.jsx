import { Link } from 'react-router-dom';
import { MapPin, Clock, Briefcase, ArrowRight } from 'lucide-react';
import { Badge, Card } from '@/components/ui';
import { MatchScore } from '@/components/dashboard';

export function SkillBadge({ skill, variant = 'default' }) {
  const variants = {
    default: 'bg-slate-100 text-slate-700',
    matched: 'bg-green-100 text-success',
    missing: 'bg-red-100 text-error',
    preferred: 'bg-orange-100 text-accent',
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${variants[variant]}`}>
      {variant === 'matched' && <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
      {variant === 'missing' && <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>}
      {skill}
    </span>
  );
}

export function OpportunityCard({ opportunity }) {
  const typeBadge = {
    Internship: <Badge variant="primary">Internship</Badge>,
    Job: <Badge variant="secondary">Full-time</Badge>,
    Project: <Badge variant="accent">Project</Badge>,
  };
  return (
    <Card className="p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-primary-soft text-primary flex items-center justify-center font-bold text-lg shrink-0">
          {opportunity.companyName.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-semibold text-main truncate">{opportunity.title}</h3>
              <p className="text-sm text-text-secondary mt-0.5">{opportunity.companyName}</p>
            </div>
            {opportunity.matchScore && <MatchScore score={opportunity.matchScore} size="sm" />}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-text-secondary">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{opportunity.location}</span>
            <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{opportunity.workMode}</span>
            {opportunity.duration && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{opportunity.duration}</span>}
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {opportunity.requiredSkills.slice(0, 4).map(s => <SkillBadge key={s} skill={s} />)}
            {opportunity.requiredSkills.length > 4 && <SkillBadge skill={`+${opportunity.requiredSkills.length - 4} more`} />}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {typeBadge[opportunity.type]}
              <span className="text-sm font-semibold text-main">
                {opportunity.stipend || opportunity.salary || '—'}
              </span>
            </div>
            <Link
              to={`/student/opportunities/${opportunity.id}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
            >
              View <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function MatchExplanation({ matchScore, matchedSkills, missingSkills, totalRequired }) {
  return (
    <div className="rounded-xl border border-border bg-primary-soft/50 p-5">
      <h4 className="font-semibold text-main flex items-center gap-2">
        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        Why you're a good match
      </h4>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-primary">{matchScore}%</p>
          <p className="text-xs text-text-secondary mt-1">Overall Match</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-success">{matchedSkills.length}/{totalRequired}</p>
          <p className="text-xs text-text-secondary mt-1">Skills Matched</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-error">{missingSkills.length}</p>
          <p className="text-xs text-text-secondary mt-1">Skills Missing</p>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <div>
          <p className="text-xs font-medium text-success mb-1.5">Matched Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {matchedSkills.map(s => <SkillBadge key={s} skill={s} variant="matched" />)}
          </div>
        </div>
        {missingSkills.length > 0 && (
          <div>
            <p className="text-xs font-medium text-error mb-1.5">Missing Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {missingSkills.map(s => <SkillBadge key={s} skill={s} variant="missing" />)}
            </div>
          </div>
        )}
      </div>
      <p className="mt-4 text-xs text-text-secondary">
        Your score is {matchScore}% because you match {matchedSkills.length} of {totalRequired} required skills for this role.
        {missingSkills.length > 0 && ` Consider learning: ${missingSkills.join(', ')}.`}
      </p>
    </div>
  );
}

export function OpportunityFilters({ filters, onChange }) {
  const locations = ['All Locations', 'Bengaluru, Karnataka', 'Hyderabad, Telangana', 'Pune, Maharashtra', 'Mumbai, Maharashtra', 'Gurugram, Haryana', 'Remote', 'New Delhi, Delhi'];
  const workModes = ['All Modes', 'Remote', 'Hybrid', 'On-site'];
  const industries = ['All Industries', 'IT Services', 'Data & AI', 'Cloud Infrastructure', 'Product & Design', 'Cybersecurity', 'FinTech'];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <select className="input" value={filters.location} onChange={e => onChange({ ...filters, location: e.target.value })}>
        {locations.map(l => <option key={l}>{l}</option>)}
      </select>
      <select className="input" value={filters.workMode} onChange={e => onChange({ ...filters, workMode: e.target.value })}>
        {workModes.map(m => <option key={m}>{m}</option>)}
      </select>
      <select className="input" value={filters.industry} onChange={e => onChange({ ...filters, industry: e.target.value })}>
        {industries.map(i => <option key={i}>{i}</option>)}
      </select>
      <select className="input" value={filters.type} onChange={e => onChange({ ...filters, type: e.target.value })}>
        <option>All Types</option>
        <option>Internship</option>
        <option>Job</option>
        <option>Project</option>
      </select>
    </div>
  );
}
