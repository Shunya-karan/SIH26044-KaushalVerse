import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../components/common/Logo';
import { Button } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { UserCheck, Building2, School, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export const RegisterPage = () => {
  const { loginAs } = useAuth();
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState('student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [collegeOrCompany, setCollegeOrCompany] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    loginAs(accountType);
    toast.success(`Account created successfully for ${fullName || 'Demo User'}!`);
    if (accountType === 'student') navigate('/student/dashboard');
    else if (accountType === 'company') navigate('/company/dashboard');
    else navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-6">
        <div className="text-center space-y-2">
          <Logo size="large" className="justify-center" />
          <h2 className="text-2xl font-extrabold text-main mt-3">Create Your Account</h2>
          <p className="text-xs text-subtext">Join the national Academia–Industry skill collaboration network</p>
        </div>

        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-card space-y-5">
          {/* Role selector */}
          <div>
            <label className="block text-xs font-semibold text-main mb-2">Select Your Role</label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setAccountType('student')}
                className={`p-3 rounded-xl border text-center font-semibold transition-all ${
                  accountType === 'student'
                    ? 'border-primary bg-primary-soft text-primary shadow-xs'
                    : 'border-border text-subtext hover:bg-slate-50'
                }`}
              >
                <UserCheck className="w-5 h-5 mx-auto mb-1" />
                Student
              </button>
              <button
                type="button"
                onClick={() => setAccountType('company')}
                className={`p-3 rounded-xl border text-center font-semibold transition-all ${
                  accountType === 'company'
                    ? 'border-accent bg-orange-50 text-accent shadow-xs'
                    : 'border-border text-subtext hover:bg-slate-50'
                }`}
              >
                <Building2 className="w-5 h-5 mx-auto mb-1" />
                Company
              </button>
              <button
                type="button"
                onClick={() => setAccountType('admin')}
                className={`p-3 rounded-xl border text-center font-semibold transition-all ${
                  accountType === 'admin'
                    ? 'border-purple-600 bg-purple-50 text-purple-700 shadow-xs'
                    : 'border-border text-subtext hover:bg-slate-50'
                }`}
              >
                <School className="w-5 h-5 mx-auto mb-1" />
                Institution
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-main mb-1">Full Name</label>
              <input
                required
                type="text"
                placeholder="e.g. Aarav Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-main mb-1">Official / Institutional Email</label>
              <input
                required
                type="email"
                placeholder="aarav@ves.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-main mb-1">
                {accountType === 'student' ? 'College / University' : accountType === 'company' ? 'Company Name' : 'Academic Institution'}
              </label>
              <input
                required
                type="text"
                placeholder={accountType === 'student' ? "Vivekanand Education Society's College" : "e.g. Razorpay India"}
                value={collegeOrCompany}
                onChange={(e) => setCollegeOrCompany(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-main mb-1">Password</label>
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full p-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-main mb-1">Confirm Password</label>
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full p-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" size="md" className="w-full" icon={ArrowRight} iconPosition="right">
              Complete Registration (Demo)
            </Button>
          </form>

          <div className="pt-3 border-t border-border text-center text-xs text-subtext">
            Already registered?{' '}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
