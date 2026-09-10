import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../components/common/Logo';
import { Button } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { UserCheck, Building2, Shield, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export const LoginPage = () => {
  const { loginAs } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('aarav.sharma@ves.ac.in');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginAs('student');
    toast.success('Welcome back, Aarav Sharma!');
    navigate('/student/dashboard');
  };

  const handleQuickDemoLogin = (role) => {
    loginAs(role);
    if (role === 'student') {
      toast.success('Signed in as Student Demo (Aarav Sharma)');
      navigate('/student/dashboard');
    } else if (role === 'company') {
      toast.success('Signed in as Company Demo (Razorpay Recruiter)');
      navigate('/company/dashboard');
    } else if (role === 'admin') {
      toast.success('Signed in as Institutional Admin Demo');
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <Logo size="large" className="justify-center" />
          <h2 className="text-2xl font-extrabold text-main mt-3">Sign In to KaushalVerse</h2>
          <p className="text-xs text-subtext">Access your academic skills passport or recruitment portal</p>
        </div>

        {/* 1-Click SIH Evaluator Quick Access */}
        <div className="bg-primary-soft/60 border border-primary-light rounded-2xl p-4 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SIH Evaluator 1-Click Fast Login</span>
          </div>
          <p className="text-[11px] text-subtext">Instant role access for quick demonstration:</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleQuickDemoLogin('student')}
              className="p-2 rounded-xl bg-surface border border-border hover:border-primary text-center text-xs font-semibold transition-all hover:shadow-xs"
            >
              <UserCheck className="w-4 h-4 text-primary mx-auto mb-1" />
              Student
            </button>
            <button
              onClick={() => handleQuickDemoLogin('company')}
              className="p-2 rounded-xl bg-surface border border-border hover:border-accent text-center text-xs font-semibold transition-all hover:shadow-xs"
            >
              <Building2 className="w-4 h-4 text-accent mx-auto mb-1" />
              Company
            </button>
            <button
              onClick={() => handleQuickDemoLogin('admin')}
              className="p-2 rounded-xl bg-surface border border-border hover:border-purple-600 text-center text-xs font-semibold transition-all hover:shadow-xs"
            >
              <Shield className="w-4 h-4 text-purple-600 mx-auto mb-1" />
              Admin
            </button>
          </div>
        </div>

        {/* Traditional Credentials Form */}
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-card space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-main mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
                  placeholder="student@institution.ac.in"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-main">Password</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); toast.info('Use 1-click demo login buttons above.'); }} className="text-[11px] text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary h-4 w-4"
              />
              <label htmlFor="remember" className="ml-2 text-xs text-subtext">
                Remember this browser
              </label>
            </div>

            <Button type="submit" variant="primary" size="md" className="w-full" icon={ArrowRight} iconPosition="right">
              Sign In to Account
            </Button>
          </form>

          <div className="pt-3 border-t border-border text-center text-xs text-subtext">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-primary hover:underline">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
