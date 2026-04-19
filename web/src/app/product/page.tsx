\"use client";

import Navbar from "@/components/layout/Navbar";
import Recommended from "@/components/product/Recommended";

async function getProduct(id: string) {
  try {
    const res = await fetch(`/api/products`, {
      cache: "no-store",
    });

    const products = await res.json();

    return products.find((p: any) => p.id == id);
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default function ProductPage({ params }: any) {
  const [product, setProduct] = React.useState<any>(null);

  React.useEffect(() => {
    getProduct(params.id).then(setProduct);
  }, [params.id]);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading product...</p>
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

          <button className="
            mt-6 px-6 py-2.5 rounded-lg
            bg-gradient-to-r from-[#0f4c81] to-[#1b6ca8]
            text-white font-medium
            hover:scale-[1.03] active:scale-[0.97]
            transition-all duration-300 shadow-md
          ">
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