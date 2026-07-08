"use client";

import { Product } from "@/lib/frontend-data";

export interface CartItem {
  productId: string;
  quantity: number;
}

const CART_KEY = "guest_cart";

/**
 * Get guest cart
 */
export const getGuestCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  const cart = localStorage.getItem(CART_KEY);

  return cart ? JSON.parse(cart) : [];
};

/**
 * Save guest cart
 */
export const saveGuestCart = (cart: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

/**
 * Add item to guest cart
 */
export const addGuestCartItem = (product: Product) => {
  const cart = getGuestCart();

  const existing = cart.find((item) => item.productId === product._id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      productId: product._id,
      quantity: 1,
    });
  }

  saveGuestCart(cart);

  return cart;
};

/**
 * Remove item completely
 */
export const removeGuestCartItem = (productId: string) => {
  const cart = getGuestCart().filter((item) => item.productId !== productId);

  saveGuestCart(cart);

  return cart;
};

/**
 * Increase quantity
 */
export const increaseGuestQuantity = (productId: string) => {
  const cart = getGuestCart();

  const item = cart.find((item) => item.productId === productId);

  if (item) {
    item.quantity++;
  }

  saveGuestCart(cart);

  return cart;
};

/**
 * Decrease quantity
 */
export const decreaseGuestQuantity = (productId: string) => {
  const cart = getGuestCart();

  const item = cart.find((item) => item.productId === productId);

  if (!item) return cart;

  if (item.quantity === 1) {
    return removeGuestCartItem(productId);
  }

  item.quantity--;

  saveGuestCart(cart);

  return cart;
};

/**
 * Clear guest cart
 */
export const clearGuestCart = () => {
  localStorage.removeItem(CART_KEY);
};

/**
 * Total cart count
 */
export const getGuestCartCount = () => {
  return getGuestCart().reduce((total, item) => total + item.quantity, 0);
};

/**
 * Check if item exists
 */
export const isInGuestCart = (productId: string) => {
  return getGuestCart().some((item) => item.productId === productId);
};

/**
 * Get quantity
 */
export const getGuestQuantity = (productId: string) => {
  const item = getGuestCart().find((item) => item.productId === productId);

  return item?.quantity ?? 0;
};
