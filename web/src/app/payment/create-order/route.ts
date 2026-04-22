import Razorpay from "razorpay";
import { getUser } from "@/lib/auth";
import { getCart } from "@/modules/cart/service";

// ================= CREATE ORDER =================
export async function POST(req: Request) {
  try {
    // ✅ ENV VALIDATION (prevents silent crashes)
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay credentials are missing");
    }

    // ✅ INIT RAZORPAY INSIDE HANDLER (important for Next.js build)
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // ✅ AUTH
    const user = await getUser();

    if (!user) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ✅ GET CART FROM DB
    const cart = await getCart(user.id);

    if (!cart || !cart.items || cart.items.length === 0) {
      return Response.json(
        { success: false, message: "Cart is empty" },
        { status: 400 }
      );
    }

    // ✅ SECURE TOTAL CALCULATION
    const total = cart.items.reduce(
      (sum: number, item: any) =>
        sum + Number(item.price) * Number(item.quantity),
      0
    );

    if (total <= 0) {
      return Response.json(
        { success: false, message: "Invalid amount" },
        { status: 400 }
      );
    }

    // ✅ CREATE RAZORPAY ORDER
    const order = await razorpay.orders.create({
      amount: Math.round(total * 100), // convert to paise
      currency: "INR",
      receipt: `order_${user.id}_${Date.now()}`,
      notes: {
        userId: user.id,
      },
    });

    return Response.json({
      success: true,
      data: order,
    });

  } catch (err: any) {
    console.error("Create Order Error:", err);

    return Response.json(
      {
        success: false,
        message: err.message || "Payment failed",
      },
      { status: 500 }
    );
  }
}