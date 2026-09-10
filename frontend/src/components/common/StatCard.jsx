import React from 'react';
import { cn } from '../../lib/utils';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive = true,
  color = 'primary',
  className = '',
}) => {
  const colorStyles = {
    primary: 'bg-primary-soft text-primary border-primary-light',
    secondary: 'bg-emerald-50 text-secondary border-emerald-200',
    accent: 'bg-orange-50 text-accent border-orange-200',
    roadmap: 'bg-purple-50 text-roadmap border-purple-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <div className={cn('bg-surface p-5 rounded-xl border border-border shadow-subtle hover:shadow-card transition-shadow', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-subtext">{title}</span>
        {Icon && (
          <div className={cn('p-2 rounded-lg border', colorStyles[color] || colorStyles.primary)}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-main">{value}</span>
        {trend && (
          <span className={cn('inline-flex items-center text-xs font-semibold', trendPositive ? 'text-success' : 'text-error')}>
            {trendPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            {trend}
          </span>
        )}
      </div>

      {subtitle && <p className="mt-1 text-xs text-subtext">{subtitle}</p>}
    </div>
  );
};
