export const mockStudents = [
  {
    id: 'std-001',
    name: 'Aarav Sharma',
    avatar: 'AS',
    email: 'aarav.sharma@ves.ac.in',
    phone: '+91 98201 45678',
    college: "Vivekanand Education Society's College (VESASC)",
    university: 'University of Mumbai',
    degree: 'Bachelor of Science (Information Technology)',
    branch: 'Information Technology',
    currentSemester: 'Semester 6',
    graduationYear: 2026,
    cgpa: 8.84,
    location: 'Chembur, Mumbai, Maharashtra',
    headline: 'Aspiring Full Stack Engineer & Cloud Enthusiast | SIH Contributor',
    about: 'Pre-final year IT undergraduate with strong fundamentals in modern web frameworks, component architecture, and cloud deployment. Actively building production-focused prototypes with clean architecture and maintainable code.',
    readinessScore: 88,
    profileCompletion: 92,
    skills: [
      { name: 'JavaScript', category: 'Frontend', proficiency: 'Advanced', years: 3, verified: true },
      { name: 'React', category: 'Frontend', proficiency: 'Advanced', years: 2, verified: true },
      { name: 'Node.js', category: 'Backend', proficiency: 'Intermediate', years: 2, verified: true },
      { name: 'Express', category: 'Backend', proficiency: 'Intermediate', years: 2, verified: true },
      { name: 'SQL', category: 'Database', proficiency: 'Intermediate', years: 2, verified: true },
      { name: 'Git', category: 'DevOps', proficiency: 'Advanced', years: 3, verified: true },
      { name: 'REST APIs', category: 'Backend', proficiency: 'Advanced', years: 2, verified: true },
      { name: 'Tailwind CSS', category: 'Frontend', proficiency: 'Advanced', years: 2, verified: true },
      { name: 'Python', category: 'Programming', proficiency: 'Intermediate', years: 1.5, verified: false },
      { name: 'Docker', category: 'DevOps', proficiency: 'Beginner', years: 0.5, verified: false },
    ],
    certifications: [
      { title: 'Meta Front-End Developer Professional Certificate', issuer: 'Coursera / Meta', date: 'Nov 2025' },
      { title: 'AWS Certified Cloud Practitioner (Foundational)', issuer: 'Amazon Web Services', date: 'Jan 2026' },
      { title: 'NPTEL Cloud Computing Elite Certificate', issuer: 'IIT Kharagpur', date: 'Oct 2025' }
    ],
    projects: [
      {
        title: 'KaushalVerse Skill Intelligence Portal',
        description: 'Academia-industry skill mapping and placement readiness portal built for Smart India Hackathon.',
        tech: ['React', 'Tailwind CSS', 'Vite', 'Recharts'],
        link: 'https://github.com/aaravsharma/kaushalverse'
      },
      {
        title: 'MedVault - Ayushman Digital Locker',
        description: 'ABDM-compatible personal health records gateway for clinic patient tracking.',
        tech: ['Node.js', 'React', 'PostgreSQL', 'FHIR API'],
        link: 'https://github.com/aaravsharma/medvault'
      }
    ]
  },
  {
    id: 'std-002',
    name: 'Ananya Patel',
    avatar: 'AP',
    email: 'ananya.patel@vjti.ac.in',
    college: 'Veermata Jijabai Technological Institute (VJTI)',
    university: 'University of Mumbai',
    degree: 'B.Tech in Computer Engineering',
    branch: 'Computer Engineering',
    graduationYear: 2026,
    cgpa: 9.15,
    location: 'Matunga, Mumbai',
    readinessScore: 94,
    skills: [
      { name: 'Python', category: 'Programming', proficiency: 'Advanced', years: 3, verified: true },
      { name: 'PyTorch', category: 'AI/ML', proficiency: 'Intermediate', years: 2, verified: true },
      { name: 'SQL', category: 'Database', proficiency: 'Advanced', years: 2, verified: true },
      { name: 'FastAPI', category: 'Backend', proficiency: 'Intermediate', years: 1.5, verified: true },
      { name: 'Docker', category: 'DevOps', proficiency: 'Intermediate', years: 1, verified: false },
    ]
  },
  {
    id: 'std-003',
    name: 'Rahul Verma',
    avatar: 'RV',
    email: 'rahul.verma@coep.ac.in',
    college: 'College of Engineering Pune (COEP Technological University)',
    university: 'COEP',
    degree: 'B.Tech in Computer Engineering',
    branch: 'Computer Engineering',
    graduationYear: 2025,
    cgpa: 8.42,
    location: 'Shivajinagar, Pune',
    readinessScore: 82,
    skills: [
      { name: 'Java', category: 'Programming', proficiency: 'Advanced', years: 3, verified: true },
      { name: 'Spring Boot', category: 'Backend', proficiency: 'Intermediate', years: 2, verified: true },
      { name: 'PostgreSQL', category: 'Database', proficiency: 'Intermediate', years: 2, verified: true },
      { name: 'Kubernetes', category: 'DevOps', proficiency: 'Beginner', years: 0.5, verified: false },
    ]
  },
  {
    id: 'std-004',
    name: 'Priya Shah',
    avatar: 'PS',
    email: 'priya.shah@spit.ac.in',
    college: 'Sardar Patel Institute of Technology (SPIT)',
    university: 'University of Mumbai',
    degree: 'B.Tech in Data Science',
    branch: 'Data Science',
    graduationYear: 2026,
    cgpa: 8.76,
    location: 'Andheri, Mumbai',
    readinessScore: 86,
    skills: [
      { name: 'Python', category: 'Programming', proficiency: 'Advanced', years: 2.5, verified: true },
      { name: 'Pandas', category: 'Data', proficiency: 'Advanced', years: 2, verified: true },
      { name: 'Power BI', category: 'Data', proficiency: 'Intermediate', years: 1.5, verified: true },
      { name: 'SQL', category: 'Database', proficiency: 'Advanced', years: 2, verified: true },
    ]
  },
  {
    id: 'std-005',
    name: 'Vikram Malhotra',
    avatar: 'VM',
    email: 'vikram.m@iitb.ac.in',
    college: 'Indian Institute of Technology Bombay (IIT Bombay)',
    university: 'IIT Bombay',
    degree: 'B.Tech in Computer Science',
    branch: 'Computer Science',
    graduationYear: 2025,
    cgpa: 9.38,
    location: 'Powai, Mumbai',
    readinessScore: 96,
    skills: [
      { name: 'C++', category: 'Programming', proficiency: 'Advanced', years: 4, verified: true },
      { name: 'Go', category: 'Programming', proficiency: 'Intermediate', years: 2, verified: true },
      { name: 'Distributed Systems', category: 'Architecture', proficiency: 'Advanced', years: 2, verified: true },
      { name: 'Kafka', category: 'Backend', proficiency: 'Intermediate', years: 1.5, verified: true },
    ]
  }
];
