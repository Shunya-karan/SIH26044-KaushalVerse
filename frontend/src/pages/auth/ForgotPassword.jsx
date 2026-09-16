import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, KeyRound, Mail, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Logo } from '@/components/common/Logo';
import { useAuth } from '@/context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const requestOtp = async (event) => {
    event.preventDefault();
    if (!email.includes('@')) return toast.error('Enter a valid email address.');
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/password/request-otp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to send OTP.');
      setStep(2); toast.success('OTP sent to your email.');
    } catch (error) { toast.error(error.message); } finally { setLoading(false); }
  };

  const verifyOtp = async (event) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(otp)) return toast.error('Enter the 6-digit OTP.');
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/password/verify-otp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, otp }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Invalid OTP.');
      setResetToken(data.resetToken); setStep(3); toast.success('OTP verified.');
    } catch (error) { toast.error(error.message); } finally { setLoading(false); }
  };

  const updatePassword = async (event) => {
    event.preventDefault();
    if (password.length < 6) return toast.error('Password must be at least 6 characters.');
    if (password !== confirm) return toast.error('Passwords do not match.');
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/password/complete`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, resetToken }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Reset session expired.');
      resetPassword(email, password);
      setStep(4);
    } catch (error) { toast.error(error.message); } finally { setLoading(false); }
  };

  return <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background via-background to-primary-soft/20 px-4 py-10"><div className="w-full max-w-md"><div className="mb-7 flex justify-center"><Logo showTagline /></div><Card className="border-border/70 shadow-soft"><CardContent className="p-6 sm:p-8"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><KeyRound className="h-5 w-5" /></div><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Account recovery</p><h1 className="text-xl font-bold">Reset your password</h1></div></div><div className="mt-7 flex items-center gap-2">{[1,2,3,4].map((n) => <div key={n} className={`h-1.5 flex-1 rounded-full ${n <= step ? 'bg-primary' : 'bg-muted'}`} />)}</div>
  {step === 1 && <form onSubmit={requestOtp} className="mt-7 space-y-5"><div><p className="text-sm text-muted-foreground">Enter the email linked to your KaushalVerse account. We’ll send a 6-digit verification code.</p></div><div className="space-y-1.5"><Label>Email address</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required /></div><Button className="w-full" disabled={loading}>{loading ? 'Sending OTP…' : 'Send OTP'}<Mail className="ml-2 h-4 w-4" /></Button></form>}
  {step === 2 && <form onSubmit={verifyOtp} className="mt-7 space-y-5"><div className="rounded-lg bg-muted/50 p-4 text-sm"><p className="font-medium">Check your inbox</p><p className="mt-1 text-muted-foreground">We sent a verification code to <b>{email}</b>.</p></div><div className="space-y-1.5"><Label>6-digit OTP</Label><Input inputMode="numeric" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0,6))} placeholder="000000" className="text-center text-lg tracking-[0.4em]" required /></div><Button className="w-full" disabled={loading}>{loading ? 'Verifying…' : 'Verify OTP'}<ShieldCheck className="ml-2 h-4 w-4" /></Button><button type="button" className="w-full text-sm font-medium text-primary hover:underline" onClick={() => setStep(1)}>Use a different email</button></form>}
  {step === 3 && <form onSubmit={updatePassword} className="mt-7 space-y-5"><div className="rounded-lg bg-success/10 p-4 text-sm text-success"><CheckCircle2 className="mb-1 h-4 w-4" /> OTP verified. Choose a new password.</div><div className="space-y-1.5"><Label>New password</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" required /></div><div className="space-y-1.5"><Label>Confirm new password</Label><Input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repeat your new password" required /></div><Button className="w-full" disabled={loading}>{loading ? 'Updating…' : 'Update Password'}<ArrowRight className="ml-2 h-4 w-4" /></Button></form>}
  {step === 4 && <div className="mt-8 text-center"><CheckCircle2 className="mx-auto h-14 w-14 text-success" /><h2 className="mt-4 text-xl font-bold">Password updated</h2><p className="mt-2 text-sm text-muted-foreground">Your password has been updated. You can now sign in with your new password.</p><Button className="mt-6 w-full" onClick={() => navigate('/login')}>Back to Login</Button></div>}
  {step < 4 && <p className="mt-7 text-center text-sm text-muted-foreground"><Link to="/login" className="inline-flex items-center font-medium text-primary hover:underline"><ArrowLeft className="mr-1 h-4 w-4" /> Back to login</Link></p>}
</CardContent></Card></div></div>;
}
