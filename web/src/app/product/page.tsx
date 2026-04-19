"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Recommended from "@/components/product/Recommended";

export default function ProductPage({ params }: any) {
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/products");
        const products = await res.json();
        const found = products.find((p: any) => p.id == params.id);
        setProduct(found);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [params.id]);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f1f3f6]">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div className="h-80 bg-gray-100 flex items-center justify-center text-4xl rounded-xl">
          📦
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {product.name}
          </h1>

          <p className="text-gray-500 mt-2">
            {product.category || "Electronics"}
          </p>

          <p className="text-2xl font-bold text-[#1b6ca8] mt-4">
            ₹{product.price}
          </p>

          <button className="mt-6 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#0f4c81] to-[#1b6ca8] text-white">
            Add to Cart
          </button>
        </div>

      </div>

      {/* RECOMMENDED */}
      <div className="max-w-6xl mx-auto px-6 pb-10">
        <Recommended current={product} products={[product]} />
      </div>

    </main>
  );
}