import Navbar from "../components/layout/Navbar";
import ProductGrid from "../components/product/ProductGrid";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-gray-900">
      {/* NAVBAR */}
      <Navbar />

      {/* CATEGORY BAR */}
      <div className="sticky top-[64px] z-40 bg-white/70 backdrop-blur-xl border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="flex gap-8 px-6 py-3 text-sm overflow-x-auto scrollbar-hide">
            {["Processors", "Sensors", "ICs", "Modules", "Networking"].map(
              (item) => (
                <Link
                  href={`/category/${item.toLowerCase()}`}
                  key={item}
                  className="whitespace-nowrap font-medium text-gray-600 hover:text-[#1b6ca8] transition-all duration-200 hover:underline underline-offset-4"
                >
                  {item}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="px-6 mt-8">
        <div className="relative max-w-7xl mx-auto rounded-3xl px-10 py-16 md:px-14 md:py-20 flex items-center justify-between bg-gradient-to-br from-[#0f4c81] via-[#1b6ca8] to-[#2563eb] text-white shadow-[0_30px_80px_rgba(0,0,0,0.25)] overflow-hidden">
          {/* LIGHT BLOBS */}
          <div className="absolute -top-28 -right-28 w-[400px] h-[400px] bg-white/10 blur-3xl rounded-full" />
          <div className="absolute bottom-[-120px] left-[-100px] w-[300px] h-[300px] bg-blue-300/10 blur-3xl rounded-full" />

          {/* LEFT */}
          <div className="max-w-xl relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Image src="/logo.png" alt="logo" width={46} height={46} />
              <span className="text-lg font-semibold tracking-tight">
                Hardvanta
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
              Industrial Electronics <br /> Marketplace
            </h1>

            <p className="mt-5 text-base md:text-lg opacity-90 leading-relaxed">
              Discover high-performance components built for engineers,
              startups, and next-generation hardware innovation.
            </p>

            <Link href="/products">
              <button className="mt-8 px-7 py-3.5 rounded-xl font-medium bg-white text-black shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                Explore Products →
              </button>
            </Link>
          </div>

          {/* RIGHT BRAND */}
          <div className="hidden md:flex text-[140px] font-bold opacity-[0.06] select-none tracking-widest">
            HV
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <ProductGrid />
      </section>

      {/* FOOTER */}
      <footer className="mt-28 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
          {/* BRAND */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Hardvanta logo"
                width={40}
                height={40}
              />
              <span className="text-xl font-semibold tracking-tight">
                Hardvanta
              </span>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              Industrial-grade electronics marketplace built for engineers,
              startups, and innovators.
            </p>
          </div>

          {/* PRODUCTS */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-5 text-gray-900">
              Products
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {["Processors", "Sensors", "Modules"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/category/${item.toLowerCase()}`}
                    className="hover:text-[#1b6ca8] transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-5 text-gray-900">
              Support
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {["Contact", "Help", "Privacy"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="hover:text-[#1b6ca8] transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-3">
            <p>© 2026 Hardvanta Technologies LLP</p>

            <div className="flex gap-6">
              {["Terms", "Privacy", "Cookies"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="hover:text-gray-800 transition"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
