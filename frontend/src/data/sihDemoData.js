export const SIH_STUDENT = {
  id: 'student-aarav',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@kaushalverse.demo',
  program: 'B.Sc. Computer Science',
  institution: 'KaushalVerse Demo Institute',
  targetRole: 'Healthcare Data Analyst Intern',
};

export const COMPETENCY_BLUEPRINT = {
  id: 'blueprint-healthcare-analyst',
  role: 'Healthcare Data Analyst Intern',
  company: 'HealthTech Analytics Labs',
  industry: 'Healthcare Analytics',
  mandatorySkills: [
    { name: 'Python', required: 4, demand: 'High' },
    { name: 'SQL', required: 4, demand: 'High' },
    { name: 'Statistics', required: 3, demand: 'High' },
  ],
  preferredSkills: [
    { name: 'Power BI', required: 4, demand: 'High' },
    { name: 'Healthcare Analytics', required: 2, demand: 'Growing' },
  ],
  softSkills: [
    { name: 'Communication', required: 3, demand: 'High' },
    { name: 'Teamwork', required: 3, demand: 'Medium' },
  ],
};

export const SIH_SKILLS_INITIAL = [
  { id: 101, name: 'Python', proficiency: 'Advanced', level: 4, score: 82, target: 5, verified: true, evidence: ['Assessment', 'Project', 'Certificate'], category: 'Technical', demand: 'High', assessed: 'Sep 06, 2026', years: 1 },
  { id: 102, name: 'SQL', proficiency: 'Intermediate', level: 3, score: 78, target: 4, verified: true, evidence: ['Assessment', 'Project'], category: 'Technical', demand: 'High', assessed: 'Sep 07, 2026', years: 1 },
  { id: 103, name: 'Power BI', proficiency: 'Beginner', level: 2, score: 48, target: 4, verified: false, evidence: ['Self Declared'], category: 'Analytics', demand: 'High', assessed: 'Sep 02, 2026', years: 0.5 },
  { id: 104, name: 'Statistics', proficiency: 'Intermediate', level: 3, score: 72, target: 3, verified: true, evidence: ['Assessment'], category: 'Analytics', demand: 'High', assessed: 'Sep 05, 2026', years: 1 },
  { id: 105, name: 'Communication', proficiency: 'Advanced', level: 4, score: 76, target: 3, verified: false, evidence: ['Faculty Review'], category: 'Soft Skill', demand: 'High', assessed: 'Sep 04, 2026', years: 3 },
  { id: 106, name: 'Healthcare Analytics', proficiency: 'Beginner', level: 1, score: 42, target: 2, verified: false, evidence: ['Self Declared'], category: 'Domain', demand: 'Growing', assessed: 'Sep 01, 2026', years: 0.2 },
  { id: 107, name: 'Teamwork', proficiency: 'Advanced', level: 4, score: 84, target: 3, verified: true, evidence: ['Faculty Review', 'Project'], category: 'Soft Skill', demand: 'Medium', assessed: 'Sep 03, 2026', years: 2 },
];

export const ASSESSMENT_QUESTIONS = [
  { id: 1, skill: 'Python', difficulty: 'Intermediate', question: 'Which data structure stores key-value pairs in Python?', options: ['List', 'Tuple', 'Dictionary', 'Set'], answer: 'Dictionary' },
  { id: 2, skill: 'Python', difficulty: 'Intermediate', question: 'What does len([10, 20, 30]) return?', options: ['2', '3', '4', '30'], answer: '3' },
  { id: 3, skill: 'Python', difficulty: 'Advanced', question: 'Which library is commonly used for tabular data analysis?', options: ['Pandas', 'Flask', 'Tkinter', 'PyGame'], answer: 'Pandas' },
  { id: 4, skill: 'Python', difficulty: 'Advanced', question: 'What does a Python function return when it reaches the end without return?', options: ['0', 'False', 'None', 'Empty string'], answer: 'None' },
  { id: 5, skill: 'Python', difficulty: 'Intermediate', question: 'Which keyword handles exceptions?', options: ['catch', 'try', 'error', 'excepts'], answer: 'try' },
  { id: 6, skill: 'SQL', difficulty: 'Intermediate', question: 'Which SQL clause filters rows before grouping?', options: ['HAVING', 'WHERE', 'ORDER BY', 'GROUP BY'], answer: 'WHERE' },
  { id: 7, skill: 'SQL', difficulty: 'Intermediate', question: 'Which JOIN returns matching rows from both tables?', options: ['INNER JOIN', 'FULL JOIN', 'CROSS JOIN', 'SELF JOIN'], answer: 'INNER JOIN' },
  { id: 8, skill: 'SQL', difficulty: 'Advanced', question: 'Which function counts rows?', options: ['SUM()', 'COUNT()', 'TOTAL()', 'ROWS()'], answer: 'COUNT()' },
  { id: 9, skill: 'SQL', difficulty: 'Advanced', question: 'Which clause filters grouped results?', options: ['WHERE', 'HAVING', 'LIMIT', 'DISTINCT'], answer: 'HAVING' },
  { id: 10, skill: 'SQL', difficulty: 'Intermediate', question: 'Which command adds a new row to a table?', options: ['ALTER', 'INSERT', 'UPDATE', 'CREATE'], answer: 'INSERT' },
  { id: 11, skill: 'Statistics', difficulty: 'Intermediate', question: 'Which measure represents the middle value of ordered data?', options: ['Mean', 'Median', 'Variance', 'Range'], answer: 'Median' },
  { id: 12, skill: 'Statistics', difficulty: 'Intermediate', question: 'What does standard deviation measure?', options: ['Central value', 'Spread of data', 'Sample size', 'Correlation only'], answer: 'Spread of data' },
  { id: 13, skill: 'Statistics', difficulty: 'Advanced', question: 'A correlation close to +1 indicates:', options: ['Strong positive relationship', 'Strong negative relationship', 'No relationship', 'Causation'], answer: 'Strong positive relationship' },
  { id: 14, skill: 'Statistics', difficulty: 'Advanced', question: 'What is the purpose of a confidence interval?', options: ['Estimate a population parameter range', 'Remove outliers', 'Increase sample size', 'Prove causation'], answer: 'Estimate a population parameter range' },
  { id: 15, skill: 'Statistics', difficulty: 'Intermediate', question: 'What is the mean of 2, 4 and 6?', options: ['3', '4', '5', '6'], answer: '4' },
  { id: 16, skill: 'Power BI', difficulty: 'Intermediate', question: 'Which Power BI feature is primarily used to create relationships between tables?', options: ['Power Query', 'Model View', 'Report Canvas', 'Bookmarks'], answer: 'Model View' },
  { id: 17, skill: 'Power BI', difficulty: 'Intermediate', question: 'Which DAX function is commonly used to calculate a value over a filtered table?', options: ['CALCULATE', 'CONCATENATE', 'FORMAT', 'DISTINCT'], answer: 'CALCULATE' },
  { id: 18, skill: 'Power BI', difficulty: 'Advanced', question: 'Which visualization is most suitable for showing KPI performance against a target?', options: ['KPI/Card', 'Pie chart', 'Scatter only', 'Slicer'], answer: 'KPI/Card' },
  { id: 19, skill: 'Power BI', difficulty: 'Advanced', question: 'What is the strongest reason to use a star schema in analytics modeling?', options: ['Fewer visuals', 'Simpler and efficient analytical queries', 'No need for relationships', 'Removes measures'], answer: 'Simpler and efficient analytical queries' },
  { id: 20, skill: 'Power BI', difficulty: 'Intermediate', question: 'Power Query is mainly used for:', options: ['Data preparation and transformation', 'Writing DAX only', 'Hosting dashboards', 'Sending emails'], answer: 'Data preparation and transformation' },
  { id: 21, skill: 'Healthcare Analytics', difficulty: 'Intermediate', question: 'Which metric measures the percentage of patients who are readmitted after discharge?', options: ['Readmission rate', 'Bed occupancy', 'Average length of stay', 'Mortality count'], answer: 'Readmission rate' },
  { id: 22, skill: 'Healthcare Analytics', difficulty: 'Intermediate', question: 'Why is patient data privacy important in analytics?', options: ['To increase chart colors', 'To protect sensitive health information', 'To reduce database size', 'To remove all statistics'], answer: 'To protect sensitive health information' },
  { id: 23, skill: 'Healthcare Analytics', difficulty: 'Advanced', question: 'Which measure can help identify how long patients typically stay admitted?', options: ['Average Length of Stay', 'Click-through rate', 'Conversion rate', 'Net promoter score'], answer: 'Average Length of Stay' },
  { id: 24, skill: 'Healthcare Analytics', difficulty: 'Advanced', question: 'What is a useful first step before comparing outcomes across hospitals?', options: ['Ignore patient mix', 'Check data definitions and population differences', 'Delete missing values blindly', 'Compare only totals'], answer: 'Check data definitions and population differences' },
  { id: 25, skill: 'Healthcare Analytics', difficulty: 'Intermediate', question: 'Which type of data is a patient diagnosis code?', options: ['Clinical/domain data', 'UI data', 'Network data', 'Source code'], answer: 'Clinical/domain data' },
];

export const ASSESSMENT_SKILLS = ['Python', 'SQL', 'Statistics', 'Power BI', 'Healthcare Analytics'];

export const ROADMAP_STEPS = [
  { id: 'r1', skill: 'Power BI', title: 'Learn Power BI fundamentals', duration: '5 days', type: 'Learning', difficulty: 'Beginner', progress: 60, expected: '+12 pts', reason: 'Largest gap against your target role and high industry demand.' },
  { id: 'r2', skill: 'Power BI', title: 'Build Healthcare Analytics Dashboard', duration: '7 days', type: 'Practical Project', difficulty: 'Intermediate', progress: 25, expected: '+10 pts', reason: 'Build evidence instead of relying only on self-declared knowledge.' },
  { id: 'r3', skill: 'Power BI', title: 'Complete targeted assessment', duration: '30 min', type: 'Assessment', difficulty: 'Advanced', progress: 0, expected: '+6 pts', reason: 'Validate the improvement and update your verified skill score.' },
  { id: 'r4', skill: 'Healthcare Analytics', title: 'Learn healthcare KPI concepts', duration: '4 days', type: 'Domain Learning', difficulty: 'Beginner', progress: 20, expected: '+8 pts', reason: 'Close the second-highest gap for the target role.' },
];

export const MATCH_WEIGHTS = [
  ['Required skill match', 50],
  ['Verified skills', 20],
  ['Assessment performance', 15],
  ['Projects / experience', 10],
  ['Soft skills', 5],
];

export const INDUSTRY_DEMAND = [
  { skill: 'Python', demand: 'High', demandScore: 92, students: 82, trend: '+18%' },
  { skill: 'SQL', demand: 'High', demandScore: 88, students: 61, trend: '+13%' },
  { skill: 'Power BI', demand: 'High', demandScore: 86, students: 28, trend: '+34%' },
  { skill: 'Cloud', demand: 'Medium', demandScore: 72, students: 37, trend: '+11%' },
  { skill: 'Cybersecurity', demand: 'High', demandScore: 81, students: 19, trend: '+21%' },
];

export const FACULTY_STUDENTS = [
  { name: 'Aarav Sharma', readiness: 84, gap: 'Power BI', internship: 'In progress', status: 'On track' },
  { name: 'Priya Nair', readiness: 79, gap: 'Cloud', internship: 'Not started', status: 'Needs mentoring' },
  { name: 'Rohan Mehta', readiness: 88, gap: 'Communication', internship: 'Completed', status: 'Placement ready' },
];

export const INTERNSHIP_EVALUATION = {
  company: 'HealthTech Analytics Labs',
  role: 'Healthcare Data Analyst Intern',
  mentor: 'Dr. Neha Kulkarni',
  skills: [
    { name: 'Python', score: 4 },
    { name: 'SQL', score: 4 },
    { name: 'Problem Solving', score: 4 },
    { name: 'Communication', score: 3 },
    { name: 'Teamwork', score: 5 },
  ],
};
