import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: body.items,
    mode: "payment",
    success_url: "http://localhost:3000",
    cancel_url: "http://localhost:3000",
  });

  return Response.json({ id: session.id });
}