"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import SidebarFilters from "../filters/SidebarFilters";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// ✅ TYPES
type Product = {
  id: string;
  name: string;
  price: number;
  category?: string;
};

type FilterType = {
  category?: string;
  price?: number;
};

export default function ProductGrid() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>({});
  const [sort, setSort] = useState("latest");
  const [showFilters, setShowFilters] = useState(false);

  // ✅ API
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const activeFiltersCount = Object.values(filter).filter(Boolean).length;

  // ✅ FILTER + SORT (FINAL FIXED)
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // SEARCH
    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // CATEGORY
    if (filter.category) {
      result = result.filter((p) => p.category === filter.category);
    }

    // 🔥 FINAL FIX (NO TS ERROR)
    const maxPrice = filter.price;
    if (maxPrice !== undefined) {
      result = result.filter((p) => p.price <= maxPrice);
    }

    // SORT
    if (sort === "priceLow") {
      return [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "priceHigh") {
      return [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, search, filter, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Featured Products</h1>
          <p className="text-sm text-gray-500 mt-1">
            {filteredProducts.length} products found
          </p>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* SEARCH */}
          <div className="relative flex-1 md:w-72">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              placeholder="Search products..."
              className="w-full pl-10 pr-4 h-10 rounded-full bg-gray-100 border 
              focus:bg-white focus:ring-2 focus:ring-blue-500/30 outline-none transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* FILTER */}
          <button
            onClick={() => setShowFilters(true)}
            className="relative flex items-center gap-2 px-4 h-10 rounded-lg border bg-white shadow-sm text-sm hover:bg-gray-50 active:scale-95 transition"
          >
            <SlidersHorizontal size={16} />
            <span className="hidden md:inline">Filters</span>

            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs px-1.5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* SORT */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-10 px-3 rounded-lg border bg-white text-sm"
          >
            <option value="latest">Latest</option>
            <option value="priceLow">Price ↑</option>
            <option value="priceHigh">Price ↓</option>
          </select>
        </div>
      </div>

      {/* PRODUCTS */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 animate-pulse rounded-2xl"
            />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg font-medium text-gray-700">
            No products found 😕
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* FILTER DRAWER */}
      <div
        className={`fixed inset-0 z-50 ${showFilters ? "visible" : "invisible"}`}
      >
        <div
          onClick={() => setShowFilters(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${
            showFilters ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`absolute left-0 top-0 h-full w-80 md:w-96 bg-white shadow-2xl p-5 
          transform transition-transform duration-300 ease-out
          ${showFilters ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={() => setShowFilters(false)}>
              <X size={20} />
            </button>
          </div>

          {/* ✅ TYPE SAFE */}
          <SidebarFilters
            setFilter={(f: FilterType) => {
              setFilter(f);
              setShowFilters(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
