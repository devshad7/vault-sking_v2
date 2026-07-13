"use client";

const WISHLIST_KEY = "guest_wishlist";
const LEGACY_WISHLIST_KEY = "vault-skin-wishlist";

const migrateLegacyWishlist = () => {
  if (typeof window === "undefined") return;

  const legacy = localStorage.getItem(LEGACY_WISHLIST_KEY);
  if (!legacy) return;

  try {
    const legacyIds = JSON.parse(legacy) as string[];
    const current = readWishlistIds();
    const merged = [...new Set([...current, ...legacyIds])];
    saveGuestWishlist(merged);
    localStorage.removeItem(LEGACY_WISHLIST_KEY);
  } catch {
    localStorage.removeItem(LEGACY_WISHLIST_KEY);
  }
};

const readWishlistIds = (): string[] => {
  if (typeof window === "undefined") return [];

  migrateLegacyWishlist();

  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
};

/**
 * Get guest wishlist product IDs
 */
export const getGuestWishlist = (): string[] => readWishlistIds();

/**
 * Save guest wishlist
 */
export const saveGuestWishlist = (ids: string[]) => {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
};

/**
 * Add product to guest wishlist
 */
export const addGuestWishlistItem = (productId: string): string[] => {
  const wishlist = getGuestWishlist();

  if (wishlist.includes(productId)) {
    return wishlist;
  }

  const updated = [...wishlist, productId];
  saveGuestWishlist(updated);

  return updated;
};

/**
 * Remove product from guest wishlist
 */
export const removeGuestWishlistItem = (productId: string): string[] => {
  const updated = getGuestWishlist().filter((id) => id !== productId);
  saveGuestWishlist(updated);

  return updated;
};

/**
 * Toggle product in guest wishlist
 */
export const toggleGuestWishlistItem = (productId: string): string[] => {
  const wishlist = getGuestWishlist();

  if (wishlist.includes(productId)) {
    return removeGuestWishlistItem(productId);
  }

  return addGuestWishlistItem(productId);
};

/**
 * Clear guest wishlist
 */
export const clearGuestWishlist = () => {
  localStorage.removeItem(WISHLIST_KEY);
};

/**
 * Check if product is in guest wishlist
 */
export const isInGuestWishlist = (productId: string) => {
  return getGuestWishlist().includes(productId);
};

/**
 * Guest wishlist count
 */
export const getGuestWishlistCount = () => getGuestWishlist().length;
