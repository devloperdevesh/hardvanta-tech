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

// ================= SAMPLE DATA =================
const chartData = [
  { name: "Mon", sales: 400 },
  { name: "Tue", sales: 700 },
  { name: "Wed", sales: 500 },
  { name: "Thu", sales: 900 },
  { name: "Fri", sales: 1200 },
];

// ================= MAIN COMPONENT =================
export default function AdminPage() {
  const [form, setForm] = useState({ name: "", price: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function addProduct() {
    if (!form.name || !form.price) {
      setMessage("⚠️ Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setForm({ name: "", price: "" });
      setMessage("✅ Product added successfully");
    } catch (err: any) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Manage products, orders & analytics
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard icon={<Package />} title="Total Products" value="120" />
          <StatCard icon={<ShoppingCart />} title="Orders" value="45" />
          <StatCard icon={<IndianRupee />} title="Revenue" value="₹12,500" />
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* CHART */}
          <div className="lg:col-span-2 card">
            <h2 className="section-title">Sales Overview</h2>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#111"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* ADD PRODUCT */}
          <div className="card">
            <h2 className="section-title flex items-center gap-2">
              <Plus size={18} /> Add Product
            </h2>

            <div className="space-y-4">
              <Input
                placeholder="Product Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
              />

              <Input
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={(v) => setForm({ ...form, price: v })}
              />

              <button
                onClick={addProduct}
                disabled={loading}
                className="btn-primary"
              >
                {loading ? "Adding..." : "Add Product"}
              </button>

              {message && <p className="text-sm text-gray-600">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= REUSABLE COMPONENTS =================

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
    <div className="card flex items-center gap-4 hover:scale-[1.02] transition">
      <div className="p-3 bg-gray-100 rounded-xl">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-xl font-semibold text-gray-900">{value}</h2>
      </div>
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      className="input"
    />
  );
}
