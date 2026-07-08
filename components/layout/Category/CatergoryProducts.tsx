"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import NoProductFound from "@/components/layout/Products/NoProductFound";
import ProductCard from "@/components/layout/Products/ProductCard";
import { getProductsByCategory } from "@/lib/frontend-data";
import type { Category } from "@/data/products";

interface Props {
  categories: Category[];
  slug: string;
}

const CategoryProducts = ({ categories, slug }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const router = useRouter();

  const products = useMemo(() => getProductsByCategory(currentSlug), [currentSlug]);

  const handleCategoryChange = (newSlug: string) => {
    if (newSlug === currentSlug) return;
    setCurrentSlug(newSlug);
    router.push(`/category/${newSlug}`, { scroll: false });
  };

  return (
    <div className="py-5 flex flex-col md:flex-row items-start gap-5 text-text">
      <div className="flex flex-col md:min-w-40 border border-border bg-surface rounded-md overflow-hidden">
        {categories.map((cat) => {
          const slugVal = cat.slug?.current;
          if (!slugVal) return null;

          const isActive = slugVal === currentSlug;

          return (
            <Button
              key={cat._id}
              onClick={() => handleCategoryChange(slugVal)}
              className={`bg-transparent border-0 p-0 rounded-none shadow-none w-full text-left px-3 py-2 transition-colors border-b border-border last:border-b-0 hover:bg-primary hover:text-white ${isActive ? "bg-primary text-white" : "text-text"}`}
            >
              {cat.title}
            </Button>
          );
        })}
      </div>

      <div className="flex-1">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
            <AnimatePresence>
              {products.map((p) => (
                <motion.div key={p._id} layout>
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <NoProductFound selectedTab={currentSlug} />
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;