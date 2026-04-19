"use client";

export default function LoginDropdown() {
  return (
    <div className="relative group">

      <button className="px-5 py-2 bg-black text-white rounded-lg">
        Login
      </button>

      <div className="absolute right-0 mt-2 w-64 bg-white border rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition">

        <div className="p-4 border-b text-sm">
          New customer? <span className="text-blue-600">Sign Up</span>
        </div>

        <div className="p-4 text-sm space-y-3">
          <div>My Profile</div>
          <div>Orders</div>
          <div>Wishlist</div>
          <div>Rewards</div>
          <div>Support</div>
        </div>

      </div>

    </div>
  );
}