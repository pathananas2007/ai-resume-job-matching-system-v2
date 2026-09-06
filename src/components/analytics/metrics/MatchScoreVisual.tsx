import React from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { BaseChart } from "../charts/BaseChart";
import { CustomTooltip } from "../charts/CustomTooltip";
import { MatchScoreProps } from "../types";
export function MatchScoreVisual({
  title = "Match Analysis",
  description = "Overall compatibility score",
  candidateMatch,
  jobMatch,
  skillMatch,
  ...baseProps
}: MatchScoreProps) {
  const data = [
    { name: "Skill Match", value: skillMatch, fill: "#8B5CF6" },
    /* Purple */ { name: "Job Match", value: jobMatch, fill: "#06B6D4" },
    /* Cyan */ {
      name: "Overall Match",
      value: candidateMatch,
      fill: "#2563EB",
    } /* Blue */,
  ];
  /* Calculate average for display */ const averageMatch = Math.round(
    (candidateMatch + jobMatch + skillMatch) / 3,
  );
  return (
    <BaseChart title={title} description={description} {...baseProps}>
      {" "}
      <div className="relative h-full w-full flex items-center justify-center">
        {" "}
        <ResponsiveContainer width="100%" height="100%">
          {" "}
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="30%"
            outerRadius="100%"
            barSize={15}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            {" "}
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />{" "}
            <RadialBar
              background={{ fill: "#f1f5f9", className: "dark:fill-slate-800" }}
              dataKey="value"
              cornerRadius={10}
            />{" "}
            <Tooltip
              content={<CustomTooltip valueSuffix="%" />}
              cursor={{ fill: "transparent" }}
            />{" "}
          </RadialBarChart>{" "}
        </ResponsiveContainer>{" "}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {" "}
          <span className="text-3xl font-bold text-slate-900 dark:text-white">
            {averageMatch}%
          </span>{" "}
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Avg Match
          </span>{" "}
        </div>{" "}
      </div>{" "}
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {" "}
        {data.reverse().map((item) => (
          <div key={item.name} className="flex flex-col items-center">
            {" "}
            <div
              className="h-3 w-3 rounded-full mb-1"
              style={{ backgroundColor: item.fill }}
            />{" "}
            <span className="text-xs font-medium text-slate-900 dark:text-white">
              {item.value}%
            </span>{" "}
            <span className="text-[10px] text-slate-500 dark:text-slate-400">
              {item.name}
            </span>{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </BaseChart>
  );
}
