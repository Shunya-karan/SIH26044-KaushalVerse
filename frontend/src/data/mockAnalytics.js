export const mockAnalytics = {
  platformSummary: {
    totalStudents: 10450,
    totalCompanies: 520,
    totalOpportunities: 2680,
    averageSkillMatch: 84.6,
    totalPlacements: 1840,
    activeInternships: 920,
    averagePlacementCtc: '₹8.4 LPA',
    highestPlacementCtc: '₹34.0 LPA',
  },

  monthlyGrowth: [
    { month: 'Oct 25', students: 3200, companies: 180, placements: 210 },
    { month: 'Nov 25', students: 4800, companies: 240, placements: 450 },
    { month: 'Dec 25', students: 6300, companies: 310, placements: 790 },
    { month: 'Jan 26', students: 7900, companies: 390, placements: 1120 },
    { month: 'Feb 26', students: 9400, companies: 465, placements: 1540 },
    { month: 'Mar 26', students: 10450, companies: 520, placements: 1840 }
  ],

  topSkillsDemandVsSupply: [
    { skill: 'React', demand: 92, supply: 68 },
    { skill: 'Python', demand: 95, supply: 74 },
    { skill: 'SQL', demand: 88, supply: 79 },
    { skill: 'Docker', demand: 82, supply: 38 },
    { skill: 'AWS', demand: 78, supply: 42 },
    { skill: 'Node.js', demand: 85, supply: 64 },
    { skill: 'TypeScript', demand: 80, supply: 36 },
    { skill: 'FHIR / HealthTech', demand: 68, supply: 18 },
  ],

  branchPlacementRates: [
    { branch: 'Computer Engineering', placedRate: 92, totalStudents: 3400, avgCtc: 10.2 },
    { branch: 'Information Technology', placedRate: 89, totalStudents: 2900, avgCtc: 9.6 },
    { branch: 'Data Science & AI', placedRate: 94, totalStudents: 1450, avgCtc: 11.4 },
    { branch: 'Electronics & Telecom', placedRate: 78, totalStudents: 1800, avgCtc: 7.2 },
    { branch: 'Mechanical / Civil', placedRate: 64, totalStudents: 900, avgCtc: 5.8 }
  ],

  industryDistribution: [
    { name: 'FinTech & Payments', value: 28, color: '#0F766E' },
    { name: 'B2B SaaS & Cloud', value: 24, color: '#059669' },
    { name: 'HealthTech & Public Health', value: 18, color: '#7C3AED' },
    { name: 'IT Services & Consulting', value: 16, color: '#0284C7' },
    { name: 'E-Commerce & Logistics', value: 14, color: '#F97316' }
  ],

  salaryDistribution: [
    { range: '3 - 6 LPA', percentage: 22, count: 405 },
    { range: '6 - 10 LPA', percentage: 48, count: 883 },
    { range: '10 - 18 LPA', percentage: 24, count: 442 },
    { range: '18+ LPA', percentage: 6, count: 110 }
  ],

  skillGapRadarData: [
    { subject: 'Frontend Architecture', studentScore: 90, industryRequirement: 85 },
    { subject: 'Backend & APIs', studentScore: 75, industryRequirement: 85 },
    { subject: 'Database & SQL', studentScore: 80, industryRequirement: 80 },
    { subject: 'Containerization (Docker)', studentScore: 30, industryRequirement: 75 },
    { subject: 'Cloud & Deployment', studentScore: 40, industryRequirement: 70 },
    { subject: 'Automated Testing', studentScore: 35, industryRequirement: 65 },
  ]
};
