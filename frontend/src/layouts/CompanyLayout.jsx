import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Building2, PlusCircle, Briefcase, FileText, Users,
  BarChart3, Bell, Settings, LogOut, Menu, X, ChevronDown,
} from 'lucide-react';
import Logo from '@/components/common/Logo';
import { useAuth } from '@/context/AuthContext';
import { Avatar } from '@/components/ui';

const sidebarItems = [
  { label: 'Dashboard', to: '/company', icon: LayoutDashboard },
  { label: 'Company Profile', to: '/company/profile', icon: Building2 },
  { label: 'Post Opportunity', to: '/company/post-opportunity', icon: PlusCircle },
  { label: 'My Opportunities', to: '/company/opportunities', icon: Briefcase },
  { label: 'Applications', to: '/company/applications', icon: FileText },
  { label: 'Candidate Matching', to: '/company/candidate-matching', icon: Users },
  { label: 'Analytics', to: '/company/analytics', icon: BarChart3 },
  { label: 'Notifications', to: '/company/notifications', icon: Bell },
  { label: 'Settings', to: '/company/settings', icon: Settings },
];

export default function CompanyLayout() {
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
            <Avatar name={user?.name || 'Company'} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-main truncate">{user?.name}</p>
              <p className="text-xs text-text-muted truncate">{user?.email}</p>
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
            <span className="text-sm font-medium text-text-secondary">Company Portal</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-lg p-2 text-text-secondary hover:bg-bg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
            </button>
            <Link to="/company/settings" className="flex items-center gap-2">
              <Avatar name={user?.name || 'Company'} size="sm" />
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
