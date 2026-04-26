import crypto from "crypto";
import { db } from "@/lib/db"; // ✅ FIXED
import { NextResponse } from "next/server";
import { z } from "zod";

// ================= SCHEMA =================
const verifySchema = z.object({
  order_id: z.string(),
  payment_id: z.string(),
  signature: z.string(),
  orderId: z.string(),
});

// ================= API =================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = verifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid payload" },
        { status: 400 }
      );
    }

    const { order_id, payment_id, signature, orderId } = parsed.data;

    // 🔐 SIGNATURE VERIFY
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${order_id}|${payment_id}`)
      .digest("hex");

    if (generatedSignature !== signature) {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 400 }
      );
    }

    // ✅ UPDATE ORDER
    const updated = await db.order.update({
      where: { id: orderId },
      data: {
        status: "PAID", // ⚠️ ensure this exists in Prisma enum
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });

  } catch (err: any) {
    console.error("RAZORPAY_VERIFY_ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        message: err.message || "Verification failed",
      },
      { status: 500 }
    );
  }
}