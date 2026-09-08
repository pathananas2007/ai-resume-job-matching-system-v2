import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}
export function CustomTooltip({
  active,
  payload,
  label,
  valuePrefix = "",
  valueSuffix = "",
}: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900">
        {" "}
        {label && (
          <p className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-400">
            {label}
          </p>
        )}{" "}
        <div className="space-y-1">
          {" "}
          {payload.map((entry, index) => (
            <div
              key={`tooltip-item-${index}`}
              className="flex items-center justify-between gap-4"
            >
              {" "}
              <div className="flex items-center gap-2">
                {" "}
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />{" "}
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  {" "}
                  {entry.name}{" "}
                </span>{" "}
              </div>{" "}
              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                {" "}
                {valuePrefix}
                {entry.value}
                {valueSuffix}{" "}
              </span>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>
    );
  }
  return null;
}
