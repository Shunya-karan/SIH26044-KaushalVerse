import React from "react";
import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="rounded-full bg-primary-soft p-4"><Compass className="h-8 w-8 text-primary" /></div>
      <h1 className="mt-6 text-4xl font-extrabold text-foreground">404</h1>
      <p className="mt-2 text-muted-foreground">This page doesn't exist in the KaushalVerse prototype.</p>
      <Button asChild className="mt-6"><Link to="/">Back to Home</Link></Button>
    </div>
  );
}
