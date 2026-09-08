import React, { useState, useEffect, useRef } from "react";
import {
  Upload,
  FileText,
  Loader2,
  CheckCircle,
  Zap,
  AlertCircle,
  RefreshCw,
  Download,
  Archive,
  Trash2,
  Star,
} from "lucide-react";
import { analyzeResume } from "../../../services/geminiService";
import { extractTextFromPDF } from "../../../lib/pdfParser";
import { useAuthStore } from "../../../store/authStore";
import { useToast } from "../../../components/ui/Toast";
import { cn } from "../../../lib/utils";
import type { Analysis } from "../../../types";
import { AnalysisReport } from "./AnalysisReport";
import { resumeApi } from "../../../services/api/resumeApi";
import { useApi } from "../../../hooks/useApi";
import type { ApiResume, ApiAnalysisResult } from "../../../types/api";
const USE_MOCK_DATA =
  import.meta.env.VITE_USE_MOCK_DATA === "true"; /* Helper to format date */
const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}; /* Helper to extract error message from nested API response structure */
const getErrorMessage = (err: any): string => {
  /* Check for nested error structure (from apiClient) */ if (
    err?.error?.message
  )
    return err.error.message;
  /* Check for message property */ if (err?.message) return err.message;
  /* Check for string representation */ if (typeof err === "string") return err;
  /* Default */ return "Analysis failed. Please try again.";
}; /* ΓöÇΓöÇ Error state component ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
function AnalysisError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  const isQuota =
    message.toLowerCase().includes("quota") ||
    message.toLowerCase().includes("rate") ||
    message.toLowerCase().includes("429");
  const isApiKey =
    message.toLowerCase().includes("api key") ||
    message.toLowerCase().includes("invalid");
  return (
    <div className="max-w-lg mx-auto text-center py-12 animate-fade-in">
      {" "}
      <div className="w-16 h-16 rounded-full bg-[#FEF2F2] border border-[#FECACA] flex items-center justify-center mx-auto mb-5">
        {" "}
        <AlertCircle className="w-7 h-7 text-[#EF4444]" />{" "}
      </div>{" "}
      <h2 className="text-lg font-bold text-[#1E293B] mb-2">Analysis Failed</h2>{" "}
      {isQuota ? (
        <>
          {" "}
          <p className="text-sm text-[#64748B] leading-relaxed mb-2">
            {" "}
            The Gemini API free tier limit has been reached for this
            session.{" "}
          </p>{" "}
          <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-4 text-left mb-6">
            {" "}
            <p className="text-xs font-semibold text-[#D97706] mb-2">
              How to fix this:
            </p>{" "}
            <ul className="text-xs text-[#92400E] space-y-1.5">
              {" "}
              <li>
                ΓÇó Wait a few minutes and try again (free tier resets)
              </li>{" "}
              <li>
                ΓÇó Check your quota at{" "}
                <a
                  href="https://aistudio.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-medium"
                >
                  aistudio.google.com
                </a>
              </li>{" "}
              <li>
                ΓÇó Add a valid{" "}
                <code className="bg-[#FEF3C7] px-1 rounded">
                  VITE_GEMINI_API_KEY
                </code>{" "}
                in your{" "}
                <code className="bg-[#FEF3C7] px-1 rounded">src/.env</code> file
              </li>{" "}
            </ul>{" "}
          </div>{" "}
        </>
      ) : isApiKey ? (
        <>
          {" "}
          <p className="text-sm text-[#64748B] leading-relaxed mb-2">
            {" "}
            The Gemini API key is missing or invalid.{" "}
          </p>{" "}
          <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-4 text-left mb-6">
            {" "}
            <p className="text-xs font-semibold text-[#DC2626] mb-2">
              How to fix this:
            </p>{" "}
            <ul className="text-xs text-[#991B1B] space-y-1.5">
              {" "}
              <li>
                ΓÇó Get a free API key at{" "}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-medium"
                >
                  aistudio.google.com
                </a>
              </li>{" "}
              <li>
                ΓÇó Add it to{" "}
                <code className="bg-[#FEE2E2] px-1 rounded">src/.env</code> as{" "}
                <code className="bg-[#FEE2E2] px-1 rounded">
                  VITE_GEMINI_API_KEY=your_key
                </code>
              </li>{" "}
              <li>ΓÇó Restart the dev server after saving</li>{" "}
            </ul>{" "}
          </div>{" "}
        </>
      ) : (
        <p className="text-sm text-[#64748B] leading-relaxed mb-6">{message}</p>
      )}{" "}
      <button onClick={onRetry} className="btn-primary btn-sm mx-auto">
        {" "}
        <RefreshCw className="w-4 h-4" /> Try Again{" "}
      </button>{" "}
    </div>
  );
} /* ΓöÇΓöÇ Resume List Component ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
function ResumeList({
  resumes,
  isLoading,
  error,
  onRefresh,
  onDelete,
  onArchive,
  onDownload,
  onAnalyze,
  analyzingId,
  highlightResumeId,
  onHighlightClear,
}: {
  resumes: ApiResume[];
  isLoading: boolean;
  error: any;
  onRefresh: () => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
  onDownload: (id: string, name: string) => void;
  onAnalyze: (id: string) => void;
  onRefreshAnalysis?: (id: string) => void;
  analyzingId: string | null;
  highlightResumeId?: string | null;
  onHighlightClear?: () => void;
}) {
  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-xl border border-red-100 text-center">
        {" "}
        <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />{" "}
        <p className="text-red-700 font-medium mb-3">
          Unable to load resumes. Try again.
        </p>{" "}
        <button
          onClick={onRefresh}
          className="btn-primary btn-sm mx-auto bg-red-600 hover:bg-red-700"
        >
          {" "}
          <RefreshCw className="w-4 h-4" /> Retry{" "}
        </button>{" "}
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="p-12 text-center bg-white rounded-xl border border-slate-200">
        {" "}
        <Loader2 className="w-8 h-8 text-[#1e3a8a] animate-spin mx-auto mb-3" />{" "}
        <p className="text-slate-500 font-medium">Loading resumes...</p>{" "}
      </div>
    );
  }
  if (resumes.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
        {" "}
        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />{" "}
        <p className="text-slate-500 font-medium">No resumes uploaded yet.</p>{" "}
        <p className="text-sm text-slate-400 mt-1">
          Upload a PDF or DOCX to get started.
        </p>{" "}
      </div>
    );
  }
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {" "}
      <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        {" "}
        <h3 className="font-semibold text-slate-800">Uploaded Resumes</h3>{" "}
        <button
          onClick={onRefresh}
          className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
        >
          {" "}
          <RefreshCw className="w-4 h-4" />{" "}
        </button>{" "}
      </div>{" "}
      <div className="divide-y divide-slate-100">
        {" "}
        {resumes.map((resume) => {
          const isHighlighted = highlightResumeId === resume._id;
          return (
            <div
              key={resume._id}
              className={cn(
                "p-4 flex items-center justify-between transition-all",
                isHighlighted
                  ? "bg-blue-50 border-l-4 border-l-blue-500 hover:bg-blue-50"
                  : "hover:bg-slate-50",
              )}
            >
              {" "}
              <div className="flex items-center gap-3 flex-1">
                {" "}
                <div
                  className={cn(
                    "p-2 rounded-lg",
                    isHighlighted
                      ? "bg-blue-100 text-[#1e3a8a]"
                      : "bg-blue-50 text-[#1e3a8a]",
                  )}
                >
                  {" "}
                  <FileText className="w-5 h-5" />{" "}
                </div>{" "}
                <div className="flex-1">
                  {" "}
                  <div className="flex items-center gap-2">
                    {" "}
                    <p
                      className="font-medium text-slate-900 text-sm truncate max-w-[150px] sm:max-w-[250px]"
                      title={resume.file_name}
                    >
                      {resume.file_name}
                    </p>{" "}
                    {isHighlighted && (
                      <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium whitespace-nowrap">
                        {" "}
                        <Star className="w-3 h-3" /> Ready to analyze{" "}
                      </span>
                    )}{" "}
                  </div>{" "}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                    {" "}
                    <span>{formatDate(resume.uploaded_at)}</span>{" "}
                    <span>ΓÇó</span>{" "}
                    <span>{(resume.file_size / 1024).toFixed(1)} KB</span>{" "}
                    {resume.status === "ARCHIVED" && (
                      <>
                        {" "}
                        <span>ΓÇó</span>{" "}
                        <span className="text-amber-600 font-medium bg-amber-50 px-1.5 py-0.5 rounded">
                          Archived
                        </span>{" "}
                      </>
                    )}{" "}
                    {resume.analysis_status && (
                      <>
                        {" "}
                        <span>ΓÇó</span>{" "}
                        <span className="text-slate-500">
                          Analysis: {resume.analysis_status.replace("_", " ")}
                        </span>{" "}
                      </>
                    )}{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              <div className="flex items-center gap-1">
                {" "}
                <button
                  onClick={() => onDownload(resume._id, resume.file_name)}
                  className="p-2 text-slate-400 hover:text-[#1e3a8a] rounded-lg hover:bg-blue-50 transition-colors"
                  title="Download"
                >
                  {" "}
                  <Download className="w-4 h-4" />{" "}
                </button>{" "}
                {resume.status === "ACTIVE" && (
                  <>
                    {" "}
                    {resume.analysis_status === "COMPLETED" ? (
                      <button
                        onClick={() => {
                          onHighlightClear?.();
                          onRefreshAnalysis && onRefreshAnalysis(resume._id);
                        }}
                        disabled={analyzingId === resume._id}
                        className={cn(
                          "p-2 rounded-lg transition-colors",
                          analyzingId === resume._id
                            ? "text-blue-400 bg-blue-50 cursor-wait"
                            : isHighlighted
                              ? "text-white bg-[#0d1b2a] hover:bg-[#0a1628]"
                              : "text-slate-400 hover:text-[#1e3a8a] hover:bg-blue-50",
                        )}
                        title={
                          analyzingId === resume._id
                            ? "Refreshing..."
                            : "Refresh AI Analysis"
                        }
                      >
                        {" "}
                        {analyzingId === resume._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <RefreshCw className="w-4 h-4" />
                        )}{" "}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          onHighlightClear?.();
                          onAnalyze(resume._id);
                        }}
                        disabled={analyzingId === resume._id}
                        className={cn(
                          "p-2 rounded-lg transition-colors",
                          analyzingId === resume._id
                            ? "text-blue-400 bg-blue-50 cursor-wait"
                            : isHighlighted
                              ? "text-white bg-[#0d1b2a] hover:bg-[#0a1628]"
                              : "text-slate-400 hover:text-[#1e3a8a] hover:bg-blue-50",
                        )}
                        title={
                          analyzingId === resume._id
                            ? "Analyzing..."
                            : "Analyze with AI"
                        }
                      >
                        {" "}
                        {analyzingId === resume._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Zap className="w-4 h-4" />
                        )}{" "}
                      </button>
                    )}{" "}
                  </>
                )}{" "}
                {resume.status !== "ARCHIVED" && (
                  <button
                    onClick={() => {
                      onHighlightClear?.();
                      onArchive(resume._id);
                    }}
                    className="p-2 text-slate-400 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                    title="Archive"
                  >
                    {" "}
                    <Archive className="w-4 h-4" />{" "}
                  </button>
                )}{" "}
                <button
                  onClick={() => {
                    onHighlightClear?.();
                    onDelete(resume._id);
                  }}
                  className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  title="Delete"
                >
                  {" "}
                  <Trash2 className="w-4 h-4" />{" "}
                </button>{" "}
              </div>{" "}
            </div>
          );
        })}{" "}
      </div>{" "}
    </div>
  );
} /* ΓöÇΓöÇ Main Page ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */
export default function ResumePage() {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const resumeListRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<"upload" | "paste">("upload");
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lastUploadedResumeId, setLastUploadedResumeId] = useState<
    string | null
  >(null);
  /* Backend state */ const {
    data: apiResumesData,
    isLoading: isLoadingResumes,
    error: resumesError,
    execute: fetchResumes,
  } = useApi(resumeApi.listResumes, { immediate: !USE_MOCK_DATA });
  const [backendResumes, setBackendResumes] = useState<ApiResume[]>([]);
  useEffect(() => {
    if (apiResumesData) {
      setBackendResumes(apiResumesData.items || []);
    }
  }, [apiResumesData]);
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setParsing(true);
    try {
      if (USE_MOCK_DATA) {
        /* Mock behavior: parse PDF locally for immediate Gemini analysis */ const text =
          await extractTextFromPDF(file);
        if (!text.trim())
          throw new Error("Could not extract text. Try pasting instead.");
        setResumeText(text);
        toast("Resume parsed successfully", "success");
      } else {
        /* Backend behavior: Upload to API */ const response =
          await resumeApi.uploadResume(file);
        /* Extract and store the resume_id from response */ const resumeId =
          response?.resume_id || response?._id;
        if (resumeId) {
          setLastUploadedResumeId(resumeId);
        }
        toast(
          "Resume uploaded successfully! Scroll down to analyze it.",
          "success",
        );
        fetchResumes();
        /* Refresh list */ /* Auto-scroll to resume list after a short delay to let the list update */ setTimeout(
          () => {
            resumeListRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          },
          500,
        );
      }
    } catch (err: any) {
      toast(err.message || "Upload failed", "error");
      setFileName(null);
    } finally {
      setParsing(false);
      /* Reset input so the same file can be uploaded again if needed */ e.target.value =
        "";
    }
  };
  const handleDownload = async (id: string, name: string) => {
    try {
      toast("Starting download...", "info");
      await resumeApi.downloadResume(id, name);
    } catch (err: any) {
      toast(err.message || "Failed to download resume", "error");
    }
  };
  const handleArchive = async (id: string) => {
    try {
      await resumeApi.archiveResume(id);
      toast("Resume archived", "success");
      setLastUploadedResumeId(null);
      fetchResumes();
    } catch (err: any) {
      toast(err.message || "Failed to archive resume", "error");
    }
  };
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;
    try {
      await resumeApi.deleteResume(id);
      toast("Resume deleted", "success");
      setLastUploadedResumeId(null);
      fetchResumes();
    } catch (err: any) {
      toast(err.message || "Failed to delete resume", "error");
    }
  };
  /* ΓöÇΓöÇ Backend-mode analysis ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */ const [
    analyzingBackendId,
    setAnalyzingBackendId,
  ] = useState<string | null>(null);
  const mapApiResultToAnalysis = (
    result: ApiAnalysisResult,
    resumeId: string,
  ): Analysis => {
    const allSkills = [
      ...result.skills.technical,
      ...result.skills.frameworks,
      ...result.skills.tools,
      ...result.skills.databases,
      ...result.skills.cloud,
    ];
    return {
      id: result.analysis_id,
      seeker_id: user?.id || "",
      job_title: "",
      score: result.ats_score,
      statusLabel: result.overall_grade,
      recommendation:
        result.ats_score >= 80
          ? "Interview"
          : result.ats_score >= 60
            ? "Consider"
            : "Reject",
      confidenceScore: Math.min(99, result.ats_score + 10),
      scores: {
        technical: Math.round(result.ats_score * 0.9),
        experience: Math.round(result.ats_score * 0.85),
        education: Math.round(result.ats_score * 0.8),
        skills: result.ats_score,
        overall: result.ats_score,
      },
      competencyAnalysis: [],
      skillBreakdown: result.skills.technical.map((s) => ({
        name: s,
        level: "strong" as const,
        score: 80,
      })),
      matchingSkills: allSkills.slice(0, 10),
      criticalGaps: result.skill_gaps.map((g) => ({
        skill: g.skill,
        importance: g.importance,
        suggestion: g.reason || "",
      })),
      strengths: result.recommendations.slice(0, 3),
      weaknesses: result.skill_gaps.map((g) => g.skill),
      actionPlan: result.recommendations.map((r, i) => ({
        step: i + 1,
        action: r,
        priority: i === 0 ? ("high" as const) : ("medium" as const),
      })),
      explanation:
        result.summary ||
        `Resume scored ${result.ats_score}/100 with grade ${result.overall_grade}.`,
      radarData: [],
      skillGaps: result.skill_gaps.map((g) => g.skill),
      created_at: result.analyzed_at,
    };
  };
  const handleBackendAnalyze = async (resumeId: string) => {
    setAnalyzingBackendId(resumeId);
    setErrorMsg(null);
    try {
      const result = await resumeApi.analyzeResume(resumeId);
      const mapped = mapApiResultToAnalysis(result, resumeId);
      setAnalysis(mapped);
      setCurrentResumeId(resumeId);
      setLastUploadedResumeId(null);
      toast("Analysis complete!", "success");
      fetchResumes(); /* refresh to show updated status */
    } catch (err: any) {
      setErrorMsg(getErrorMessage(err));
    } finally {
      setAnalyzingBackendId(null);
    }
  };
  const handleRefreshAnalysis = async (resumeId: string) => {
    setAnalyzingBackendId(resumeId);
    setErrorMsg(null);
    try {
      const result = await resumeApi.refreshAnalysis(resumeId);
      const mapped = mapApiResultToAnalysis(result, resumeId);
      setAnalysis(mapped);
      setCurrentResumeId(resumeId);
      setLastUploadedResumeId(null);
      toast("Analysis refreshed successfully!", "success");
      fetchResumes();
    } catch (err: any) {
      setErrorMsg(getErrorMessage(err));
    } finally {
      setAnalyzingBackendId(null);
    }
  };
  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      toast("Please upload or paste your resume first", "warning");
      return;
    }
    if (!jobDesc.trim()) {
      toast("Please paste a job description", "warning");
      return;
    }
    setAnalyzing(true);
    setErrorMsg(null);
    try {
      const result = await analyzeResume(
        resumeText,
        `${jobTitle ? jobTitle + ". " : ""}${jobDesc}`,
      );
      /* Check if the result itself is an error response from geminiService */ const r =
        result as any;
      if (
        r.score === 0 &&
        r.explanation &&
        (r.explanation.includes("quota") ||
          r.explanation.includes("API key") ||
          r.explanation.includes("error"))
      ) {
        setErrorMsg(r.explanation);
        return;
      }
      setAnalysis({
        ...result,
        id: Date.now().toString(),
        seeker_id: user?.id || "",
        job_title: jobTitle,
        skillGaps: (result as any).skillGaps || [],
        created_at: new Date().toISOString(),
      } as Analysis);
      toast("Analysis complete!", "success");
    } catch (err: any) {
      setErrorMsg(getErrorMessage(err));
    } finally {
      setAnalyzing(false);
    }
  };
  /* Handle main button click - routes to backend or mock mode */ const handleAnalyzeClick =
    async () => {
      /* Backend mode: if we have an uploaded resume ID and job description */ if (
        !USE_MOCK_DATA &&
        lastUploadedResumeId &&
        jobDesc.trim()
      ) {
        await handleBackendAnalyze(lastUploadedResumeId);
      } /* Mock mode: if we have resume text and job description */ else if (
        USE_MOCK_DATA ||
        (resumeText.trim() && jobDesc.trim())
      ) {
        await handleAnalyze();
      } /* Error handling */ else {
        if (!USE_MOCK_DATA && lastUploadedResumeId) {
          toast("Please enter a job description", "warning");
        } else if (resumeText.trim()) {
          toast("Please enter a job description", "warning");
        } else {
          toast("Please upload or paste your resume first", "warning");
        }
      }
    };
  /* Show error state */ if (errorMsg) {
    return (
      <div className="animate-fade-in">
        {" "}
        <div className="mb-4">
          {" "}
          <h1 className="page-title">Resume Analyzer</h1>{" "}
        </div>{" "}
        <AnalysisError
          message={errorMsg}
          onRetry={() => setErrorMsg(null)}
        />{" "}
      </div>
    );
  }
  /* Show analysis result */ if (analysis) {
    return (
      <AnalysisReport
        analysis={analysis}
        onBack={() => {
          setAnalysis(null);
          setCurrentResumeId(null);
        }}
        resumeId={currentResumeId || undefined}
      />
    );
  }
  /* Show input form */ return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {" "}
      <div>
        {" "}
        <h1 className="page-title">
          Resume Analyzer{" "}
          {USE_MOCK_DATA && (
            <span className="text-sm font-normal text-amber-600 bg-amber-50 px-2 py-1 rounded ml-2">
              Demo Data
            </span>
          )}
        </h1>{" "}
        <p className="page-subtitle">
          Upload your resume and paste a job description to get your ATS score
          and detailed feedback.
        </p>{" "}
      </div>{" "}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {" "}
        {/* Resume input */}{" "}
        <div className="card p-6 space-y-4">
          {" "}
          <h2 className="section-title">Your Resume</h2>{" "}
          <div className="flex bg-[#F5F7FA] p-1 rounded-lg gap-1">
            {" "}
            {(["upload", "paste"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all",
                  tab === t
                    ? "bg-white shadow-sm text-[#1E293B]"
                    : "text-[#64748B] hover:text-[#1E293B]",
                )}
              >
                {" "}
                {t === "upload"
                  ? "≡ƒôä Upload Document"
                  : "Γ£Å∩╕Å Paste Text"}{" "}
              </button>
            ))}{" "}
          </div>{" "}
          {tab === "upload" ? (
            <label
              className={cn(
                "flex flex-col items-center justify-center h-44 border-2 border-dashed rounded-xl cursor-pointer transition-all",
                parsing
                  ? "border-[#0d1b2a] bg-[#EFF6FF]"
                  : fileName
                    ? "border-[#22C55E] bg-[#F0FDF4]"
                    : "border-[#E2E8F0] hover:border-[#0d1b2a] hover:bg-[#EFF6FF]/30",
              )}
            >
              {" "}
              {parsing ? (
                <>
                  <Loader2 className="w-8 h-8 text-[#0d1b2a] animate-spin mb-2" />
                  <p className="text-sm font-medium text-[#0d1b2a]">
                    Uploading...
                  </p>
                </>
              ) : fileName ? (
                <>
                  <CheckCircle className="w-8 h-8 text-[#22C55E] mb-2" />
                  <p className="text-sm font-semibold text-[#16A34A]">
                    {fileName}
                  </p>
                  <p className="text-xs text-[#64748B] mt-1">
                    Click to replace
                  </p>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-[#94A3B8] mb-2" />
                  <p className="text-sm font-medium text-[#475569]">
                    Drop file here or click to browse
                  </p>
                  <p className="text-xs text-[#94A3B8] mt-1">PDF or DOCX</p>
                </>
              )}{" "}
              <input
                type="file"
                accept=".pdf,.docx"
                className="hidden"
                onChange={handleFile}
                disabled={parsing}
              />{" "}
            </label>
          ) : (
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your full resume text here..."
              className="input resize-none text-sm leading-relaxed"
              style={{ height: 176 }}
            />
          )}{" "}
          {resumeText && USE_MOCK_DATA && (
            <div className="flex items-center gap-2 text-xs text-[#22C55E] font-medium">
              {" "}
              <CheckCircle className="w-3.5 h-3.5" />{" "}
              {resumeText.length.toLocaleString()} characters loaded{" "}
            </div>
          )}{" "}
        </div>{" "}
        {/* Job description */}{" "}
        <div className="card p-6 space-y-4">
          {" "}
          <h2 className="section-title">Job Description</h2>{" "}
          <div>
            {" "}
            <label className="label">Job Title (optional)</label>{" "}
            <input
              type="text"
              placeholder="e.g. Senior Frontend Engineer"
              className="input"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />{" "}
          </div>{" "}
          <div>
            {" "}
            <label className="label">Job Description</label>{" "}
            <textarea
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Paste the full job description here ΓÇö requirements, responsibilities, tech stack..."
              className="input resize-none text-sm leading-relaxed"
              style={{ height: 140 }}
            />{" "}
            <p className="text-xs text-[#94A3B8] mt-1.5">
              {" "}
              {jobDesc.length > 0
                ? `${jobDesc.length} characters`
                : "More detail = better analysis"}{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <button
        onClick={handleAnalyzeClick}
        disabled={
          analyzing ||
          analyzingBackendId !== null ||
          (!lastUploadedResumeId && !resumeText.trim()) ||
          !jobDesc.trim()
        }
        className="btn-primary btn-xl w-full max-w-sm"
      >
        {" "}
        {analyzing || analyzingBackendId ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" /> Analyzing...
          </>
        ) : (
          <>
            <Zap className="w-5 h-5" /> Analyze My Resume
          </>
        )}{" "}
      </button>{" "}
      {/* API key hint */}{" "}
      <div className="max-w-sm">
        {" "}
        <p className="text-xs text-[#94A3B8]">
          {" "}
          Powered by Gemini AI. Requires a valid{" "}
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0d1b2a] hover:underline"
          >
            Gemini API key
          </a>{" "}
          in <code className="bg-[#F5F7FA] px-1 rounded">src/.env</code>.{" "}
        </p>{" "}
      </div>{" "}
      {/* Backend Mode Resume List */}{" "}
      {!USE_MOCK_DATA && (
        <div
          ref={resumeListRef}
          className="bg-white rounded-xl shadow-sm border border-slate-200"
        >
          {" "}
          <ResumeList
            resumes={backendResumes}
            isLoading={isLoadingResumes}
            error={resumesError}
            onRefresh={fetchResumes}
            onDelete={handleDelete}
            onArchive={handleArchive}
            onDownload={handleDownload}
            onAnalyze={handleBackendAnalyze}
            onRefreshAnalysis={handleRefreshAnalysis}
            analyzingId={analyzingBackendId}
            highlightResumeId={lastUploadedResumeId}
            onHighlightClear={() => setLastUploadedResumeId(null)}
          />{" "}
        </div>
      )}{" "}
    </div>
  );
}
