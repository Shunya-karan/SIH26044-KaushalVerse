import React, { createContext, useContext, useState } from 'react';
import { mockStudents } from '../data/mockStudents';
import { mockOpportunities } from '../data/mockOpportunities';
import { mockApplications } from '../data/mockApplications';
import { careerRoles, mockSkillTaxonomy } from '../data/mockSkills';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Student Profile & Skills
  const [studentProfile, setStudentProfile] = useState(mockStudents[0]);
  const [skills, setSkills] = useState(mockStudents[0].skills);

  // Opportunities
  const [opportunities, setOpportunities] = useState(mockOpportunities);
  const [savedOpportunityIds, setSavedOpportunityIds] = useState(['opp-001', 'opp-003']);

  // Applications
  const [applications, setApplications] = useState(mockApplications);

  // Target Career Role
  const [targetRoleId, setTargetRoleId] = useState('role-fullstack');

  // Company Applicant Reviews (Demo State)
  const [applicantCandidates, setApplicantCandidates] = useState([
    {
      id: 'cand-01',
      studentId: 'std-001',
      studentName: 'Aarav Sharma',
      avatar: 'AS',
      college: "Vivekanand Education Society's College (VESASC)",
      degree: 'B.Sc. IT (2026)',
      cgpa: 8.84,
      roleApplied: 'Frontend Developer Intern',
      opportunityId: 'opp-001',
      appliedDate: '02 Mar 2026',
      matchScore: 94,
      matchedSkills: ['React', 'JavaScript', 'Git', 'REST APIs', 'Tailwind CSS'],
      missingSkills: ['Testing (Jest/Cypress)'],
      matchReason: 'Possesses 4/4 core mandatory skills and 1 bonus skill with 2+ years practical project experience.',
      status: 'Shortlisted', // Applied, Under Review, Shortlisted, Interview, Rejected, Selected
      resumeUrl: '#',
    },
    {
      id: 'cand-02',
      studentId: 'std-002',
      studentName: 'Ananya Patel',
      avatar: 'AP',
      college: 'VJTI Mumbai',
      degree: 'B.Tech Comp Engg (2026)',
      cgpa: 9.15,
      roleApplied: 'Frontend Developer Intern',
      opportunityId: 'opp-001',
      appliedDate: '03 Mar 2026',
      matchScore: 82,
      matchedSkills: ['JavaScript', 'Git', 'REST APIs'],
      missingSkills: ['React', 'Tailwind CSS'],
      matchReason: 'Exceptional academic record with strong backend & Python proficiency; learning React currently.',
      status: 'Under Review',
      resumeUrl: '#',
    },
    {
      id: 'cand-03',
      studentId: 'std-004',
      studentName: 'Priya Shah',
      avatar: 'PS',
      college: 'SPIT Mumbai',
      degree: 'B.Tech Data Science (2026)',
      cgpa: 8.76,
      roleApplied: 'Frontend Developer Intern',
      opportunityId: 'opp-001',
      appliedDate: '04 Mar 2026',
      matchScore: 65,
      matchedSkills: ['Git', 'JavaScript'],
      missingSkills: ['React', 'REST APIs', 'Tailwind CSS'],
      matchReason: 'Data-focused skillset; partial match for core frontend framework expectations.',
      status: 'Applied',
      resumeUrl: '#',
    },
    {
      id: 'cand-04',
      studentId: 'std-005',
      studentName: 'Vikram Malhotra',
      avatar: 'VM',
      college: 'IIT Bombay',
      degree: 'B.Tech Computer Science (2025)',
      cgpa: 9.38,
      roleApplied: 'Backend API Engineer',
      opportunityId: 'opp-007',
      appliedDate: '05 Mar 2026',
      matchScore: 96,
      matchedSkills: ['REST APIs', 'SQL', 'Git', 'Redis', 'Docker'],
      missingSkills: ['Node.js'],
      matchReason: 'High distributed systems expertise and core algorithmic proficiency.',
      status: 'Shortlisted',
      resumeUrl: '#',
    }
  ]);

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Shortlisted for Interview',
      message: 'Razorpay shortlisted your application for Frontend Developer Intern.',
      time: '2 hours ago',
      read: false,
      type: 'success',
      link: '/student/applications'
    },
    {
      id: 'notif-2',
      title: 'Skill Gap Recommendation',
      message: 'Add Docker to your skills to boost your Full Stack match score to 90%.',
      time: 'Yesterday',
      read: false,
      type: 'info',
      link: '/student/skill-gap'
    },
    {
      id: 'notif-3',
      title: 'New Opportunity Alert',
      message: 'Tech Mahindra posted a new HealthTech graduate trainee role.',
      time: '2 days ago',
      read: true,
      type: 'alert',
      link: '/student/opportunities/opp-003'
    }
  ]);

  // Skill Management
  const addSkill = (newSkill) => {
    if (!skills.some((s) => s.name.toLowerCase() === newSkill.name.toLowerCase())) {
      setSkills((prev) => [...prev, newSkill]);
      return true;
    }
    return false;
  };

  const removeSkill = (skillName) => {
    setSkills((prev) => prev.filter((s) => s.name.toLowerCase() !== skillName.toLowerCase()));
  };

  const updateSkillProficiency = (skillName, newProficiency) => {
    setSkills((prev) =>
      prev.map((s) =>
        s.name.toLowerCase() === skillName.toLowerCase()
          ? { ...s, proficiency: newProficiency }
          : s
      )
    );
  };

  // Opportunities Management
  const toggleSaveOpportunity = (oppId) => {
    setSavedOpportunityIds((prev) =>
      prev.includes(oppId) ? prev.filter((id) => id !== oppId) : [...prev, oppId]
    );
  };

  const postOpportunity = (newOpp) => {
    const oppWithId = {
      ...newOpp,
      id: `opp-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
      matchScore: 85,
    };
    setOpportunities((prev) => [oppWithId, ...prev]);
    return oppWithId;
  };

  const applyForOpportunity = (opportunity, applicationDetails = {}) => {
    const existing = applications.find((a) => a.opportunityId === opportunity.id);
    if (existing) return { success: false, message: 'You have already applied to this position.' };

    const newApp = {
      id: `app-${Date.now()}`,
      opportunityId: opportunity.id,
      role: opportunity.title,
      companyName: opportunity.companyName,
      companyInitials: opportunity.companyInitials,
      companyColor: opportunity.companyColor,
      appliedDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Applied',
      matchScore: opportunity.matchScore || 85,
      lastUpdated: 'Just now',
      notes: 'Application submitted successfully with verified college credentials.',
      timeline: [
        { step: 'Applied', date: 'Today', completed: true, details: 'Application submitted via KaushalVerse.' },
        { step: 'Under Review', date: 'Pending', completed: false, details: 'Reviewing candidate qualifications.' },
        { step: 'Shortlisted', date: 'Pending', completed: false, details: 'Awaiting shortlist.' },
        { step: 'Interview', date: 'Pending', completed: false, details: 'Interview scheduling.' },
        { step: 'Decision', date: 'Pending', completed: false, details: 'Final hiring verdict.' }
      ]
    };

    setApplications((prev) => [newApp, ...prev]);

    // Also add to candidate list for company demo
    setApplicantCandidates((prev) => [
      {
        id: `cand-${Date.now()}`,
        studentId: studentProfile.id,
        studentName: studentProfile.name,
        avatar: studentProfile.avatar,
        college: studentProfile.college,
        degree: `${studentProfile.degree} (${studentProfile.graduationYear})`,
        cgpa: studentProfile.cgpa,
        roleApplied: opportunity.title,
        opportunityId: opportunity.id,
        appliedDate: 'Today',
        matchScore: opportunity.matchScore || 85,
        matchedSkills: opportunity.requiredSkills.filter(r => skills.some(s => s.name.toLowerCase() === r.toLowerCase())),
        missingSkills: opportunity.requiredSkills.filter(r => !skills.some(s => s.name.toLowerCase() === r.toLowerCase())),
        matchReason: `Auto-matched based on student's verified skills profile.`,
        status: 'Applied',
        resumeUrl: '#',
      },
      ...prev,
    ]);

    return { success: true, message: 'Application submitted successfully!' };
  };

  const updateCandidateStatus = (candidateId, newStatus) => {
    setApplicantCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, status: newStatus } : c))
    );
  };

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const currentTargetRole = careerRoles.find((r) => r.id === targetRoleId) || careerRoles[0];

  return (
    <AppContext.Provider
      value={{
        studentProfile,
        setStudentProfile,
        skills,
        addSkill,
        removeSkill,
        updateSkillProficiency,
        opportunities,
        postOpportunity,
        savedOpportunityIds,
        toggleSaveOpportunity,
        applications,
        applyForOpportunity,
        applicantCandidates,
        updateCandidateStatus,
        targetRoleId,
        setTargetRoleId,
        currentTargetRole,
        notifications,
        markNotificationAsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
