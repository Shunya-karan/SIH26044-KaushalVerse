import { TrendingUp, TrendingDown } from 'lucide-react';

export function StatCard({ label, value, icon: Icon, trend, suffix = '', color = 'primary' }) {
  const colors = {
    primary: 'bg-primary-soft text-primary',
    secondary: 'bg-secondary-light text-secondary',
    accent: 'bg-accent-light text-accent',
    violet: 'bg-violet-light text-violet',
    info: 'bg-sky-100 text-info',
    success: 'bg-green-100 text-success',
  };
  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary">{label}</p>
          <p className="mt-2 text-2xl font-bold text-main">
            {value}{suffix}
          </p>
        </div>
        {Icon && (
          <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${colors[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          {trend.startsWith('+') ? (
            <TrendingUp className="w-3.5 h-3.5 text-success" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 text-error" />
          )}
          <span className={trend.startsWith('+') ? 'text-success' : 'text-error'}>{trend}</span>
          <span className="text-text-muted">vs last month</span>
        </div>
      )}
    </div>
  );
}

export function SkillCard({ skill, onEdit, onRemove, showActions = false }) {
  const levelColors = {
    Beginner: 'bg-slate-100 text-slate-600',
    Intermediate: 'bg-primary-light text-primary',
    Advanced: 'bg-secondary-light text-secondary',
  };
  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-main">{skill.name}</h4>
            {skill.verified && (
              <span className="inline-flex items-center gap-0.5 text-xs text-success font-medium">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                Verified
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-text-secondary">{skill.category}</p>
        </div>
        {showActions && (
          <div className="flex gap-1">
            <button onClick={() => onEdit?.(skill)} className="rounded-md p-1.5 text-text-secondary hover:bg-bg hover:text-main">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </button>
            <button onClick={() => onRemove?.(skill)} className="rounded-md p-1.5 text-text-secondary hover:bg-red-50 hover:text-error">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        )}
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-text-secondary">Proficiency</span>
          <span className="font-medium text-main">{skill.proficiency}%</span>
        </div>
        <div className="w-full rounded-full bg-slate-200 h-2">
          <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${skill.proficiency}%` }} />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className={`badge ${levelColors[skill.level]}`}>{skill.level}</span>
        <span className="text-xs text-text-muted">{skill.years} {skill.years === 1 ? 'year' : 'years'} exp.</span>
      </div>
    </div>
  );
}

export function MatchScore({ score, size = 'md' }) {
  const sizes = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-16 h-16 text-lg',
    lg: 'w-24 h-24 text-2xl',
  };
  const color = score >= 85 ? 'text-success' : score >= 70 ? 'text-primary' : score >= 50 ? 'text-warning' : 'text-error';
  const ringColor = score >= 85 ? '#16A34A' : score >= 70 ? '#0F766E' : score >= 50 ? '#D97706' : '#DC2626';
  const circumference = 2 * Math.PI * 28;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`relative ${sizes[size]} flex items-center justify-center shrink-0`}>
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="28" fill="none" stroke="#E2E8F0" strokeWidth="5" />
        <circle
          cx="32" cy="32" r="28" fill="none" stroke={ringColor} strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <span className={`font-bold ${color}`}>{score}%</span>
    </div>
  );
}

export function ProgressCard({ title, value, max = 100, subtitle, color = 'primary', icon: Icon }) {
  const percentage = Math.round((value / max) * 100);
  const colors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    violet: 'bg-violet',
    success: 'bg-success',
  };
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <p className="mt-1 text-2xl font-bold text-main">{value}{max === 100 ? '%' : ''}</p>
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="w-full rounded-full bg-slate-200 h-2.5">
        <div className={`h-full rounded-full transition-all duration-500 ${colors[color]}`} style={{ width: `${percentage}%` }} />
      </div>
      {subtitle && <p className="mt-2 text-xs text-text-muted">{subtitle}</p>}
    </div>
  );
}

export function ActivityCard({ icon: Icon, title, description, date, status, statusVariant }) {
  const statusColors = {
    success: 'bg-green-100 text-success',
    warning: 'bg-orange-100 text-warning',
    info: 'bg-sky-100 text-info',
    error: 'bg-red-100 text-error',
    primary: 'bg-primary-light text-primary',
  };
  return (
    <div className="flex items-start gap-3 py-3">
      {Icon && (
        <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-text-secondary" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-main">{title}</p>
        <p className="text-xs text-text-secondary mt-0.5">{description}</p>
      </div>
      <div className="text-right shrink-0">
        {status && <span className={`badge ${statusColors[statusVariant] || statusColors.primary}`}>{status}</span>}
        <p className="text-xs text-text-muted mt-1">{date}</p>
      </div>
    </div>
  );
}
