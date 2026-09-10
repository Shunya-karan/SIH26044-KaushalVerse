import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, X } from 'lucide-react';
import { PageHeader } from '@/components/common/Shared';
import { Card, Button, Input, Select, Textarea, Badge } from '@/components/ui';
import { allSkills } from '@/data/mockSkills';
import { useState } from 'react';

const schema = z.object({
  type: z.string().min(1, 'Select an opportunity type'),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  location: z.string().min(2, 'Location is required'),
  workMode: z.string().min(1, 'Select work mode'),
  duration: z.string().min(1, 'Duration is required'),
  stipend: z.string().optional(),
  salary: z.string().optional(),
  eligibility: z.string().min(5, 'Eligibility criteria is required'),
  deadline: z.string().min(1, 'Deadline is required'),
});

export default function PostOpportunity() {
  const navigate = useNavigate();
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [preferredSkills, setPreferredSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  const addSkill = (type) => {
    if (!skillInput) return;
    if (type === 'required') setRequiredSkills([...requiredSkills, skillInput]);
    else setPreferredSkills([...preferredSkills, skillInput]);
    setSkillInput('');
  };

  const removeSkill = (type, skill) => {
    if (type === 'required') setRequiredSkills(requiredSkills.filter(s => s !== skill));
    else setPreferredSkills(preferredSkills.filter(s => s !== skill));
  };

  const onSubmit = () => {
    toast.success('Opportunity posted successfully!');
    navigate('/company/opportunities');
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Post Opportunity" subtitle="Create a new internship, job or project listing" icon={PlusCircle} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card className="p-6">
          <h3 className="font-semibold text-main mb-4">Basic Information</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Select label="Opportunity Type" error={errors.type?.message} {...register('type')}>
              <option value="">Select type...</option>
              <option>Internship</option>
              <option>Job</option>
              <option>Project</option>
            </Select>
            <Input label="Title" placeholder="e.g. Frontend Developer Intern" error={errors.title?.message} {...register('title')} />
            <Select label="Work Mode" error={errors.workMode?.message} {...register('workMode')}>
              <option value="">Select mode...</option>
              <option>Remote</option>
              <option>Hybrid</option>
              <option>On-site</option>
            </Select>
            <Input label="Location" placeholder="e.g. Bengaluru, Karnataka" error={errors.location?.message} {...register('location')} />
            <Input label="Duration" placeholder="e.g. 6 months" error={errors.duration?.message} {...register('duration')} />
            <Input label="Application Deadline" type="date" error={errors.deadline?.message} {...register('deadline')} />
          </div>
          <div className="mt-4">
            <Textarea label="Description" rows={4} placeholder="Describe the role and responsibilities..." error={errors.description?.message} {...register('description')} />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-main mb-4">Compensation</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Stipend (for internships)" placeholder="e.g. ₹25,000/month" {...register('stipend')} />
            <Input label="Salary (for full-time)" placeholder="e.g. ₹6,00,000 - ₹8,00,000/year" {...register('salary')} />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-main mb-4">Skills Required</h3>
          <div className="flex gap-2 mb-4">
            <input className="input" placeholder="Type a skill and add..." list="skill-list" value={skillInput} onChange={e => setSkillInput(e.target.value)} />
            <datalist id="skill-list">{allSkills.map(s => <option key={s} value={s} />)}</datalist>
            <Button type="button" variant="secondary" onClick={() => addSkill('required')}>Add Required</Button>
            <Button type="button" variant="secondary" onClick={() => addSkill('preferred')}>Add Preferred</Button>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium text-main mb-2">Required Skills</p>
              <div className="flex flex-wrap gap-2">
                {requiredSkills.map(s => <Badge key={s} variant="primary">{s}<button type="button" onClick={() => removeSkill('required', s)}><X className="w-3 h-3" /></button></Badge>)}
                {requiredSkills.length === 0 && <p className="text-xs text-text-muted">No required skills added yet.</p>}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-main mb-2">Preferred Skills</p>
              <div className="flex flex-wrap gap-2">
                {preferredSkills.map(s => <Badge key={s} variant="accent">{s}<button type="button" onClick={() => removeSkill('preferred', s)}><X className="w-3 h-3" /></button></Badge>)}
                {preferredSkills.length === 0 && <p className="text-xs text-text-muted">No preferred skills added yet.</p>}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-main mb-4">Eligibility</h3>
          <Textarea label="Eligibility Criteria" rows={2} placeholder="e.g. B.Tech/B.E. in CS/IT, 2025 batch, CGPA 7.5+" error={errors.eligibility?.message} {...register('eligibility')} />
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => navigate('/company/opportunities')}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Posting...' : 'Post Opportunity'}</Button>
        </div>
      </form>
    </div>
  );
}
