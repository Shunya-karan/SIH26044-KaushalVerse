import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Eye, EyeOff, GraduationCap, Building2, Shield, Check } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { useAuth } from '@/context/AuthContext';

const schema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  accountType: z.enum(['student', 'company', 'institution']),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState('student');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { accountType: 'student' },
  });

  const onSubmit = (data) => {
    login(accountType, data.email);
    toast.success('Account created successfully!');
    navigate(`/${accountType === 'institution' ? 'admin' : accountType}`);
  };

  const accountTypes = [
    { value: 'student', label: 'Student', desc: 'Find opportunities & track skills', icon: GraduationCap },
    { value: 'company', label: 'Company', desc: 'Post jobs & find candidates', icon: Building2 },
    { value: 'institution', label: 'Institution', desc: 'Manage students & analytics', icon: Shield },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:w-1/2 bg-primary p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full border-8 border-white" />
          <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full border-8 border-white" />
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
          <h2 className="text-3xl font-bold text-white leading-tight">Start your career journey today</h2>
          <p className="mt-4 text-teal-100 leading-relaxed">Create your KaushalVerse account and get access to skill mapping, personalized roadmaps, and thousands of opportunities.</p>
          <div className="mt-8 space-y-3">
            {['Free for students and institutions', 'AI-powered skill gap analysis', 'Transparent match scoring', 'Industry-standard resume analysis'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-white">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-xs text-teal-200">© 2025 KaushalVerse — SIH Hackathon Prototype</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-bg overflow-y-auto">
        <div className="w-full max-w-md my-8">
          <div className="lg:hidden mb-8">
            <Logo size="md" to="/" />
          </div>
          <h1 className="text-2xl font-bold text-main">Create your account</h1>
          <p className="mt-2 text-sm text-text-secondary">Join KaushalVerse and bridge the skill gap.</p>

          <div className="mt-6">
            <label className="label">Account Type</label>
            <div className="grid grid-cols-3 gap-2">
              {accountTypes.map(type => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setAccountType(type.value)}
                  className={`flex flex-col items-center gap-2 rounded-lg border p-3 transition-all ${
                    accountType === type.value ? 'border-primary bg-primary-soft' : 'border-border bg-white hover:bg-bg'
                  }`}
                >
                  <type.icon className={`w-5 h-5 ${accountType === type.value ? 'text-primary' : 'text-text-secondary'}`} />
                  <span className="text-xs font-medium text-main">{type.label}</span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-text-secondary">{accountTypes.find(t => t.value === accountType)?.desc}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <input type="hidden" {...register('accountType')} value={accountType} />
            <div>
              <label className="label">Full Name</label>
              <input
                {...register('fullName')}
                placeholder="Enter your full name"
                className={`input ${errors.fullName ? 'border-error' : ''}`}
              />
              {errors.fullName && <p className="mt-1 text-xs text-error">{errors.fullName.message}</p>}
            </div>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                {...register('email')}
                placeholder="you@example.com"
                className={`input ${errors.email ? 'border-error' : ''}`}
              />
              {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="Create a password"
                  className={`input pr-10 ${errors.password ? 'border-error' : ''}`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-main">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-error">{errors.password.message}</p>}
            </div>
            <div>
              <label className="label">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                placeholder="Re-enter your password"
                className={`input ${errors.confirmPassword ? 'border-error' : ''}`}
              />
              {errors.confirmPassword && <p className="mt-1 text-xs text-error">{errors.confirmPassword.message}</p>}
            </div>
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-text-secondary">
            Already have an account? <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
