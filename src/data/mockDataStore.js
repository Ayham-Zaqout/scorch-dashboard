import { mockAnalyticsOverview } from "@/data/analytics";
import { mockCategories } from "@/data/categories";
import { mockLocations } from "@/data/locations";
import { mockOptionGroups } from "@/data/optionGroups";
import { mockOrders } from "@/data/orders";
import { mockProducts } from "@/data/products";

let categories = structuredClone(mockCategories);
let locations = structuredClone(mockLocations);
let optionGroups = structuredClone(mockOptionGroups);
let orders = structuredClone(mockOrders);
let products = structuredClone(mockProducts);

const clone = (value) => structuredClone(value);
const makeId = (prefix) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
const findById = (items, id) =>
  items.find((item) => item.id === id || item.slug === id);

const withCategory = (product) => ({
  ...product,
  category:
    categories.find((category) => category.id === product.categoryId) ||
    product.category,
});

export async function getAnalyticsOverview() {
  return clone(mockAnalyticsOverview);
}

export async function getCategories() {
  return clone(
    categories.map((category) => ({
      ...category,
      _count: {
        products: products.filter(
          (product) => product.categoryId === category.id,
        ).length,
      },
    })),
  );
}

export async function createCategory(payload) {
  const category = {
    id: makeId("cat"),
    sortOrder: categories.length + 1,
    ...payload,
  };
  categories = [...categories, category];
  return clone(category);
}

export async function updateCategory(id, payload) {
  categories = categories.map((category) =>
    category.id === id ? { ...category, ...payload } : category,
  );
  return clone(findById(categories, id));
}

export async function deleteCategory(id) {
  categories = categories.filter((category) => category.id !== id);
  return { success: true };
}

export async function reorderCategories(ids) {
  categories = ids.map((id, index) => ({
    ...findById(categories, id),
    sortOrder: index + 1,
  }));
  return clone(categories);
}

export async function getLocations() {
  return clone(locations);
}

export async function createLocation(payload) {
  const location = { id: makeId("loc"), ...payload };
  locations = [...locations, location];
  return clone(location);
}

export async function updateLocation(id, payload) {
  locations = locations.map((location) =>
    location.id === id ? { ...location, ...payload } : location,
  );
  return clone(findById(locations, id));
}

export async function deleteLocation(id) {
  locations = locations.filter((location) => location.id !== id);
  return { success: true };
}

export async function toggleLocationStatus(id) {
  locations = locations.map((location) =>
    location.id === id ? { ...location, isOpen: !location.isOpen } : location,
  );
  return clone(findById(locations, id));
}

export async function getProducts() {
  return clone(products.map(withCategory));
}

export async function createProduct(payload) {
  const product = {
    id: makeId("prod"),
    slug:
      payload.slug ||
      payload.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    price: payload.basePrice,
    ...payload,
  };
  products = [...products, product];
  return clone(withCategory(product));
}

export async function updateProduct(id, payload) {
  products = products.map((product) =>
    product.id === id ? { ...product, ...payload } : product,
  );
  return clone(withCategory(findById(products, id)));
}

export async function toggleProductAvailability(id, isAvailable) {
  return updateProduct(id, { isAvailable });
}

export async function toggleProductFeatured(id, isFeatured) {
  return updateProduct(id, { isFeatured });
}

export async function deleteProduct(id) {
  products = products.filter((product) => product.id !== id);
  return { success: true };
}

export async function getOptionGroups() {
  return clone(optionGroups);
}

export async function createOptionGroup(payload) {
  const group = { id: makeId("opt"), ...payload };
  optionGroups = [...optionGroups, group];
  return clone(group);
}

export async function updateProductOptionGroups(productId, groupIds) {
  products = products.map((product) =>
    product.id === productId
      ? {
          ...product,
          optionGroups: groupIds.map((id) => ({ optionGroupId: id })),
        }
      : product,
  );
  return clone(findById(products, productId));
}

export async function getOrders() {
  return clone(orders);
}

export async function getOrderById(id) {
  return clone(findById(orders, id) || null);
}

export async function trackOrderByNumber(orderNumber) {
  return clone(
    orders.find((order) => order.orderNumber === orderNumber) || null,
  );
}

export async function updateOrderStatus(id, status) {
  orders = orders.map((order) =>
    order.id === id ? { ...order, status } : order,
  );
  return clone(findById(orders, id));
}
