import React from "react";
import { SectionLabel } from "@/components/common/States";

const SECTIONS = [
  { title: "1. Overview", body: "This Privacy Policy is a demo document for the KaushalVerse Smart India Hackathon prototype. No real user data is collected, stored, or transmitted to any backend service in this prototype." },
  { title: "2. Information We Would Collect", body: "In a production version, KaushalVerse would collect profile information (education, skills, resume), application activity, and usage analytics to power skill mapping and matching features." },
  { title: "3. How Information Would Be Used", body: "Information would be used solely to provide skill-gap analysis, opportunity matching, learning recommendations, and platform analytics for students, companies and institutions." },
  { title: "4. Data Sharing", body: "Student profile data would only be shared with companies for opportunities the student explicitly applies to. Institutions would see aggregated, anonymized analytics by default." },
  { title: "5. Data Security", body: "A production deployment would use industry-standard encryption, access controls and audit logging. This prototype uses local, frontend-only mock state and does not transmit data externally." },
  { title: "6. Your Rights", body: "Users would have the right to access, correct, export or delete their data at any time through account settings." },
  { title: "7. Contact", body: "For questions about this demo policy, use the Contact / Support page." },
];

export default function Privacy() {
  return (
    <div className="container-page py-16">
      <div className="mx-auto max-w-2xl text-center">
        <SectionLabel>Legal</SectionLabel>
        <h1 className="mt-4 text-3xl font-bold text-foreground">Privacy Policy</h1>
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
