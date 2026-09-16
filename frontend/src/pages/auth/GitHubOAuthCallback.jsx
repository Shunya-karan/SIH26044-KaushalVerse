import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Logo } from '@/components/common/Logo';

export default function GitHubOAuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const complete = async () => {
      const params = new URLSearchParams(window.location.search);
      const expectedState = sessionStorage.getItem('kv_github_oauth_state');
      const token = params.get('token');
      const errorMessage = params.get('error');
      if (errorMessage) { if (active) setError(errorMessage); return; }
      if (!token) { if (active) setError('GitHub did not return an account connection result.'); return; }
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/github/result?token=${encodeURIComponent(token)}`);
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || 'Unable to complete GitHub connection.');
        if (expectedState && result.state !== expectedState) throw new Error('GitHub security check failed. Please try again.');
        sessionStorage.removeItem('kv_github_oauth_state');
        sessionStorage.setItem('kv_github_oauth_result', JSON.stringify(result));
        navigate('/student/skills?github=connected', { replace: true });
      } catch (e) { if (active) setError(e.message || 'Unable to complete GitHub connection.'); }
    };
    complete();
    return () => { active = false; };
  }, [navigate]);

  return <div className="flex min-h-screen items-center justify-center bg-background px-4"><div className="w-full max-w-md"><div className="mb-7 flex justify-center"><Logo showTagline /></div><Card><CardContent className="p-8 text-center">{error ? <><XCircle className="mx-auto h-12 w-12 text-error" /><h1 className="mt-4 text-xl font-bold">GitHub connection failed</h1><p className="mt-2 text-sm text-muted-foreground">{error}</p><button className="mt-6 text-sm font-semibold text-primary hover:underline" onClick={() => navigate('/student/skills')}>Return to My Skills</button></> : <><Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" /><h1 className="mt-4 text-xl font-bold">Connecting GitHub…</h1><p className="mt-2 text-sm text-muted-foreground">Finishing secure account authentication and loading your repositories.</p></>}</CardContent></Card></div></div>;
}
