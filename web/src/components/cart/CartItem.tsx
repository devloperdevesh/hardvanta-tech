export default function CartItem({ item }: any) {
    return (
      <div className="flex justify-between border p-3 rounded-lg">
        <span>{item.name}</span>
        <span>₹{item.price}</span>
      </div>
    );
  }