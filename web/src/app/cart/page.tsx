"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then(setCart)
      .catch(() => setCart([]));
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <main className="min-h-screen bg-[#f1f3f6]">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">

        {/* LEFT - CART ITEMS */}
        <div className="md:col-span-2 space-y-4">

          <h1 className="text-2xl font-bold">Your Cart</h1>

          {cart.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl shadow text-center">
              <p className="text-gray-500">🛒 Your cart is empty</p>
            </div>
          ) : (
            cart.map((item, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition"
              >
                {/* IMAGE */}
                <Image
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />

                {/* DETAILS */}
                <div className="flex-1">
                  <h2 className="font-medium text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Electronics Component
                  </p>

                  <div className="mt-2 text-[#1b6ca8] font-semibold">
                    ₹{item.price}
                  </div>
                </div>

                {/* REMOVE */}
                <button className="text-gray-400 hover:text-red-500 transition">
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}

        </div>

        {/* RIGHT - SUMMARY */}
        <div className="bg-white p-6 rounded-2xl shadow-sm h-fit sticky top-24">

          <h2 className="text-lg font-semibold mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>

          <div className="border-t my-3" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            className="w-full mt-5 py-2.5 rounded-lg text-white font-medium
            bg-gradient-to-r from-[#0f4c81] to-[#1b6ca8]
            hover:scale-[1.02] active:scale-[0.98]
            hover:shadow-lg transition-all"
          >
            Checkout →
          </button>

        </div>

      </div>

    </main>
  );
}