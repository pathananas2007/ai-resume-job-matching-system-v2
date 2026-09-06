import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  Search,
  Briefcase,
  MapPin,
  Clock,
  Users,
  Edit2,
  Trash2,
  Eye,
  MoreVertical,
  X,
  Loader2,
  ChevronDown,
  Filter,
  CheckCircle,
} from "lucide-react";
import { cn } from "../../../lib/utils"; /* ── Types ───────────────────────────────────────────────────────────────────── */
interface Job {
  id: string;
  title: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  level: "Entry" | "Mid" | "Senior" | "Lead";
  status: "active" | "draft" | "closed";
  applicants: number;
  posted: string;
  description: string;
  requirements: string[];
  salary: string;
} /* ── Mock data ───────────────────────────────────────────────────────────────── */
const INITIAL_JOBS: Job[] = [
  {
    id: "1",
    title: "Senior React Developer",
    location: "Remote",
    type: "Full-time",
    level: "Senior",
    status: "active",
    applicants: 34,
    posted: "Jun 28, 2025",
    salary: "$130k – $160k",
    description:
      "We are looking for a Senior React Developer to join our frontend team. You will build and maintain our web application using React and TypeScript.",
    requirements: [
      "5+ years React experience",
      "TypeScript proficiency",
      "Experience with design systems",
      "Strong CSS skills",
    ],
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    location: "San Francisco, CA",
    type: "Full-time",
    level: "Mid",
    status: "active",
    applicants: 28,
    posted: "Jun 25, 2025",
    salary: "$120k – $150k",
    description:
      "Join our engineering team to build scalable backend services and modern frontend interfaces.",
    requirements: [
      "3+ years full stack experience",
      "Node.js and React",
      "PostgreSQL or MongoDB",
      "REST API design",
    ],
  },
  {
    id: "3",
    title: "Frontend Engineer",
    location: "Remote",
    type: "Full-time",
    level: "Mid",
    status: "active",
    applicants: 19,
    posted: "Jun 22, 2025",
    salary: "$110k – $140k",
    description:
      "Build beautiful, performant user interfaces for our product suite.",
    requirements: [
      "3+ years frontend experience",
      "React and Next.js",
      "CSS and animation",
      "Performance optimization",
    ],
  },
  {
    id: "4",
    title: "UI Engineer",
    location: "New York, NY",
    type: "Full-time",
    level: "Mid",
    status: "active",
    applicants: 12,
    posted: "Jun 18, 2025",
    salary: "$105k – $130k",
    description:
      "Create pixel-perfect UI components and maintain our design system.",
    requirements: [
      "Strong CSS skills",
      "React component development",
      "Figma proficiency",
      "Accessibility knowledge",
    ],
  },
  {
    id: "5",
    title: "DevOps Engineer",
    location: "Remote",
    type: "Full-time",
    level: "Senior",
    status: "draft",
    applicants: 0,
    posted: "Jun 15, 2025",
    salary: "$130k – $155k",
    description: "Manage our cloud infrastructure and CI/CD pipelines.",
    requirements: [
      "AWS or GCP experience",
      "Kubernetes and Docker",
      "CI/CD pipelines",
      "Infrastructure as Code",
    ],
  },
  {
    id: "6",
    title: "Product Designer",
    location: "San Francisco, CA",
    type: "Full-time",
    level: "Mid",
    status: "closed",
    applicants: 22,
    posted: "Jun 1, 2025",
    salary: "$115k – $140k",
    description: "Design intuitive user experiences for our platform.",
    requirements: [
      "Figma expertise",
      "User research skills",
      "Prototyping",
      "Design systems",
    ],
  },
];
const STATUS_CONFIG: Record<
  string,
  { label: string; cls: string; dot: string }
> = {
  active: {
    label: "Active",
    cls: "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]",
    dot: "bg-[#22C55E]",
  },
  draft: {
    label: "Draft",
    cls: "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]",
    dot: "bg-[#F59E0B]",
  },
  closed: {
    label: "Closed",
    cls: "bg-[#F8FAFC] text-[#475569] border-[#E2E8F0]",
    dot: "bg-[#94A3B8]",
  },
};
const EMPTY_JOB: Omit<Job, "id" | "applicants" | "posted"> = {
  title: "",
  location: "",
  type: "Full-time",
  level: "Mid",
  status: "draft",
  salary: "",
  description: "",
  requirements: [],
}; /* ── Job Form Modal ───────────────────────────────────────────────────────────── */
function JobFormModal({
  job,
  onClose,
  onSave,
}: {
  job: Partial<Job> | null;
  onClose: () => void;
  onSave: (job: Partial<Job>) => void;
}) {
  const isEdit = !!job?.id;
  const [form, setForm] = useState<Partial<Job>>(job ?? { ...EMPTY_JOB });
  const [reqInput, setReqInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title?.trim()) e.title = "Job title is required";
    if (!form.location?.trim()) e.location = "Location is required";
    if (!form.description?.trim() || form.description.trim().length < 20)
      e.description = "Description must be at least 20 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    /* simulate save */ onSave(form);
    setSaving(false);
  };
  const addReq = () => {
    if (!reqInput.trim()) return;
    setForm((p) => ({
      ...p,
      requirements: [...(p.requirements || []), reqInput.trim()],
    }));
    setReqInput("");
  };
  const removeReq = (i: number) => {
    setForm((p) => ({
      ...p,
      requirements: (p.requirements || []).filter((_, idx) => idx !== i),
    }));
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {" "}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl"
      >
        {" "}
        {/* Header */}{" "}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
          {" "}
          <div>
            {" "}
            <h2 className="text-lg font-bold text-[#1E293B]">
              {isEdit ? "Edit Job" : "Create New Job"}
            </h2>{" "}
            <p className="text-xs text-[#64748B] mt-0.5">
              {isEdit
                ? "Update job details"
                : "Fill in the details to post a new position"}
            </p>{" "}
          </div>{" "}
          <button
            onClick={onClose}
            className="p-2 text-[#94A3B8] hover:text-[#1E293B] hover:bg-[#F5F7FA] rounded-lg transition-colors"
          >
            {" "}
            <X className="w-5 h-5" />{" "}
          </button>{" "}
        </div>{" "}
        {/* Body */}{" "}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {" "}
            <div className="sm:col-span-2">
              {" "}
              <label className="label">
                Job Title <span className="text-[#EF4444]">*</span>
              </label>{" "}
              <input
                className={cn("input", errors.title && "input-error")}
                placeholder="e.g. Senior Frontend Engineer"
                value={form.title || ""}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
              />{" "}
              {errors.title && <p className="error-msg">{errors.title}</p>}{" "}
            </div>{" "}
            <div>
              {" "}
              <label className="label">
                Location <span className="text-[#EF4444]">*</span>
              </label>{" "}
              <input
                className={cn("input", errors.location && "input-error")}
                placeholder="Remote / City, State"
                value={form.location || ""}
                onChange={(e) =>
                  setForm((p) => ({ ...p, location: e.target.value }))
                }
              />{" "}
              {errors.location && (
                <p className="error-msg">{errors.location}</p>
              )}{" "}
            </div>{" "}
            <div>
              {" "}
              <label className="label">Salary Range</label>{" "}
              <input
                className="input"
                placeholder="e.g. $120k – $150k"
                value={form.salary || ""}
                onChange={(e) =>
                  setForm((p) => ({ ...p, salary: e.target.value }))
                }
              />{" "}
            </div>{" "}
            <div>
              {" "}
              <label className="label">Job Type</label>{" "}
              <select
                className="input cursor-pointer"
                value={form.type || "Full-time"}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    type: e.target.value as Job["type"],
                  }))
                }
              >
                {" "}
                {["Full-time", "Part-time", "Contract", "Remote"].map((t) => (
                  <option key={t}>{t}</option>
                ))}{" "}
              </select>{" "}
            </div>{" "}
            <div>
              {" "}
              <label className="label">Experience Level</label>{" "}
              <select
                className="input cursor-pointer"
                value={form.level || "Mid"}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    level: e.target.value as Job["level"],
                  }))
                }
              >
                {" "}
                {["Entry", "Mid", "Senior", "Lead"].map((l) => (
                  <option key={l}>{l}</option>
                ))}{" "}
              </select>{" "}
            </div>{" "}
            <div>
              {" "}
              <label className="label">Status</label>{" "}
              <select
                className="input cursor-pointer"
                value={form.status || "draft"}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    status: e.target.value as Job["status"],
                  }))
                }
              >
                {" "}
                <option value="draft">Draft</option>{" "}
                <option value="active">Active</option>{" "}
                <option value="closed">Closed</option>{" "}
              </select>{" "}
            </div>{" "}
          </div>{" "}
          <div>
            {" "}
            <label className="label">
              Job Description <span className="text-[#EF4444]">*</span>
            </label>{" "}
            <textarea
              className={cn(
                "input resize-none",
                errors.description && "input-error",
              )}
              rows={4}
              placeholder="Describe the role, responsibilities, and what success looks like..."
              value={form.description || ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
            />{" "}
            {errors.description && (
              <p className="error-msg">{errors.description}</p>
            )}{" "}
          </div>{" "}
          <div>
            {" "}
            <label className="label">Requirements</label>{" "}
            <div className="flex gap-2 mb-2">
              {" "}
              <input
                className="input flex-1"
                placeholder="Add a requirement and press Enter"
                value={reqInput}
                onChange={(e) => setReqInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addReq())
                }
              />{" "}
              <button onClick={addReq} className="btn-secondary btn-sm px-3">
                Add
              </button>{" "}
            </div>{" "}
            {(form.requirements || []).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {" "}
                {(form.requirements || []).map((r, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-[#EFF6FF] text-[#2563EB] text-xs font-medium rounded-full border border-[#BFDBFE]"
                  >
                    {" "}
                    {r}{" "}
                    <button
                      onClick={() => removeReq(i)}
                      className="text-[#93C5FD] hover:text-[#2563EB]"
                    >
                      <X className="w-3 h-3" />
                    </button>{" "}
                  </span>
                ))}{" "}
              </div>
            )}{" "}
          </div>{" "}
        </div>{" "}
        {/* Footer */}{" "}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E2E8F0]">
          {" "}
          <button onClick={onClose} className="btn-secondary btn-sm">
            Cancel
          </button>{" "}
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary btn-sm"
          >
            {" "}
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving...
              </>
            ) : isEdit ? (
              "Save Changes"
            ) : (
              "Create Job"
            )}{" "}
          </button>{" "}
        </div>{" "}
      </motion.div>{" "}
    </motion.div>
  );
} /* ── Main Page ───────────────────────────────────────────────────────────────── */
export default function JobManagementPage() {
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [formJob, setFormJob] = useState<Partial<Job> | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const filtered = jobs.filter((j) => {
    const matchSearch =
      !search ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || j.status === statusFilter;
    return matchSearch && matchStatus;
  });
  const openCreate = () => {
    setFormJob({ ...EMPTY_JOB });
    setShowForm(true);
  };
  const openEdit = (job: Job) => {
    setFormJob({ ...job });
    setShowForm(true);
    setOpenMenu(null);
  };
  const handleSave = (data: Partial<Job>) => {
    if (data.id) {
      setJobs((prev) =>
        prev.map((j) => (j.id === data.id ? ({ ...j, ...data } as Job) : j)),
      );
    } else {
      const newJob: Job = {
        ...(data as Omit<Job, "id" | "applicants" | "posted">),
        id: Date.now().toString(),
        applicants: 0,
        posted: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      } as Job;
      setJobs((prev) => [newJob, ...prev]);
    }
    setShowForm(false);
  };
  const handleDelete = (id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    setDeleteConfirm(null);
    setOpenMenu(null);
  };
  const counts = {
    all: jobs.length,
    active: jobs.filter((j) => j.status === "active").length,
    draft: jobs.filter((j) => j.status === "draft").length,
    closed: jobs.filter((j) => j.status === "closed").length,
  };
  return (
    <div className="space-y-6 animate-fade-in">
      {" "}
      {/* Header */}{" "}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {" "}
        <div>
          {" "}
          <h1 className="text-2xl font-bold text-[#1E293B]">
            Job Management
          </h1>{" "}
          <p className="text-[#64748B] mt-0.5 text-sm">
            Create, manage, and track all your job postings
          </p>{" "}
        </div>{" "}
        <button onClick={openCreate} className="btn-primary btn-sm">
          {" "}
          <Plus className="w-4 h-4" /> Create Job{" "}
        </button>{" "}
      </div>{" "}
      {/* Status tabs */}{" "}
      <div className="flex gap-1 bg-[#F5F7FA] p-1 rounded-xl w-fit">
        {" "}
        {(["all", "active", "draft", "closed"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-all capitalize flex items-center gap-1.5",
              statusFilter === s
                ? "bg-white text-[#1E293B] shadow-sm"
                : "text-[#64748B] hover:text-[#1E293B]",
            )}
          >
            {" "}
            {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}{" "}
            <span
              className={cn(
                "text-xs px-1.5 py-0.5 rounded-full font-semibold",
                statusFilter === s
                  ? "bg-[#EFF6FF] text-[#2563EB]"
                  : "bg-[#E2E8F0] text-[#64748B]",
              )}
            >
              {" "}
              {counts[s]}{" "}
            </span>{" "}
          </button>
        ))}{" "}
      </div>{" "}
      {/* Search */}{" "}
      <div className="relative max-w-sm">
        {" "}
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />{" "}
        <input
          type="text"
          placeholder="Search jobs..."
          className="input pl-9 h-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />{" "}
      </div>{" "}
      {/* Jobs grid */}{" "}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E2E8F0] py-16 text-center">
          {" "}
          <Briefcase className="w-10 h-10 text-[#CBD5E1] mx-auto mb-3" />{" "}
          <p className="text-sm font-semibold text-[#1E293B]">No jobs found</p>{" "}
          <p className="text-xs text-[#64748B] mt-1 mb-4">
            Try adjusting your search or filters
          </p>{" "}
          <button onClick={openCreate} className="btn-primary btn-sm mx-auto">
            <Plus className="w-4 h-4" /> Create Job
          </button>{" "}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {" "}
          {filtered.map((job, i) => {
            const cfg = STATUS_CONFIG[job.status];
            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl border border-[#E2E8F0] p-5 hover:shadow-md hover:border-[#CBD5E1] transition-all duration-200 flex flex-col"
              >
                {" "}
                <div className="flex items-start justify-between mb-3">
                  {" "}
                  <div className="flex items-start gap-3">
                    {" "}
                    <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center shrink-0">
                      {" "}
                      <Briefcase className="w-5 h-5 text-[#2563EB]" />{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <h3 className="text-sm font-semibold text-[#1E293B] leading-snug">
                        {job.title}
                      </h3>{" "}
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {" "}
                        <MapPin className="w-3 h-3 text-[#94A3B8]" />{" "}
                        <span className="text-xs text-[#64748B]">
                          {job.location}
                        </span>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="relative">
                    {" "}
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === job.id ? null : job.id)
                      }
                      className="p-1.5 text-[#94A3B8] hover:text-[#1E293B] hover:bg-[#F5F7FA] rounded-lg transition-colors"
                    >
                      {" "}
                      <MoreVertical className="w-4 h-4" />{" "}
                    </button>{" "}
                    <AnimatePresence>
                      {" "}
                      {openMenu === job.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -4 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.12 }}
                          className="absolute right-0 top-full mt-1 w-40 bg-white border border-[#E2E8F0] rounded-xl shadow-lg z-20 py-1 overflow-hidden"
                        >
                          {" "}
                          <button
                            onClick={() => openEdit(job)}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[#475569] hover:bg-[#F5F7FA] transition-colors"
                          >
                            {" "}
                            <Edit2 className="w-3.5 h-3.5" /> Edit Job{" "}
                          </button>{" "}
                          <Link
                            to={`/recruiter/jobs/${job.id}/applicants`}
                            onClick={() => setOpenMenu(null)}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[#475569] hover:bg-[#F5F7FA] transition-colors"
                          >
                            {" "}
                            <Eye className="w-3.5 h-3.5" /> View Applicants{" "}
                          </Link>{" "}
                          <div className="border-t border-[#F1F5F9] my-1" />{" "}
                          <button
                            onClick={() => {
                              setDeleteConfirm(job.id);
                              setOpenMenu(null);
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[#EF4444] hover:bg-[#FEF2F2] transition-colors"
                          >
                            {" "}
                            <Trash2 className="w-3.5 h-3.5" /> Delete{" "}
                          </button>{" "}
                        </motion.div>
                      )}{" "}
                    </AnimatePresence>{" "}
                  </div>{" "}
                </div>{" "}
                <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2 mb-3 flex-1">
                  {job.description}
                </p>{" "}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {" "}
                  <span className="px-2 py-0.5 bg-[#F5F7FA] text-[#64748B] text-[10px] font-medium rounded-full border border-[#E2E8F0]">
                    {job.type}
                  </span>{" "}
                  <span className="px-2 py-0.5 bg-[#F5F7FA] text-[#64748B] text-[10px] font-medium rounded-full border border-[#E2E8F0]">
                    {job.level}
                  </span>{" "}
                  {job.salary && (
                    <span className="px-2 py-0.5 bg-[#F5F7FA] text-[#475569] text-[10px] font-semibold rounded-full border border-[#E2E8F0]">
                      {job.salary}
                    </span>
                  )}{" "}
                </div>{" "}
                <div className="flex items-center justify-between pt-3 border-t border-[#F1F5F9]">
                  {" "}
                  <div className="flex items-center gap-3">
                    {" "}
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
                        cfg.cls,
                      )}
                    >
                      {" "}
                      <span
                        className={cn("w-1.5 h-1.5 rounded-full", cfg.dot)}
                      />
                      {cfg.label}{" "}
                    </span>{" "}
                    <div className="flex items-center gap-1 text-xs text-[#64748B]">
                      {" "}
                      <Users className="w-3 h-3" />
                      {job.applicants}{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex items-center gap-1 text-xs text-[#94A3B8]">
                    {" "}
                    <Clock className="w-3 h-3" />
                    {job.posted}{" "}
                  </div>{" "}
                </div>{" "}
              </motion.div>
            );
          })}{" "}
        </div>
      )}{" "}
      {/* Click outside to close menu */}{" "}
      {openMenu && (
        <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />
      )}{" "}
      {/* Delete confirm */}{" "}
      <AnimatePresence>
        {" "}
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {" "}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              {" "}
              <div className="w-12 h-12 rounded-full bg-[#FEF2F2] flex items-center justify-center mx-auto mb-4">
                {" "}
                <Trash2 className="w-5 h-5 text-[#EF4444]" />{" "}
              </div>{" "}
              <h3 className="text-base font-bold text-[#1E293B] text-center mb-1">
                Delete Job Posting
              </h3>{" "}
              <p className="text-sm text-[#64748B] text-center mb-5">
                This will permanently delete the job and all associated data.
                This action cannot be undone.
              </p>{" "}
              <div className="flex gap-3">
                {" "}
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="btn-secondary btn-sm flex-1 justify-center"
                >
                  Cancel
                </button>{" "}
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="btn-danger btn-sm flex-1 justify-center"
                >
                  Delete
                </button>{" "}
              </div>{" "}
            </motion.div>{" "}
          </motion.div>
        )}{" "}
      </AnimatePresence>{" "}
      {/* Job form modal */}{" "}
      <AnimatePresence>
        {" "}
        {showForm && (
          <JobFormModal
            job={formJob}
            onClose={() => setShowForm(false)}
            onSave={handleSave}
          />
        )}{" "}
      </AnimatePresence>{" "}
    </div>
  );
}
