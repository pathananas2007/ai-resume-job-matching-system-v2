/** * @license * SPDX-License-Identifier: Apache-2.0 */ import { motion } from "motion/react";
import { User as UserIcon, Briefcase, ArrowRight, Loader2 } from "lucide-react";
interface RoleSelectionProps {
  onSelect: (role: "seeker" | "recruiter") => void;
  loading: boolean;
}
export function RoleSelection({ onSelect, loading }: RoleSelectionProps) {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-slate-50 p-8 text-center">
      {" "}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        {" "}
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-tight">
          {" "}
          Choose your <br />
          <span className="text-indigo-600 italic">path.</span>{" "}
        </h2>{" "}
      </motion.div>{" "}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.15, delayChildren: 0.3 },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl"
      >
        {" "}
        <motion.button
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{
            y: -8,
            boxShadow: "0 24px 48px -12px rgba(99,102,241,0.2)",
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect("seeker")}
          disabled={loading}
          aria-label="Select job seeker role"
          className="modern-card p-12 bg-white group text-left flex flex-col items-start gap-8 hover:border-indigo-600 transition-colors"
        >
          {" "}
          <motion.div
            whileHover={{ rotate: 10, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors"
          >
            {" "}
            <UserIcon className="w-6 h-6 text-slate-400 group-hover:text-indigo-600 transition-colors" />{" "}
          </motion.div>{" "}
          <div className="space-y-2">
            {" "}
            <h3 className="text-3xl font-bold text-slate-900">
              I'm a Job Seeker
            </h3>{" "}
            <p className="text-slate-500 leading-relaxed font-medium">
              Analyze your resume against job descriptions and find your gaps.
            </p>{" "}
          </div>{" "}
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            {" "}
            <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-indigo-600 transition-colors mt-auto" />{" "}
          </motion.div>{" "}
        </motion.button>{" "}
        <motion.button
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{
            y: -8,
            boxShadow: "0 24px 48px -12px rgba(239,68,68,0.15)",
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect("recruiter")}
          disabled={loading}
          aria-label="Select recruiter role"
          className="modern-card p-12 bg-white group text-left flex flex-col items-start gap-8 hover:border-brand-red transition-colors"
        >
          {" "}
          <motion.div
            whileHover={{ rotate: -10, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center group-hover:bg-red-50 group-hover:border-red-100 transition-colors"
          >
            {" "}
            <Briefcase className="w-6 h-6 text-slate-400 group-hover:text-brand-red transition-colors" />{" "}
          </motion.div>{" "}
          <div className="space-y-2">
            {" "}
            <h3 className="text-3xl font-bold text-slate-900">
              I'm a Recruiter
            </h3>{" "}
            <p className="text-slate-500 leading-relaxed font-medium">
              Post jobs and rank candidates based on objective AI scoring.
            </p>{" "}
          </div>{" "}
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            {" "}
            <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-brand-red transition-colors mt-auto" />{" "}
          </motion.div>{" "}
        </motion.button>{" "}
      </motion.div>{" "}
      {loading && (
        <div className="mt-12 flex items-center gap-3">
          {" "}
          <Loader2 className="animate-spin w-5 h-5 text-indigo-600" />{" "}
          <span className="text-sm font-bold uppercase tracking-widest text-slate-400">
            Initializing your choice...
          </span>{" "}
        </div>
      )}{" "}
    </div>
  );
}
