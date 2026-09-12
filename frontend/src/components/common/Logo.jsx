import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function LogoMark({ className }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-8 w-8", className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="19" stroke="#0F766E" strokeWidth="1.5" opacity="0.15" />
      <circle cx="12" cy="12" r="3.2" fill="#0F766E" />
      <circle cx="28" cy="10" r="2.6" fill="#F97316" />
      <circle cx="29" cy="27" r="3.2" fill="#059669" />
      <circle cx="11" cy="27" r="2.6" fill="#7C3AED" />
      <circle cx="20" cy="19" r="3.6" fill="#0F766E" />
      <path d="M12 12L20 19M28 10L20 19M29 27L20 19M11 27L20 19" stroke="#0F766E" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

export function Logo({ className, showTagline = false, to = "/" }) {
  return (
    <Link to={to} className={cn("flex items-center gap-2 shrink-0", className)}>
      <LogoMark />
      <div className="flex flex-col leading-tight">
        <span className="text-lg font-extrabold tracking-tight text-foreground">
          Kaushal<span className="text-primary">Verse</span>
        </span>
        {showTagline && (
          <span className="text-[11px] text-muted-foreground -mt-0.5">Skills. Academia. Industry.</span>
        )}
      </div>
    </Link>
  );
}
