import { cart } from "./model";

export function addToCart(product: any) {
  cart.push(product);
  return cart;
}

export function getCart() {
  return cart;
}