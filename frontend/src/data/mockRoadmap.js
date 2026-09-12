export const LEARNING_ROADMAP = {
  goal: "Become a Full Stack Developer",
  phases: [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      status: "Completed",
      duration: "3 weeks",
      difficulty: "Beginner",
      skillGained: "JavaScript",
      resources: ["MDN JavaScript Guide", "freeCodeCamp JS Curriculum"],
    },
    {
      id: 2,
      title: "React Essentials",
      status: "Completed",
      duration: "4 weeks",
      difficulty: "Intermediate",
      skillGained: "React",
      resources: ["React Official Docs", "Build 5 mini projects"],
    },
    {
      id: 3,
      title: "Backend Development with Node.js",
      status: "In Progress",
      duration: "5 weeks",
      difficulty: "Intermediate",
      skillGained: "Node.js, Express",
      resources: ["Node.js Design Patterns", "Build a REST API from scratch"],
    },
    {
      id: 4,
      title: "Databases & Data Modeling",
      status: "Upcoming",
      duration: "3 weeks",
      difficulty: "Intermediate",
      skillGained: "SQL, MongoDB",
      resources: ["SQL for Developers", "Schema design workshop"],
    },
    {
      id: 5,
      title: "Deployment & Cloud Basics",
      status: "Upcoming",
      duration: "3 weeks",
      difficulty: "Advanced",
      skillGained: "Docker, AWS",
      resources: ["Docker in Practice", "AWS Cloud Practitioner path"],
    },
  ],
};

export const RESUME_ANALYSIS = {
  score: 82,
  sections: {
    skillsDetected: ["React", "JavaScript", "Node.js", "Git", "REST APIs", "SQL"],
    experience: "2 internships, 1 freelance project",
    education: "B.Tech CSE, Delhi Technological University — CGPA 8.4",
    projects: 4,
    missingKeywords: ["Docker", "Testing", "CI/CD"],
    atsReadiness: 76,
  },
  recommendations: [
    "Add Docker to your technical skills section.",
    "Quantify your project achievements with measurable outcomes.",
    "Add REST API experience details to your most recent project.",
    "Include a dedicated 'Certifications' section if applicable.",
  ],
};
