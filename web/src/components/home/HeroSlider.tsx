"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const slides = [
  {
    title: "Industrial Electronics Hub",
    desc: "Sensors, ICs, Modules & more",
  },
  {
    title: "High Performance Components",
    desc: "For Engineers & Startups",
  },
  {
    title: "Build Faster, Ship Faster",
    desc: "Trusted by Developers",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const i = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(i);
  }, [paused]);

  return (
    <div className="max-w-7xl mx-auto px-6 mt-6">

      <div
        className="relative overflow-hidden rounded-2xl shadow-2xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >

        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f4c81] via-[#1b6ca8] to-[#3ccf91]" />

        {/* ANIMATED CONTENT */}
        <div className="relative p-10 md:p-16 flex items-center justify-between text-white">

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="max-w-lg"
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {slides[index].title}
              </h1>

              <p className="mt-3 text-sm md:text-base opacity-90">
                {slides[index].desc}
              </p>

              <Link href="/products">
                <button className="mt-6 px-6 py-2.5 rounded-lg font-medium
                  bg-white text-black
                  hover:scale-105 active:scale-95
                  hover:shadow-xl transition-all duration-300">
                  Shop Now →
                </button>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT SIDE ICON */}
          <motion.div
            key={index + "icon"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="hidden md:flex text-7xl"
          >
            ⚡
          </motion.div>

        </div>
      </div>

      {/* DOTS */}
      <div className="flex justify-center mt-4 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`
              h-2.5 rounded-full transition-all duration-300
              ${i === index
                ? "w-8 bg-[#1b6ca8]"
                : "w-2.5 bg-gray-300 hover:bg-gray-400"}
            `}
          />
        ))}
      </div>

    </div>
  );
}