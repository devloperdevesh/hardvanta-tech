import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type CartItem = {
  name: string;
  price: number;
  quantity?: number;
};

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    // ✅ VALIDATION
    if (!items || !Array.isArray(items)) {
      return new Response(
        JSON.stringify({ error: "Invalid items data" }),
        { status: 400 }
      );
    }

    // ✅ CREATE LINE ITEMS
    const lineItems = items.map((item: CartItem) => {
      if (!item.name || !item.price) {
        throw new Error("Invalid item structure");
      }

      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity ?? 1,
      };
    });

    // ✅ CREATE SESSION
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    });

    return Response.json({ url: session.url });

  } catch (error: any) {
    console.error("Stripe Error:", error.message);

    return new Response(
      JSON.stringify({ error: "Something went wrong" }),
      { status: 500 }
    );
  }
}