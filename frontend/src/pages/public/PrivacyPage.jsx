import { Badge } from '@/components/ui';

export default function PrivacyPage() {
  const sections = [
    { title: 'Information We Collect', content: 'KaushalVerse collects information you provide during registration including your name, email, account type and profile details such as education, skills and resume data. As a prototype, no data is sent to an external backend.' },
    { title: 'How We Use Your Information', content: 'Your information is used to provide skill mapping, opportunity matching, and personalized learning roadmaps. Companies use candidate information for recruitment purposes. Administrators use aggregate data for analytics and reporting.' },
    { title: 'Data Storage & Security', content: 'As a Smart India Hackathon prototype, KaushalVerse uses local frontend state for demonstration purposes. In a production deployment, data would be stored in encrypted databases with row-level security and role-based access control.' },
    { title: 'Information Sharing', content: 'Your personal information is shared with companies only when you apply to their opportunities. Aggregate, anonymized analytics may be shared with institutions for reporting purposes. We do not sell your data to third parties.' },
    { title: 'Your Rights', content: 'You have the right to access, update or delete your profile information at any time through your account settings. You can also control what information is visible to companies and institutions.' },
    { title: 'Cookies & Tracking', content: 'KaushalVerse uses minimal local storage to maintain your session and preferences. We do not use third-party tracking cookies or advertising networks.' },
    { title: 'Children\'s Privacy', content: 'KaushalVerse is designed for college students and professionals. The platform is not intended for individuals under 18 years of age.' },
    { title: 'Changes to This Policy', content: 'We may update this privacy policy as the platform evolves. Users will be notified of significant changes through the platform notifications system.' },
  ];

  return (
    <div>
      <section className="bg-white border-b border-border py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge variant="primary" className="mb-3">Legal</Badge>
          <h1 className="text-4xl font-bold text-main">Privacy Policy</h1>
          <p className="mt-3 text-text-secondary">Last updated: September 2025</p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none">
            <p className="text-text-secondary leading-relaxed">
              This Privacy Policy describes how KaushalVerse handles your information. As a Smart India Hackathon prototype, this platform uses local mock data and does not connect to an external backend.
            </p>
            {sections.map((s, i) => (
              <div key={i} className="mt-8">
                <h2 className="text-xl font-semibold text-main">{i + 1}. {s.title}</h2>
                <p className="mt-2 text-text-secondary leading-relaxed">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
