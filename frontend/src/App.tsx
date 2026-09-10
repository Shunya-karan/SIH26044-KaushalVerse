import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import PublicLayout from '@/layouts/PublicLayout';
import StudentLayout from '@/layouts/StudentLayout';
import CompanyLayout from '@/layouts/CompanyLayout';
import AdminLayout from '@/layouts/AdminLayout';

import LandingPage from '@/pages/public/LandingPage';
import HowItWorksPage from '@/pages/public/HowItWorksPage';
import AboutPage from '@/pages/public/AboutPage';
import ContactPage from '@/pages/public/ContactPage';
import PrivacyPage from '@/pages/public/PrivacyPage';
import TermsPage from '@/pages/public/TermsPage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';

import StudentDashboard from '@/pages/student/StudentDashboard';
import StudentProfile from '@/pages/student/StudentProfile';
import StudentSkills from '@/pages/student/StudentSkills';
import SkillGap from '@/pages/student/SkillGap';
import LearningRoadmap from '@/pages/student/LearningRoadmap';
import Opportunities from '@/pages/student/Opportunities';
import OpportunityDetail from '@/pages/student/OpportunityDetail';
import Applications from '@/pages/student/Applications';
import ResumeIntelligence from '@/pages/student/ResumeIntelligence';
import CareerInsights from '@/pages/student/CareerInsights';
import Notifications from '@/pages/student/Notifications';
import Settings from '@/pages/student/Settings';

import CompanyDashboard from '@/pages/company/CompanyDashboard';
import CompanyProfile from '@/pages/company/CompanyProfile';
import PostOpportunity from '@/pages/company/PostOpportunity';
import MyOpportunities from '@/pages/company/MyOpportunities';
import CompanyApplications from '@/pages/company/CompanyApplications';
import CandidateMatching from '@/pages/company/CandidateMatching';
import CompanyAnalytics from '@/pages/company/CompanyAnalytics';
import CompanySettings from '@/pages/company/CompanySettings';

import AdminOverview from '@/pages/admin/AdminOverview';
import AdminStudents from '@/pages/admin/AdminStudents';
import AdminCompanies from '@/pages/admin/AdminCompanies';
import AdminOpportunities from '@/pages/admin/AdminOpportunities';
import AdminApplications from '@/pages/admin/AdminApplications';
import SkillTrends from '@/pages/admin/SkillTrends';
import PlacementAnalytics from '@/pages/admin/PlacementAnalytics';
import Reports from '@/pages/admin/Reports';
import AdminSettings from '@/pages/admin/AdminSettings';

function RequireRole({ role, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to={`/${user.role}`} replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/student" element={<RequireRole role="student"><StudentLayout /></RequireRole>}>
            <Route index element={<StudentDashboard />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="skills" element={<StudentSkills />} />
            <Route path="skill-gap" element={<SkillGap />} />
            <Route path="roadmap" element={<LearningRoadmap />} />
            <Route path="opportunities" element={<Opportunities />} />
            <Route path="opportunities/:id" element={<OpportunityDetail />} />
            <Route path="applications" element={<Applications />} />
            <Route path="resume" element={<ResumeIntelligence />} />
            <Route path="insights" element={<CareerInsights />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/company" element={<RequireRole role="company"><CompanyLayout /></RequireRole>}>
            <Route index element={<CompanyDashboard />} />
            <Route path="profile" element={<CompanyProfile />} />
            <Route path="post-opportunity" element={<PostOpportunity />} />
            <Route path="opportunities" element={<MyOpportunities />} />
            <Route path="applications" element={<CompanyApplications />} />
            <Route path="candidate-matching" element={<CandidateMatching />} />
            <Route path="analytics" element={<CompanyAnalytics />} />
            <Route path="settings" element={<CompanySettings />} />
          </Route>

          <Route path="/admin" element={<RequireRole role="admin"><AdminLayout /></RequireRole>}>
            <Route index element={<AdminOverview />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="companies" element={<AdminCompanies />} />
            <Route path="opportunities" element={<AdminOpportunities />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="skill-trends" element={<SkillTrends />} />
            <Route path="placement-analytics" element={<PlacementAnalytics />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}
