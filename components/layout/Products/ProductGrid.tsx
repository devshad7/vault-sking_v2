"use client";

import { useEffect, useMemo, useState } from "react";
import HomeTabBar from "./HomeTabBar";
import { AnimatePresence, m } from "motion/react";
import NoProductFound from "./NoProductFound";
import ProductCard from "./ProductCard";
import { productCategories } from "@/constants/data";
import { Product } from "@/lib/frontend-data";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase.config";

const ProductGrid = () => {
  const [selectedTab, setSelectedTab] = useState(productCategories[0].value);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...(doc.data() as Omit<Product, "_id">),
          _id: doc.id,
        }));

        setProducts(data);
        setIsLoading(false);
      },
      (error) => {
        console.error(error);
        setIsLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  const DISPLAY_LIMIT = 10;

  const filteredProducts = useMemo(() => {
    const byTab =
      selectedTab === "all"
        ? products
        : products.filter((product) => product.category === selectedTab);
    return byTab.slice(0, DISPLAY_LIMIT);
  }, [products, selectedTab]);

  return (
    <div className="w-full">
      <HomeTabBar selectedTab={selectedTab} onTabSelect={setSelectedTab} />

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-3 gap-y-2 lg:gap-x-4 lg:gap-y-3 w-full ">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="aspect-4/5 rounded-md bg-bg/60 animate-pulse"
            />
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-3 gap-y-2 lg:gap-x-4 lg:gap-y-3 w-full ">
          <AnimatePresence>
            {filteredProducts.map((p, index) => (
              <m.div key={p._id} layout>
                <ProductCard product={p} layout="compact" index={index} />
              </m.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <NoProductFound selectedTab={selectedTab} />
      )}
    </div>
  );
};

export default ProductGrid;