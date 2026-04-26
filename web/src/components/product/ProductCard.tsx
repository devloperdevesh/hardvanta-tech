"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, ShoppingCart, Heart, Star } from "lucide-react";

// ✅ Strong scalable typing
export type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
};

// ✅ API Layer (separation of concerns)
async function addToCartAPI(productId: string) {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity: 1 }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data?.message || "Failed to add to cart");
  }

  return data;
}

export default function ProductCard({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);

  const discountPrice = product.price + 200;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loading || !product.inStock) return;

    setLoading(true);
    try {
      await addToCartAPI(product.id);

      // TODO: Replace with toast system (react-hot-toast / sonner)
      console.log("✅ Added to cart");
    } catch (error) {
      console.error("❌ Cart Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="button"
      className="group relative bg-white rounded-2xl border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* IMAGE */}
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
        <Image
          src={product.image || "/logo.png"}
          alt={product.name}
          width={160}
          height={160}
          className="object-contain transition-transform duration-500 group-hover:scale-110"
        />

        {/* Wishlist */}
        <button
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full shadow hover:scale-110 transition"
        >
          <Heart size={16} />
        </button>

        {/* Quick View */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition">
          <button className="opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 bg-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium shadow hover:scale-105 transition">
            <Eye size={16} /> Quick View
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        {/* NAME */}
        <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
          {product.name}
        </h2>

        {/* CATEGORY */}
        <p className="text-xs text-gray-500">{product.category ?? "General"}</p>

        {/* RATING */}
        <div className="flex items-center gap-1 text-yellow-500 text-xs">
          <Star size={14} fill="currentColor" />
          <span className="font-medium">{product.rating ?? 4.5}</span>
          <span className="text-gray-400">({product.reviews ?? 120})</span>
        </div>

        {/* PRICE */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#1b6ca8]">
            ₹{product.price}
          </span>
          <span className="text-xs text-gray-400 line-through">
            ₹{discountPrice}
          </span>
        </div>

        {/* STOCK */}
        <p
          className={`text-xs font-medium ${
            product.inStock ? "text-green-600" : "text-red-500"
          }`}
        >
          {product.inStock ? "In stock • Fast delivery" : "Out of stock"}
        </p>

        {/* BUTTON */}
        <button
          onClick={handleAddToCart}
          disabled={loading || !product.inStock}
          aria-disabled={loading || !product.inStock}
          className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-[#0f4c81] via-[#1b6ca8] to-[#3ccf91] text-white hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <ShoppingCart size={16} />
          {loading ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
