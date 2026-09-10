import React, { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Button, Badge } from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Award, MapPin, Mail, Phone, Edit3, CheckCircle2, FileText, Save } from 'lucide-react';
import { toast } from 'sonner';

export const StudentProfile = () => {
  const { studentProfile, setStudentProfile, skills } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(studentProfile);

  const handleSave = (e) => {
    e.preventDefault();
    setStudentProfile(formData);
    setIsEditing(false);
    toast.success('Student profile updated successfully!');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <PageHeader
        title="Student Profile & Academic Record"
        subtitle="Manage your personal details, college enrollment credentials, and verified competencies."
        breadcrumbs={[{ label: 'Dashboard', link: '/student/dashboard' }, { label: 'My Profile' }]}
        actions={
          isEditing ? (
            <Button variant="primary" size="sm" icon={Save} onClick={handleSave}>
              Save Changes
            </Button>
          ) : (
            <Button variant="outline" size="sm" icon={Edit3} onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )
        }
      />

      {/* Main Profile Header Card */}
      <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-subtle flex flex-col sm:flex-row items-start gap-6">
        <div className="w-20 h-20 rounded-2xl bg-primary text-white text-2xl font-bold flex items-center justify-center shadow-md shrink-0">
          {studentProfile.avatar}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold text-main">{studentProfile.name}</h2>
              <p className="text-xs text-primary font-semibold">{studentProfile.headline}</p>
            </div>
            <Badge variant="success">Academic Profile Verified</Badge>
          </div>

          <p className="text-xs text-subtext leading-relaxed pt-1">{studentProfile.about}</p>

          <div className="flex flex-wrap gap-4 pt-3 text-xs text-subtext border-t border-border">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-primary" />
              {studentProfile.college}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              {studentProfile.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-primary" />
              {studentProfile.email}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Details Form / View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 Cols: Academic & Personal Data */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-4">
            <h3 className="text-sm font-bold text-main border-b border-border pb-3">
              Academic Credentials
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-subtext font-semibold mb-1">Enrolled Degree</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full p-2 rounded-lg border border-border bg-slate-50 text-main"
                  />
                ) : (
                  <p className="font-semibold text-main">{studentProfile.degree}</p>
                )}
              </div>

              <div>
                <label className="block text-subtext font-semibold mb-1">Academic Department / Branch</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full p-2 rounded-lg border border-border bg-slate-50 text-main"
                  />
                ) : (
                  <p className="font-semibold text-main">{studentProfile.branch}</p>
                )}
              </div>

              <div>
                <label className="block text-subtext font-semibold mb-1">Graduation Year</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={formData.graduationYear}
                    onChange={(e) => setFormData({ ...formData, graduationYear: Number(e.target.value) })}
                    className="w-full p-2 rounded-lg border border-border bg-slate-50 text-main"
                  />
                ) : (
                  <p className="font-semibold text-main">{studentProfile.graduationYear}</p>
                )}
              </div>

              <div>
                <label className="block text-subtext font-semibold mb-1">Cumulative CGPA</label>
                {isEditing ? (
                  <input
                    type="number"
                    step="0.01"
                    value={formData.cgpa}
                    onChange={(e) => setFormData({ ...formData, cgpa: Number(e.target.value) })}
                    className="w-full p-2 rounded-lg border border-border bg-slate-50 text-main"
                  />
                ) : (
                  <p className="font-semibold text-primary text-sm font-bold">{studentProfile.cgpa} / 10.0</p>
                )}
              </div>
            </div>
          </div>

          {/* Academic Projects */}
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-4">
            <h3 className="text-sm font-bold text-main border-b border-border pb-3">
              Key Academic & Hackathon Projects
            </h3>
            <div className="space-y-3">
              {studentProfile.projects.map((proj, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-border text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-main">{proj.title}</p>
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-[11px] text-primary hover:underline">
                      Repository &rarr;
                    </a>
                  </div>
                  <p className="text-subtext leading-relaxed">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 text-[10px] font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Certifications & Verified Skills Summary */}
        <div className="space-y-6">
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-sm font-bold text-main">Accreditations</h3>
              <Award className="w-4 h-4 text-primary" />
            </div>
            <div className="space-y-3">
              {studentProfile.certifications.map((cert, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-border text-xs space-y-0.5">
                  <p className="font-semibold text-main">{cert.title}</p>
                  <p className="text-[11px] text-subtext">{cert.issuer}</p>
                  <span className="inline-block text-[10px] text-primary font-medium">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface rounded-2xl border border-border p-6 shadow-subtle space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-main">Resume File</h3>
              <FileText className="w-4 h-4 text-accent" />
            </div>
            <p className="text-xs text-subtext leading-relaxed">
              Verified PDF transcript & resume connected for 1-click applications.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 border border-border flex items-center justify-between text-xs">
              <span className="font-semibold text-main truncate">Aarav_Sharma_Resume_2026.pdf</span>
              <span className="text-[10px] text-success font-bold">88 ATS Score</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
