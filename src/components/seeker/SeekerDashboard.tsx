/** * @license * SPDX-License-Identifier: Apache-2.0 */ import React, {
  useState,
  useEffect,
} from "react";
import { User } from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { analyzeResume } from "../../services/geminiService";
import { UserProfile, Job, Analysis } from "../../types/index";
import { useToast } from "../../hooks/useToast";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  Plus,
  ArrowRight,
  Loader2,
  Trash2,
  Zap,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { SkeletonJobCard, SkeletonAnalysisRow } from "../shared/SkeletonCard";
import { Badge } from "../shared/Badge";
import { AnalysisModal } from "./AnalysisModal";
import { JobDetailModal } from "./JobDetailModal";
import UploadResumeModal from "./UploadResumeModal";
interface SeekerDashboardProps {
  user: User;
  profile: UserProfile;
}
export function SeekerDashboard({
  user,
  profile: initialProfile,
}: SeekerDashboardProps) {
  const { showToast } = useToast();
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [activeTab, setActiveTab] = useState<"personal" | "jobboard">(
    "personal",
  );
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzingJobId, setAnalyzingJobId] = useState<string | null>(null);
  const [viewingJob, setViewingJob] = useState<Job | null>(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(
    null,
  );
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [pendingJobForAnalysis, setPendingJobForAnalysis] =
    useState<Job | null>(null);
  const [pendingPersonalAnalysis, setPendingPersonalAnalysis] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const [aSnap, jSnap] = await Promise.all([
          getDocs(
            query(
              collection(db, "analyses"),
              where("seekerId", "==", user.uid),
              orderBy("createdAt", "desc"),
            ),
          ),
          getDocs(query(collection(db, "jobs"), orderBy("createdAt", "desc"))),
        ]);
        setAnalyses(
          aSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as Analysis),
        );
        setJobs(jSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as Job));
      } catch (e) {
        console.error(e);
        showToast("Failed to load data. Please refresh.", "error");
      } finally {
        setLoading(false);
      }
    })();
  }, [user.uid]);
  const runAnalysis = async (
    jdText: string,
    jTitle: string,
    jobId?: string,
  ) => {
    if (!profile.resumeText) return;
    try {
      const result = await analyzeResume(
        profile.resumeText,
        `${jTitle}. ${jdText}`,
      );
      const payload: any = {
        ...result,
        seekerId: user.uid,
        jobTitle: jTitle,
        createdAt: serverTimestamp(),
      };
      if (jobId) payload.jobId = jobId;
      const ref = await addDoc(collection(db, "analyses"), payload);
      const newA = {
        id: ref.id,
        ...result,
        seekerId: user.uid,
        jobTitle: jTitle,
        jobId,
        createdAt: new Date(),
      } as Analysis;
      setAnalyses((prev) => [newA, ...prev]);
      setSelectedAnalysis(newA);
      showToast("Analysis complete!", "success");
    } catch (err: any) {
      console.error(err);
      showToast("Failed to run analysis. Please try again.", "error");
    }
  };
  const handleDeleteAnalysis = async (
    analysisId: string,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    try {
      await deleteDoc(doc(db, "analyses", analysisId));
      setAnalyses((prev) => prev.filter((a) => a.id !== analysisId));
      showToast("Analysis deleted", "info");
    } catch (err: any) {
      showToast("Failed to delete analysis", "error");
    }
  };
  const handleRunPersonal = async () => {
    if (!profile.resumeText) {
      setPendingPersonalAnalysis(true);
      setIsUploadModalOpen(true);
      return;
    }
    if (!jobDesc) return;
    setAnalyzing(true);
    await runAnalysis(jobDesc, jobTitle);
    setAnalyzing(false);
  };
  const handleAnalyzeJob = async (job: Job) => {
    if (!profile.resumeText) {
      setPendingJobForAnalysis(job);
      setIsUploadModalOpen(true);
      return;
    }
    setAnalyzingJobId(job.id);
    await runAnalysis(
      `${job.description}\n\nRequirements:\n${job.requirements}`,
      job.title,
      job.id,
    );
    setAnalyzingJobId(null);
  };
  return (
    <div className="pt-8 space-y-10 relative">
      {" "}
      {/* Header */}{" "}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-end border-b border-slate-100 pb-10"
      >
        {" "}
        <div className="space-y-3">
          {" "}
          <div className="section-label">Your Workspace</div>{" "}
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[0.9]">
            {" "}
            Analyze your <span className="text-indigo-600">fit.</span>{" "}
          </h2>{" "}
        </div>{" "}
        <button
          onClick={() => setIsUploadModalOpen(true)}
          aria-label={profile.resumeText ? "Update resume" : "Upload resume"}
          className="modern-btn-primary h-12 px-6 flex items-center gap-2 group shrink-0"
        >
          {" "}
          <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />{" "}
          <span className="hidden sm:inline">
            {profile.resumeText ? "Update Resume" : "Upload Resume"}
          </span>{" "}
          <span className="sm:hidden">Resume</span>{" "}
        </button>{" "}
      </motion.div>{" "}
      {/* Resume warning */}{" "}
      {!profile.resumeText && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-amber-50 border border-amber-100 text-amber-700 text-sm font-bold uppercase tracking-widest text-center"
        >
          {" "}
          ΓÜá Upload your resume first to enable analysis{" "}
        </motion.div>
      )}{" "}
      {/* Tab switcher */}{" "}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex gap-2 bg-slate-50 border border-slate-100 p-1.5 w-fit"
      >
        {" "}
        {(["personal", "jobboard"] as const).map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            aria-pressed={activeTab === tab}
            className={cn(
              "px-6 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all",
              activeTab === tab
                ? "bg-white border border-slate-100 text-slate-900 shadow-sm"
                : "text-slate-400 hover:text-slate-600",
            )}
          >
            {" "}
            {tab === "personal"
              ? "ΓÜí Personal Analysis"
              : "≡ƒÄ» Live Job Board"}{" "}
          </motion.button>
        ))}{" "}
      </motion.div>{" "}
      <AnimatePresence mode="wait">
        {" "}
        {activeTab === "personal" && (
          <motion.div
            key="personal"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            {" "}
            <div className="flex flex-col lg:flex-row gap-12">
              {" "}
              {/* Sidebar */}{" "}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:w-64 space-y-4 shrink-0"
              >
                {" "}
                <div className="section-label">Resume Status</div>{" "}
                <div
                  className={cn(
                    "modern-card p-6 flex flex-col items-center justify-center text-center space-y-3 min-h-[130px] border-2 transition-colors",
                    profile.resumeText
                      ? "border-emerald-100 bg-emerald-50/30"
                      : "border-dashed border-slate-200 bg-slate-50",
                  )}
                >
                  {" "}
                  {profile.resumeText ? (
                    <>
                      {" "}
                      <div className="w-10 h-10 bg-emerald-100 flex items-center justify-center">
                        {" "}
                        <FileText className="w-5 h-5 text-emerald-600" />{" "}
                      </div>{" "}
                      <div>
                        {" "}
                        <p className="text-xs font-black text-slate-900 uppercase tracking-widest">
                          Resume Active
                        </p>{" "}
                        <p className="text-[9px] font-medium text-slate-400 mt-0.5">
                          {profile.skills?.length || 0} skills extracted
                        </p>{" "}
                      </div>{" "}
                      <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-100 px-3 py-1 border border-emerald-200">
                        ΓùÅ Synchronized
                      </span>{" "}
                    </>
                  ) : (
                    <>
                      {" "}
                      <div className="w-10 h-10 bg-slate-100 flex items-center justify-center">
                        {" "}
                        <FileText className="w-5 h-5 text-slate-300" />{" "}
                      </div>{" "}
                      <p className="text-xs font-medium text-slate-400">
                        No resume uploaded yet.
                      </p>{" "}
                      <button
                        onClick={() => setIsUploadModalOpen(true)}
                        className="text-indigo-600 text-[10px] font-black uppercase tracking-widest underline underline-offset-2"
                      >
                        {" "}
                        Upload now Γåù{" "}
                      </button>{" "}
                    </>
                  )}{" "}
                </div>{" "}
                {profile.skills && profile.skills.length > 0 && (
                  <div className="modern-card p-4 bg-white space-y-3">
                    {" "}
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      Extracted Skills
                    </div>{" "}
                    <div className="flex flex-wrap gap-1.5">
                      {" "}
                      {profile.skills.slice(0, 8).map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[9px] font-bold uppercase tracking-wide border border-indigo-100"
                        >
                          {s}
                        </span>
                      ))}{" "}
                      {profile.skills.length > 8 && (
                        <span className="px-2 py-0.5 bg-slate-50 text-slate-400 text-[9px] font-bold border border-slate-100">
                          +{profile.skills.length - 8}
                        </span>
                      )}{" "}
                    </div>{" "}
                  </div>
                )}{" "}
              </motion.div>{" "}
              {/* Analysis Form */}{" "}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
                className="flex-1"
              >
                {" "}
                <div className="modern-card p-8 bg-white shadow-lg shadow-slate-100 border border-slate-100">
                  {" "}
                  <div className="section-label mb-6">
                    Alignment Engine
                  </div>{" "}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {" "}
                    <div className="space-y-2">
                      {" "}
                      <label
                        htmlFor="job-title-input"
                        className="text-[9px] font-black text-slate-400 uppercase tracking-widest block"
                      >
                        {" "}
                        Job Title{" "}
                        <span className="text-slate-300">(optional)</span>{" "}
                      </label>{" "}
                      <input
                        id="job-title-input"
                        placeholder="e.g. Senior Backend Engineer"
                        className="w-full bg-slate-50 border border-slate-200 h-12 px-4 focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium text-slate-900 text-sm"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                      />{" "}
                    </div>{" "}
                    <div className="space-y-2">
                      {" "}
                      <label
                        htmlFor="model-select"
                        className="text-[9px] font-black text-slate-400 uppercase tracking-widest block"
                      >
                        AI Model
                      </label>{" "}
                      <select
                        id="model-select"
                        className="w-full bg-slate-50 border border-slate-200 h-12 px-4 focus:border-indigo-500 focus:bg-white outline-none appearance-none cursor-pointer font-medium text-slate-900 text-sm"
                        defaultValue="Gemini 2.0 Flash"
                      >
                        {" "}
                        <option>Gemini 2.0 Flash</option>{" "}
                        <option>Claude Sonnet 4.5</option>{" "}
                        <option>GPT-4o</option>{" "}
                      </select>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="space-y-2 mb-8">
                    {" "}
                    <label
                      htmlFor="job-desc-input"
                      className="text-[9px] font-black text-slate-400 uppercase tracking-widest block"
                    >
                      Job Description
                    </label>{" "}
                    <textarea
                      id="job-desc-input"
                      placeholder="Paste the full job description here ΓÇö the more detail, the better the analysis..."
                      className="w-full bg-slate-50 border border-slate-200 h-44 p-4 focus:border-indigo-500 focus:bg-white outline-none transition-all resize-none font-medium text-slate-900 text-sm leading-relaxed"
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                    />{" "}
                    <p className="text-[9px] font-medium text-slate-400">
                      {" "}
                      {jobDesc.length > 0
                        ? `${jobDesc.length} characters`
                        : "Tip: include requirements, responsibilities, and tech stack for best results."}{" "}
                    </p>{" "}
                  </div>{" "}
                  <button
                    onClick={handleRunPersonal}
                    disabled={analyzing || (!!profile.resumeText && !jobDesc)}
                    aria-label="Run resume analysis"
                    className="w-full modern-btn-primary h-14 text-sm flex items-center justify-center gap-3"
                  >
                    {" "}
                    {analyzing ? (
                      <>
                        <Loader2 className="animate-spin w-5 h-5" />
                        <span className="tracking-[0.15em]">Analyzing...</span>
                      </>
                    ) : profile.resumeText ? (
                      <>
                        <Zap className="w-4 h-4 fill-current" />
                        Run Analysis
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Upload Resume to Start
                      </>
                    )}{" "}
                  </button>{" "}
                </div>{" "}
              </motion.div>{" "}
            </div>{" "}
            {/* Recent Analyses */}{" "}
            <div className="space-y-6">
              {" "}
              <div className="section-label">
                Recent Analyses ({analyses.length})
              </div>{" "}
              {loading && (
                <div className="space-y-3">
                  {" "}
                  {[1, 2, 3].map((i) => (
                    <SkeletonAnalysisRow key={i} />
                  ))}{" "}
                </div>
              )}{" "}
              {!loading && analyses.length === 0 && (
                <div className="py-16 text-center border-2 border-dashed border-slate-100 space-y-4">
                  {" "}
                  <FileText className="w-10 h-10 mx-auto text-slate-200" />{" "}
                  <p className="text-slate-300 font-bold uppercase tracking-widest text-sm">
                    No analyses yet
                  </p>{" "}
                  <p className="text-slate-300 text-xs font-medium">
                    Upload your resume and paste a job description above to get
                    started.
                  </p>{" "}
                </div>
              )}{" "}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.07 } },
                }}
                className="space-y-3"
              >
                {" "}
                {analyses.map((a) => (
                  <motion.div
                    key={a.id}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    whileHover={{ x: 4 }}
                    onClick={() => setSelectedAnalysis(a)}
                    className="modern-card p-6 flex items-center justify-between group cursor-pointer border border-slate-100 bg-white hover:border-indigo-400 hover:shadow-md transition-all"
                  >
                    {" "}
                    <div className="flex items-center gap-6">
                      {" "}
                      <div
                        className={cn(
                          "w-16 h-16 flex flex-col items-center justify-center border-2 shrink-0",
                          a.score >= 75
                            ? "border-indigo-200 bg-indigo-50"
                            : a.score >= 50
                              ? "border-amber-200 bg-amber-50"
                              : "border-red-200 bg-red-50",
                        )}
                      >
                        {" "}
                        <span
                          className={cn(
                            "text-2xl font-black tabular-nums leading-none",
                            a.score >= 75
                              ? "text-indigo-600"
                              : a.score >= 50
                                ? "text-amber-600"
                                : "text-red-500",
                          )}
                        >
                          {a.score}
                        </span>{" "}
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                          /100
                        </span>{" "}
                      </div>{" "}
                      <div className="space-y-1.5">
                        {" "}
                        <h4 className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                          {" "}
                          {a.jobTitle || "Analysis Perspective"}{" "}
                        </h4>{" "}
                        <div className="flex items-center gap-2 flex-wrap">
                          {" "}
                          {a.recommendation && (
                            <Badge
                              type="recommendation"
                              value={a.recommendation}
                            />
                          )}{" "}
                          {a.jobId && (
                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[9px] font-bold uppercase tracking-wider border border-indigo-100">
                              Job Linked
                            </span>
                          )}{" "}
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                            {" "}
                            {a.matchingSkills?.length || 0} matches ┬╖{" "}
                            {(a.skillGaps || []).length} gaps{" "}
                          </span>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="flex items-center gap-3">
                      {" "}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => handleDeleteAnalysis(a.id, e)}
                        aria-label="Delete analysis"
                        className="w-9 h-9 flex items-center justify-center border border-slate-200 bg-white hover:bg-red-50 hover:border-red-300 transition-all group/delete"
                      >
                        {" "}
                        <Trash2 className="w-3.5 h-3.5 text-slate-400 group-hover/delete:text-red-600 transition-colors" />{" "}
                      </motion.button>{" "}
                      <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />{" "}
                    </div>{" "}
                  </motion.div>
                ))}{" "}
              </motion.div>{" "}
            </div>{" "}
          </motion.div>
        )}{" "}
        {activeTab === "jobboard" && (
          <motion.div
            key="jobboard"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {" "}
            <div className="flex items-center justify-between">
              {" "}
              <div>
                {" "}
                <div className="section-label">Live Job Board</div>{" "}
                <p className="text-slate-500 font-medium">
                  {jobs.length} active position{jobs.length !== 1 ? "s" : ""}{" "}
                  available
                </p>{" "}
              </div>{" "}
              {!profile.resumeText && (
                <div className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 border border-amber-100 px-4 py-2">
                  {" "}
                  Upload resume to apply{" "}
                </div>
              )}{" "}
            </div>{" "}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {" "}
                {[1, 2, 3].map((i) => (
                  <SkeletonJobCard key={i} />
                ))}{" "}
              </div>
            )}{" "}
            {!loading && jobs.length === 0 && (
              <div className="py-20 text-center border-2 border-dashed border-slate-100 space-y-4">
                {" "}
                <Briefcase className="w-12 h-12 mx-auto text-slate-200" />{" "}
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                  No jobs posted yet
                </p>{" "}
                <p className="text-slate-300 text-xs font-medium">
                  Check back later ΓÇö recruiters will post positions here.
                </p>{" "}
              </div>
            )}{" "}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {" "}
              {jobs.map((job) => (
                <motion.div
                  key={job.id}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                  }}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 24px 48px -12px rgba(99,102,241,0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="modern-card p-8 bg-white flex flex-col group shadow-sm hover:border-indigo-400 transition-all"
                >
                  {" "}
                  <div className="flex justify-between items-start mb-5">
                    {" "}
                    <motion.div
                      whileHover={{ rotate: 12, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-11 h-11 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors"
                    >
                      {" "}
                      <Briefcase className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />{" "}
                    </motion.div>{" "}
                    <motion.span
                      whileHover={{ scale: 1.08 }}
                      className="px-3 py-1 bg-slate-50 text-slate-400 text-[8px] uppercase font-bold tracking-widest border border-slate-100"
                    >
                      {job.location}
                    </motion.span>{" "}
                  </div>{" "}
                  <h3 className="text-xl font-black text-slate-900 mb-1 leading-tight group-hover:text-indigo-600 transition-colors">
                    {job.title}
                  </h3>{" "}
                  <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">
                    {job.company || "Confidential"}
                  </p>{" "}
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-1 font-medium">
                    {job.description}
                  </p>{" "}
                  <div className="flex gap-3">
                    {" "}
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setViewingJob(job)}
                      aria-label={`View details for ${job.title}`}
                      className="modern-btn-secondary h-12 px-4 text-xs font-bold border border-slate-200 shrink-0"
                    >
                      {" "}
                      Details{" "}
                    </motion.button>{" "}
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleAnalyzeJob(job)}
                      disabled={analyzingJobId === job.id}
                      aria-label={`Analyze fit for ${job.title}`}
                      className="flex-1 modern-btn-primary h-12 text-xs flex items-center justify-center gap-2"
                    >
                      {" "}
                      {analyzingJobId === job.id ? (
                        <>
                          <Loader2 className="animate-spin w-4 h-4" />
                          Analyzing...
                        </>
                      ) : profile.resumeText ? (
                        <>
                          Analyze my fit <ArrowRight className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Add Resume & Analyze <Plus className="w-4 h-4" />
                        </>
                      )}{" "}
                    </motion.button>{" "}
                  </div>{" "}
                </motion.div>
              ))}{" "}
            </motion.div>{" "}
          </motion.div>
        )}{" "}
      </AnimatePresence>{" "}
      <AnimatePresence>
        {" "}
        {isUploadModalOpen && (
          <UploadResumeModal
            user={user}
            profile={profile}
            customTitle={
              pendingJobForAnalysis
                ? `Analyze ${pendingJobForAnalysis.title}`
                : undefined
            }
            onClose={() => {
              setIsUploadModalOpen(false);
              setPendingJobForAnalysis(null);
              setPendingPersonalAnalysis(false);
            }}
            onProfileUpdate={(updated) => {
              setProfile(updated);
              if (pendingJobForAnalysis) {
                handleAnalyzeJob(pendingJobForAnalysis);
                setPendingJobForAnalysis(null);
              } else if (pendingPersonalAnalysis && jobDesc) {
                setAnalyzing(true);
                runAnalysis(jobDesc, jobTitle).finally(() => {
                  setAnalyzing(false);
                  setPendingPersonalAnalysis(false);
                });
              }
            }}
          />
        )}{" "}
        {viewingJob && (
          <JobDetailModal
            job={viewingJob}
            onClose={() => setViewingJob(null)}
            onAnalyze={() => {
              setViewingJob(null);
              handleAnalyzeJob(viewingJob);
            }}
            isAnalyzing={analyzingJobId === viewingJob?.id}
            hasResume={!!profile.resumeText}
          />
        )}{" "}
        {selectedAnalysis && (
          <AnalysisModal
            analysis={selectedAnalysis}
            onClose={() => setSelectedAnalysis(null)}
          />
        )}{" "}
      </AnimatePresence>{" "}
    </div>
  );
}
