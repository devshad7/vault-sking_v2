"use client";

export const RECENT_SEARCHES_KEY = "recentSearches:v1";
export const GUEST_CART_KEY = "guest_cart:v1";
export const GUEST_WISHLIST_KEY = "guest_wishlist:v1";

export const getRecentSearches = (): string[] => {
  if (typeof window === "undefined") return [];

  const legacy = localStorage.getItem("recentSearches");
  if (legacy) {
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, legacy);
      localStorage.removeItem("recentSearches");
      return JSON.parse(legacy);
    } catch {
      localStorage.removeItem("recentSearches");
    }
  }

  const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveRecentSearches = (searches: string[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
};
