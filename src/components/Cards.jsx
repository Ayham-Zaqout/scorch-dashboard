import KpiCard from '@/components/KpiCard';

import { dashboardKpis, kpiCards } from '@/data/dashboardKpis';

export default function Cards() {
    return (
        <div className="grid grid-cols-1 gap-4 mb-5 font-sans sm:grid-cols-2 xl:grid-cols-4">
            {kpiCards.map((type) => (
                <KpiCard
                    key={type}
                    type={type}
                    data={dashboardKpis}
                />
            ))}
        </div>
    );
}
