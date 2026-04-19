"use client";

import { SlidersHorizontal, Cpu, Activity, Microchip, Box, IndianRupee } from "lucide-react";
import { useState } from "react";

export default function SidebarFilters({ setFilter }: any) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePrice, setActivePrice] = useState(null);

  const categories = [
    { name: "All", icon: SlidersHorizontal },
    { name: "Sensors", icon: Activity },
    { name: "Modules", icon: Box },
    { name: "ICs", icon: Microchip },
  ];

  const prices = [100, 500];

  return (
    <div className="bg-white p-5 rounded-2xl border shadow-sm sticky top-28">

      {/* HEADER */}
      <div className="flex items-center gap-2 mb-5">
        <SlidersHorizontal size={18} className="text-[#1b6ca8]" />
        <h3 className="font-semibold text-lg">Filters</h3>
      </div>

      {/* CATEGORY */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-3 text-gray-700">Category</p>

        <div className="space-y-2">
          {categories.map((c) => {
            const Icon = c.icon;
            const active = activeCategory === c.name;

            return (
              <button
                key={c.name}
                onClick={() => {
                  setActiveCategory(c.name);
                  setFilter((f: any) => ({ ...f, category: c.name }));
                }}
                className={`
                  flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm
                  transition-all duration-200
                  ${active
                    ? "bg-gradient-to-r from-[#0f4c81] to-[#3ccf91] text-white shadow"
                    : "text-gray-600 hover:bg-gray-100"}
                `}
              >
                <Icon size={16} />
                {c.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* PRICE */}
      <div>
        <p className="text-sm font-medium mb-3 text-gray-700">Price</p>

        <div className="space-y-2">
          {prices.map((p) => {
            const active = activePrice === p;

            return (
              <button
                key={p}
                onClick={() => {
                  setActivePrice(p);
                  setFilter((f: any) => ({ ...f, price: p }));
                }}
                className={`
                  flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm
                  transition-all duration-200
                  ${active
                    ? "bg-gradient-to-r from-[#0f4c81] to-[#3ccf91] text-white shadow"
                    : "text-gray-600 hover:bg-gray-100"}
                `}
              >
                <IndianRupee size={16} />
                Under ₹{p}
              </button>
            );
          })}
        </div>
      </div>

      {/* CLEAR FILTER */}
      <button
        onClick={() => {
          setActiveCategory("All");
          setActivePrice(null);
          setFilter({});
        }}
        className="mt-6 w-full text-sm py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
      >
        Clear Filters
      </button>

    </div>
  );
}