import React from "react";
import { SectionContainer } from "../layout/SectionContainer";
import { BookOpen } from "lucide-react";
interface LearningProgressProps {
  completed: number;
  inProgress: number;
  planned: number;
}
export function LearningProgress({
  completed,
  inProgress,
  planned,
}: LearningProgressProps) {
  const total = completed + inProgress + planned;
  const completedPercent =
    total > 0 ? Math.round((completed / total) * 100) : 0;
  const inProgressPercent =
    total > 0 ? Math.round((inProgress / total) * 100) : 0;
  return (
    <SectionContainer
      title="Learning Progress"
      className="bg-white border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800"
    >
      {" "}
      <div className="space-y-4">
        {" "}
        <div className="flex items-center gap-3 mb-2">
          {" "}
          <div className="flex shrink-0">
            {" "}
            <BookOpen className="h-5 w-5" style={{ color: "#22C55E" }} />{" "}
          </div>{" "}
          <div>
            {" "}
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {" "}
              {completedPercent}%{" "}
            </div>{" "}
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {" "}
              Overall Completion{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="flex h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          {" "}
          <div
            className="bg-[#22C55E]"
            style={{ width: `${completedPercent}%` }}
          />{" "}
          <div
            className="bg-blue-400"
            style={{ width: `${inProgressPercent}%` }}
          />{" "}
        </div>{" "}
        <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
          {" "}
          <div>
            {" "}
            <div className="font-semibold text-slate-900 dark:text-white">
              {completed}
            </div>{" "}
            <div className="text-slate-500 dark:text-slate-400">
              Completed
            </div>{" "}
          </div>{" "}
          <div>
            {" "}
            <div className="font-semibold text-slate-900 dark:text-white">
              {inProgress}
            </div>{" "}
            <div className="text-slate-500 dark:text-slate-400">
              In Progress
            </div>{" "}
          </div>{" "}
          <div>
            {" "}
            <div className="font-semibold text-slate-900 dark:text-white">
              {planned}
            </div>{" "}
            <div className="text-slate-500 dark:text-slate-400">
              Planned
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </SectionContainer>
  );
}
