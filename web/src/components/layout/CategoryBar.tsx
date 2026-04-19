"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { Cpu, Activity, Microchip, Box, Wifi } from "lucide-react";

const categories = [
  { name: "Processors", icon: Cpu },
  { name: "Sensors", icon: Activity },
  { name: "ICs", icon: Microchip },
  { name: "Modules", icon: Box },
  { name: "Networking", icon: Wifi },
];

export default function CategoryBar() {
  const searchParams = useSearchParams();
  const active = searchParams.get("category");

  const containerRef = useRef(null);
  const itemRefs = useRef({});

  // ✅ Auto center active item
  useEffect(() => {
    if (!active || !containerRef.current || !itemRefs.current[active]) return;

    const container = containerRef.current;
    const el = itemRefs.current[active];

    container.scrollTo({
      left: el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <div className="sticky top-[64px] z-40 bg-white/95 backdrop-blur-xl border-b border-gray-200">

      {/* CENTER WRAPPER */}
      <div className="flex justify-center">

        {/* SCROLL CONTAINER */}
        <div
          ref={containerRef}
          className="
            flex items-center gap-8 px-6 py-3
            overflow-x-auto scrollbar-hide
            snap-x snap-mandatory
          "
        >
          {categories.map((c) => {
            const Icon = c.icon;
            const isActive = active === c.name;

            return (
              <Link
                key={c.name}
                href={`/?category=${c.name}`}
                ref={(el) => (itemRefs.current[c.name] = el)}
                className="flex flex-col items-center justify-center min-w-[90px] snap-center group"
              >

                {/* ICON */}
                <div
                  className={`
                    flex items-center justify-center
                    w-10 h-10 rounded-lg
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-gradient-to-r from-[#0f4c81] to-[#3ccf91] text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                    }
                  `}
                >
                  <Icon size={18} />
                </div>

                {/* TEXT */}
                <span
                  className={`
                    mt-1.5 text-xs font-medium text-center transition
                    ${
                      isActive
                        ? "text-[#1b6ca8]"
                        : "text-gray-600 group-hover:text-black"
                    }
                  `}
                >
                  {c.name}
                </span>

                {/* UNDERLINE */}
                <div
                  className={`
                    h-[2px] mt-1 rounded-full transition-all duration-300
                    ${
                      isActive
                        ? "w-5 bg-[#1b6ca8]"
                        : "w-0 group-hover:w-5 bg-gray-400"
                    }
                  `}
                />

              </Link>
            );
          })}
        </div>
      </div>

      {/* LEFT FADE */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent" />

      {/* RIGHT FADE */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent" />

    </div>
  );
}