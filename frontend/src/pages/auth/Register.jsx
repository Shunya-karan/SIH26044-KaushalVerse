import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  GraduationCap,
  Landmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/common/Logo";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const schema = z
  .object({
    fullName: z.string().min(2, "Enter your full name"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    accountType: z.enum(["student", "company", "institution"]),
    college: z.string().optional(),
    degree: z.string().optional(),
    branch: z.string().optional(),
    currentYear: z.string().optional(),
    semester: z.string().optional(),
    graduationYear: z.string().optional(),
    cgpa: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .superRefine((data, ctx) => {
    if (data.accountType !== "student") return;
    const requiredFields = [
      ["college", "Enter your college or institution"],
      ["degree", "Select your degree or course"],
      ["branch", "Enter your field or branch"],
      ["currentYear", "Select your current year"],
      ["semester", "Select your semester"],
      ["graduationYear", "Enter your graduation year"],
    ];
    requiredFields.forEach(([field, message]) => {
      if (!data[field]?.trim()) ctx.addIssue({ code: z.ZodIssueCode.custom, path: [field], message });
    });
  });

const ACCOUNT_TYPES = [
  { value: "student", label: "Student", icon: GraduationCap },
  { value: "company", label: "Company", icon: Building2 },
  { value: "institution", label: "Institution", icon: Landmark },
];

const DEGREE_OPTIONS = [
  "B.Sc.",
  "BCA",
  "B.Tech",
  "B.E.",
  "M.Sc.",
  "MCA",
  "M.Tech",
  "Diploma",
  "Other",
];

const YEAR_OPTIONS = ["First Year", "Second Year", "Third Year", "Final Year"];
const SEMESTER_OPTIONS = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"];

export default function Register() {
  const navigate = useNavigate();
  const { login, registerAccount } = useAuth();
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      accountType: "student",
      college: "",
      degree: "",
      branch: "",
      currentYear: "",
      semester: "",
      graduationYear: "",
      cgpa: "",
    },
  });

  const accountType = watch("accountType");

  const goToAcademicDetails = async () => {
    const valid = await trigger([
      "fullName",
      "email",
      "password",
      "confirmPassword",
      "accountType",
    ]);

    if (valid) setStep(2);
  };

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 450));

      if (data.accountType === "student") {
        registerAccount(data);
        toast.success("Account details saved. Please log in to continue.");
        navigate("/login", { state: { registeredEmail: data.email } });
        return;
      }

      const role = data.accountType === "institution" ? "admin" : data.accountType;
      login(role);
      toast.success("Account created (demo mode). Welcome to KaushalVerse!");
      navigate(`/${role}/${role === "admin" ? "overview" : "dashboard"}`);
    } catch (error) {
      toast.error(error.message || "Unable to create account");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background via-background to-primary-soft/20 px-4 py-10 sm:py-12">
      <div className="w-full max-w-xl">
        <div className="mb-7 flex justify-center">
          <Logo showTagline />
        </div>

        <Card className="overflow-hidden border-border/70 shadow-soft">
          <CardContent className="p-6 sm:p-8">
            <div className="mb-7 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  Student onboarding
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Step {step} of 2
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-1.5 w-12 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-full rounded-full bg-primary" />
                </div>
                <div className="h-1.5 w-12 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-full rounded-full bg-primary transition-all duration-300",
                      step === 2 ? "w-full" : "w-0"
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {step === 1 ? "Create your account" : "Tell us about your education"}
              </h1>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                {step === 1
                  ? "Start with your account details. You’ll add the minimum academic information needed for your student profile next."
                  : "These details help KaushalVerse understand your academic background and personalize your opportunities."}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {step === 1 ? (
                <>
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <Controller
                      control={control}
                      name="accountType"
                      render={({ field }) => (
                        <div className="grid grid-cols-3 gap-2.5">
                          {ACCOUNT_TYPES.map((type) => (
                            <button
                              type="button"
                              key={type.value}
                              onClick={() => field.onChange(type.value)}
                              className={cn(
                                "group flex min-h-[76px] flex-col items-center justify-center gap-2 rounded-xl border px-2 py-3 text-xs font-medium transition-all",
                                field.value === type.value
                                  ? "border-primary bg-primary-soft/70 text-primary shadow-sm"
                                  : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:bg-muted/50"
                              )}
                            >
                              <type.icon className="h-5 w-5" />
                              {type.label}
                            </button>
                          ))}
                        </div>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" placeholder="Enter your full name" {...register("fullName")} />
                      {errors.fullName && <p className="text-xs text-error">{errors.fullName.message}</p>}
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
                      {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
                      {errors.password && <p className="text-xs text-error">{errors.password.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input id="confirmPassword" type="password" placeholder="••••••••" {...register("confirmPassword")} />
                      {errors.confirmPassword && <p className="text-xs text-error">{errors.confirmPassword.message}</p>}
                    </div>
                  </div>

                  {accountType === "student" ? (
                    <Button type="button" className="h-11 w-full" onClick={goToAcademicDetails}>
                      Continue to academic details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" className="h-11 w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Creating account..." : `Create ${accountType} account`}
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <div className="rounded-xl border border-primary/15 bg-primary-soft/30 p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Academic profile</p>
                        <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                          Required details for your student identity and opportunity matching.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="college">College / Institution *</Label>
                      <Input id="college" placeholder="Search or enter your college" {...register("college")} />
                      {errors.college && <p className="text-xs text-error">{errors.college.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="degree">Degree / Course *</Label>
                      <select
                        id="degree"
                        {...register("degree")}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                      >
                        <option value="">Select degree</option>
                        {DEGREE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
                      </select>
                      {errors.degree && <p className="text-xs text-error">{errors.degree.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="branch">Field / Branch *</Label>
                      <Input id="branch" placeholder="e.g. Computer Science" {...register("branch")} />
                      {errors.branch && <p className="text-xs text-error">{errors.branch.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="currentYear">Current Year *</Label>
                      <select
                        id="currentYear"
                        {...register("currentYear")}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                      >
                        <option value="">Select year</option>
                        {YEAR_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
                      </select>
                      {errors.currentYear && <p className="text-xs text-error">{errors.currentYear.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="semester">Current Semester *</Label>
                      <select
                        id="semester"
                        {...register("semester")}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                      >
                        <option value="">Select semester</option>
                        {SEMESTER_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
                      </select>
                      {errors.semester && <p className="text-xs text-error">{errors.semester.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="graduationYear">Expected Graduation Year *</Label>
                      <Input id="graduationYear" placeholder="e.g. 2027" inputMode="numeric" {...register("graduationYear")} />
                      {errors.graduationYear && <p className="text-xs text-error">{errors.graduationYear.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="cgpa">CGPA / Percentage <span className="font-normal text-muted-foreground">(optional)</span></Label>
                      <Input id="cgpa" placeholder="e.g. 8.4" {...register("cgpa")} />
                    </div>
                  </div>

                  <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-between">
                    <Button type="button" variant="outline" className="h-11" onClick={() => setStep(1)}>
                      <ArrowLeft className="mr-1 h-4 w-4" />
                      Back
                    </Button>
                    <Button type="submit" className="h-11 sm:min-w-[220px]" disabled={isSubmitting}>
                      {isSubmitting ? "Creating account..." : "Create Student Account"}
                      {!isSubmitting && <CheckCircle2 className="ml-1 h-4 w-4" />}
                    </Button>
                  </div>
                </>
              )}
            </form>

            <p className="mt-7 text-center text-sm text-muted-foreground">
              Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Login</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
