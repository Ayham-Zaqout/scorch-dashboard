"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function CustomerDonutChart({ data }) {
  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={54}
            outerRadius={76}
            paddingAngle={3}
            stroke="none"
          >
            {data.map((item) => (
              <Cell key={item.name} fill={item.color} />
            ))}
          </Pie>
          <Tooltip />
          <text
            x="50%"
            y="47%"
            textAnchor="middle"
            className="fill-ink-900 text-xl font-bold"
          >
            68%
          </text>
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            className="fill-ink-400 text-[11px]"
          >
            returning
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
