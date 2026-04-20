export default function AdminLayout({ children }: any) {
  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0f4c81] text-white p-6 space-y-4">
        <h2 className="text-xl font-bold">Admin</h2>

        <a href="/admin">Dashboard</a>
        <a href="/admin/products">Products</a>
        <a href="/admin/orders">Orders</a>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 bg-gray-100 p-8">{children}</main>
    </div>
  );
}
