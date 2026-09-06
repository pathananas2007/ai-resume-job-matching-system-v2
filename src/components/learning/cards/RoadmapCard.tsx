import React from "react";
import { motion } from "motion/react";
import { Map, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { LearningRoadmapCategory } from "../types";
interface RoadmapCardProps {
  category: LearningRoadmapCategory;
}
export function RoadmapCard({ category }: RoadmapCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md dark:bg-slate-900"
    >
      {" "}
      {/* Top color border indicator */}{" "}
      <div
        className="h-1.5 w-full"
        style={{ backgroundColor: category.color }}
      />{" "}
      <div className="flex flex-1 flex-col p-6">
        {" "}
        <div className="mb-4 flex items-start justify-between gap-3">
          {" "}
          <div className="flex items-start gap-3">
            {" "}
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
              style={{
                backgroundColor: `${category.color}15`,
                color: category.color,
              }}
            >
              {" "}
              <Map className="h-5 w-5" />{" "}
            </div>{" "}
            <h3 className="text-lg font-bold leading-tight text-slate-900 dark:text-white">
              {" "}
              {category.name}{" "}
            </h3>{" "}
          </div>{" "}
          {category.difficulty && (
            <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {" "}
              {category.difficulty}{" "}
            </span>
          )}{" "}
        </div>{" "}
        <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
          {" "}
          {category.description}{" "}
        </p>{" "}
        {typeof category.progress === "number" && (
          <div className="mb-6 space-y-1.5">
            {" "}
            <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
              {" "}
              <span>Progress</span> <span>{category.progress}%</span>{" "}
            </div>{" "}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              {" "}
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  backgroundColor: category.color,
                  width: `${category.progress}%`,
                }}
              />{" "}
            </div>{" "}
          </div>
        )}{" "}
        <div className="space-y-3 flex-1">
          {" "}
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500">
            {" "}
            Required Skills{" "}
          </h4>{" "}
          <div className="flex flex-wrap gap-2">
            {" "}
            {category.skills.slice(0, 4).map((skill, idx) => (
              <span
                key={idx}
                className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300"
              >
                {" "}
                {skill}{" "}
              </span>
            ))}{" "}
            {category.skills.length > 4 && (
              <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800">
                {" "}
                +{category.skills.length - 4} more{" "}
              </span>
            )}{" "}
          </div>{" "}
        </div>{" "}
        <Link
          to={`/seeker/learning/roadmap/${category.id}`}
          className="mt-6 flex items-center font-medium text-blue-600 transition-colors group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300 w-fit"
        >
          {" "}
          <span className="text-sm text-inherit">View full roadmap</span>{" "}
          <ChevronRight className="ml-1 h-4 w-4" />{" "}
        </Link>{" "}
      </div>{" "}
    </motion.div>
  );
}
