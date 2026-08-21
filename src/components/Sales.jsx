'use client';

import { useState } from 'react';
import { Bike, Clock3, TrendingUp, Utensils } from 'lucide-react';

import { AreaChart } from '@/components/AreaChart';

const METRICS = {
    revenue: {
        color: '#ff5a1f',
        formatValue: (value) => `$${Math.round(value / 1000)}k`,
        total: '$24,468',
    },
    orders: {
        color: '#3981f7',
        formatValue: (value) => value,
        total: '700',
    },
    aov: {
        color: '#19b985',
        formatValue: (value) => `$${value}`,
        total: '$34.95',
    },
};

const METRIC_OPTIONS = [
    { label: 'Revenue', value: 'revenue' },
    { label: 'Orders', value: 'orders' },
    { label: 'AOV', value: 'aov' },
];

const PERIOD_OPTIONS = [
    { label: 'Today', value: 'today' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
];

const CHART_DATA = [1200, 1800, 1500, 2400, 2100, 2800, 3200];
const CHART_LABELS = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM'];
const PERIOD_LABELS = { today: 'Today', week: 'This week', month: 'This month' };

export default function SalesDashboard() {
    const [metric, setMetric] = useState('revenue');
    const [period, setPeriod] = useState('today');
    const selectedMetric = METRICS[metric];

    return (
        <main>

            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h1>Dashboard</h1>
                    <p>Today&apos;s performance overview</p>
                </div>

            </div>

            {/* Sales */}
            <div className="sales-split">

                {/* Sales Overview */}
                <section className="card card-padded sales-card">

                    <div className="card-header">
                        <div>
                            <h3>Sales Overview</h3>
                            <p>Today&apos;s performance in real time</p>
                        </div>

                        <div className="chart-controls">

                            <div className="seg-toggle">
                                {METRIC_OPTIONS.map((option) => (
                                    <button
                                        key={option.value}
                                        className={
                                            metric === option.value
                                                ? 'selected'
                                                : ''
                                        }
                                        onClick={() =>
                                            setMetric(option.value)
                                        }
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>

                            <div className="seg-toggle">
                                {PERIOD_OPTIONS.map((option) => (
                                    <button
                                        key={option.value}
                                        className={
                                            period === option.value
                                                ? 'selected'
                                                : ''
                                        }
                                        onClick={() =>
                                            setPeriod(option.value)
                                        }
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>

                        </div>
                    </div>

                    <div className="sales-summary">
                        <div>
                            <small>
                                {PERIOD_LABELS[period]} total
                            </small>

                            <strong
                                style={{
                                    color: selectedMetric.color,
                                }}
                            >
                                {selectedMetric.total}
                            </strong>
                        </div>

                        <span className="trend-badge">
                            <TrendingUp size={12} />
                            +14.2%
                        </span>
                    </div>

                    <AreaChart
                        data={CHART_DATA}
                        color={selectedMetric.color}
                        xLabels={CHART_LABELS}
                        yFormat={selectedMetric.formatValue}
                        height={220}
                    />

                </section>

                {/* Today at a Glance */}
                <section className="card card-padded sales-side">

                    <div className="card-header">
                        <div>
                            <h3>Today at a Glance</h3>
                            <p>Quick snapshot</p>
                        </div>
                    </div>

                    <div className="glance-list">

                        <div className="glance-row">
                            <span className="glance-icon orange">
                                <Utensils size={14} />
                            </span>

                            <div>
                                <strong>142</strong>
                                <small>orders today</small>
                            </div>

                            <span className="trend-badge">
                                <TrendingUp size={12} />
                                +12%
                            </span>
                        </div>

                        <div className="glance-row">
                            <span className="glance-icon blue">
                                <Bike size={14} />
                            </span>

                            <div>
                                <strong>38</strong>
                                <small>deliveries out</small>
                            </div>

                            <span className="trend-badge">
                                <TrendingUp size={12} />
                                +5%
                            </span>
                        </div>

                        <div className="glance-row">
                            <span className="glance-icon green">
                                <Clock3 size={14} />
                            </span>

                            <div>
                                <strong>6m 20s</strong>
                                <small>avg prep time</small>
                            </div>

                            <span className="pill pill-success">
                                ● On target
                            </span>
                        </div>

                        <div className="glance-row">
                            <span className="glance-icon red">
                                <Utensils size={14} />
                            </span>

                            <div>
                                <strong>4</strong>
                                <small>low stock items</small>
                            </div>

                            <span className="pill pill-danger">
                                ● Urgent
                            </span>
                        </div>

                    </div>
                </section>

            </div>
        </main>
    );
}
