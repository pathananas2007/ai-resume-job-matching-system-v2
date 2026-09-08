import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  FileText,
  Target,
  BookOpen,
  BarChart2,
  Users,
  Briefcase,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Zap,
  TrendingUp,
  Award,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { ElevaraLogoMark } from "../../components/ui/ElevaraLogo"; /* ΓöÇΓöÇ Helpers ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  [key: string]: unknown;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.5,
        delay: shouldReduceMotion ? 0 : delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {" "}
      {children}{" "}
    </motion.div>
  );
}
function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      {" "}
      <ElevaraLogoMark size={32} />{" "}
      <span className="text-lg font-bold text-white tracking-tight">
        Elevara
      </span>{" "}
    </div>
  );
} /* ΓöÇΓöÇ Product UI Mockups ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
function DashboardMockup() {
  return (
    <div className="bg-[#F5F7FA] rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-2xl">
      {" "}
      {/* Topbar */}{" "}
      <div className="bg-white border-b border-[#E2E8F0] px-4 py-3 flex items-center gap-3">
        {" "}
        <div className="flex gap-1.5">
          {" "}
          <div className="w-3 h-3 rounded-full bg-[#EF4444]" />{" "}
          <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />{" "}
          <div className="w-3 h-3 rounded-full bg-[#22C55E]" />{" "}
        </div>{" "}
        <div className="flex-1 h-5 bg-[#F5F7FA] rounded-md mx-4" />{" "}
        <div className="w-6 h-6 rounded-full bg-[#EFF6FF] border border-[#BFDBFE]" />{" "}
      </div>{" "}
      <div className="flex">
        {" "}
        {/* Sidebar */}{" "}
        <div className="w-14 bg-white border-r border-[#E2E8F0] py-4 flex flex-col items-center gap-3">
          {" "}
          {[BarChart2, FileText, Briefcase, BookOpen, Settings].map(
            (Icon, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${i === 0 ? "bg-[#EFF6FF]" : "hover:bg-[#F5F7FA]"}`}
              >
                {" "}
                <Icon
                  className={`w-4 h-4 ${i === 0 ? "text-[#2563EB]" : "text-[#94A3B8]"}`}
                />{" "}
              </div>
            ),
          )}{" "}
        </div>{" "}
        {/* Content */}{" "}
        <div className="flex-1 p-4 space-y-3">
          {" "}
          {/* Stat cards */}{" "}
          <div className="grid grid-cols-3 gap-2">
            {" "}
            {[
              {
                label: "ATS Score",
                value: "78",
                color: "#2563EB",
                bg: "#EFF6FF",
              },
              {
                label: "Applications",
                value: "12",
                color: "#16A34A",
                bg: "#F0FDF4",
              },
              {
                label: "Interviews",
                value: "3",
                color: "#7C3AED",
                bg: "#F5F3FF",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-3 border border-[#E2E8F0]"
              >
                {" "}
                <div className="text-[10px] text-[#94A3B8] mb-1">
                  {s.label}
                </div>{" "}
                <div className="text-xl font-bold" style={{ color: s.color }}>
                  {s.value}
                </div>{" "}
                <div
                  className="mt-1.5 h-1 rounded-full"
                  style={{ backgroundColor: s.bg }}
                >
                  {" "}
                  <div
                    className="h-full rounded-full"
                    style={{ width: "65%", backgroundColor: s.color }}
                  />{" "}
                </div>{" "}
              </div>
            ))}{" "}
          </div>{" "}
          {/* Chart area */}{" "}
          <div className="bg-white rounded-lg p-3 border border-[#E2E8F0]">
            {" "}
            <div className="text-[10px] text-[#64748B] font-medium mb-2">
              ATS Score Trend
            </div>{" "}
            <div className="flex items-end gap-1 h-12">
              {" "}
              {[40, 52, 48, 61, 58, 72, 78].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    backgroundColor: i === 6 ? "#2563EB" : "#BFDBFE",
                  }}
                />
              ))}{" "}
            </div>{" "}
          </div>{" "}
          {/* Job matches */}{" "}
          <div className="bg-white rounded-lg p-3 border border-[#E2E8F0] space-y-2">
            {" "}
            <div className="text-[10px] text-[#64748B] font-medium">
              Top Job Matches
            </div>{" "}
            {[
              { title: "Senior React Dev", co: "Figma", match: 94 },
              { title: "Frontend Eng", co: "Loom", match: 87 },
            ].map((j, i) => (
              <div key={i} className="flex items-center gap-2">
                {" "}
                <div className="w-5 h-5 rounded bg-[#F5F7FA] border border-[#E2E8F0] flex items-center justify-center">
                  {" "}
                  <Briefcase className="w-2.5 h-2.5 text-[#94A3B8]" />{" "}
                </div>{" "}
                <div className="flex-1 min-w-0">
                  {" "}
                  <div className="text-[10px] font-medium text-[#1E293B] truncate">
                    {j.title}
                  </div>{" "}
                  <div className="text-[9px] text-[#94A3B8]">{j.co}</div>{" "}
                </div>{" "}
                <div className="text-[10px] font-bold text-[#22C55E]">
                  {j.match}%
                </div>{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
function ATSScoreMockup() {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-lg">
      {" "}
      <div className="text-xs font-semibold text-[#64748B] mb-3">
        Resume Analysis
      </div>{" "}
      <div className="flex items-center gap-4 mb-4">
        {" "}
        <div className="relative w-16 h-16 shrink-0">
          {" "}
          <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
            {" "}
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="6"
            />{" "}
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="#2563EB"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 26}`}
              strokeDashoffset={`${2 * Math.PI * 26 * (1 - 0.78)}`}
            />{" "}
          </svg>{" "}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {" "}
            <span className="text-sm font-bold text-[#2563EB]">78</span>{" "}
            <span className="text-[8px] text-[#94A3B8]">/100</span>{" "}
          </div>{" "}
        </div>{" "}
        <div className="flex-1 space-y-2">
          {" "}
          {[
            { l: "Skills", v: 82 },
            { l: "Experience", v: 74 },
            { l: "Education", v: 79 },
          ].map((s, i) => (
            <div key={i}>
              {" "}
              <div className="flex justify-between text-[9px] text-[#64748B] mb-0.5">
                {" "}
                <span>{s.l}</span>
                <span className="font-medium text-[#1E293B]">{s.v}%</span>{" "}
              </div>{" "}
              <div className="h-1 bg-[#E2E8F0] rounded-full overflow-hidden">
                {" "}
                <div
                  className="h-full bg-[#2563EB] rounded-full"
                  style={{ width: `${s.v}%` }}
                />{" "}
              </div>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>{" "}
      <div className="flex gap-1.5 flex-wrap">
        {" "}
        {["Python", "React", "SQL", "AWS"].map((s) => (
          <span
            key={s}
            className="px-2 py-0.5 bg-[#EFF6FF] text-[#2563EB] text-[9px] font-medium rounded-full border border-[#BFDBFE]"
          >
            {s}
          </span>
        ))}{" "}
        <span className="px-2 py-0.5 bg-[#FEF2F2] text-[#DC2626] text-[9px] font-medium rounded-full border border-[#FECACA]">
          + 3 gaps
        </span>{" "}
      </div>{" "}
    </div>
  );
}
function SkillGapMockup() {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-lg">
      {" "}
      <div className="text-xs font-semibold text-[#64748B] mb-3">
        Skill Gap Analysis
      </div>{" "}
      <div className="space-y-2">
        {" "}
        {[
          { skill: "TypeScript", status: "match", candidate: 8, required: 8 },
          { skill: "System Design", status: "gap", candidate: 4, required: 8 },
          { skill: "Docker", status: "close", candidate: 6, required: 8 },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            {" "}
            <span className="text-[10px] font-medium text-[#1E293B] w-24 shrink-0">
              {item.skill}
            </span>{" "}
            <span
              className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${item.status === "match" ? "bg-[#F0FDF4] text-[#16A34A]" : item.status === "close" ? "bg-[#FFFBEB] text-[#D97706]" : "bg-[#FEF2F2] text-[#DC2626]"}`}
            >
              {item.status.toUpperCase()}
            </span>{" "}
            <div className="flex-1 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
              {" "}
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(item.candidate / 10) * 100}%`,
                  backgroundColor:
                    item.status === "match"
                      ? "#22C55E"
                      : item.status === "close"
                        ? "#F59E0B"
                        : "#EF4444",
                }}
              />{" "}
            </div>{" "}
            <span className="text-[9px] text-[#64748B] shrink-0">
              {item.candidate}/10
            </span>{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
} /* ΓöÇΓöÇ Section data ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
const FEATURES = [
  {
    icon: FileText,
    title: "Resume Analysis",
    desc: "Analyze resumes and receive actionable insights on ATS compatibility, skill alignment, and improvement areas.",
    color: "bg-[#EFF6FF] text-[#2563EB]",
  },
  {
    icon: Target,
    title: "AI Job Matching",
    desc: "Discover opportunities aligned with your skills and experience through intelligent compatibility scoring.",
    color: "bg-[#ECFEFF] text-[#0891B2]",
  },
  {
    icon: Zap,
    title: "Skill Gap Detection",
    desc: "Identify missing skills and learning priorities based on your target roles and current profile.",
    color: "bg-[#F5F3FF] text-[#7C3AED]",
  },
  {
    icon: BookOpen,
    title: "Learning Hub",
    desc: "Access curated learning resources, certifications, and roadmaps tailored to your skill gaps.",
    color: "bg-[#F0FDF4] text-[#16A34A]",
  },
  {
    icon: BarChart2,
    title: "Career Analytics",
    desc: "Track your ATS score trend, application pipeline, and professional growth over time.",
    color: "bg-[#FFFBEB] text-[#D97706]",
  },
  {
    icon: Users,
    title: "Recruiter Intelligence",
    desc: "Help recruiters evaluate candidates efficiently with AI-powered ranking and structured workflows.",
    color: "bg-[#FEF2F2] text-[#DC2626]",
  },
];
const STEPS = [
  {
    n: "01",
    title: "Create Your Profile",
    desc: "Sign up as a job seeker or recruiter. Set your role, goals, and professional background.",
  },
  {
    n: "02",
    title: "Upload Your Resume",
    desc: "Upload a PDF or paste your resume text. AI parses and extracts your skills and experience.",
  },
  {
    n: "03",
    title: "Analyze Skills & ATS Score",
    desc: "Get your ATS compatibility score, skill breakdown, and a detailed gap analysis report.",
  },
  {
    n: "04",
    title: "Discover Opportunities & Gaps",
    desc: "Browse AI-matched jobs, see compatibility scores, and understand exactly what to improve.",
  },
  {
    n: "05",
    title: "Track Growth & Progress",
    desc: "Monitor your ATS score trend, application pipeline, and skill development over time.",
  },
];
const SEEKER_FEATURES = [
  {
    icon: FileText,
    title: "Resume Intelligence",
    desc: "ATS score, skill extraction, and detailed feedback on every resume upload.",
  },
  {
    icon: Target,
    title: "Personalized Recommendations",
    desc: "Job matches and learning resources tailored to your specific profile and goals.",
  },
  {
    icon: BookOpen,
    title: "Learning Roadmaps",
    desc: "Structured paths to close skill gaps with curated courses and certifications.",
  },
  {
    icon: Zap,
    title: "Skill Gap Analysis",
    desc: "Side-by-side comparison of your skills against job requirements.",
  },
  {
    icon: BarChart2,
    title: "Career Analytics",
    desc: "Visual dashboards tracking your progress, applications, and score improvements.",
  },
  {
    icon: TrendingUp,
    title: "Application Tracking",
    desc: "Full pipeline visibility from applied to interview to offer.",
  },
];
const RECRUITER_FEATURES = [
  {
    icon: Award,
    title: "Resume Ranking",
    desc: "AI scores every applicant on the same objective rubric for fair comparison.",
  },
  {
    icon: Users,
    title: "Candidate Comparison",
    desc: "Side-by-side analysis of top candidates across skills, experience, and fit.",
  },
  {
    icon: TrendingUp,
    title: "Applicant Tracking",
    desc: "Structured pipeline from applied through screening, interview, and selection.",
  },
  {
    icon: BarChart2,
    title: "Hiring Analytics",
    desc: "Funnel metrics, candidate quality trends, and time-to-hire insights.",
  },
  {
    icon: Zap,
    title: "Skill Evaluation",
    desc: "Detailed skill breakdown showing candidate level vs. role requirements.",
  },
  {
    icon: Target,
    title: "Structured Workflow",
    desc: "Consistent, repeatable hiring process with AI-assisted decision support.",
  },
];
const CAPABILITIES = [
  {
    label: "Resume Analysis",
    desc: "ATS scoring, skill extraction, and actionable feedback",
  },
  {
    label: "Job Matching",
    desc: "AI-powered compatibility scoring against job requirements",
  },
  {
    label: "Skill Gap Analysis",
    desc: "Identify missing skills with learning recommendations",
  },
  {
    label: "Learning Recommendations",
    desc: "Curated resources mapped to your specific gaps",
  },
  {
    label: "Career Tracking",
    desc: "Progress monitoring across applications and skill growth",
  },
  {
    label: "Recruiter Analytics",
    desc: "Candidate ranking and hiring pipeline intelligence",
  },
];
const WHY_ELEVARA = [
  {
    icon: Target,
    title: "Single Platform",
    desc: "Resume analysis, job matching, skill development, and application tracking ΓÇö all in one place.",
  },
  {
    icon: BarChart2,
    title: "Data-Driven Insights",
    desc: "Every recommendation is backed by structured analysis, not guesswork.",
  },
  {
    icon: TrendingUp,
    title: "Career Focused",
    desc: "Built specifically for professional growth, not just job searching.",
  },
  {
    icon: Users,
    title: "Recruiter Friendly",
    desc: "Designed to work for both sides of the hiring process.",
  },
  {
    icon: BookOpen,
    title: "Professional Development",
    desc: "Continuous learning integration keeps your skills current and competitive.",
  },
  {
    icon: Award,
    title: "Scalable Career Management",
    desc: "Grows with you from entry-level to senior roles and beyond.",
  },
];
const FAQS = [
  {
    q: "What is Elevara?",
    a: "Elevara is an AI-powered career growth platform that helps job seekers analyze their resumes, identify skill gaps, discover job opportunities, and track their professional development. It also provides recruiters with intelligent candidate ranking and hiring workflow tools.",
  },
  {
    q: "How does resume analysis work?",
    a: "You upload a PDF or paste your resume text. Our AI engine parses the content, extracts skills and experience, calculates an ATS compatibility score, and generates a detailed report with specific improvement recommendations.",
  },
  {
    q: "How are job matches generated?",
    a: "Job matches are generated by comparing your extracted skills, experience level, and profile against job requirements. Each match includes a compatibility percentage and a breakdown of matching skills and gaps.",
  },
  {
    q: "Can recruiters use Elevara?",
    a: "Yes. Recruiters can post jobs, receive applications, and get AI-ranked candidate lists with detailed analysis for each applicant. The platform supports structured hiring workflows from application through selection.",
  },
  {
    q: "Is Elevara free?",
    a: "Elevara offers a free plan with core features including resume analysis and job browsing. Advanced features for deeper analytics and recruiter tools are available on paid plans.",
  },
  {
    q: "Can I track skill growth over time?",
    a: "Yes. Your ATS score history, skill improvements, and application outcomes are tracked and visualized in your analytics dashboard, giving you a clear picture of your professional progress.",
  },
]; /* ΓöÇΓöÇ FAQ Item ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="border border-slate-700 rounded-xl overflow-hidden bg-slate-800 hover:border-slate-500 transition-colors">
      {" "}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-700 transition-colors group"
      >
        {" "}
        <span className="text-base font-semibold text-white pr-4 group-hover:text-blue-400 transition-colors">
          {q}
        </span>{" "}
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          className="shrink-0"
        >
          {" "}
          {open ? (
            <ChevronUp className="w-5 h-5 text-[#2563EB]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-[#64748B]" />
          )}{" "}
        </motion.div>{" "}
      </button>{" "}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.22,
          ease: "easeInOut",
        }}
        className="overflow-hidden"
      >
        {" "}
        <p className="px-6 pb-5 text-slate-400 leading-relaxed">{a}</p>{" "}
      </motion.div>{" "}
    </div>
  );
} /* ΓöÇΓöÇ Main Component ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#0f172a] font-sans">
      {" "}
      {/* ΓöÇΓöÇ Navbar ΓöÇΓöÇ */}{" "}
      <nav className="sticky top-0 z-50 bg-[#0f172a]/95 backdrop-blur-xl border-b border-slate-700 shadow-sm">
        {" "}
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {" "}
          <Logo /> {/* Desktop nav */}{" "}
          <div className="hidden md:flex items-center gap-10">
            {" "}
            {[
              { label: "Features", href: "#features" },
              { label: "How It Works", href: "#how-it-works" },
              { label: "For Seekers", href: "#for-seekers" },
              { label: "For Recruiters", href: "#for-recruiters" },
              { label: "FAQ", href: "#faq" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors duration-200"
              >
                {" "}
                {item.label}{" "}
              </a>
            ))}{" "}
          </div>{" "}
          <div className="hidden md:flex items-center gap-3">
            {" "}
            <Link
              to="/login"
              className="btn-ghost btn-sm text-slate-300 hover:text-white"
            >
              Sign in
            </Link>{" "}
            <Link
              to="/register"
              className="btn-primary btn-sm shadow-md hover:shadow-lg transition-shadow"
            >
              Get started free
            </Link>{" "}
          </div>{" "}
          {/* Mobile menu button */}{" "}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden p-2 text-[#64748B] hover:text-[#1E293B] hover:bg-[#F5F7FA] rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {" "}
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}{" "}
          </button>{" "}
        </div>{" "}
        {/* Mobile menu */}{" "}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-[#0f172a] border-t border-slate-700 px-6 py-5 space-y-1 shadow-sm"
          >
            {" "}
            {[
              "Features",
              "How It Works",
              "For Seekers",
              "For Recruiters",
              "FAQ",
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 py-2.5 px-3 rounded-lg transition-all"
              >
                {" "}
                {item}{" "}
              </a>
            ))}{" "}
            <div className="flex gap-3 pt-4 border-t border-[#E2E8F0] mt-4">
              {" "}
              <Link
                to="/login"
                className="btn-secondary btn-sm flex-1 justify-center"
              >
                Sign in
              </Link>{" "}
              <Link
                to="/register"
                className="btn-primary btn-sm flex-1 justify-center"
              >
                Get started
              </Link>{" "}
            </div>{" "}
          </motion.div>
        )}{" "}
      </nav>{" "}
      {/* ΓöÇΓöÇ SECTION 1: Hero ΓöÇΓöÇ */}{" "}
      <section className="pt-16 pb-24 px-6 overflow-hidden relative">
        {" "}
        {/* Subtle background gradient accent */}{" "}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 via-transparent to-[#06B6D4]/5 pointer-events-none" />{" "}
        <div className="max-w-7xl mx-auto relative z-10">
          {" "}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {" "}
            {/* Left */}{" "}
            <div>
              {" "}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {" "}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#EFF6FF] to-[#ECFEFF] border border-[#BFDBFE] rounded-full text-xs font-semibold text-[#2563EB] mb-8 shadow-sm">
                  {" "}
                  <Zap className="w-3.5 h-3.5" /> Powered by Gemini AI{" "}
                </div>{" "}
                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-8">
                  {" "}
                  Grow Your Career With{" "}
                  <span className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
                    AI-Powered
                  </span>{" "}
                  Insights{" "}
                </h1>{" "}
                <p className="text-lg lg:text-xl text-slate-300 leading-relaxed mb-10 max-w-lg">
                  {" "}
                  Analyze resumes, identify skill gaps, discover opportunities,
                  and track career growth through a single intelligent
                  platform.{" "}
                </p>{" "}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  {" "}
                  <Link
                    to="/register"
                    className="btn-primary btn-xl shadow-lg hover:shadow-xl transition-shadow"
                  >
                    {" "}
                    Get Started Free <ArrowRight className="w-5 h-5" />{" "}
                  </Link>{" "}
                  <a
                    href="#features"
                    className="btn-secondary btn-xl hover:bg-[#F8FAFC]"
                  >
                    {" "}
                    Explore Features{" "}
                  </a>{" "}
                </div>{" "}
                <p className="text-sm text-[#94A3B8] font-medium">
                  Γ£ô No credit card required
                </p>{" "}
              </motion.div>{" "}
            </div>{" "}
            {/* Right ΓÇö product mockups */}{" "}
            <div className="relative hidden lg:block">
              {" "}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {" "}
                <img src="https://i.ibb.co/JwCkcJkC/Chat-GPT-Image-Sep-8-2026-10-44-50-AM.png" alt="Dashboard Overview" className="w-full rounded-xl object-cover" />{" "}
              </motion.div>{" "}
              {/* Floating ATS card */}{" "}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -bottom-6 -left-8 w-64 shadow-lg"
              >
                {" "}
                {" "}
              </motion.div>{" "}
            </div>{" "}
          </div>{" "}
          {/* Mobile mockup */}{" "}
          <div className="lg:hidden mt-16 space-y-4">
            {" "}
             <img src="https://i.ibb.co/FLK4zsL8/Chat-GPT-Image-Sep-8-2026-10-50-49-AM.png" alt="Resume Analysis" className="w-full rounded-xl object-cover" />{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* ΓöÇΓöÇ SECTION 2: What Elevara Does ΓöÇΓöÇ */}{" "}
      <section
        id="features"
        className="py-24 px-6 bg-[#0f172a]"
      >
        {" "}
        <div className="max-w-7xl mx-auto">
          {" "}
          <FadeIn className="text-center mb-16">
            {" "}
            <p className="text-sm font-semibold text-[#2563EB] uppercase tracking-widest mb-3">
              Platform Capabilities
            </p>{" "}
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5">
              Everything You Need To Grow Professionally
            </h2>{" "}
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {" "}
              A complete career intelligence platform covering every stage of
              your professional journey.{" "}
            </p>{" "}
          </FadeIn>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {" "}
            {FEATURES.map((f, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                {" "}
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl border border-[#E2E8F0] p-7 h-full hover:shadow-md hover:border-[#CBD5E1] transition-all duration-300 group"
                >
                  {" "}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${f.color}`}
                  >
                    {" "}
                    <f.icon className="w-6 h-6" />{" "}
                  </div>{" "}
                  <h3 className="text-lg font-semibold text-[#1E293B] mb-2">
                    {f.title}
                  </h3>{" "}
                  <p className="text-[#64748B] leading-relaxed">
                    {f.desc}
                  </p>{" "}
                </motion.div>{" "}
              </FadeIn>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* ΓöÇΓöÇ SECTION 3: How It Works ΓöÇΓöÇ */}{" "}
      <section id="how-it-works" className="py-24 px-6 bg-[#0f172a]">
        {" "}
        <div className="max-w-5xl mx-auto">
          {" "}
          <FadeIn className="text-center mb-16">
            {" "}
            <p className="text-sm font-semibold text-[#2563EB] uppercase tracking-widest mb-3">
              Process
            </p>{" "}
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Your Career Journey In Five Steps
            </h2>{" "}
          </FadeIn>{" "}
          <div className="relative">
            {" "}
            {/* Timeline line */}{" "}
            <div
              className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2563EB] via-[#06B6D4] to-[#E2E8F0] hidden md:block"
              style={{ left: "2.75rem" }}
            />{" "}
            <div className="space-y-10">
              {" "}
              {STEPS.map((step, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  {" "}
                  <div className="flex gap-8 items-start">
                    {" "}
                    <div className="relative shrink-0">
                      {" "}
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border-2 z-10 relative transition-all ${i === 0 ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md" : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB] hover:text-[#2563EB]"}`}
                      >
                        {" "}
                        {step.n}{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="flex-1 pb-2">
                      {" "}
                      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 hover:shadow-sm hover:border-[#CBD5E1] transition-all group">
                        {" "}
                        <h3 className="text-lg font-semibold text-[#1E293B] mb-2 group-hover:text-[#2563EB] transition-colors">
                          {step.title}
                        </h3>{" "}
                        <p className="text-[#64748B] leading-relaxed">
                          {step.desc}
                        </p>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </FadeIn>
              ))}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* ΓöÇΓöÇ SECTION 4: Product Preview ΓöÇΓöÇ */}{" "}
      <section
        id="product-preview"
        className="py-24 px-6 bg-[#0f172a]"
      >
        {" "}
        <div className="max-w-7xl mx-auto">
          {" "}
          <FadeIn className="text-center mb-16">
            {" "}
            <p className="text-sm font-semibold text-[#2563EB] uppercase tracking-widest mb-3">
              Product Preview
            </p>{" "}
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5">
              See Elevara In Action
            </h2>{" "}
            <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
              {" "}
              A look at the actual platform interface ΓÇö built for clarity and
              professional use.{" "}
            </p>{" "}
          </FadeIn>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {" "}
            <FadeIn delay={0.1}>
              {" "}
              <div className="bg-slate-800 rounded-2xl border border-slate-700 p-7 shadow-sm hover:shadow-md transition-shadow">
                {" "}
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
                  Dashboard Overview
                </p>{" "}
                <img src="https://i.ibb.co/JwCkcJkC/Chat-GPT-Image-Sep-8-2026-10-44-50-AM.png" alt="Dashboard Overview" className="w-full rounded-xl object-cover" />{" "}
              </div>{" "}
            </FadeIn>{" "}
            <FadeIn delay={0.2}>
              {" "}
              <div className="bg-slate-800 rounded-2xl border border-slate-700 p-7 shadow-sm hover:shadow-md transition-shadow space-y-5">
                {" "}
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  Resume Analysis
                </p>{" "}
                 <img src="https://i.ibb.co/FLK4zsL8/Chat-GPT-Image-Sep-8-2026-10-50-49-AM.png" alt="Resume Analysis" className="w-full rounded-xl object-cover" />{" "}
              </div>{" "}
            </FadeIn>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* ΓöÇΓöÇ SECTION 5: For Job Seekers ΓöÇΓöÇ */}{" "}
      <section id="for-seekers" className="py-24 px-6 bg-[#0f172a]">
        {" "}
        <div className="max-w-7xl mx-auto">
          {" "}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {" "}
            <FadeIn>
              {" "}
              <div className="space-y-8">
                {" "}
                <div>
                  {" "}
                  <p className="text-sm font-semibold text-[#2563EB] uppercase tracking-widest mb-3">
                    For Job Seekers
                  </p>{" "}
                  <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
                    {" "}
                    Built For Career Growth{" "}
                  </h2>{" "}
                  <p className="text-lg text-[#64748B] leading-relaxed">
                    {" "}
                    Everything you need to understand your professional
                    standing, close skill gaps, and make informed career
                    decisions.{" "}
                  </p>{" "}
                </div>{" "}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {" "}
                  {SEEKER_FEATURES.map((f, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-start gap-3 group"
                    >
                      {" "}
                      <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#DBEAFE] transition-colors">
                        {" "}
                        <f.icon className="w-4 h-4 text-[#2563EB]" />{" "}
                      </div>{" "}
                      <div>
                        {" "}
                        <p className="text-sm font-semibold text-[#1E293B] group-hover:text-[#2563EB] transition-colors">
                          {f.title}
                        </p>{" "}
                        <p className="text-sm text-[#64748B] mt-1 leading-snug">
                          {f.desc}
                        </p>{" "}
                      </div>{" "}
                    </motion.div>
                  ))}{" "}
                </div>{" "}
                <Link
                  to="/register"
                  className="btn-primary btn-lg inline-flex shadow-lg hover:shadow-xl transition-shadow w-fit"
                >
                  {" "}
                  Start as a Job Seeker <ArrowRight className="w-5 h-5" />{" "}
                </Link>{" "}
              </div>{" "}
            </FadeIn>{" "}
            <FadeIn delay={0.15}>
              {" "}
              <div className="space-y-4">
                {" "}
                 <img src="https://i.ibb.co/FLK4zsL8/Chat-GPT-Image-Sep-8-2026-10-50-49-AM.png" alt="Resume Analysis" className="w-full rounded-xl object-cover" />{" "}
              </div>{" "}
            </FadeIn>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* ΓöÇΓöÇ SECTION 6: For Recruiters ΓöÇΓöÇ */}{" "}
      <section
        id="for-recruiters"
        className="py-24 px-6 bg-gradient-to-b from-[#F5F7FA] to-white"
      >
        {" "}
        <div className="max-w-7xl mx-auto">
          {" "}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {" "}
            <FadeIn delay={0.1} className="order-2 lg:order-1">
              {" "}
              {/* Recruiter mockup */}{" "}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm hover:shadow-md transition-shadow">
                {" "}
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
                  Candidate Ranking ΓÇö Senior React Developer
                </div>{" "}
                <div className="space-y-3">
                  {" "}
                  {[
                    {
                      name: "Arjun Mehta",
                      score: 94,
                      rec: "Interview",
                      skills: ["React", "TypeScript", "Node.js"],
                    },
                    {
                      name: "Priya Sharma",
                      score: 88,
                      rec: "Interview",
                      skills: ["React", "GraphQL", "AWS"],
                    },
                    {
                      name: "Rahul Gupta",
                      score: 76,
                      rec: "Consider",
                      skills: ["Vue", "JavaScript", "CSS"],
                    },
                  ].map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#BFDBFE] hover:bg-[#F0F8FF] transition-all group"
                    >
                      {" "}
                      <div className="w-8 h-8 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-xs font-bold text-[#2563EB] shrink-0 group-hover:bg-[#DBEAFE] transition-colors">
                        {" "}
                        {c.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}{" "}
                      </div>{" "}
                      <div className="flex-1 min-w-0">
                        {" "}
                        <div className="flex items-center justify-between mb-1">
                          {" "}
                          <p className="text-sm font-semibold text-[#1E293B] group-hover:text-[#2563EB] transition-colors">
                            {c.name}
                          </p>{" "}
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${c.rec === "Interview" ? "bg-[#F0FDF4] text-[#16A34A]" : "bg-[#FFFBEB] text-[#D97706]"}`}
                          >
                            {" "}
                            {c.rec}{" "}
                          </span>{" "}
                        </div>{" "}
                        <div className="flex items-center gap-2">
                          {" "}
                          <div className="flex-1 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                            {" "}
                            <div
                              className="h-full bg-[#2563EB] rounded-full"
                              style={{ width: `${c.score}%` }}
                            />{" "}
                          </div>{" "}
                          <span className="text-xs font-bold text-[#2563EB] shrink-0">
                            {c.score}%
                          </span>{" "}
                        </div>{" "}
                        <div className="flex gap-1 mt-1.5 flex-wrap">
                          {" "}
                          {c.skills.map((s) => (
                            <span
                              key={s}
                              className="text-[8px] px-1.5 py-0.5 bg-[#EFF6FF] text-[#2563EB] rounded-full border border-[#BFDBFE]"
                            >
                              {s}
                            </span>
                          ))}{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>
                  ))}{" "}
                </div>{" "}
              </div>{" "}
            </FadeIn>{" "}
            <FadeIn className="order-1 lg:order-2">
              {" "}
              <div className="space-y-8">
                {" "}
                <div>
                  {" "}
                  <p className="text-sm font-semibold text-[#2563EB] uppercase tracking-widest mb-3">
                    For Recruiters
                  </p>{" "}
                  <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
                    {" "}
                    Built For Smarter Hiring{" "}
                  </h2>{" "}
                  <p className="text-lg text-[#64748B] leading-relaxed">
                    {" "}
                    Evaluate candidates efficiently with AI-powered ranking,
                    structured workflows, and objective scoring.{" "}
                  </p>{" "}
                </div>{" "}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {" "}
                  {RECRUITER_FEATURES.map((f, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-start gap-3 group"
                    >
                      {" "}
                      <div className="w-8 h-8 rounded-lg bg-[#F0FDF4] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#DCFCE7] transition-colors">
                        {" "}
                        <f.icon className="w-4 h-4 text-[#16A34A]" />{" "}
                      </div>{" "}
                      <div>
                        {" "}
                        <p className="text-sm font-semibold text-[#1E293B] group-hover:text-[#16A34A] transition-colors">
                          {f.title}
                        </p>{" "}
                        <p className="text-sm text-[#64748B] mt-1 leading-snug">
                          {f.desc}
                        </p>{" "}
                      </div>{" "}
                    </motion.div>
                  ))}{" "}
                </div>{" "}
                <Link
                  to="/register"
                  className="btn-primary btn-lg inline-flex shadow-lg hover:shadow-xl transition-shadow w-fit"
                >
                  {" "}
                  Start as a Recruiter <ArrowRight className="w-5 h-5" />{" "}
                </Link>{" "}
              </div>{" "}
            </FadeIn>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* ΓöÇΓöÇ SECTION 7: Platform Capabilities ΓöÇΓöÇ */}{" "}
      <section className="py-24 px-6 bg-[#0f172a]">
        {" "}
        <div className="max-w-7xl mx-auto">
          {" "}
          <FadeIn className="text-center mb-16">
            {" "}
            <p className="text-sm font-semibold text-[#2563EB] uppercase tracking-widest mb-3">
              What's Included
            </p>{" "}
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5">
              Platform Capabilities
            </h2>{" "}
            <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
              {" "}
              A comprehensive set of tools covering every aspect of career
              development and talent acquisition.{" "}
            </p>{" "}
          </FadeIn>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {" "}
            {CAPABILITIES.map((c, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                {" "}
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-4 p-6 rounded-xl border border-[#E2E8F0] bg-white hover:shadow-sm hover:border-[#CBD5E1] transition-all group"
                >
                  {" "}
                  <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    {" "}
                    <CheckCircle className="w-4 h-4 text-[#2563EB]" />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <p className="text-sm font-semibold text-[#1E293B] group-hover:text-[#2563EB] transition-colors">
                      {c.label}
                    </p>{" "}
                    <p className="text-sm text-[#64748B] mt-1 leading-snug">
                      {c.desc}
                    </p>{" "}
                  </div>{" "}
                </motion.div>{" "}
              </FadeIn>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* ΓöÇΓöÇ SECTION 8: Why Elevara ΓöÇΓöÇ */}{" "}
      <section className="py-24 px-6 bg-gradient-to-b from-[#F5F7FA] to-white">
        {" "}
        <div className="max-w-7xl mx-auto">
          {" "}
          <FadeIn className="text-center mb-16">
            {" "}
            <p className="text-sm font-semibold text-[#2563EB] uppercase tracking-widest mb-3">
              Our Approach
            </p>{" "}
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Why Choose Elevara
            </h2>{" "}
          </FadeIn>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {" "}
            {WHY_ELEVARA.map((item, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                {" "}
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl border border-[#E2E8F0] p-7 h-full hover:shadow-md hover:border-[#CBD5E1] transition-all duration-300 group"
                >
                  {" "}
                  <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    {" "}
                    <item.icon className="w-6 h-6 text-[#2563EB]" />{" "}
                  </div>{" "}
                  <h3 className="text-lg font-semibold text-[#1E293B] mb-2 group-hover:text-[#2563EB] transition-colors">
                    {item.title}
                  </h3>{" "}
                  <p className="text-[#64748B] leading-relaxed">
                    {item.desc}
                  </p>{" "}
                </motion.div>{" "}
              </FadeIn>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* ΓöÇΓöÇ SECTION 9: FAQ ΓöÇΓöÇ */}{" "}
      <section id="faq" className="py-24 px-6 bg-slate-900">
        {" "}
        <div className="max-w-3xl mx-auto">
          {" "}
          <FadeIn className="text-center mb-16">
            {" "}
            <p className="text-sm font-semibold text-[#2563EB] uppercase tracking-widest mb-3">
              FAQ
            </p>{" "}
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Common Questions
            </h2>{" "}
          </FadeIn>{" "}
          <div className="space-y-4">
            {" "}
            {FAQS.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                {" "}
                <FAQItem q={faq.q} a={faq.a} />{" "}
              </FadeIn>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* ΓöÇΓöÇ SECTION 10: Final CTA ΓöÇΓöÇ */}{" "}
      <section className="py-24 px-6 bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#06B6D4] relative overflow-hidden">
        {" "}
        {/* Subtle accent background */}{" "}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
            backgroundPosition: "0 0",
            backgroundSize: "200% 200%",
          }}
        />{" "}
        <div className="max-w-3xl mx-auto text-center relative z-10">
          {" "}
          <FadeIn>
            {" "}
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
              {" "}
              Start Building Your Career Advantage{" "}
            </h2>{" "}
            <p className="text-blue-100 text-lg mb-12 leading-relaxed max-w-xl mx-auto">
              {" "}
              Discover opportunities, improve your skills, and make informed
              career decisions with AI-powered insights.{" "}
            </p>{" "}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {" "}
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 font-semibold text-base rounded-lg bg-white text-[#2563EB] hover:bg-blue-50 transition-all min-h-[52px] px-8 w-full sm:w-auto shadow-xl hover:shadow-2xl"
              >
                {" "}
                Get Started Free <ArrowRight className="w-5 h-5" />{" "}
              </Link>{" "}
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 font-semibold text-base rounded-lg bg-white/15 text-white border border-white/30 hover:bg-white/25 transition-all min-h-[52px] px-8 w-full sm:w-auto backdrop-blur-sm"
              >
                {" "}
                Sign In{" "}
              </Link>{" "}
            </div>{" "}
          </FadeIn>{" "}
        </div>{" "}
      </section>{" "}
      {/* ΓöÇΓöÇ Footer ΓöÇΓöÇ */}{" "}
      <footer className="py-12 px-6 bg-slate-900 border-t border-slate-700">
        {" "}
        <div className="max-w-7xl mx-auto">
          {" "}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            {" "}
            <div className="col-span-2 md:col-span-1">
              {" "}
              <Logo />{" "}
              <p className="text-sm text-slate-400 mt-4 leading-relaxed">
                {" "}
                An AI-powered career growth and hiring platform.{" "}
              </p>{" "}
            </div>{" "}
            <div>
              {" "}
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-4">
                Platform
              </p>{" "}
              <div className="space-y-3">
                {" "}
                {["Features", "Jobs", "Learning Hub"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                    className="block text-sm text-[#64748B] hover:text-[#2563EB] transition-colors"
                  >
                    {" "}
                    {item}{" "}
                  </a>
                ))}{" "}
              </div>{" "}
            </div>{" "}
            <div>
              {" "}
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-4">
                Legal
              </p>{" "}
              <div className="space-y-3">
                {" "}
                <p className="text-sm text-slate-500">Coming Soon</p>{" "}
              </div>{" "}
            </div>{" "}
            <div>
              {" "}
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-4">
                Connect
              </p>{" "}
              <div className="space-y-3">
                {" "}
                <a
                  href="tel:+917028388155"
                  className="block text-sm text-[#64748B] hover:text-[#2563EB] transition-colors"
                  title="Call Anas Pathan"
                >
                  {" "}
                  ≡ƒô₧ +91 702-838-8155{" "}
                </a>{" "}
                <a
                  href="mailto:pathananas2007@gmail.com"
                  className="block text-sm text-[#64748B] hover:text-[#2563EB] transition-colors"
                  title="Email Anas Pathan"
                >
                  {" "}
                  Γ£ë∩╕Å pathananas2007@gmail.com{" "}
                </a>{" "}
                <a
                  href="https://www.linkedin.com/in/anas-pathan-91a6b3368/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-[#64748B] hover:text-[#2563EB] transition-colors"
                  title="Visit LinkedIn profile"
                >
                  {" "}
                  ≡ƒÆ╝ LinkedIn Profile{" "}
                </a>{" "}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-[#64748B] hover:text-[#2563EB] transition-colors"
                  title="Visit GitHub profile"
                >
                  {" "}
                  ≡ƒÉÖ GitHub Projects{" "}
                </a>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="border-t border-slate-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {" "}
            <p className="text-sm text-slate-500">
              ┬⌐ {new Date().getFullYear()} Elevara. All rights reserved.
            </p>{" "}
            <p className="text-sm text-slate-500">
              Built with React, TypeScript & Gemini AI
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </footer>{" "}
    </div>
  );
}
