export const mockAnalyticsOverview = {
  kpis: {
    totalRevenue: 3247,
    totalOrders: 23,
    pendingOrders: 4,
    activeProducts: 18,
    totalLocations: 3,
    averageOrderValue: 141.17,
  },
  revenueTrend: [
    { label: "Mon", revenue: 420, previous: 380, orders: 7 },
    { label: "Tue", revenue: 510, previous: 460, orders: 8 },
    { label: "Wed", revenue: 470, previous: 500, orders: 7 },
    { label: "Thu", revenue: 620, previous: 560, orders: 10 },
    { label: "Fri", revenue: 740, previous: 680, orders: 12 },
    { label: "Sat", revenue: 680, previous: 610, orders: 11 },
    { label: "Sun", revenue: 820, previous: 720, orders: 13 },
  ],
  categoryBreakdown: [
    { name: "Burgers", count: 8, percentage: 44 },
    { name: "Pizza", count: 5, percentage: 28 },
    { name: "Sides", count: 3, percentage: 17 },
    { name: "Drinks", count: 2, percentage: 11 },
  ],
  orderingHeatmap: [
    [1, 2, 2, 3, 4, 3, 2, 1, 2, 3, 4, 4, 3, 2, 1],
    [1, 1, 2, 3, 4, 5, 4, 3, 3, 4, 5, 4, 3, 2, 1],
    [0, 1, 2, 3, 4, 4, 5, 4, 3, 4, 4, 3, 2, 1, 0],
    [1, 2, 3, 4, 5, 5, 4, 4, 5, 5, 4, 3, 2, 1, 1],
    [1, 2, 3, 4, 5, 5, 5, 4, 4, 5, 5, 4, 3, 2, 1],
    [0, 1, 2, 3, 4, 4, 5, 5, 4, 3, 3, 2, 1, 1, 0],
    [0, 1, 1, 2, 3, 3, 4, 3, 2, 2, 1, 1, 0, 0, 0],
  ],
};

export const emptyRevenueTrend = [
  { label: "Mon", revenue: 0, previous: 0, orders: 0 },
  { label: "Tue", revenue: 0, previous: 0, orders: 0 },
  { label: "Wed", revenue: 0, previous: 0, orders: 0 },
  { label: "Thu", revenue: 0, previous: 0, orders: 0 },
  { label: "Fri", revenue: 0, previous: 0, orders: 0 },
  { label: "Sat", revenue: 0, previous: 0, orders: 0 },
  { label: "Sun", revenue: 0, previous: 0, orders: 0 },
];

export const mockCustomerBreakdown = [
  { name: "Returning", value: 68, color: "#3981f7" },
  { name: "New", value: 32, color: "#e8ebef" },
];
