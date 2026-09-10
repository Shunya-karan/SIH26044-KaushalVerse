import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { PlusCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const PostOpportunity = () => {
  const { postOpportunity } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    type: 'Internship',
    workMode: 'Hybrid',
    location: 'Bengaluru / Mumbai',
    stipend: '₹30,000 / month',
    duration: '6 Months',
    deadline: '2026-05-15',
    overview: '',
    requiredSkills: 'React, JavaScript, Git, REST APIs',
    preferredSkills: 'Docker, Tailwind CSS',
    eligibility: 'B.E / B.Tech / B.Sc (CS/IT) 2026 batch, CGPA ≥ 7.5',
    companyName: 'Razorpay',
    companyInitials: 'RZ',
    companyColor: '#0C2340',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOpp = postOpportunity({
      title: formData.title,
      type: formData.type,
      workMode: formData.workMode,
      location: formData.location,
      stipend: formData.stipend,
      duration: formData.duration,
      deadline: formData.deadline,
      overview: formData.overview,
      requiredSkills: formData.requiredSkills.split(',').map(s => s.trim()),
      preferredSkills: formData.preferredSkills.split(',').map(s => s.trim()),
      eligibility: formData.eligibility,
      companyName: formData.companyName,
      companyInitials: formData.companyInitials,
      companyColor: formData.companyColor,
      responsibilities: [
        'Build and maintain scalable client interfaces and backend microservices',
        'Participate in agile sprint ceremonies and code reviews',
        'Ensure system accessibility and performant query handling'
      ]
    });

    toast.success('Opportunity posted successfully! Added to live student discovery feed.');
    navigate('/company/opportunities');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Post New Campus Opportunity"
        subtitle="Define clear mandatory vs preferred skills to enable automated candidate match scoring."
        breadcrumbs={[{ label: 'Dashboard', link: '/company/dashboard' }, { label: 'Post Opportunity' }]}
      />

      <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-subtle space-y-5 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block font-semibold text-main mb-1">Position Title</label>
            <input
              required
              type="text"
              placeholder="e.g. Frontend Developer Intern, Cloud Engineer Trainee"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-main mb-1">Opportunity Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
            >
              <option value="Internship">Internship (with PPO potential)</option>
              <option value="Job">Full-Time Campus Hire</option>
              <option value="Project">Live Industry Capstone Project</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-main mb-1">Work Mode</label>
            <select
              value={formData.workMode}
              onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
            >
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-main mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-main mb-1">Compensation / Stipend</label>
            <input
              type="text"
              placeholder="e.g. ₹35,000 / month or ₹8.5 - ₹12 LPA"
              value={formData.stipend}
              onChange={(e) => setFormData({ ...formData, stipend: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-main mb-1">Duration</label>
            <input
              type="text"
              placeholder="e.g. 6 Months or Full-Time"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-main mb-1">Application Deadline</label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full p-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-main mb-1">Mandatory Core Skills (Comma Separated)</label>
          <input
            required
            type="text"
            placeholder="e.g. React, JavaScript, Git, REST APIs"
            value={formData.requiredSkills}
            onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
            className="w-full p-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
          />
          <span className="text-[11px] text-subtext">Weighted at 80% of candidate match score calculation.</span>
        </div>

        <div>
          <label className="block font-semibold text-main mb-1">Preferred Bonus Skills (Comma Separated)</label>
          <input
            type="text"
            placeholder="e.g. Docker, TypeScript, Testing"
            value={formData.preferredSkills}
            onChange={(e) => setFormData({ ...formData, preferredSkills: e.target.value })}
            className="w-full p-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-main mb-1">Eligibility Criteria</label>
          <input
            type="text"
            value={formData.eligibility}
            onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
            className="w-full p-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-main mb-1">Role Overview & Expectations</label>
          <textarea
            required
            rows={4}
            placeholder="Describe the project scope, engineering stack, and mentorship structure..."
            value={formData.overview}
            onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
            className="w-full p-2.5 rounded-lg border border-border bg-slate-50 focus:bg-white focus:border-primary outline-none"
          />
        </div>

        <div className="pt-2 flex justify-end gap-3">
          <Button variant="outline" size="md" onClick={() => navigate('/company/opportunities')}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="md" icon={PlusCircle}>
            Publish Opportunity
          </Button>
        </div>
      </form>
    </div>
  );
};
