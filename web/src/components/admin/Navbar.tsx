"use client";

import { Search, ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-20">
      {/* LEFT: Title + Search */}
      <div className="flex items-center gap-6 w-full max-w-2xl">
        {/* Page Title */}
        <div className="hidden md:block">
          <h1 className="text-base font-semibold text-gray-800">Dashboard</h1>
          <p className="text-xs text-gray-500">Welcome back 👋</p>
        </div>

        {/* Search */}
        <div className="relative w-full">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            placeholder="Search components, sensors, ICs..."
            className="w-full h-10 pl-9 pr-4 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0f4c81] outline-none transition"
          />
        </div>
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-6 ml-6">
        {/* Cart */}
        <div className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-[#0f4c81] transition">
          <ShoppingCart size={18} />
          <span className="hidden sm:inline">Cart (0)</span>
        </div>

        {/* User Info */}
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-gray-700">Admin</p>
          <p className="text-xs text-gray-400">admin@hardvanta.com</p>
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0f4c81] to-[#0b355d] text-white flex items-center justify-center font-semibold shadow cursor-pointer hover:scale-105 transition">
          A
        </div>
      </div>
    </header>
  );
}
