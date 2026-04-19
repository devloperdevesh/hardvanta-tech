"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SidebarFilters from "../filters/SidebarFilters";
import { Search } from "lucide-react";

export default function ProductGrid() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<any>({});
  const [sort, setSort] = useState("latest");

  // FETCH
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  // 🔥 DEBOUNCE SEARCH
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(t);
  }, [search]);

  // FILTER
  let filtered = products.filter((p) =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  if (filter.category && filter.category !== "All") {
    filtered = filtered.filter((p) => p.category === filter.category);
  }

  if (filter.price) {
    filtered = filtered.filter((p) => p.price <= filter.price);
  }

  // 🔥 SORTING
  if (sort === "priceLow") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "priceHigh") {
    filtered.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

        <div>
          <h1 className="text-3xl font-bold">Featured Products</h1>
          <p className="text-sm text-gray-500 mt-1">
            {filtered.length} products found
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">

          {/* SEARCH */}
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              placeholder="Search components..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-gray-100 border 
              focus:bg-white focus:ring-2 focus:ring-blue-500/30 outline-none transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* SORT */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2.5 rounded-lg border bg-white text-sm"
          >
            <option value="latest">Latest</option>
            <option value="priceLow">Price ↑</option>
            <option value="priceHigh">Price ↓</option>
          </select>

        </div>

      </div>

      {/* LAYOUT */}
      <div className="grid md:grid-cols-4 gap-8">

        {/* SIDEBAR */}
        <div className="hidden md:block">
          <div className="sticky top-24">
            <SidebarFilters setFilter={setFilter} />
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="md:col-span-3">

          {/* LOADING */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-200 animate-pulse rounded-2xl"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (

            /* EMPTY */
            <div className="text-center py-20">
              <p className="text-lg font-medium text-gray-700">
                No products found 😕
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Try changing filters or search
              </p>
            </div>

          ) : (

            /* GRID */
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

              {filtered.map((p, i) => (
                <div
                  key={p.id}
                  className="opacity-0 animate-fadeIn"
                  style={{
                    animationDelay: `${i * 60}ms`,
                    animationFillMode: "forwards",
                  }}
                >
                  <ProductCard product={p} />
                </div>
              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}