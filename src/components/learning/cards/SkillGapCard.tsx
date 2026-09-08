import React from "react";
import { motion } from "motion/react";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { SkillGap } from "../types";
import { ResourceCard } from "./ResourceCard";
interface SkillGapCardProps {
  gap: SkillGap;
}
export function SkillGapCard({ gap }: SkillGapCardProps) {
  const gapPercentage = Math.max(0, gap.requiredLevel - gap.currentLevel);
  const isHighPriority = gap.priority === "High";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      {" "}
      <div className="border-b border-slate-100 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-800/30">
        {" "}
        <div className="flex items-center justify-between mb-4">
          {" "}
          <div className="flex items-center gap-3">
            {" "}
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {gap.targetSkill}
            </h3>{" "}
            {isHighPriority && (
              <span className="flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
                {" "}
                <AlertTriangle className="h-3 w-3" /> Critical Gap{" "}
              </span>
            )}{" "}
          </div>{" "}
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {" "}
            Gap Size:{" "}
            <span className="text-slate-900 dark:text-white">
              {gapPercentage}%
            </span>{" "}
          </span>{" "}
        </div>{" "}
        <div className="flex items-center gap-4">
          {" "}
          <div className="flex-1">
            {" "}
            <div className="mb-1 flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
              {" "}
              <span>Current ({gap.currentLevel}%)</span>{" "}
            </div>{" "}
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              {" "}
              <div
                className="h-full bg-slate-400 dark:bg-slate-500"
                style={{ width: `${gap.currentLevel}%` }}
              />{" "}
            </div>{" "}
          </div>{" "}
          <ArrowRight className="h-5 w-5 text-slate-300 dark:text-slate-600 shrink-0" />{" "}
          <div className="flex-1">
            {" "}
            <div className="mb-1 flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
              {" "}
              <span>Required ({gap.requiredLevel}%)</span>{" "}
            </div>{" "}
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 relative">
              {" "}
              {/* Show the existing level + the gap required */}{" "}
              <div
                className="absolute left-0 top-0 h-full bg-[#0d1b2a] dark:bg-blue-500"
                style={{ width: `${gap.requiredLevel}%` }}
              />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="p-6">
        {" "}
        <h4 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
          Recommended Learning Path
        </h4>{" "}
        <div className="grid gap-4 grid-cols-1">
          {" "}
          {gap.relatedResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </motion.div>
  );
}
