"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Receipt,
  Store,
  XCircle,
} from "lucide-react";

import { getOrderById, trackOrderByNumber, updateOrderStatus } from "@/data/mockDataStore";

const UI_STATUS_LABELS = {
  PENDING: "Received",
  CONFIRMED: "Confirmed",
  PREPARING: "Cooking",
  READY: "Ready",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const STATUS_STYLE = {
  PENDING: "border-info-200 bg-info-50 text-info-600",
  CONFIRMED: "border-warning-200 bg-warning-50 text-warning-700",
  PREPARING: "border-info-200 bg-info-50 text-info-600",
  READY: "border-brand-200 bg-brand-50 text-brand-600",
  COMPLETED: "border-success-200 bg-success-50 text-success-700",
  CANCELLED: "border-danger-200 bg-danger-50 text-danger-600",
};

const NEXT_STATUS = {
  PENDING: "CONFIRMED",
  CONFIRMED: "PREPARING",
  PREPARING: "READY",
  READY: "COMPLETED",
};

const TIMELINE_STATUSES = ["PENDING", "CONFIRMED", "PREPARING", "READY", "COMPLETED"];

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default function OrderDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const identifier = decodeURIComponent(id || "");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchOrder = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      let data = null;
      if (UUID_REGEX.test(identifier)) {
        data = await getOrderById(identifier);
      }
      if (!data) {
        // Fallback: allow opening by order number too (e.g. SCR-12345)
        data = await trackOrderByNumber(identifier);
      }
      setOrder(data);
    } catch (e) {
      setOrder(null);
      setError(e?.response?.data?.message || "Failed to load this order.");
    } finally {
      setLoading(false);
    }
  }, [identifier]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const advanceStatus = async () => {
    const next = NEXT_STATUS[order?.status];
    if (!next) return;
    try {
      setUpdating(true);
      const updated = await updateOrderStatus(order.id, next);
      setOrder(updated);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to update the order status.");
    } finally {
      setUpdating(false);
    }
  };

  const cancelOrder = async () => {
    try {
      setUpdating(true);
      const updated = await updateOrderStatus(order.id, "CANCELLED");
      setOrder(updated);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to cancel the order.");
    } finally {
      setUpdating(false);
    }
  };

  const nextStatus = order ? NEXT_STATUS[order.status] : null;
  const timelineIndex = order ? TIMELINE_STATUSES.indexOf(order.status) : -1;

  if (loading) {
    return (
      <div className="space-y-6">
        <button onClick={() => router.push("/orders")} className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-ink-500 hover:text-ink-900"><ArrowLeft size={17} /> Back to orders</button>
        <p className="text-sm text-ink-500">Loading order…</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="space-y-6">
        <button onClick={() => router.push("/orders")} className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-ink-500 hover:text-ink-900"><ArrowLeft size={17} /> Back to orders</button>
        <div className="rounded-xl border border-danger-200 bg-danger-50 p-5 text-sm text-danger-600">
          {error || "Order not found."}
        </div>
      </div>
    );
  }

  const deliveryAddress = order.deliveryAddressSnapshot
    ? [order.deliveryAddressSnapshot.street, order.deliveryAddressSnapshot.building, order.deliveryAddressSnapshot.city]
      .filter(Boolean)
      .join(", ")
    : null;

  return <div className="space-y-6">
    <button onClick={() => router.push("/orders")} className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-ink-500 hover:text-ink-900"><ArrowLeft size={17} /> Back to orders</button>
    {error && <div className="rounded-lg border border-warning-200 bg-warning-50 px-4 py-3 text-sm text-warning-700">{error}</div>}
    <header className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-ink-900">{order.orderNumber}</h1>
          <span className={`inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs font-medium ${STATUS_STYLE[order.status] || "border-ink-200 bg-ink-50 text-ink-600"}`}>
            <i className="h-2 w-2 rounded-full bg-current" />
            {UI_STATUS_LABELS[order.status] || order.status}
          </span>
        </div>
        <p className="mt-2 text-sm text-ink-500">Placed {new Date(order.createdAt).toLocaleString()}</p>
      </div>
      <div className="flex items-center gap-2">
        {order.status === "CANCELLED" ? (
          <span className="inline-flex h-10 items-center gap-2 rounded-lg border border-danger-200 bg-danger-50 px-4 text-sm font-medium text-danger-600"><XCircle size={16} /> Cancelled</span>
        ) : order.status !== "COMPLETED" && nextStatus ? (
          <>
            <button
              onClick={cancelOrder}
              disabled={updating}
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-danger-200 bg-white px-4 text-sm font-medium text-danger-600 hover:bg-danger-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={advanceStatus}
              disabled={updating}
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50"
            >
              {updating ? "Updating…" : `Advance to ${UI_STATUS_LABELS[nextStatus]}`}
            </button>
          </>
        ) : (
          <span className="inline-flex h-10 items-center gap-2 rounded-lg border border-success-200 bg-success-50 px-4 text-sm font-medium text-success-700"><CheckCircle2 size={16} /> Completed</span>
        )}
      </div>
    </header>


    {/* Status timeline */}
    <section className="rounded-xl border border-ink-200 bg-white p-5 shadow-xs">
      <h2 className="mb-4 font-semibold text-ink-900">Status timeline</h2>
      <div className="flex flex-wrap items-center gap-y-3">
        {TIMELINE_STATUSES.map((status, idx) => {
          const done = timelineIndex >= idx;
          const isCurrent = timelineIndex === idx;
          return (
            <div key={status} className="flex items-center">
              <span
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold ${done ? "border-brand-500 bg-brand-500 text-white" : "border-ink-200 bg-white text-ink-400"
                  } ${isCurrent ? "ring-2 ring-brand-500/30" : ""}`}
              >
                {done ? "✓" : idx + 1}
              </span>
              <span className={`ml-2 text-xs font-medium ${done ? "text-ink-900" : "text-ink-400"}`}>
                {UI_STATUS_LABELS[status]}
              </span>
              {idx < TIMELINE_STATUSES.length - 1 && (
                <span className={`mx-3 h-0.5 w-8 sm:w-14 ${timelineIndex > idx ? "bg-brand-500" : "bg-ink-200"}`} />
              )}
            </div>
          );
        })}
      </div>
    </section>

    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <section className="overflow-hidden rounded-xl border border-ink-200 bg-white shadow-xs">
          <div className="border-b border-ink-100 px-5 py-4">
            <h2 className="font-semibold text-ink-900">Order items</h2>
            <p className="mt-1 text-sm text-ink-500">{order.items?.length || 0} items in this order</p>
          </div>
          {(order.items || []).map((item) => (
            <div key={item.id} className="flex items-start gap-4 border-b border-ink-100 px-5 py-4 last:border-0">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-sm font-semibold text-brand-600">{item.quantity}x</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-ink-900">{item.productName}</p>
                {item.selectedOptions?.length > 0 && (
                  <p className="mt-1 text-xs text-ink-500">
                    {item.selectedOptions.map((o) => `${o.name}${Number(o.priceModifier) ? ` (+$${Number(o.priceModifier).toFixed(2)})` : ""}`).join(" · ")}
                  </p>
                )}
                {item.specialInstructions && <p className="mt-1 text-xs italic text-ink-400">&quot;{item.specialInstructions}&quot;</p>}
              </div>
              <b className="text-sm text-ink-900">${Number(item.lineTotal).toFixed(2)}</b>
            </div>
          ))}
        </section>

        <section className="rounded-xl border border-ink-200 bg-white p-5 shadow-xs">
          <h2 className="mb-4 flex items-center gap-2 font-semibold text-ink-900"><Receipt size={17} className="text-ink-400" /> Price breakdown</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-ink-500"><span>Subtotal</span><span className="text-ink-900">${Number(order.subtotal).toFixed(2)}</span></div>
            <div className="flex justify-between text-ink-500"><span>Delivery fee</span><span className="text-ink-900">${Number(order.deliveryFee).toFixed(2)}</span></div>
            <div className="flex justify-between text-ink-500"><span>Tax</span><span className="text-ink-900">${Number(order.taxAmount).toFixed(2)}</span></div>
            <div className="flex justify-between border-t border-ink-100 pt-3 text-base font-semibold text-ink-900"><span>Total</span><span>${Number(order.totalAmount).toFixed(2)}</span></div>
          </div>
        </section>
      </div>

      <aside className="space-y-4">
        <section className="rounded-xl border border-ink-200 bg-white p-5 shadow-xs">
          <h2 className="mb-4 font-semibold text-ink-900">Customer</h2>
          <p className="font-medium text-ink-900">{order.customerName}</p>
          <p className="mt-3 flex items-center gap-2 text-sm text-ink-600"><Phone size={16} className="text-ink-400" />{order.customerPhone}</p>
          <p className="mt-2 flex items-center gap-2 break-all text-sm text-ink-600"><Receipt size={16} className="text-ink-400" />{order.customerEmail}</p>
        </section>

        <section className="rounded-xl border border-ink-200 bg-white p-5 shadow-xs">
          <h2 className="mb-4 font-semibold text-ink-900">Fulfillment</h2>
          <p className="flex items-center gap-2 text-sm text-ink-600">
            {order.fulfillmentType === "DELIVERY" ? <MapPin size={16} className="text-ink-400" /> : <Store size={16} className="text-ink-400" />}
            {order.fulfillmentType === "DELIVERY" ? "Delivery" : "Pickup"}
          </p>
          {deliveryAddress && <p className="mt-2 text-sm text-ink-600">Address: {deliveryAddress}</p>}
          {order.location && (
            <p className="mt-2 text-sm text-ink-600">
              Location: {order.location.name}, {order.location.addressLine}, {order.location.city}
            </p>
          )}
          {order.estimatedMinutes != null && (
            <p className="mt-2 flex items-center gap-2 text-sm text-ink-600"><Clock size={16} className="text-ink-400" />ETA: {order.estimatedMinutes} min</p>
          )}
          {order.notes && <p className="mt-3 rounded-lg bg-ink-50 p-3 text-xs text-ink-600">Notes: {order.notes}</p>}
        </section>
      </aside>
    </div>
  </div>;
}
