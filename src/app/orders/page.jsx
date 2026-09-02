"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { getOrders, updateOrderStatus } from "@/data/mockDataStore";

const statusMapToUI = {
  PENDING: "Received",
  CONFIRMED: "Preparing",
  PREPARING: "Cooking",
  READY: "Ready",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const statusStyle = {
  Ready: "border-brand-200 bg-brand-50 text-brand-600",
  Preparing: "border-warning-200 bg-warning-50 text-warning-700",
  Received: "border-info-200 bg-info-50 text-info-600",
  Cooking: "border-info-200 bg-info-50 text-info-600",
  Cancelled: "border-danger-200 bg-danger-50 text-danger-600",
  Completed: "border-success-200 bg-success-50 text-success-700",
};

function FilterDropdown({ icon: Icon, value, options, onChange, ariaLabel }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function closeOnOutsideClick(event) {
      if (!dropdownRef.current?.contains(event.target)) setOpen(false);
    }

    function closeOnEscape(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-lg border border-ink-200 bg-white px-3 text-sm font-medium text-ink-700 outline-none transition hover:bg-ink-50 focus:border-brand-300 focus:ring-2 focus:ring-brand-500/10"
      >
        {Icon && <Icon size={18} className="text-ink-600" />}
        <span>{value}</span>
        <ChevronDown
          size={17}
          className={`ml-1 text-ink-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 min-w-full overflow-hidden rounded-lg border border-ink-200 bg-white p-1 shadow-lg">
          <div role="listbox" aria-label={ariaLabel} className="max-h-64 overflow-y-auto">
            {options.map((option) => {
              const selected = option === value;
              return (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors ${selected ? "bg-brand-50 font-medium text-brand-700" : "text-ink-700 hover:bg-ink-50"}`}
                >
                  {option}
                  {selected && <span className="text-brand-600">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  const router = useRouter();
  const [ordersList, setOrdersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [type, setType] = useState("All types");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      const formatted = (Array.isArray(data) ? data : []).map((o) => ({
        key: o.id,
        id: o.orderNumber || o.id,
        rawId: o.id,
        customer: o.customerName || "Guest",
        items: o.items?.length || 1,
        type: o.fulfillmentType === "DELIVERY" ? "Delivery" : "Pickup",
        total: `$${Number(o.totalAmount || 0).toFixed(2)}`,
        status: statusMapToUI[o.status] || "Received",
        rawStatus: o.status,
        time: new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }));
      setOrdersList(formatted);
    } catch (e) {
      // API error handle
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    const query = search.toLowerCase().trim();
    return ordersList.filter((order) => {
      const matchesSearch =
        !query ||
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query);
      return (
        matchesSearch &&
        (status === "All statuses" || order.status === status) &&
        (type === "All types" || order.type === type)
      );
    });
  }, [search, status, type, ordersList]);


  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const activePage = Math.min(page, totalPages);
  const pageOrders = filteredOrders.slice(
    (activePage - 1) * pageSize,
    activePage * pageSize,
  );

  function resetPage(callback) {
    callback();
    setPage(1);
  }

  return (
    <div className="space-y-7">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-900">
            Orders
          </h1>
          <p className="mt-2 text-sm text-ink-500">
            Manage and track all customer orders.
          </p>
        </div>
        <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-ink-200 bg-white px-4 text-sm font-medium text-ink-700 shadow-xs transition hover:bg-ink-50">
          <Download size={18} />
          Export
        </button>
      </header>

      <section>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search
              size={19}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
            />
            <input
              value={search}
              onChange={(event) =>
                resetPage(() => setSearch(event.target.value))
              }
              placeholder="Search orders..."
              className="h-11 w-full rounded-lg border border-ink-200 bg-white py-2 pl-10 pr-9 text-sm text-ink-800 outline-none placeholder:text-ink-400 focus:border-brand-300 focus:ring-2 focus:ring-brand-500/10"
            />
            {search && (
              <button
                onClick={() => resetPage(() => setSearch(""))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <FilterDropdown
            icon={SlidersHorizontal}
            value={status}
            ariaLabel="Filter orders by status"
            options={[
              "All statuses",
              "Received",
              "Preparing",
              "Cooking",
              "Ready",
              "Completed",
              "Cancelled",
            ]}
            onChange={(value) =>
              resetPage(() => setStatus(value))
            }
          />

          <FilterDropdown
            value={type}
            ariaLabel="Filter orders by type"
            options={["All types", "Delivery", "Pickup", "Dine-In"]}
            onChange={(value) => resetPage(() => setType(value))}
          />
          <p className="ml-auto text-sm text-ink-500">
            <b className="font-semibold text-ink-900">
              {filteredOrders.length}
            </b>{" "}
            orders
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-ink-200 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="border-b border-ink-200 bg-white">
                <tr className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                  <th className="px-5 py-5">Order Number</th>
                  <th className="px-5 py-5">Customer</th>
                  <th className="px-5 py-5">Items</th>
                  <th className="px-5 py-5">Type</th>
                  <th className="px-5 py-5">Total</th>
                  <th className="px-5 py-5">Status</th>
                  <th className="px-5 py-5">Time</th>
                  <th className="px-5 py-5" />
                </tr>
              </thead>
              <tbody>
                {pageOrders.map((order) => (
                  <tr
                    key={order.key}
                    onClick={() => router.push(`/orders/${encodeURIComponent(order.rawId || order.id)}`)}
                    className="cursor-pointer border-b border-ink-100 last:border-0 transition-colors hover:bg-ink-50/60"
                  >
                    <td className="px-5 py-5 text-sm font-semibold text-ink-900">
                      {order.id}
                    </td>
                    <td className="px-5 py-5 text-sm text-ink-700">
                      {order.customer}
                    </td>
                    <td className="px-5 py-5 text-sm text-ink-500">
                      {order.items} items
                    </td>
                    <td className="px-5 py-5 text-sm text-ink-700">
                      {order.type}
                    </td>
                    <td className="px-5 py-5 text-sm font-semibold text-ink-900">
                      {order.total}
                    </td>
                    <td className="px-5 py-5">
                      <span
                        className={`inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs font-medium ${statusStyle[order.status]}`}
                      >
                        <i className="h-2 w-2 rounded-full bg-current" />
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-5 text-sm text-ink-500">
                      {order.time}
                    </td>
                    <td className="px-5 py-5 text-right">
                      <button className="text-sm font-semibold text-brand-500 hover:text-brand-600">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!pageOrders.length && (
            <div className="py-16 text-center">
              <p className="font-semibold text-ink-800">No orders found</p>
              <p className="mt-1 text-sm text-ink-400">
                Try changing your search or filters.
              </p>
            </div>
          )}

          <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-ink-100 px-5 py-4">
            <p className="text-sm text-ink-500">
              Showing{" "}
              <b className="font-semibold text-ink-900">
                {pageOrders.length ? (activePage - 1) * pageSize + 1 : 0}–
                {Math.min(activePage * pageSize, filteredOrders.length)}
              </b>{" "}
              of{" "}
              <b className="font-semibold text-ink-900">
                {filteredOrders.length}
              </b>
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(activePage - 1)}
                disabled={activePage === 1}
                className="inline-flex h-9 items-center gap-1 rounded-lg border border-ink-200 px-3 text-sm text-ink-500 disabled:opacity-40"
              >
                <ChevronLeft size={17} />
                Prev
              </button>
              {Array.from(
                { length: Math.min(totalPages, 4) },
                (_, index) => index + 1,
              ).map((number) => (
                <button
                  key={number}
                  onClick={() => setPage(number)}
                  className={`h-9 w-9 rounded-lg text-sm font-medium ${number === activePage ? "bg-brand-500 text-white" : "text-ink-700 hover:bg-ink-100"}`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => setPage(activePage + 1)}
                disabled={activePage === totalPages}
                className="inline-flex h-9 items-center gap-1 rounded-lg border border-ink-200 px-3 text-sm text-ink-700 disabled:opacity-40"
              >
                Next
                <ChevronRight size={17} />
              </button>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
