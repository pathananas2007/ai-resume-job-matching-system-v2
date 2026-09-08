import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { BaseChart } from "./BaseChart";
import { CustomTooltip } from "./CustomTooltip";
import { ChartProps, defaultColors } from "../types";
export function PieChartCard({
  data,
  dataKeys,
  colors = defaultColors,
  showLegend = true,
  showTooltip = true,
  ...baseProps
}: ChartProps) {
  /* Pie chart typically uses the first dataKey to determine the value to map */ const dataKey =
    dataKeys[0]?.key || "value";
  const nameKey = dataKeys[0]?.name || "name";
  return (
    <BaseChart {...baseProps}>
      {" "}
      <ResponsiveContainer width="100%" height="100%">
        {" "}
        <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          {" "}
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey={dataKey}
            nameKey={nameKey}
            stroke="none"
          >
            {" "}
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}{" "}
          </Pie>{" "}
          {showTooltip && <Tooltip content={<CustomTooltip />} />}{" "}
          {showLegend && (
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: "12px", color: "#64748B" }}
            />
          )}{" "}
        </PieChart>{" "}
      </ResponsiveContainer>{" "}
    </BaseChart>
  );
}
