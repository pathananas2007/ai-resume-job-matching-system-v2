import React from "react";
import { useNotificationStore } from "../useNotificationStore";
import { NotificationFilter } from "../types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const filters: { label: string; value: NotificationFilter }[] = [
  { label: "All", value: "all" },
  { label: "Unread", value: "unread" },
  { label: "Resume", value: "resume" },
  { label: "Applications", value: "application" },
  { label: "Learning", value: "learning" },
  { label: "Jobs", value: "job" },
  { label: "System", value: "system" },
];
export function NotificationFilters() {
  const currentFilter = useNotificationStore((state) => state.filter);
  const setFilter = useNotificationStore((state) => state.setFilter);
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {" "}
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => setFilter(filter.value)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            currentFilter === filter.value
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
              : "bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700",
          )}
        >
          {" "}
          {filter.label}{" "}
        </button>
      ))}{" "}
    </div>
  );
}
