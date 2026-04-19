"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-gray-200">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* LEFT - LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo.png"
            alt="logo"
            width={36}
            height={36}
            className="transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-lg font-semibold tracking-wide 
            bg-gradient-to-r from-[#0f4c81] via-[#1b6ca8] to-[#3ccf91] 
            bg-clip-text text-transparent">
            Hardvanta
          </span>
        </Link>

        {/* SEARCH BAR */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative group">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition"
            />

            <input
              type="text"
              placeholder="Search for sensors, ICs, modules..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full 
              bg-gray-100 border border-transparent
              focus:bg-white focus:border-gray-300 
              focus:ring-2 focus:ring-blue-500/30
              outline-none transition-all duration-300 shadow-sm"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6">

          {/* CART */}
          <Link
            href="/cart"
            className="relative flex items-center gap-2 text-gray-700 
            hover:text-blue-600 transition group"
          >
            <ShoppingCart size={20} className="group-hover:scale-110 transition" />
            <span className="hidden sm:inline text-sm font-medium">Cart</span>

            {/* Badge (optional future) */}
            <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-[10px] px-1.5 py-[2px] rounded-full">
              0
            </span>
          </Link>

          {/* LOGIN BUTTON */}
          <Link href="/login">
            <button
              className="px-5 py-2 rounded-full text-sm font-medium
              bg-gradient-to-r from-[#0f4c81] to-[#1b6ca8] text-white
              hover:shadow-lg hover:scale-105 active:scale-95
              transition-all duration-300"
            >
              Login
            </button>
          </Link>

        </div>
      </div>
    </nav>
  );
}