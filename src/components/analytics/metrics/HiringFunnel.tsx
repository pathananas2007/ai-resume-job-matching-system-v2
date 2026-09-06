import React from "react";
import { motion } from "motion/react";
import { BaseChart } from "../charts/BaseChart";
import { HiringFunnelProps, defaultColors } from "../types";
export function HiringFunnel({
  data,
  title = "Hiring Funnel",
  description = "Conversion tracking across stages",
  ...baseProps
}: HiringFunnelProps) {
  /* Calculate max value for relative widths */ const maxValue = Math.max(
    ...data.map((d) => d.value),
  );
  return (
    <BaseChart title={title} description={description} {...baseProps}>
      {" "}
      <div className="flex h-full flex-col justify-center gap-4 py-4">
        {" "}
        {data.map((stage, index) => {
          /* If percentage is provided, use it, otherwise calculate from max value */ const widthPercent =
            stage.percentage !== undefined
              ? stage.percentage
              : (stage.value / maxValue) * 100;
          const color =
            stage.color || defaultColors[index % defaultColors.length];
          return (
            <div key={stage.name} className="flex items-center gap-4">
              {" "}
              <div className="w-24 shrink-0 text-right">
                {" "}
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {" "}
                  {stage.name}{" "}
                </span>{" "}
              </div>{" "}
              <div className="relative flex-1 h-8 bg-slate-100 dark:bg-slate-800 rounded-r-md rounded-l-sm overflow-hidden flex items-center group">
                {" "}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${widthPercent}%` }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="absolute left-0 top-0 h-full rounded-r-md rounded-l-sm"
                  style={{ backgroundColor: color, opacity: 0.8 }}
                />{" "}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  className="relative z-10 pl-3 font-semibold text-slate-900 dark:text-white"
                >
                  {" "}
                  {stage.value}{" "}
                </motion.div>{" "}
                {/* Custom Tooltip on Hover */}{" "}
                <div className="absolute right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10 text-xs font-medium bg-black/50 text-white px-2 py-1 rounded backdrop-blur-sm">
                  {" "}
                  {Math.round(widthPercent)}% conversion{" "}
                </div>{" "}
              </div>{" "}
            </div>
          );
        })}{" "}
      </div>{" "}
    </BaseChart>
  );
}
