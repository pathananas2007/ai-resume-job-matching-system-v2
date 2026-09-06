import React from "react";
import { motion } from "motion/react";
import { Target, ArrowRight, Activity, Beaker } from "lucide-react";
interface PersonalizedBannerProps {
  careerGoal: string;
  missingSkills: string[];
  learningFocus: string;
  onViewRoadmap: () => void;
  onViewSkillGaps: () => void;
  isDemoData?: boolean;
}
export function PersonalizedBanner({
  careerGoal,
  missingSkills,
  learningFocus,
  onViewRoadmap,
  onViewSkillGaps,
  isDemoData = true,
}: PersonalizedBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg mb-8"
    >
      {" "}
      <div className="absolute top-0 right-0 p-8 opacity-10">
        {" "}
        <Target className="h-48 w-48" />{" "}
      </div>{" "}
      <div className="relative z-10 p-6 md:p-8">
        {" "}
        <div className="flex items-center gap-3 mb-6">
          {" "}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-medium backdrop-blur-sm">
            {" "}
            <span>≡ƒÄ» Personalized Learning Plan</span>{" "}
          </div>{" "}
          <span className="text-blue-100 text-sm">
            Based on your Resume Analysis
          </span>{" "}
          {isDemoData && (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 px-2.5 py-0.5 text-xs font-semibold text-amber-200">
              {" "}
              <Beaker className="h-3 w-3" /> Demo Data{" "}
            </div>
          )}{" "}
        </div>{" "}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {" "}
          <div>
            {" "}
            <p className="text-blue-200 text-sm font-medium mb-1">
              Target Career Path
            </p>{" "}
            <p className="text-xl font-bold">{careerGoal}</p>{" "}
          </div>{" "}
          <div>
            {" "}
            <p className="text-blue-200 text-sm font-medium mb-2">
              Top Missing Skills
            </p>{" "}
            <div className="flex flex-wrap gap-2">
              {" "}
              {missingSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium border border-white/20"
                >
                  {" "}
                  {skill}{" "}
                </span>
              ))}{" "}
            </div>{" "}
          </div>{" "}
          <div>
            {" "}
            <p className="text-blue-200 text-sm font-medium mb-1">
              Recommended Learning Focus
            </p>{" "}
            <p className="text-base font-semibold">{learningFocus}</p>{" "}
          </div>{" "}
        </div>{" "}
        <div className="flex flex-wrap items-center gap-4">
          {" "}
          <button
            onClick={onViewRoadmap}
            className="group flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-blue-600 transition-all hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
          >
            {" "}
            <Target className="h-4 w-4" /> View Roadmap{" "}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />{" "}
          </button>{" "}
          <button
            onClick={onViewSkillGaps}
            className="group flex items-center justify-center gap-2 rounded-lg bg-white/10 border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/20 focus:outline-none"
          >
            {" "}
            <Activity className="h-4 w-4" /> View Skill Gaps{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </motion.div>
  );
}
