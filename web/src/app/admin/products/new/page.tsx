"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// ================= TYPES =================
type FormState = {
  name: string;
  price: string;
  category: string;
  image: File | null;
};

// ================= COMPONENT =================
export default function AddProductPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    name: "",
    price: "",
    category: "Processors",
    image: null,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= HANDLERS =================
  const handleChange = (key: keyof FormState, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (file: File | null) => {
    if (!file) return;

    handleChange("image", file);
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  // cleanup (important)
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // ================= VALIDATION =================
  const validate = () => {
    if (!form.name.trim()) return "Product name required";
    if (!form.price || Number(form.price) <= 0) return "Valid price required";
    return null;
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) return setError(validationError);

    setError("");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("category", form.category);

      if (form.image) {
        formData.append("image", form.image);
      }

      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Failed to create product");
      }

      // success
      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl border shadow-sm space-y-5">
        <h1 className="text-2xl font-semibold">Add Product</h1>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        {/* NAME */}
        <input
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full h-11 px-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* PRICE */}
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => handleChange("price", e.target.value)}
          className="w-full h-11 px-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* CATEGORY */}
        <select
          value={form.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="w-full h-11 px-3 border rounded-lg"
        >
          <option>Processors</option>
          <option>Sensors</option>
          <option>ICs</option>
          <option>Modules</option>
          <option>Networking</option>
        </select>

        {/* IMAGE */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
        />

        {/* PREVIEW */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border"
          />
        )}

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full h-11 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>
      </div>
    </div>
  );
}
