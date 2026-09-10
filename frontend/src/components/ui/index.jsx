export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-slate-100 text-slate-700',
    primary: 'bg-primary-light text-primary',
    secondary: 'bg-secondary-light text-secondary',
    accent: 'bg-accent-light text-accent',
    violet: 'bg-violet-light text-violet',
    success: 'bg-green-100 text-success',
    warning: 'bg-orange-100 text-warning',
    error: 'bg-red-100 text-error',
    info: 'bg-sky-100 text-info',
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

export function Card({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border border-border bg-white ${onClick ? 'cursor-pointer transition-shadow hover:shadow-md' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export function Button({ children, variant = 'primary', size = 'md', className = '', onClick, type = 'button', disabled }) {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover',
    secondary: 'border border-border bg-white text-main hover:bg-bg',
    ghost: 'text-text-secondary hover:bg-bg hover:text-main',
    accent: 'bg-accent text-white hover:bg-orange-600',
    outline: 'border border-primary text-primary hover:bg-primary-soft',
  };
  const sizes = {
    sm: 'px-3.5 py-2 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

export function Input({ label, error, className = '', ...props }) {
  return (
    <div>
      {label && <label className="mb-1.5 block text-sm font-medium text-main">{label}</label>}
      <input
        className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-main placeholder:text-text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/10 ${error ? 'border-error focus:border-error' : 'border-border focus:border-primary'} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}

export function Select({ label, error, children, className = '', ...props }) {
  return (
    <div>
      {label && <label className="mb-1.5 block text-sm font-medium text-main">{label}</label>}
      <select
        className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-main transition-colors focus:outline-none focus:ring-2 focus:ring-primary/10 ${error ? 'border-error focus:border-error' : 'border-border focus:border-primary'} ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}

export function Textarea({ label, error, className = '', ...props }) {
  return (
    <div>
      {label && <label className="mb-1.5 block text-sm font-medium text-main">{label}</label>}
      <textarea
        className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-main placeholder:text-text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/10 ${error ? 'border-error focus:border-error' : 'border-border focus:border-primary'} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}

export function Progress({ value, className = '', color = 'primary' }) {
  const colors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    violet: 'bg-violet',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
  };
  return (
    <div className={`w-full rounded-full bg-slate-200 ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-500 ${colors[color]}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function Avatar({ name, size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-20 h-20 text-2xl',
  };
  const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';
  return (
    <div className={`${sizes[size]} rounded-full bg-primary-soft text-primary font-semibold flex items-center justify-center shrink-0 ${className}`}>
      {initials}
    </div>
  );
}

export function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex gap-1 border-b border-border overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id || tab}
          onClick={() => onChange(tab.id || tab)}
          className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
            (activeTab === (tab.id || tab))
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-main'
          }`}
        >
          {tab.label || tab}
          {tab.count !== undefined && (
            <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${(activeTab === (tab.id || tab)) ? 'bg-primary-light text-primary' : 'bg-slate-100 text-text-secondary'}`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export function Modal({ open, onClose, children, title, size = 'md' }) {
  if (!open) return null;
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${sizes[size]} max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl`}>
        {title && (
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h3 className="text-lg font-semibold text-main">{title}</h3>
            <button onClick={onClose} className="rounded-lg p-1.5 text-text-secondary hover:bg-bg hover:text-main">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
