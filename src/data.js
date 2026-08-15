export const products = [
  {
    id: "p1",
    name: "Scorch Classic Burger",
    description:
      "Flame-grilled beef patty, melted cheddar, crisp lettuce, tomato, pickles, house sauce on a brioche bun.",
    price: 9.5,
    category: "burgers",
    image:
      "https://images.pexels.com/photos/8305726/pexels-photo-8305726.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    calories: 640,
    tags: ["Bestseller", "Beef"],
    available: true,
    featured: true,
    stock: 142,
    sku: "SC-BRG-001",
    options: [
      {
        id: "opt-cook",
        name: "Cooking level",
        required: true,
        multiple: false,
        options: [
          { id: "c1", name: "Medium", priceModifier: 0 },
          { id: "c2", name: "Well Done", priceModifier: 0 },
        ],
      },
      {
        id: "opt-cheese",
        name: "Cheese",
        required: true,
        multiple: false,
        options: [
          { id: "ch1", name: "Normal", priceModifier: 0 },
          { id: "ch2", name: "Extra Cheese", priceModifier: 1.5 },
        ],
      },
      {
        id: "opt-spicy",
        name: "Spicy level",
        required: true,
        multiple: false,
        options: [
          { id: "s1", name: "Normal", priceModifier: 0 },
          { id: "s2", name: "Hot", priceModifier: 0 },
        ],
      },
    ],
  },
  {
    id: "p2",
    name: "Double Smash Burger",
    description:
      "Two smashed beef patties, double cheese, caramelized onions, smoked bacon, signature Scorch sauce.",
    price: 12.9,
    category: "burgers",
    image:
      "https://images.pexels.com/photos/2469096/pexels-photo-2469096.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    calories: 880,
    tags: ["Bestseller", "Double"],
    available: true,
    featured: true,
    stock: 89,
    sku: "SC-BRG-002",
    options: [
      {
        id: "opt-cook2",
        name: "Cooking level",
        required: true,
        multiple: false,
        options: [
          { id: "c1", name: "Medium", priceModifier: 0 },
          { id: "c2", name: "Well Done", priceModifier: 0 },
        ],
      },
      {
        id: "opt-cheese2",
        name: "Cheese",
        required: true,
        multiple: false,
        options: [
          { id: "ch1", name: "Normal", priceModifier: 0 },
          { id: "ch2", name: "Extra Cheese", priceModifier: 1.5 },
        ],
      },
    ],
  },
  {
    id: "p3",
    name: "Crispy Chicken Burger",
    description:
      "Buttermilk-fried chicken fillet, slaw, pickles, spicy mayo on a toasted sesame bun.",
    price: 8.75,
    category: "burgers",
    image:
      "https://images.pexels.com/photos/2299981/pexels-photo-2299981.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    calories: 590,
    tags: ["Chicken", "Crispy"],
    available: true,
    featured: false,
    stock: 67,
    sku: "SC-BRG-003",
    options: [
      {
        id: "opt-spicy3",
        name: "Spicy level",
        required: true,
        multiple: false,
        options: [
          { id: "s1", name: "Normal", priceModifier: 0 },
          { id: "s2", name: "Hot", priceModifier: 0 },
        ],
      },
    ],
  },
  {
    id: "p4",
    name: "Bacon BBQ Burger",
    description:
      "Beef patty, crispy bacon, onion rings, smoked gouda, smoky BBQ glaze on a pretzel bun.",
    price: 11.2,
    category: "burgers",
    image:
      "https://images.pexels.com/photos/4315148/pexels-photo-4315148.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    calories: 760,
    tags: ["Bacon", "BBQ"],
    available: false,
    featured: false,
    stock: 8,
    sku: "SC-BRG-004",
    options: [
      {
        id: "opt-cook4",
        name: "Cooking level",
        required: true,
        multiple: false,
        options: [
          { id: "c1", name: "Medium", priceModifier: 0 },
          { id: "c2", name: "Well Done", priceModifier: 0 },
        ],
      },
    ],
  },
  {
    id: "p5",
    name: "Crispy Chicken Bucket",
    description:
      "8 pieces of hand-breaded fried chicken with your choice of dipping sauce.",
    price: 16.5,
    category: "chicken",
    image:
      "https://images.pexels.com/photos/5474676/pexels-photo-5474676.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    calories: 1240,
    tags: ["Sharing", "Crispy"],
    available: true,
    featured: true,
    stock: 54,
    sku: "SC-CHK-001",
    options: [],
  },
  {
    id: "p6",
    name: "Chicken Combo Meal",
    description:
      "2 pieces fried chicken, fries, and a regular drink. A complete value meal.",
    price: 10.3,
    category: "chicken",
    image:
      "https://images.pexels.com/photos/793005/pexels-photo-793005.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    calories: 920,
    tags: ["Combo", "Value"],
    available: true,
    featured: false,
    stock: 43,
    sku: "SC-CHK-002",
    options: [],
  },
  {
    id: "p7",
    name: "Spicy Wings (6 pcs)",
    description:
      "Six chicken wings tossed in our fiery Scorch hot sauce. Not for the faint of heart.",
    price: 7.8,
    category: "chicken",
    image:
      "https://images.pexels.com/photos/9872916/pexels-photo-9872916.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    calories: 540,
    tags: ["Spicy", "Wings"],
    available: true,
    featured: false,
    stock: 5,
    sku: "SC-CHK-003",
    options: [
      {
        id: "opt-spicy7",
        name: "Spicy level",
        required: true,
        multiple: false,
        options: [
          { id: "s1", name: "Normal", priceModifier: 0 },
          { id: "s2", name: "Hot", priceModifier: 0 },
          { id: "s3", name: "Inferno", priceModifier: 0.5 },
        ],
      },
    ],
  },
  {
    id: "p8",
    name: "Chicken Tenders & Fries",
    description:
      "Four hand-breaded chicken tenders with golden fries and your choice of dip.",
    price: 8.9,
    category: "chicken",
    image:
      "https://images.pexels.com/photos/20532527/pexels-photo-20532527.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    calories: 680,
    tags: ["Tenders", "Kids"],
    available: true,
    featured: false,
    stock: 78,
    sku: "SC-CHK-004",
    options: [],
  },
  {
    id: "p9",
    name: "Classic Cola",
    description:
      "Ice-cold cola served with a slice of lime. The perfect refreshment.",
    price: 2.5,
    category: "drinks",
    image:
      "https://images.pexels.com/photos/8880742/pexels-photo-8880742.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    calories: 180,
    tags: ["Cold", "Classic"],
    available: true,
    featured: false,
    stock: 210,
    sku: "SC-DRK-001",
    options: [
      {
        id: "opt-size9",
        name: "Size",
        required: true,
        multiple: false,
        options: [
          { id: "sz1", name: "Small", priceModifier: 0 },
          { id: "sz2", name: "Medium", priceModifier: 0.5 },
          { id: "sz3", name: "Large", priceModifier: 1.0 },
        ],
      },
    ],
  },
  {
    id: "p10",
    name: "Soda Can Combo",
    description:
      "Two soda cans of your choice served with ice. Great for sharing.",
    price: 3.8,
    category: "drinks",
    image:
      "https://images.pexels.com/photos/4113653/pexels-photo-4113653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    calories: 280,
    tags: ["Combo"],
    available: true,
    featured: false,
    stock: 156,
    sku: "SC-DRK-002",
    options: [],
  },
  {
    id: "p11",
    name: "Bottled Cola",
    description:
      "Classic glass-bottle cola, chilled and served with ice on the side.",
    price: 2.8,
    category: "drinks",
    image:
      "https://images.pexels.com/photos/4113632/pexels-photo-4113632.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    calories: 200,
    tags: ["Cold"],
    available: true,
    featured: false,
    stock: 3,
    sku: "SC-DRK-003",
    options: [
      {
        id: "opt-size11",
        name: "Size",
        required: true,
        multiple: false,
        options: [
          { id: "sz1", name: "Small", priceModifier: 0 },
          { id: "sz2", name: "Medium", priceModifier: 0.5 },
          { id: "sz3", name: "Large", priceModifier: 1.0 },
        ],
      },
    ],
  },
  {
    id: "p12",
    name: "Chocolate Lava Cake",
    description:
      "Warm chocolate cake with a molten center, served with vanilla bean ice cream.",
    price: 5.5,
    category: "desserts",
    image:
      "https://images.pexels.com/photos/12927134/pexels-photo-12927134.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    calories: 420,
    tags: ["Bestseller", "Warm"],
    available: true,
    featured: true,
    stock: 32,
    sku: "SC-DST-001",
    options: [],
  },
  {
    id: "p13",
    name: "Tiramisu Cup",
    description:
      "Classic Italian tiramisu with espresso-soaked ladyfingers and mascarpone.",
    price: 4.75,
    category: "desserts",
    image:
      "https://images.pexels.com/photos/5172006/pexels-photo-5172006.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    calories: 340,
    tags: ["Italian"],
    available: true,
    featured: false,
    stock: 28,
    sku: "SC-DST-002",
    options: [],
  },
  {
    id: "p14",
    name: "Berry Chocolate Slice",
    description:
      "Rich chocolate cake layered with fresh berries and chocolate ganache.",
    price: 5.2,
    category: "desserts",
    image:
      "https://images.pexels.com/photos/3840200/pexels-photo-3840200.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    calories: 380,
    tags: ["Berry"],
    available: false,
    featured: false,
    stock: 0,
    sku: "SC-DST-003",
    options: [],
  },
  {
    id: "p15",
    name: "Fudge Brownie",
    description:
      "Dense fudge brownie drizzled with chocolate sauce and a dusting of cocoa.",
    price: 4.5,
    category: "desserts",
    image:
      "https://images.pexels.com/photos/33312981/pexels-photo-33312981.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    calories: 310,
    tags: ["Chocolate"],
    available: true,
    featured: false,
    stock: 41,
    sku: "SC-DST-004",
    options: [],
  },
];

export const categories = [
  {
    id: "cat1",
    name: "Burgers",
    slug: "burgers",
    image:
      "https://images.pexels.com/photos/8305726/pexels-photo-8305726.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    sortOrder: 1,
    productCount: 4,
  },
  {
    id: "cat2",
    name: "Chicken",
    slug: "chicken",
    image:
      "https://images.pexels.com/photos/5474676/pexels-photo-5474676.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    sortOrder: 2,
    productCount: 4,
  },
  {
    id: "cat3",
    name: "Drinks",
    slug: "drinks",
    image:
      "https://images.pexels.com/photos/8880742/pexels-photo-8880742.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    sortOrder: 3,
    productCount: 3,
  },
  {
    id: "cat4",
    name: "Desserts",
    slug: "desserts",
    image:
      "https://images.pexels.com/photos/12927134/pexels-photo-12927134.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    sortOrder: 4,
    productCount: 4,
  },
];

const customers = [
  {
    name: "Sarah Mitchell",
    phone: "+1 (415) 555-0142",
    email: "sarah.m@email.com",
  },
  {
    name: "James Wilson",
    phone: "+1 (415) 555-0188",
    email: "jwilson@email.com",
  },
  {
    name: "Emma Thompson",
    phone: "+1 (415) 555-0231",
    email: "emma.t@email.com",
  },
  {
    name: "Michael Brown",
    phone: "+1 (415) 555-0317",
    email: "mbrown@email.com",
  },
  {
    name: "Olivia Garcia",
    phone: "+1 (415) 555-0456",
    email: "olivia.g@email.com",
  },
  {
    name: "Daniel Martinez",
    phone: "+1 (415) 555-0523",
    email: "dmartinez@email.com",
  },
  {
    name: "Sophia Lee",
    phone: "+1 (415) 555-0678",
    email: "sophia.lee@email.com",
  },
  {
    name: "Christopher Davis",
    phone: "+1 (415) 555-0742",
    email: "cdavis@email.com",
  },
  {
    name: "Isabella Rodriguez",
    phone: "+1 (415) 555-0891",
    email: "isabella.r@email.com",
  },
  {
    name: "Matthew Taylor",
    phone: "+1 (415) 555-0934",
    email: "mtaylor@email.com",
  },
  {
    name: "Ava Anderson",
    phone: "+1 (415) 555-1023",
    email: "ava.a@email.com",
  },
  {
    name: "David Thomas",
    phone: "+1 (415) 555-1156",
    email: "dthomas@email.com",
  },
];

const addresses = [
  "248 Market St, San Francisco, CA 94103",
  "510 Valencia St, San Francisco, CA 94110",
  "1190 Mission St, San Francisco, CA 94103",
  "3400 24th St, San Francisco, CA 94110",
  "78 Powell St, San Francisco, CA 94102",
];

const locationNames = ["Downtown", "Mission District", "SOMA"];

function buildTimeline(status, createdAt) {
  const steps = [
    "received",
    "preparing",
    "cooking",
    "ready",
    "picked_up",
    "completed",
  ];
  const currentIdx = steps.indexOf(status);
  return steps.map((s, i) => ({
    status: s,
    label: s.charAt(0).toUpperCase() + s.slice(1).replace("_", " "),
    time:
      i === 0
        ? createdAt
        : `${parseInt(createdAt) + i * 4}:${((i * 37) % 60).toString().padStart(2, "0")}`,
    done: i <= currentIdx,
  }));
}

function makeOrder(idx) {
  const customer = customers[idx % customers.length];
  const numItems = (idx % 3) + 1;
  const chosen = [];
  for (let i = 0; i < numItems; i++)
    chosen.push(products[(idx * 2 + i) % products.length]);
  const items = chosen.map((p, i) => ({
    id: `oi-${idx}-${i}`,
    name: p.name,
    quantity: (idx % 2) + 1,
    price: p.price,
    options: p.options
      .slice(0, 1)
      .map((g) => ({ group: g.name, value: g.options[0].name })),
  }));
  const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0);
  const deliveryFee = idx % 3 === 0 ? 2.99 : 0;
  const tax = +(subtotal * 0.0875).toFixed(2);
  const total = +(subtotal + deliveryFee + tax).toFixed(2);
  const statuses = [
    "received",
    "preparing",
    "cooking",
    "ready",
    "completed",
    "completed",
    "completed",
    "cancelled",
  ];
  const status = statuses[idx % statuses.length];
  const types = ["delivery", "pickup", "dine-in"];
  const type = types[idx % types.length];
  const hour = 9 + Math.floor(idx / 3);
  const min = (idx * 7) % 60;
  const createdAt = `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;

  return {
    id: `ord-${idx + 1}`,
    number: `#SC-${(1048 + idx).toString()}`,
    customerName: customer.name,
    customerPhone: customer.phone,
    customerEmail: customer.email,
    items,
    type,
    subtotal: +subtotal.toFixed(2),
    deliveryFee,
    tax,
    total,
    status,
    createdAt,
    location: locationNames[idx % locationNames.length],
    address:
      type === "delivery" ? addresses[idx % addresses.length] : undefined,
    timeline: buildTimeline(status, createdAt),
  };
}

export const orders = Array.from({ length: 28 }, (_, i) => makeOrder(i));

export const topProducts = [
  {
    name: "Scorch Classic Burger",
    sold: 142,
    revenue: 1349.0,
    image: products[0].image,
  },
  {
    name: "Double Smash Burger",
    sold: 118,
    revenue: 1522.2,
    image: products[1].image,
  },
  {
    name: "Crispy Chicken Bucket",
    sold: 96,
    revenue: 1584.0,
    image: products[4].image,
  },
  {
    name: "Chocolate Lava Cake",
    sold: 84,
    revenue: 462.0,
    image: products[11].image,
  },
  {
    name: "Spicy Wings (6 pcs)",
    sold: 73,
    revenue: 569.4,
    image: products[6].image,
  },
];

export const weeklySales = [
  { day: "Mon", orders: 124, revenue: 1480 },
  { day: "Tue", orders: 156, revenue: 1890 },
  { day: "Wed", orders: 142, revenue: 1620 },
  { day: "Thu", orders: 198, revenue: 2340 },
  { day: "Fri", orders: 267, revenue: 3120 },
  { day: "Sat", orders: 312, revenue: 3680 },
  { day: "Sun", orders: 189, revenue: 2240 },
];

export const monthlySales = [
  { month: "Jan", revenue: 38200, orders: 1240 },
  { month: "Feb", revenue: 41500, orders: 1380 },
  { month: "Mar", revenue: 44800, orders: 1490 },
  { month: "Apr", revenue: 42100, orders: 1410 },
  { month: "May", revenue: 48600, orders: 1620 },
  { month: "Jun", revenue: 52300, orders: 1750 },
  { month: "Jul", revenue: 56700, orders: 1890 },
  { month: "Aug", revenue: 54100, orders: 1810 },
  { month: "Sep", revenue: 58900, orders: 1960 },
  { month: "Oct", revenue: 61200, orders: 2040 },
  { month: "Nov", revenue: 64800, orders: 2160 },
  { month: "Dec", revenue: 71500, orders: 2380 },
];

export const orderStatusBreakdown = [
  { count: 8, pct: 12 },
  { count: 14, pct: 21 },
  { count: 11, pct: 16 },
  { count: 34, pct: 51 },
];

export const peakHours = [
  { hour: "8 AM", orders: 12 },
  { hour: "9 AM", orders: 18 },
  { hour: "10 AM", orders: 24 },
  { hour: "11 AM", orders: 38 },
  { hour: "12 PM", orders: 67 },
  { hour: "1 PM", orders: 54 },
  { hour: "2 PM", orders: 31 },
  { hour: "3 PM", orders: 22 },
  { hour: "4 PM", orders: 28 },
  { hour: "5 PM", orders: 45 },
  { hour: "6 PM", orders: 72 },
  { hour: "7 PM", orders: 68 },
  { hour: "8 PM", orders: 51 },
  { hour: "9 PM", orders: 34 },
  { hour: "10 PM", orders: 19 },
];

export const customerGrowth = [
  { month: "Jan", customers: 820 },
  { month: "Feb", customers: 910 },
  { month: "Mar", customers: 1020 },
  { month: "Apr", customers: 1080 },
  { month: "May", customers: 1180 },
  { month: "Jun", customers: 1290 },
  { month: "Jul", customers: 1410 },
  { month: "Aug", customers: 1520 },
  { month: "Sep", customers: 1640 },
  { month: "Oct", customers: 1780 },
  { month: "Nov", customers: 1910 },
  { month: "Dec", customers: 2120 },
];

export const revenueByLocation = [
  { location: "Downtown", revenue: 28400, pct: 42 },
  { location: "Mission District", revenue: 22100, pct: 33 },
  { location: "SOMA", revenue: 16800, pct: 25 },
];

export const categoryPerformance = [
  { category: "Burgers", revenue: 28400, orders: 1240, pct: 42 },
  { category: "Chicken", revenue: 19800, orders: 890, pct: 29 },
  { category: "Drinks", revenue: 11200, orders: 1820, pct: 17 },
  { category: "Desserts", revenue: 7900, orders: 560, pct: 12 },
];

export const restaurantLocations = [
  {
    id: "loc1",
    name: "Downtown",
    image:
      "https://images.pexels.com/photos/2387675/pexels-photo-2387675.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    address: "248 Market St, San Francisco, CA 94103",
    phone: "+1 (415) 555-0100",
    hours: "10:00 AM - 11:00 PM",
    isOpen: true,
  },
  {
    id: "loc2",
    name: "Mission District",
    image:
      "https://images.pexels.com/photos/12387869/pexels-photo-12387869.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    address: "510 Valencia St, San Francisco, CA 94110",
    phone: "+1 (415) 555-0200",
    hours: "11:00 AM - 12:00 AM",
    isOpen: true,
  },
  {
    id: "loc3",
    name: "SOMA",
    image:
      "https://images.pexels.com/photos/13871340/pexels-photo-13871340.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    address: "1190 Mission St, San Francisco, CA 94103",
    phone: "+1 (415) 555-0300",
    hours: "10:00 AM - 10:00 PM",
    isOpen: false,
  },
];

export const coupons = [
  {
    id: "cpn1",
    code: "SCORCH10",
    type: "percent",
    value: 10,
    status: "active",
    used: 142,
    limit: 500,
    expires: "Dec 31, 2026",
  },
  {
    id: "cpn2",
    code: "FREESHIP",
    type: "fixed",
    value: 2.99,
    status: "active",
    used: 89,
    limit: 1000,
    expires: "Dec 31, 2026",
  },
  {
    id: "cpn3",
    code: "SUMMER25",
    type: "percent",
    value: 25,
    status: "expired",
    used: 340,
    limit: 500,
    expires: "Aug 31, 2026",
  },
  {
    id: "cpn4",
    code: "WELCOME5",
    type: "fixed",
    value: 5,
    status: "scheduled",
    used: 0,
    limit: 200,
    expires: "Jan 15, 2027",
  },
];

export const notifications = [
  {
    id: "n1",
    type: "order",
    title: "New order received",
    message: "Order #SC-1048 from Sarah Mitchell ($24.50)",
    time: "2 min ago",
    read: false,
  },
  {
    id: "n2",
    type: "stock",
    title: "Low stock alert",
    message: "Spicy Wings (6 pcs) has only 5 units left",
    time: "12 min ago",
    read: false,
  },
  {
    id: "n3",
    type: "payment",
    title: "Failed payment",
    message: "Payment for order #SC-1051 was declined",
    time: "28 min ago",
    read: false,
  },
  {
    id: "n4",
    type: "location",
    title: "Location issue",
    message: "SOMA branch is currently marked as closed",
    time: "1 hour ago",
    read: true,
  },
  {
    id: "n5",
    type: "order",
    title: "Order completed",
    message: "Order #SC-1045 has been marked as completed",
    time: "2 hours ago",
    read: true,
  },
  {
    id: "n6",
    type: "stock",
    title: "Out of stock",
    message: "Berry Chocolate Slice is now out of stock",
    time: "3 hours ago",
    read: true,
  },
];

export const lowStockProducts = products
  .filter((p) => p.stock <= 10)
  .map((p) => ({
    id: p.id,
    name: p.name,
    stock: p.stock,
    image: p.image,
    category: p.category,
  }));

export const recentActivity = [
  {
    id: "a1",
    type: "order",
    title: "New order received",
    description: "Order #SC-1075 from Sarah Mitchell ($24.50)",
    time: "2 min ago",
    user: "System",
  },
  {
    id: "a2",
    type: "product",
    title: "Product updated",
    description: "Scorch Classic Burger price updated to $9.50",
    time: "18 min ago",
    user: "Owner",
  },
  {
    id: "a3",
    type: "stock",
    title: "Low stock alert",
    description: "Spicy Wings (6 pcs) dropped to 5 units",
    time: "32 min ago",
    user: "System",
  },
  {
    id: "a4",
    type: "coupon",
    title: "Coupon created",
    description: "SUMMER25 — 25% off, limit 500",
    time: "1 hour ago",
    user: "Owner",
  },
  {
    id: "a5",
    type: "order",
    title: "Order cancelled",
    description: "Order #SC-1051 cancelled by customer",
    time: "2 hours ago",
    user: "Owner",
  },
  {
    id: "a6",
    type: "category",
    title: "Category edited",
    description: "Chicken category image updated",
    time: "3 hours ago",
    user: "Owner",
  },
  {
    id: "a7",
    type: "location",
    title: "Location status changed",
    description: "SOMA branch marked as closed",
    time: "4 hours ago",
    user: "Owner",
  },
  {
    id: "a8",
    type: "product",
    title: "Product archived",
    description: "Berry Chocolate Slice archived from menu",
    time: "5 hours ago",
    user: "Owner",
  },
];

export const kitchenQueue = [
  {
    id: "k1",
    orderNumber: "#SC-1075",
    items: 3,
    status: "cooking",
    minutes: 8,
  },
  {
    id: "k2",
    orderNumber: "#SC-1074",
    items: 2,
    status: "preparing",
    minutes: 4,
  },
  {
    id: "k3",
    orderNumber: "#SC-1073",
    items: 5,
    status: "preparing",
    minutes: 2,
  },
  {
    id: "k4",
    orderNumber: "#SC-1072",
    items: 1,
    status: "cooking",
    minutes: 11,
  },
];

export const deliveryQueue = [
  {
    id: "d1",
    orderNumber: "#SC-1071",
    driver: "On the way",
    eta: "12 min",
    address: "248 Market St",
    status: "out_for_delivery",
  },
  {
    id: "d2",
    orderNumber: "#SC-1070",
    driver: "Assigned",
    eta: "25 min",
    address: "510 Valencia St",
    status: "assigned",
  },
  {
    id: "d3",
    orderNumber: "#SC-1069",
    driver: "Picked up",
    eta: "8 min",
    address: "78 Powell St",
    status: "picked_up",
  },
];

export const defaultSettings = {
  deliveryFee: 2.99,
  taxRate: 8.75,
  currency: "USD",
  preparationTime: 15,
  restaurantName: "Scorch",
  restaurantEmail: "hello@scorch.com",
  restaurantPhone: "+1 (415) 555-0100",
  restaurantWebsite: "www.scorch.com",
  restaurantAddress: "248 Market St, San Francisco, CA 94103",
  minOrder: 10.0,
};
