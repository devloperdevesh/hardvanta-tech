"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: Package,
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: ShoppingCart,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0f4c81] text-white flex flex-col">
        {/* LOGO / TITLE */}
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold tracking-wide">Hardvanta Admin</h2>
        </div>

        {/* NAV */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-white text-[#0f4c81]"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="p-4 text-xs text-white/50 border-t border-white/10">
          © {new Date().getFullYear()} Hardvanta
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
