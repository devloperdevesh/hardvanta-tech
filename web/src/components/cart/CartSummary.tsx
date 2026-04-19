export default function CartSummary({ cart }: any) {
    const total = cart.reduce((acc: number, item: any) => acc + item.price, 0);
  
    return (
      <div className="mt-6 p-4 border rounded-xl">
        <h2 className="font-bold text-lg">Total: ₹{total}</h2>
      </div>
    );
  }
  async function handleCheckout(cart: any[]) {
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ items: cart }),
    });
  
    const data = await res.json();
    window.location.href = data.url;
  }
  <button
  onClick={() => handleCheckout(cart)}
  className="btn w-full mt-4"
>
  Checkout
</button>