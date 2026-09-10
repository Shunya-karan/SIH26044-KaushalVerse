import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Mail, Award, Edit3, Briefcase, Code2 } from 'lucide-react';
import { PageHeader } from '@/components/common/Shared';
import { Card, Badge, Button, Avatar, Progress } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import { mockStudents } from '@/data/mockStudents';

export default function StudentProfile() {
  const { user } = useAuth();
  const student = mockStudents.find(s => s.id === 's1') || mockStudents[0];

  return (
    <div className="space-y-6">
      <PageHeader title="My Profile" subtitle="Manage your personal and academic information" icon={GraduationCap} actionLabel="Edit Profile" actionTo="/student/profile" />

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <Avatar name={student.name} size="xl" />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-main">{student.name}</h2>
            <p className="text-sm text-text-secondary mt-0.5">{student.degree} {student.branch} · {student.graduationYear}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-text-secondary">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{student.location}</span>
              <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" />{student.email}</span>
              <span className="flex items-center gap-1.5"><Award className="w-4 h-4" />CGPA: {student.cgpa}</span>
            </div>
          </div>
          <Button variant="secondary" size="sm"><Edit3 className="w-4 h-4" />Edit</Button>
        </div>
        <div className="mt-5 pt-5 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-main">Profile Completion</span>
            <span className="text-sm font-semibold text-primary">{student.profileCompletion}%</span>
          </div>
          <Progress value={student.profileCompletion} color="primary" />
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-main mb-4">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-text-secondary text-xs">Full Name</p><p className="font-medium text-main mt-0.5">{student.name}</p></div>
            <div><p className="text-text-secondary text-xs">Email</p><p className="font-medium text-main mt-0.5">{student.email}</p></div>
            <div><p className="text-text-secondary text-xs">College</p><p className="font-medium text-main mt-0.5">{student.college}</p></div>
            <div><p className="text-text-secondary text-xs">Degree</p><p className="font-medium text-main mt-0.5">{student.degree}</p></div>
            <div><p className="text-text-secondary text-xs">Branch</p><p className="font-medium text-main mt-0.5">{student.branch}</p></div>
            <div><p className="text-text-secondary text-xs">Graduation Year</p><p className="font-medium text-main mt-0.5">{student.graduationYear}</p></div>
            <div><p className="text-text-secondary text-xs">CGPA</p><p className="font-medium text-main mt-0.5">{student.cgpa}</p></div>
            <div><p className="text-text-secondary text-xs">Location</p><p className="font-medium text-main mt-0.5">{student.location}</p></div>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-text-secondary text-xs">About</p>
            <p className="text-sm text-main mt-1">{student.about}</p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-main mb-4">Education</h3>
          {student.education.map((edu, i) => (
            <div key={i} className="rounded-lg border border-border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-main text-sm">{edu.institution}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{edu.degree}</p>
                </div>
                <Badge variant="primary">{edu.score}</Badge>
              </div>
              <p className="text-xs text-text-muted mt-2">{edu.start} — {edu.end}</p>
            </div>
          ))}
          <h3 className="font-semibold text-main mt-5 mb-3">Certifications</h3>
          <div className="flex flex-wrap gap-2">
            {student.certifications.map(c => <Badge key={c} variant="info">{c}</Badge>)}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-main">Skills Summary</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {student.skills.map(s => <Badge key={s} variant="primary">{s}</Badge>)}
          </div>
          <Link to="/student/skills" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
            Manage skills <Edit3 className="w-3.5 h-3.5" />
          </Link>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-main">Projects</h3>
          </div>
          <div className="space-y-3">
            {student.projects.map((p, i) => (
              <div key={i} className="rounded-lg border border-border p-3">
                <p className="font-medium text-main text-sm">{p.name}</p>
                <p className="text-xs text-text-secondary mt-0.5">{p.description}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.tech.map(t => <Badge key={t} variant="default">{t}</Badge>)}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
