import Navbar from "@/components/layout/Navbar";
import Recommended from "@/components/product/Recommended";

async function getProduct(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
  const products = await res.json();
  return products.find((p: any) => p.id == id);
}

export default async function ProductPage({ params }: any) {
  const product = await getProduct(params.id);

  return (
    <main className="min-h-screen bg-white">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div className="h-80 bg-gray-100 flex items-center justify-center text-4xl rounded-xl">
          📦
        </div>

        {/* DETAILS */}
        <div>

          <h1 className="text-3xl font-bold">
            {product.name}
          </h1>

          <p className="text-gray-500 mt-2">
            {product.category || "Electronics"}
          </p>

          <p className="text-2xl font-bold text-blue-600 mt-4">
            ₹{product.price}
          </p>

          <button className="btn mt-6">
            Add to Cart
          </button>

        </div>

      </div>

      {/* AI RECOMMENDATION */}
      <div className="max-w-6xl mx-auto px-6">
        <Recommended current={product} products={[product]} />
      </div>

    </main>
  );
}