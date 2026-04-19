"use client";

import {
  SlidersHorizontal,
  Activity,
  Microchip,
  Box,
} from "lucide-react";
import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";

export default function SidebarFilters({ setFilter }: any) {
  const [localFilter, setLocalFilter] = useState<any>({
    category: "",
    price: 10000,
  });

  const categories = [
    { name: "All", icon: SlidersHorizontal },
    { name: "Sensors", icon: Activity },
    { name: "Modules", icon: Box },
    { name: "ICs", icon: Microchip },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border shadow-sm space-y-6">

      {/* HEADER */}
      <div className="flex items-center gap-2">
        <SlidersHorizontal size={18} className="text-blue-600" />
        <h3 className="font-semibold text-lg">Filters</h3>
      </div>

      {/* CATEGORY */}
      <div>
        <p className="text-sm font-medium mb-3 text-gray-700">Category</p>

        <div className="space-y-2">
          {categories.map((c) => {
            const Icon = c.icon;
            const active = localFilter.category === c.name;

            return (
              <button
                key={c.name}
                onClick={() =>
                  setLocalFilter({
                    ...localFilter,
                    category: c.name === "All" ? "" : c.name,
                  })
                }
                className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-all duration-200
                  ${
                    active
                      ? "bg-gradient-to-r from-blue-600 to-green-400 text-white shadow"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <Icon size={16} />
                {c.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* PRICE SLIDER */}
      <div>
        <p className="text-sm font-medium mb-3 text-gray-700">
          Max Price: ₹{localFilter.price}
        </p>

        <Slider.Root
          value={[localFilter.price]}
          max={10000}
          step={100}
          onValueChange={(val) =>
            setLocalFilter({ ...localFilter, price: val[0] })
          }
          className="relative flex items-center w-full h-5"
        >
          <Slider.Track className="bg-gray-200 relative grow rounded-full h-1">
            <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
          </Slider.Track>

          <Slider.Thumb className="block w-4 h-4 bg-blue-600 rounded-full shadow" />
        </Slider.Root>
      </div>

      {/* BUTTONS */}
      <div className="pt-4 space-y-2">

        {/* APPLY */}
        <button
          onClick={() => setFilter(localFilter)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition active:scale-95"
        >
          Apply Filters
        </button>

        {/* RESET */}
        <button
          onClick={() => {
            setLocalFilter({ category: "", price: 10000 });
            setFilter({});
          }}
          className="w-full border py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Reset
        </button>

      </div>
    </div>
  );
}