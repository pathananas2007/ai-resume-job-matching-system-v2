import { lazy, Suspense, useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { AppShell } from "../components/layout/AppShell";
import { Skeleton } from "../components/ui/Skeleton";
import { useEntryScreen } from "../hooks/useEntryScreen";
import ElevataEntryScreen from "../features/entry/ElevataEntryScreen";
// Lazy imports
const LandingPage = lazy(() => import("../features/landing/LandingPage"));
const LoginPage = lazy(() => import("../features/auth/LoginPage"));
const RegisterPage = lazy(() => import("../features/auth/RegisterPage"));
const OAuthCallbackPage = lazy(
  () => import("../features/auth/OAuthCallbackPage"),
);
// Seeker
const SeekerDashboard = lazy(
  () => import("../features/seeker/dashboard/SeekerDashboard"),
);
const ResumePage = lazy(() => import("../features/seeker/resume/ResumePage"));
const JobsPage = lazy(() => import("../features/seeker/jobs/JobsPage"));
const JobDetailsPage = lazy(
  () => import("../features/seeker/jobs/JobDetailsPage"),
);
const SavedJobsPage = lazy(
  () => import("../features/seeker/jobs/SavedJobsPage"),
);
const ApplicationsPage = lazy(
  () => import("../features/seeker/applications/pages/ApplicationsPage"),
);
const ApplicationDetailsPage = lazy(
  () => import("../features/seeker/applications/pages/ApplicationDetailsPage"),
);
const SkillGapPage = lazy(
  () => import("../features/seeker/skills/SkillGapPage"),
);
const LearningPage = lazy(
  () => import("../features/seeker/learning/LearningPage"),
);
const RoadmapDetailFeaturePage = lazy(
  () => import("../features/seeker/learning/RoadmapDetailFeaturePage"),
);
const ResourceDetailFeaturePage = lazy(
  () => import("../features/seeker/learning/ResourceDetailFeaturePage"),
);
const AnalyticsPage = lazy(
  () => import("../features/seeker/analytics/AnalyticsPage"),
);
const NotificationsPage = lazy(
  () => import("../features/notifications/NotificationsPage"),
);
const NotificationSettingsPage = lazy(
  () => import("../features/notifications/NotificationSettingsPage"),
);
// Recruiter
const RecruiterDashboard = lazy(
  () => import("../features/recruiter/dashboard/RecruiterDashboard"),
);
// Recruiter sub-pages
const JobManagementPage = lazy(
  () => import("../features/recruiter/jobs/JobManagementPage"),
);
const CandidatesPage = lazy(
  () => import("../features/recruiter/candidates/CandidatesPage"),
);
const PipelinePage = lazy(
  () => import("../features/recruiter/pipeline/PipelinePage"),
);
const RankingsPage = lazy(
  () => import("../features/recruiter/rankings/RankingsPage"),
);
const RecruiterAnalyticsPage = lazy(
  () => import("../features/recruiter/analytics/RecruiterAnalyticsPage"),
);
const RecruiterProfilePage = lazy(
  () => import("../features/recruiter/profile/RecruiterProfilePage"),
);
const ProfilePage = lazy(
  () => import("../features/seeker/profile/ProfilePage"),
);
const ProfileSuggestionsPage = lazy(
  () => import("../features/seeker/profile/ProfileSuggestionsPage"),
);
const SettingsPage = lazy(
  () => import("../features/seeker/settings/SettingsPage"),
);
// Landing Page with Entry Screen
/** * Wraps the LandingPage with entry screen logic. * Shows entry screen only on initial "/" route, not on refreshes within the session. * Does NOT show entry screen between internal app pages. */ function LandingPageWithEntry() {
  const location = useLocation();
  const { shouldShowEntry, markEntrySeen } = useEntryScreen();
  // Only show entry screen on initial "/" route load during this session
  const isHomeRoute = location.pathname === "/";
  const showEntry = isHomeRoute && shouldShowEntry;
  const handleEnterClick = () => {
    markEntrySeen();
  };
  // Lock/unlock body scroll when splash is visible
  useEffect(() => {
    if (showEntry) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showEntry]);
  return (
    <>
      {" "}
      {showEntry && <ElevataEntryScreen onEnter={handleEnterClick} />}{" "}
      <Suspense fallback={<PageLoader />}>
        {" "}
        <LandingPage />{" "}
      </Suspense>{" "}
    </>
  );
}
// Loading fallback
function PageLoader() {
  return (
    <div className="p-6 space-y-4">
      {" "}
      <Skeleton className="h-8 w-48" /> <Skeleton className="h-4 w-72" />{" "}
      <div className="grid grid-cols-4 gap-4 mt-6">
        {" "}
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}{" "}
      </div>{" "}
    </div>
  );
}
function SuspenseWrapper() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  );
}
// Guards
/** * RequireAuth: Protects routes by role * - Waits for hydration before deciding * - Unauthenticated users ΓåÆ /login * - Wrong role ΓåÆ redirected to their own dashboard * - Refresh preserves auth state from localStorage */ function RequireAuth({
  role,
}: {
  role?: "seeker" | "recruiter";
}) {
  const { isAuthenticated, user, _hasHydrated } = useAuthStore();
  // Wait for Zustand persist to rehydrate from localStorage before deciding
  if (!_hasHydrated) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F5F7FA]">
        {" "}
        <div className="flex flex-col items-center gap-4">
          {" "}
          <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
            {" "}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              {" "}
              <path
                d="M4 4h10M4 9h7M4 14h10"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
              />{" "}
              <path
                d="M13 6.5l2.5 2.5-2.5 2.5"
                stroke="#06B6D4"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
            </svg>{" "}
          </div>{" "}
          <div className="w-6 h-6 border-2 border-[#2563EB]/20 border-t-[#2563EB] rounded-full animate-spin" />{" "}
        </div>{" "}
      </div>
    );
  }
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  // Strict role checking: if user has different role than required, redirect to their own dashboard
  if (role && user?.role !== role) {
    return (
      <Navigate
        to={
          user?.role === "recruiter"
            ? "/recruiter/dashboard"
            : "/seeker/dashboard"
        }
        replace
      />
    );
  }
  return <Outlet />;
}
/** * RedirectIfAuth: Redirects authenticated users away from auth pages * - Logged-in users cannot access /login or /register * - They're sent to their appropriate dashboard instead */ function RedirectIfAuth() {
  const { isAuthenticated, user, _hasHydrated } = useAuthStore();
  if (!_hasHydrated) return null;
  // wait silently - login page will render once hydrated
  if (isAuthenticated) {
    return (
      <Navigate
        to={
          user?.role === "recruiter"
            ? "/recruiter/dashboard"
            : "/seeker/dashboard"
        }
        replace
      />
    );
  }
  return <Outlet />;
}
// Router
export const router = createBrowserRouter([
  // Public  {    element: <Suspense fallback={<PageLoader />}><Outlet /></Suspense>,    children: [      { path: '/', element: <LandingPageWithEntry /> },      {        element: <RedirectIfAuth />,        children: [          { path: '/login',    element: <LoginPage /> },          { path: '/register', element: <RegisterPage /> },          { path: '/auth/callback', element: <OAuthCallbackPage /> },        ],      },    ],  },
  // Seeker (protected)
  {
    element: <RequireAuth role="seeker" />,
    children: [
      {
        element: <AppShell />,
        children: [
          {
            element: <SuspenseWrapper />,
            children: [
              {
                path: "/seeker",
                element: <Navigate to="/seeker/dashboard" replace />,
              },
              { path: "/seeker/dashboard", element: <SeekerDashboard /> },
              { path: "/seeker/resume", element: <ResumePage /> },
              { path: "/seeker/jobs", element: <JobsPage /> },
              { path: "/seeker/jobs/saved", element: <SavedJobsPage /> },
              { path: "/seeker/jobs/:jobId", element: <JobDetailsPage /> },
              { path: "/seeker/applications", element: <ApplicationsPage /> },
              {
                path: "/seeker/applications/:applicationId",
                element: <ApplicationDetailsPage />,
              },
              { path: "/seeker/skills", element: <SkillGapPage /> },
              { path: "/seeker/learning", element: <LearningPage /> },
              {
                path: "/seeker/learning/roadmap/:id",
                element: <RoadmapDetailFeaturePage />,
              },
              {
                path: "/seeker/learning/resource/:id",
                element: <ResourceDetailFeaturePage />,
              },
              { path: "/seeker/analytics", element: <AnalyticsPage /> },
              { path: "/seeker/notifications", element: <NotificationsPage /> },
              {
                path: "/seeker/notifications/settings",
                element: <NotificationSettingsPage />,
              },
              { path: "/seeker/profile", element: <ProfilePage /> },
              {
                path: "/seeker/profile/suggestions/:resumeId",
                element: <ProfileSuggestionsPage />,
              },
              { path: "/seeker/settings", element: <SettingsPage /> },
              {
                path: "/profile",
                element: <Navigate to="/seeker/profile" replace />,
              },
              {
                path: "/profile/suggestions/:resumeId",
                element: (
                  <Navigate
                    to="/seeker/profile/suggestions/:resumeId"
                    replace
                  />
                ),
              },
              {
                path: "/settings",
                element: <Navigate to="/seeker/settings" replace />,
              },
            ],
          },
        ],
      },
    ],
  },
  // Recruiter (protected)
  {
    element: <RequireAuth role="recruiter" />,
    children: [
      {
        element: <AppShell />,
        children: [
          {
            element: <SuspenseWrapper />,
            children: [
              {
                path: "/recruiter",
                element: <Navigate to="/recruiter/dashboard" replace />,
              },
              { path: "/recruiter/dashboard", element: <RecruiterDashboard /> },
              { path: "/recruiter/jobs", element: <JobManagementPage /> },
              {
                path: "/recruiter/jobs/create",
                element: <JobManagementPage />,
              },
              {
                path: "/recruiter/jobs/:id/applicants",
                element: <CandidatesPage />,
              },
              { path: "/recruiter/candidates", element: <CandidatesPage /> },
              { path: "/recruiter/rankings", element: <RankingsPage /> },
              { path: "/recruiter/pipeline", element: <PipelinePage /> },
              {
                path: "/recruiter/analytics",
                element: <RecruiterAnalyticsPage />,
              },
              { path: "/recruiter/profile", element: <RecruiterProfilePage /> },
              { path: "/recruiter/settings", element: <SettingsPage /> },
              {
                path: "/profile",
                element: <Navigate to="/recruiter/profile" replace />,
              },
              {
                path: "/settings",
                element: <Navigate to="/recruiter/settings" replace />,
              },
            ],
          },
        ],
      },
    ],
  },
  // Catch-all
  { path: "*", element: <Navigate to="/" replace /> },
]);
