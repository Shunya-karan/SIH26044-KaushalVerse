import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../components/common/Logo';
import { DemoRoleSwitcher } from '../components/common/DemoRoleSwitcher';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui';
import {
  LayoutDashboard,
  Building,
  PlusCircle,
  Briefcase,
  Users,
  Sparkles,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  ArrowRight
} from 'lucide-react';

export const CompanyLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/company/dashboard', icon: LayoutDashboard },
    { name: 'Company Profile', path: '/company/profile', icon: Building },
    { name: 'Post Opportunity', path: '/company/post-opportunity', icon: PlusCircle, highlight: true },
    { name: 'My Opportunities', path: '/company/opportunities', icon: Briefcase },
    { name: 'Applications', path: '/company/applications', icon: Users },
    { name: 'Candidate Matching', path: '/company/candidate-matching', icon: Sparkles, core: true },
    { name: 'Hiring Analytics', path: '/company/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/company/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-16 px-6 border-b border-border flex items-center justify-between">
          <Logo size="small" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-subtext hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Company Badge Card */}
        <div className="p-4 mx-3 my-3 bg-amber-50/70 border border-amber-200/80 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-300 font-bold text-sm flex items-center justify-center shadow-sm shrink-0">
              {currentUser?.companyInitials || 'RZ'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-main truncate">{currentUser?.companyName || 'Razorpay'}</p>
              <p className="text-[11px] text-subtext truncate">{currentUser?.title || 'Campus Talent Lead'}</p>
              <span className="text-[10px] font-semibold text-amber-800">4 Active Openings</span>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto py-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-white font-semibold shadow-sm'
                    : 'text-subtext hover:text-main hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.core ? 'text-accent' : 'text-subtext'}`} />
                  <span>{item.name}</span>
                </div>
                {item.core && !isActive && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold bg-orange-100 text-orange-800 rounded">
                    AI Match
                  </span>
                )}
                {item.highlight && !isActive && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold bg-primary-soft text-primary rounded">
                    +New
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border flex items-center justify-between">
          <Link to="/" className="text-xs text-subtext hover:text-primary transition-colors">
            Public Site
          </Link>
          <button
            onClick={logout}
            className="p-1.5 rounded-lg text-subtext hover:text-error hover:bg-red-50 transition-colors"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-surface border-b border-border px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-subtle">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-subtext hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-subtext hidden sm:inline">
              Recruiter & Industry Gateway
            </span>
          </div>

          <div className="flex items-center gap-3">
            <DemoRoleSwitcher />

            <Link to="/company/post-opportunity" className="hidden sm:inline-block">
              <Button variant="primary" size="sm" icon={PlusCircle}>
                Post Opportunity
              </Button>
            </Link>

            <div className="flex items-center gap-2 pl-2 border-l border-border">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center">
                {currentUser?.avatar || 'RI'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold text-main leading-tight">{currentUser?.name || 'Rajesh Iyer'}</p>
                <p className="text-[10px] text-subtext leading-tight">{currentUser?.companyName || 'Razorpay'}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
