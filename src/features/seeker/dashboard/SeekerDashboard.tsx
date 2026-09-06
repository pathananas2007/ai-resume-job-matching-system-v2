import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  FileText,
  Briefcase,
  TrendingUp,
  BookOpen,
  ArrowRight,
  Upload,
  Zap,
  Target,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  Bell,
  ChevronRight,
  ExternalLink,
  Bookmark,
  Send,
  BarChart2,
  Star,
  Play,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useAuthStore } from "../../../store/authStore";
import { Skeleton } from "../../../components/ui/Skeleton";
import { cn } from "../../../lib/utils";
import { applicationApi } from "../../../services/api/applicationApi";
import { jobApi } from "../../../services/api/jobApi";
import { analyticsApi } from "../../../services/api/analyticsApi";
function ComingSoonState({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 my-4 text-center bg-[#F8FAFC] rounded-xl border border-dashed border-[#CBD5E1]">
      {" "}
      <Clock className="w-8 h-8 text-[#94A3B8] mb-3" />{" "}
      <h3 className="text-sm font-semibold text-[#1E293B]">{title}</h3>{" "}
      <p className="text-xs text-[#64748B] mt-1 max-w-[280px] mx-auto">
        {desc}
      </p>{" "}
    </div>
  );
} /* ΓöÇΓöÇ Types ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
interface KPICardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  trend?: { value: number; positive: boolean };
  color: string;
  bg: string;
  href?: string;
  loading?: boolean;
} /* ΓöÇΓöÇ Realistic placeholder data ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
const APPLICATION_ACTIVITY = [
  { week: "Week 1", applied: 2, interviews: 0 },
  { week: "Week 2", applied: 4, interviews: 1 },
  { week: "Week 3", applied: 3, interviews: 1 },
  { week: "Week 4", applied: 6, interviews: 2 },
  { week: "Week 5", applied: 5, interviews: 2 },
  { week: "Week 6", applied: 7, interviews: 3 },
];
const SKILL_GROWTH = [
  { month: "Jan", score: 58 },
  { month: "Feb", score: 61 },
  { month: "Mar", score: 63 },
  { month: "Apr", score: 67 },
  { month: "May", score: 71 },
  { month: "Jun", score: 74 },
  { month: "Jul", score: 78 },
];
const CURRENT_SKILLS = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "SQL",
  "Git",
  "REST APIs",
  "CSS",
];
const MISSING_SKILLS = [
  {
    skill: "System Design",
    priority: "High",
    reason: "Required in 8 of your target roles",
  },
  {
    skill: "Docker",
    priority: "High",
    reason: "Listed in 6 of your target roles",
  },
  {
    skill: "AWS",
    priority: "Medium",
    reason: "Listed in 5 of your target roles",
  },
  {
    skill: "GraphQL",
    priority: "Medium",
    reason: "Listed in 4 of your target roles",
  },
  {
    skill: "Redis",
    priority: "Low",
    reason: "Listed in 2 of your target roles",
  },
];
const RECOMMENDED_JOBS = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "Figma",
    location: "Remote",
    type: "Full-time",
    match: 92,
    salary: "$130k ΓÇô $160k",
    tags: ["React", "TypeScript", "Design Systems"],
    saved: false,
  },
  {
    id: "2",
    title: "Full Stack Developer",
    company: "Linear",
    location: "San Francisco, CA",
    type: "Full-time",
    match: 87,
    salary: "$120k ΓÇô $150k",
    tags: ["React", "Node.js", "PostgreSQL"],
    saved: true,
  },
  {
    id: "3",
    title: "Frontend Engineer",
    company: "Vercel",
    location: "Remote",
    type: "Full-time",
    match: 84,
    salary: "$110k ΓÇô $140k",
    tags: ["Next.js", "TypeScript", "CSS"],
    saved: false,
  },
  {
    id: "4",
    title: "React Developer",
    company: "Loom",
    location: "New York, NY",
    type: "Contract",
    match: 79,
    salary: "$90/hr",
    tags: ["React", "Redux", "Testing"],
    saved: false,
  },
];
const RECENT_APPLICATIONS = [
  {
    id: "1",
    position: "Senior React Developer",
    company: "Stripe",
    status: "interview",
    appliedDate: "Jun 28, 2025",
    score: 88,
  },
  {
    id: "2",
    position: "Frontend Engineer",
    company: "Notion",
    status: "screening",
    appliedDate: "Jun 25, 2025",
    score: 82,
  },
  {
    id: "3",
    position: "UI Engineer",
    company: "Framer",
    status: "applied",
    appliedDate: "Jun 22, 2025",
    score: 76,
  },
  {
    id: "4",
    position: "React Developer",
    company: "Webflow",
    status: "applied",
    appliedDate: "Jun 19, 2025",
    score: 71,
  },
  {
    id: "5",
    position: "Full Stack Engineer",
    company: "Retool",
    status: "rejected",
    appliedDate: "Jun 14, 2025",
    score: 64,
  },
];
const LEARNING_RECOMMENDATIONS = [
  {
    id: "1",
    skill: "System Design",
    resource: "System Design Interview ΓÇô An Insider's Guide",
    provider: "ByteByteGo",
    type: "Book",
    difficulty: "Advanced",
    url: "#",
    icon: "≡ƒôÿ",
  },
  {
    id: "2",
    skill: "Docker & Containers",
    resource: "Docker & Kubernetes: The Practical Guide",
    provider: "Udemy",
    type: "Course",
    difficulty: "Intermediate",
    url: "#",
    icon: "≡ƒÄô",
  },
  {
    id: "3",
    skill: "AWS Fundamentals",
    resource: "AWS Certified Developer ΓÇô Associate",
    provider: "AWS Training",
    type: "Certification",
    difficulty: "Intermediate",
    url: "#",
    icon: "≡ƒÅå",
  },
  {
    id: "4",
    skill: "GraphQL",
    resource: "Full Stack GraphQL with React",
    provider: "Apollo Docs",
    type: "Documentation",
    difficulty: "Beginner",
    url: "#",
    icon: "≡ƒôä",
  },
];
const NOTIFICATIONS = [
  {
    id: "1",
    type: "match",
    title: "New job match found",
    message: "Senior React Developer at Figma ΓÇö 92% match with your profile",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "application",
    title: "Application status update",
    message: "Your application at Stripe has moved to the Interview stage",
    time: "5 hours ago",
    read: false,
  },
  {
    id: "3",
    type: "tip",
    title: "Resume improvement tip",
    message:
      "Adding quantified achievements could improve your ATS score by 8ΓÇô12 points",
    time: "1 day ago",
    read: true,
  },
  {
    id: "4",
    type: "learning",
    title: "Learning reminder",
    message: "You have 2 incomplete courses in your learning plan",
    time: "2 days ago",
    read: true,
  },
]; /* ΓöÇΓöÇ Reusable sub-components ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
function KPICard({
  icon: Icon,
  label,
  value,
  sub,
  trend,
  color,
  bg,
  href,
  loading,
}: KPICardProps) {
  const content = (
    <div
      className={cn(
        "bg-white rounded-xl border border-[#E2E8F0] p-5 transition-all duration-200",
        href && "hover:shadow-md hover:-translate-y-0.5 cursor-pointer",
      )}
    >
      {" "}
      {loading ? (
        <div className="space-y-3">
          {" "}
          <Skeleton className="w-10 h-10 rounded-xl" />{" "}
          <Skeleton className="h-7 w-16" />{" "}
          <Skeleton className="h-3 w-24" />{" "}
        </div>
      ) : (
        <>
          {" "}
          <div className="flex items-start justify-between mb-4">
            {" "}
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                bg,
              )}
            >
              {" "}
              <Icon className={cn("w-5 h-5", color)} />{" "}
            </div>{" "}
            {trend && (
              <span
                className={cn(
                  "text-xs font-semibold px-2 py-0.5 rounded-full",
                  trend.positive
                    ? "bg-[#F0FDF4] text-[#16A34A]"
                    : "bg-[#FEF2F2] text-[#DC2626]",
                )}
              >
                {" "}
                {trend.positive ? "+" : ""}
                {trend.value}%{" "}
              </span>
            )}{" "}
          </div>{" "}
          <div className="text-2xl font-bold text-[#1E293B] mb-0.5">
            {value}
          </div>{" "}
          <div className="text-sm text-[#64748B]">{label}</div>{" "}
          {sub && <div className="text-xs text-[#94A3B8] mt-1">{sub}</div>}{" "}
        </>
      )}{" "}
    </div>
  );
  return href ? <Link to={href}>{content}</Link> : <div>{content}</div>;
}
function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between mb-5">
      {" "}
      <div>
        {" "}
        <h2 className="text-lg font-semibold text-[#1E293B]">{title}</h2>{" "}
        {subtitle && (
          <p className="text-sm text-[#64748B] mt-0.5">{subtitle}</p>
        )}{" "}
      </div>{" "}
      {action}{" "}
    </div>
  );
}
function StatusPill({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    interview: {
      label: "Interview",
      cls: "bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]",
    },
    screening: {
      label: "Screening",
      cls: "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]",
    },
    applied: {
      label: "Applied",
      cls: "bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]",
    },
    rejected: {
      label: "Rejected",
      cls: "bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]",
    },
    selected: {
      label: "Selected",
      cls: "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]",
    },
  };
  const cfg = map[status] ?? {
    label: status,
    cls: "bg-[#F8FAFC] text-[#475569] border-[#E2E8F0]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        cfg.cls,
      )}
    >
      {" "}
      {cfg.label}{" "}
    </span>
  );
}
function PriorityPill({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    High: "bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]",
    Medium: "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]",
    Low: "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border",
        map[priority] ?? "",
      )}
    >
      {" "}
      {priority}{" "}
    </span>
  );
}
function DifficultyPill({ level }: { level: string }) {
  const map: Record<string, string> = {
    Beginner: "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]",
    Intermediate: "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]",
    Advanced: "bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border",
        map[level] ?? "",
      )}
    >
      {" "}
      {level}{" "}
    </span>
  );
}
function ScoreRing({ score, size = 72 }: { score: number; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 75 ? "#22C55E" : score >= 50 ? "#F59E0B" : "#EF4444";
  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {" "}
      <svg
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)", position: "absolute" }}
      >
        {" "}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="6"
        />{" "}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />{" "}
      </svg>{" "}
      <div className="flex flex-col items-center z-10">
        {" "}
        <span className="text-base font-bold" style={{ color }}>
          {score}
        </span>{" "}
        <span className="text-[9px] text-[#94A3B8]">/100</span>{" "}
      </div>{" "}
    </div>
  );
}
function ProgressBar({
  value,
  color = "#2563EB",
  delay = 0,
}: {
  value: number;
  color?: string;
  delay?: number;
}) {
  return (
    <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
      {" "}
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.9, delay, ease: "easeOut" }}
      />{" "}
    </div>
  );
}
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-lg px-3 py-2.5 text-xs">
      {" "}
      <p className="font-semibold text-[#1E293B] mb-1">{label}</p>{" "}
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="font-medium">
          {p.name}: {p.value}
        </p>
      ))}{" "}
    </div>
  );
}; /* ΓöÇΓöÇ Main Dashboard ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
export default function SeekerDashboard() {
  const { user } = useAuthStore();
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set(["2"]));
  const [loading, setLoading] = useState(false);
  const [recentApps, setRecentApps] = useState<any[]>([]);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsStats, setAnalyticsStats] = useState<any>(null);
  const [applicationActivity, setApplicationActivity] = useState<any>(null);
  const [atsTrend, setAtsTrend] = useState<any>(null);
  const isMock = import.meta.env.VITE_USE_MOCK_DATA !== "false";
  const [totalApps, setTotalApps] = useState(0);
  useEffect(() => {
    if (isMock) {
      setRecentApps(RECENT_APPLICATIONS);
      return;
    }
    const fetchApps = async () => {
      setLoading(true);
      try {
        const appsRes = await applicationApi.listMyApplications({
          page_size: 5,
        });
        setTotalApps(appsRes.total);
        const backendApps = await Promise.all(
          appsRes.items.map(async (app) => {
            try {
              const job = await jobApi.getJob(app.job_id);
              return {
                id: app._id,
                position: job.title,
                company: job.company_name,
                status: app.status.toLowerCase(),
                appliedDate: new Date(app.created_at).toLocaleDateString(),
                score: app.match_score || 0,
              };
            } catch (err) {
              return null;
            }
          }),
        );
        setRecentApps(backendApps.filter(Boolean));
      } catch (error) {
        console.error("Failed to load applications", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, [isMock]);
  /* Load analytics data */ useEffect(() => {
    if (isMock) return;
    const fetchAnalytics = async () => {
      setAnalyticsLoading(true);
      try {
        const [stats, activity, trend] = await Promise.all([
          analyticsApi.getDashboardStats(),
          analyticsApi.getApplicationActivity(30),
          analyticsApi.getATSTrend(6),
        ]);
        setAnalyticsStats(stats);
        setApplicationActivity(activity);
        setAtsTrend(trend);
      } catch (error) {
        console.error("Failed to load analytics", error);
      } finally {
        setAnalyticsLoading(false);
      }
    };
    fetchAnalytics();
  }, [isMock]);
  const firstName = user?.full_name?.split(" ")[0] || "there";
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const toggleSave = (id: string) => {
    setSavedJobs((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  return (
    <div className="space-y-6 pb-8">
      {" "}
      {/* ΓöÇΓöÇ SECTION 1: Welcome Card ΓöÇΓöÇ */}{" "}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] rounded-2xl p-6 text-white overflow-hidden relative"
      >
        {" "}
        {/* Background decoration */}{" "}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />{" "}
        <div className="absolute bottom-0 right-24 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />{" "}
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
          {" "}
          <div className="space-y-2">
            {" "}
            <div className="flex items-center gap-2">
              {" "}
              <p className="text-blue-200 text-sm font-medium">
                {greeting} ≡ƒæï
              </p>{" "}
              {isMock && (
                <span className="bg-white/20 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Demo Data
                </span>
              )}{" "}
            </div>{" "}
            <h1 className="text-2xl font-bold">
              {user?.full_name || "Welcome back"}
            </h1>{" "}
            {isMock && (
              <p className="text-blue-200 text-sm max-w-md">
                {" "}
                Your career goal:{" "}
                <span className="text-white font-semibold">
                  Senior Frontend Engineer
                </span>{" "}
              </p>
            )}{" "}
            <div className="flex items-center gap-2 pt-1">
              {" "}
              <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 text-xs font-medium">
                {" "}
                <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />{" "}
                Profile active{" "}
              </div>{" "}
              {isMock && (
                <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 text-xs font-medium">
                  {" "}
                  <Clock className="w-3 h-3" /> Last analyzed 2 days ago{" "}
                </div>
              )}{" "}
            </div>{" "}
          </div>{" "}
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            {" "}
            <Link
              to="/seeker/resume"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#2563EB] font-semibold text-sm rounded-lg px-5 py-2.5 hover:bg-blue-50 transition-colors shadow-sm"
            >
              {" "}
              <Zap className="w-4 h-4" /> Analyze Resume{" "}
            </Link>{" "}
            <Link
              to="/seeker/jobs"
              className="inline-flex items-center justify-center gap-2 bg-white/15 text-white font-semibold text-sm rounded-lg px-5 py-2.5 hover:bg-white/25 transition-colors border border-white/20"
            >
              {" "}
              <Briefcase className="w-4 h-4" /> Browse Jobs{" "}
            </Link>{" "}
          </div>{" "}
        </div>{" "}
      </motion.div>{" "}
      {/* ΓöÇΓöÇ SECTION 2: KPI Cards ΓöÇΓöÇ */}{" "}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {" "}
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-[#E2E8F0] p-5 space-y-3"
            >
              {" "}
              <Skeleton className="w-10 h-10 rounded-xl" />{" "}
              <Skeleton className="h-7 w-16" />{" "}
              <Skeleton className="h-3 w-24" />{" "}
            </div>
          ))
        ) : isMock ? (
          <>
            {" "}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              {" "}
              <KPICard
                icon={Award}
                label="ATS Score"
                value="78"
                sub="Resume compatibility"
                trend={{ value: 6, positive: true }}
                color="text-[#2563EB]"
                bg="bg-[#EFF6FF]"
                href="/seeker/resume"
              />{" "}
            </motion.div>{" "}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {" "}
              <KPICard
                icon={Target}
                label="Profile Strength"
                value="65%"
                sub="3 items incomplete"
                trend={{ value: 8, positive: true }}
                color="text-[#0891B2]"
                bg="bg-[#ECFEFF]"
                href="/seeker/profile"
              />{" "}
            </motion.div>{" "}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {" "}
              <KPICard
                icon={Send}
                label="Applications"
                value="12"
                sub="Last 30 days"
                trend={{ value: 4, positive: true }}
                color="text-[#7C3AED]"
                bg="bg-[#F5F3FF]"
                href="/seeker/applications"
              />{" "}
            </motion.div>{" "}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {" "}
              <KPICard
                icon={Briefcase}
                label="Recommended Jobs"
                value="24"
                sub="Based on your profile"
                color="text-[#D97706]"
                bg="bg-[#FFFBEB]"
                href="/seeker/jobs"
              />{" "}
            </motion.div>{" "}
          </>
        ) : (
          <>
            {" "}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              {" "}
              <KPICard
                icon={Award}
                label="ATS Score"
                value={
                  analyticsStats?.ats_score
                    ? `${analyticsStats.ats_score}`
                    : "-"
                }
                sub="Resume compatibility"
                color={
                  analyticsStats?.ats_score
                    ? "text-[#2563EB]"
                    : "text-[#94A3B8]"
                }
                bg={analyticsStats?.ats_score ? "bg-[#EFF6FF]" : "bg-[#F1F5F9]"}
                href="/seeker/resume"
              />{" "}
            </motion.div>{" "}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {" "}
              <KPICard
                icon={Target}
                label="Profile Strength"
                value={
                  analyticsStats?.profile_strength
                    ? `${analyticsStats.profile_strength}%`
                    : "-"
                }
                sub="Profile completeness"
                color="text-[#0891B2]"
                bg="bg-[#ECFEFF]"
                href="/seeker/profile"
              />{" "}
            </motion.div>{" "}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {" "}
              <KPICard
                icon={Send}
                label="Applications"
                value={totalApps.toString()}
                sub="Total applications"
                color="text-[#7C3AED]"
                bg="bg-[#F5F3FF]"
                href="/seeker/applications"
              />{" "}
            </motion.div>{" "}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {" "}
              <KPICard
                icon={Briefcase}
                label="Recommended Jobs"
                value={
                  analyticsStats?.recommended_jobs_count
                    ? `${analyticsStats.recommended_jobs_count}`
                    : "-"
                }
                sub="Available opportunities"
                color="text-[#D97706]"
                bg="bg-[#FFFBEB]"
                href="/seeker/jobs"
              />{" "}
            </motion.div>{" "}
          </>
        )}{" "}
      </div>{" "}
      {/* ΓöÇΓöÇ SECTION 3: Analytics ΓöÇΓöÇ */}{" "}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {" "}
        {/* Application Activity */}{" "}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-xl border border-[#E2E8F0] p-6"
        >
          {" "}
          <SectionHeader
            title="Application Activity"
            subtitle="Applications submitted and interviews scheduled"
          />{" "}
          {isMock ? (
            <ResponsiveContainer width="100%" height={200}>
              {" "}
              <BarChart
                data={APPLICATION_ACTIVITY}
                margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
              >
                {" "}
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F1F5F9"
                  vertical={false}
                />{" "}
                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                />{" "}
                <YAxis
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                />{" "}
                <Tooltip content={<CustomTooltip />} />{" "}
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />{" "}
                <Bar
                  dataKey="applied"
                  name="Applied"
                  fill="#BFDBFE"
                  radius={[4, 4, 0, 0]}
                />{" "}
                <Bar
                  dataKey="interviews"
                  name="Interviews"
                  fill="#2563EB"
                  radius={[4, 4, 0, 0]}
                />{" "}
              </BarChart>{" "}
            </ResponsiveContainer>
          ) : applicationActivity?.data &&
            applicationActivity.data.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              {" "}
              <BarChart
                data={applicationActivity.data}
                margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
              >
                {" "}
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F1F5F9"
                  vertical={false}
                />{" "}
                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                />{" "}
                <YAxis
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                />{" "}
                <Tooltip content={<CustomTooltip />} />{" "}
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />{" "}
                <Bar
                  dataKey="applied"
                  name="Applied"
                  fill="#BFDBFE"
                  radius={[4, 4, 0, 0]}
                />{" "}
                <Bar
                  dataKey="interviews"
                  name="Interviews"
                  fill="#2563EB"
                  radius={[4, 4, 0, 0]}
                />{" "}
              </BarChart>{" "}
            </ResponsiveContainer>
          ) : (
            <ComingSoonState
              title="No data yet"
              desc="Application activity will appear here as you apply to jobs."
            />
          )}{" "}
        </motion.div>{" "}
        {/* Skill Growth Trend */}{" "}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-[#E2E8F0] p-6"
        >
          {" "}
          <SectionHeader
            title="ATS Score Trend"
            subtitle="Resume compatibility score over time"
          />{" "}
          {isMock ? (
            <ResponsiveContainer width="100%" height={200}>
              {" "}
              <AreaChart
                data={SKILL_GROWTH}
                margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
              >
                {" "}
                <defs>
                  {" "}
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    {" "}
                    <stop
                      offset="5%"
                      stopColor="#2563EB"
                      stopOpacity={0.15}
                    />{" "}
                    <stop
                      offset="95%"
                      stopColor="#2563EB"
                      stopOpacity={0}
                    />{" "}
                  </linearGradient>{" "}
                </defs>{" "}
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F1F5F9"
                  vertical={false}
                />{" "}
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                />{" "}
                <YAxis
                  domain={[50, 90]}
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                />{" "}
                <Tooltip content={<CustomTooltip />} />{" "}
                <Area
                  type="monotone"
                  dataKey="score"
                  name="ATS Score"
                  stroke="#2563EB"
                  strokeWidth={2.5}
                  fill="url(#scoreGrad)"
                  dot={{ fill: "#2563EB", r: 3 }}
                  activeDot={{ r: 5 }}
                />{" "}
              </AreaChart>{" "}
            </ResponsiveContainer>
          ) : atsTrend?.data && atsTrend.data.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              {" "}
              <AreaChart
                data={atsTrend.data}
                margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
              >
                {" "}
                <defs>
                  {" "}
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    {" "}
                    <stop
                      offset="5%"
                      stopColor="#2563EB"
                      stopOpacity={0.15}
                    />{" "}
                    <stop
                      offset="95%"
                      stopColor="#2563EB"
                      stopOpacity={0}
                    />{" "}
                  </linearGradient>{" "}
                </defs>{" "}
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F1F5F9"
                  vertical={false}
                />{" "}
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                />{" "}
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                />{" "}
                <Tooltip content={<CustomTooltip />} />{" "}
                <Area
                  type="monotone"
                  dataKey="score"
                  name="ATS Score"
                  stroke="#2563EB"
                  strokeWidth={2.5}
                  fill="url(#scoreGrad)"
                  dot={{ fill: "#2563EB", r: 3 }}
                  activeDot={{ r: 5 }}
                />{" "}
              </AreaChart>{" "}
            </ResponsiveContainer>
          ) : (
            <ComingSoonState
              title="No data yet"
              desc="ATS score history will appear here after you upload and analyze your first resume."
            />
          )}{" "}
        </motion.div>{" "}
      </div>{" "}
      {/* ΓöÇΓöÇ SECTION 4: Skill Gap Summary ΓöÇΓöÇ */}{" "}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white rounded-xl border border-[#E2E8F0] p-6"
      >
        {" "}
        <SectionHeader
          title="Skill Gap Summary"
          subtitle="Based on your target roles and current profile"
          action={
            <Link
              to="/seeker/skills"
              className="text-sm text-[#2563EB] hover:underline font-medium flex items-center gap-1"
            >
              Full analysis <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          }
        />{" "}
        {isMock ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {" "}
            {/* Current skills */}{" "}
            <div>
              {" "}
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                {" "}
                <CheckCircle className="w-3.5 h-3.5 text-[#22C55E]" /> Current
                Skills{" "}
              </p>{" "}
              <div className="flex flex-wrap gap-2">
                {" "}
                {CURRENT_SKILLS.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 bg-[#F0FDF4] text-[#16A34A] text-xs font-medium rounded-full border border-[#BBF7D0]"
                  >
                    {s}
                  </span>
                ))}{" "}
              </div>{" "}
            </div>{" "}
            {/* Missing skills */}{" "}
            <div className="lg:col-span-2">
              {" "}
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                {" "}
                <AlertCircle className="w-3.5 h-3.5 text-[#EF4444]" /> Skill
                Gaps & Priorities{" "}
              </p>{" "}
              <div className="space-y-2.5">
                {" "}
                {MISSING_SKILLS.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]"
                  >
                    {" "}
                    <div className="flex-1 min-w-0">
                      {" "}
                      <div className="flex items-center gap-2 mb-1">
                        {" "}
                        <span className="text-sm font-semibold text-[#1E293B]">
                          {item.skill}
                        </span>{" "}
                        <PriorityPill priority={item.priority} />{" "}
                      </div>{" "}
                      <p className="text-xs text-[#64748B]">
                        {item.reason}
                      </p>{" "}
                    </div>{" "}
                    <Link
                      to="/seeker/learning"
                      className="text-xs text-[#2563EB] font-medium hover:underline shrink-0"
                    >
                      {" "}
                      Learn ΓåÆ{" "}
                    </Link>{" "}
                  </div>
                ))}{" "}
              </div>{" "}
            </div>{" "}
          </div>
        ) : (
          <ComingSoonState
            title="AI Skill Analysis Coming Soon"
            desc="Skill gap analysis will be enabled once backend AI components are integrated."
          />
        )}{" "}
      </motion.div>{" "}
      {/* ΓöÇΓöÇ SECTION 5: Recommended Jobs ΓöÇΓöÇ */}{" "}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {" "}
        <SectionHeader
          title="Recommended Jobs"
          subtitle="Matched to your skills and career goal"
          action={
            <Link
              to="/seeker/jobs"
              className="text-sm text-[#2563EB] hover:underline font-medium flex items-center gap-1"
            >
              View all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          }
        />{" "}
        {isMock ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {" "}
            {RECOMMENDED_JOBS.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.06 }}
                whileHover={{ y: -2 }}
                className="bg-white rounded-xl border border-[#E2E8F0] p-5 hover:shadow-md hover:border-[#CBD5E1] transition-all duration-200"
              >
                {" "}
                <div className="flex items-start justify-between gap-3 mb-3">
                  {" "}
                  <div className="flex items-start gap-3">
                    {" "}
                    <div className="w-10 h-10 rounded-xl bg-[#F5F7FA] border border-[#E2E8F0] flex items-center justify-center shrink-0 text-sm font-bold text-[#64748B]">
                      {" "}
                      {job.company[0]}{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <h3 className="text-sm font-semibold text-[#1E293B] leading-snug">
                        {job.title}
                      </h3>{" "}
                      <p className="text-xs text-[#64748B] mt-0.5">
                        {job.company} ┬╖ {job.location}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex items-center gap-2 shrink-0">
                    {" "}
                    <div className="text-right">
                      {" "}
                      <div className="text-sm font-bold text-[#22C55E]">
                        {job.match}%
                      </div>{" "}
                      <div className="text-[10px] text-[#94A3B8]">
                        match
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
                {/* Match bar */}{" "}
                <div className="mb-3">
                  {" "}
                  <ProgressBar
                    value={job.match}
                    color={
                      job.match >= 85
                        ? "#22C55E"
                        : job.match >= 70
                          ? "#2563EB"
                          : "#F59E0B"
                    }
                    delay={0.4 + i * 0.06}
                  />{" "}
                </div>{" "}
                {/* Tags */}{" "}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {" "}
                  <span className="px-2 py-0.5 bg-[#F5F7FA] text-[#64748B] text-[10px] font-medium rounded-full border border-[#E2E8F0]">
                    {job.type}
                  </span>{" "}
                  {job.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-[#EFF6FF] text-[#2563EB] text-[10px] font-medium rounded-full border border-[#BFDBFE]"
                    >
                      {tag}
                    </span>
                  ))}{" "}
                </div>{" "}
                <div className="flex items-center justify-between">
                  {" "}
                  <span className="text-xs font-semibold text-[#475569]">
                    {job.salary}
                  </span>{" "}
                  <div className="flex items-center gap-2">
                    {" "}
                    <button
                      onClick={() => toggleSave(job.id)}
                      className={cn(
                        "p-1.5 rounded-lg border transition-colors",
                        savedJobs.has(job.id)
                          ? "bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]"
                          : "border-[#E2E8F0] text-[#94A3B8] hover:text-[#2563EB] hover:border-[#BFDBFE]",
                      )}
                      aria-label={
                        savedJobs.has(job.id) ? "Unsave job" : "Save job"
                      }
                    >
                      {" "}
                      <Bookmark
                        className="w-3.5 h-3.5"
                        fill={savedJobs.has(job.id) ? "currentColor" : "none"}
                      />{" "}
                    </button>{" "}
                    <button className="inline-flex items-center gap-1.5 bg-[#2563EB] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#1D4ED8] transition-colors">
                      {" "}
                      <Send className="w-3 h-3" /> Apply{" "}
                    </button>{" "}
                  </div>{" "}
                </div>{" "}
              </motion.div>
            ))}{" "}
          </div>
        ) : (
          <ComingSoonState
            title="Job Matching AI Coming Soon"
            desc="Personalized job recommendations will be available once the matching AI is integrated."
          />
        )}{" "}
      </motion.div>{" "}
      {/* ΓöÇΓöÇ SECTION 6: Recent Applications ΓöÇΓöÇ */}{" "}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden"
      >
        {" "}
        <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
          {" "}
          <div>
            {" "}
            <h2 className="text-lg font-semibold text-[#1E293B]">
              Recent Applications
            </h2>{" "}
            <p className="text-sm text-[#64748B] mt-0.5">
              Track your application pipeline
            </p>{" "}
          </div>{" "}
          <Link
            to="/seeker/applications"
            className="text-sm text-[#2563EB] hover:underline font-medium flex items-center gap-1"
          >
            {" "}
            View all <ChevronRight className="w-3.5 h-3.5" />{" "}
          </Link>{" "}
        </div>{" "}
        {/* Desktop table */}{" "}
        <div className="hidden md:block overflow-x-auto">
          {" "}
          <table className="w-full">
            {" "}
            <thead>
              {" "}
              <tr className="border-b border-[#F1F5F9]">
                {" "}
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Position
                </th>{" "}
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Company
                </th>{" "}
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Match
                </th>{" "}
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Status
                </th>{" "}
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  Applied
                </th>{" "}
                <th className="px-6 py-3" />{" "}
              </tr>{" "}
            </thead>{" "}
            <tbody className="divide-y divide-[#F1F5F9]">
              {" "}
              {recentApps.length > 0 ? (
                recentApps.map((app, i) => (
                  <motion.tr
                    key={app.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 + i * 0.05 }}
                    className="hover:bg-[#F8FAFC] transition-colors"
                  >
                    {" "}
                    <td className="px-6 py-3.5">
                      {" "}
                      <span className="text-sm font-medium text-[#1E293B]">
                        {app.position}
                      </span>{" "}
                    </td>{" "}
                    <td className="px-6 py-3.5">
                      {" "}
                      <div className="flex items-center gap-2">
                        {" "}
                        <div className="w-6 h-6 rounded-md bg-[#F5F7FA] border border-[#E2E8F0] flex items-center justify-center text-[10px] font-bold text-[#64748B]">
                          {" "}
                          {app.company ? app.company[0] : "?"}{" "}
                        </div>{" "}
                        <span className="text-sm text-[#475569]">
                          {app.company || "Unknown"}
                        </span>{" "}
                      </div>{" "}
                    </td>{" "}
                    <td className="px-6 py-3.5">
                      {" "}
                      {app.score ? (
                        <span
                          className={cn(
                            "text-sm font-bold",
                            app.score >= 80
                              ? "text-[#22C55E]"
                              : app.score >= 65
                                ? "text-[#2563EB]"
                                : "text-[#F59E0B]",
                          )}
                        >
                          {" "}
                          {app.score}%{" "}
                        </span>
                      ) : (
                        <span className="text-sm text-[#94A3B8]">--</span>
                      )}{" "}
                    </td>{" "}
                    <td className="px-6 py-3.5">
                      <StatusPill status={app.status} />
                    </td>{" "}
                    <td className="px-6 py-3.5 text-sm text-[#64748B]">
                      {app.appliedDate}
                    </td>{" "}
                    <td className="px-6 py-3.5">
                      {" "}
                      <button
                        className="p-1.5 text-[#94A3B8] hover:text-[#2563EB] hover:bg-[#EFF6FF] rounded-lg transition-colors"
                        aria-label="View application"
                      >
                        {" "}
                        <ExternalLink className="w-3.5 h-3.5" />{" "}
                      </button>{" "}
                    </td>{" "}
                  </motion.tr>
                ))
              ) : (
                <tr>
                  {" "}
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-sm text-[#64748B]"
                  >
                    No recent applications found.
                  </td>{" "}
                </tr>
              )}{" "}
            </tbody>{" "}
          </table>{" "}
        </div>{" "}
        {/* Mobile list */}{" "}
        <div className="md:hidden divide-y divide-[#F1F5F9]">
          {" "}
          {recentApps.length > 0 ? (
            recentApps.map((app, i) => (
              <div key={app.id} className="px-5 py-4 flex items-center gap-3">
                {" "}
                <div className="w-9 h-9 rounded-xl bg-[#F5F7FA] border border-[#E2E8F0] flex items-center justify-center text-xs font-bold text-[#64748B] shrink-0">
                  {" "}
                  {app.company ? app.company[0] : "?"}{" "}
                </div>{" "}
                <div className="flex-1 min-w-0">
                  {" "}
                  <p className="text-sm font-medium text-[#1E293B] truncate">
                    {app.position}
                  </p>{" "}
                  <p className="text-xs text-[#64748B]">
                    {app.company || "Unknown"} ┬╖ {app.appliedDate}
                  </p>{" "}
                </div>{" "}
                <StatusPill status={app.status} />{" "}
              </div>
            ))
          ) : (
            <div className="px-5 py-8 text-center text-sm text-[#64748B]">
              No recent applications found.
            </div>
          )}{" "}
        </div>{" "}
      </motion.div>{" "}
      {/* ΓöÇΓöÇ SECTION 7: Learning Recommendations ΓöÇΓöÇ */}{" "}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {" "}
        <SectionHeader
          title="Learning Recommendations"
          subtitle="Curated resources to close your skill gaps"
          action={
            <Link
              to="/seeker/learning"
              className="text-sm text-[#2563EB] hover:underline font-medium flex items-center gap-1"
            >
              Learning Hub <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          }
        />{" "}
        {isMock ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {" "}
            {LEARNING_RECOMMENDATIONS.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.07 }}
                whileHover={{ y: -2 }}
                className="bg-white rounded-xl border border-[#E2E8F0] p-5 hover:shadow-md hover:border-[#CBD5E1] transition-all duration-200 flex flex-col"
              >
                {" "}
                <div className="flex items-start justify-between mb-3">
                  {" "}
                  <span className="text-2xl">{item.icon}</span>{" "}
                  <DifficultyPill level={item.difficulty} />{" "}
                </div>{" "}
                <div className="flex-1">
                  {" "}
                  <p className="text-[10px] font-semibold text-[#2563EB] uppercase tracking-wider mb-1">
                    {item.skill}
                  </p>{" "}
                  <h3 className="text-sm font-semibold text-[#1E293B] leading-snug mb-1.5">
                    {item.resource}
                  </h3>{" "}
                  <p className="text-xs text-[#64748B]">
                    {item.provider} ┬╖ {item.type}
                  </p>{" "}
                </div>{" "}
                <a
                  href={item.url}
                  className="mt-4 inline-flex items-center justify-center gap-1.5 w-full bg-[#F5F7FA] text-[#475569] text-xs font-semibold py-2 rounded-lg hover:bg-[#EFF6FF] hover:text-[#2563EB] transition-colors border border-[#E2E8F0]"
                >
                  {" "}
                  <Play className="w-3 h-3" /> Start Learning{" "}
                </a>{" "}
              </motion.div>
            ))}{" "}
          </div>
        ) : (
          <ComingSoonState
            title="Learning Recommendations Coming Soon"
            desc="Personalized learning resources will be available in a future update."
          />
        )}{" "}
      </motion.div>{" "}
      {/* ΓöÇΓöÇ SECTION 8: Notifications ΓöÇΓöÇ */}{" "}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden"
      >
        {" "}
        <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
          {" "}
          <div className="flex items-center gap-2.5">
            {" "}
            <h2 className="text-lg font-semibold text-[#1E293B]">
              Notifications
            </h2>{" "}
            <span className="w-5 h-5 rounded-full bg-[#2563EB] text-white text-[10px] font-bold flex items-center justify-center">
              {" "}
              {NOTIFICATIONS.filter((n) => !n.read).length}{" "}
            </span>{" "}
          </div>{" "}
          <button className="text-sm text-[#2563EB] hover:underline font-medium">
            Mark all read
          </button>{" "}
        </div>{" "}
        {isMock ? (
          <div className="divide-y divide-[#F1F5F9]">
            {" "}
            {NOTIFICATIONS.map((notif, i) => {
              const iconMap: Record<
                string,
                { icon: React.ElementType; color: string; bg: string }
              > = {
                match: {
                  icon: Briefcase,
                  color: "text-[#2563EB]",
                  bg: "bg-[#EFF6FF]",
                },
                application: {
                  icon: TrendingUp,
                  color: "text-[#7C3AED]",
                  bg: "bg-[#F5F3FF]",
                },
                tip: { icon: Zap, color: "text-[#D97706]", bg: "bg-[#FFFBEB]" },
                learning: {
                  icon: BookOpen,
                  color: "text-[#0891B2]",
                  bg: "bg-[#ECFEFF]",
                },
              };
              const cfg = iconMap[notif.type] ?? {
                icon: Bell,
                color: "text-[#64748B]",
                bg: "bg-[#F5F7FA]",
              };
              const Icon = cfg.icon;
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + i * 0.05 }}
                  className={cn(
                    "px-6 py-4 flex items-start gap-4 hover:bg-[#F8FAFC] transition-colors cursor-pointer",
                    !notif.read && "bg-[#EFF6FF]/30",
                  )}
                >
                  {" "}
                  <div
                    className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                      cfg.bg,
                    )}
                  >
                    {" "}
                    <Icon className={cn("w-4 h-4", cfg.color)} />{" "}
                  </div>{" "}
                  <div className="flex-1 min-w-0">
                    {" "}
                    <div className="flex items-start justify-between gap-2">
                      {" "}
                      <p className="text-sm font-semibold text-[#1E293B] leading-snug">
                        {notif.title}
                      </p>{" "}
                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-[#2563EB] shrink-0 mt-1.5" />
                      )}{" "}
                    </div>{" "}
                    <p className="text-sm text-[#64748B] mt-0.5 leading-snug">
                      {notif.message}
                    </p>{" "}
                    <p className="text-xs text-[#94A3B8] mt-1.5">
                      {notif.time}
                    </p>{" "}
                  </div>{" "}
                </motion.div>
              );
            })}{" "}
          </div>
        ) : (
          <ComingSoonState
            title="Notifications Coming Soon"
            desc="Push and in-app notifications will be integrated in a later step."
          />
        )}{" "}
      </motion.div>{" "}
    </div>
  );
}
