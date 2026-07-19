"use client";

import ProductGrid from "@/components/layout/Products/ProductGrid";
import HomeCategories from "@/components/layout/Category/HomeCategories";
import ShopByBrands from "@/components/layout/Brands/ShopByBrands";

export default function HomeClient() {
  return (
    <>
      <ProductGrid />
      <HomeCategories />
      <ShopByBrands />
    </>
  );
}