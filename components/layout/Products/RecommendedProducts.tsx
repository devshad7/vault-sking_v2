"use client";

import { useEffect, useState } from "react";
import ProductCard from "../Products/ProductCard";
import { fetchProducts } from "@/lib/product"; 
import type { Product } from "@/data/products";

export default function RecommendedProducts({ currentProductId }: { currentProductId?: string }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      // Filter out the current product and take up to 4 recommendations
      const filtered = currentProductId
        ? data.filter((p) => p._id !== currentProductId)
        : data;
      setProducts(filtered.slice(0, 4));
    };

    load();
  }, [currentProductId]);

  if (!products.length) return null;

  return (
    <div className="print:hidden">
      <div className="py-10 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-text">
          You might also like
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}