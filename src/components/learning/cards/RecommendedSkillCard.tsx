import React from "react";
import { motion } from "motion/react";
import { Sparkles, AlertCircle, ArrowUpCircle } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { RecommendedSkill } from "../types";
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
interface RecommendedSkillCardProps {
  skill: RecommendedSkill;
}
const priorityConfig = {
  High: {
    icon: AlertCircle,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/20",
  },
  Medium: {
    icon: ArrowUpCircle,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
  Low: {
    icon: Sparkles,
    color: "text-[#1e3a8a] dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
};
export function RecommendedSkillCard({ skill }: RecommendedSkillCardProps) {
  const PriorityIcon = priorityConfig[skill.priority].icon;
  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-slate-300 hover:shadow dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
    >
      {" "}
      <div>
        {" "}
        <h4 className="font-semibold text-slate-900 dark:text-white">
          {skill.name}
        </h4>{" "}
        <p className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
          {" "}
          Unlocks:{" "}
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {" "}
            {skill.relatedCareers.join(", ")}{" "}
          </span>{" "}
        </p>{" "}
      </div>{" "}
      <div className="flex items-center gap-3 text-right">
        {" "}
        <div className="flex flex-col items-end">
          {" "}
          <span
            className={cn(
              "flex items-center gap-1 text-xs font-semibold",
              priorityConfig[skill.priority].color,
            )}
          >
            {" "}
            <PriorityIcon className="h-3 w-3" /> {skill.priority} Priority{" "}
          </span>{" "}
          <span className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            {" "}
            {skill.difficulty}{" "}
          </span>{" "}
        </div>{" "}
      </div>{" "}
    </motion.div>
  );
}
