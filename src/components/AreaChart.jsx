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
        <div className="area-chart-wrap" style={{ height }}>
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
                                <div className="chart-tooltip">
                                    <div className="tt-label">
                                        {label}
                                    </div>

                                    <div
                                        className="tt-value"
                                        style={{ color }}
                                    >
                                        {yFormat(current?.value ?? 0)}
                                    </div>

                                    {previous && (
                                        <div className="tt-compare">
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
            className="sparkline"
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
        <div className="donut-visual">
            <div className="donut-chart">
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

                <div className="donut-hole">
                    <strong>{centerValue}</strong>
                    <small>{centerLabel}</small>
                </div>
            </div>

            <div className="donut-legend">
                {slices.map((slice) => (
                    <div key={slice.label}>
                        <span>
                            <i
                                style={{
                                    background: colorVar(slice.color),
                                }}
                            />
                            {slice.label}
                        </span>

                        <b>
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
        <div className="bar-list">
            {items.map((item) => (
                <div
                    className="bar-list-item"
                    key={item.name}
                >
                    <div className="bar-list-head">
                        <span>{item.name}</span>

                        <div>
                            <b>{item.value}</b>

                            {item.sub && (
                                <small>{item.sub}</small>
                            )}
                        </div>
                    </div>

                    <div className="bar-list-track">
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
        <div className="heatmap-wrap">
            <div className="heatmap-days">
                {days.map((day) => (
                    <span key={day}>{day}</span>
                ))}
            </div>

            <div className="heatmap-body">
                <div className="heatmap-cells">
                    {data.map((row, dayIndex) =>
                        row.map((level, hourIndex) => (
                            <div
                                key={`${dayIndex}-${hourIndex}`}
                                className="heatmap-cell"
                                style={{
                                    background: levels[level],
                                }}
                                title={`${days[dayIndex]} · ${hours[hourIndex]}`}
                            />
                        ))
                    )}
                </div>

                <div className="heatmap-hours">
                    {hours.map((hour, index) => (
                        <span
                            key={hour}
                            className={index % 2 === 0 ? 'show' : ''}
                        >
                            {hour}
                        </span>
                    ))}
                </div>
            </div>

            <div className="heatmap-legend">
                <span>Less</span>

                {levels.map((color, index) => (
                    <i
                        key={index}
                        style={{ background: color }}
                    />
                ))}

                <span>More</span>
            </div>
        </div>
    );
}