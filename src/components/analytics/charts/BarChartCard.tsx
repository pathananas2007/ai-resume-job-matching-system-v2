import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { BaseChart } from "./BaseChart";
import { CustomTooltip } from "./CustomTooltip";
import { ChartProps, defaultColors } from "../types";
export function BarChartCard({
  data,
  dataKeys,
  xAxisKey = "name",
  colors = defaultColors,
  showLegend = true,
  showTooltip = true,
  ...baseProps
}: ChartProps) {
  return (
    <BaseChart {...baseProps}>
      {" "}
      <ResponsiveContainer width="100%" height="100%">
        {" "}
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          {" "}
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E2E8F0"
            className="dark:stroke-slate-800"
          />{" "}
          <XAxis
            dataKey={xAxisKey}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748B", fontSize: 12 }}
            dy={10}
          />{" "}
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748B", fontSize: 12 }}
          />{" "}
          {showTooltip && (
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />
          )}{" "}
          {showLegend && (
            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: "12px", color: "#64748B" }}
            />
          )}{" "}
          {dataKeys.map((dk, index) => (
            <Bar
              key={dk.key}
              dataKey={dk.key}
              name={dk.name || dk.key}
              fill={dk.color || colors[index % colors.length]}
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          ))}{" "}
        </BarChart>{" "}
      </ResponsiveContainer>{" "}
    </BaseChart>
  );
}
