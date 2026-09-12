export const SKILL_CATALOG = [
  "JavaScript", "TypeScript", "React", "Node.js", "Express", "SQL", "Python", "Java",
  "Git", "Docker", "REST APIs", "MongoDB", "AWS", "Redis", "Testing", "GraphQL",
  "Kubernetes", "CI/CD", "Figma", "UI/UX Design", "Data Structures", "Machine Learning",
  "Pandas", "TensorFlow", "Communication", "Teamwork", "Problem Solving", "Leadership",
];

export const CAREER_ROLES = [
  {
    id: "fullstack",
    name: "Full Stack Developer",
    requiredSkills: ["React", "JavaScript", "Node.js", "SQL", "Git", "REST APIs", "Docker", "Redis", "Testing"],
  },
  {
    id: "backend",
    name: "Backend Developer",
    requiredSkills: ["Node.js", "Express", "SQL", "MongoDB", "REST APIs", "Docker", "AWS", "Testing"],
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    requiredSkills: ["SQL", "Python", "Pandas", "Data Structures", "Communication", "Problem Solving"],
  },
  {
    id: "data-scientist",
    name: "Data Scientist",
    requiredSkills: ["Python", "Machine Learning", "Pandas", "TensorFlow", "SQL", "Data Structures"],
  },
  {
    id: "ml-engineer",
    name: "AI/ML Engineer",
    requiredSkills: ["Python", "Machine Learning", "TensorFlow", "Data Structures", "AWS", "Docker"],
  },
  {
    id: "ui-ux",
    name: "UI/UX Designer",
    requiredSkills: ["Figma", "UI/UX Design", "Communication", "Problem Solving", "Teamwork"],
  },
  {
    id: "cloud",
    name: "Cloud Engineer",
    requiredSkills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Git", "REST APIs"],
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity Analyst",
    requiredSkills: ["Testing", "REST APIs", "SQL", "Problem Solving", "AWS", "Git"],
  },
];

export const STUDENT_SKILLS = [
  { id: 1, name: "React", proficiency: "Advanced", years: 2, verified: true },
  { id: 2, name: "JavaScript", proficiency: "Advanced", years: 2.5, verified: true },
  { id: 3, name: "Node.js", proficiency: "Intermediate", years: 1.5, verified: true },
  { id: 4, name: "SQL", proficiency: "Intermediate", years: 1, verified: false },
  { id: 5, name: "Git", proficiency: "Advanced", years: 2, verified: true },
  { id: 6, name: "REST APIs", proficiency: "Intermediate", years: 1.5, verified: true },
  { id: 7, name: "Python", proficiency: "Beginner", years: 0.5, verified: false },
  { id: 8, name: "Communication", proficiency: "Advanced", years: 3, verified: false },
  { id: 9, name: "Teamwork", proficiency: "Advanced", years: 3, verified: false },
];

export const SKILL_DEMAND_TRENDS = [
  { skill: "Python", demand: 92, trend: "Very High Demand" },
  { skill: "SQL", demand: 88, trend: "Very High Demand" },
  { skill: "React", demand: 85, trend: "High Demand" },
  { skill: "AWS", demand: 78, trend: "Growing" },
  { skill: "Docker", demand: 74, trend: "Growing" },
  { skill: "Machine Learning", demand: 81, trend: "High Demand" },
  { skill: "TypeScript", demand: 69, trend: "Growing" },
  { skill: "Kubernetes", demand: 63, trend: "Emerging" },
];

export const EMERGING_SKILLS = ["Generative AI Tooling", "LLM Integration", "Kubernetes", "Edge Computing", "Data Engineering"];
