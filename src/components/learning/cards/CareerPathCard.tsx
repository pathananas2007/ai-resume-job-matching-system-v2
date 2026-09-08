import React from "react";
import { motion } from "motion/react";
import { Briefcase, TrendingUp, CheckCircle2 } from "lucide-react";
import { CareerPath } from "../types";
interface CareerPathCardProps {
  career: CareerPath;
}
export function CareerPathCard({ career }: CareerPathCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700"
    >
      {" "}
      <div className="mb-4 flex items-start justify-between">
        {" "}
        <div className="flex items-center gap-3">
          {" "}
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0d1b2a] text-white shadow-sm">
            {" "}
            <Briefcase className="h-5 w-5" />{" "}
          </div>{" "}
          <div>
            {" "}
            <h3 className="font-bold text-slate-900 dark:text-white">
              {career.title}
            </h3>{" "}
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {career.salaryRange}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {/* Match Score Badge */}{" "}
        <div className="flex flex-col items-end">
          {" "}
          <div className="flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            {" "}
            <TrendingUp className="h-4 w-4" /> {career.matchScore}% Match{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="mt-auto">
        {" "}
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {" "}
          Required Core Skills{" "}
        </p>{" "}
        <div className="flex flex-wrap gap-2">
          {" "}
          {career.requiredSkills.map((skill, index) => (
            <span
              key={index}
              className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              {" "}
              <CheckCircle2 className="h-3 w-3 text-emerald-500" /> {skill}{" "}
            </span>
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </motion.div>
  );
}
