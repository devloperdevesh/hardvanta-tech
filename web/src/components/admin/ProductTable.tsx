"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

// ================= TYPES =================
type Product = {
  id: string | number;
  name: string;
  price: number;
  stock: number;
  category: string;
};

type Props = {
  products: Product[];
  refresh?: () => void;
};

// ================= COMPONENT =================
export default function ProductTable({ products, refresh }: Props) {
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [error, setError] = useState("");

  // ================= FILTER =================
  const filtered = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  // ================= DELETE =================
  async function handleDelete(id: string | number) {
    if (!confirm("Delete product?")) return;

    try {
      setDeletingId(id);
      setError("");

      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Delete failed");
      }

      refresh?.();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setDeletingId(null);
    }
  }

  // ================= UI =================
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5 space-y-4">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <input
          placeholder="Search products..."
          className="w-full md:w-80 px-4 py-2.5 border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="text-sm text-gray-500">
          Showing <b>{filtered.length}</b> of <b>{products.length}</b>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      {/* TABLE */}
      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3">Product</th>
              <th className="text-left px-4 py-3">Price</th>
              <th className="text-left px-4 py-3">Stock</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-400">
                  No products found
                </td>
              </tr>
            ) : (
              filtered.map((p, index) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium">{p.name}</td>

                  <td className="px-4 py-3">₹{p.price}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        p.stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {p.stock > 0 ? `${p.stock} in stock` : "Out"}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-gray-600">{p.category}</td>

                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg">
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(p.id)}
                        disabled={deletingId === p.id}
                        className="px-3 py-1.5 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                      >
                        {deletingId === p.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
