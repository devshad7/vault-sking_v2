"use client";

import { getProductsByCategory } from "@/lib/frontend-data";

export function useCategoryProducts(slug: string) {
  return {
    products: getProductsByCategory(slug),
    isLoading: false,
    isError: false,
  };
}