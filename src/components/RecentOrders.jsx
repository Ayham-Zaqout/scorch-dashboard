const recentOrders = [
    {
        initials: 'AM',
        customer: 'Ahmed Mohammed',
        number: '#1052',
        items: 3,
        time: '2 min ago',
        total: '$42.50',
        status: 'completed',
    },
    {
        initials: 'SA',
        customer: 'Sara Ali',
        number: '#1051',
        items: 2,
        time: '8 min ago',
        total: '$28.00',
        status: 'preparing',
    },
    {
        initials: 'OM',
        customer: 'Omar Mahmoud',
        number: '#1050',
        items: 4,
        time: '15 min ago',
        total: '$67.25',
        status: 'delivering',
    },
    {
        initials: 'LK',
        customer: 'Lina Khaled',
        number: '#1049',
        items: 1,
        time: '21 min ago',
        total: '$18.75',
        status: 'completed',
    },
    {
        initials: 'YA',
        customer: 'Yousef Ahmad',
        number: '#1048',
        items: 5,
        time: '28 min ago',
        total: '$81.00',
        status: 'cancelled',
    },
];

const statusLabels = {
    completed: 'Completed',
    preparing: 'Preparing',
    delivering: 'Delivering',
    cancelled: 'Cancelled',
};

export default function RecentOrders() {
    return (
        <section className="card card-padded">

            <div className="card-header">
                <div>
                    <h3>Recent Orders</h3>
                    <p>Latest customer orders</p>
                </div>

                <button className="text-link">
                    View all →
                </button>
            </div>


            <div className="orders-table">

                <div className="orders-head">
                    <span>Customer</span>
                    <span>Order</span>
                    <span>Items</span>
                    <span>Time</span>
                    <span>Total</span>
                    <span>Status</span>
                </div>


                {recentOrders.map((order) => (
                    <div
                        className="orders-row"
                        key={order.number}
                    >

                        <div className="customer-cell">

                            <span className="initials">
                                {order.initials}
                            </span>

                            <strong>
                                {order.customer}
                            </strong>

                        </div>


                        <span className="mono">
                            {order.number}
                        </span>


                        <span>
                            {order.items} items
                        </span>


                        <span>
                            {order.time}
                        </span>


                        <strong>
                            {order.total}
                        </strong>


                        <span
                            className={`status-badge status-${order.status}`}
                        >
                            {statusLabels[order.status]}
                        </span>

                    </div>
                ))}

            </div>

        </section>
    );
}
