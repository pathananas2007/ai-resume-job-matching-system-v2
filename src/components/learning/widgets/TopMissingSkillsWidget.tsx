import React from "react";
import { SectionContainer } from "../layout/SectionContainer";
import { ArrowRight, Target } from "lucide-react";
import { Link } from "react-router-dom";
interface TopMissingSkillsWidgetProps {
  skills: string[];
}
export function TopMissingSkillsWidget({
  skills,
}: TopMissingSkillsWidgetProps) {
  return (
    <SectionContainer
      title="Top Missing Skills"
      className="bg-white border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800"
    >
      {" "}
      <div className="space-y-4">
        {" "}
        <ul className="space-y-3">
          {" "}
          {skills.map((skill, index) => (
            <li key={index} className="flex items-start gap-3">
              {" "}
              <div className="flex shrink-0 mt-0.5">
                {" "}
                <Target className="h-5 w-5" style={{ color: "#F59E0B" }} />{" "}
              </div>{" "}
              <div className="flex-1">
                {" "}
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {skill}
                </p>{" "}
              </div>{" "}
            </li>
          ))}{" "}
        </ul>{" "}
        <Link
          to="/seeker/skills"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-50 border border-slate-200 px-4 py-2 text-sm font-medium text-[#1e3a8a] transition-colors hover:bg-blue-50 dark:bg-slate-800 dark:border-slate-700 dark:text-blue-400 dark:hover:bg-slate-700"
        >
          {" "}
          View Full Analysis <ArrowRight className="h-4 w-4" />{" "}
        </Link>{" "}
      </div>{" "}
    </SectionContainer>
  );
}
