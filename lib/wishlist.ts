import { getProductById } from "@/lib/frontend-data";
import type { Product } from "@/data/products";

const STORAGE_KEY = "vault-skin-wishlist";

export function saveWishlistItem(productId: string) {
  const current = readWishlistItems();
  if (!current.includes(productId)) {
    current.push(productId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  }
  return true;
}

export function deleteWishlistItem(productId: string) {
  const current = readWishlistItems().filter((item) => item !== productId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  return true;
}

export function clearUserWishlist() {
  localStorage.removeItem(STORAGE_KEY);
  return true;
}

export function getWishlistItems() {
  return readWishlistItems();
}

export function loadUserWishlist(): Product[] {
  return readWishlistItems()
    .map((productId) => getProductById(productId))
    .filter((product): product is Product => Boolean(product));
}

function readWishlistItems() {
  if (typeof window === "undefined") {
    return [] as string[];
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [] as string[];
  }
}
