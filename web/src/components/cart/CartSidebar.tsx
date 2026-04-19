"use client";

export default function CartSidebar({ cart, onClose }: any) {
  const total = cart.reduce((acc: number, item: any) => acc + item.price, 0);

  return (
    <div className="fixed right-0 top-0 w-80 h-full bg-white shadow-2xl p-6 z-50 animate-slideIn">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={onClose}>✖</button>
      </div>

      {/* ITEMS */}
      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        <div className="space-y-3">
          {cart.map((item: any) => (
            <div
              key={item.id}
              className="border p-3 rounded-lg flex justify-between"
            >
              <span>{item.name}</span>
              <span className="text-blue-600">₹{item.price}</span>
            </div>
          ))}
        </div>
      )}

      {/* TOTAL */}
      <div className="mt-6 border-t pt-4">
        <p className="font-bold">Total: ₹{total}</p>
      </div>

      {/* BUTTON */}
      <button className="btn mt-4 w-full">
        Checkout
      </button>

    </div>
  );
}