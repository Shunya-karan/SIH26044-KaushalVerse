import React from "react";
import { Loader2, Inbox, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageHeader({ title, description, action, breadcrumb }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {breadcrumb && <div className="mb-1 text-xs font-medium text-muted-foreground">{breadcrumb}</div>}
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground max-w-2xl">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function LoadingState({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function EmptyState({ icon: Icon = Inbox, title = "Nothing here yet", description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-muted/40 py-16 px-6 text-center">
      <div className="rounded-full bg-white p-3 shadow-sm">
        <Icon className="h-6 w-6 text-subtle" />
      </div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {description && <p className="max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action}
    </div>
  );
}

export function ErrorState({ title = "Something went wrong", description = "Please try again.", action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-red-100 bg-red-50/50 py-16 px-6 text-center">
      <div className="rounded-full bg-white p-3 shadow-sm">
        <AlertTriangle className="h-6 w-6 text-error" />
      </div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      {action}
    </div>
  );
}

export function SectionLabel({ children, className }) {
  return (
    <span className={cn("inline-flex items-center rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary", className)}>
      {children}
    </span>
  );
}
