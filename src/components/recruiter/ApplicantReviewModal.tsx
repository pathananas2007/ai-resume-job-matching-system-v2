/** * @license * SPDX-License-Identifier: Apache-2.0 */ import {
  useState,
  useEffect,
} from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Job, Analysis } from "../../types/index";
import { motion, AnimatePresence } from "motion/react";
import { Plus, BarChart, UserIcon, Loader2, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { Badge } from "../shared/Badge";
import { AnalysisModal } from "../seeker/AnalysisModal";
interface ApplicantReviewModalProps {
  job: Job;
  onClose: () => void;
}
type SortKey = "score" | "recommendation" | "date";
const REC_ORDER: Record<string, number> = {
  Interview: 0,
  Consider: 1,
  Reject: 2,
};
export function ApplicantReviewModal({
  job,
  onClose,
}: ApplicantReviewModalProps) {
  const [applicants, setApplicants] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Analysis | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("score");
  useEffect(() => {
    (async () => {
      try {
        const q = query(
          collection(db, "analyses"),
          where("jobId", "==", job.id),
          orderBy("score", "desc"),
        );
        const snap = await getDocs(q);
        setApplicants(
          snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Analysis),
        );
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [job.id]);
  const sorted = [...applicants].sort((a, b) => {
    if (sortKey === "score") return b.score - a.score;
    if (sortKey === "recommendation") {
      return (
        (REC_ORDER[a.recommendation || ""] ?? 3) -
        (REC_ORDER[b.recommendation || ""] ?? 3)
      );
    }
    return 0; /* date: already ordered from Firestore */
  });
  const interviewCount = applicants.filter(
    (a) => a.recommendation === "Interview",
  ).length;
  const avgScore =
    applicants.length > 0
      ? Math.round(
          applicants.reduce((s, a) => s + a.score, 0) / applicants.length,
        )
      : 0;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[200] flex items-center justify-center p-6"
    >
      {" "}
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0 }}
        className="modern-card bg-white w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
      >
        {" "}
        {/* Header */}{" "}
        <div className="p-8 border-b border-slate-100 flex justify-between items-start shrink-0">
          {" "}
          <div className="space-y-1">
            {" "}
            <div className="section-label flex items-center gap-2">
              {" "}
              <BarChart className="w-3 h-3 text-indigo-600" /> Applicant
              Intelligence{" "}
            </div>{" "}
            <h2 className="text-3xl font-black text-slate-900 leading-tight">
              {job.title}
            </h2>{" "}
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
              {job.company} ΓÇó {job.location}
            </p>{" "}
          </div>{" "}
          <button
            onClick={onClose}
            aria-label="Close applicant review"
            className="text-slate-300 hover:text-slate-700 transition-colors mt-1"
          >
            {" "}
            <Plus className="w-7 h-7 rotate-45" />{" "}
          </button>{" "}
        </div>{" "}
        {/* Summary bar */}{" "}
        {!loading && applicants.length > 0 && (
          <div className="px-8 py-4 bg-slate-50 border-b border-slate-100 flex items-center gap-8 flex-wrap">
            {" "}
            <div className="text-center">
              {" "}
              <div className="text-2xl font-black text-slate-900 tabular-nums">
                {applicants.length}
              </div>{" "}
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Total
              </div>{" "}
            </div>{" "}
            <div className="text-center">
              {" "}
              <div className="text-2xl font-black text-emerald-600 tabular-nums">
                {interviewCount}
              </div>{" "}
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Interview
              </div>{" "}
            </div>{" "}
            <div className="text-center">
              {" "}
              <div className="text-2xl font-black text-indigo-600 tabular-nums">
                {avgScore}
              </div>{" "}
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Avg Score
              </div>{" "}
            </div>{" "}
            <div className="ml-auto flex items-center gap-2">
              {" "}
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Sort:
              </span>{" "}
              {(["score", "recommendation", "date"] as SortKey[]).map((k) => (
                <button
                  key={k}
                  onClick={() => setSortKey(k)}
                  className={cn(
                    "px-3 py-1 text-[9px] font-bold uppercase tracking-widest border transition-colors",
                    sortKey === k
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-slate-500 border-slate-200 hover:border-indigo-300",
                  )}
                >
                  {" "}
                  {k}{" "}
                </button>
              ))}{" "}
            </div>{" "}
          </div>
        )}{" "}
        {/* Body */}{" "}
        <div className="flex-1 overflow-y-auto p-8">
          {" "}
          {loading && (
            <div className="flex items-center justify-center py-20 gap-3">
              {" "}
              <Loader2 className="animate-spin w-6 h-6 text-indigo-600" />{" "}
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                Fetching applicants...
              </span>{" "}
            </div>
          )}{" "}
          {!loading && applicants.length === 0 && (
            <div className="py-24 text-center space-y-4 border-2 border-dashed border-slate-100">
              {" "}
              <UserIcon className="w-12 h-12 mx-auto text-slate-200" />{" "}
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                No applicants yet
              </p>{" "}
              <p className="text-slate-300 text-xs font-medium">
                Candidates who apply to this job will appear here.
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
            className="space-y-4"
          >
            {" "}
            {sorted.map((a) => (
              <motion.div
                key={a.id}
                variants={{
                  hidden: { x: -20, opacity: 0 },
                  visible: { x: 0, opacity: 1 },
                }}
                whileHover={{ x: 4 }}
                onClick={() => setSelected(a)}
                className="modern-card p-5 flex items-center justify-between cursor-pointer group hover:shadow-md hover:border-indigo-400 transition-all border border-slate-100"
              >
                {" "}
                <div className="flex items-center gap-6">
                  {" "}
                  <div
                    className={cn(
                      "w-14 h-14 flex flex-col items-center justify-center border-2 shrink-0",
                      a.score >= 75
                        ? "border-indigo-200 bg-indigo-50"
                        : a.score >= 50
                          ? "border-amber-200 bg-amber-50"
                          : "border-red-200 bg-red-50",
                    )}
                  >
                    {" "}
                    <div
                      className={cn(
                        "text-xl font-black tabular-nums leading-none",
                        a.score >= 75
                          ? "text-indigo-600"
                          : a.score >= 50
                            ? "text-amber-600"
                            : "text-red-500",
                      )}
                    >
                      {a.score}
                    </div>{" "}
                    <div className="text-[8px] font-bold text-slate-400 uppercase">
                      /100
                    </div>{" "}
                  </div>{" "}
                  <div className="space-y-1.5">
                    {" "}
                    <p className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {" "}
                      Candidate #{a.id.slice(-6).toUpperCase()}{" "}
                    </p>{" "}
                    <div className="flex items-center gap-2 flex-wrap">
                      {" "}
                      {a.recommendation && (
                        <Badge type="recommendation" value={a.recommendation} />
                      )}{" "}
                      {a.matchingSkills?.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[9px] font-bold uppercase tracking-wide border border-indigo-100"
                        >
                          {s}
                        </span>
                      ))}{" "}
                      {(a.skillGaps?.length ?? 0) > 0 && (
                        <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[9px] font-bold uppercase tracking-wide border border-red-100">
                          {a.skillGaps?.length} gaps
                        </span>
                      )}{" "}
                    </div>{" "}
                    <div className="w-28 h-1.5 bg-slate-100 overflow-hidden">
                      {" "}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${a.score}%` }}
                        transition={{ duration: 1, ease: "circOut" }}
                        className={cn(
                          "h-full",
                          a.score >= 75
                            ? "bg-indigo-500"
                            : a.score >= 50
                              ? "bg-amber-400"
                              : "bg-red-400",
                        )}
                      />{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all shrink-0" />{" "}
              </motion.div>
            ))}{" "}
          </motion.div>{" "}
        </div>{" "}
      </motion.div>{" "}
      <AnimatePresence>
        {" "}
        {selected && (
          <AnalysisModal
            analysis={selected}
            onClose={() => setSelected(null)}
          />
        )}{" "}
      </AnimatePresence>{" "}
    </motion.div>
  );
}
