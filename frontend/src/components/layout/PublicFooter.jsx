import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/common/Logo";

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container-page py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Bridging Skills. Connecting Academia & Industry. A Smart India Hackathon prototype.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Platform</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/how-it-works" className="hover:text-primary">How It Works</Link></li>
              <li><Link to="/#features" className="hover:text-primary">Features</Link></li>
              <li><Link to="/register" className="hover:text-primary">Get Started</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Company</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary">About</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact / Support</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Legal</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary">Terms of Use</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>© 2026 KaushalVerse. Developed as a Smart India Hackathon prototype — conceptual demonstration only.</p>
        </div>
      </div>
    </footer>
  );
}
