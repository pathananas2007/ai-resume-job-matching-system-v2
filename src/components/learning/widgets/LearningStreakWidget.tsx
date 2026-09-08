import React from "react";
import { Flame } from "lucide-react";
export function LearningStreakWidget() {
  return (
    <div className="rounded-xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-4 shadow-sm dark:border-orange-900/30 dark:from-orange-950/30 dark:to-slate-900">
      {" "}
      <div className="flex items-center justify-between mb-3">
        {" "}
        <div className="flex items-center gap-2">
          {" "}
          <Flame className="h-5 w-5 text-orange-500" fill="currentColor" />{" "}
          <h3 className="font-bold text-slate-900 dark:text-white">
            Learning Streak
          </h3>{" "}
        </div>{" "}
      </div>{" "}
      <div className="flex items-end justify-between">
        {" "}
        <div>
          {" "}
          <span className="text-2xl font-black text-orange-600 dark:text-orange-500">
            7
          </span>{" "}
          <span className="ml-1 text-sm font-medium text-slate-600 dark:text-slate-400">
            Days
          </span>{" "}
        </div>{" "}
        <div className="text-right">
          {" "}
          <span className="block text-sm font-bold text-slate-700 dark:text-slate-300">
            12 Hours
          </span>{" "}
          <span className="text-xs font-medium text-slate-500 dark:text-slate-500">
            This Week
          </span>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
