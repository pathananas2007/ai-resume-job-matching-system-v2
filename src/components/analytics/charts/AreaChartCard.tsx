import React from "react";
import {
  AreaChart,
  Area,
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
export function AreaChartCard({
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
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          {" "}
          <defs>
            {" "}
            {dataKeys.map((dk, index) => {
              const color = dk.color || colors[index % colors.length];
              return (
                <linearGradient
                  key={`gradient-${dk.key}`}
                  id={`color-${dk.key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  {" "}
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />{" "}
                  <stop offset="95%" stopColor={color} stopOpacity={0} />{" "}
                </linearGradient>
              );
            })}{" "}
          </defs>{" "}
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
          {showTooltip && <Tooltip content={<CustomTooltip />} />}{" "}
          {showLegend && (
            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: "12px", color: "#64748B" }}
            />
          )}{" "}
          {dataKeys.map((dk, index) => {
            const color = dk.color || colors[index % colors.length];
            return (
              <Area
                key={dk.key}
                type="monotone"
                dataKey={dk.key}
                name={dk.name || dk.key}
                stroke={color}
                fillOpacity={1}
                fill={`url(#color-${dk.key})`}
                strokeWidth={2}
              />
            );
          })}{" "}
        </AreaChart>{" "}
      </ResponsiveContainer>{" "}
    </BaseChart>
  );
}
