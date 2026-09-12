import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { GraduationCap, Building2, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/common/Logo";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const schema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  accountType: z.enum(["student", "company", "institution"]),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const ACCOUNT_TYPES = [
  { value: "student", label: "Student", icon: GraduationCap },
  { value: "company", label: "Company", icon: Building2 },
  { value: "institution", label: "Institution", icon: Landmark },
];

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, control, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "", accountType: "student" },
  });
  const accountType = watch("accountType");

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 600));
    const role = data.accountType === "institution" ? "admin" : data.accountType;
    login(role);
    toast.success("Account created (demo mode). Welcome to KaushalVerse!");
    navigate(`/${role}/${role === "admin" ? "overview" : "dashboard"}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center"><Logo showTagline /></div>
        <Card className="shadow-soft">
          <CardContent className="p-6 sm:p-8">
            <h1 className="text-xl font-bold text-foreground">Create your account</h1>
            <p className="mt-1 text-sm text-muted-foreground">Join KaushalVerse as a student, company or institution.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <Label>Account Type</Label>
                <Controller
                  control={control}
                  name="accountType"
                  render={({ field }) => (
                    <div className="grid grid-cols-3 gap-2">
                      {ACCOUNT_TYPES.map((t) => (
                        <button
                          type="button"
                          key={t.value}
                          onClick={() => field.onChange(t.value)}
                          className={cn(
                            "flex flex-col items-center gap-1.5 rounded-md border px-2 py-3 text-xs font-medium transition-colors",
                            field.value === t.value ? "border-primary bg-primary-soft text-primary" : "border-border text-muted-foreground hover:bg-muted"
                          )}
                        >
                          <t.icon className="h-4 w-4" /> {t.label}
                        </button>
                      ))}
                    </div>
                  )}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="Enter your full name" {...register("fullName")} />
                {errors.fullName && <p className="text-xs text-error">{errors.fullName.message}</p>}
              </div>
              <div className="space-y-1.5">
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
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating account..." : `Create ${accountType} account`}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Login</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
