import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Logo } from '../components/common/Logo';
import { GovernmentBanner } from '../components/common/GovernmentBanner';
import { DemoRoleSwitcher } from '../components/common/DemoRoleSwitcher';
import { Button } from '../components/ui';
import { Menu, X, ArrowRight, ExternalLink, ShieldCheck, HeartPulse } from 'lucide-react';

export const PublicLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About & Context', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Subtle Institutional / Government Banner */}
      <GovernmentBanner />

      {/* Main Public Navbar */}
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-border shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo showTagline={false} />
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'text-primary bg-primary-soft font-semibold'
                        : 'text-subtext hover:text-main hover:bg-slate-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            {/* Demo Evaluator Switcher */}
            <DemoRoleSwitcher />

            <Link to="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>

            <Link to="/student/dashboard">
              <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
                Explore Portal
              </Button>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <DemoRoleSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-subtext hover:text-main hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-b border-border bg-surface px-4 pt-2 pb-4 space-y-2 shadow-lg">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  location.pathname === item.path ? 'bg-primary-soft text-primary font-semibold' : 'text-subtext hover:bg-slate-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-border flex flex-col gap-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/student/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="sm" className="w-full">
                  Launch Demo Dashboard
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Page Body */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Comprehensive Footer with SIH Context */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4">
                    <circle cx="6" cy="6" r="2.5" fill="currentColor" fillOpacity="0.2"/>
                    <circle cx="18" cy="6" r="2.5" fill="currentColor" fillOpacity="0.2"/>
                    <circle cx="12" cy="18" r="3" fill="currentColor"/>
                    <path d="M7.8 7.8L10.5 15.5 M16.2 7.8L13.5 15.5 M8.5 6h7"/>
                  </svg>
                </div>
                <span className="text-xl font-bold text-white tracking-tight">
                  Kaushal<span className="text-primary-light">Verse</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                A digital Academia–Industry Collaboration Platform designed for the Smart India Hackathon.
                Bridging academic curricula with real-time industry skill demands, internships, and transparent placement matching.
              </p>
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs text-slate-300 space-y-1">
                <div className="flex items-center gap-1.5 text-primary-light font-semibold">
                  <HeartPulse className="w-3.5 h-3.5 text-secondary" />
                  Ministry & Initiative Alignment
                </div>
                <p className="text-[11px] text-slate-400">
                  Associated problem domain: Ministry of Health & Family Welfare &bull; Ayushman Bharat Digital Mission workforce readiness.
                </p>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Platform</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link to="/how-it-works" className="hover:text-primary-light transition-colors">How It Works</Link></li>
                <li><Link to="/student/skills" className="hover:text-primary-light transition-colors">Skill Mapping Engine</Link></li>
                <li><Link to="/student/skill-gap" className="hover:text-primary-light transition-colors">Skill Gap Analyzer</Link></li>
                <li><Link to="/student/roadmap" className="hover:text-primary-light transition-colors">Learning Roadmaps</Link></li>
                <li><Link to="/student/opportunities" className="hover:text-primary-light transition-colors">Opportunity Discovery</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Stakeholders</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link to="/student/dashboard" className="hover:text-primary-light transition-colors">Student Portal</Link></li>
                <li><Link to="/company/dashboard" className="hover:text-primary-light transition-colors">Industry / Recruiter Portal</Link></li>
                <li><Link to="/admin/dashboard" className="hover:text-primary-light transition-colors">Institutional Admin</Link></li>
                <li><Link to="/admin/placement-analytics" className="hover:text-primary-light transition-colors">Placement Analytics</Link></li>
                <li><Link to="/about" className="hover:text-primary-light transition-colors">Institutional Context</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Legal & Notice</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link to="/privacy" className="hover:text-primary-light transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-primary-light transition-colors">Terms of Use</Link></li>
                <li><Link to="/contact" className="hover:text-primary-light transition-colors">Support & Helpdesk</Link></li>
                <li className="pt-2 text-[11px] text-slate-500">
                  Shri Jagat Prakash Nadda, Hon'ble Union Minister (H&FW)<br/>
                  Ms. Punya Salila Srivastava, Secretary (H&FW)
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} KaushalVerse. Developed as a Smart India Hackathon Prototype (Conceptual Demonstration).
            </p>
            <p className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              Transparent, explainable talent matching architecture.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
