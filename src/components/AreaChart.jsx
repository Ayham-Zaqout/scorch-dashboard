'use client';

import {
    AreaChart as RechartsAreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
} from 'recharts';

const ORANGE = '#ff5a1f';
const BLUE = '#3981f7';
const GREEN = '#19b985';
const AMBER = '#f0a826';
const RED = '#ef5d54';

const COLORS = {
    orange: ORANGE,
    blue: BLUE,
    green: GREEN,
    amber: AMBER,
    red: RED,
};

function colorVar(color) {
    return COLORS[color] ?? color;
}

// ---------------- Area Chart ----------------

export function AreaChart({
    data,
    compare,
    color = ORANGE,
    height = 220,
    xLabels,
    yFormat = (value) => `$${Math.round(value / 1000)}k`,
    showX = true,
}) {
    const chartData = data.map((value, index) => ({
        label: xLabels?.[index] ?? index,
        value,
        compare: compare?.[index],
    }));

    return (
        <div className="w-full" style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
                <RechartsAreaChart
                    data={chartData}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: showX ? 0 : 10,
                    }}
                >
                    <defs>
                        <linearGradient
                            id="areaGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor={color}
                                stopOpacity={0.16}
                            />
                            <stop
                                offset="100%"
                                stopColor={color}
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        vertical={false}
                        stroke="#f0f2f4"
                    />

                    <XAxis
                        dataKey="label"
                        hide={!showX}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        width={45}
                        tickFormatter={yFormat}
                    />

                    <Tooltip
                        content={({ active, payload, label }) => {
                            if (!active || !payload?.length) {
                                return null;
                            }

                            const current = payload.find(
                                (item) => item.dataKey === 'value'
                            );

                            const previous = payload.find(
                                (item) => item.dataKey === 'compare'
                            );

                            return (
                                <div className="rounded-lg bg-ink-900 px-3 py-2 text-white shadow-lg">
                                    <div className="text-xs text-white/70">
                                        {label}
                                    </div>

                                    <div
                                        className="text-sm font-bold"
                                        style={{ color }}
                                    >
                                        {yFormat(current?.value ?? 0)}
                                    </div>

                                    {previous && (
                                        <div className="mt-0.5 text-xs text-white/60">
                                            Prev: {yFormat(previous.value)}
                                        </div>
                                    )}
                                </div>
                            );
                        }}
                    />

                    {compare && (
                        <Line
                            type="monotone"
                            dataKey="compare"
                            stroke="#cdd4dc"
                            strokeWidth={1.2}
                            strokeDasharray="3 2"
                            dot={false}
                        />
                    )}

                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        strokeWidth={2}
                        fill="url(#areaGradient)"
                        dot={false}
                        activeDot={{
                            r: 4,
                            stroke: '#fff',
                            strokeWidth: 2,
                        }}
                    />
                </RechartsAreaChart>
            </ResponsiveContainer>
        </div>
    );
}

// ---------------- Sparkline ----------------

export function Sparkline({
    data,
    color = ORANGE,
    width = 80,
    height = 30,
}) {
    const chartData = data.map((value, index) => ({
        index,
        value,
    }));

    return (
        <div
            className="shrink-0"
            style={{ width, height }}
        >
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        strokeWidth={2}
                        dot={false}
                        activeDot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

// ---------------- Donut ----------------

export function Donut({
    slices,
    centerLabel,
    centerValue,
}) {
    const data = slices.map((slice) => ({
        ...slice,
        color: colorVar(slice.color),
    }));

    return (
        <div className="flex items-center gap-5">
            <div className="relative h-32 w-32 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="label"
                            innerRadius="68%"
                            outerRadius="92%"
                            paddingAngle={2}
                            stroke="none"
                        >
                            {data.map((slice) => (
                                <Cell
                                    key={slice.label}
                                    fill={slice.color}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 grid place-items-center text-center">
                    <div><strong className="block text-lg text-ink-900">{centerValue}</strong><small className="text-xs text-ink-500">{centerLabel}</small></div>
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-2">
                {slices.map((slice) => (
                    <div key={slice.label} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-ink-600">
                            <i
                                style={{
                                    background: colorVar(slice.color),
                                }}
                                className="h-2 w-2 rounded-full" />
                            {slice.label}
                        </span>

                        <b className="text-ink-900">
                            {slice.count ?? slice.value}
                        </b>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ---------------- Horizontal Bars ----------------

export function BarList({ items }) {
    return (
        <div className="space-y-4">
            {items.map((item) => (
                <div
                    className="space-y-2"
                    key={item.name}
                >
                    <div className="flex items-center justify-between text-sm text-ink-600">
                        <span>{item.name}</span>

                        <div className="flex items-center gap-2"><b className="text-ink-900">{item.value}</b>

                            {item.sub && (
                                <small className="text-xs text-ink-400">{item.sub}</small>
                            )}
                        </div>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded bg-ink-100">
                        <i
                            style={{
                                width: `${item.pct}%`,
                                background: colorVar(item.color),
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

// ---------------- Heatmap ----------------

export function Heatmap({
    data,
    hours,
    days,
}) {
    const levels = [
        '#fff0eb',
        '#ffe1d5',
        '#ffc4ad',
        '#ff9a78',
        '#ff7650',
        '#ff5a1f',
    ];

    return (
        <div className="overflow-x-auto"><div className="min-w-[520px]">
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-ink-500">
                {days.map((day) => (
                    <span key={day}>{day}</span>
                ))}
            </div>

            <div className="mt-2">
                <div className="grid grid-cols-7 gap-1">
                    {data.map((row, dayIndex) =>
                        row.map((level, hourIndex) => (
                            <div
                                key={`${dayIndex}-${hourIndex}`}
                                className="aspect-square min-h-5 rounded-sm"
                                style={{
                                    background: levels[level],
                                }}
                                title={`${days[dayIndex]} · ${hours[hourIndex]}`}
                            />
                        ))
                    )}
                </div>

            </div>
            <div className="mt-3 flex items-center justify-end gap-1 text-xs text-ink-500">
                <span>Less</span>

                {levels.map((color, index) => (
                    <i className="h-3 w-3 rounded-sm"
                        key={index}
                        style={{ background: color }}
                    />
                ))}

                <span>More</span>
            </div></div></div>
    );
}
