"use client";

import { useState } from "react";
import { Sidebar } from "./SideBar";
import { TopBar } from "./TopBar";

export function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-ink-50 font-sans text-ink-900 antialiased">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div
        className={`flex min-w-0 flex-1 flex-col transition-all duration-300 ${
          collapsed ? "lg:pl-18" : "lg:pl-65"
        }`}
      >
        <TopBar onOpenMobileSidebar={() => setMobileOpen(true)} />

        <main className="mx-auto w-full max-w-7xl flex-1 animate-fade-in p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
