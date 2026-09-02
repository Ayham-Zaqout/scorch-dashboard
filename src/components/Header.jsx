"use client";

import { useRouter } from "next/navigation";
import { Plus, Clock3 } from "lucide-react";

export default function Header() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900">Dashboard</h1>
        <p className="mt-1 text-sm text-ink-500">
          Welcome back. Here is your live store & kitchen performance overview.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-9 flex items-center gap-1.5 px-3.5 rounded-lg font-semibold text-xs text-ink-700 bg-white border border-ink-200">
          <Clock3 size={14} className="text-ink-500" />
          Live Data
        </div>
        <button
          type="button"
          onClick={() => router.push("/menu/new")}
          className="h-9 flex items-center gap-1.5 px-3.5 rounded-lg font-semibold text-xs text-white bg-orange-500 hover:bg-orange-600 transition cursor-pointer"
        >
          <Plus size={15} />
          New Product
        </button>
      </div>
    </div>
  );
}