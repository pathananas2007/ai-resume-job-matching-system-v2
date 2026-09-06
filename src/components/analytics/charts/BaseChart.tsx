import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { BaseCardProps } from "../types";
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export interface BaseChartProps extends BaseCardProps {
  children: React.ReactNode;
}
export function BaseChart({
  title,
  description,
  className,
  loading,
  empty,
  children,
}: BaseChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900",
        className,
      )}
    >
      {" "}
      <div className="mb-4">
        {" "}
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>{" "}
        {description && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}{" "}
      </div>{" "}
      <div className="relative flex-1 min-h-[300px]">
        {" "}
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
            {" "}
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />{" "}
          </div>
        )}{" "}
        {empty && !loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
            {" "}
            <p>No data available</p>{" "}
          </div>
        )}{" "}
        <div
          className={cn("h-full w-full", (loading || empty) && "opacity-30")}
        >
          {" "}
          {children}{" "}
        </div>{" "}
      </div>{" "}
    </motion.div>
  );
}
