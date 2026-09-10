export const mockApplications = [
  {
    id: 'app-101',
    opportunityId: 'opp-001',
    role: 'Frontend Developer Intern',
    companyName: 'Razorpay',
    companyInitials: 'RZ',
    companyColor: '#0C2340',
    appliedDate: '2026-03-02',
    status: 'Shortlisted', // Applied, Under Review, Shortlisted, Interview, Selected, Rejected
    matchScore: 92,
    lastUpdated: '2026-03-07',
    notes: 'Resume passed ATS check with 88 score. Selected for Round 1 Technical Screening.',
    timeline: [
      { step: 'Applied', date: '02 Mar 2026', completed: true, details: 'Application submitted via KaushalVerse with verified college credentials.' },
      { step: 'Under Review', date: '04 Mar 2026', completed: true, details: 'Reviewed by Technical Talent Acquisition team.' },
      { step: 'Shortlisted', date: '07 Mar 2026', completed: true, details: 'Skill profile matched 7/8 core frontend requirements. Shortlisted.' },
      { step: 'Technical Interview', date: '14 Mar 2026 (Upcoming)', completed: false, details: '1-hour live coding & system fundamentals evaluation.' },
      { step: 'Decision', date: 'Pending', completed: false, details: 'Final offer letter / selection verdict.' }
    ]
  },
  {
    id: 'app-102',
    opportunityId: 'opp-002',
    role: 'Full Stack Engineering Intern',
    companyName: 'Zoho Corporation',
    companyInitials: 'ZH',
    companyColor: '#C8202F',
    appliedDate: '2026-02-28',
    status: 'Under Review',
    matchScore: 85,
    lastUpdated: '2026-03-05',
    notes: 'Application documents submitted to Zoho University Relations division.',
    timeline: [
      { step: 'Applied', date: '28 Feb 2026', completed: true, details: 'Application submitted along with project portfolio.' },
      { step: 'Under Review', date: '05 Mar 2026', completed: true, details: 'Reviewing problem solving and coding submissions.' },
      { step: 'Shortlisted', date: 'Pending', completed: false, details: 'Awaiting shortlist announcement.' },
      { step: 'Technical Interview', date: 'Pending', completed: false, details: 'Interview slot allocation.' },
      { step: 'Decision', date: 'Pending', completed: false, details: 'Final verdict.' }
    ]
  },
  {
    id: 'app-103',
    opportunityId: 'opp-008',
    role: 'Smart Health Monitoring Capstone Project',
    companyName: 'Tech Mahindra',
    companyInitials: 'TM',
    companyColor: '#9E1B32',
    appliedDate: '2026-03-07',
    status: 'Applied',
    matchScore: 88,
    lastUpdated: '2026-03-07',
    notes: 'Project team registration acknowledged. Mentor assignment in progress.',
    timeline: [
      { step: 'Applied', date: '07 Mar 2026', completed: true, details: 'Team proposal submitted under SIH prototype category.' },
      { step: 'Under Review', date: 'Pending', completed: false, details: 'Institutional endorsement verification.' },
      { step: 'Shortlisted', date: 'Pending', completed: false, details: 'Mentor interview.' },
      { step: 'Decision', date: 'Pending', completed: false, details: 'Milestone grant award.' }
    ]
  }
];
