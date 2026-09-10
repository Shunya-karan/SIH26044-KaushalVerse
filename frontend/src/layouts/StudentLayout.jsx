import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../components/common/Logo';
import { DemoRoleSwitcher } from '../components/common/DemoRoleSwitcher';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  User,
  Cpu,
  GitPullRequest,
  Compass,
  Briefcase,
  FileCheck2,
  FileText,
  TrendingUp,
  Bell,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Search,
  Sparkles,
} from 'lucide-react';

export const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { notifications } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', path: '/student/profile', icon: User },
    { name: 'My Skills', path: '/student/skills', icon: Cpu },
    { name: 'Skill Gap', path: '/student/skill-gap', icon: GitPullRequest, highlight: true },
    { name: 'Roadmap', path: '/student/roadmap', icon: Compass, ai: true },
    { name: 'Opportunities', path: '/student/opportunities', icon: Briefcase },
    { name: 'Applications', path: '/student/applications', icon: FileCheck2 },
    { name: 'Resume Intel', path: '/student/resume', icon: FileText },
    { name: 'Career Insights', path: '/student/insights', icon: TrendingUp },
    { name: 'Notifications', path: '/student/notifications', icon: Bell, badge: unreadCount },
    { name: 'Settings', path: '/student/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-0 lg:translate-x-0'
        } ${!sidebarOpen ? '-translate-x-full lg:translate-x-0' : ''}`}
      >
        {/* Sidebar Header */}
        <div className="h-16 px-6 border-b border-border flex items-center justify-between">
          <Logo size="small" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-subtext hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Mini Card */}
        <div className="p-4 mx-3 my-3 bg-primary-soft/50 border border-primary-light/60 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center shadow-sm shrink-0">
              {currentUser?.avatar || 'AS'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-main truncate">{currentUser?.name || 'Aarav Sharma'}</p>
              <p className="text-[11px] text-subtext truncate">{currentUser?.branch || 'IT'}, 2026</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-block w-2 h-2 rounded-full bg-success"></span>
                <span className="text-[10px] font-semibold text-primary">Readiness: 88%</span>
              </div>
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
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.ai ? 'text-roadmap' : 'text-subtext'}`} />
                  <span>{item.name}</span>
                </div>
                {item.highlight && !isActive && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold bg-emerald-100 text-emerald-800 rounded">
                    Core
                  </span>
                )}
                {item.ai && !isActive && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold bg-purple-100 text-purple-800 rounded flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" /> Path
                  </span>
                )}
                {item.badge > 0 && (
                  <span className={`px-1.5 py-0.2 text-[10px] font-bold rounded-full ${
                    isActive ? 'bg-white text-primary' : 'bg-primary text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-border flex items-center justify-between">
          <Link
            to="/"
            className="text-xs text-subtext hover:text-primary transition-colors flex items-center gap-1"
          >
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
        {/* Student Topbar */}
        <header className="h-16 bg-surface border-b border-border px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-subtle">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-subtext hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-border text-xs text-subtext w-64 md:w-80">
              <Search className="w-4 h-4 text-muted shrink-0" />
              <input
                type="text"
                placeholder="Search skills, internships, roles..."
                className="bg-transparent border-none outline-none w-full placeholder:text-muted"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') navigate('/student/opportunities');
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Demo Switcher */}
            <DemoRoleSwitcher />

            {/* Notification Bell */}
            <Link
              to="/student/notifications"
              className="relative p-2 rounded-lg text-subtext hover:text-main hover:bg-slate-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
              )}
            </Link>

            {/* Profile Avatar */}
            <Link to="/student/profile" className="flex items-center gap-2 pl-2 border-l border-border">
              <div className="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                {currentUser?.avatar || 'AS'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold text-main leading-tight">{currentUser?.name || 'Aarav Sharma'}</p>
                <p className="text-[10px] text-subtext leading-tight">Student Portal</p>
              </div>
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
