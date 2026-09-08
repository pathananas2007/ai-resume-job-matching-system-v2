import React from "react";
import { SectionContainer } from "../layout/SectionContainer";
import { RoadmapCard } from "../cards/RoadmapCard";
import { Map } from "lucide-react";
import { LearningRoadmapCategory } from "../types";
interface RoadmapsTabProps {
  roadmaps: LearningRoadmapCategory[];
}
export function RoadmapsTab({ roadmaps }: RoadmapsTabProps) {
  return (
    <div className="animate-in fade-in duration-500">
      {" "}
      <SectionContainer
        title="Career Roadmaps"
        description="Structured learning paths to achieve your career goals."
      >
        {" "}
        {roadmaps.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-center">
            {" "}
            <div className="mb-4 rounded-full bg-slate-100 p-4 dark:bg-slate-800">
              {" "}
              <Map className="h-8 w-8 text-slate-400 dark:text-slate-500" />{" "}
            </div>{" "}
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              No Roadmaps Available
            </h3>{" "}
            <p className="text-slate-500 dark:text-slate-400 max-w-sm">
              {" "}
              We couldn't find any career roadmaps at the moment. Please check
              back later.{" "}
            </p>{" "}
          </div>
        ) : (
          <>
            {" "}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {" "}
              {roadmaps.map((roadmap) => (
                <RoadmapCard key={roadmap.id} category={roadmap} />
              ))}{" "}
            </div>{" "}
            <div className="mt-8 flex justify-center">
              {" "}
              <button className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                {" "}
                View All Roadmaps{" "}
              </button>{" "}
            </div>{" "}
          </>
        )}{" "}
      </SectionContainer>{" "}
    </div>
  );
}
