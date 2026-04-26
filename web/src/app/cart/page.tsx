"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import { Trash2 } from "lucide-react";

// ================= TYPES =================
type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

// ================= COMPONENT =================
export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  // ================= LOAD CART =================
  useEffect(() => {
    async function loadCart() {
      try {
        const res = await fetch("/api/cart");
        const data = await res.json();
        setCart(data.data || []);
      } catch {
        setCart([]);
      } finally {
        setLoading(false);
      }
    }

    loadCart();
  }, []);

  // ================= REMOVE =================
  async function removeItem(id: string) {
    try {
      setLoading(true);

      await fetch(`/api/cart/${id}`, { method: "DELETE" });

      setCart((prev) => prev.filter((i) => i.productId !== id));
    } finally {
      setLoading(false);
    }
  }

  // ================= PAYMENT =================
  async function handlePayment() {
    try {
      setPaying(true);

      // 🔹 Create Razorpay order
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
      });

      const { data } = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: data.amount,
        order_id: data.id,

        handler: async (response: any) => {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...response,
              orderId: data.internalOrderId, // ✅ IMPORTANT
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            window.location.href = "/success";
          } else {
            alert("Payment verification failed");
          }
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setPaying(false);
    }
  }

  // ================= CALCULATE =================
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ================= UI =================
  if (loading) {
    return <p className="p-6">Loading cart...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Your Cart
          </h1>

          {cart.length === 0 ? (
            <div className="bg-white p-10 rounded-xl text-center shadow-sm">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.productId}
                className="bg-white p-4 flex gap-4 rounded-xl shadow-sm"
              >
                <Image
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />

                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                  <p className="font-semibold mt-1">
                    ₹{item.price * item.quantity}
                  </p>
                </div>

                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* RIGHT */}
        <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
          <h2 className="font-semibold mb-4 text-lg">Order Summary</h2>

          <div className="flex justify-between text-gray-700">
            <span>Total</span>
            <span className="font-semibold">₹{total}</span>
          </div>

          <button
            onClick={handlePayment}
            disabled={paying || cart.length === 0}
            className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {paying ? "Processing..." : "Checkout"}
          </button>
        </div>
      </div>
    </main>
  );
}