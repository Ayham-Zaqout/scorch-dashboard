"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Utensils, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { getProducts, getOrders } from "@/data/mockDataStore";

export default function Performance() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProducts().catch(() => []), getOrders().catch(() => [])])
      .then(([prodsRes, ordersRes]) => {
        setProducts(Array.isArray(prodsRes) ? prodsRes : []);
        setOrders(Array.isArray(ordersRes) ? ordersRes : []);
      })
      .finally(() => setLoading(false));
  }, []);

  const bestSellers = products.slice(0, 5);

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 mb-5">
      {/* Best Selling Products */}
      <section className="rounded-xl border border-ink-200 bg-white p-5 shadow-xs">
        <div className="mb-4 flex items-center justify-between border-b border-ink-100 pb-3">
          <div>
            <h3 className="font-semibold text-ink-900">Featured Products</h3>
            <p className="text-xs text-ink-400">Top catalog items from database</p>
          </div>
          <Link href="/menu" className="text-xs font-semibold text-orange-600 hover:text-orange-700">
            View menu →
          </Link>
        </div>

        {loading ? (
          <div className="py-6 text-center text-xs text-ink-400">Loading featured items...</div>
        ) : (
          <div className="space-y-3">
            {bestSellers.map((product, idx) => (
              <div key={product.id} className="flex items-center gap-3 border-b border-ink-100 pb-3 last:border-0 last:pb-0">
                <span className="text-xs font-bold text-ink-400 w-5">#{idx + 1}</span>
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-orange-50 text-orange-600">
                  <Utensils size={14} />
                </span>
                <div className="min-w-0 flex-1">
                  <strong className="block text-xs font-semibold text-ink-900">{product.name}</strong>
                  <p className="text-[11px] text-ink-400">{product.category?.name || "Product"}</p>
                </div>
                <b className="text-sm font-semibold text-ink-900">${Number(product.basePrice || product.price || 0).toFixed(2)}</b>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recent Activity */}
      <section className="rounded-xl border border-ink-200 bg-white p-5 shadow-xs">
        <div className="mb-4 flex items-center justify-between border-b border-ink-100 pb-3">
          <div>
            <h3 className="font-semibold text-ink-900">Recent Order Activity</h3>
            <p className="text-xs text-ink-400">Live order status stream</p>
          </div>
        </div>

        {loading ? (
          <div className="py-6 text-center text-xs text-ink-400">Loading activity...</div>
        ) : !orders.length ? (
          <div className="py-6 text-center text-xs text-ink-400">No recent activity</div>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 4).map((order) => {
              let Icon = Clock;
              let toneClass = "bg-blue-50 text-blue-600";
              if (order.status === "COMPLETED") {
                Icon = CheckCircle;
                toneClass = "bg-green-50 text-green-600";
              } else if (order.status === "CANCELLED") {
                Icon = AlertCircle;
                toneClass = "bg-red-50 text-red-600";
              }

              return (
                <div key={order.id} className="flex items-start gap-3 border-b border-ink-100 pb-3 last:border-0 last:pb-0">
                  <span className={`mt-0.5 grid h-7 w-7 place-items-center rounded-lg ${toneClass}`}>
                    <Icon size={14} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <strong className="block text-xs font-semibold text-ink-900">
                      Order {order.orderNumber} - {order.status}
                    </strong>
                    <p className="text-[11px] text-ink-400">
                      {order.customerName} • Total ${Number(order.totalAmount || 0).toFixed(2)}
                    </p>
                  </div>
                  <small className="text-[11px] text-ink-400">
                    {order.createdAt ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now"}
                  </small>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}