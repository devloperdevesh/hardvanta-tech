import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// ================= TYPES =================
type CartItem = {
  productId: string;
  quantity: number;
};

// ================= CHECKOUT =================
export async function POST(req: Request) {
  try {
    const { items, userId } = await req.json();

    if (!items || !Array.isArray(items)) {
      return Response.json({ error: "Invalid items" }, { status: 400 });
    }

    const dbProducts = await getProductsFromDB(items);

    const lineItems = dbProducts.map((p: any) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: p.name,
        },
        unit_amount: p.price * 100,
      },
      quantity: p.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      metadata: { userId },
    });

    return Response.json({ url: session.url });

  } catch (err) {
    return Response.json({ error: "Checkout failed" }, { status: 500 });
  }
}

// ================= MOCK HELPERS =================
async function getProductsFromDB(items: CartItem[]) {
  return items.map((i) => ({
    name: `Product ${i.productId}`,
    price: 499,
    quantity: i.quantity,
  }));
}