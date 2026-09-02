"use client";

import { useEffect, useState } from "react";
import { Utensils, Bike, Package } from "lucide-react";
import { getOrders, getProducts } from "@/data/mockDataStore";

export default function Kitchen() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getOrders().catch(() => []), getProducts().catch(() => [])])
      .then(([ordersRes, prodsRes]) => {
        setOrders(Array.isArray(ordersRes) ? ordersRes : []);
        setProducts(Array.isArray(prodsRes) ? prodsRes : []);
      })
      .finally(() => setLoading(false));
  }, []);

  const kitchenOrders = orders.filter(
    (o) => o.status === "PREPARING" || o.status === "CONFIRMED" || o.status === "PENDING"
  );
  const deliveryOrders = orders.filter(
    (o) => o.fulfillmentType === "DELIVERY" && o.status !== "CANCELLED"
  );

  const availableProducts = products.filter((p) => p.isAvailable);

  return (
    <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* Kitchen Queue */}
      <section className="rounded-xl border border-ink-200 bg-white p-5 shadow-xs">
        <div className="mb-4 flex items-start justify-between gap-3 border-b border-ink-100 pb-3">
          <div>
            <h3 className="text-[15px] font-semibold text-ink-900">Kitchen Queue</h3>
            <p className="mt-0.5 text-xs text-ink-400">Orders being prepared</p>
          </div>
          <span className="rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
            {kitchenOrders.length} active
          </span>
        </div>

        {loading ? (
          <div className="py-6 text-center text-xs text-ink-400">Loading queue...</div>
        ) : !kitchenOrders.length ? (
          <div className="py-6 text-center text-xs text-ink-400">No active kitchen orders</div>
        ) : (
          <div className="space-y-3">
            {kitchenOrders.slice(0, 4).map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-3 border-b border-ink-100 pb-3 last:border-0 last:pb-0"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-orange-50 text-orange-600">
                  <Utensils size={15} />
                </span>
                <div className="min-w-0 flex-1">
                  <strong className="block text-xs font-semibold text-ink-900">{order.orderNumber}</strong>
                  <small className="mt-0.5 block text-[11px] text-ink-400">
                    {order.customerName} ({order.fulfillmentType})
                  </small>
                </div>
                <b className="text-xs font-semibold text-ink-700">{order.estimatedMinutes || 20}m</b>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Delivery Queue */}
      <section className="rounded-xl border border-ink-200 bg-white p-5 shadow-xs">
        <div className="mb-4 flex items-start justify-between gap-3 border-b border-ink-100 pb-3">
          <div>
            <h3 className="text-[15px] font-semibold text-ink-900">Delivery & Pickup</h3>
            <p className="mt-0.5 text-xs text-ink-400">Fulfillment activity</p>
          </div>
          <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 border border-blue-200">
            {deliveryOrders.length} orders
          </span>
        </div>

        {loading ? (
          <div className="py-6 text-center text-xs text-ink-400">Loading delivery queue...</div>
        ) : !deliveryOrders.length ? (
          <div className="py-6 text-center text-xs text-ink-400">No delivery orders</div>
        ) : (
          <div className="space-y-3">
            {deliveryOrders.slice(0, 4).map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-3 border-b border-ink-100 pb-3 last:border-0 last:pb-0"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-blue-600">
                  <Bike size={15} />
                </span>
                <div className="min-w-0 flex-1">
                  <strong className="block text-xs font-semibold text-ink-900">{order.orderNumber}</strong>
                  <small className="mt-0.5 block text-[11px] text-ink-400">
                    {order.deliveryAddressSnapshot?.address || order.location?.name || "Standard Delivery"}
                  </small>
                </div>
                <b className="text-xs font-semibold text-ink-700">${Number(order.totalAmount || 0).toFixed(2)}</b>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Inventory & Products Overview */}
      <section className="rounded-xl border border-ink-200 bg-white p-5 shadow-xs">
        <div className="mb-4 flex items-start justify-between gap-3 border-b border-ink-100 pb-3">
          <div>
            <h3 className="text-[15px] font-semibold text-ink-900">Menu Availability</h3>
            <p className="mt-0.5 text-xs text-ink-400">Active product inventory</p>
          </div>
          <span className="rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-700 border border-green-200">
            {availableProducts.length} ready
          </span>
        </div>

        {loading ? (
          <div className="py-6 text-center text-xs text-ink-400">Loading products...</div>
        ) : (
          <div className="space-y-3">
            {products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 border-b border-ink-100 pb-3 last:border-0 last:pb-0"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-gray-100 text-gray-600">
                  <Package size={15} />
                </span>
                <div className="min-w-0 flex-1">
                  <strong className="block text-xs font-semibold text-ink-900">{product.name}</strong>
                  <small className="mt-0.5 block text-[11px] text-ink-400">
                    {product.category?.name || "Category"}
                  </small>
                </div>
                <span
                  className={`rounded px-2 py-0.5 text-[11px] font-medium ${product.isAvailable ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                    }`}
                >
                  {product.isAvailable ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}