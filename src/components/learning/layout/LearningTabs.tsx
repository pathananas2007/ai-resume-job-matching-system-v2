import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
export type TabId = "discover" | "roadmaps" | "skill-gaps" | "saved";
interface Tab {
  id: TabId;
  label: string;
}
const TABS: Tab[] = [
  { id: "discover", label: "Discover" },
  { id: "roadmaps", label: "Roadmaps" },
  { id: "skill-gaps", label: "Skill Gaps" },
  { id: "saved", label: "Saved" },
];
interface LearningTabsProps {
  activeTab: TabId;
  onChange: (tabId: TabId) => void;
}
export function LearningTabs({ activeTab, onChange }: LearningTabsProps) {
  return (
    <div className="border-b border-slate-200 dark:border-slate-800">
      {" "}
      <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
        {" "}
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={twMerge(
                clsx(
                  "relative whitespace-nowrap py-4 px-1 text-sm font-medium transition-colors",
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300",
                ),
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {" "}
              {tab.label}{" "}
              {isActive && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}{" "}
            </button>
          );
        })}{" "}
      </nav>{" "}
    </div>
  );
}
