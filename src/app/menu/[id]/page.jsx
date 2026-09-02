"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Plus, X, Upload, Check } from "lucide-react";
import {
  getCategories,
  createProduct,
  updateProduct,
  getProducts,
  getOptionGroups,
  createOptionGroup,
  updateProductOptionGroups,
} from "@/data/mockDataStore";

export default function ProductEditorPage() {
  const router = useRouter();
  const { id } = useParams();
  const isNew = id === "new";
  const fileInputRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [availableOptionGroups, setAvailableOptionGroups] = useState([]);
  const [selectedGroupIds, setSelectedGroupIds] = useState([]);

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState("");

  // Product fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [calories, setCalories] = useState("");
  const [prepMinutes, setPrepMinutes] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [available, setAvailable] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  // New Option Group modal/form state
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupType, setNewGroupType] = useState("SINGLE");
  const [newGroupOptions, setNewGroupOptions] = useState([
    { name: "", priceModifier: 0 },
  ]);

  useEffect(() => {
    const loadInitData = async () => {
      try {
        const [cats, groups] = await Promise.all([
          getCategories().catch(() => []),
          getOptionGroups().catch(() => []),
        ]);
        const validCats = Array.isArray(cats) ? cats : [];
        setCategories(validCats);
        if (validCats.length > 0 && !categoryId) {
          setCategoryId(validCats[0].id);
        }
        setAvailableOptionGroups(Array.isArray(groups) ? groups : []);

        if (!isNew && id) {
          setLoading(true);
          const allProds = await getProducts().catch(() => []);
          const prod = (Array.isArray(allProds) ? allProds : []).find(
            (p) => p.id === id || p.slug === id
          );
          if (prod) {
            setName(prod.name || "");
            setDescription(prod.description || "");
            setBasePrice(prod.basePrice || prod.price || "");
            setCalories(prod.calories || "");
            setPrepMinutes(prod.prepMinutes || "");
            setCategoryId(prod.categoryId || prod.category?.id || (validCats[0]?.id || ""));
            setImageUrl(prod.imageUrl || "");
            setAvailable(prod.isAvailable ?? true);
            setFeatured(prod.isFeatured ?? false);
            setTags(Array.isArray(prod.tags) ? prod.tags : []);

            if (Array.isArray(prod.optionGroups)) {
              setSelectedGroupIds(prod.optionGroups.map((og) => og.optionGroupId || og.id));
            }
          }
        }
      } catch (e) {
        setError("Failed to load initial data");
      } finally {
        setLoading(false);
      }
    };

    loadInitData();
  }, [id, isNew]);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      return setError("Image file must be smaller than 5MB.");
    }

    try {
      setUploadingImage(true);
      setError("");
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImageUrl(reader.result);
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setUploadingImage(false);
    }
  };

  const toggleGroupSelection = (groupId) => {
    if (selectedGroupIds.includes(groupId)) {
      setSelectedGroupIds(selectedGroupIds.filter((gid) => gid !== groupId));
    } else {
      setSelectedGroupIds([...selectedGroupIds, groupId]);
    }
  };

  const handleCreateOptionGroup = async (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    const validOptions = newGroupOptions
      .filter((opt) => opt.name.trim())
      .map((opt) => ({
        name: opt.name.trim(),
        priceModifier: Number(opt.priceModifier) || 0,
      }));

    try {
      const created = await createOptionGroup({
        name: newGroupName.trim(),
        selectionType: newGroupType,
        options: validOptions,
      });

      if (created) {
        setAvailableOptionGroups([...availableOptionGroups, created]);
        setSelectedGroupIds([...selectedGroupIds, created.id]);
        setShowAddGroup(false);
        setNewGroupName("");
        setNewGroupOptions([{ name: "", priceModifier: 0 }]);
      }
    } catch (err) {
      setError("Failed to create option group.");
    }
  };

  const addOptionRow = () => {
    setNewGroupOptions([...newGroupOptions, { name: "", priceModifier: 0 }]);
  };

  const updateOptionRow = (index, field, value) => {
    const updated = [...newGroupOptions];
    updated[index][field] = value;
    setNewGroupOptions(updated);
  };

  const addTag = () => {
    const val = tagInput.trim();
    if (val && !tags.includes(val)) {
      setTags([...tags, val]);
    }
    setTagInput("");
  };

  const removeTag = (tToRemove) => {
    setTags(tags.filter((t) => t !== tToRemove));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedName = name.trim();
    const trimmedDesc = description.trim();

    if (!trimmedName) return setError("Product name cannot be empty.");
    if (!trimmedDesc) return setError("Description cannot be empty.");
    if (!basePrice || isNaN(Number(basePrice)) || Number(basePrice) <= 0)
      return setError("Please enter a valid price.");
    if (!categoryId) return setError("Please select a category.");

    try {
      setSaving(true);
      const payload = {
        name: trimmedName,
        description: trimmedDesc,
        basePrice: Number(basePrice),
        categoryId,
        calories: calories ? Number(calories) : null,
        prepMinutes: prepMinutes ? Number(prepMinutes) : null,
        tags,
        isAvailable: available,
        isFeatured: featured,
        imageUrl: imageUrl.trim() || null,
      };

      let prodId = id;
      if (isNew) {
        const createdProd = await createProduct(payload);
        prodId = createdProd.id;
      } else {
        await updateProduct(id, payload);
      }

      if (prodId && selectedGroupIds.length > 0) {
        await updateProductOptionGroups(prodId, selectedGroupIds).catch(() => { });
      }

      router.push("/menu");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save product.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-ink-500 font-medium">
        Loading product editor...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => router.push("/menu")}
        className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-ink-500 hover:text-ink-900"
      >
        <ArrowLeft size={17} /> Back to menu
      </button>

      <form onSubmit={handleSave}>
        <header className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h1 className="text-2xl font-bold text-ink-900">
            {isNew ? "New product" : "Edit product"}
          </h1>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => router.push("/menu")}
              className="h-10 cursor-pointer rounded-lg border border-ink-200 bg-white px-4 text-sm font-medium text-ink-700 hover:bg-ink-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploadingImage}
              className="h-10 cursor-pointer rounded-lg bg-orange-500 px-5 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save product"}
            </button>
          </div>
        </header>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Sidebar Settings */}
          <aside className="space-y-6">
            <section className="rounded-xl border border-ink-200 bg-white p-5 shadow-xs">
              <h2 className="mb-3 font-semibold text-ink-900">Product Image (Cloudinary)</h2>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                className="mb-3 w-full h-10 border border-dashed border-orange-300 bg-orange-50/50 hover:bg-orange-50 text-orange-600 rounded-lg text-sm font-medium flex items-center justify-center gap-2 cursor-pointer transition disabled:opacity-50"
              >
                <Upload size={16} />
                {uploadingImage ? "Uploading to Cloudinary..." : "Choose Image File"}
              </button>

              <div className="text-xs text-ink-400 mb-2">Or Image URL:</div>
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://res.cloudinary.com/..."
                className="h-10 w-full rounded-lg border border-ink-200 px-3 text-sm outline-none focus:border-blue-300"
              />

              {imageUrl && (
                <div className="mt-3 aspect-video w-full overflow-hidden rounded-lg border border-ink-100 bg-gray-50">
                  <img src={imageUrl} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}
            </section>

            <section className="rounded-xl border border-ink-200 bg-white p-5 shadow-xs space-y-4">
              <h2 className="font-semibold text-ink-900">Status & Availability</h2>
              <label className="flex cursor-pointer items-center justify-between text-sm text-ink-700">
                <span>Available for order</span>
                <input
                  type="checkbox"
                  checked={available}
                  onChange={(e) => setAvailable(e.target.checked)}
                  className="h-4 w-4 rounded accent-orange-500 cursor-pointer"
                />
              </label>
              <label className="flex cursor-pointer items-center justify-between border-t border-ink-100 pt-4 text-sm text-ink-700">
                <span>Featured item</span>
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="h-4 w-4 rounded accent-orange-500 cursor-pointer"
                />
              </label>
            </section>
          </aside>

          {/* Main Info */}
          <main className="lg:col-span-2 space-y-6">
            <section className="rounded-xl border border-ink-200 bg-white p-5 shadow-xs">
              <h2 className="mb-4 font-semibold text-ink-900">Basic Information</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-ink-700 mb-1">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Scorch Double Fire Burger"
                    className="h-10 w-full rounded-lg border border-ink-200 px-3 text-sm outline-none focus:border-blue-300"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-ink-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Delicious juicy patty topped with house special sauce..."
                    className="w-full rounded-lg border border-ink-200 p-3 text-sm outline-none focus:border-blue-300 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    placeholder="12.99"
                    className="h-10 w-full rounded-lg border border-ink-200 px-3 text-sm outline-none focus:border-blue-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="h-10 w-full rounded-lg border border-ink-200 bg-white px-3 text-sm outline-none focus:border-blue-300"
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1">
                    Calories
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    placeholder="e.g. 750"
                    className="h-10 w-full rounded-lg border border-ink-200 px-3 text-sm outline-none focus:border-blue-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1">
                    Prep Time (minutes)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={prepMinutes}
                    onChange={(e) => setPrepMinutes(e.target.value)}
                    placeholder="e.g. 12"
                    className="h-10 w-full rounded-lg border border-ink-200 px-3 text-sm outline-none focus:border-blue-300"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-ink-700 mb-1">
                    Tags
                  </label>
                  <div className="flex gap-2">
                    <input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                      placeholder="Add tag and press Enter"
                      className="h-10 flex-1 rounded-lg border border-ink-200 px-3 text-sm outline-none focus:border-blue-300"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="h-10 w-10 inline-flex items-center justify-center rounded-lg border border-ink-200 text-ink-600 hover:bg-gray-50 cursor-pointer"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  {tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {tags.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-ink-700"
                        >
                          {t}
                          <button
                            type="button"
                            onClick={() => removeTag(t)}
                            className="text-ink-400 hover:text-red-600 cursor-pointer"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Product Options Section */}
            <section className="rounded-xl border border-ink-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-ink-100 pb-3 mb-4">
                <div>
                  <h2 className="font-semibold text-ink-900">Product Customization Options</h2>
                  <p className="mt-0.5 text-xs text-ink-400">
                    Attach option groups (e.g. Size, Heat Level, Extras) to this product.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddGroup(true)}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-orange-200 bg-orange-50 px-3 text-xs font-medium text-orange-600 hover:bg-orange-100 cursor-pointer"
                >
                  <Plus size={15} /> Create Option Group
                </button>
              </div>

              {!availableOptionGroups.length ? (
                <div className="py-6 text-center text-xs text-ink-400">
                  No option groups configured yet. Click &quot;Create Option Group&quot; above to add options.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {availableOptionGroups.map((group) => {
                    const isSelected = selectedGroupIds.includes(group.id);
                    return (
                      <div
                        key={group.id}
                        onClick={() => toggleGroupSelection(group.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition ${isSelected
                          ? "border-orange-500 bg-orange-50/40 text-orange-900"
                          : "border-ink-200 bg-white hover:border-gray-300"
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <strong className="text-sm font-semibold">{group.name}</strong>
                          <span
                            className={`h-5 w-5 rounded-md flex items-center justify-center border text-xs ${isSelected
                              ? "bg-orange-500 border-orange-500 text-white"
                              : "border-ink-300 bg-white"
                              }`}
                          >
                            {isSelected && <Check size={14} />}
                          </span>
                        </div>
                        <p className="text-xs text-ink-400 mt-1">
                          Type: {group.selectionType} • {group.options?.length || 0} choices
                        </p>
                        {group.options && group.options.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {group.options.map((opt) => (
                              <span
                                key={opt.id || opt.name}
                                className="inline-block rounded bg-white px-2 py-0.5 text-[11px] font-medium border border-ink-100 text-ink-700"
                              >
                                {opt.name} {Number(opt.priceModifier) > 0 ? `(+$${opt.priceModifier})` : ""}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </main>
        </div>
      </form>

      {/* Modal for Creating New Option Group */}
      {showAddGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setShowAddGroup(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-ink-100 pb-3">
              <h2 className="text-lg font-semibold text-ink-900">New Option Group</h2>
              <button
                type="button"
                onClick={() => setShowAddGroup(false)}
                className="text-ink-400 hover:text-ink-900 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateOptionGroup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1">
                  Group Name (e.g. Size, Crust, Extras)
                </label>
                <input
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="e.g. Patty Size"
                  className="h-10 w-full rounded-lg border border-ink-200 px-3 text-sm outline-none focus:border-blue-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1">Selection Type</label>
                <select
                  value={newGroupType}
                  onChange={(e) => setNewGroupType(e.target.value)}
                  className="h-10 w-full rounded-lg border border-ink-200 bg-white px-3 text-sm outline-none"
                >
                  <option value="SINGLE">Single Selection (Radio - Pick 1)</option>
                  <option value="MULTIPLE">Multiple Selection (Checkbox - Pick multiple)</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-ink-700">Options / Choices</label>
                  <button
                    type="button"
                    onClick={addOptionRow}
                    className="text-xs text-orange-600 font-semibold cursor-pointer"
                  >
                    + Add Choice
                  </button>
                </div>
                <div className="space-y-2">
                  {newGroupOptions.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        value={opt.name}
                        onChange={(e) => updateOptionRow(idx, "name", e.target.value)}
                        placeholder="Choice name (e.g. Double Patty)"
                        className="h-9 flex-1 rounded-lg border border-ink-200 px-3 text-xs outline-none"
                      />
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={opt.priceModifier}
                        onChange={(e) => updateOptionRow(idx, "priceModifier", e.target.value)}
                        placeholder="Extra ($)"
                        className="h-9 w-24 rounded-lg border border-ink-200 px-3 text-xs outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-ink-100 pt-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddGroup(false)}
                  className="h-10 rounded-lg border border-ink-200 bg-white px-4 text-sm font-medium text-ink-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 rounded-lg bg-orange-500 px-5 text-sm font-medium text-white hover:bg-orange-600"
                >
                  Create & Select
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}