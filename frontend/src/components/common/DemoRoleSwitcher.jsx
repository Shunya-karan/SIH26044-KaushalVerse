import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserCheck, Building2, Shield, ChevronDown, Check, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export const DemoRoleSwitcher = () => {
  const { role, loginAs, demoProfiles } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSwitch = (newRole) => {
    loginAs(newRole);
    setOpen(false);

    if (newRole === 'student') {
      toast.success('Switched to Student Demo: Aarav Sharma');
      navigate('/student/dashboard');
    } else if (newRole === 'company') {
      toast.success('Switched to Company Demo: Razorpay (Rajesh Iyer)');
      navigate('/company/dashboard');
    } else if (newRole === 'admin') {
      toast.success('Switched to Institutional Admin Demo: Dr. Pradeep Sengupta');
      navigate('/admin/dashboard');
    }
  };

  const getRoleBadge = (r) => {
    switch (r) {
      case 'student':
        return { label: 'Student Demo', color: 'bg-primary-soft text-primary border-primary-light', icon: UserCheck };
      case 'company':
        return { label: 'Company Demo', color: 'bg-amber-50 text-amber-800 border-amber-200', icon: Building2 };
      case 'admin':
        return { label: 'Admin Demo', color: 'bg-purple-50 text-purple-800 border-purple-200', icon: Shield };
      default:
        return { label: 'Guest Visitor', color: 'bg-slate-100 text-slate-700 border-slate-200', icon: Sparkles };
    }
  };

  const currentBadge = getRoleBadge(role);
  const Icon = currentBadge.icon;

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all shadow-sm hover:shadow ${currentBadge.color}`}
        title="Switch Demo Role for Evaluation"
      >
        <Icon className="w-3.5 h-3.5" />
        <span>{currentBadge.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-72 origin-top-right rounded-xl bg-white border border-border shadow-card-hover z-50 p-2 space-y-1">
            <div className="px-3 py-2 border-b border-border text-xs">
              <p className="font-bold text-main flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                SIH Evaluator Quick Switcher
              </p>
              <p className="text-subtext text-[11px] mt-0.5">Experience platform personas with 1 click.</p>
            </div>

            {/* Student */}
            <button
              onClick={() => handleSwitch('student')}
              className={`w-full flex items-start gap-3 p-2.5 rounded-lg text-left text-xs transition-colors hover:bg-slate-50 ${
                role === 'student' ? 'bg-primary-soft/60 border border-primary-light' : ''
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">
                AS
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-main">Aarav Sharma</p>
                  {role === 'student' && <Check className="w-3.5 h-3.5 text-primary" />}
                </div>
                <p className="text-subtext text-[11px] truncate">Student (VESASC IT, 2026)</p>
                <span className="text-[10px] text-primary font-medium">Skills &bull; Roadmap &bull; Apply</span>
              </div>
            </button>

            {/* Company */}
            <button
              onClick={() => handleSwitch('company')}
              className={`w-full flex items-start gap-3 p-2.5 rounded-lg text-left text-xs transition-colors hover:bg-slate-50 ${
                role === 'company' ? 'bg-amber-50/60 border border-amber-200' : ''
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0">
                RZ
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-main">Rajesh Iyer</p>
                  {role === 'company' && <Check className="w-3.5 h-3.5 text-amber-700" />}
                </div>
                <p className="text-subtext text-[11px] truncate">Recruiter @ Razorpay</p>
                <span className="text-[10px] text-amber-700 font-medium">Candidate Match &bull; Post Job</span>
              </div>
            </button>

            {/* Admin */}
            <button
              onClick={() => handleSwitch('admin')}
              className={`w-full flex items-start gap-3 p-2.5 rounded-lg text-left text-xs transition-colors hover:bg-slate-50 ${
                role === 'admin' ? 'bg-purple-50/60 border border-purple-200' : ''
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-800 font-bold flex items-center justify-center shrink-0">
                PS
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-main">Dr. P. Sengupta</p>
                  {role === 'admin' && <Check className="w-3.5 h-3.5 text-purple-700" />}
                </div>
                <p className="text-subtext text-[11px] truncate">Dean & Placement Director</p>
                <span className="text-[10px] text-purple-700 font-medium">Analytics &bull; Skill Trends</span>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
