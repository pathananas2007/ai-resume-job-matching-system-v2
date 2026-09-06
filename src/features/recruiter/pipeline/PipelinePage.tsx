import React, { useState } from "react";
import { motion } from "motion/react";
import { Users, Clock, Award, ChevronRight } from "lucide-react";
import { cn } from "../../../lib/utils"; /* ── Types & Data ────────────────────────────────────────────────────────────── */
interface PipelineCandidate {
  id: string;
  name: string;
  role: string;
  score: number;
  rec: string;
  date: string;
  skills: string[];
}
type StageKey = "applied" | "screening" | "interview" | "selected";
interface Stage {
  key: StageKey;
  label: string;
  color: string;
  bg: string;
  border: string;
  headerBg: string;
}
const STAGES: Stage[] = [
  {
    key: "applied",
    label: "Applied",
    color: "#2563EB",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    headerBg: "#2563EB",
  },
  {
    key: "screening",
    label: "Screening",
    color: "#D97706",
    bg: "#FFFBEB",
    border: "#FDE68A",
    headerBg: "#F59E0B",
  },
  {
    key: "interview",
    label: "Interview",
    color: "#7C3AED",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    headerBg: "#7C3AED",
  },
  {
    key: "selected",
    label: "Selected",
    color: "#16A34A",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    headerBg: "#22C55E",
  },
];
const INITIAL_PIPELINE: Record<StageKey, PipelineCandidate[]> = {
  applied: [
    {
      id: "1",
      name: "Rahul Gupta",
      role: "Frontend Engineer",
      score: 83,
      rec: "Hire",
      date: "Jun 29",
      skills: ["Vue", "TypeScript"],
    },
    {
      id: "2",
      name: "Sneha Patel",
      role: "Senior React Dev",
      score: 78,
      rec: "Consider",
      date: "Jun 28",
      skills: ["React", "Redux"],
    },
    {
      id: "3",
      name: "Vikram Singh",
      role: "Full Stack Eng",
      score: 74,
      rec: "Consider",
      date: "Jun 27",
      skills: ["Node.js", "React"],
    },
    {
      id: "4",
      name: "Ananya Iyer",
      role: "UI Engineer",
      score: 71,
      rec: "Consider",
      date: "Jun 26",
      skills: ["React", "CSS"],
    },
  ],
  screening: [
    {
      id: "5",
      name: "Priya Sharma",
      role: "Full Stack Eng",
      score: 89,
      rec: "Hire",
      date: "Jun 30",
      skills: ["React", "Python"],
    },
    {
      id: "6",
      name: "Meera Nair",
      role: "Frontend Eng",
      score: 81,
      rec: "Hire",
      date: "Jun 25",
      skills: ["React", "Next.js"],
    },
  ],
  interview: [
    {
      id: "7",
      name: "Arjun Mehta",
      role: "Senior React Dev",
      score: 94,
      rec: "Strong Hire",
      date: "Jul 1",
      skills: ["React", "TypeScript"],
    },
    {
      id: "8",
      name: "Karan Verma",
      role: "Full Stack Eng",
      score: 86,
      rec: "Hire",
      date: "Jun 24",
      skills: ["Node.js", "AWS"],
    },
  ],
  selected: [
    {
      id: "9",
      name: "Deepa Krishnan",
      role: "Product Designer",
      score: 91,
      rec: "Strong Hire",
      date: "Jun 20",
      skills: ["Figma", "UX"],
    },
  ],
};
const REC_COLORS: Record<string, string> = {
  "Strong Hire": "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]",
  Hire: "bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]",
  Consider: "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]",
  "No Hire": "bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]",
}; /* ── Candidate Card ──────────────────────────────────────────────────────────── */
function CandidateCard({
  candidate,
  stageColor,
  stageBg,
  stageBorder,
  onMove,
  stages,
  currentStage,
}: {
  candidate: PipelineCandidate;
  stageColor: string;
  stageBg: string;
  stageBorder: string;
  onMove: (id: string, from: StageKey, to: StageKey) => void;
  stages: Stage[];
  currentStage: StageKey;
}) {
  const [showMove, setShowMove] = useState(false);
  const otherStages = stages.filter((s) => s.key !== currentStage);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-default"
    >
      {" "}
      <div className="flex items-start justify-between mb-2">
        {" "}
        <div className="flex items-center gap-2.5">
          {" "}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{
              backgroundColor: stageBg,
              color: stageColor,
              border: `1px solid ${stageBorder}`,
            }}
          >
            {" "}
            {candidate.name
              .split(" ")
              .map((n) => n[0])
              .join("")}{" "}
          </div>{" "}
          <div>
            {" "}
            <p className="text-sm font-semibold text-[#1E293B] leading-tight">
              {candidate.name}
            </p>{" "}
            <p className="text-[10px] text-[#64748B]">{candidate.role}</p>{" "}
          </div>{" "}
        </div>{" "}
        <span
          className="text-sm font-bold shrink-0"
          style={{
            color:
              candidate.score >= 85
                ? "#22C55E"
                : candidate.score >= 70
                  ? "#2563EB"
                  : "#F59E0B",
          }}
        >
          {" "}
          {candidate.score}%{" "}
        </span>{" "}
      </div>{" "}
      <div className="flex flex-wrap gap-1 mb-3">
        {" "}
        {candidate.skills.map((s) => (
          <span
            key={s}
            className="px-1.5 py-0.5 text-[9px] font-medium rounded-full border"
            style={{
              backgroundColor: stageBg,
              color: stageColor,
              borderColor: stageBorder,
            }}
          >
            {s}
          </span>
        ))}{" "}
      </div>{" "}
      <div className="flex items-center justify-between">
        {" "}
        <div className="flex items-center gap-1.5">
          {" "}
          <span
            className={cn(
              "inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold border",
              REC_COLORS[candidate.rec],
            )}
          >
            {candidate.rec}
          </span>{" "}
          <span className="text-[10px] text-[#94A3B8] flex items-center gap-0.5">
            <Clock className="w-2.5 h-2.5" />
            {candidate.date}
          </span>{" "}
        </div>{" "}
        <div className="relative">
          {" "}
          <button
            onClick={() => setShowMove((v) => !v)}
            className="flex items-center gap-1 text-[10px] font-semibold text-[#64748B] hover:text-[#2563EB] transition-colors px-2 py-1 rounded-lg hover:bg-[#EFF6FF]"
          >
            {" "}
            Move <ChevronRight className="w-3 h-3" />{" "}
          </button>{" "}
          {showMove && (
            <>
              {" "}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMove(false)}
              />{" "}
              <div className="absolute right-0 bottom-full mb-1 bg-white border border-[#E2E8F0] rounded-xl shadow-lg z-20 py-1 min-w-[140px] overflow-hidden">
                {" "}
                {otherStages.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => {
                      onMove(candidate.id, currentStage, s.key);
                      setShowMove(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#475569] hover:bg-[#F5F7FA] transition-colors"
                  >
                    {" "}
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />{" "}
                    {s.label}{" "}
                  </button>
                ))}{" "}
              </div>{" "}
            </>
          )}{" "}
        </div>{" "}
      </div>{" "}
    </motion.div>
  );
} /* ── Main Page ───────────────────────────────────────────────────────────────── */
export default function PipelinePage() {
  const [pipeline, setPipeline] = useState(INITIAL_PIPELINE);
  const moveCandidate = (id: string, from: StageKey, to: StageKey) => {
    setPipeline((prev) => {
      const candidate = prev[from].find((c) => c.id === id);
      if (!candidate) return prev;
      return {
        ...prev,
        [from]: prev[from].filter((c) => c.id !== id),
        [to]: [candidate, ...prev[to]],
      };
    });
  };
  const totalCandidates = Object.values(pipeline).reduce(
    (sum, arr) => sum + arr.length,
    0,
  );
  return (
    <div className="space-y-5 animate-fade-in">
      {" "}
      {/* Header */}{" "}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {" "}
        <div>
          {" "}
          <h1 className="text-2xl font-bold text-[#1E293B]">
            Applicant Tracking
          </h1>{" "}
          <p className="text-[#64748B] mt-0.5 text-sm">
            {totalCandidates} candidates across {STAGES.length} stages
          </p>{" "}
        </div>{" "}
        <div className="flex items-center gap-3">
          {" "}
          {STAGES.map((s) => (
            <div
              key={s.key}
              className="flex items-center gap-1.5 text-xs font-medium text-[#64748B]"
            >
              {" "}
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: s.color }}
              />{" "}
              {s.label} ({pipeline[s.key].length}){" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>{" "}
      {/* Kanban board */}{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {" "}
        {STAGES.map((stage) => (
          <div key={stage.key} className="flex flex-col min-h-[500px]">
            {" "}
            {/* Column header */}{" "}
            <div
              className="flex items-center justify-between px-4 py-3 rounded-t-xl text-white mb-3"
              style={{ backgroundColor: stage.headerBg }}
            >
              {" "}
              <div className="flex items-center gap-2">
                {" "}
                <Users className="w-4 h-4 opacity-80" />{" "}
                <span className="text-sm font-semibold">
                  {stage.label}
                </span>{" "}
              </div>{" "}
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                {" "}
                {pipeline[stage.key].length}{" "}
              </span>{" "}
            </div>{" "}
            {/* Cards */}{" "}
            <div
              className="flex-1 space-y-3 bg-[#F8FAFC] rounded-b-xl p-3 border border-t-0 border-[#E2E8F0]"
              style={{ borderTopColor: stage.headerBg }}
            >
              {" "}
              {pipeline[stage.key].length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  {" "}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                    style={{ backgroundColor: stage.bg }}
                  >
                    {" "}
                    <Users
                      className="w-4 h-4"
                      style={{ color: stage.color }}
                    />{" "}
                  </div>{" "}
                  <p className="text-xs text-[#94A3B8] font-medium">
                    No candidates
                  </p>{" "}
                </div>
              ) : (
                pipeline[stage.key].map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    stageColor={stage.color}
                    stageBg={stage.bg}
                    stageBorder={stage.border}
                    onMove={moveCandidate}
                    stages={STAGES}
                    currentStage={stage.key}
                  />
                ))
              )}{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
}
