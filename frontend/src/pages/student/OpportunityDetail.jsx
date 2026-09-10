import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  ArrowLeft, MapPin, Briefcase, Clock, DollarSign, Calendar, CheckCircle2,
  Building2, FileText, User,
} from 'lucide-react';
import { Badge, Card, Button, Modal } from '@/components/ui';
import { MatchExplanation, SkillBadge } from '@/components/opportunities';
import { mockOpportunities } from '@/data/mockOpportunities';
import { mockStudents } from '@/data/mockStudents';

export default function OpportunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applyOpen, setApplyOpen] = useState(false);
  const [applyStep, setApplyStep] = useState(1);

  const opp = mockOpportunities.find(o => o.id === id);
  if (!opp) return <Card className="p-12 text-center"><p className="text-text-secondary">Opportunity not found.</p><Link to="/student/opportunities" className="btn-primary mt-4">Back to Opportunities</Link></Card>;

  const student = mockStudents[0];
  const matched = opp.requiredSkills.filter(s => student.skills.includes(s.replace(' REST API', ' APIs').replace(' APIs', ' APIs')) || student.skills.includes(s));
  const missing = opp.requiredSkills.filter(s => !student.skills.includes(s));

  const handleApply = () => {
    setApplyStep(1);
    setApplyOpen(true);
  };

  const nextStep = () => {
    if (applyStep < 3) setApplyStep(applyStep + 1);
    else {
      setApplyOpen(false);
      toast.success('Application submitted successfully!');
      navigate('/student/applications');
    }
  };

  return (
    <div className="space-y-6">
      <Link to="/student/opportunities" className="inline-flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-main">
        <ArrowLeft className="w-4 h-4" />Back to Opportunities
      </Link>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="w-16 h-16 rounded-xl bg-primary-soft text-primary flex items-center justify-center text-2xl font-bold shrink-0">
            {opp.companyName.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant={opp.type === 'Internship' ? 'primary' : opp.type === 'Job' ? 'secondary' : 'accent'}>{opp.type}</Badge>
              <Badge variant="success">{opp.matchScore}% Match</Badge>
            </div>
            <h1 className="text-2xl font-bold text-main">{opp.title}</h1>
            <p className="text-text-secondary mt-1">{opp.companyName}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-text-secondary">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{opp.location}</span>
              <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" />{opp.workMode}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{opp.duration}</span>
              <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4" />{opp.stipend || opp.salary}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />Deadline: {opp.deadline}</span>
            </div>
          </div>
          <Button size="lg" onClick={handleApply}>Apply Now</Button>
        </div>
      </Card>

      <MatchExplanation matchScore={opp.matchScore} matchedSkills={matched} missingSkills={missing} totalRequired={opp.requiredSkills.length} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-main mb-3">Overview</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{opp.description}</p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold text-main mb-3 flex items-center gap-2"><Building2 className="w-4 h-4 text-primary" />About Company</h3>
            <p className="text-sm text-text-secondary">{opp.aboutCompany}</p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold text-main mb-3">Responsibilities</h3>
            <ul className="space-y-2">
              {opp.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />{r}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold text-main mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {opp.requiredSkills.map(s => <SkillBadge key={s} skill={s} />)}
            </div>
            <h3 className="font-semibold text-main mb-3">Preferred Skills</h3>
            <div className="flex flex-wrap gap-2">
              {opp.preferredSkills.map(s => <SkillBadge key={s} skill={s} variant="preferred" />)}
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-main mb-4">Eligibility</h3>
            <p className="text-sm text-text-secondary">{opp.eligibility}</p>
            <div className="mt-4 pt-4 border-t border-border space-y-3">
              <div><p className="text-xs text-text-secondary">Duration</p><p className="text-sm font-medium text-main">{opp.duration}</p></div>
              <div><p className="text-xs text-text-secondary">Stipend/Salary</p><p className="text-sm font-medium text-main">{opp.stipend || opp.salary}</p></div>
              <div><p className="text-xs text-text-secondary">Location</p><p className="text-sm font-medium text-main">{opp.location} · {opp.workMode}</p></div>
              <div><p className="text-xs text-text-secondary">Application Deadline</p><p className="text-sm font-medium text-main">{opp.deadline}</p></div>
              <div><p className="text-xs text-text-secondary">Posted Date</p><p className="text-sm font-medium text-main">{opp.postedDate}</p></div>
            </div>
          </Card>
        </div>
      </div>

      <Modal open={applyOpen} onClose={() => setApplyOpen(false)} title={`Apply to ${opp.title}`} size="md">
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map(step => (
              <div key={step} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${applyStep >= step ? 'bg-primary text-white' : 'bg-slate-100 text-text-muted'}`}>{step}</div>
                {step < 3 && <div className={`h-px flex-1 ${applyStep > step ? 'bg-primary' : 'bg-border'}`} />}
              </div>
            ))}
          </div>
          {applyStep === 1 && (
            <div>
              <h4 className="font-semibold text-main mb-3 flex items-center gap-2"><User className="w-4 h-4" />Confirm Your Profile</h4>
              <div className="rounded-lg border border-border p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-text-secondary">Name</span><span className="font-medium text-main">{student.name}</span></div>
                <div className="flex justify-between"><span className="text-text-secondary">College</span><span className="font-medium text-main">{student.college}</span></div>
                <div className="flex justify-between"><span className="text-text-secondary">Branch</span><span className="font-medium text-main">{student.branch}</span></div>
                <div className="flex justify-between"><span className="text-text-secondary">CGPA</span><span className="font-medium text-main">{student.cgpa}</span></div>
              </div>
            </div>
          )}
          {applyStep === 2 && (
            <div>
              <h4 className="font-semibold text-main mb-3 flex items-center gap-2"><FileText className="w-4 h-4" />Upload Resume</h4>
              <div className="rounded-lg border-2 border-dashed border-border p-8 text-center">
                <FileText className="w-8 h-8 text-text-muted mx-auto mb-2" />
                <p className="text-sm text-text-secondary">Click to upload or drag and drop</p>
                <p className="text-xs text-text-muted mt-1">PDF, DOC, DOCX up to 5MB</p>
                <Button variant="secondary" size="sm" className="mt-3">Choose File</Button>
              </div>
            </div>
          )}
          {applyStep === 3 && (
            <div>
              <h4 className="font-semibold text-main mb-3">Review & Submit</h4>
              <div className="rounded-lg border border-border p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-text-secondary">Position</span><span className="font-medium text-main">{opp.title}</span></div>
                <div className="flex justify-between"><span className="text-text-secondary">Company</span><span className="font-medium text-main">{opp.companyName}</span></div>
                <div className="flex justify-between"><span className="text-text-secondary">Match Score</span><span className="font-medium text-success">{opp.matchScore}%</span></div>
                <div className="flex justify-between"><span className="text-text-secondary">Resume</span><span className="font-medium text-primary">resume.pdf</span></div>
              </div>
            </div>
          )}
          <div className="flex justify-between">
            <Button variant="secondary" onClick={() => applyStep > 1 ? setApplyStep(applyStep - 1) : setApplyOpen(false)}>{applyStep > 1 ? 'Back' : 'Cancel'}</Button>
            <Button onClick={nextStep}>{applyStep < 3 ? 'Next' : 'Submit Application'}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
