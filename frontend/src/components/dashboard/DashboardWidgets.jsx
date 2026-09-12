import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function StatCard({ icon: Icon, label, value, change, changeType = "up", accent = "primary", index = 0 }) {
  const accentMap = {
    primary: "bg-primary-soft text-primary",
    secondary: "bg-secondary-light text-secondary",
    accent: "bg-accent-light text-accent",
    violet: "bg-roadmap-light text-roadmap",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className={cn("rounded-lg p-2.5", accentMap[accent])}>
              <Icon className="h-5 w-5" />
            </div>
            {change && (
              <span className={cn("flex items-center gap-0.5 text-xs font-semibold", changeType === "up" ? "text-success" : "text-error")}>
                {changeType === "up" ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                {change}
              </span>
            )}
          </div>
          <p className="mt-3 text-2xl font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function MatchScore({ score, size = "md" }) {
  const color = score >= 80 ? "text-success" : score >= 55 ? "text-warning" : "text-error";
  const ring = score >= 80 ? "stroke-success" : score >= 55 ? "stroke-warning" : "stroke-error";
  const dim = size === "sm" ? 44 : size === "lg" ? 72 : 56;
  const stroke = size === "sm" ? 4 : 5;
  const r = (dim - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: dim, height: dim }}>
      <svg width={dim} height={dim} className="-rotate-90">
        <circle cx={dim / 2} cy={dim / 2} r={r} strokeWidth={stroke} className="stroke-muted" fill="none" />
        <circle
          cx={dim / 2} cy={dim / 2} r={r} strokeWidth={stroke}
          className={cn(ring, "transition-all duration-700")}
          fill="none" strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
        />
      </svg>
      <span className={cn("absolute font-bold", color, size === "sm" ? "text-xs" : size === "lg" ? "text-lg" : "text-sm")}>
        {score}%
      </span>
    </div>
  );
}

export function ProgressCard({ title, value, subtitle, colorClass = "bg-primary" }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <span className="text-sm font-bold text-foreground">{value}%</span>
        </div>
        <Progress value={value} indicatorClassName={colorClass} />
        {subtitle && <p className="mt-2 text-xs text-muted-foreground">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}

export function ActivityCard({ items = [] }) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className={cn("h-2.5 w-2.5 rounded-full", item.dotClass || "bg-primary")} />
            {i !== items.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
          </div>
          <div className="pb-4">
            <p className="text-sm font-medium text-foreground">{item.title}</p>
            <p className="text-xs text-muted-foreground">{item.description}</p>
            <p className="mt-0.5 text-xs text-subtle">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
