"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Activity,
  Microchip,
  Box,
  Wifi,
} from "lucide-react";

const categories = [
  { name: "Processors", icon: Cpu },
  { name: "Sensors", icon: Activity },
  { name: "ICs", icon: Microchip },
  { name: "Modules", icon: Box },
  { name: "Networking", icon: Wifi },
];

export default function CategoryBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeQuery = searchParams.get("category");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // 🎯 Auto center
  useEffect(() => {
    const activeKey = activeQuery || pathname.split("/").pop();

    if (!activeKey || !containerRef.current || !itemRefs.current[activeKey]) return;

    const container = containerRef.current;
    const el = itemRefs.current[activeKey]!;

    container.scrollTo({
      left: el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2,
      behavior: "smooth",
    });
  }, [activeQuery, pathname]);

  return (
    <div className="sticky top-[64px] z-50">

      {/* 💎 Glass BG */}
      <div className="absolute inset-0 backdrop-blur-2xl bg-white/60 border-b border-white/30 shadow-sm" />

      <div className="flex justify-center relative">
        <div
          ref={containerRef}
          className="flex gap-6 px-6 py-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        >
          {categories.map(({ name, icon: Icon }) => {
            const slug = name.toLowerCase();
            const isActive =
              activeQuery === name || pathname === `/category/${slug}`;

            return (
              <MagneticItem key={name}>
                <Link
                  href={`/category/${slug}`}
                  ref={(el) => (itemRefs.current[slug] = el)}
                  className="relative flex flex-col items-center snap-center group"
                >
                  {/* ICON */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.2 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`
                      relative flex items-center justify-center
                      w-12 h-12 rounded-xl overflow-hidden
                      ${
                        isActive
                          ? "bg-gradient-to-r from-[#0f4c81] to-[#3ccf91] text-white shadow-lg"
                          : "bg-white/70 backdrop-blur-md text-gray-600"
                      }
                    `}
                  >
                    <Icon size={20} />

                    {/* 🌊 Ripple */}
                    <span className="absolute inset-0 pointer-events-none group-active:animate-ping bg-white/30 rounded-xl" />
                  </motion.div>

                  {/* TEXT */}
                  <span
                    className={`mt-2 text-xs font-medium ${
                      isActive ? "text-[#1b6ca8]" : "text-gray-600"
                    }`}
                  >
                    {name}
                  </span>

                  {/* 🎯 Glow Pulse */}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 w-6 h-[2px] bg-[#1b6ca8] rounded-full"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
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

/* 🧲 Magnetic Component */
function MagneticItem({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleLeave = () => {
    if (ref.current) {
      ref.current.style.transform = `translate(0px,0px)`;
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      className="transition-transform duration-300"
    >
      {children}
    </div>
  );
}