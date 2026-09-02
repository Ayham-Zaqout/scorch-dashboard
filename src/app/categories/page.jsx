"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, FolderTree, ImageIcon, MoreVertical, Pencil, Plus, Trash2, X } from "lucide-react";
import { getCategories, createCategory, updateCategory, deleteCategory, reorderCategories } from "@/data/mockDataStore";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [name, setName] = useState("");
  const [formError, setFormError] = useState("");

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      const formatted = (Array.isArray(data) ? data : []).map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        count: cat._count?.products || cat.products?.length || 0,
        image: cat.imageUrl || "",
      }));
      setCategories(formatted);
    } catch (e) {
      // API handle
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openForm = (category = null) => {
    setEditing(category || {});
    setName(category?.name || "");
    setFormError("");
    setActiveMenu(null);
  };

  const save = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setFormError("Category name cannot be empty or whitespace.");
      return;
    }

    try {
      const slug = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      if (editing?.id) {
        await updateCategory(editing.id, { name: trimmed, slug });
      } else {
        await createCategory({ name: trimmed, slug });
      }
      await loadCategories();
      setEditing(null);
    } catch (e) {
      setFormError(e?.response?.data?.message || "Failed to save category.");
    }
  };

  const handleDelete = async () => {
    if (!deleting?.id) return;
    try {
      await deleteCategory(deleting.id);
      await loadCategories();
    } catch (e) {
      // Handle error
    }
    setDeleting(null);
  };

  const move = async (index, direction) => {
    const next = [...categories]; const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setCategories(next);
    setActiveMenu(null);
    try {
      await reorderCategories(next.map((c) => c.id));
    } catch (e) {
      // Handle error
    }
  };

  return <div className="space-y-7">
    <header className="flex flex-wrap items-start justify-between gap-4"><div><h1 className="text-2xl font-bold tracking-tight text-ink-900">Categories</h1><p className="mt-2 text-sm text-ink-500">Organize your menu into categories.</p></div><button onClick={() => openForm()} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-orange-500 px-4 text-sm font-medium text-white transition hover:bg-orange-600"><Plus size={18} /> Add category</button></header>
    {loading ? <div className="p-8 text-center text-ink-500">Loading categories...</div> : !categories.length ? <div className="flex flex-col items-center rounded-xl border border-ink-200 bg-white px-4 py-16 text-center"><div className="mb-4 rounded-2xl bg-ink-100 p-4 text-ink-400"><FolderTree size={28} /></div><h2 className="font-semibold text-ink-900">No categories yet</h2><p className="mt-1 text-sm text-ink-500">Create categories to organize your menu products.</p></div> : <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{categories.map((category, index) => <article key={category.id} className="group overflow-visible rounded-xl border border-ink-200 bg-white shadow-xs"><div className="relative aspect-video overflow-visible rounded-t-xl bg-ink-100">{category.image ? <img src={category.image} alt={category.name} className="h-full w-full rounded-t-xl object-cover" /> : <div className="flex h-full items-center justify-center text-ink-400"><ImageIcon size={30} /></div>}<span className="absolute bottom-2 left-2 rounded-md bg-white/90 px-2 py-1 text-xs font-medium text-ink-700">#{index + 1}</span><div className="absolute right-2 top-2"><button onClick={() => setActiveMenu(activeMenu === category.id ? null : category.id)} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-white/90 text-ink-600 shadow-sm hover:text-ink-900"><MoreVertical size={17} /></button>{activeMenu === category.id && <div className="absolute right-0 top-full z-20 mt-1 w-36 overflow-hidden rounded-lg border border-ink-200 bg-white py-1 shadow-lg"><button onClick={() => openForm(category)} className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm text-ink-700 hover:bg-ink-50"><Pencil size={15} /> Edit</button><button disabled={!index} onClick={() => move(index, -1)} className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm text-ink-700 hover:bg-ink-50 disabled:cursor-not-allowed disabled:opacity-40"><ArrowUp size={15} /> Move up</button><button disabled={index === categories.length - 1} onClick={() => move(index, 1)} className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm text-ink-700 hover:bg-ink-50 disabled:cursor-not-allowed disabled:opacity-40"><ArrowDown size={15} /> Move down</button><button onClick={() => { setDeleting(category); setActiveMenu(null); }} className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"><Trash2 size={15} /> Delete</button></div>}</div></div><div className="flex items-center justify-between p-4"><h2 className="font-semibold text-ink-900">{category.name}</h2><span className="rounded-md border border-ink-200 bg-ink-50 px-2 py-1 text-xs font-medium text-ink-600">{category.count} products</span></div></article>)}</div>}
    {editing && <div className="fixed inset-0 z-50 flex items-center justify-center p-4"><button aria-label="Close" onClick={() => setEditing(null)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" /><div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl"><div className="flex items-center justify-between border-b border-ink-100 px-6 py-4"><h2 className="font-semibold text-ink-900">{editing.id ? "Edit category" : "New category"}</h2><button onClick={() => setEditing(null)} className="cursor-pointer text-ink-400 hover:text-ink-900"><X size={20} /></button></div><div className="p-6">{formError && <div className="mb-3 rounded-lg bg-red-50 border border-red-200 p-3 text-xs text-red-700">{formError}</div>}<label className="text-sm font-medium text-ink-700">Category name<input autoFocus value={name} onChange={(event) => { setName(event.target.value); setFormError(""); }} onKeyDown={(event) => event.key === "Enter" && save()} placeholder="e.g. Burgers" className="mt-1.5 h-10 w-full rounded-lg border border-ink-200 px-3 text-sm outline-none focus:border-blue-300" /></label></div><div className="flex justify-end gap-3 border-t border-ink-100 bg-gray-50 px-6 py-4 rounded-b-2xl"><button onClick={() => setEditing(null)} className="h-10 cursor-pointer rounded-lg border border-ink-200 bg-white px-4 text-sm font-medium text-ink-700">Cancel</button><button onClick={save} className="h-10 cursor-pointer rounded-lg bg-orange-500 px-4 text-sm font-medium text-white hover:bg-orange-600">{editing.id ? "Save changes" : "Create category"}</button></div></div></div>}
    {deleting && <div className="fixed inset-0 z-50 flex items-center justify-center p-4"><button aria-label="Close" onClick={() => setDeleting(null)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" /><div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"><h2 className="text-lg font-semibold text-ink-900">Delete category</h2><p className="mt-2 text-sm text-ink-500">Are you sure you want to delete <b className="text-ink-800">{deleting.name}</b>?</p><div className="mt-5 flex justify-end gap-3"><button onClick={() => setDeleting(null)} className="h-10 cursor-pointer rounded-lg border border-ink-200 px-4 text-sm font-medium text-ink-700">Cancel</button><button onClick={handleDelete} className="h-10 cursor-pointer rounded-lg bg-red-500 px-4 text-sm font-medium text-white hover:bg-red-600">Delete</button></div></div></div>}
  </div>;
}