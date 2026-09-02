"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Utensils, Bike, Clock, Package } from "lucide-react";
import RevenueAreaChart from "@/components/charts/RevenueAreaChart";
import { getAnalyticsOverview } from "@/data/mockDataStore";
import { emptyRevenueTrend } from "@/data/analytics";

export default function SalesDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalyticsOverview()
      .then((res) => setAnalytics(res))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const kpis = analytics?.kpis || {};
  const trend = analytics?.revenueTrend || [];

  const chartData = trend.length
    ? trend.map((t) => ({
      label: t.label || t.date,
      revenue: t.revenue || 0,
      orders: t.orders || 0,
    }))
    : emptyRevenueTrend;

  return (
    <div className="mb-5 grid grid-cols-1 gap-4 xl:grid-cols-[1.55fr_1fr]">
      {/* Sales Overview */}
      <section className="rounded-xl border border-ink-200 bg-white p-5 shadow-xs">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3 border-b border-ink-100 pb-3">
          <div>
            <h3 className="text-[15px] font-semibold text-ink-900">Sales Overview</h3>
            <p className="mt-0.5 text-xs text-ink-400">Real-time performance from database</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-md bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 border border-green-200">
            <TrendingUp size={13} />
            Mock Data
          </span>
        </div>

        <div className="mb-4 flex items-end justify-between">
          <div>
            <small className="text-xs text-ink-400">Total Revenue</small>
            <strong className="mt-1 block text-3xl font-bold tracking-tight text-ink-900">
              ${kpis.totalRevenue || "0.00"}
            </strong>
          </div>
          <span className="text-xs text-ink-400">
            Avg Order: <b className="text-ink-900">${kpis.averageOrderValue || "0.00"}</b>
          </span>
        </div>

        {loading ? (
          <div className="h-[220px] flex items-center justify-center text-xs text-ink-400">Loading chart...</div>
        ) : (
          <div className="h-[220px] w-full">
            <RevenueAreaChart data={chartData} />
          </div>
        )}
      </section>

      {/* Database Overview Snapshot */}
      <section className="rounded-xl border border-ink-200 bg-white p-5 shadow-xs">
        <div className="mb-4 border-b border-ink-100 pb-3">
          <h3 className="text-[15px] font-semibold text-ink-900">At a Glance</h3>
          <p className="mt-0.5 text-xs text-ink-400">Database quick summary</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-orange-100 text-orange-600">
                <Utensils size={16} />
              </span>
              <div>
                <strong className="block text-sm font-bold text-ink-900">{kpis.totalOrders || 0}</strong>
                <small className="text-xs text-ink-400">Total orders in DB</small>
              </div>
            </div>
            <span className="text-xs font-medium text-orange-600">Orders</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-100 text-blue-600">
                <Bike size={16} />
              </span>
              <div>
                <strong className="block text-sm font-bold text-ink-900">{kpis.pendingOrders || 0}</strong>
                <small className="text-xs text-ink-400">Pending & active orders</small>
              </div>
            </div>
            <span className="text-xs font-medium text-blue-600">Active</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-green-100 text-green-600">
                <Package size={16} />
              </span>
              <div>
                <strong className="block text-sm font-bold text-ink-900">{kpis.activeProducts || 0}</strong>
                <small className="text-xs text-ink-400">Active menu products</small>
              </div>
            </div>
            <span className="text-xs font-medium text-green-600">Available</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-purple-100 text-purple-600">
                <Clock size={16} />
              </span>
              <div>
                <strong className="block text-sm font-bold text-ink-900">{kpis.totalLocations || 0}</strong>
                <small className="text-xs text-ink-400">Operating restaurant locations</small>
              </div>
            </div>
            <span className="text-xs font-medium text-purple-600">Locations</span>
          </div>
        </div>
      </section>
    </div>
  );
}