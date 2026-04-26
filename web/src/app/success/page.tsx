"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function SuccessPage() {
  const params = useSearchParams();
  const router = useRouter();

  const orderId = params.get("orderId");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white max-w-md w-full p-8 rounded-2xl shadow-sm border text-center space-y-6"
      >
        {/* ✅ Icon */}
        <div className="flex justify-center">
          <CheckCircle className="text-green-500" size={60} />
        </div>

        {/* ✅ Title */}
        <h1 className="text-2xl font-semibold text-gray-900">
          Payment Successful 🎉
        </h1>

        {/* ✅ Subtitle */}
        <p className="text-gray-500 text-sm">
          Your order has been placed successfully.
        </p>

        {/* 🧾 Order ID */}
        {orderId && (
          <div className="bg-gray-50 border rounded-lg p-3 text-sm">
            <span className="text-gray-500">Order ID:</span>{" "}
            <span className="font-medium text-gray-800">{orderId}</span>
          </div>
        )}

        {/* 🔘 Actions */}
        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={() => router.push("/orders")}
            className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            View Orders
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Continue Shopping
          </button>
        </div>
      </motion.div>
    </div>
  );
}
