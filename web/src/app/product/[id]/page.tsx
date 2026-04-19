"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/layout/Navbar";
import Recommended from "../../../components/product/Recommended";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";

type Product = {
  id: string;
  name: string;
  price: number;
  category?: string;
  image?: string;
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/products");
        const products = await res.json();
        const found = products.find((p: Product) => p.id == params.id);
        setProduct(found || null);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [params.id]);

  // 🔄 LOADING STATE
  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f1f3f6]">
        <p className="text-gray-500 animate-pulse">Loading product...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f1f3f6]">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">

        {/* 🖼 IMAGE */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center justify-center">
          <Image
            src={product.image || "/logo.png"}
            alt={product.name}
            width={250}
            height={250}
            className="object-contain hover:scale-105 transition duration-300"
          />
        </div>

        {/* 📦 DETAILS */}
        <div>

          {/* NAME */}
          <h1 className="text-3xl font-bold text-gray-800 leading-tight">
            {product.name}
          </h1>

          {/* CATEGORY */}
          <p className="text-gray-500 mt-2 text-sm">
            {product.category || "Electronics"}
          </p>

          {/* RATING */}
          <div className="flex items-center gap-1 mt-3 text-yellow-500 text-sm">
            <Star size={16} fill="currentColor" />
            <span className="font-medium">4.5</span>
            <span className="text-gray-400 text-xs">(120 reviews)</span>
          </div>

          {/* PRICE */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-bold text-[#1b6ca8]">
              ₹{product.price}
            </span>
            <span className="text-sm text-gray-400 line-through">
              ₹{product.price + 200}
            </span>
          </div>

          {/* STOCK */}
          <p className="text-green-600 text-sm mt-2 font-medium">
            In stock • Fast delivery
          </p>

          {/* BUTTON */}
          <button className="
            mt-6 flex items-center gap-2
            px-6 py-3 rounded-xl text-sm font-medium
            bg-gradient-to-r from-[#0f4c81] via-[#1b6ca8] to-[#3ccf91]
            text-white
            hover:scale-[1.03] active:scale-[0.97]
            hover:shadow-lg transition-all duration-300
          ">
            <ShoppingCart size={18} />
            Add to Cart
          </button>

        </div>

      </div>

      {/* 🤖 RECOMMENDED */}
      <div className="max-w-6xl mx-auto px-6 pb-10">
        <Recommended current={product} products={[product]} />
      </div>

    </main>
  );
}