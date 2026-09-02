"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getOrders } from "@/data/mockDataStore";

const statusTone = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200",
  PREPARING: "bg-orange-50 text-orange-700 border-orange-200",
  READY: "bg-purple-50 text-purple-700 border-purple-200",
  COMPLETED: "bg-green-50 text-green-700 border-green-200",
  CANCELLED: "bg-red-50 text-red-700 border-red-200",
};

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    getOrders()
      .then((res) => {
        setOrders(Array.isArray(res) ? res.slice(0, 5) : []);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <section className="overflow-hidden rounded-xl border border-ink-200 bg-white p-5 shadow-xs">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-ink-900">Recent Orders</h3>
          <p className="mt-1 text-sm text-ink-500">Latest orders from the dashboard</p>
        </div>
        <Link href="/orders" className="text-sm font-semibold text-orange-600 hover:text-orange-700">
          View all →
        </Link>
      </div>

      {loading ? (
        <div className="p-8 text-center text-sm text-ink-400">Loading recent orders...</div>
      ) : !orders.length ? (
        <div className="p-8 text-center text-sm text-ink-400">No orders found</div>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[680px]">
            <div className="grid grid-cols-[1.7fr_.7fr_.6fr_.9fr_.7fr_.9fr] border-b border-ink-100 pb-3 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
              <span>Customer</span>
              <span>Order #</span>
              <span>Items</span>
              <span>Date</span>
              <span>Total</span>
              <span>Status</span>
            </div>
            {orders.map((o) => {
              const initials = o.customerName
                ? o.customerName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
                : "CU";
              const itemCount = o.items?.length || 1;
              const formattedDate = o.createdAt
                ? new Date(o.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                : "Today";

              return (
                <div
                  key={o.id}
                  className="grid grid-cols-[1.7fr_.7fr_.6fr_.9fr_.7fr_.9fr] items-center border-b border-ink-100 py-3 text-sm text-ink-500 last:border-0 hover:bg-gray-50/50"
                >
                  <span className="flex items-center gap-2.5 font-medium text-ink-900">
                    <i className="grid h-8 w-8 place-items-center rounded-full bg-orange-50 text-[11px] font-bold text-orange-600 not-italic">
                      {initials}
                    </i>
                    <div>
                      <p className="text-sm font-medium text-ink-900">{o.customerName || "Customer"}</p>
                      <p className="text-xs text-ink-400">{o.fulfillmentType || "PICKUP"}</p>
                    </div>
                  </span>
                  <code className="text-xs font-mono font-semibold text-ink-700">{o.orderNumber}</code>
                  <span>{itemCount} items</span>
                  <span>{formattedDate}</span>
                  <b className="text-ink-900">${Number(o.totalAmount || 0).toFixed(2)}</b>
                  <span
                    className={`w-fit rounded-md border px-2.5 py-1 text-xs font-semibold ${statusTone[o.status] || "bg-gray-50 text-gray-700 border-gray-200"
                      }`}
                  >
                    {o.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}