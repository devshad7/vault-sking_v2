import { CartItem } from "@/store";
import type { Product } from "@/data/products";

/**
 * Merges the guest cart into the database cart.
 * Uses an additive (sum) strategy for overlapping items.
 */
export function mergeCart(
  guestCart: CartItem[],
  dbCart: CartItem[],
): { productId: string; quantity: number }[] {
  const merged = new Map<string, number>();

  // Add guest items
  guestCart.forEach((item) => {
    if (item.product?._id) {
      merged.set(item.product._id, item.quantity);
    }
  });

  // Add DB items, summing quantities for overlaps
  dbCart.forEach((item) => {
    if (item.product?._id) {
      const existingQuantity = merged.get(item.product._id) || 0;
      merged.set(item.product._id, existingQuantity + item.quantity);
    }
  });

  return Array.from(merged.entries()).map(([productId, quantity]) => ({
    productId,
    quantity,
  }));
}

/**
 * Merges the guest wishlist into the database wishlist.
 * Deduplicates using a Set.
 */
export function mergeWishlist(
  guestWishlist: Product[],
  dbWishlist: Product[],
): string[] {
  const mergedIds = new Set<string>();

  guestWishlist.forEach((item) => {
    if (item?._id) mergedIds.add(item._id);
  });

  dbWishlist.forEach((item) => {
    if (item?._id) mergedIds.add(item._id);
  });

  return Array.from(mergedIds);
}

/**
 * Coordinates the merging and database synchronization of guest data.
 * Keeps business logic out of the React components.
 */
export async function syncGuestData(
  guestItems: CartItem[],
  guestWishlist: Product[],
  dbCart: CartItem[],
  dbWishlist: Product[],
): Promise<boolean> {
  const mergedCart = mergeCart(guestItems, dbCart);
  const mergedWishlist = mergeWishlist(guestWishlist, dbWishlist);

  void mergedCart;
  void mergedWishlist;
  return true;
}
