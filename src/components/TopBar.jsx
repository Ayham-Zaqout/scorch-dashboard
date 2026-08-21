"use client";

import { useEffect, useRef, useState } from "react";
import {
  Menu,
  ChevronDown,
  Search,
  Bell,
  ShoppingBag,
  PackageX,
  CreditCard,
  MapPin,
  Check,
} from "lucide-react";
import { notifications } from "@/data/notifications";

const NOTIFICATION_ICONS = {
  order: <ShoppingBag className="h-4 w-4 text-info-500" />,
  stock: <PackageX className="h-4 w-4 text-warning-500" />,
  payment: <CreditCard className="h-4 w-4 text-danger-500" />,
  location: <MapPin className="h-4 w-4 text-brand-500" />,
  system: <Check className="h-4 w-4 text-ink-400" />,
};

export function TopBar({ onOpenMobileSidebar = () => { } }) {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-ink-200 bg-white/80 px-4 backdrop-blur-md lg:px-6">
      <button onClick={onOpenMobileSidebar} className="p-1 text-ink-500 hover:text-ink-900 lg:hidden">
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative max-w-md flex-1" ref={searchRef}>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setSearchOpen(true)}
            placeholder="Search orders, products, customers..."
            className="h-9 w-full rounded-lg border border-transparent bg-ink-50 pl-10 pr-16 text-sm transition-all duration-150 placeholder:text-ink-400 focus:border-ink-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/10"
          />
        </div>

        {searchOpen && query.trim() && (
          <div className="absolute top-full z-50 mt-1.5 w-full rounded-xl border border-ink-200 bg-white py-1.5 shadow-lg">
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-ink-500">No results for &quot;{query}&quot;</p>
            </div>
          </div>
        )}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
          >
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-500 ring-2 ring-white" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full z-50 mt-1.5 w-95 max-w-[calc(100vw-2rem)] rounded-xl border border-ink-200 bg-white shadow-lg">
              <div className="border-b border-ink-100 px-4 py-3">
                <h3 className="text-sm font-semibold text-ink-900">Notifications</h3>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start gap-3 border-b border-ink-50 px-4 py-3 last:border-b-0"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink-50">
                      {NOTIFICATION_ICONS[notification.type]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-ink-900">{notification.title}</p>
                      <p className="mt-0.5 text-xs leading-5 text-ink-500">{notification.message}</p>
                      <p className="mt-1 text-[11px] text-ink-400">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-ink-100 px-4 py-2.5">
                <button className="w-full text-center text-sm font-medium text-ink-600 transition-colors hover:text-ink-900">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mx-1 hidden h-6 w-px bg-ink-200 sm:block" />

        <button className="flex items-center gap-2.5 rounded-lg py-1.5 pl-1.5 pr-2 transition-colors hover:bg-ink-100">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-xs font-semibold text-white">
            AM
          </div>
          <span className="hidden text-sm font-medium text-ink-900 sm:block">Alex Morgan</span>
          <ChevronDown className="hidden h-4 w-4 text-ink-400 sm:block" />
        </button>
      </div>
    </header>
  );
}

export default TopBar;
