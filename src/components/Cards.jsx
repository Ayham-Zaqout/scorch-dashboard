"use client";

import { useEffect, useState } from "react";
import KpiCard from "@/components/KpiCard";
import { dashboardKpis as fallbackKpis, kpiCards } from "@/data/dashboardKpis";
import { getAnalyticsOverview } from "@/data/mockDataStore";

export default function Cards() {
  const [kpisData, setKpisData] = useState(fallbackKpis);

  useEffect(() => {
    getAnalyticsOverview()
      .then((res) => {
        if (res && res.kpis) {
          setKpisData({
            revenue: {
              today: `$${res.kpis.totalRevenue}`,
              yesterday: "$0",
              trend: { value: "+100%", negative: false },
              target: 5000,
              current: Number(res.kpis.totalRevenue) || 0,
            },
            activeOrders: {
              total: res.kpis.totalOrders || 0,
              trend: { value: "+100%", negative: false },
              statuses: [
                { label: "Pending", value: res.kpis.pendingOrders || 0, color: "bg-orange-500" },
                { label: "Active Prods", value: res.kpis.activeProducts || 0, color: "bg-blue-500" },
                { label: "Locations", value: res.kpis.totalLocations || 0, color: "bg-green-500" },
              ],
            },
            kitchen: {
              queue: res.kpis.pendingOrders || 0,
              avgPrep: "8m 30s",
              target: "15m",
              onTarget: true,
              progress: 85,
            },
            lowStock: {
              count: 0,
              critical: "All items available",
              severity: "ok",
            },
          });
        }
      })
      .catch(() => { });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 mb-5 font-sans sm:grid-cols-2 xl:grid-cols-4">
      {kpiCards.map((type) => (
        <KpiCard key={type} type={type} data={kpisData} />
      ))}
    </div>
  );
}