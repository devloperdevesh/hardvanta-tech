import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { getUser } from "@/lib/auth";
import { z } from "zod";

// ================= INIT =================
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// ================= SCHEMA =================
const checkoutSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().min(1),
    })
  ),
});

// ================= TYPES =================
type Product = {
  id: string;
  name: string;
  price: number;
};

// ================= API =================
export async function POST(req: NextRequest) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid request" },
        { status: 400 }
      );
    }

    const { items } = parsed.data;

    // 🧠 FETCH PRODUCTS
    const productIds = items.map((i) => i.productId);

    const products: Product[] = await db.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, name: true, price: true },
    });

    if (products.length !== items.length) {
      return NextResponse.json(
        { success: false, message: "Invalid products" },
        { status: 400 }
      );
    }

    // 💰 LINE ITEMS (NO STRICT TYPE — SAFE)
    const lineItems = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);

      if (!product) throw new Error("Product not found");

      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: product.name,
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: item.quantity,
      };
    });

    // 🧾 TOTAL
    const totalAmount = lineItems.reduce((sum, item) => {
      return sum + item.price_data.unit_amount * item.quantity;
    }, 0);

    // 🧾 CREATE ORDER
    const order = await db.order.create({
      data: {
        userId: user.id,
        status: "PENDING",
        total: totalAmount / 100,
      },
    });

    // 💳 STRIPE SESSION
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems as any, // 🔥 FINAL FIX
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?orderId=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      metadata: {
        userId: user.id,
        orderId: String(order.id),
      },
    });

    return NextResponse.json({
      success: true,
      url: session.url,
    });

  } catch (err: any) {
    console.error("STRIPE_ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        message: err.message || "Checkout failed",
      },
      { status: 500 }
    );
  }
}