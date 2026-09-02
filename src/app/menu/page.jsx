"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, MoreVertical, Plus, Search, Star, UtensilsCrossed, X, Trash2, Power, ImageIcon, Pencil } from "lucide-react";
import {
  getProducts,
  getCategories,
  toggleProductAvailability,
  toggleProductFeatured,
  deleteProduct,
} from "@/data/mockDataStore";

export default function MenuPage() {
  const router = useRouter();
  const [productsList, setProductsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [catDropOpen, setCatDropOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [apiProds, apiCats] = await Promise.all([
        getProducts().catch(() => []),
        getCategories().catch(() => []),
      ]);

      const formattedProds = (Array.isArray(apiProds) ? apiProds : []).map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        categoryId: p.categoryId || p.category?.id,
        category: p.category?.name || "Uncategorized",
        price: Number(p.basePrice || p.price || 0).toFixed(2),
        calories: p.calories || 0,
        available: p.isAvailable ?? true,
        featured: p.isFeatured ?? false,
        image: p.imageUrl || null,
      }));

      setProductsList(formattedProds);
      setCategoriesList(Array.isArray(apiCats) ? apiCats : []);
    } catch (e) {
      // silent
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const catNames = ["All categories", ...categoriesList.map((c) => c.name)];

  const results = useMemo(() => {
    return productsList.filter((p) => {
      const matchQuery = !query || p.name.toLowerCase().includes(query.toLowerCase());
      const matchCat = category === "All categories" || p.category === category;
      return matchQuery && matchCat;
    });
  }, [productsList, query, category]);

  const handleToggleAvailability = async (product) => {
    try {
      await toggleProductAvailability(product.id, !product.available);
      await loadData();
    } catch (e) { }
    setActiveMenu(null);
  };

  const handleToggleFeatured = async (product) => {
    try {
      await toggleProductFeatured(product.id, !product.featured);
      await loadData();
    } catch (e) { }
    setActiveMenu(null);
  };

  const handleDeleteProduct = async (product) => {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    try {
      await deleteProduct(product.id);
      await loadData();
    } catch (e) { }
    setActiveMenu(null);
  };

  return (
    <div className="space-y-7">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-900">Menu</h1>
          <p className="mt-2 text-sm text-ink-500">Manage your products, pricing, and availability.</p>
        </div>
        <button
          onClick={() => router.push("/menu/new")}
          className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-orange-500 px-4 text-sm font-medium text-white transition hover:bg-orange-600"
        >
          <Plus size={18} />
          Add product
        </button>
      </header>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:w-80">
          <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="h-10 w-full rounded-lg border border-ink-200 bg-white py-2 pl-10 pr-9 text-sm outline-none placeholder:text-ink-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-500/10"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-ink-400">
              <X size={16} />
            </button>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setCatDropOpen(!catDropOpen)}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-ink-200 bg-white px-3.5 text-sm font-medium text-ink-700 hover:bg-ink-50"
          >
            {category}
            <ChevronDown size={16} />
          </button>
          {catDropOpen && (
            <div className="absolute left-0 top-full z-20 mt-2 min-w-44 rounded-lg border border-ink-200 bg-white p-1 shadow-lg">
              {catNames.map((item) => (
                <button
                  key={item}
                  onClick={() => { setCategory(item); setCatDropOpen(false); }}
                  className={`block w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm ${category === item ? "bg-orange-50 font-medium text-orange-600" : "text-ink-700 hover:bg-ink-50"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
        <p className="ml-auto text-sm text-ink-500">
          <b className="font-semibold text-ink-900">{results.length}</b> products
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-ink-200 bg-white shadow-xs">
        {loading ? (
          <div className="p-8 text-center text-ink-500">Loading products...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left">
              <thead className="border-b border-ink-200">
                <tr className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                  <th className="px-5 py-4">Product</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Availability</th>
                  <th className="px-5 py-4">Featured</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item) => (
                  <tr key={item.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/60">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {item.image ? (
                          <img src={item.image} alt="" className="h-11 w-11 rounded-lg object-cover" />
                        ) : (
                          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink-100 text-ink-400">
                            <ImageIcon size={18} />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-ink-900">{item.name}</p>
                          <p className="text-xs text-ink-500">{item.calories ? `${item.calories} cal` : "-"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-md border border-ink-200 bg-ink-50 px-2 py-1 text-xs font-medium text-ink-700">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-ink-900">${item.price}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium ${item.available
                            ? "border-green-100 bg-green-50 text-green-700"
                            : "border-red-100 bg-red-50 text-red-700"
                          }`}
                      >
                        <i className="h-1.5 w-1.5 rounded-full bg-current" />
                        {item.available ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {item.featured ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600">
                          <Star size={14} className="fill-amber-500" />
                          Featured
                        </span>
                      ) : (
                        <span className="text-ink-400">-</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right relative">
                      <button
                        onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
                        className="p-1 rounded hover:bg-ink-100 text-ink-500"
                      >
                        <MoreVertical size={18} />
                      </button>
                      {activeMenu === item.id && (
                        <div className="absolute right-5 top-full z-20 w-44 overflow-hidden rounded-lg border border-ink-200 bg-white py-1 shadow-lg text-left">
                          <button
                            onClick={() => router.push(`/menu/${item.id}`)}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-ink-700 hover:bg-ink-50"
                          >
                            <Pencil size={15} /> Edit Product
                          </button>
                          <button
                            onClick={() => handleToggleAvailability(item)}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-ink-700 hover:bg-ink-50"
                          >
                            <Power size={15} /> {item.available ? "Mark Unavailable" : "Mark Available"}
                          </button>
                          <button
                            onClick={() => handleToggleFeatured(item)}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-ink-700 hover:bg-ink-50"
                          >
                            <Star size={15} /> {item.featured ? "Remove Featured" : "Mark Featured"}
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(item)}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={15} /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && !results.length && (
          <div className="flex flex-col items-center px-4 py-16 text-center">
            <UtensilsCrossed size={28} className="mb-4 text-ink-400" />
            <p className="font-semibold text-ink-900">No products found</p>
            <p className="mt-1 text-sm text-ink-500">Try changing your search or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}