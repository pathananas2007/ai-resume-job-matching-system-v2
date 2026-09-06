import React from "react";
import { motion } from "motion/react";
import { BookOpen, Trophy, Target } from "lucide-react";
import { DashboardGrid, KpiCard } from "../../analytics";
interface LearningHeaderProps {
  userName: string;
  recommendedCount: number;
  inProgressCount: number;
  completedCount: number;
}
export function LearningHeader({
  userName,
  recommendedCount,
  inProgressCount,
  completedCount,
}: LearningHeaderProps) {
  return (
    <div className="space-y-8">
      {" "}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        {" "}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {" "}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            {" "}
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {userName}
            </span>{" "}
          </h1>{" "}
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            {" "}
            Let's close those skill gaps and accelerate your career.{" "}
          </p>{" "}
        </motion.div>{" "}
      </div>{" "}
      <DashboardGrid columns={3}>
        {" "}
        <KpiCard
          title="Recommended Resources"
          value={recommendedCount}
          icon={<Target className="h-5 w-5" />}
          className="border-blue-100 bg-blue-50/50 dark:border-blue-900/30 dark:bg-blue-900/10"
        />{" "}
        <KpiCard
          title="In Progress"
          value={inProgressCount}
          icon={<BookOpen className="h-5 w-5" />}
        />{" "}
        <KpiCard
          title="Completed Learning"
          value={completedCount}
          icon={<Trophy className="h-5 w-5" />}
        />{" "}
      </DashboardGrid>{" "}
    </div>
  );
}
