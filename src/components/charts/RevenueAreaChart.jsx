"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export default function RevenueAreaChart({ data }) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: -18, right: 4, top: 5 }}>
          <defs>
            <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ff5a1f" stopOpacity=".24" />
              <stop offset="100%" stopColor="#ff5a1f" stopOpacity="0" />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#f0f2f4" />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#8a939e" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#8a939e" }}
            tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
          />
          <Area
            type="monotone"
            dataKey="previous"
            stroke="#cbd5e1"
            strokeWidth={2}
            strokeDasharray="5 4"
            fill="none"
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#ff5a1f"
            strokeWidth={2.5}
            fill="url(#revenueFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
