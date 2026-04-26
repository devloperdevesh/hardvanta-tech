"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { categories } from "@/constants/categories";

export default function CategoryBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeQuery = searchParams.get("category");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // 🎯 Auto-center active item
  useEffect(() => {
    const activeKey =
      activeQuery?.toLowerCase() || pathname.split("/").pop();

    if (!activeKey || !containerRef.current) return;

    const el = itemRefs.current[activeKey];
    if (!el) return;

    const container = containerRef.current;

    container.scrollTo({
      left:
        el.offsetLeft -
        container.offsetWidth / 2 +
        el.offsetWidth / 2,
      behavior: "smooth",
    });
  }, [activeQuery, pathname]);

  return (
    <div className="sticky top-[64px] z-50">
      {/* 💎 Glass Effect */}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/70 border-b border-gray-200" />

      <div className="relative flex justify-center">
        <div
          ref={containerRef}
          className="flex gap-6 px-6 py-4 overflow-x-auto scrollbar-hide snap-x"
        >
          {categories.map(({ name, slug, icon: Icon }) => {
            const isActive =
              activeQuery === slug || pathname === `/category/${slug}`;

            return (
              <MagneticItem key={slug}>
                <Link
                  href={`/category/${slug}`}
                  ref={(el) => {
                    itemRefs.current[slug] = el; // ✅ FIX
                  }}
                  className="relative flex flex-col items-center snap-center group min-w-[70px]"
                >
                  {/* ICON */}
                  <motion.div
                    animate={{ scale: isActive ? 1.15 : 1 }}
                    transition={{ type: "spring", stiffness: 260 }}
                    className={`
                      flex items-center justify-center
                      w-12 h-12 rounded-xl
                      transition-all duration-300
                      ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-emerald-400 text-white shadow-md"
                          : "bg-white text-gray-600 border"
                      }
                    `}
                  >
                    <Icon size={20} />
                  </motion.div>

                  {/* TEXT */}
                  <span
                    className={`mt-2 text-xs font-medium transition ${
                      isActive ? "text-blue-600" : "text-gray-500"
                    }`}
                  >
                    {name}
                  </span>

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="active-bar"
                      className="absolute -bottom-1 w-6 h-[2px] bg-blue-600 rounded-full"
                    />
                  )}
                </Link>
              </MagneticItem>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 🧲 Magnetic Hover Effect
function MagneticItem({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "translate(0,0)";
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      className="transition-transform duration-200"
    >
      {children}
    </div>
  );
}