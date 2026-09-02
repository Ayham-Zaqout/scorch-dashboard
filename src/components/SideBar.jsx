"use client";

import {
  LayoutDashboard,
  ShoppingCart,
  BarChart3,
  UtensilsCrossed,
  FolderTree,
  MapPin,
  Ticket,
  Settings,
  LogOut,
  Flame,
  PanelLeft,
  PanelLeftClose,
  X,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const NAV_ITEMS = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard, badge: 0 },
  { path: "/analytics", label: "Analytics", icon: BarChart3, badge: 0 },
  { path: "/orders", label: "Orders", icon: ShoppingCart, badge: 3 },
  { path: "/menu", label: "Menu", icon: UtensilsCrossed, badge: 0 },
  { path: "/categories", label: "Categories", icon: FolderTree, badge: 0 },
  { path: "/locations", label: "Locations", icon: MapPin, badge: 1 },
  { path: "/coupons", label: "Coupons", icon: Ticket, badge: 0 },
  { path: "/settings", label: "Settings", icon: Settings, badge: 0 },
];

export function Sidebar({
  mobileOpen = false,
  onCloseMobile = () => { },
  collapsed = false,
  onToggleCollapse = () => { },
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (navPath) =>
    navPath === "/" ? pathname === "/" : pathname?.startsWith(navPath);

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-ink-900/40 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-0 z-40 flex flex-col border-r border-ink-200 bg-white transition-all duration-300 lg:z-20 ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } ${collapsed ? "w-18" : "w-65"}`}
      >
        <div
          className={`flex h-16 shrink-0 items-center gap-2.5 border-b border-ink-200 ${collapsed ? "justify-center px-3" : "px-4"
            }`}
        >
          {collapsed ? (
            <button
              onClick={onToggleCollapse}
              title="Expand sidebar"
              className="group/logo relative flex h-9 w-9 shrink-0 cursor-col-resize items-center justify-center rounded-xl bg-brand-500 shadow-sm transition-colors hover:bg-brand-600"
            >
              <Flame
                className="h-5 w-5 text-white transition-opacity duration-200 group-hover/logo:opacity-0"
                strokeWidth={2.5}
              />
              <PanelLeft className="absolute h-4.5 w-4.5 text-white opacity-0 transition-opacity duration-200 group-hover/logo:opacity-100" />
            </button>
          ) : (
            <>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500 shadow-sm">
                <Flame className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="flex-1 text-lg font-bold tracking-tight text-ink-900">
                Scorch
              </span>
              <button
                onClick={onToggleCollapse}
                title="Collapse sidebar"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-900"
              >
                <PanelLeftClose className="h-4.5 w-4.5" />
              </button>
            </>
          )}

          {mobileOpen && (
            <button
              onClick={onCloseMobile}
              className="ml-auto text-ink-400 hover:text-ink-900 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {!collapsed && (
            <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
              Management
            </p>
          )}

          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;

            return (
              <button
                key={item.path}
                onClick={() => {
                  router.push(item.path);
                  if (mobileOpen) onCloseMobile();
                }}
                title={collapsed ? item.label : undefined}
                className={`group relative flex w-full items-center gap-3 rounded-lg py-2.5 text-sm font-medium transition-colors duration-150 ${collapsed ? "justify-center px-2" : "px-3"
                  } ${active
                    ? "bg-brand-50 text-brand-600"
                    : "text-ink-500 hover:bg-ink-100 hover:text-ink-900"
                  }`}
              >
                <Icon
                  className={`h-4.5 w-4.5 shrink-0 transition-colors ${active ? "text-brand-500" : "text-ink-400 group-hover:text-ink-700"
                    }`}
                  strokeWidth={2}
                />

                {!collapsed && <span className="flex-1 text-left">{item.label}</span>}

                {!collapsed && item.badge > 0 && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-xs font-semibold ${active ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-500"
                      }`}
                  >
                    {item.badge}
                  </span>
                )}

                {collapsed && item.badge > 0 && (
                  <span className="absolute right-1.5 top-1 h-2 w-2 rounded-full bg-brand-500" />
                )}
              </button>
            );
          })}
        </nav>

        <div className={`shrink-0 py-3 ${collapsed ? "px-2" : "border-t border-ink-200 px-3"}`}>
          <div
            className={`flex cursor-pointer items-center gap-3 rounded-lg py-2.5 transition-colors hover:bg-ink-100 ${collapsed ? "justify-center" : "px-3"
              }`}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-semibold text-white">
              AM
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink-900">Alex Morgan</p>
                <p className="truncate text-xs text-ink-500">alex@scorch.com</p>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={() => router.push("/login")}
              className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-500 transition-colors hover:bg-danger-50 hover:text-danger-600"
            >
              <LogOut className="h-4.5 w-4.5" strokeWidth={2} />
              <span>Logout</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;