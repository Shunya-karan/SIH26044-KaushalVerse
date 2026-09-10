import { Badge, Card } from '@/components/ui';
import { Network, TrendingUp, Building2, GraduationCap, Shield, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      <section className="bg-white border-b border-border py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge variant="primary" className="mb-3">About KaushalVerse</Badge>
          <h1 className="text-4xl font-bold text-main">Bridging the academia-industry skill gap</h1>
          <p className="mt-4 max-w-3xl text-lg text-text-secondary leading-relaxed">
            KaushalVerse is a digital Academia-Industry Collaboration Platform that connects students, academic institutions and companies through intelligent skill mapping, internship discovery and placement opportunities.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: GraduationCap, title: 'Our Mission', desc: 'To bridge the gap between academic skills and industry requirements by providing transparent, data-driven skill mapping and career guidance.' },
              { icon: Lightbulb, title: 'Our Vision', desc: 'A future where every student has access to clear career pathways, and every company can find the right talent with confidence.' },
              { icon: Network, title: 'Our Approach', desc: 'We use explainable matching algorithms — no black boxes. Students and companies both understand why a match score is what it is.' },
            ].map((item, i) => (
              <Card key={i} className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="mt-4 font-semibold text-main text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-main mb-2">Institutional Context</h2>
          <p className="text-text-secondary mb-8">Smart India Hackathon — Government of India</p>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-semibold text-main">Smart India Hackathon</h3>
                  <p className="text-sm text-text-secondary">Ministry of Education, Government of India</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                KaushalVerse is developed as a Smart India Hackathon prototype addressing the problem statement: "Portal for Academia-Industry Collaboration for Skill Mapping, Internships and Placement."
              </p>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-text-muted">
                  This is a conceptual demonstration. KaushalVerse is not an officially endorsed government product.
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-8 h-8 text-accent" />
                <div>
                  <h3 className="font-semibold text-main">Ministry of Health & Family Welfare</h3>
                  <p className="text-sm text-text-secondary">Government of India</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                The problem statement is associated with the Government of India / Ministry of Health & Family Welfare context, aligned with digital innovation and skill development initiatives.
              </p>
              <div className="mt-4 pt-4 border-t border-border space-y-3">
                <div>
                  <p className="text-xs text-text-secondary">Union Minister of Health & Family Welfare</p>
                  <p className="text-sm font-medium text-main">Shri Jagat Prakash Nadda</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Secretary, Health & Family Welfare</p>
                  <p className="text-sm font-medium text-main">Ms. Punya Salila Srivastava</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-main mb-8">Who KaushalVerse Serves</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: GraduationCap, title: 'Students', desc: 'Map skills, find opportunities, and follow personalized learning paths to career success.' },
              { icon: Building2, title: 'Institutions', desc: 'Track student readiness, monitor placement analytics and manage the academic-to-industry pipeline.' },
              { icon: TrendingUp, title: 'Companies', desc: 'Post opportunities, discover matched candidates and manage the hiring pipeline transparently.' },
              { icon: Shield, title: 'Administrators', desc: 'Oversee the entire ecosystem with comprehensive analytics, trends and reporting tools.' },
            ].map((item, i) => (
              <Card key={i} className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center mx-auto">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="mt-4 font-semibold text-main">{item.title}</h3>
                <p className="mt-2 text-sm text-text-secondary">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
