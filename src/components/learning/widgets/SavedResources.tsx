import React from "react";
import { motion } from "motion/react";
import { Bookmark, ExternalLink } from "lucide-react";
import { Resource } from "../types";
interface SavedResourcesProps {
  resources: Resource[];
}
export function SavedResources({ resources }: SavedResourcesProps) {
  if (resources.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-6 text-center">
        {" "}
        <Bookmark className="mb-3 h-8 w-8 text-slate-300 dark:text-slate-600" />{" "}
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          No saved resources yet
        </p>{" "}
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          Bookmark courses to access them later
        </p>{" "}
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {" "}
      {resources.map((resource, index) => (
        <motion.div
          key={resource.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-all hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700"
        >
          {" "}
          <div className="flex-1 overflow-hidden pr-4">
            {" "}
            <h4 className="truncate text-sm font-medium text-slate-900 dark:text-white">
              {" "}
              {resource.title}{" "}
            </h4>{" "}
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              {" "}
              {resource.provider} ΓÇó {resource.type}{" "}
            </p>{" "}
          </div>{" "}
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-50 text-slate-400 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600 dark:bg-slate-800 dark:text-slate-500 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-400"
          >
            {" "}
            <ExternalLink className="h-4 w-4" />{" "}
          </a>{" "}
        </motion.div>
      ))}{" "}
    </div>
  );
}
