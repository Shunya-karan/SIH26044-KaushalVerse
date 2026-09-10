import React from 'react';
import { FolderOpen } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = FolderOpen,
  title = 'No records found',
  description = 'There are no items to display at this moment.',
  action = null,
  className = '',
}) => {
  return (
    <div className={`p-8 text-center bg-surface border border-dashed border-border rounded-xl flex flex-col items-center justify-center ${className}`}>
      <div className="w-12 h-12 rounded-full bg-slate-100 text-subtext flex items-center justify-center mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-main">{title}</h3>
      <p className="text-xs text-subtext max-w-sm mt-1 mb-4">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};
