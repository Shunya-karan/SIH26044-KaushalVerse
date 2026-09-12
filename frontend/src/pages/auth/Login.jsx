import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { GraduationCap, Building2, ShieldCheck, UserRoundCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/common/Logo";
import { useAuth } from "@/context/AuthContext";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600));
    login("student");
    toast.success("Logged in successfully (demo mode)");
    navigate("/student/dashboard");
  };

  const demoLogin = (role) => {
    login(role);
    toast.success(`Continuing as ${role} demo`);
    navigate(`/${role}/${role === "admin" ? "overview" : "dashboard"}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center"><Logo showTagline /></div>
        <Card className="shadow-soft">
          <CardContent className="p-6 sm:p-8">
            <h1 className="text-xl font-bold text-foreground">Welcome back</h1>
            <p className="mt-1 text-sm text-muted-foreground">Log in to continue to your KaushalVerse dashboard.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
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
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                  <Checkbox {...register("remember")} /> Remember me
                </label>
                <Link to="/contact" className="text-sm font-medium text-primary hover:underline">Forgot password?</Link>
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">or continue with a demo account</span>
              <Separator className="flex-1" />
            </div>

            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => demoLogin("student")}>
                <GraduationCap className="h-4 w-4 text-primary" /> Continue as Student (Demo)
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => demoLogin("company")}>
                <Building2 className="h-4 w-4 text-secondary" /> Continue as Company (Demo)
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => demoLogin("faculty")}><UserRoundCheck className="h-4 w-4 text-accent" /> Continue as Institution (Demo)</Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => demoLogin("admin")}>
                <ShieldCheck className="h-4 w-4 text-roadmap" /> Continue as Admin (Demo)
              </Button>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account? <Link to="/register" className="font-medium text-primary hover:underline">Register</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
