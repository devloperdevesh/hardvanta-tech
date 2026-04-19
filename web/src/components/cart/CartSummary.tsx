export default function CartSummary({ cart }: any) {
    const total = cart.reduce((acc: number, item: any) => acc + item.price, 0);
  
    return (
      <div className="mt-6 p-4 border rounded-xl">
        <h2 className="font-bold text-lg">Total: ₹{total}</h2>
      </div>
    );
  }