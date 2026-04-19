"use client";

import { Package, ShoppingCart, IndianRupee } from "lucide-react";
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
    <div className="min-h-screen bg-[#f1f3f6] p-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
            <Package />
            <div>
              <p>Total Products</p>
              <h2>120</h2>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
            <ShoppingCart />
            <div>
              <p>Orders</p>
              <h2>45</h2>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
            <IndianRupee />
            <div>
              <p>Revenue</p>
              <h2>₹12,500</h2>
            </div>
          </div>
        </div>

        {/* CHART */}
        <div className="mt-10 bg-white p-6 rounded-xl shadow">
          <h2>Sales Overview</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}