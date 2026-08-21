import { Utensils, Bike } from 'lucide-react';

const kitchenQueue = [
    {
        id: '#1042',
        detail: '2x Burger, 1x Fries',
        time: '6m',
        delayed: false,
    },
    {
        id: '#1045',
        detail: '1x Pizza, 2x Coke',
        time: '8m',
        delayed: false,
    },
    {
        id: '#1048',
        detail: '3x Burger, 1x Fries',
        time: '12m',
        delayed: true,
    },
    {
        id: '#1051',
        detail: '2x Pizza',
        time: '4m',
        delayed: false,
    },
];

const deliveryQueue = [
    {
        id: '#1038',
        detail: 'Downtown',
        time: '12m',
        delayed: false,
    },
    {
        id: '#1041',
        detail: 'Al-Rimal',
        time: '18m',
        delayed: false,
    },
    {
        id: '#1044',
        detail: 'Beach Road',
        time: '24m',
        delayed: true,
    },
];

const stockAlerts = [
    {
        name: 'Chicken Breast',
        category: 'Meat',
        qty: '2 kg',
        severity: 'critical',
        thumb: 'orange',
    },
    {
        name: 'Mozzarella',
        category: 'Dairy',
        qty: '0',
        severity: 'out',
        thumb: 'red',
    },
    {
        name: 'Burger Buns',
        category: 'Bakery',
        qty: '8',
        severity: 'critical',
        thumb: 'amber',
    },
    {
        name: 'Tomatoes',
        category: 'Vegetables',
        qty: '12',
        severity: 'normal',
        thumb: 'green',
    },
];

const thumbColors = {
    orange: '#bf6b38',
    blue: '#3981f7',
    green: '#19b985',
    amber: '#f0a826',
    red: '#ef5d54',
};

export default function Kitchen() {
    return (
        <div className="grid-3">

            {/* Kitchen Queue */}
            <section className="card queue-card">

                <div className="card-header">
                    <div>
                        <h3>Kitchen Queue</h3>
                        <p>Orders being prepared</p>
                    </div>

                    <span className="pill pill-info">
                        ● 4 active
                    </span>
                </div>

                <div className="queue-list">

                    {kitchenQueue.map((order) => (
                        <div
                            className={`queue-row ${order.delayed ? 'delayed' : ''
                                }`}
                            key={order.id}
                        >

                            <span className="queue-icon kitchen">
                                <Utensils size={14} />
                            </span>

                            <div>
                                <strong>{order.id}</strong>
                                <small>{order.detail}</small>
                            </div>

                            <b
                                className={
                                    order.delayed
                                        ? 'text-danger'
                                        : ''
                                }
                            >
                                {order.time}
                                {order.delayed && ' ⚠'}
                            </b>

                        </div>
                    ))}

                </div>
            </section>


            {/* Delivery & Pickup */}
            <section className="card queue-card">

                <div className="card-header">
                    <div>
                        <h3>Delivery & Pickup</h3>
                        <p>Orders en route</p>
                    </div>

                    <span className="pill pill-info">
                        ● 3 active
                    </span>
                </div>

                <div className="queue-list">

                    {deliveryQueue.map((order) => (
                        <div
                            className={`queue-row ${order.delayed ? 'delayed' : ''
                                }`}
                            key={order.id}
                        >

                            <span className="queue-icon delivery">
                                <Bike size={14} />
                            </span>

                            <div>
                                <strong>{order.id}</strong>
                                <small>{order.detail}</small>
                            </div>

                            <b
                                className={
                                    order.delayed
                                        ? 'text-danger'
                                        : ''
                                }
                            >
                                {order.time}
                                {order.delayed && ' ⚠'}
                            </b>

                        </div>
                    ))}

                </div>
            </section>


            {/* Inventory Alerts */}
            <section className="card queue-card">

                <div className="card-header">
                    <div>
                        <h3>Inventory Alerts</h3>
                        <p>Stock requiring attention</p>
                    </div>

                    <span className="pill pill-danger">
                        ● 4 items
                    </span>
                </div>

                <div className="queue-list">

                    {stockAlerts.map((stockAlert) => (
                        <div
                            className="queue-row"
                            key={stockAlert.name}
                        >

                            <span
                                className="product-thumb"
                                style={{
                                    width: 28,
                                    height: 28,
                                    background:
                                        thumbColors[stockAlert.thumb],
                                }}
                            >
                                <Utensils size={12} />
                            </span>

                            <div>
                                <strong>{stockAlert.name}</strong>
                                <small>{stockAlert.category}</small>
                            </div>

                            <span
                                className={
                                    stockAlert.severity === 'out'
                                        ? 'pill pill-danger'
                                        : stockAlert.severity === 'critical'
                                            ? 'pill pill-warning'
                                            : 'pill pill-success'
                                }
                            >
                                {stockAlert.qty}
                            </span>

                        </div>
                    ))}

                </div>
            </section>

        </div>
    );
}
