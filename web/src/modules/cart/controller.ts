import { addToCart, getCart } from "./service";

// ================= ADD =================
export function handleAddToCart(
  userId: string,
  productId: string,
  quantity: number = 1
) {
  return addToCart(userId, productId, quantity);
}

// ================= GET =================
export function handleGetCart(userId: string) {
  return getCart(userId);
}