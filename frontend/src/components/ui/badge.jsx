import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary-soft text-primary",
        secondary: "border-transparent bg-secondary-light text-secondary",
        accent: "border-transparent bg-accent-light text-accent",
        outline: "border-border text-foreground bg-white",
        success: "border-transparent bg-green-50 text-success",
        warning: "border-transparent bg-orange-50 text-warning",
        error: "border-transparent bg-red-50 text-error",
        info: "border-transparent bg-sky-50 text-info",
        violet: "border-transparent bg-roadmap-light text-roadmap",
        muted: "border-transparent bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
