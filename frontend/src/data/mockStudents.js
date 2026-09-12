export const CURRENT_STUDENT = {
  id: "stu-001",
  name: "Aarav Sharma",
  email: "aarav.sharma@demo.kaushalverse.in",
  college: "Delhi Technological University",
  degree: "B.Tech",
  branch: "Computer Science & Engineering",
  graduationYear: 2026,
  cgpa: 8.4,
  location: "New Delhi, India",
  about: "Final year CSE student passionate about full-stack development and building products that solve real problems. Actively preparing for placements.",
  profileCompletion: 82,
  readinessScore: 74,
  skillScore: 78,
  avatarColor: "bg-primary-soft text-primary",
};

export const STUDENTS_LIST = [
  { id: "stu-001", name: "Aarav Sharma", college: "Delhi Technological University", branch: "CSE", skills: ["React", "Node.js", "SQL"], readiness: 74, applications: 5, status: "Active" },
  { id: "stu-002", name: "Ananya Patel", college: "VJTI Mumbai", branch: "Information Technology", skills: ["Python", "ML", "Pandas"], readiness: 81, applications: 8, status: "Active" },
  { id: "stu-003", name: "Rahul Verma", college: "IIT (BHU) Varanasi", branch: "CSE", skills: ["React", "JavaScript", "Git", "REST APIs"], readiness: 91, applications: 6, status: "Active" },
  { id: "stu-004", name: "Priya Shah", college: "PES University", branch: "ISE", skills: ["Figma", "UI/UX Design"], readiness: 68, applications: 3, status: "Active" },
  { id: "stu-005", name: "Karthik Iyer", college: "NIT Trichy", branch: "ECE", skills: ["Python", "AWS", "Docker"], readiness: 77, applications: 4, status: "Active" },
  { id: "stu-006", name: "Sneha Reddy", college: "BITS Pilani", branch: "CSE", skills: ["Java", "SQL", "Testing"], readiness: 85, applications: 7, status: "Suspended" },
  { id: "stu-007", name: "Vivaan Gupta", college: "Manipal Institute of Technology", branch: "CSE", skills: ["Node.js", "MongoDB"], readiness: 63, applications: 2, status: "Active" },
  { id: "stu-008", name: "Ishita Nair", college: "SRM Institute of Science & Technology", branch: "IT", skills: ["React", "TypeScript"], readiness: 72, applications: 5, status: "Active" },
];

export const CANDIDATES_FOR_MATCHING = [
  { id: "stu-003", name: "Rahul Verma", college: "IIT (BHU) Varanasi", match: 94, matched: ["React", "JavaScript", "Git", "REST APIs"], missing: ["Testing"], resumeScore: 88 },
  { id: "stu-001", name: "Aarav Sharma", college: "Delhi Technological University", match: 87, matched: ["React", "JavaScript", "Node.js"], missing: ["Testing", "Docker"], resumeScore: 82 },
  { id: "stu-008", name: "Ishita Nair", college: "SRM Institute of Science & Technology", match: 79, matched: ["React", "JavaScript"], missing: ["Node.js", "Git", "Testing"], resumeScore: 75 },
  { id: "stu-007", name: "Vivaan Gupta", college: "Manipal Institute of Technology", match: 71, matched: ["Node.js"], missing: ["React", "Git", "Testing"], resumeScore: 69 },
  { id: "stu-004", name: "Priya Shah", college: "PES University", match: 58, matched: ["Git"], missing: ["React", "Node.js", "JavaScript", "Testing"], resumeScore: 64 },
];
