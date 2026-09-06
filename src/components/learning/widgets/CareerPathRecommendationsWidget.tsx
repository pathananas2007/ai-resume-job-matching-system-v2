import React from "react";
import { SectionContainer } from "../layout/SectionContainer";
import { TrendingUp } from "lucide-react";
import { CareerPath } from "../types";
interface CareerPathRecommendationsWidgetProps {
  careers: CareerPath[];
}
export function CareerPathRecommendationsWidget({
  careers,
}: CareerPathRecommendationsWidgetProps) {
  return (
    <SectionContainer
      title="Recommended Career Paths"
      className="bg-white border border-slate-200 shadow-sm dark:bg-slate-900 dark:border-slate-800"
    >
      {" "}
      <div className="space-y-4">
        {" "}
        {careers.map((career) => (
          <div
            key={career.id}
            className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50"
          >
            {" "}
            <div>
              {" "}
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {career.title}
              </p>{" "}
              <div className="flex items-center gap-1.5 mt-1">
                {" "}
                <TrendingUp
                  className="h-3.5 w-3.5"
                  style={{ color: "#2563EB" }}
                />{" "}
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {" "}
                  {career.matchScore}% Match{" "}
                </span>{" "}
              </div>{" "}
            </div>{" "}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              {" "}
              <span className="text-xs font-bold">
                {career.matchScore}%
              </span>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </SectionContainer>
  );
}
