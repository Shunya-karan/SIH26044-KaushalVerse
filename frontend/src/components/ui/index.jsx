import React from 'react';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';

export const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  icon: Icon = null,
  iconPosition = 'left',
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover active:bg-primary-900 shadow-sm',
    secondary: 'bg-secondary text-white hover:bg-secondary-hover shadow-sm',
    accent: 'bg-accent text-white hover:bg-accent-hover shadow-sm',
    roadmap: 'bg-roadmap text-white hover:bg-roadmap-hover shadow-sm',
    outline: 'border border-border bg-surface text-main hover:bg-slate-50 hover:border-slate-300',
    ghost: 'text-subtext hover:text-main hover:bg-slate-100',
    danger: 'bg-error text-white hover:bg-red-700 shadow-sm',
    subtle: 'bg-primary-soft text-primary hover:bg-primary-light/50 border border-primary-light',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1.5" />
      ) : Icon && iconPosition === 'left' ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      {children}
      {Icon && iconPosition === 'right' && !loading && (
        <Icon className="w-4 h-4 shrink-0" />
      )}
    </button>
  );
});

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-800 border-slate-200',
    primary: 'bg-primary-soft text-primary border-primary-light',
    secondary: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    accent: 'bg-orange-50 text-orange-800 border-orange-200',
    roadmap: 'bg-purple-50 text-purple-800 border-purple-200',
    success: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    error: 'bg-red-50 text-red-700 border-red-200',
    info: 'bg-sky-50 text-sky-800 border-sky-200',
  };

  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border', variants[variant], className)}>
      {children}
    </span>
  );
};

export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
        
        <div className={cn('relative transform overflow-hidden rounded-2xl bg-surface text-left shadow-2xl transition-all sm:my-8 w-full border border-border', maxWidth)}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h3 className="text-base font-bold text-main">{title}</h3>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-subtext hover:bg-slate-100 hover:text-main transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};
