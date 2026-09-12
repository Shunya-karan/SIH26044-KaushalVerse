import React from "react";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STATUS_VARIANT = {
  Applied: "info",
  "Under Review": "warning",
  Shortlisted: "violet",
  Interview: "accent",
  Selected: "success",
  Rejected: "error",
};

export function StatusBadge({ status }) {
  return <Badge variant={STATUS_VARIANT[status] || "muted"}>{status}</Badge>;
}

export function ApplicationTimeline({ stages, currentStatus }) {
  const currentIndex = stages.indexOf(currentStatus);
  const isRejected = currentStatus === "Rejected";
  return (
    <div className="flex items-center">
      {stages.map((stage, i) => {
        const done = !isRejected && i <= currentIndex;
        const isLast = i === stages.length - 1;
        return (
          <React.Fragment key={stage}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-semibold",
                  done ? "border-primary bg-primary text-white" : "border-border bg-white text-subtle"
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span className={cn("text-[11px] font-medium text-center max-w-[70px]", done ? "text-foreground" : "text-subtle")}>
                {stage}
              </span>
            </div>
            {!isLast && (
              <div className={cn("h-0.5 flex-1 mx-1 mb-4", done && i < currentIndex ? "bg-primary" : "bg-border")} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
