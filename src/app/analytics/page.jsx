"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  MapPin,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import RevenueAreaChart from "@/components/charts/RevenueAreaChart";
import CustomerDonutChart from "@/components/charts/CustomerDonutChart";
import OrderingHeatmap from "@/components/charts/OrderingHeatmap";
import { getAnalyticsOverview } from "@/data/mockDataStore";
import { emptyRevenueTrend, mockCustomerBreakdown } from "@/data/analytics";

function Card({ children, className = "" }) {
  return (
    <section
      className={`rounded-xl border border-ink-200 bg-white p-5 shadow-xs ${className}`}
    >
      {children}
    </section>
  );
}

function CardTitle({ title, subtitle, action }) {
  return (
    <div className="mb-5 flex items-start justify-between gap-3">
      <div>
        <h2 className="text-[15px] font-semibold tracking-tight text-ink-900">
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-xs text-ink-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function Trend({ value, down = false }) {
  const Icon = down ? ArrowDownRight : ArrowUpRight;
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-md px-2 py-1 text-[11px] font-semibold ${down ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
        }`}
    >
      <Icon size={13} />
      {value}
    </span>
  );
}

function MetricCard({ label, value, trend = "0%", note, color = "#ff5a1f" }) {
  return (
    <Card className="relative min-h-36 overflow-hidden">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
          {label}
        </span>
        <Trend value={trend} />
      </div>
      <strong className="mt-4 block text-3xl font-bold tracking-tight text-ink-900">
        {value}
      </strong>
      <p className="mt-2 text-[11px] text-ink-400">{note}</p>
      <svg
        className="absolute bottom-4 right-4 opacity-80"
        width="78"
        height="28"
        viewBox="0 0 78 28"
        fill="none"
      >
        <path
          d="M1 23C10 21 11 15 20 17C28 19 29 9 38 12C46 15 48 6 56 8C65 10 67 2 77 4"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </Card>
  );
}

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalyticsOverview()
      .then((res) => setData(res))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const kpis = data?.kpis || {};
  const revenueTrend = data?.revenueTrend?.length ? data.revenueTrend : emptyRevenueTrend;

  const categoryBreakdown = data?.categoryBreakdown || [];
  const orderingHeatmap = data?.orderingHeatmap || [];

  const donutData = mockCustomerBreakdown;

  return (
    <div className="space-y-5">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-900">
            Analytics
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            Understand your business performance and discover trends from mock data.
          </p>
        </div>
        <div className="rounded-lg border border-ink-200 bg-white px-3 py-2 text-xs font-medium text-ink-500">
          Mock Data
        </div>
      </header>

      {loading ? (
        <div className="p-12 text-center text-ink-500">Loading live analytics...</div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Total Revenue"
              value={`$${kpis.totalRevenue || "0.00"}`}
              trend="12.5%"
              note={`Avg order value: $${kpis.averageOrderValue || "0.00"}`}
            />
            <MetricCard
              label="Total Orders"
              value={kpis.totalOrders ?? 0}
              trend="8.2%"
              note={`${kpis.pendingOrders ?? 0} pending orders`}
            />
            <MetricCard
              label="Active Products"
              value={kpis.activeProducts ?? 0}
              trend="14.1%"
              note={`Out of ${kpis.totalProducts ?? 0} total products`}
            />
            <MetricCard
              label="Active Locations"
              value={kpis.totalLocations ?? 0}
              trend="5.0%"
              note={`Across ${kpis.totalCategories ?? 0} categories`}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardTitle
                title="Revenue & Orders Trend"
                subtitle="Daily performance overview"
              />
              <div className="h-72 w-full">
                <RevenueAreaChart data={revenueTrend} />
              </div>
            </Card>

            <Card>
              <CardTitle
                title="Category Breakdown"
                subtitle="Product distribution across categories"
              />
              <div className="space-y-3 pt-2">
                {categoryBreakdown.map((cat, idx) => (
                  <div key={cat.name || idx} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-ink-800">{cat.name}</span>
                      <span className="text-xs text-ink-500">{cat.count} products ({cat.percentage}%)</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-orange-500 transition-all duration-300"
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(280px,360px)_minmax(0,1fr)]">
            <Card className="w-full">
              <CardTitle
                title="Customer Breakdown"
                subtitle="Returning versus new customers"
              />
              <CustomerDonutChart data={donutData} />
            </Card>
            <Card>
              <CardTitle
                title="Ordering Activity"
                subtitle="Orders by day and hour"
              />
              <OrderingHeatmap data={orderingHeatmap} />
            </Card>
          </div>
        </>
      )}
    </div>
  );
}