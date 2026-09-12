import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { SectionLabel } from "@/components/common/States";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 500));
    toast.success("Message sent — our demo support team will get back to you.");
    reset();
  };

  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-2xl text-center">
        <SectionLabel>Contact / Support</SectionLabel>
        <h1 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">We'd love to hear from you</h1>
        <p className="mt-3 text-muted-foreground">Reach out with questions, feedback or partnership interest (demo form).</p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-5 flex items-center gap-3">
              <div className="rounded-lg bg-primary-soft p-2.5 text-primary"><Mail className="h-4 w-4" /></div>
              <div>
                <p className="text-sm font-medium text-foreground">Email</p>
                <p className="text-sm text-muted-foreground">support.demo@kaushalverse.in</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex items-center gap-3">
              <div className="rounded-lg bg-secondary-light p-2.5 text-secondary"><Phone className="h-4 w-4" /></div>
              <div>
                <p className="text-sm font-medium text-foreground">Helpline (Demo)</p>
                <p className="text-sm text-muted-foreground">1800-XXX-XXXX</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex items-center gap-3">
              <div className="rounded-lg bg-accent-light p-2.5 text-accent"><MapPin className="h-4 w-4" /></div>
              <div>
                <p className="text-sm font-medium text-foreground">Hackathon HQ</p>
                <p className="text-sm text-muted-foreground">Smart India Hackathon, New Delhi</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Your name" {...register("name")} />
                  {errors.name && <p className="text-xs text-error">{errors.name.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
                  {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={5} placeholder="How can we help?" {...register("message")} />
                  {errors.message && <p className="text-xs text-error">{errors.message.message}</p>}
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
