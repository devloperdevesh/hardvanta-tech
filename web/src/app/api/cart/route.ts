import { handleAddToCart, handleGetCart } from "../../../modules/cart/controller";

export async function GET() {
  return Response.json(handleGetCart());
}

export async function POST(req: Request) {
  const data = await req.json();
  return Response.json(handleAddToCart(data));
}