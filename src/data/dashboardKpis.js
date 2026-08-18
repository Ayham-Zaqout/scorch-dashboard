export const dashboardKpis = {
  revenue: {
    today: "$3,247",
    yesterday: "$2,844",
    trend: {
      value: "+14.2%",
      negative: false,
    },
    target: 3200,
    current: 3247,
  },

  activeOrders: {
    total: 23,
    trend: {
      value: "+8.7%",
      negative: false,
    },
    statuses: [
      {
        label: "Preparing",
        value: 14,
        color: "bg-brand-500",
      },
      {
        label: "Ready",
        value: 6,
        color: "bg-[#ef5d54]",
      },
      {
        label: "En route",
        value: 3,
        color: "bg-[#3981f7]",
      },
    ],
  },

  kitchen: {
    queue: 4,
    avgPrep: "6m 20s",
    target: "12m",
    onTarget: true,
    progress: 68,
  },

  lowStock: {
    count: 4,
    critical: "Berry Chocolate Slice",
    severity: "out",
  },
};

export const kpiCards = [
  {
    id: "revenue",
    type: "revenue",
  },
  {
    id: "activeOrders",
    type: "activeOrders",
  },
  {
    id: "kitchen",
    type: "kitchen",
  },
  {
    id: "lowStock",
    type: "lowStock",
  },
];
