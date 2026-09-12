import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Bell, ChevronDown } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { initials, cn } from "@/lib/utils";

export function DashboardShell({ navItems, roleLabel, roleBadgeVariant = "default" }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-white lg:flex lg:flex-col">
        <div className="flex h-16 items-center border-b border-border px-5">
          <Logo />
        </div>
        <div className="px-5 py-4">
          <Badge variant={roleBadgeVariant}>{roleLabel}</Badge>
        </div>
        <nav className="flex-1 space-y-1 px-3 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-border p-3">
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground" onClick={handleLogout}>
            <LogOut className="h-4 w-4" /> Log out
          </Button>
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-white flex flex-col">
            <div className="flex h-16 items-center justify-between border-b border-border px-5">
              <Logo />
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu"><X className="h-5 w-5" /></button>
            </div>
            <div className="px-5 py-4">
              <Badge variant={roleBadgeVariant}>{roleLabel}</Badge>
            </div>
            <nav className="flex-1 space-y-1 px-3 overflow-y-auto">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium",
                      isActive ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-muted"
                    )
                  }
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="border-t border-border p-3">
              <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground" onClick={handleLogout}>
                <LogOut className="h-4 w-4" /> Log out
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-white/90 backdrop-blur px-4 sm:px-6">
          <button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <button className="relative rounded-full p-2 hover:bg-muted" aria-label="Notifications">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-full pr-1 hover:bg-muted p-1">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{initials(user?.name || "U")}</AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium text-foreground sm:block">{user?.name}</span>
                <ChevronDown className="hidden h-4 w-4 text-muted-foreground sm:block" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-error">
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
