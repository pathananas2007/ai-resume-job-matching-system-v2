import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { BaseChart } from "./BaseChart";
import { CustomTooltip } from "./CustomTooltip";
import { ChartProps, defaultColors } from "../types";
export function RadarChartCard({
  data,
  dataKeys,
  xAxisKey = "subject",
  /* Typical for radar charts */ colors = defaultColors,
  showLegend = true,
  showTooltip = true,
  ...baseProps
}: ChartProps) {
  return (
    <BaseChart {...baseProps}>
      {" "}
      <ResponsiveContainer width="100%" height="100%">
        {" "}
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          {" "}
          <PolarGrid stroke="#E2E8F0" className="dark:stroke-slate-800" />{" "}
          <PolarAngleAxis
            dataKey={xAxisKey}
            tick={{ fill: "#64748B", fontSize: 12 }}
          />{" "}
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: "#94A3B8", fontSize: 10 }}
            axisLine={false}
          />{" "}
          {showTooltip && <Tooltip content={<CustomTooltip />} />}{" "}
          {showLegend && (
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: "12px", color: "#64748B" }}
            />
          )}{" "}
          {dataKeys.map((dk, index) => {
            const color = dk.color || colors[index % colors.length];
            return (
              <Radar
                key={dk.key}
                name={dk.name || dk.key}
                dataKey={dk.key}
                stroke={color}
                fill={color}
                fillOpacity={0.4}
              />
            );
          })}{" "}
        </RadarChart>{" "}
      </ResponsiveContainer>{" "}
    </BaseChart>
  );
}
