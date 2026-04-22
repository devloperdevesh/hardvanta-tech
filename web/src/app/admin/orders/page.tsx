"use client";

import { useEffect, useState } from "react";

type Order = {
  orderId: string;
  userId: string;
  totalAmount: number;
  status: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading orders...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Orders Dashboard</h1>

      {orders.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow text-center text-gray-500">
          No orders found
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-semibold">{order.orderId}</p>

                <p className="text-sm text-gray-500 mt-2">User</p>
                <p>{order.userId}</p>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold text-[#1b6ca8]">
                  ₹{order.totalAmount}
                </p>

                <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600">
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
