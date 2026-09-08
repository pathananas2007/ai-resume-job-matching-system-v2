import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Filter,
  Eye,
  Star,
  X,
  ChevronDown,
  Clock,
  Briefcase,
  Award,
  Users,
  SlidersHorizontal,
  CheckCircle,
  XCircle,
  MessageSquare,
} from "lucide-react";
import { cn } from "../../../lib/utils";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts"; /* ── Types & Data ────────────────────────────────────────────────────────────── */
interface Candidate {
  id: string;
  name: string;
  role: string;
  score: number;
  skillsMatch: number;
  expMatch: number;
  status: "applied" | "screening" | "interview" | "selected" | "rejected";
  rec: "Strong Hire" | "Hire" | "Consider" | "No Hire";
  skills: string[];
  experience: string;
  education: string;
  appliedDate: string;
  jobTitle: string;
  radarData: { subject: string; A: number; B: number }[];
}
const CANDIDATES: Candidate[] = [
  {
    id: "1",
    name: "Arjun Mehta",
    role: "Senior React Developer",
    score: 94,
    skillsMatch: 96,
    expMatch: 92,
    status: "interview",
    rec: "Strong Hire",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    experience: "6 years",
    education: "B.Tech Computer Science",
    appliedDate: "Jul 1, 2025",
    jobTitle: "Senior React Developer",
    radarData: [
      { subject: "Frontend", A: 9, B: 9 },
      { subject: "Backend", A: 7, B: 8 },
      { subject: "DevOps", A: 6, B: 7 },
      { subject: "System Design", A: 8, B: 8 },
      { subject: "Testing", A: 8, B: 7 },
    ],
  },
  {
    id: "2",
    name: "Priya Sharma",
    role: "Full Stack Engineer",
    score: 89,
    skillsMatch: 91,
    expMatch: 87,
    status: "screening",
    rec: "Hire",
    skills: ["React", "Python", "AWS", "PostgreSQL"],
    experience: "5 years",
    education: "M.S. Software Engineering",
    appliedDate: "Jun 30, 2025",
    jobTitle: "Full Stack Engineer",
    radarData: [
      { subject: "Frontend", A: 8, B: 8 },
      { subject: "Backend", A: 8, B: 9 },
      { subject: "DevOps", A: 7, B: 7 },
      { subject: "System Design", A: 7, B: 8 },
      { subject: "Testing", A: 7, B: 7 },
    ],
  },
  {
    id: "3",
    name: "Rahul Gupta",
    role: "Frontend Engineer",
    score: 83,
    skillsMatch: 85,
    expMatch: 81,
    status: "applied",
    rec: "Hire",
    skills: ["Vue", "TypeScript", "CSS", "GraphQL"],
    experience: "4 years",
    education: "B.E. Information Technology",
    appliedDate: "Jun 29, 2025",
    jobTitle: "Frontend Engineer",
    radarData: [
      { subject: "Frontend", A: 9, B: 9 },
      { subject: "Backend", A: 5, B: 7 },
      { subject: "DevOps", A: 4, B: 6 },
      { subject: "System Design", A: 6, B: 7 },
      { subject: "Testing", A: 7, B: 7 },
    ],
  },
  {
    id: "4",
    name: "Sneha Patel",
    role: "Senior React Developer",
    score: 78,
    skillsMatch: 79,
    expMatch: 77,
    status: "applied",
    rec: "Consider",
    skills: ["React", "Redux", "Testing", "CSS"],
    experience: "5 years",
    education: "B.Tech Computer Science",
    appliedDate: "Jun 28, 2025",
    jobTitle: "Senior React Developer",
    radarData: [
      { subject: "Frontend", A: 8, B: 9 },
      { subject: "Backend", A: 5, B: 8 },
      { subject: "DevOps", A: 3, B: 7 },
      { subject: "System Design", A: 6, B: 8 },
      { subject: "Testing", A: 8, B: 7 },
    ],
  },
  {
    id: "5",
    name: "Vikram Singh",
    role: "Full Stack Engineer",
    score: 74,
    skillsMatch: 76,
    expMatch: 72,
    status: "applied",
    rec: "Consider",
    skills: ["Node.js", "MongoDB", "React", "Docker"],
    experience: "3 years",
    education: "B.Tech Computer Science",
    appliedDate: "Jun 27, 2025",
    jobTitle: "Full Stack Engineer",
    radarData: [
      { subject: "Frontend", A: 7, B: 8 },
      { subject: "Backend", A: 7, B: 9 },
      { subject: "DevOps", A: 6, B: 7 },
      { subject: "System Design", A: 5, B: 8 },
      { subject: "Testing", A: 6, B: 7 },
    ],
  },
  {
    id: "6",
    name: "Ananya Iyer",
    role: "UI Engineer",
    score: 71,
    skillsMatch: 73,
    expMatch: 69,
    status: "rejected",
    rec: "No Hire",
    skills: ["React", "CSS", "Figma", "Animation"],
    experience: "3 years",
    education: "B.Des Interaction Design",
    appliedDate: "Jun 26, 2025",
    jobTitle: "UI Engineer",
    radarData: [
      { subject: "Frontend", A: 8, B: 8 },
      { subject: "Backend", A: 3, B: 7 },
      { subject: "DevOps", A: 2, B: 6 },
      { subject: "System Design", A: 4, B: 7 },
      { subject: "Testing", A: 5, B: 7 },
    ],
  },
];
const STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
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
    cls: "bg-[#EFF6FF] text-[#0d1b2a] border-[#BFDBFE]",
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
const REC_CONFIG: Record<string, string> = {
  "Strong Hire": "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]",
  Hire: "bg-[#EFF6FF] text-[#0d1b2a] border-[#BFDBFE]",
  Consider: "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]",
  "No Hire": "bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]",
}; /* ── Candidate Detail Panel ──────────────────────────────────────────────────── */
function CandidatePanel({
  candidate,
  onClose,
}: {
  candidate: Candidate;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.22 }}
      className="bg-white border-l border-[#E2E8F0] w-full lg:w-[420px] shrink-0 flex flex-col overflow-hidden"
    >
      {" "}
      {/* Header */}{" "}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0]">
        {" "}
        <h3 className="text-sm font-semibold text-[#1E293B]">
          Candidate Profile
        </h3>{" "}
        <button
          onClick={onClose}
          className="p-1.5 text-[#94A3B8] hover:text-[#1E293B] hover:bg-[#F5F7FA] rounded-lg transition-colors"
        >
          {" "}
          <X className="w-4 h-4" />{" "}
        </button>{" "}
      </div>{" "}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {" "}
        {/* Identity */}{" "}
        <div className="flex items-start gap-4">
          {" "}
          <div className="w-14 h-14 rounded-full bg-[#EFF6FF] border-2 border-[#BFDBFE] flex items-center justify-center text-lg font-bold text-[#0d1b2a] shrink-0">
            {" "}
            {candidate.name
              .split(" ")
              .map((n) => n[0])
              .join("")}{" "}
          </div>{" "}
          <div className="flex-1">
            {" "}
            <h2 className="text-base font-bold text-[#1E293B]">
              {candidate.name}
            </h2>{" "}
            <p className="text-sm text-[#64748B]">{candidate.role}</p>{" "}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {" "}
              <span
                className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                  STATUS_CONFIG[candidate.status].cls,
                )}
              >
                {" "}
                {STATUS_CONFIG[candidate.status].label}{" "}
              </span>{" "}
              <span
                className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
                  REC_CONFIG[candidate.rec],
                )}
              >
                {" "}
                {candidate.rec}{" "}
              </span>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Score overview */}{" "}
        <div className="grid grid-cols-3 gap-3">
          {" "}
          {[
            {
              label: "Overall",
              value: candidate.score,
              color: candidate.score >= 85 ? "#22C55E" : "#0d1b2a",
            },
            { label: "Skills", value: candidate.skillsMatch, color: "#06B6D4" },
            {
              label: "Experience",
              value: candidate.expMatch,
              color: "#7C3AED",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-[#F8FAFC] rounded-xl p-3 text-center border border-[#E2E8F0]"
            >
              {" "}
              <div className="text-xl font-bold" style={{ color: s.color }}>
                {s.value}%
              </div>{" "}
              <div className="text-[10px] text-[#64748B] font-medium mt-0.5">
                {s.label}
              </div>{" "}
            </div>
          ))}{" "}
        </div>{" "}
        {/* Radar */}{" "}
        <div>
          {" "}
          <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
            Competency Radar
          </p>{" "}
          <ResponsiveContainer width="100%" height={180}>
            {" "}
            <RadarChart data={candidate.radarData}>
              {" "}
              <PolarGrid stroke="#E2E8F0" />{" "}
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fontSize: 10, fill: "#64748B" }}
              />{" "}
              <PolarRadiusAxis
                angle={90}
                domain={[0, 10]}
                tick={false}
                axisLine={false}
              />{" "}
              <Radar
                name="Required"
                dataKey="B"
                stroke="#F59E0B"
                strokeWidth={1.5}
                strokeDasharray="4 2"
                fill="#F59E0B"
                fillOpacity={0.08}
              />{" "}
              <Radar
                name="Candidate"
                dataKey="A"
                stroke="#0d1b2a"
                strokeWidth={2}
                fill="#0d1b2a"
                fillOpacity={0.15}
              />{" "}
            </RadarChart>{" "}
          </ResponsiveContainer>{" "}
        </div>{" "}
        {/* Details */}{" "}
        <div className="space-y-3">
          {" "}
          <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
            {" "}
            <Clock className="w-4 h-4 text-[#94A3B8] shrink-0" />{" "}
            <div>
              <p className="text-[10px] text-[#94A3B8] font-medium uppercase tracking-wider">
                Experience
              </p>
              <p className="text-sm font-semibold text-[#1E293B]">
                {candidate.experience}
              </p>
            </div>{" "}
          </div>{" "}
          <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
            {" "}
            <Award className="w-4 h-4 text-[#94A3B8] shrink-0" />{" "}
            <div>
              <p className="text-[10px] text-[#94A3B8] font-medium uppercase tracking-wider">
                Education
              </p>
              <p className="text-sm font-semibold text-[#1E293B]">
                {candidate.education}
              </p>
            </div>{" "}
          </div>{" "}
          <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
            {" "}
            <Briefcase className="w-4 h-4 text-[#94A3B8] shrink-0" />{" "}
            <div>
              <p className="text-[10px] text-[#94A3B8] font-medium uppercase tracking-wider">
                Applied For
              </p>
              <p className="text-sm font-semibold text-[#1E293B]">
                {candidate.jobTitle}
              </p>
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Skills */}{" "}
        <div>
          {" "}
          <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">
            Skills
          </p>{" "}
          <div className="flex flex-wrap gap-2">
            {" "}
            {candidate.skills.map((s) => (
              <span
                key={s}
                className="px-2.5 py-1 bg-[#EFF6FF] text-[#0d1b2a] text-xs font-medium rounded-full border border-[#BFDBFE]"
              >
                {s}
              </span>
            ))}{" "}
          </div>{" "}
        </div>{" "}
        {/* Actions */}{" "}
        <div className="flex gap-2 pt-2">
          {" "}
          <button className="btn-primary btn-sm flex-1 justify-center">
            <CheckCircle className="w-4 h-4" /> Shortlist
          </button>{" "}
          <button className="btn-secondary btn-sm flex-1 justify-center">
            <MessageSquare className="w-4 h-4" /> Message
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </motion.div>
  );
} /* ── Main Page ───────────────────────────────────────────────────────────────── */
export default function CandidatesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [recFilter, setRecFilter] = useState("all");
  const [selected, setSelected] = useState<Candidate | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const filtered = CANDIDATES.filter((c) => {
    const matchSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    const matchRec = recFilter === "all" || c.rec === recFilter;
    return matchSearch && matchStatus && matchRec;
  });
  return (
    <div className="flex h-[calc(100vh-112px)] gap-0 -mx-4 md:-mx-6 overflow-hidden">
      {" "}
      {/* Left: list */}{" "}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden px-4 md:px-6">
        {" "}
        {/* Header */}{" "}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pt-1">
          {" "}
          <div>
            {" "}
            <h1 className="text-2xl font-bold text-[#1E293B]">
              Candidates
            </h1>{" "}
            <p className="text-[#64748B] mt-0.5 text-sm">
              {filtered.length} candidate{filtered.length !== 1 ? "s" : ""}{" "}
              found
            </p>{" "}
          </div>{" "}
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={cn(
              "btn-secondary btn-sm gap-2",
              showFilters && "bg-[#EFF6FF] border-[#BFDBFE] text-[#0d1b2a]",
            )}
          >
            {" "}
            <SlidersHorizontal className="w-4 h-4" /> Filters{" "}
          </button>{" "}
        </div>{" "}
        {/* Search + filters */}{" "}
        <div className="space-y-3 mb-4">
          {" "}
          <div className="relative">
            {" "}
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />{" "}
            <input
              type="text"
              placeholder="Search by name, role, or skill..."
              className="input pl-9 h-10 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />{" "}
          </div>{" "}
          <AnimatePresence>
            {" "}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                {" "}
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex flex-wrap gap-5">
                  {" "}
                  <div>
                    {" "}
                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">
                      Status
                    </p>{" "}
                    <div className="flex gap-2 flex-wrap">
                      {" "}
                      {[
                        "all",
                        "applied",
                        "screening",
                        "interview",
                        "selected",
                        "rejected",
                      ].map((s) => (
                        <button
                          key={s}
                          onClick={() => setStatusFilter(s)}
                          className={cn(
                            "px-3 py-1 rounded-full text-xs font-medium border transition-colors capitalize",
                            statusFilter === s
                              ? "bg-[#0d1b2a] text-white border-[#0d1b2a]"
                              : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#0d1b2a]",
                          )}
                        >
                          {" "}
                          {s === "all" ? "All" : s}{" "}
                        </button>
                      ))}{" "}
                    </div>{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">
                      Recommendation
                    </p>{" "}
                    <div className="flex gap-2 flex-wrap">
                      {" "}
                      {[
                        "all",
                        "Strong Hire",
                        "Hire",
                        "Consider",
                        "No Hire",
                      ].map((r) => (
                        <button
                          key={r}
                          onClick={() => setRecFilter(r)}
                          className={cn(
                            "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
                            recFilter === r
                              ? "bg-[#0d1b2a] text-white border-[#0d1b2a]"
                              : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#0d1b2a]",
                          )}
                        >
                          {" "}
                          {r === "all" ? "All" : r}{" "}
                        </button>
                      ))}{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </motion.div>
            )}{" "}
          </AnimatePresence>{" "}
        </div>{" "}
        {/* Candidate list */}{" "}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {" "}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl border border-[#E2E8F0] py-16 text-center">
              {" "}
              <Users className="w-10 h-10 text-[#CBD5E1] mx-auto mb-3" />{" "}
              <p className="text-sm font-semibold text-[#1E293B]">
                No candidates found
              </p>{" "}
              <p className="text-xs text-[#64748B] mt-1">
                Try adjusting your search or filters
              </p>{" "}
            </div>
          ) : (
            filtered.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setSelected(selected?.id === c.id ? null : c)}
                className={cn(
                  "bg-white rounded-xl border p-4 cursor-pointer transition-all duration-150 hover:shadow-sm",
                  selected?.id === c.id
                    ? "border-[#0d1b2a] bg-[#EFF6FF]/20"
                    : "border-[#E2E8F0] hover:border-[#CBD5E1]",
                )}
              >
                {" "}
                <div className="flex items-center gap-3">
                  {" "}
                  <div className="w-10 h-10 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-sm font-bold text-[#0d1b2a] shrink-0">
                    {" "}
                    {c.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}{" "}
                  </div>{" "}
                  <div className="flex-1 min-w-0">
                    {" "}
                    <div className="flex items-center justify-between gap-2">
                      {" "}
                      <p className="text-sm font-semibold text-[#1E293B] truncate">
                        {c.name}
                      </p>{" "}
                      <span
                        className={cn(
                          "text-sm font-bold shrink-0",
                          c.score >= 85
                            ? "text-[#22C55E]"
                            : c.score >= 70
                              ? "text-[#0d1b2a]"
                              : "text-[#F59E0B]",
                        )}
                      >
                        {c.score}%
                      </span>{" "}
                    </div>{" "}
                    <p className="text-xs text-[#64748B] truncate">
                      {c.role} · {c.experience}
                    </p>{" "}
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      {" "}
                      <span
                        className={cn(
                          "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border",
                          STATUS_CONFIG[c.status].cls,
                        )}
                      >
                        {STATUS_CONFIG[c.status].label}
                      </span>{" "}
                      <span
                        className={cn(
                          "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border",
                          REC_CONFIG[c.rec],
                        )}
                      >
                        {c.rec}
                      </span>{" "}
                      {c.skills.slice(0, 2).map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 bg-[#F5F7FA] text-[#64748B] text-[10px] font-medium rounded-full border border-[#E2E8F0]"
                        >
                          {s}
                        </span>
                      ))}{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </motion.div>
            ))
          )}{" "}
        </div>{" "}
      </div>{" "}
      {/* Right: detail panel */}{" "}
      <AnimatePresence>
        {" "}
        {selected && (
          <CandidatePanel
            candidate={selected}
            onClose={() => setSelected(null)}
          />
        )}{" "}
      </AnimatePresence>{" "}
    </div>
  );
}
