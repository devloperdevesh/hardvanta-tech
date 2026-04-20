"use client";

import { useState } from "react";
import { Package, ShoppingCart, IndianRupee, Plus } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// SAMPLE DATA (replace with API later)
const chartData = [
  { name: "Mon", sales: 400 },
  { name: "Tue", sales: 700 },
  { name: "Wed", sales: 500 },
  { name: "Thu", sales: 900 },
  { name: "Fri", sales: 1200 },
];

export default function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  async function addProduct() {
    if (!name || !price) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setSuccess("");

      await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price: Number(price) }),
      });

      setName("");
      setPrice("");
      setSuccess("Product added successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f7fb] p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Manage your store, products & analytics
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard icon={<Package />} title="Total Products" value="120" />
          <StatCard icon={<ShoppingCart />} title="Orders" value="45" />
          <StatCard icon={<IndianRupee />} title="Revenue" value="₹12,500" />
        </div>

        {/* GRID SECTION */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* CHART */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* ADD PRODUCT FORM */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Plus size={18} />
              Add Product
            </h2>

            <div className="space-y-4">
              <input
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border focus:ring-2 focus:ring-blue-500/30 outline-none"
              />

              <input
                placeholder="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border focus:ring-2 focus:ring-blue-500/30 outline-none"
              />

              <button
                onClick={addProduct}
                disabled={loading}
                className="w-full h-10 rounded-lg bg-black text-white text-sm font-medium hover:opacity-90 active:scale-95 transition disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Product"}
              </button>

              {success && <p className="text-green-600 text-sm">{success}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 🔹 REUSABLE STAT CARD
function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition">
      <div className="p-3 bg-gray-100 rounded-xl">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-xl font-semibold">{value}</h2>
      </div>
    </div>
  );
}
