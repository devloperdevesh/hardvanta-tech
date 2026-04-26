import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    // ✅ ENV check
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay keys missing");
    }

    // ✅ INIT INSIDE FUNCTION (IMPORTANT)
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
    });

    return Response.json(order);

  } catch (err: any) {
    console.error("RAZORPAY ERROR:", err);

    return Response.json(
      {
        success: false,
        message: err.message || "Payment failed",
      },
      { status: 500 }
    );
  }
}