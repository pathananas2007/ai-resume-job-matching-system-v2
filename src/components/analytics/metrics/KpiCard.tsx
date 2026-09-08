import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowDownRight, Minus, Loader2 } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { KpiCardProps } from "../types";
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function KpiCard({
  title,
  description,
  value,
  change,
  trend,
  icon,
  loading,
  className,
}: KpiCardProps) {
  const isUp = trend === "up";
  const isDown = trend === "down";
  const isNeutral = trend === "neutral";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900",
        className,
      )}
    >
      {" "}
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
          {" "}
          <Loader2 className="h-6 w-6 animate-spin text-[#1e3a8a]" />{" "}
        </div>
      )}{" "}
      <div className="flex items-center justify-between">
        {" "}
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {title}
        </h3>{" "}
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-[#1e3a8a] dark:bg-blue-900/20 dark:text-blue-400">
            {" "}
            {icon}{" "}
          </div>
        )}{" "}
      </div>{" "}
      <div className="mt-4 flex items-baseline gap-4">
        {" "}
        <span className="text-3xl font-bold text-slate-900 dark:text-white">
          {value}
        </span>{" "}
        {change !== undefined && (
          <span
            className={cn(
              "flex items-center text-sm font-medium",
              isUp && "text-emerald-600 dark:text-emerald-400",
              isDown && "text-red-600 dark:text-red-400",
              isNeutral && "text-slate-600 dark:text-slate-400",
            )}
          >
            {" "}
            {isUp && <ArrowUpRight className="mr-1 h-4 w-4" />}{" "}
            {isDown && <ArrowDownRight className="mr-1 h-4 w-4" />}{" "}
            {isNeutral && <Minus className="mr-1 h-4 w-4" />} {Math.abs(change)}
            %{" "}
          </span>
        )}{" "}
      </div>{" "}
      {description && (
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      )}{" "}
    </motion.div>
  );
}
