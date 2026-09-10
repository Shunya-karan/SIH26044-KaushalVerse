import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const PageHeader = ({ title, subtitle, breadcrumbs = [], actions = null, badge = null }) => {
  return (
    <div className="mb-6">
      {breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 text-xs text-subtext mb-2" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {crumb.link ? (
                <Link to={crumb.link} className="hover:text-primary transition-colors font-medium">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-main font-semibold">{crumb.label}</span>
              )}
              {idx < breadcrumbs.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-muted" />}
            </React.Fragment>
          ))}
        </nav>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-main tracking-tight">{title}</h1>
            {badge && <span>{badge}</span>}
          </div>
          {subtitle && <p className="text-sm text-subtext mt-1 max-w-2xl">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2.5 shrink-0">{actions}</div>}
      </div>
    </div>
  );
};
