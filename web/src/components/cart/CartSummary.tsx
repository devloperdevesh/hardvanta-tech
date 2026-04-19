"use client";

export default function CartSummary({ cart }: any) {

  const total = cart.reduce(
    (acc: number, item: any) => acc + item.price,
    0
  );

  async function handleCheckout() {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",   // ✅ important
        },
        body: JSON.stringify({ items: cart }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // ✅ redirect
      } else {
        alert("Checkout failed");
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  return (
    <div className="mt-6 p-4 border rounded-xl">

      <h2 className="font-bold text-lg">
        Total: ₹{total}
      </h2>

      <button
        onClick={handleCheckout}
        className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:opacity-90 transition"
      >
        Checkout
      </button>

    </div>
  );
}