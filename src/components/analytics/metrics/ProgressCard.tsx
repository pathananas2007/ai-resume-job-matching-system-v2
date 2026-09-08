import React from "react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ProgressProps } from "../types";
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function ProgressCard({
  title,
  description,
  value,
  max = 100,
  label,
  color = "#0d1b2a",
  loading,
  className,
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900",
        className,
      )}
    >
      {" "}
      <div className="mb-4 flex items-center justify-between">
        {" "}
        <div>
          {" "}
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </h3>{" "}
          {description && (
            <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
              {description}
            </p>
          )}{" "}
        </div>{" "}
        {loading && (
          <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
        )}{" "}
      </div>{" "}
      <div className="flex items-center justify-between mb-2">
        {" "}
        <span className="text-2xl font-bold text-slate-900 dark:text-white">
          {" "}
          {label || `${Math.round(percentage)}%`}{" "}
        </span>{" "}
      </div>{" "}
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        {" "}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute left-0 top-0 h-full rounded-full"
          style={{ backgroundColor: color }}
        />{" "}
      </div>{" "}
    </motion.div>
  );
}
