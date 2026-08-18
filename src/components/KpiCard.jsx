export default function KpiCard({ type, data, }) {
    const { revenue, activeOrders, kitchen, lowStock } = data;

    const revenuePct = revenue?.target
        ? Math.min(
            100,
            ((revenue.current || 0) / revenue.target) * 100
        )
        : 0;

    const totalOrders = activeOrders?.total || 1;

    switch (type) {

        case 'revenue':
            return (
                <div className="flex flex-col min-h-32.5 gap-0 px-5 py-4.5 bg-white border border-[#e6e9ec] rounded-[10px] shadow-[0_2px_8px_rgba(32,37,45,0.04)]">
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold tracking-[0.3px] text-[#8a939e] uppercase">
                            Revenue Today
                        </span>
                        {revenue?.trend && (
                            <span
                                className={`inline-flex items-center gap-0.75 px-1.75 py-0.75 rounded-md text-[11px] font-semibold whitespace-nowrap
                                    ${revenue.trend.negative
                                        ? 'text-[#ef5d54] bg-[#fff0ef]'
                                        : 'text-[#19b985] bg-[#e9faf3]'
                                    }`}>
                                {revenue.trend.value}
                            </span>
                        )}
                    </div>
                    <div className="flex items-baseline gap-1.5 mt-2.5 text-[28px] font-bold tracking-[-1px] text-[#1e242c] leading-none">
                        {revenue?.today}
                    </div>
                    <div className="mt-1.5 text-[11px] text-[#a2aab4]">
                        vs {revenue?.yesterday} yesterday
                    </div>
                    <div className="mt-2">
                        <div className="h-1.25 overflow-hidden bg-[#f0f2f4] rounded">
                            <i
                                className="block h-full bg-brand-500 rounded"
                                style={{
                                    width: `${revenuePct}%`,
                                }}
                            />
                        </div>
                        <small className="block mt-1.25 text-[10px] text-[#a2aab4]">
                            Target{' '}
                            {revenue?.target?.toLocaleString(
                                'en',
                                {
                                    style: 'currency',
                                    currency: 'USD',
                                    maximumFractionDigits: 0,
                                }
                            )}
                        </small>
                    </div>
                </div>
            );
        case 'activeOrders':
            return (
                <div className="flex flex-col min-h-32.5 gap-0 px-5 py-4.5 bg-white border border-[#e6e9ec] rounded-[10px] shadow-[0_2px_8px_rgba(32,37,45,0.04)]">
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold tracking-[0.3px] text-[#8a939e] uppercase">
                            Active Orders
                        </span>
                        {activeOrders?.trend && (
                            <span
                                className={`inline-flex items-center gap-0.75 px-1.75 py-0.75 rounded-md text-[11px] font-semibold whitespace-nowrap
                                    ${activeOrders.trend.negative
                                        ? 'text-[#ef5d54] bg-[#fff0ef]'
                                        : 'text-[#19b985] bg-[#e9faf3]'
                                    }`}>
                                {activeOrders.trend.value}
                            </span>
                        )}
                    </div>
                    <div className="flex items-baseline gap-1.5 mt-2.5 text-[28px] font-bold tracking-[-1px] text-[#1e242c] leading-none">
                        {activeOrders?.total}
                    </div>
                    <div className="flex flex-wrap gap-2.5 mt-2.5">
                        {activeOrders?.statuses?.map((status) => (
                            <span
                                key={status.label}
                                className="inline-flex items-center gap-1 text-[10px] text-[#8a939e]">
                                <i className={`inline-block w-1.5 h-1.5 rounded-full ${status.color}`} />
                                {status.label} {status.value}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-0.5 h-1.25 mt-2.5 overflow-hidden bg-[#f0f2f4] rounded">
                        {activeOrders?.statuses?.map((status) => (
                            <i
                                key={status.label}
                                className={`block h-full ${status.color}`}
                                style={{
                                    width: `${((status.value || 0) /
                                        totalOrders) *
                                        100
                                        }%`,
                                }} />))}
                    </div>
                </div>
            );

        case 'kitchen':
            return (
                <div className="flex flex-col min-h-32.5 gap-0 px-5 py-4.5 bg-white border border-[#e6e9ec] rounded-[10px] shadow-[0_2px_8px_rgba(32,37,45,0.04)]">
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold tracking-[0.3px] text-[#8a939e] uppercase">
                            Kitchen Queue
                        </span>
                        <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold whitespace-nowrap
                                ${kitchen?.onTarget
                                    ? 'text-[#159869] bg-[#e9faf3]'
                                    : 'text-[#ef5d54] bg-[#fff0ef]'
                                }`}>
                            ●{' '}{kitchen?.onTarget ? 'On target' : 'Delayed'}
                        </span>
                    </div>
                    <div className="flex items-baseline gap-1.5 mt-2.5 text-[28px] font-bold tracking-[-1px] text-[#1e242c] leading-none">
                        {kitchen?.queue}
                        <small className="text-[11px] font-medium tracking-normal text-[#a2aab4]">
                            orders in queue
                        </small>
                    </div>
                    <div className="mt-2">
                        <div className="flex justify-between mb-1 text-[11px] text-[#8a939e]">
                            <span>
                                Avg prep time
                            </span>
                            <b className="font-semibold text-[#56606d]">
                                {kitchen?.avgPrep}
                            </b>
                        </div>
                        <div className="mt-1">
                            <div className="h-1.25 overflow-hidden bg-[#f0f2f4] rounded">
                                <i
                                    className="block h-full bg-[#19b985] rounded"
                                    style={{
                                        width: `${kitchen?.progress || 0}%`,
                                    }} />
                            </div>
                            <small className="block mt-1.25 text-[10px] text-[#a2aab4]">
                                Target under {kitchen?.target}
                            </small>
                        </div>
                    </div>
                </div>
            );

        case 'lowStock':
            return (
                <div className="flex flex-col min-h-32.5 gap-0 px-5 py-4.5 bg-[#fffafa] border border-[#f3d8d5] rounded-[10px] shadow-[0_2px_8px_rgba(32,37,45,0.04)]">
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold tracking-[0.3px] text-[#8a939e] uppercase">
                            Low Stock
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold whitespace-nowrap text-[#ef5d54] bg-[#fff0ef]">
                            ● {lowStock?.count} items
                        </span>
                    </div>

                    <div className="flex items-baseline gap-1.5 mt-2.5 text-[28px] font-bold tracking-[-1px] text-[#1e242c] leading-none">
                        {lowStock?.count}
                        <small className="text-[11px] font-medium tracking-normal text-[#a2aab4]">
                            need restocking
                        </small>
                    </div>
                    <p className="mt-2 mb-0 text-[11px] text-[#ef5d54]">
                        {lowStock?.critical} is out of stock
                    </p>
                    <button
                        type="button"
                        className="p-0 mt-1.5 text-[11px] font-semibold text-left text-[#ef5d54] bg-transparent border-0 cursor-pointer">
                        Review inventory →
                    </button>
                </div>
            );

        default:
            return null;
    }
}
