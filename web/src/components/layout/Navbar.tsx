"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="logo"
            width={38}
            height={38}
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-lg font-semibold tracking-tight text-gray-900">
            Hardvanta
          </span>
        </Link>

        {/* SEARCH */}
        <div className="flex-1 max-w-xl mx-8 hidden md:block">
          <div className="relative group">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1b6ca8] transition"
            />

            <input
              type="text"
              placeholder="Search components, sensors, ICs..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full
              bg-gray-100 border border-transparent
              focus:bg-white focus:border-gray-300
              focus:ring-2 focus:ring-[#1b6ca8]/30
              outline-none transition-all duration-300
              shadow-sm hover:shadow-md"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5">
          {/* CART */}
          <Link
            href="/cart"
            className="relative flex items-center gap-2 text-gray-600 hover:text-[#1b6ca8] transition group"
          >
            <ShoppingCart
              size={20}
              className="transition group-hover:scale-110"
            />

            <span className="hidden sm:inline text-sm font-medium">Cart</span>

            {/* Badge */}
            <span className="absolute -top-2 -right-3 bg-[#1b6ca8] text-white text-[10px] px-1.5 py-[2px] rounded-full">
              0
            </span>
          </Link>

          {/* LOGIN */}
          <Link href="/login">
            <button
              className="px-5 py-2 rounded-full text-sm font-medium
              bg-[#1b6ca8] text-white
              hover:bg-[#0f4c81]
              shadow-sm hover:shadow-lg
              hover:-translate-y-0.5 active:scale-95
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
