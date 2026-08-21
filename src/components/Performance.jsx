import { Utensils } from 'lucide-react';

const bestSellers = [
    {
        name: 'Classic Burger',
        thumb: 'orange',
        units: 248,
        share: '18%',
        revenue: '$3,720',
    },
    {
        name: 'Chicken Pizza',
        thumb: 'red',
        units: 196,
        share: '14%',
        revenue: '$2,940',
    },
    {
        name: 'French Fries',
        thumb: 'amber',
        units: 174,
        share: '11%',
        revenue: '$2,610',
    },
    {
        name: 'Chicken Wrap',
        thumb: 'green',
        units: 142,
        share: '9%',
        revenue: '$2,130',
    },
    {
        name: 'Coca Cola',
        thumb: 'blue',
        units: 118,
        share: '7%',
        revenue: '$1,770',
    },
];

const recentActivity = [
    {
        tone: 'success',
        title: 'Order #1052 completed',
        desc: 'Customer order was successfully delivered.',
        time: '2 min ago',
    },
    {
        tone: 'info',
        title: 'New order received',
        desc: 'Order #1053 has been added to the kitchen queue.',
        time: '8 min ago',
    },
    {
        tone: 'warning',
        title: 'Low stock alert',
        desc: 'Mozzarella is running low and needs attention.',
        time: '15 min ago',
    },
    {
        tone: 'danger',
        title: 'Delivery delayed',
        desc: 'Order #1044 is running behind schedule.',
        time: '24 min ago',
    },
];

const thumbColors = {
    orange: '#bf6b38',
    blue: '#3981f7',
    green: '#19b985',
    amber: '#f0a826',
    red: '#ef5d54',
};

export default function Performance() {
    return (
        <div className="grid-split">

            {/* Best Selling Products */}
            <section className="card card-padded">

                <div className="card-header">
                    <div>
                        <h3>Best Selling Products</h3>
                        <p>Top performers this week</p>
                    </div>

                    <button className="text-link">
                        View all →
                    </button>
                </div>

                <div className="product-list">

                    {bestSellers.map((product, index) => (
                        <div
                            className="product-row"
                            key={product.name}
                        >

                            <span className="rank">
                                {index + 1}
                            </span>

                            <span
                                className="product-thumb"
                                style={{
                                    width: 32,
                                    height: 32,
                                    background:
                                        thumbColors[product.thumb] ??
                                        '#bf6b38',
                                }}
                            >
                                <Utensils size={14} />
                            </span>

                            <div className="product-info">

                                <strong>{product.name}</strong>

                                <div className="product-bar">
                                    <i
                                        style={{
                                            width: `${100 - index * 15}%`,
                                        }}
                                    />
                                </div>

                                <small>
                                    {product.units} sold · {product.share} of revenue
                                </small>

                            </div>

                            <b>{product.revenue}</b>

                        </div>
                    ))}

                </div>

            </section>


            {/* Recent Activity */}
            <section className="card card-padded">

                <div className="card-header">
                    <div>
                        <h3>Recent Activity</h3>
                        <p>Latest system events</p>
                    </div>
                </div>

                <div className="activity-list">

                    {recentActivity.map((activity) => (
                        <div
                            className="activity-row"
                            key={activity.title}
                        >

                            <span
                                className={`activity-icon ${activity.tone}`}
                            >
                                <span className="activity-dot" />
                            </span>

                            <div>
                                <strong>{activity.title}</strong>

                                <p>{activity.desc}</p>

                                <small>{activity.time}</small>
                            </div>

                        </div>
                    ))}

                </div>

            </section>

        </div>
    );
}
