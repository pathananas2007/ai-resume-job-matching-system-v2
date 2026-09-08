/** * @license * SPDX-License-Identifier: Apache-2.0 */ import {
  motion,
  AnimatePresence,
} from "motion/react";
import { Plus, Zap, Loader2 } from "lucide-react";
import { Job } from "../../types/index";
interface JobDetailModalProps {
  job: Job;
  onClose: () => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  hasResume: boolean;
}
export function JobDetailModal({
  job,
  onClose,
  onAnalyze,
  isAnalyzing,
  hasResume,
}: JobDetailModalProps) {
  return (
    <AnimatePresence>
      {" "}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[200] flex items-center justify-center p-6"
        onClick={onClose}
      >
        {" "}
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="modern-card bg-white w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
        >
          {" "}
          <div className="p-8 border-b border-slate-100 flex justify-between items-start shrink-0">
            {" "}
            <div className="space-y-1">
              {" "}
              <div className="section-label">Job Blueprint</div>{" "}
              <h2 className="text-3xl font-black text-slate-900 leading-tight">
                {job.title}
              </h2>{" "}
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                {job.company} ΓÇó {job.location}
              </p>{" "}
            </div>{" "}
            <button
              onClick={onClose}
              aria-label="Close job details"
              className="text-slate-300 hover:text-slate-700 transition-colors mt-1"
            >
              {" "}
              <Plus className="w-7 h-7 rotate-45" />{" "}
            </button>{" "}
          </div>{" "}
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {" "}
            <div className="space-y-3">
              {" "}
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Description
              </div>{" "}
              <p className="text-slate-700 font-medium leading-relaxed whitespace-pre-line">
                {job.description}
              </p>{" "}
            </div>{" "}
            {job.requirements && (
              <div className="space-y-3">
                {" "}
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Requirements
                </div>{" "}
                <div className="bg-slate-50 border border-slate-100 p-6 space-y-2">
                  {" "}
                  {job.requirements
                    .split("\n")
                    .filter(Boolean)
                    .map((req, i) => (
                      <div key={i} className="flex items-start gap-3">
                        {" "}
                        <span className="text-indigo-400 font-black text-xs mt-0.5 shrink-0">
                          ΓåÆ
                        </span>{" "}
                        <p className="text-slate-600 text-sm font-medium leading-snug">
                          {req}
                        </p>{" "}
                      </div>
                    ))}{" "}
                </div>{" "}
              </div>
            )}{" "}
          </div>{" "}
          <div className="p-8 border-t border-slate-100 shrink-0">
            {" "}
            {!hasResume && (
              <p className="text-xs font-bold text-amber-600 uppercase tracking-widest text-center mb-4">
                {" "}
                Upload your resume to analyze fit{" "}
              </p>
            )}{" "}
            <button
              onClick={onAnalyze}
              disabled={isAnalyzing}
              aria-label="Analyze my fit for this job"
              className="w-full modern-btn-primary h-14 text-sm flex items-center justify-center gap-3"
            >
              {" "}
              {isAnalyzing ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 fill-current" />
                  Analyze my fit
                </>
              )}{" "}
            </button>{" "}
          </div>{" "}
        </motion.div>{" "}
      </motion.div>{" "}
    </AnimatePresence>
  );
}
