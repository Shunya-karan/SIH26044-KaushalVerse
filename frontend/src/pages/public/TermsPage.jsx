import { Badge } from '@/components/ui';

export default function TermsPage() {
  const sections = [
    { title: 'Acceptance of Terms', content: 'By accessing and using KaushalVerse, you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.' },
    { title: 'Platform Description', content: 'KaushalVerse is a digital Academia-Industry Collaboration Platform that provides skill mapping, internship discovery, placement opportunities and career guidance for students, institutions and companies.' },
    { title: 'User Accounts', content: 'You must provide accurate information during registration. You are responsible for maintaining the security of your account and for all activities under your account. Accounts are categorized as Student, Company or Institution.' },
    { title: 'Student Responsibilities', content: 'Students must provide truthful information about their skills, education and experience. Misrepresentation of skills or qualifications may result in account suspension. Students are responsible for the accuracy of their resume and profile data.' },
    { title: 'Company Responsibilities', content: 'Companies must provide accurate opportunity descriptions, stipend/salary details and eligibility criteria. Companies agree to evaluate candidates fairly and not discriminate based on gender, religion, caste or other protected characteristics.' },
    { title: 'Prohibited Conduct', content: 'Users must not post false or misleading content, harass other users, attempt to access unauthorized data, or use the platform for any illegal purpose. Violations may result in immediate account termination.' },
    { title: 'Intellectual Property', content: 'KaushalVerse and its content, features and functionality are owned by the platform developers. User-generated content remains the property of the user, who grants the platform a license to display it for matching and recruitment purposes.' },
    { title: 'Disclaimers', content: 'KaushalVerse is a Smart India Hackathon prototype provided "as is" without warranties. Match scores and recommendations are algorithmic suggestions and do not guarantee employment or hiring outcomes. The platform is not an officially endorsed government product.' },
    { title: 'Limitation of Liability', content: 'KaushalVerse shall not be liable for any indirect, incidental or consequential damages arising from use of the platform. The platform is not responsible for the conduct of users or the outcomes of applications or hiring decisions.' },
    { title: 'Termination', content: 'We reserve the right to suspend or terminate accounts that violate these Terms. Users may delete their accounts at any time through account settings.' },
    { title: 'Changes to Terms', content: 'We may update these Terms as the platform evolves. Continued use after changes constitutes acceptance of the updated Terms.' },
  ];

  return (
    <div>
      <section className="bg-white border-b border-border py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge variant="primary" className="mb-3">Legal</Badge>
          <h1 className="text-4xl font-bold text-main">Terms of Service</h1>
          <p className="mt-3 text-text-secondary">Last updated: September 2025</p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-text-secondary leading-relaxed">
            These Terms of Service govern your use of KaushalVerse, a Smart India Hackathon prototype platform for academia-industry collaboration.
          </p>
          {sections.map((s, i) => (
            <div key={i} className="mt-8">
              <h2 className="text-xl font-semibold text-main">{i + 1}. {s.title}</h2>
              <p className="mt-2 text-text-secondary leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
