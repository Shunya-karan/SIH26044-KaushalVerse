import React, { useEffect, useMemo, useState } from 'react';
import { Check, GitBranch, Lock, Search, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const DEMO_ACCOUNT = { login: 'aarav-sharma', name: 'Aarav Sharma', avatar: 'AS' };
const DEMO_REPOSITORIES = [
  { id: 1, name: 'healthcare-analytics-dashboard', description: 'Python and Power BI dashboard for healthcare datasets', language: 'Python', private: false, updated: '2 days ago' },
  { id: 2, name: 'student-skill-portal', description: 'React portal for skill tracking and internship matching', language: 'JavaScript', private: false, updated: '1 week ago' },
  { id: 3, name: 'sql-patient-insights', description: 'SQL analysis project with healthcare reporting queries', language: 'SQL', private: false, updated: '2 weeks ago' },
  { id: 4, name: 'powerbi-sales-dashboard', description: 'Interactive Power BI business intelligence project', language: 'Power BI', private: false, updated: '3 weeks ago' },
];

export default function GitHubRepositoryPicker({ open, onOpenChange, skill, onSelect }) {
  const { user } = useAuth();
  const isDemo = !!user?.isDemo;
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [repoList, setRepoList] = useState([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    const saved = sessionStorage.getItem('kv_github_oauth_result');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        sessionStorage.removeItem('kv_github_oauth_result');
        setAccount(parsed.account);
        setRepoList(parsed.repositories || []);
        setConnected(true);
      } catch { /* ignore malformed callback */ }
    }
  }, [open]);

  const repositories = useMemo(() => {
    const source = isDemo ? DEMO_REPOSITORIES : repoList;
    const q = query.trim().toLowerCase();
    return q ? source.filter((repo) => `${repo.name} ${repo.description || ''} ${repo.language || ''}`.toLowerCase().includes(q)) : source;
  }, [isDemo, repoList, query]);

  const connect = async () => {
    if (isDemo) {
      setAccount(DEMO_ACCOUNT);
      setRepoList(DEMO_REPOSITORIES);
      setConnected(true);
      return;
    }
    setLoading(true); setError('');
    try {
      const state = crypto.randomUUID();
      sessionStorage.setItem('kv_github_oauth_state', state);
      const response = await fetch(`${API_URL}/api/github/authorize?state=${encodeURIComponent(state)}`);
      const data = await response.json();
      if (!response.ok || !data.url) throw new Error(data.message || 'Unable to start GitHub login.');
      window.location.assign(data.url);
    } catch (e) {
      setLoading(false);
      setError(e.message || 'Unable to connect GitHub.');
    }
  };

  const close = () => { setQuery(''); setSelected(null); setError(''); setLoading(false); onOpenChange(false); };
  const confirm = () => {
    if (!selected) return;
    onSelect({ type: 'GitHub Project', value: selected.name, repository: selected, account: account || DEMO_ACCOUNT });
    close();
  };

  return (
    <Dialog open={open} onOpenChange={(value) => value ? onOpenChange(true) : close()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><GitBranch className="h-5 w-5" /> Connect GitHub</DialogTitle>
          <DialogDescription>
            Sign in with your GitHub account first. After authentication, only repositories available to that account can be selected as evidence for <b>{skill}</b>.
          </DialogDescription>
        </DialogHeader>

        {!connected ? (
          <div className="rounded-xl border bg-muted/30 p-7 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background"><GitBranch className="h-7 w-7" /></div>
            <h3 className="mt-4 font-semibold">Continue with GitHub</h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">Authenticate securely with GitHub, then choose the project that demonstrates your skill.</p>
            <Button className="mt-5" onClick={connect} disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GitBranch className="mr-2 h-4 w-4" />}
              {loading ? 'Connecting…' : 'Continue with GitHub'}
            </Button>
            {error && <p className="mt-3 text-xs text-error">{error}</p>}
            {isDemo && <p className="mt-3 text-[11px] text-muted-foreground">Demo student: GitHub connection is simulated so the SIH journey remains demo-ready.</p>}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                {account?.avatar_url ? <img src={account.avatar_url} alt="" className="h-9 w-9 rounded-full" /> : <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold">{account?.avatar || 'GH'}</div>}
                <div><p className="text-sm font-medium">{account?.name}</p><p className="text-xs text-muted-foreground">@{account?.login}</p></div>
              </div>
              <Badge variant="success"><Check className="mr-1 h-3 w-3" /> Connected</Badge>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div><p className="text-sm font-medium">Select a repository</p><p className="text-xs text-muted-foreground">Choose from repositories associated with your GitHub account.</p></div>
              <Badge variant="outline">{repositories.length} available</Badge>
            </div>
            <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" placeholder="Search repositories" value={query} onChange={(e) => setQuery(e.target.value)} /></div>

            <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
              {repositories.map((repo) => {
                const isSelected = selected?.id === repo.id;
                return <button key={repo.id} type="button" onClick={() => setSelected(repo)} className={`w-full rounded-lg border p-3 text-left transition ${isSelected ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'hover:bg-muted/50'}`}>
                  <div className="flex items-start gap-3"><GitBranch className="mt-0.5 h-4 w-4 shrink-0" /><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><p className="truncate text-sm font-medium">{repo.name}</p>{isSelected && <Check className="h-4 w-4 shrink-0 text-primary" />}</div><p className="mt-1 text-xs text-muted-foreground">{repo.description || 'No repository description'}</p><div className="mt-2 flex flex-wrap items-center gap-2"><Badge variant="outline">{repo.language || 'Unknown'}</Badge>{repo.updated_at ? <span className="text-[11px] text-muted-foreground">Updated {new Date(repo.updated_at).toLocaleDateString()}</span> : repo.updated && <span className="text-[11px] text-muted-foreground">Updated {repo.updated}</span>}{repo.private && <Lock className="h-3 w-3 text-muted-foreground" />}</div></div></div>
                </button>;
              })}
              {!repositories.length && <div className="py-8 text-center text-sm text-muted-foreground">No repositories match your search.</div>}
            </div>

            {selected && <div className="flex items-center gap-2 rounded-lg bg-muted p-3 text-xs text-muted-foreground"><ExternalLink className="h-4 w-4 shrink-0" /><span><b>{selected.name}</b> will be submitted as evidence for {skill}. The institute will verify the evidence.</span></div>}
          </div>
        )}
        <DialogFooter>{connected && <Button variant="outline" onClick={close}>Cancel</Button>}{connected && <Button disabled={!selected} onClick={confirm}>Use selected repository</Button>}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
