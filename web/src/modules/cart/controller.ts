import { addToCart, getCart } from "./service";

export function handleAddToCart(product: any) {
  return addToCart(product);
}

export function handleGetCart() {
  return getCart();
}