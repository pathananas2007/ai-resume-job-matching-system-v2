import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Resource } from "../types";
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const difficultyStyles = {
  Beginner: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Intermediate: "bg-amber-50 text-amber-700 border border-amber-200",
  Advanced: "bg-rose-50 text-rose-700 border border-rose-200",
};
interface ResourceCardProps {
  resource: Resource;
  className?: string;
}
export function ResourceCard({
  resource,
  className,
  onBookmark,
}: ResourceCardProps & { onBookmark?: (id: string) => void }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        "group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900",
        className,
      )}
    >
      {" "}
      <Link
        to={`/seeker/learning/resource/${resource.id}`}
        className="flex flex-col flex-1 hover:opacity-90"
      >
        {" "}
        <div className="mb-4 flex items-start justify-between">
          {" "}
          <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
            {" "}
            <span className="text-xl leading-none">
              {" "}
              {resource.type === "Book"
                ? "≡ƒôÿ"
                : resource.type === "Course"
                  ? "≡ƒÄô"
                  : resource.type === "Certification"
                    ? "≡ƒÅå"
                    : "≡ƒôä"}{" "}
            </span>{" "}
          </div>{" "}
          <div className="flex items-center gap-1.5">
            {" "}
            {resource.free && (
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                {" "}
                FREE{" "}
              </span>
            )}{" "}
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                difficultyStyles[resource.difficulty],
              )}
            >
              {" "}
              {resource.difficulty}{" "}
            </span>{" "}
          </div>{" "}
        </div>{" "}
        {resource.category && (
          <p className="mb-1 text-xs font-bold tracking-widest text-blue-600 uppercase dark:text-blue-400">
            {" "}
            {resource.category}{" "}
          </p>
        )}{" "}
        <h3 className="mb-1 text-base font-bold text-slate-900 line-clamp-2 dark:text-white leading-tight">
          {" "}
          {resource.title}{" "}
        </h3>{" "}
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
          {" "}
          {resource.provider}{" "}
        </p>{" "}
        <div className="mt-auto flex flex-col gap-3 mb-6">
          {" "}
          <div className="flex flex-wrap items-center gap-2">
            {" "}
            <span className="rounded bg-slate-50 border border-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400">
              {" "}
              {resource.type}{" "}
            </span>{" "}
            <span className="rounded bg-slate-50 border border-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400">
              {" "}
              {resource.duration}{" "}
            </span>{" "}
          </div>{" "}
          {resource.recommendedReason && (
            <div className="rounded-lg bg-blue-50 border border-blue-100 p-2.5 dark:bg-blue-900/20 dark:border-blue-900/30">
              {" "}
              <p className="text-[11px] font-medium text-blue-700 dark:text-blue-300 flex items-start gap-1.5 leading-snug">
                {" "}
                <span className="mt-0.5">≡ƒÆí</span>{" "}
                {resource.recommendedReason}{" "}
              </p>{" "}
            </div>
          )}{" "}
        </div>{" "}
      </Link>{" "}
      <Link
        to={`/seeker/learning/resource/${resource.id}`}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white mt-4"
      >
        {" "}
        <Play className="h-4 w-4" /> View Details{" "}
      </Link>{" "}
    </motion.div>
  );
}
