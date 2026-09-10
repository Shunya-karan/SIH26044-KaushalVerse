import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Features', to: '/how-it-works#features' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function PublicLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const dashboardLink = user?.role ? `/${user.role}` : '/login';

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Logo />
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-text-secondary hover:bg-bg hover:text-main transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <Link to={dashboardLink} className="btn-primary">Dashboard</Link>
              ) : (
                <>
                  <Link to="/login" className="btn-ghost">Login</Link>
                  <Link to="/register" className="btn-primary">Get Started</Link>
                </>
              )}
            </div>
            <button
              className="md:hidden rounded-lg p-2 text-main hover:bg-bg"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-white">
            <div className="px-4 py-3 space-y-1">
              {navItems.map(item => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-bg hover:text-main"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 flex gap-2">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary flex-1">Login</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary flex-1">Get Started</Link>
              </div>
            </div>
          </div>
        )}
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <Logo />
              <p className="mt-3 max-w-xs text-sm text-text-secondary">
                Bridging Skills. Connecting Academia & Industry. A Smart India Hackathon prototype for academia-industry collaboration.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-main">Platform</h4>
              <ul className="mt-3 space-y-2">
                <li><Link to="/how-it-works" className="text-sm text-text-secondary hover:text-primary">How It Works</Link></li>
                <li><Link to="/about" className="text-sm text-text-secondary hover:text-primary">About</Link></li>
                <li><Link to="/contact" className="text-sm text-text-secondary hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-main">Legal</h4>
              <ul className="mt-3 space-y-2">
                <li><Link to="/privacy" className="text-sm text-text-secondary hover:text-primary">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-sm text-text-secondary hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-text-muted">© 2025 KaushalVerse — SIH Hackathon Prototype. All rights reserved.</p>
            <p className="text-xs text-text-muted">Developed as a Smart India Hackathon prototype.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
