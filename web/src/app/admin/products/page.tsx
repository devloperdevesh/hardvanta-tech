"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ProductTable from "@/components/admin/ProductTable";
import { motion } from "framer-motion";

// ================= TYPES =================
type Product = {
  id: string;
  name: string;
  price: number;
  category: string; // ✅ FIXED (required)
  stock: number; // ✅ FIXED (required)
};

// ================= FETCHER =================
async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("/api/products?limit=50", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const json = await res.json();

  if (!json.success) {
    throw new Error(json.message || "Something went wrong");
  }

  // ✅ FULL NORMALIZATION (CRITICAL FIX)
  return json.data.products.map((p: any) => ({
    id: String(p.id),
    name: p.name ?? "Unnamed Product",
    price: Number(p.price ?? 0),
    category: p.category ?? "General", // 🔥 FIX
    stock: Number(p.stock ?? 0), // 🔥 FIX
  }));
}

// ================= COMPONENT =================
export default function AdminProductsPage() {
  const router = useRouter();

  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 2,
    retry: 2,
  });

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 🔥 HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Products</h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage and organize your inventory
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="px-4 h-10 rounded-lg border text-sm hover:bg-gray-100 transition disabled:opacity-50"
            >
              {isFetching ? "Refreshing..." : "Refresh"}
            </button>

            <button
              onClick={() => router.push("/admin/products/new")}
              className="px-5 h-10 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 shadow-sm transition"
            >
              + Add Product
            </button>
          </div>
        </motion.div>

        {/* 🔥 CARD */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border rounded-xl shadow-sm p-6"
        >
          {/* 🟡 Loading */}
          {isLoading && (
            <div className="space-y-4 animate-pulse">
              <div className="h-5 w-40 bg-gray-200 rounded" />
              <div className="h-64 bg-gray-100 rounded-lg" />
            </div>
          )}

          {/* 🔴 Error */}
          {isError && (
            <div className="text-center py-12">
              <p className="text-red-500 font-medium">
                {(error as Error)?.message}
              </p>

              <button
                onClick={() => refetch()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Retry
              </button>
            </div>
          )}

          {/* ⚪ Empty */}
          {!isLoading && !isError && products.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg font-medium text-gray-700">
                No products yet
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Start by adding your first product
              </p>

              <button
                onClick={() => router.push("/admin/products/new")}
                className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Add Product
              </button>
            </div>
          )}

          {/* 🟢 Table */}
          {!isLoading && !isError && products.length > 0 && (
            <ProductTable products={products} refresh={refetch} />
          )}
        </motion.div>
      </div>
    </div>
  );
}
