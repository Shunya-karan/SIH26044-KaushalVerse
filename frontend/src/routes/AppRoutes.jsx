import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "@/layouts/PublicLayout";
import StudentLayout from "@/layouts/StudentLayout";
import CompanyLayout from "@/layouts/CompanyLayout";
import AdminLayout from "@/layouts/AdminLayout";
import ProtectedRoute from "@/routes/ProtectedRoute";

// Public pages
import Landing from "@/pages/public/Landing";
import HowItWorks from "@/pages/public/HowItWorks";
import About from "@/pages/public/About";
import Contact from "@/pages/public/Contact";
import Privacy from "@/pages/public/Privacy";
import Terms from "@/pages/public/Terms";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import GitHubOAuthCallback from "@/pages/auth/GitHubOAuthCallback";
import ForgotPassword from "@/pages/auth/ForgotPassword";

// Student pages
import StudentDashboard from "@/pages/student/StudentDashboard";
import StudentProfile from "@/pages/student/StudentProfile";
import StudentSkills from "@/pages/student/StudentSkills";
import SkillGapAnalysis from "@/pages/student/SkillGapAnalysis";
import LearningRoadmap from "@/pages/student/LearningRoadmap";
import StudentOpportunities from "@/pages/student/StudentOpportunities";
import OpportunityDetails from "@/pages/student/OpportunityDetails";
import StudentApplications from "@/pages/student/StudentApplications";
import ResumeIntelligence from "@/pages/student/ResumeIntelligence";
import CareerInsights from "@/pages/student/CareerInsights";
import StudentNotifications from "@/pages/student/StudentNotifications";
import SkillAssessment from "@/pages/student/SkillAssessment";
import SkillPassport from "@/pages/student/SkillPassport";
import SettingsPage from "@/pages/student/SettingsPage";
import ProjectsPortfolio from "@/pages/student/ProjectsPortfolio";

// Company pages
import CompanyDashboard from "@/pages/company/CompanyDashboard";
import CompanyProfile from "@/pages/company/CompanyProfile";
import PostOpportunity from "@/pages/company/PostOpportunity";
import CompanyOpportunities from "@/pages/company/CompanyOpportunities";
import CompanyApplications from "@/pages/company/CompanyApplications";
import CandidateMatching from "@/pages/company/CandidateMatching";
import CompanyAnalytics from "@/pages/company/CompanyAnalytics";
import CompanyNotifications from "@/pages/company/CompanyNotifications";
import CompetencyBlueprints from "@/pages/company/CompetencyBlueprints";
import InternshipEvaluation from "@/pages/company/InternshipEvaluation";

// Admin pages
import AdminOverview from "@/pages/admin/AdminOverview";
import AdminStudents from "@/pages/admin/AdminStudents";
import AdminCompanies from "@/pages/admin/AdminCompanies";
import AdminOpportunities from "@/pages/admin/AdminOpportunities";
import AdminApplications from "@/pages/admin/AdminApplications";
import AdminSkillTrends from "@/pages/admin/AdminSkillTrends";
import AdminPlacementAnalytics from "@/pages/admin/AdminPlacementAnalytics";
import AdminReports from "@/pages/admin/AdminReports";
import IndustryDemand from "@/pages/admin/IndustryDemand";

import FacultyLayout from "@/layouts/FacultyLayout";
import FacultyDashboard from "@/pages/faculty/FacultyDashboard";
import FacultyStudents from "@/pages/faculty/FacultyStudents";
import FacultySkillGaps from "@/pages/faculty/FacultySkillGaps";
import FacultyAssessments from "@/pages/faculty/FacultyAssessments";
import FacultyMentorship from "@/pages/faculty/FacultyMentorship";
import FacultyCollaboration from "@/pages/faculty/FacultyCollaboration";
import FacultyInternships from "@/pages/faculty/FacultyInternships";
import FacultyAnalytics from "@/pages/faculty/FacultyAnalytics";
import SkillVerification from "@/pages/faculty/SkillVerification";
import NotFound from "@/pages/public/NotFound";
import { useAuth } from "@/context/AuthContext";

function DemoAssessmentOnly() {
  const { user } = useAuth();
  return user?.isDemo ? <SkillAssessment /> : <Navigate to="/student/skills" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Route>

      {/* Auth routes (no navbar/footer chrome) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/github-callback" element={<GitHubOAuthCallback />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Student routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="skills" element={<StudentSkills />} />
        <Route path="projects" element={<ProjectsPortfolio />} />
        <Route path="assessment" element={<DemoAssessmentOnly />} />
        <Route path="skill-passport" element={<SkillPassport />} />
        <Route path="skill-gap" element={<SkillGapAnalysis />} />
        <Route path="roadmap" element={<LearningRoadmap />} />
        <Route path="opportunities" element={<StudentOpportunities />} />
        <Route path="opportunities/:id" element={<OpportunityDetails />} />
        <Route path="applications" element={<StudentApplications />} />
        <Route path="resume" element={<ResumeIntelligence />} />
        <Route path="insights" element={<CareerInsights />} />
        <Route path="notifications" element={<StudentNotifications />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Company routes */}
      <Route
        path="/company"
        element={
          <ProtectedRoute role="company">
            <CompanyLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<CompanyDashboard />} />
        <Route path="profile" element={<CompanyProfile />} />
        <Route path="post-opportunity" element={<PostOpportunity />} />
        <Route path="opportunities" element={<CompanyOpportunities />} />
        <Route path="applications" element={<CompanyApplications />} />
        <Route path="matching" element={<CandidateMatching />} />
        <Route path="blueprints" element={<CompetencyBlueprints />} />
        <Route path="evaluation" element={<InternshipEvaluation />} />
        <Route path="analytics" element={<CompanyAnalytics />} />
        <Route path="notifications" element={<CompanyNotifications />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Faculty routes */}
      <Route
        path="/faculty"
        element={
          <ProtectedRoute role="faculty">
            <FacultyLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<FacultyDashboard />} />
        <Route path="students" element={<FacultyStudents />} />
        <Route path="skill-gaps" element={<FacultySkillGaps />} />
        <Route path="assessments" element={<FacultyAssessments />} />
        <Route path="skill-verification" element={<SkillVerification />} />
        <Route path="mentorship" element={<FacultyMentorship />} />
        <Route path="internships" element={<FacultyInternships />} />
        <Route path="collaboration" element={<FacultyCollaboration />} />
        <Route path="analytics" element={<FacultyAnalytics />} />
      </Route>

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="overview" element={<AdminOverview />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="companies" element={<AdminCompanies />} />
        <Route path="opportunities" element={<AdminOpportunities />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="skill-trends" element={<AdminSkillTrends />} />
        <Route path="industry-demand" element={<IndustryDemand />} />
        <Route path="placement-analytics" element={<AdminPlacementAnalytics />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
