import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button, Badge } from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { Bell, CheckCircle2, Info, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotificationsPage = () => {
  const { notifications, markNotificationAsRead } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Notifications & Alerts"
        subtitle="Real-time updates regarding shortlists, interview invitations, and skill gap recommendations."
        breadcrumbs={[{ label: 'Dashboard', link: '/student/dashboard' }, { label: 'Notifications' }]}
      />

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => markNotificationAsRead(n.id)}
            className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-subtle flex items-start gap-4 ${
              !n.read ? 'bg-primary-soft/40 border-primary-light' : 'bg-surface border-border'
            }`}
          >
            <div className={`p-2 rounded-xl text-white shrink-0 mt-0.5 ${
              n.type === 'success' ? 'bg-secondary' : n.type === 'info' ? 'bg-primary' : 'bg-accent'
            }`}>
              {n.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-main">{n.title}</h4>
                <span className="text-[10px] text-subtext">{n.time}</span>
              </div>
              <p className="text-xs text-subtext mt-0.5 leading-relaxed">{n.message}</p>
              {n.link && (
                <Link to={n.link} className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline mt-2">
                  View details &rarr;
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
