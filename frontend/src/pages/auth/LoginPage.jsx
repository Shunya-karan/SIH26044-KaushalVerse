import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Mail, Lock, Eye, EyeOff, GraduationCap, Building2, Shield } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { Input } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    login('student', data.email);
    toast.success('Welcome back! Logged in successfully.');
    navigate('/student');
  };

  const demoLogin = (role) => {
    login(role);
    toast.success(`Logged in as ${role}`);
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full border-8 border-white" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full border-8 border-white" />
        </div>
        <div className="relative">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><circle cx="12" cy="12" r="2" /><circle cx="4" cy="6" r="2" /><circle cx="20" cy="6" r="2" /><circle cx="4" cy="18" r="2" /><circle cx="20" cy="18" r="2" /><path d="M4 6l8 6 8-6M4 18l8-6 8 6" /></svg>
            </div>
            <span className="text-xl font-bold text-white">KaushalVerse</span>
          </Link>
        </div>
        <div className="relative">
          <h2 className="text-3xl font-bold text-white leading-tight">Bridging Skills. Connecting Academia & Industry.</h2>
          <p className="mt-4 text-teal-100 leading-relaxed">Join thousands of students and companies using KaushalVerse to bridge the skill gap and discover opportunities.</p>
          <div className="mt-8 space-y-3">
            {['Intelligent skill mapping & gap analysis', 'Transparent candidate-opportunity matching', 'Personalized learning roadmaps'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-white">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-xs text-teal-200">© 2025 KaushalVerse — SIH Hackathon Prototype</p>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-bg">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Logo size="md" to="/" />
          </div>
          <h1 className="text-2xl font-bold text-main">Welcome back</h1>
          <p className="mt-2 text-sm text-text-secondary">Enter your credentials to access your account.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="email"
                  {...register('email')}
                  placeholder="you@example.com"
                  className={`input pl-10 ${errors.email ? 'border-error' : ''}`}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="Enter your password"
                  className={`input pl-10 pr-10 ${errors.password ? 'border-error' : ''}`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-main">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-error">{errors.password.message}</p>}
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-text-secondary">
                <input type="checkbox" className="rounded border-border text-primary focus:ring-primary/20" />
                Remember me
              </label>
              <Link to="/login" className="text-sm font-medium text-primary hover:underline">Forgot password?</Link>
            </div>
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-bg px-3 text-text-muted">Or continue as</span></div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <button onClick={() => demoLogin('student')} className="flex flex-col items-center gap-2 rounded-lg border border-border bg-white p-3 hover:border-primary hover:bg-primary-soft transition-all">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span className="text-xs font-medium text-main">Student</span>
              </button>
              <button onClick={() => demoLogin('company')} className="flex flex-col items-center gap-2 rounded-lg border border-border bg-white p-3 hover:border-primary hover:bg-primary-soft transition-all">
                <Building2 className="w-5 h-5 text-accent" />
                <span className="text-xs font-medium text-main">Company</span>
              </button>
              <button onClick={() => demoLogin('admin')} className="flex flex-col items-center gap-2 rounded-lg border border-border bg-white p-3 hover:border-primary hover:bg-primary-soft transition-all">
                <Shield className="w-5 h-5 text-violet" />
                <span className="text-xs font-medium text-main">Admin</span>
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-text-secondary">
            Don't have an account? <Link to="/register" className="font-semibold text-primary hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
