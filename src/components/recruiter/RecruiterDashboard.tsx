/** * @license * SPDX-License-Identifier: Apache-2.0 */ import {
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
import { Job } from "../../types/index";
import { useToast } from "../../hooks/useToast";
import { motion, AnimatePresence } from "motion/react";
import {
  Briefcase,
  Plus,
  Loader2,
  Trash2,
  BarChart,
  FileText,
  UserIcon,
  Zap,
  LogOut,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { SkeletonJobCard } from "../shared/SkeletonCard";
import { ApplicantReviewModal } from "./ApplicantReviewModal";
interface RecruiterDashboardProps {
  user: User;
}
type EditingJob = Partial<Job> & { id?: string };
export function RecruiterDashboard({ user }: RecruiterDashboardProps) {
  const { showToast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<EditingJob>({
    title: "",
    company: "",
    location: "",
    description: "",
    requirements: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [reviewJob, setReviewJob] = useState<Job | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    (async () => {
      try {
        const q = query(
          collection(db, "jobs"),
          where("recruiterId", "==", user.uid),
          orderBy("createdAt", "desc"),
        );
        const snap = await getDocs(q);
        setJobs(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Job));
      } catch (e) {
        console.error(e);
        showToast("Failed to load jobs", "error");
      } finally {
        setLoading(false);
      }
    })();
  }, [user.uid]);
  const openNew = () => {
    setEditingJob({
      title: "",
      company: "",
      location: "",
      description: "",
      requirements: "",
    });
    setFormErrors({});
    setShowForm(true);
  };
  const openEdit = (job: Job) => {
    setEditingJob({ ...job });
    setFormErrors({});
    setShowForm(true);
  };
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!editingJob.title?.trim()) errors.title = "Job title is required";
    if (!editingJob.company?.trim())
      errors.company = "Company name is required";
    if (!editingJob.location?.trim()) errors.location = "Location is required";
    if (
      !editingJob.description?.trim() ||
      editingJob.description.trim().length < 20
    ) {
      errors.description = "Description must be at least 20 characters";
    }
    if (!editingJob.requirements?.trim())
      errors.requirements = "Requirements are required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSaving(true);
    try {
      if (editingJob.id) {
        const { id, ...data } = editingJob;
        await setDoc(
          doc(db, "jobs", id!),
          { ...data, recruiterId: user.uid },
          { merge: true },
        );
        setJobs((prev) =>
          prev.map((j) => (j.id === id ? ({ ...j, ...editingJob } as Job) : j)),
        );
        showToast("Job updated successfully", "success");
      } else {
        const ref = await addDoc(collection(db, "jobs"), {
          ...editingJob,
          recruiterId: user.uid,
          createdAt: serverTimestamp(),
        });
        setJobs((prev) => [
          { id: ref.id, ...editingJob, createdAt: new Date() } as Job,
          ...prev,
        ]);
        showToast("Job deployed successfully", "success");
      }
      setShowForm(false);
    } catch (err: any) {
      console.error(err);
      showToast("Failed to save job. Please try again.", "error");
    } finally {
      setIsSaving(false);
    }
  };
  const handleDelete = async (jobId: string) => {
    try {
      await deleteDoc(doc(db, "jobs", jobId));
      setJobs((prev) => prev.filter((j) => j.id !== jobId));
      showToast("Job deleted", "info");
    } catch (err: any) {
      showToast("Failed to delete job", "error");
    }
  };
  return (
    <div className="pt-8 space-y-10">
      {" "}
      {/* Hero header */}{" "}
      <div className="border-b border-slate-100 pb-12 space-y-8">
        {" "}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          {" "}
          <div className="space-y-3">
            {" "}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="section-label"
            >
              Command Center
            </motion.div>{" "}
            <h1 className="text-5xl font-black tracking-tight text-slate-900 leading-[1]">
              {" "}
              Rank talent.
              <br />{" "}
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="text-indigo-600 inline-block"
              >
                Not resumes.
              </motion.span>{" "}
            </h1>{" "}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-slate-500 font-medium leading-relaxed max-w-lg"
            >
              {" "}
              Deploy a job blueprint once. The AI engine scores every applicant
              on the same rubric.{" "}
            </motion.p>{" "}
          </div>{" "}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.4,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={openNew}
            aria-label="Deploy new job blueprint"
            className="modern-btn-primary h-14 px-8 flex items-center justify-center gap-2 shadow-xl shadow-indigo-100 shrink-0"
          >
            {" "}
            <Plus className="w-5 h-5" /> Deploy New Blueprint{" "}
          </motion.button>{" "}
        </motion.div>{" "}
        {/* Feature tiles */}{" "}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.55 },
            },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {" "}
          {[
            {
              icon: FileText,
              label: "One Blueprint",
              desc: "Post a JD once ΓÇö scores run automatically for every applicant.",
            },
            {
              icon: BarChart,
              label: "Ranked Insights",
              desc: "Match %, matching skills, missing skills, and a candidate summary.",
            },
            {
              icon: UserIcon,
              label: "Blind Review",
              desc: "Candidates surface by score first, removing name-based bias.",
            },
            {
              icon: Zap,
              label: "Flexible AI",
              desc: "Choose the LLM that fits your team's workflow and budget.",
            },
          ].map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              whileHover={{
                y: -5,
                boxShadow: "0 12px 32px -8px rgba(99,102,241,0.18)",
              }}
              className="modern-card p-5 bg-white border border-slate-100 space-y-3 hover:border-indigo-300 transition-colors cursor-default"
            >
              {" "}
              <div className="w-8 h-8 bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                {" "}
                <Icon className="w-4 h-4 text-indigo-600" />{" "}
              </div>{" "}
              <div>
                {" "}
                <div className="text-xs font-black text-slate-800 uppercase tracking-widest mb-1">
                  {label}
                </div>{" "}
                <p className="text-xs text-slate-500 font-medium leading-snug">
                  {desc}
                </p>{" "}
              </div>{" "}
            </motion.div>
          ))}{" "}
        </motion.div>{" "}
      </div>{" "}
      {/* Stats bar */}{" "}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.12, delayChildren: 0.8 },
          },
        }}
        className="grid grid-cols-3 gap-6"
      >
        {" "}
        {[
          {
            label: "Active Blueprints",
            value: jobs.length,
            color: "text-slate-900",
          },
          {
            label: "Total Positions",
            value: jobs.length,
            color: "text-indigo-600",
          },
          { label: "Status", value: null, color: "" },
        ].map(({ label, value, color }, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { y: 16, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            whileHover={{
              y: -4,
              boxShadow: "0 16px 40px -12px rgba(99,102,241,0.15)",
            }}
            className="modern-card p-6 bg-white border border-slate-100 space-y-1 transition-shadow"
          >
            {" "}
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {label}
            </div>{" "}
            {value !== null ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.9 + i * 0.12,
                  type: "spring",
                  stiffness: 260,
                }}
                className={`text-4xl font-black tabular-nums ${color}`}
              >
                {value}
              </motion.div>
            ) : (
              <div className="text-sm font-black text-emerald-600 uppercase tracking-widest pt-1 flex items-center gap-1.5">
                {" "}
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    ease: "easeInOut",
                  }}
                >
                  ΓùÅ
                </motion.span>{" "}
                Live{" "}
              </div>
            )}{" "}
          </motion.div>
        ))}{" "}
      </motion.div>{" "}
      {/* Job Form Modal */}{" "}
      <AnimatePresence>
        {" "}
        {showForm && (
          <motion.div
            key="job-form-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/90 backdrop-blur-xl z-[100] flex items-center justify-center p-6"
          >
            {" "}
            <motion.div
              initial={{ scale: 0.97, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.97, opacity: 0 }}
              className="modern-card p-8 md:p-12 bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 border-indigo-600"
            >
              {" "}
              <div className="flex justify-between items-center mb-12">
                {" "}
                <div className="space-y-1">
                  {" "}
                  <div className="section-label">
                    Blueprint Configuration
                  </div>{" "}
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">
                    {" "}
                    {editingJob.id ? "Edit Blueprint" : "New Requirement"}{" "}
                  </h2>{" "}
                </div>{" "}
                <button
                  onClick={() => setShowForm(false)}
                  aria-label="Close job form"
                  className="text-slate-300 hover:text-slate-600 transition-colors"
                >
                  {" "}
                  <LogOut className="w-8 h-8 rotate-180" />{" "}
                </button>{" "}
              </div>{" "}
              <form onSubmit={handleSave} className="space-y-8" noValidate>
                {" "}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {" "}
                  <div className="space-y-2">
                    {" "}
                    <label
                      htmlFor="job-title"
                      className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block"
                    >
                      {" "}
                      Primary Title <span className="text-red-400">*</span>{" "}
                    </label>{" "}
                    <input
                      id="job-title"
                      placeholder="e.g. Senior Frontend Engineer"
                      className={cn(
                        "w-full border bg-slate-50/50 h-12 px-4 focus:outline-none focus:border-indigo-600 transition-colors",
                        formErrors.title
                          ? "border-red-400 bg-red-50/30"
                          : "border-slate-100",
                      )}
                      value={editingJob.title || ""}
                      onChange={(e) =>
                        setEditingJob((p) => ({ ...p, title: e.target.value }))
                      }
                    />{" "}
                    {formErrors.title && (
                      <p className="text-[10px] text-red-500 font-bold">
                        {formErrors.title}
                      </p>
                    )}{" "}
                  </div>{" "}
                  <div className="space-y-2">
                    {" "}
                    <label
                      htmlFor="job-location"
                      className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block"
                    >
                      {" "}
                      Location <span className="text-red-400">*</span>{" "}
                    </label>{" "}
                    <input
                      id="job-location"
                      placeholder="Remote / SF"
                      className={cn(
                        "w-full border bg-slate-50/50 h-12 px-4 focus:outline-none focus:border-indigo-600 transition-colors",
                        formErrors.location
                          ? "border-red-400 bg-red-50/30"
                          : "border-slate-100",
                      )}
                      value={editingJob.location || ""}
                      onChange={(e) =>
                        setEditingJob((p) => ({
                          ...p,
                          location: e.target.value,
                        }))
                      }
                    />{" "}
                    {formErrors.location && (
                      <p className="text-[10px] text-red-500 font-bold">
                        {formErrors.location}
                      </p>
                    )}{" "}
                  </div>{" "}
                </div>{" "}
                <div className="space-y-2">
                  {" "}
                  <label
                    htmlFor="job-company"
                    className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block"
                  >
                    {" "}
                    Organization <span className="text-red-400">*</span>{" "}
                  </label>{" "}
                  <input
                    id="job-company"
                    placeholder="MatchPoint AI"
                    className={cn(
                      "w-full border bg-slate-50/50 h-12 px-4 focus:outline-none focus:border-indigo-600 transition-colors",
                      formErrors.company
                        ? "border-red-400 bg-red-50/30"
                        : "border-slate-100",
                    )}
                    value={editingJob.company || ""}
                    onChange={(e) =>
                      setEditingJob((p) => ({ ...p, company: e.target.value }))
                    }
                  />{" "}
                  {formErrors.company && (
                    <p className="text-[10px] text-red-500 font-bold">
                      {formErrors.company}
                    </p>
                  )}{" "}
                </div>{" "}
                <div className="space-y-2">
                  {" "}
                  <label
                    htmlFor="job-description"
                    className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block"
                  >
                    {" "}
                    Mission Description{" "}
                    <span className="text-red-400">*</span>{" "}
                  </label>{" "}
                  <textarea
                    id="job-description"
                    placeholder="Detail the core objectives..."
                    className={cn(
                      "w-full border bg-slate-50/50 h-32 p-4 focus:outline-none focus:border-indigo-600 resize-none font-medium italic transition-colors",
                      formErrors.description
                        ? "border-red-400 bg-red-50/30"
                        : "border-slate-100",
                    )}
                    value={editingJob.description || ""}
                    onChange={(e) =>
                      setEditingJob((p) => ({
                        ...p,
                        description: e.target.value,
                      }))
                    }
                  />{" "}
                  {formErrors.description && (
                    <p className="text-[10px] text-red-500 font-bold">
                      {formErrors.description}
                    </p>
                  )}{" "}
                </div>{" "}
                <div className="space-y-2">
                  {" "}
                  <label
                    htmlFor="job-requirements"
                    className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block"
                  >
                    {" "}
                    Technical Parameters{" "}
                    <span className="text-red-400">*</span>{" "}
                  </label>{" "}
                  <textarea
                    id="job-requirements"
                    placeholder="Mandatory skill vectors (one per line)..."
                    className={cn(
                      "w-full border bg-slate-50/50 h-32 p-4 focus:outline-none focus:border-indigo-600 resize-none font-mono text-xs transition-colors",
                      formErrors.requirements
                        ? "border-red-400 bg-red-50/30"
                        : "border-slate-100",
                    )}
                    value={editingJob.requirements || ""}
                    onChange={(e) =>
                      setEditingJob((p) => ({
                        ...p,
                        requirements: e.target.value,
                      }))
                    }
                  />{" "}
                  {formErrors.requirements && (
                    <p className="text-[10px] text-red-500 font-bold">
                      {formErrors.requirements}
                    </p>
                  )}{" "}
                </div>{" "}
                <div className="flex gap-4 pt-6 border-t border-slate-100">
                  {" "}
                  <button
                    type="submit"
                    className="flex-1 modern-btn-primary h-14"
                    disabled={isSaving}
                  >
                    {" "}
                    {isSaving ? (
                      <Loader2 className="animate-spin w-5 h-5 mx-auto" />
                    ) : editingJob.id ? (
                      "Save Changes"
                    ) : (
                      "Deploy Requirement"
                    )}{" "}
                  </button>{" "}
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="modern-btn-secondary h-14 px-12"
                  >
                    {" "}
                    Discard{" "}
                  </button>{" "}
                </div>{" "}
              </form>{" "}
            </motion.div>{" "}
          </motion.div>
        )}{" "}
      </AnimatePresence>{" "}
      {/* Jobs grid */}{" "}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {" "}
          {[1, 2, 3].map((i) => (
            <SkeletonJobCard key={i} />
          ))}{" "}
        </div>
      )}{" "}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
      >
        {" "}
        {jobs.length === 0 && !loading && (
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="col-span-full py-32 text-center space-y-4 border-2 border-dashed border-slate-100"
          >
            {" "}
            <Briefcase className="w-14 h-14 mx-auto opacity-10" />{" "}
            <p className="text-lg font-bold text-slate-300 italic">
              No active deployments detected.
            </p>{" "}
            <button
              onClick={openNew}
              className="modern-btn-primary h-12 px-8 mx-auto flex items-center gap-2"
            >
              {" "}
              <Plus className="w-4 h-4" /> Deploy your first blueprint{" "}
            </button>{" "}
          </motion.div>
        )}{" "}
        {jobs.map((job) => (
          <motion.div
            key={job.id}
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            whileHover={{
              y: -8,
              boxShadow: "0 24px 48px -12px rgba(99,102,241,0.22)",
            }}
            whileTap={{ scale: 0.98 }}
            className="modern-card p-8 flex flex-col bg-white relative group hover:border-indigo-600 transition-all shadow-sm"
          >
            {" "}
            <div className="flex justify-between items-start mb-4">
              {" "}
              <motion.div
                whileHover={{ rotate: 10, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-10 h-10 bg-indigo-50 border border-indigo-100 flex items-center justify-center group-hover:bg-indigo-100 transition-colors shrink-0"
              >
                {" "}
                <Briefcase className="w-5 h-5 text-indigo-600" />{" "}
              </motion.div>{" "}
              <motion.button
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDelete(job.id)}
                aria-label={`Delete ${job.title}`}
                className="text-slate-200 hover:text-red-500 transition-colors"
              >
                {" "}
                <Trash2 className="w-4 h-4" />{" "}
              </motion.button>{" "}
            </div>{" "}
            <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors mb-1">
              {job.title}
            </h3>{" "}
            <p className="font-bold text-indigo-600 uppercase text-[10px] tracking-widest mb-4">
              {job.company} ΓÇó {job.location}
            </p>{" "}
            <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-3 flex-1 mb-5">
              {job.description}
            </p>{" "}
            {job.requirements && (
              <div className="mb-5 space-y-1.5">
                {" "}
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  Key Requirements
                </div>{" "}
                <div className="flex flex-wrap gap-1.5">
                  {" "}
                  {job.requirements
                    .split("\n")
                    .filter(Boolean)
                    .slice(0, 4)
                    .map((r, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.08, backgroundColor: "#eef2ff" }}
                        className="px-2 py-0.5 bg-slate-50 border border-slate-100 text-slate-500 text-[9px] font-bold uppercase tracking-wide"
                      >
                        {r.replace(/^[-ΓÇó*]\s*/, "").slice(0, 24)}
                      </motion.span>
                    ))}{" "}
                  {job.requirements.split("\n").filter(Boolean).length > 4 && (
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-400 text-[9px] font-bold">
                      {" "}
                      +{job.requirements.split("\n").filter(Boolean).length -
                        4}{" "}
                      more{" "}
                    </span>
                  )}{" "}
                </div>{" "}
              </div>
            )}{" "}
            <div className="h-px bg-slate-50 w-full mb-5" />{" "}
            <div className="flex gap-3">
              {" "}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setReviewJob(job)}
                aria-label={`Review applicants for ${job.title}`}
                className="flex-1 modern-btn-primary h-11 text-xs flex items-center justify-center gap-2"
              >
                {" "}
                <BarChart className="w-3.5 h-3.5" /> Review Intelligence{" "}
              </motion.button>{" "}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openEdit(job)}
                aria-label={`Edit ${job.title}`}
                className="modern-btn-secondary px-5 h-11 text-xs font-bold border border-slate-200"
              >
                {" "}
                Edit{" "}
              </motion.button>{" "}
            </div>{" "}
          </motion.div>
        ))}{" "}
      </motion.div>{" "}
      <AnimatePresence>
        {" "}
        {reviewJob && (
          <ApplicantReviewModal
            job={reviewJob}
            onClose={() => setReviewJob(null)}
          />
        )}{" "}
      </AnimatePresence>{" "}
    </div>
  );
}
