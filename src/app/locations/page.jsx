"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, ImagePlus, MapPin, MoreVertical, Pencil, Phone, Plus, Trash2, X } from "lucide-react";
import { getLocations, createLocation, updateLocation, deleteLocation, toggleLocationStatus } from "@/data/mockDataStore";

const emptyLocation = { name: "", addressLine: "", city: "", phone: "", openingHours: "10:00 AM – 11:00 PM", imageUrl: "", isOpen: true };

export default function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyLocation);
  const [editingId, setEditingId] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const fileInput = useRef(null);

  const loadLocations = async () => {
    try {
      setLoading(true);
      const data = await getLocations();
      const formatted = (Array.isArray(data) ? data : []).map((loc) => ({
        id: loc.id,
        name: loc.name,
        address: loc.addressLine || loc.address || "",
        city: loc.city || "",
        phone: loc.phone || "",
        hours: typeof loc.openingHours === "string" ? loc.openingHours : loc.openingHours?.weekday || "10:00 AM – 11:00 PM",
        isOpen: loc.isOpen ?? true,
        image: loc.imageUrl || "",
      }));
      setLocations(formatted);
    } catch (e) {
      // API handle
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const editingLocation = locations.find((location) => location.id === editingId);
  const deletingLocation = locations.find((location) => location.id === deleteId);

  function showNotice(message) { setNotice(message); window.setTimeout(() => setNotice(""), 2800); }
  function openAdd() { setForm(emptyLocation); setEditingId(null); setModalOpen(true); }
  function openEdit(location) {
    setForm({
      name: location.name,
      addressLine: location.address,
      city: location.city || "San Francisco, CA",
      phone: location.phone,
      openingHours: location.hours,
      imageUrl: location.image,
      isOpen: location.isOpen,
    });
    setEditingId(location.id);
    setMenuId(null);
    setModalOpen(true);
  }
  function closeModal() { setModalOpen(false); setEditingId(null); setForm(emptyLocation); }
  function updateField(field, value) { setForm((current) => ({ ...current, [field]: value })); }
  function handleImage(event) {
    const file = event.target.files?.[0]; if (!file) return;
    if (file.size > 5 * 1024 * 1024) { showNotice("Please choose an image smaller than 5MB."); return; }
    const reader = new FileReader(); reader.onload = () => updateField("imageUrl", reader.result); reader.readAsDataURL(file);
  }

  async function saveLocation(event) {
    event.preventDefault();
    if (!form.name.trim()) { showNotice("Location name is required."); return; }
    const slug = form.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const payload = {
      name: form.name.trim(),
      slug,
      addressLine: form.addressLine || "Main Street",
      city: form.city || "San Francisco, CA",
      phone: form.phone || "+1 (415) 555-0100",
      openingHours: form.openingHours || "10:00 AM – 11:00 PM",
      imageUrl: form.imageUrl || null,
      isOpen: form.isOpen,
    };

    try {
      if (editingId) {
        await updateLocation(editingId, payload);
        showNotice("Location updated successfully.");
      } else {
        await createLocation(payload);
        showNotice("Location added successfully.");
      }
      await loadLocations();
    } catch (e) {
      showNotice("Error saving location.");
    }
    closeModal();
  }

  async function confirmDelete() {
    if (!deleteId) return;
    try {
      await deleteLocation(deleteId);
      await loadLocations();
      showNotice("Location deleted successfully.");
    } catch (e) {
      showNotice("Error deleting location.");
    }
    setDeleteId(null);
  }

  return <div className="space-y-7">
    <header className="flex flex-wrap items-start justify-between gap-4"><div><h1 className="text-2xl font-bold tracking-tight text-ink-900">Locations</h1><p className="mt-2 text-sm text-ink-500">Manage your restaurant branches and their availability.</p></div><button onClick={openAdd} className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600"><Plus size={18} /> Add location</button></header>
    {loading ? <div className="p-8 text-center text-ink-500">Loading locations...</div> : locations.length ? <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">{locations.map((location) => <article key={location.id} className="overflow-visible rounded-xl border border-ink-200 bg-white shadow-xs"><div className="relative aspect-[16/9] overflow-hidden rounded-t-xl bg-ink-100">{location.image ? <img src={location.image} alt={location.name} className="h-full w-full object-cover" /> : <MapPin className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 text-ink-400" />}<span className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold ${location.isOpen ? "bg-success-50 text-success-700" : "bg-danger-50 text-danger-600"}`}><i className="h-1.5 w-1.5 rounded-full bg-current" />{location.isOpen ? "Open" : "Closed"}</span><div className="absolute right-3 top-3"><button aria-label={`Actions for ${location.name}`} onClick={() => setMenuId(menuId === location.id ? null : location.id)} className="grid h-8 w-8 place-items-center rounded-lg bg-white/95 text-ink-600 shadow-sm backdrop-blur transition hover:text-ink-900"><MoreVertical size={18} /></button>{menuId === location.id && <div className="absolute right-0 top-10 z-10 w-36 rounded-lg border border-ink-200 bg-white p-1 shadow-lg"><button onClick={() => openEdit(location)} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-ink-700 hover:bg-ink-50"><Pencil size={15} /> Edit</button><button onClick={() => { setMenuId(null); setDeleteId(location.id); }} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-danger-600 hover:bg-danger-50"><Trash2 size={15} /> Delete</button></div>}</div></div><div className="space-y-3 p-5"><h2 className="text-base font-semibold text-ink-900">{location.name}</h2><LocationDetail icon={MapPin} text={location.address} /><LocationDetail icon={Phone} text={location.phone || "No phone number"} /><LocationDetail icon={Clock} text={location.hours || "Hours not set"} /></div></article>)}</section> : <div className="rounded-xl border border-dashed border-ink-300 bg-white px-6 py-20 text-center"><MapPin className="mx-auto h-9 w-9 text-ink-400" /><h2 className="mt-4 font-semibold text-ink-900">No locations yet</h2><p className="mt-1 text-sm text-ink-500">Add your first restaurant branch to start managing it.</p><button onClick={openAdd} className="mt-5 text-sm font-semibold text-brand-600 hover:text-brand-700">Add location</button></div>}
    {notice && <div role="status" className="fixed bottom-5 right-5 z-30 rounded-lg bg-ink-900 px-4 py-3 text-sm font-medium text-white shadow-lg">{notice}</div>}
    {modalOpen && <Modal title={editingLocation ? "Edit location" : "New location"} onClose={closeModal}><form onSubmit={saveLocation} className="space-y-5"><div><label className="mb-1.5 block text-sm font-medium text-ink-700">Location image</label><div className="relative overflow-hidden rounded-xl border-2 border-dashed border-ink-200 bg-ink-50">{form.imageUrl ? <><img src={form.imageUrl} alt="Location preview" className="h-40 w-full object-cover" /><button type="button" onClick={() => updateField("imageUrl", "")} className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-lg bg-white/90 text-danger-600 shadow-sm"><X size={16} /></button></> : <button type="button" onClick={() => fileInput.current?.click()} className="flex w-full flex-col items-center py-8 text-center"><span className="grid h-10 w-10 place-items-center rounded-lg border border-ink-200 bg-white text-ink-500"><ImagePlus size={20} /></span><span className="mt-2 text-sm font-medium text-ink-700">Click to upload an image</span><span className="mt-1 text-xs text-ink-400">PNG or JPG, up to 5MB</span></button>}<input ref={fileInput} onChange={handleImage} accept="image/*" type="file" className="hidden" /></div></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Location name" value={form.name} onChange={(value) => updateField("name", value)} placeholder="e.g. Downtown" required /><Field label="Phone" value={form.phone} onChange={(value) => updateField("phone", value)} placeholder="+1 (415) 555-0100" /><div className="sm:col-span-2"><Field label="Address" value={form.addressLine} onChange={(value) => updateField("addressLine", value)} placeholder="Street, city, ZIP" /></div><Field label="Opening hours" value={form.openingHours} onChange={(value) => updateField("openingHours", value)} placeholder="10:00 AM – 11:00 PM" /><label className="flex items-end gap-3 pb-2 text-sm font-medium text-ink-700"><input checked={form.isOpen} onChange={(event) => updateField("isOpen", event.target.checked)} type="checkbox" className="h-4 w-4 accent-[#ff5a1f]" /> Location is open</label></div><div className="flex justify-end gap-3 border-t border-ink-100 pt-5"><button type="button" onClick={closeModal} className="h-10 rounded-lg border border-ink-200 px-4 text-sm font-semibold text-ink-700 hover:bg-ink-50">Cancel</button><button type="submit" className="h-10 rounded-lg bg-brand-500 px-4 text-sm font-semibold text-white hover:bg-brand-600">{editingLocation ? "Save changes" : "Add location"}</button></div></form></Modal>}
    {deletingLocation && <Modal title="Delete location" onClose={() => setDeleteId(null)} small><p className="text-sm leading-6 text-ink-600">Are you sure you want to delete <strong className="font-semibold text-ink-900">{deletingLocation.name}</strong>? This action cannot be undone.</p><div className="mt-6 flex justify-end gap-3"><button onClick={() => setDeleteId(null)} className="h-10 rounded-lg border border-ink-200 px-4 text-sm font-semibold text-ink-700 hover:bg-ink-50">Cancel</button><button onClick={confirmDelete} className="h-10 rounded-lg bg-danger-600 px-4 text-sm font-semibold text-white hover:bg-danger-700">Delete</button></div></Modal>}
  </div>;
}

function LocationDetail({ icon: Icon, text }) { return <p className="flex items-start gap-2 text-sm text-ink-600"><Icon size={16} className="mt-0.5 shrink-0 text-ink-400" /><span>{text}</span></p>; }
function Field({ label, value, onChange, placeholder, required = false }) { return <label className="block text-sm font-medium text-ink-700">{label}<input value={value} required={required} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-1.5 h-10 w-full rounded-lg border border-ink-200 px-3 text-sm font-normal text-ink-800 outline-none placeholder:text-ink-400 focus:border-brand-300 focus:ring-2 focus:ring-brand-500/10" /></label>; }
function Modal({ title, children, onClose, small = false }) { return <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-40 flex items-center justify-center bg-ink-900/45 p-4 backdrop-blur-sm"><div className={`w-full ${small ? "max-w-md" : "max-w-2xl"} max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-xl`}><div className="flex items-center justify-between border-b border-ink-100 px-6 py-4"><h2 className="text-lg font-semibold text-ink-900">{title}</h2><button onClick={onClose} aria-label="Close" className="text-ink-400 hover:text-ink-900"><X size={20} /></button></div><div className="p-6">{children}</div></div></div>; }
