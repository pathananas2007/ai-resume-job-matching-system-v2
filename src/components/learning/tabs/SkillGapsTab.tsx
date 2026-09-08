import React from "react";
import { SectionContainer } from "../layout/SectionContainer";
import { SkillGapCard } from "../cards/SkillGapCard";
import { SkillGap } from "../types";
import { ArrowDown, CheckCircle } from "lucide-react";
interface SkillGapsTabProps {
  skillGaps: SkillGap[];
}
export function SkillGapsTab({ skillGaps }: SkillGapsTabProps) {
  return (
    <div className="animate-in fade-in duration-500 space-y-12">
      {" "}
      <SectionContainer
        title="Skill Gap to Learning Flow"
        description="How your resume analysis connects to learning recommendations."
      >
        {" "}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
          {" "}
          <div className="bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-700 rounded-lg px-6 py-4 w-full max-w-sm">
            {" "}
            <h4 className="font-medium text-slate-500 dark:text-slate-400 text-sm mb-1">
              Step 1
            </h4>{" "}
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Current Skills Identified
            </h3>{" "}
            <p className="text-sm text-slate-500 mt-2">
              From your uploaded resume
            </p>{" "}
          </div>{" "}
          <ArrowDown className="h-6 w-6 text-slate-400 my-4" />{" "}
          <div className="bg-white dark:bg-slate-900 shadow-sm border border-amber-200 dark:border-amber-900/50 rounded-lg px-6 py-4 w-full max-w-sm">
            {" "}
            <h4 className="font-medium text-amber-600 dark:text-amber-500 text-sm mb-1">
              Step 2
            </h4>{" "}
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Missing Skills Detected
            </h3>{" "}
            <p className="text-sm text-slate-500 mt-2">
              Compared against target roles
            </p>{" "}
          </div>{" "}
          <ArrowDown className="h-6 w-6 text-slate-400 my-4" />{" "}
          <div className="bg-white dark:bg-slate-900 shadow-sm border border-blue-200 dark:border-blue-900/50 rounded-lg px-6 py-4 w-full max-w-sm">
            {" "}
            <h4 className="font-medium text-[#1e3a8a] dark:text-blue-500 text-sm mb-1">
              Step 3
            </h4>{" "}
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Recommended Resources
            </h3>{" "}
            <p className="text-sm text-slate-500 mt-2">
              Personalized learning paths
            </p>{" "}
          </div>{" "}
          <ArrowDown className="h-6 w-6 text-slate-400 my-4" />{" "}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md rounded-lg px-6 py-4 w-full max-w-sm text-white">
            {" "}
            <h4 className="font-medium text-blue-100 text-sm mb-1">
              Goal
            </h4>{" "}
            <h3 className="font-semibold">Target Career Path</h3>{" "}
            <p className="text-sm text-blue-100 mt-2">
              Achieve your dream role
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </SectionContainer>{" "}
      <SectionContainer
        title="Your Skill Gaps"
        description="Prioritized learning areas based on your analysis."
      >
        {" "}
        {skillGaps.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-dashed border-emerald-200 dark:border-emerald-800/50 text-center">
            {" "}
            <div className="mb-4 rounded-full bg-emerald-100 p-4 dark:bg-emerald-800/50">
              {" "}
              <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />{" "}
            </div>{" "}
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              No Skill Gaps Detected!
            </h3>{" "}
            <p className="text-slate-500 dark:text-slate-400 max-w-sm">
              {" "}
              Your resume aligns perfectly with your target roles. Keep learning
              to stay ahead.{" "}
            </p>{" "}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {" "}
            {skillGaps.map((gap) => (
              <SkillGapCard key={gap.id} gap={gap} />
            ))}{" "}
          </div>
        )}{" "}
      </SectionContainer>{" "}
    </div>
  );
}
