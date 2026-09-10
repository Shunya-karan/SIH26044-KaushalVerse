import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../layouts/PublicLayout';
import { StudentLayout } from '../layouts/StudentLayout';
import { CompanyLayout } from '../layouts/CompanyLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// Public Pages
import { LandingPage } from '../pages/public/LandingPage';
import { HowItWorksPage } from '../pages/public/HowItWorksPage';
import { AboutPage } from '../pages/public/AboutPage';
import { ContactPage } from '../pages/public/ContactPage';
import { PrivacyPage } from '../pages/public/PrivacyPage';
import { TermsPage } from '../pages/public/TermsPage';

// Auth Pages
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';

// Student Pages
import { StudentDashboard } from '../pages/student/StudentDashboard';
import { StudentProfile } from '../pages/student/StudentProfile';
import { MySkills } from '../pages/student/MySkills';
import { SkillGapAnalysis } from '../pages/student/SkillGapAnalysis';
import { LearningRoadmap } from '../pages/student/LearningRoadmap';
import { OpportunitiesPage } from '../pages/student/OpportunitiesPage';
import { OpportunityDetailsPage } from '../pages/student/OpportunityDetailsPage';
import { MyApplicationsPage } from '../pages/student/MyApplicationsPage';
import { ResumeIntelligencePage } from '../pages/student/ResumeIntelligencePage';
import { CareerInsightsPage } from '../pages/student/CareerInsightsPage';
import { NotificationsPage } from '../pages/student/NotificationsPage';
import { StudentSettings } from '../pages/student/StudentSettings';

// Company Pages
import { CompanyDashboard } from '../pages/company/CompanyDashboard';
import { CompanyProfile } from '../pages/company/CompanyProfile';
import { PostOpportunity } from '../pages/company/PostOpportunity';
import { MyOpportunities } from '../pages/company/MyOpportunities';
import { ApplicationManagement } from '../pages/company/ApplicationManagement';
import { CandidateMatching } from '../pages/company/CandidateMatching';
import { CompanyAnalytics } from '../pages/company/CompanyAnalytics';
import { CompanySettings } from '../pages/company/CompanySettings';

// Admin Pages
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminStudents } from '../pages/admin/AdminStudents';
import { AdminCompanies } from '../pages/admin/AdminCompanies';
import { AdminOpportunities } from '../pages/admin/AdminOpportunities';
import { AdminApplications } from '../pages/admin/AdminApplications';
import { SkillTrends } from '../pages/admin/SkillTrends';
import { PlacementAnalytics } from '../pages/admin/PlacementAnalytics';
import { AdminReports } from '../pages/admin/AdminReports';
import { AdminSettings } from '../pages/admin/AdminSettings';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Student Portal Routes */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Navigate to="/student/dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="skills" element={<MySkills />} />
          <Route path="skill-gap" element={<SkillGapAnalysis />} />
          <Route path="roadmap" element={<LearningRoadmap />} />
          <Route path="opportunities" element={<OpportunitiesPage />} />
          <Route path="opportunities/:id" element={<OpportunityDetailsPage />} />
          <Route path="applications" element={<MyApplicationsPage />} />
          <Route path="resume" element={<ResumeIntelligencePage />} />
          <Route path="insights" element={<CareerInsightsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="settings" element={<StudentSettings />} />
        </Route>

        {/* Company Portal Routes */}
        <Route path="/company" element={<CompanyLayout />}>
          <Route index element={<Navigate to="/company/dashboard" replace />} />
          <Route path="dashboard" element={<CompanyDashboard />} />
          <Route path="profile" element={<CompanyProfile />} />
          <Route path="post-opportunity" element={<PostOpportunity />} />
          <Route path="opportunities" element={<MyOpportunities />} />
          <Route path="applications" element={<ApplicationManagement />} />
          <Route path="candidate-matching" element={<CandidateMatching />} />
          <Route path="analytics" element={<CompanyAnalytics />} />
          <Route path="settings" element={<CompanySettings />} />
        </Route>

        {/* Admin / Institutional Portal Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="companies" element={<AdminCompanies />} />
          <Route path="opportunities" element={<AdminOpportunities />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="skill-trends" element={<SkillTrends />} />
          <Route path="placement-analytics" element={<PlacementAnalytics />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};
