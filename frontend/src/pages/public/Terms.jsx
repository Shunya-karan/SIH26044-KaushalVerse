import React from "react";
import { SectionLabel } from "@/components/common/States";

const SECTIONS = [
  { title: "1. Acceptance of Terms", body: "By using this KaushalVerse prototype, you acknowledge it is a Smart India Hackathon conceptual demonstration and not a production service." },
  { title: "2. Demo Nature of the Platform", body: "All data — students, companies, opportunities, applications and analytics — is mock/sample data generated for demonstration purposes. No real transactions, placements or offers occur." },
  { title: "3. No Government Endorsement", body: "KaushalVerse is not an officially approved, certified or endorsed Government of India product. References to government context are for problem-statement framing only." },
  { title: "4. Acceptable Use", body: "This prototype is provided for evaluation and demonstration purposes as part of a hackathon submission." },
  { title: "5. Intellectual Property", body: "Company names shown are used purely as realistic sample data for demonstration and are trademarks of their respective owners." },
  { title: "6. Limitation of Liability", body: "This prototype is provided 'as is' without warranties of any kind, for evaluation purposes only." },
  { title: "7. Changes to Terms", body: "These demo terms may be updated as the prototype evolves during and after the hackathon." },
];

export default function Terms() {
  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-2xl text-center">
        <SectionLabel>Legal</SectionLabel>
        <h1 className="mt-4 text-3xl font-bold text-foreground">Terms of Use</h1>
        <p className="mt-3 text-sm text-muted-foreground">Demo document — Smart India Hackathon prototype. Last updated September 2026.</p>
      </div>
      <div className="mx-auto mt-10 max-w-3xl space-y-6">
        {SECTIONS.map((s) => (
          <div key={s.title}>
            <h2 className="text-base font-semibold text-foreground">{s.title}</h2>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
