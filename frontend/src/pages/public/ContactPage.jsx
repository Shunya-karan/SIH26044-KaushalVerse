import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', role: 'Student' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Your message has been received! (Demo Mode)');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <PageHeader
        title="Contact & Helpdesk"
        subtitle="Have questions about institutional onboarding, candidate matching, or SIH prototype evaluation?"
        breadcrumbs={[{ label: 'Home', link: '/' }, { label: 'Contact' }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface rounded-2xl border border-border p-6 space-y-5">
            <h3 className="text-base font-bold text-main">Institutional Secretariat</h3>
            
            <div className="flex items-start gap-3 text-xs">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-main">Smart India Hackathon Nodal Center</p>
                <p className="text-subtext">VESASC Campus, Sindhi Society, Chembur, Mumbai, Maharashtra 400071</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <div>
                <p className="font-semibold text-main">Email Support</p>
                <p className="text-subtext">support@kaushalverse.sih.gov.in (Demo)</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <div>
                <p className="font-semibold text-main">Toll-Free Helpline</p>
                <p className="text-subtext">+91 (022) 2522 7470 (Institutional Hours)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8">
            <h3 className="text-base font-bold text-main mb-4">Send Us a Query</h3>
            
            {submitted ? (
              <div className="p-6 text-center bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                <CheckCircle2 className="w-8 h-8 text-secondary mx-auto" />
                <h4 className="text-sm font-bold text-emerald-950">Inquiry Received</h4>
                <p className="text-xs text-emerald-800">
                  Thank you for testing the KaushalVerse portal. Your simulated support ticket has been recorded.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-secondary hover:underline pt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-main mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      className="w-full p-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
                      placeholder="e.g. Aarav Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-main mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      className="w-full p-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
                      placeholder="e.g. aarav@ves.ac.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-main mb-1">Stakeholder Category</label>
                    <select
                      className="w-full p-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option>Student Aspirant</option>
                      <option>Academic Faculty / TPO</option>
                      <option>Industry Recruiter</option>
                      <option>SIH Evaluator / Jury Member</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-main mb-1">Subject</label>
                    <input
                      required
                      type="text"
                      className="w-full p-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
                      placeholder="Topic of inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-main mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full p-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
                    placeholder="Provide details about your query..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <Button type="submit" variant="primary" size="md" icon={Send}>
                  Submit Inquiry
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
