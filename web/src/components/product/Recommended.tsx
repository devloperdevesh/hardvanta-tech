"use client";

import Link from "next/link";
import Image from "next/image";

export default function Recommended({ products, current }: any) {

  const related = products
    .filter((p: any) => p.id !== current.id)
    .map((p: any) => {
      let score = 0;

      // 🔥 category match
      if (p.category === current.category) score += 5;

      // 🔥 price similarity
      const diff = Math.abs(p.price - current.price);
      if (diff < 100) score += 3;
      else if (diff < 300) score += 2;

      // 🔥 randomness (real feel)
      score += Math.random();

      return { ...p, score };
    })
    .sort((a: any, b: any) => b.score - a.score)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-6">
        You may also like
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {related.map((p: any) => (
          <Link
            key={p.id}
            href={`/product/${p.id}`}
            className="bg-white rounded-xl p-4 border hover:shadow-xl transition group"
          >

            <div className="h-32 flex items-center justify-center bg-gray-50 rounded mb-3">
              <Image
                src={p.image || "/logo.png"}
                alt={p.name}
                width={120}
                height={120}
                className="group-hover:scale-110 transition"
              />
            </div>

            <h3 className="text-sm font-semibold line-clamp-1">
              {p.name}
            </h3>

            <p className="text-blue-600 font-bold mt-1">
              ₹{p.price}
            </p>

          </Link>
        ))}

      </div>

    </div>
  );
}