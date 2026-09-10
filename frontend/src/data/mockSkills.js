export const skillCategories = [
  'All',
  'Frontend',
  'Backend',
  'Database',
  'DevOps & Cloud',
  'AI & Data Science',
  'Mobile Development',
  'HealthTech & Standards',
  'Soft Skills'
];

export const mockSkillTaxonomy = [
  { id: 'sk-01', name: 'JavaScript', category: 'Frontend', demand: 'Very High', growth: '+24%', verifiedEligible: true },
  { id: 'sk-02', name: 'React', category: 'Frontend', demand: 'Very High', growth: '+32%', verifiedEligible: true },
  { id: 'sk-03', name: 'Node.js', category: 'Backend', demand: 'High', growth: '+28%', verifiedEligible: true },
  { id: 'sk-04', name: 'Express', category: 'Backend', demand: 'High', growth: '+18%', verifiedEligible: true },
  { id: 'sk-05', name: 'SQL', category: 'Database', demand: 'Very High', growth: '+35%', verifiedEligible: true },
  { id: 'sk-06', name: 'Git', category: 'DevOps & Cloud', demand: 'High', growth: '+15%', verifiedEligible: true },
  { id: 'sk-07', name: 'REST APIs', category: 'Backend', demand: 'Very High', growth: '+26%', verifiedEligible: true },
  { id: 'sk-08', name: 'Tailwind CSS', category: 'Frontend', demand: 'High', growth: '+40%', verifiedEligible: true },
  { id: 'sk-09', name: 'Python', category: 'AI & Data Science', demand: 'Very High', growth: '+45%', verifiedEligible: true },
  { id: 'sk-10', name: 'Docker', category: 'DevOps & Cloud', demand: 'High', growth: '+38%', verifiedEligible: true },
  { id: 'sk-11', name: 'AWS', category: 'DevOps & Cloud', demand: 'High', growth: '+34%', verifiedEligible: true },
  { id: 'sk-12', name: 'Redis', category: 'Database', demand: 'Moderate', growth: '+22%', verifiedEligible: true },
  { id: 'sk-13', name: 'Testing (Jest/Cypress)', category: 'Frontend', demand: 'Moderate', growth: '+29%', verifiedEligible: true },
  { id: 'sk-14', name: 'TypeScript', category: 'Frontend', demand: 'Very High', growth: '+52%', verifiedEligible: true },
  { id: 'sk-15', name: 'MongoDB', category: 'Database', demand: 'Moderate', growth: '+14%', verifiedEligible: true },
  { id: 'sk-16', name: 'PostgreSQL', category: 'Database', demand: 'High', growth: '+36%', verifiedEligible: true },
  { id: 'sk-17', name: 'PyTorch', category: 'AI & Data Science', demand: 'High', growth: '+48%', verifiedEligible: true },
  { id: 'sk-18', name: 'Flutter / Dart', category: 'Mobile Development', demand: 'High', growth: '+31%', verifiedEligible: true },
  { id: 'sk-19', name: 'FHIR / ABDM Standards', category: 'HealthTech & Standards', demand: 'High', growth: '+62%', verifiedEligible: true },
  { id: 'sk-20', name: 'Agile & Scrum', category: 'Soft Skills', demand: 'High', growth: '+12%', verifiedEligible: true },
];

export const careerRoles = [
  {
    id: 'role-fullstack',
    title: 'Full Stack Developer',
    description: 'Build complete web applications spanning responsive frontend client interfaces to secure backend server architectures and data persistence layers.',
    averageCtc: '₹8.5 - ₹16 LPA',
    marketDemand: 'Very High',
    coreSkills: ['React', 'JavaScript', 'Node.js', 'Express', 'SQL', 'Git', 'REST APIs', 'Docker', 'Testing (Jest/Cypress)'],
    optionalSkills: ['Tailwind CSS', 'TypeScript', 'Redis', 'AWS', 'PostgreSQL'],
    weights: { core: 0.8, optional: 0.2 },
  },
  {
    id: 'role-backend',
    title: 'Backend Developer',
    description: 'Design robust APIs, microservices architectures, caching strategies, and database schemas with optimal throughput and fault tolerance.',
    averageCtc: '₹9.0 - ₹18 LPA',
    marketDemand: 'High',
    coreSkills: ['Node.js', 'Express', 'SQL', 'PostgreSQL', 'REST APIs', 'Git', 'Docker', 'Redis'],
    optionalSkills: ['Java', 'Python', 'AWS', 'Kubernetes', 'Kafka'],
    weights: { core: 0.85, optional: 0.15 },
  },
  {
    id: 'role-data-analyst',
    title: 'Data Analyst',
    description: 'Transform complex raw business & operational datasets into actionable insights, dashboards, and executive intelligence using statistical methods.',
    averageCtc: '₹6.5 - ₹12 LPA',
    marketDemand: 'Very High',
    coreSkills: ['SQL', 'Python', 'Pandas', 'Excel / Sheets', 'Power BI / Tableau', 'Statistics'],
    optionalSkills: ['R', 'Data Warehousing', 'Git', 'Business Communication'],
    weights: { core: 0.8, optional: 0.2 },
  },
  {
    id: 'role-aiml',
    title: 'AI/ML Engineer',
    description: 'Develop, evaluate, and optimize predictive statistical models, machine learning pipelines, and deep neural networks for real-world automation.',
    averageCtc: '₹10.5 - ₹22 LPA',
    marketDemand: 'Extremely High',
    coreSkills: ['Python', 'PyTorch', 'TensorFlow', 'NumPy', 'Pandas', 'Mathematics & Linear Algebra', 'Model Evaluation', 'Docker'],
    optionalSkills: ['MLOps', 'FastAPI', 'AWS SageMaker', 'Git'],
    weights: { core: 0.85, optional: 0.15 },
  },
  {
    id: 'role-uiux',
    title: 'UI/UX Designer',
    description: 'Conduct user research, design wireframes, high-fidelity design systems, and clickable prototypes ensuring WCAG accessibility standards.',
    averageCtc: '₹6.0 - ₹14 LPA',
    marketDemand: 'High',
    coreSkills: ['Figma', 'User Research', 'Wireframing', 'Design Systems', 'Prototyping', 'Accessibility (WCAG)'],
    optionalSkills: ['HTML/CSS', 'Micro-interactions', 'Design Handoff'],
    weights: { core: 0.8, optional: 0.2 },
  },
  {
    id: 'role-cloud',
    title: 'Cloud & DevOps Engineer',
    description: 'Automate CI/CD pipelines, manage infrastructure-as-code, and ensure high availability, scalability, and security of cloud infrastructure.',
    averageCtc: '₹9.5 - ₹20 LPA',
    marketDemand: 'Very High',
    coreSkills: ['Docker', 'AWS', 'Kubernetes', 'CI/CD Pipelines', 'Linux Administration', 'Git', 'Terraform'],
    optionalSkills: ['Python / Bash', 'Prometheus / Grafana', 'Networking'],
    weights: { core: 0.85, optional: 0.15 },
  },
  {
    id: 'role-healthtech',
    title: 'Digital Health Solutions Specialist',
    description: 'Bridge software engineering with healthcare interoperability standards (FHIR, ABDM, EHR systems) in alignment with Ministry of Health initiatives.',
    averageCtc: '₹8.0 - ₹17 LPA',
    marketDemand: 'High (National Priority)',
    coreSkills: ['FHIR / ABDM Standards', 'REST APIs', 'SQL', 'Data Privacy (DISHA/HIPAA)', 'Python', 'Electronic Health Records'],
    optionalSkills: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    weights: { core: 0.85, optional: 0.15 },
  }
];

export const learningRoadmapTemplates = {
  'role-fullstack': [
    {
      phase: 1,
      title: 'JavaScript & Modern ES6+ Mastery',
      duration: '3 Weeks',
      status: 'Completed',
      progress: 100,
      skillsGained: ['JavaScript', 'DOM Manipulation', 'Async/Await', 'ES Modules'],
      difficulty: 'Intermediate',
      resources: [
        { title: 'MDN Web Docs: Advanced JavaScript Guide', type: 'Documentation', free: true },
        { title: 'Namaste JavaScript Series by Akshay Saini', type: 'Video Course', free: true }
      ]
    },
    {
      phase: 2,
      title: 'React Architecture & State Ecosystem',
      duration: '4 Weeks',
      status: 'Completed',
      progress: 100,
      skillsGained: ['React', 'Custom Hooks', 'Context API', 'Component Lifecycle'],
      difficulty: 'Intermediate',
      resources: [
        { title: 'Official React.dev Interactive Tutorials', type: 'Documentation', free: true },
        { title: 'Fullstack Open - University of Helsinki (Part 1-4)', type: 'Accredited Course', free: true }
      ]
    },
    {
      phase: 3,
      title: 'Backend API Engineering & Auth',
      duration: '4 Weeks',
      status: 'In Progress',
      progress: 65,
      skillsGained: ['Node.js', 'Express', 'JWT Authentication', 'REST APIs'],
      difficulty: 'Intermediate',
      resources: [
        { title: 'The Odin Project: NodeJS Course', type: 'Hands-on Curriculum', free: true },
        { title: 'Designing RESTful Web APIs - NPTEL/IIT', type: 'Academic Lecture', free: true }
      ]
    },
    {
      phase: 4,
      title: 'Relational & NoSQL Data Modeling',
      duration: '3 Weeks',
      status: 'Upcoming',
      progress: 0,
      skillsGained: ['PostgreSQL', 'SQL Optimization', 'Redis Caching', 'Database Indexing'],
      difficulty: 'Advanced',
      resources: [
        { title: 'PostgreSQL Tutorial & Query Tuning', type: 'Documentation', free: true },
        { title: 'Redis University - RU101 Intro to Redis', type: 'Certification Course', free: true }
      ]
    },
    {
      phase: 5,
      title: 'Containerization, Testing & Cloud CI/CD',
      duration: '4 Weeks',
      status: 'Upcoming',
      progress: 0,
      skillsGained: ['Docker', 'Jest/Cypress Testing', 'AWS EC2/S3', 'GitHub Actions CI/CD'],
      difficulty: 'Advanced',
      resources: [
        { title: 'Docker for Developers - Docker Official Guides', type: 'Interactive Lab', free: true },
        { title: 'AWS Skill Builder: Cloud Practitioner Essentials', type: 'Official Training', free: true }
      ]
    }
  ]
};
