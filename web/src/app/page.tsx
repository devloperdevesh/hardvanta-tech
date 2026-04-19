import Navbar from "../components/layout/Navbar";
import ProductGrid from "../components/product/ProductGrid";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f1f3f6] text-black">

      {/* NAVBAR */}
      <Navbar />

      {/* CATEGORY BAR */}
      <div className="sticky top-[64px] z-40 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="flex gap-8 px-6 py-3 text-sm overflow-x-auto scrollbar-hide">
            {["Processors","Sensors","ICs","Modules","Networking"].map((item) => (
              <Link
                href={`/category/${item.toLowerCase()}`}
                key={item}
                className="
                  whitespace-nowrap font-medium text-gray-600
                  hover:text-[#1b6ca8]
                  transition-all duration-200
                  hover:scale-105
                "
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="px-6 mt-6">
        <div className="
          max-w-7xl mx-auto 
          rounded-2xl 
          px-8 py-12 md:px-12 md:py-14
          flex items-center justify-between
          bg-gradient-to-r from-[#0f4c81] via-[#1b6ca8] to-[#3ccf91]
          text-white shadow-xl
        ">

          {/* LEFT */}
          <div className="max-w-lg">

            {/* LOGO + NAME */}
            <div className="flex items-center gap-3 mb-4">
              <Image 
                src="/logo.png" 
                alt="logo" 
                width={42} 
                height={42} 
                className="object-contain"
              />
              <span className="
                text-lg font-semibold tracking-wide
                bg-white/90 text-transparent bg-clip-text
              ">
                Hardvanta
              </span>
            </div>

            {/* TITLE */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Industrial Electronics Hub
            </h1>

            {/* SUBTEXT */}
            <p className="mt-3 text-sm md:text-base opacity-90">
              Sensors, ICs, Modules & high-performance components for engineers.
            </p>

            {/* CTA */}
            <Link href="/products">
              <button className="
                mt-6 px-6 py-2.5 rounded-lg font-medium
                bg-white text-black
                hover:scale-105 active:scale-95
                hover:shadow-lg transition-all duration-300
              ">
                Shop Now →
              </button>
            </Link>

          </div>

          {/* RIGHT */}
          <div className="hidden md:flex text-7xl opacity-80 animate-pulse">
            ⚡
          </div>

        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <ProductGrid />
      </section>

      {/* FOOTER */}
      <footer className="mt-20 bg-white border-t">

        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="logo"
                width={36}
                height={36}
              />
              <span className="
                text-lg font-semibold
                bg-gradient-to-r from-[#0f4c81] to-[#3ccf91]
                bg-clip-text text-transparent
              ">
                Hardvanta
              </span>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              Industrial electronics marketplace for engineers and startups.
            </p>
          </div>

          {/* PRODUCTS */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-800">Products</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              {["Processors","Sensors","Modules"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/category/${item.toLowerCase()}`}
                    className="hover:text-[#1b6ca8] transition hover:translate-x-1 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-800">Support</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              {["Contact","Help","Privacy"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase()}`}
                    className="hover:text-[#1b6ca8] transition hover:translate-x-1 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t">
          <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-500">
            © 2026 Hardvanta Technologies LLP
          </div>
        </div>

      </footer>

    </main>
  );
}