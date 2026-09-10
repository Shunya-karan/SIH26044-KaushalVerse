import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, GraduationCap, Building2, Briefcase, FileText,
  TrendingUp, BarChart3, FileBarChart, Settings, LogOut, Menu, X, ChevronDown,
} from 'lucide-react';
import Logo from '@/components/common/Logo';
import { useAuth } from '@/context/AuthContext';
import { Avatar } from '@/components/ui';

const sidebarItems = [
  { label: 'Overview', to: '/admin', icon: LayoutDashboard },
  { label: 'Students', to: '/admin/students', icon: GraduationCap },
  { label: 'Companies', to: '/admin/companies', icon: Building2 },
  { label: 'Opportunities', to: '/admin/opportunities', icon: Briefcase },
  { label: 'Applications', to: '/admin/applications', icon: FileText },
  { label: 'Skill Trends', to: '/admin/skill-trends', icon: TrendingUp },
  { label: 'Placement Analytics', to: '/admin/placement-analytics', icon: BarChart3 },
  { label: 'Reports', to: '/admin/reports', icon: FileBarChart },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (to) => location.pathname === to;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-bg">
      <aside className="fixed inset-y-0 left-0 z-30 w-64 border-r border-border bg-white hidden lg:flex flex-col">
        <div className="flex h-16 items-center border-b border-border px-5">
          <Logo size="sm" />
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {sidebarItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive(item.to) ? 'bg-primary-soft text-primary' : 'text-text-secondary hover:bg-bg hover:text-main'
              }`}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-border p-3">
          <div className="flex items-center gap-3 px-2 py-2">
            <Avatar name={user?.name || 'Admin'} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-main truncate">{user?.name}</p>
              <p className="text-xs text-text-muted truncate">Administrator</p>
            </div>
          </div>
          <button onClick={handleLogout} className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-red-50 hover:text-error transition-colors">
            <LogOut className="w-[18px] h-[18px]" />
            Logout
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-white flex flex-col animate-slide-in">
            <div className="flex h-16 items-center justify-between border-b border-border px-5">
              <Logo size="sm" />
              <button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 hover:bg-bg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
              {sidebarItems.map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive(item.to) ? 'bg-primary-soft text-primary' : 'text-text-secondary hover:bg-bg hover:text-main'
                  }`}
                >
                  <item.icon className="w-[18px] h-[18px]" />
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-border p-3">
              <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-red-50 hover:text-error">
                <LogOut className="w-[18px] h-[18px]" />
                Logout
              </button>
            </div>
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-white/90 backdrop-blur-md px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button className="lg:hidden rounded-lg p-2 hover:bg-bg" onClick={() => setMobileOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium text-text-secondary">Admin Portal</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/admin/settings" className="flex items-center gap-2">
              <Avatar name={user?.name || 'Admin'} size="sm" />
              <ChevronDown className="w-4 h-4 text-text-muted hidden sm:block" />
            </Link>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
