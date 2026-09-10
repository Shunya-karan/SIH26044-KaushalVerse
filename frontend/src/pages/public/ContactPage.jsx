import { useState } from 'react';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, MessageSquare, Clock } from 'lucide-react';
import { Badge, Card, Button, Input, Textarea } from '@/components/ui';

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success('Message sent! We\'ll get back to you soon.');
      e.target.reset();
    }, 1000);
  };

  return (
    <div>
      <section className="bg-white border-b border-border py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="primary" className="mb-3">Contact & Support</Badge>
          <h1 className="text-4xl font-bold text-main">Get in touch</h1>
          <p className="mt-4 max-w-2xl mx-auto text-text-secondary">Have questions about KaushalVerse? We're here to help.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <Card className="p-6">
                <div className="w-10 h-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-semibold text-main">Email</h3>
                <p className="mt-1 text-sm text-text-secondary">For general inquiries</p>
                <a href="mailto:support@kaushalverse.example.com" className="mt-2 block text-sm font-medium text-primary">support@kaushalverse.example.com</a>
              </Card>
              <Card className="p-6">
                <div className="w-10 h-10 rounded-lg bg-secondary-light text-secondary flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-semibold text-main">Phone</h3>
                <p className="mt-1 text-sm text-text-secondary">Mon-Fri, 9am-6pm IST</p>
                <p className="mt-2 text-sm font-medium text-main">+91 80 1234 5678</p>
              </Card>
              <Card className="p-6">
                <div className="w-10 h-10 rounded-lg bg-accent-light text-accent flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-semibold text-main">Address</h3>
                <p className="mt-1 text-sm text-text-secondary">Hackathon Prototype</p>
                <p className="mt-2 text-sm text-main">Bengaluru, Karnataka, India</p>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-main">Send us a message</h3>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="Full Name" placeholder="Your name" required />
                    <Input label="Email" type="email" placeholder="you@example.com" required />
                  </div>
                  <Input label="Subject" placeholder="What's this about?" required />
                  <Textarea label="Message" rows={5} placeholder="Tell us how we can help..." required />
                  <Button type="submit" disabled={submitting}>
                    {submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-sm text-text-secondary">
            <Clock className="w-4 h-4" />
            <span>Typical response time: 24-48 hours on business days.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
