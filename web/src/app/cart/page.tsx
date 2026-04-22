"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import { Trash2 } from "lucide-react";

type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    async function loadCart() {
      try {
        const res = await fetch("/api/cart");
        const data = await res.json();
        setCart(data.data || []);
      } catch {
        setCart([]);
      }
    }
    loadCart();
  }, []);

  async function removeItem(id: string) {
    setLoading(true);
    try {
      await fetch(`/api/cart/${id}`, { method: "DELETE" });
      setCart((prev) => prev?.filter((i) => i.productId !== id) || []);
    } finally {
      setLoading(false);
    }
  }

  // 🔥 FINAL PAYMENT FUNCTION
  async function handlePayment() {
    try {
      setPaying(true);

      const res = await fetch("/api/payment/create-order", {
        method: "POST",
      });

      const { data } = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: data.amount,
        order_id: data.id,

        handler: async function (response: any) {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            window.location.href = "/success";
          } else {
            alert("❌ Payment verification failed");
          }
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Payment failed");
    } finally {
      setPaying(false);
    }
  }

  if (!cart) {
    return <p className="p-6">Loading...</p>;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-[#f1f3f6]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold">Your Cart</h1>

          {cart.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl text-center">
              Empty cart
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.productId} className="bg-white p-4 flex gap-4">
                <Image
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  width={80}
                  height={80}
                />

                <div className="flex-1">
                  <p>{item.name}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>₹{item.price * item.quantity}</p>
                </div>

                <button onClick={() => removeItem(item.productId)}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* RIGHT */}
        <div className="bg-white p-6 rounded-2xl sticky top-24">
          <h2 className="font-semibold mb-4">Summary</h2>

          <div className="flex justify-between">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handlePayment}
            disabled={paying || cart.length === 0}
            className="w-full mt-5 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-60"
          >
            {paying ? "Processing..." : "Checkout →"}
          </button>
        </div>
      </div>
    </main>
  );
}
