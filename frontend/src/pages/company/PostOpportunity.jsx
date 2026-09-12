import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/States";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { SKILL_CATALOG } from "@/data/mockSkills";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const schema = z.object({
  opportunityType: z.enum(["Internship", "Job", "Project"]),
  title: z.string().min(3, "Title is required"),
  description: z.string().min(20, "Provide a more detailed description (20+ characters)"),
  location: z.string().min(2, "Location is required"),
  mode: z.enum(["Remote", "Hybrid", "On-site"]),
  duration: z.string().min(2, "Duration is required"),
  compensation: z.string().min(1, "Stipend/Salary is required"),
  eligibility: z.string().min(5, "Eligibility criteria is required"),
  deadline: z.string().min(1, "Deadline is required"),
});

function SkillPicker({ label, selected, setSelected }) {
  const toggle = (skill) => {
    setSelected(selected.includes(skill) ? selected.filter((s) => s !== skill) : [...selected, skill]);
  };
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-1.5 rounded-md border border-border p-3 max-h-40 overflow-y-auto">
        {SKILL_CATALOG.map((s) => (
          <button
            type="button"
            key={s}
            onClick={() => toggle(s)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              selected.includes(s) ? "border-primary bg-primary-soft text-primary" : "border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selected.map((s) => (
            <Badge key={s} variant="default" className="pr-1">
              {s}
              <button type="button" onClick={() => toggle(s)} className="ml-1"><X className="h-3 w-3" /></button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PostOpportunity() {
  const navigate = useNavigate();
  const [requiredSkills, setRequiredSkills] = useState(["React", "JavaScript"]);
  const [preferredSkills, setPreferredSkills] = useState([]);

  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      opportunityType: "Internship", title: "", description: "", location: "", mode: "Hybrid",
      duration: "", compensation: "", eligibility: "", deadline: "",
    },
  });

  const onSubmit = async () => {
    if (requiredSkills.length === 0) {
      toast.error("Select at least one required skill");
      return;
    }
    await new Promise((r) => setTimeout(r, 700));
    toast.success("Opportunity posted successfully (demo)");
    navigate("/company/opportunities");
  };

  return (
    <div>
      <PageHeader title="Post Opportunity" description="Create a new internship, job or project listing." />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>Opportunity Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Opportunity Type</Label>
                  <Controller
                    control={control}
                    name="opportunityType"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Internship">Internship</SelectItem>
                          <SelectItem value="Job">Job</SelectItem>
                          <SelectItem value="Project">Project</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="e.g. Frontend Developer Intern" {...register("title")} />
                  {errors.title && <p className="text-xs text-error">{errors.title.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" rows={5} placeholder="Describe the role and what the candidate will work on..." {...register("description")} />
                  {errors.description && <p className="text-xs text-error">{errors.description.message}</p>}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g. Bengaluru, Karnataka" {...register("location")} />
                    {errors.location && <p className="text-xs text-error">{errors.location.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label>Work Mode</Label>
                    <Controller
                      control={control}
                      name="mode"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Remote">Remote</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                            <SelectItem value="On-site">On-site</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
              <CardContent className="space-y-5">
                <SkillPicker label="Required Skills" selected={requiredSkills} setSelected={setRequiredSkills} />
                <SkillPicker label="Preferred Skills" selected={preferredSkills} setSelected={setPreferredSkills} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Eligibility &amp; Timeline</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="eligibility">Eligibility</Label>
                  <Input id="eligibility" placeholder="e.g. Pre-final / final year, CSE/IT" {...register("eligibility")} />
                  {errors.eligibility && <p className="text-xs text-error">{errors.eligibility.message}</p>}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" placeholder="e.g. 6 months" {...register("duration")} />
                    {errors.duration && <p className="text-xs text-error">{errors.duration.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="deadline">Application Deadline</Label>
                    <Input id="deadline" type="date" {...register("deadline")} />
                    {errors.deadline && <p className="text-xs text-error">{errors.deadline.message}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Compensation</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="compensation">Stipend / Salary</Label>
                  <Input id="compensation" placeholder="e.g. ₹40,000/month or ₹6 LPA" {...register("compensation")} />
                  {errors.compensation && <p className="text-xs text-error">{errors.compensation.message}</p>}
                </div>
              </CardContent>
            </Card>
            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Publishing..." : "Publish Opportunity"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
