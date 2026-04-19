"use client";

import { Package, ShoppingCart, IndianRupee } from "lucide-react";

export default function Admin() {
  return (
    <div className="min-h-screen bg-[#f1f3f6] p-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <h1 className="text-2xl font-bold mb-6">
          Admin Dashboard
        </h1>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* PRODUCTS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
              <Package size={22} />
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <h2 className="text-xl font-semibold">120</h2>
            </div>
          </div>

          {/* ORDERS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition flex items-center gap-4">
            <div className="p-3 rounded-xl bg-green-100 text-green-600">
              <ShoppingCart size={22} />
            </div>

            <div>
              <p className="text-sm text-gray-500">Orders</p>
              <h2 className="text-xl font-semibold">45</h2>
            </div>
          </div>

          {/* REVENUE */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
              <IndianRupee size={22} />
            </div>

            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <h2 className="text-xl font-semibold">₹12,500</h2>
            </div>
          </div>

        </div>

        {/* QUICK ACTIONS */}
        <div className="mt-10 bg-white p-6 rounded-2xl shadow-sm">

          <h2 className="text-lg font-semibold mb-4">
            Quick Actions
          </h2>

          <div className="flex gap-4 flex-wrap">

            <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#0f4c81] to-[#1b6ca8] text-white hover:scale-105 transition">
              + Add Product
            </button>

            <button className="px-5 py-2 rounded-lg border hover:bg-gray-100 transition">
              View Orders
            </button>

            <button className="px-5 py-2 rounded-lg border hover:bg-gray-100 transition">
              Manage Users
            </button>

          </div>
        </div>

        {/* TABLE (RECENT ORDERS) */}
        <div className="mt-10 bg-white p-6 rounded-2xl shadow-sm overflow-x-auto">

          <h2 className="text-lg font-semibold mb-4">
            Recent Orders
          </h2>

          <table className="w-full text-sm">

            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2">Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {[1, 2, 3].map((i) => (
                <tr key={i} className="border-b hover:bg-gray-50 transition">
                  <td className="py-2">#ORD{i}</td>
                  <td>Customer {i}</td>
                  <td>₹{i * 1000}</td>
                  <td>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">
                      Paid
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", sales: 400 },
  { name: "Tue", sales: 700 },
  { name: "Wed", sales: 500 },
  { name: "Thu", sales: 900 },
  { name: "Fri", sales: 1200 },
];

export default function AdminPage() {
  return (
    <main className="p-10">

      <h1 className="text-3xl font-bold mb-10">
        Admin Dashboard
      </h1>

      {/* CARDS */}
      <div className="grid grid-cols-3 gap-6 mb-10">

        <div className="card p-6">
          <p className="text-gray-500">Total Sales</p>
          <h2 className="text-2xl font-bold">₹45,000</h2>
        </div>

        <div className="card p-6">
          <p className="text-gray-500">Orders</p>
          <h2 className="text-2xl font-bold">120</h2>
        </div>

        <div className="card p-6">
          <p className="text-gray-500">Users</p>
          <h2 className="text-2xl font-bold">89</h2>
        </div>

      </div>

      {/* CHART */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="font-semibold mb-4">Sales Overview</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" />
          </LineChart>
        </ResponsiveContainer>

      </div>

    </main>
  );
}