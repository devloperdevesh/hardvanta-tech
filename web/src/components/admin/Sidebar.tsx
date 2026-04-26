"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Cpu,
  Activity,
  CircuitBoard,
  Boxes,
  Wifi,
  Menu,
} from "lucide-react";

// ================= TYPES =================
type NavItem = {
  name: string;
  path: string;
  icon: any;
};

type Category = {
  name: string;
  icon: any;
};

// ================= DATA =================
const NAV_ITEMS: NavItem[] = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Products", path: "/admin/products", icon: Package },
  { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
];

const CATEGORIES: Category[] = [
  { name: "Processors", icon: Cpu },
  { name: "Sensors", icon: Activity },
  { name: "ICs", icon: CircuitBoard },
  { name: "Modules", icon: Boxes },
  { name: "Networking", icon: Wifi },
];

// ================= COMPONENT =================
export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col transition-all duration-300 shadow-xl`}
    >
      {/* HEADER */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
        {!collapsed && (
          <h2 className="text-lg font-semibold tracking-wide">Hardvanta</h2>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-white/10 transition"
          aria-label="Toggle sidebar"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="px-2 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.path || pathname.startsWith(item.path + "/");

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition
                ${
                  isActive
                    ? "bg-white text-gray-900 shadow"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
            >
              <item.icon size={18} />

              {!collapsed && item.name}

              {/* Tooltip */}
              {collapsed && (
                <span className="absolute left-20 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* DIVIDER */}
      <div className="mx-3 border-t border-white/10 my-3" />

      {/* CATEGORIES */}
      <div className="px-2">
        {!collapsed && (
          <p className="text-xs text-gray-500 mb-2 px-2 tracking-wider">
            CATEGORIES
          </p>
        )}

        <div className="space-y-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              className="group relative w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-400 hover:bg-white/10 hover:text-white transition"
            >
              <cat.icon size={16} />

              {!collapsed && cat.name}

              {/* Tooltip */}
              {collapsed && (
                <span className="absolute left-20 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                  {cat.name}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-auto p-4 text-xs text-gray-500 border-t border-white/10">
        {!collapsed && `© ${new Date().getFullYear()} Hardvanta`}
      </div>
    </aside>
  );
}
