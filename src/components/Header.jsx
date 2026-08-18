import { Plus, Clock3 } from 'lucide-react';

export default function Header() {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Good morning, Alex. Here&apos;s what needs your attention today.
                </p>
            </div>
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    className="h-9 flex items-center gap-1.75 px-3.5 rounded-lg font-semibold text-[12px] text-gray-700 bg-white border border-gray-200 hover:border-[#d4d9dd] hover:bg-[#fcfcfd] transition-all duration-150 outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                    <Clock3 size={14} className="text-gray-500" />
                    Today
                </button>
                <button
                    type="button"
                    className="h-9 flex items-center gap-1.75 px-3.5 rounded-lg font-semibold text-[12px] text-white bg-brand-500 shadow-[0_3px_10px_rgba(255,90,31,0.22)] hover:bg-[#eb4e17] transition-all duration-150 outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                    <Plus size={15} />
                    New Product
                </button>
            </div>
        </div>
    );
}
