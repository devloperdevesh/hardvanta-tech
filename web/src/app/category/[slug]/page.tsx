import ProductCard from "@/components/product/ProductCard";

export default async function CategoryPage({ params }: any) {
  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();

  const filtered = products.filter(
    (p: any) => p.category?.toLowerCase() === params.slug.toLowerCase(),
  );

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6 capitalize">{params.slug}</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filtered.map((p: any) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
