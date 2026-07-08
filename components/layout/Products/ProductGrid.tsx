"use client";

import { useEffect, useMemo, useState } from "react";
import HomeTabBar from "./HomeTabBar";
import { AnimatePresence, motion } from "motion/react";
import NoProductFound from "./NoProductFound";
import ProductCard from "./ProductCard";
import { productCategories } from "@/constants/data";
import { Product } from "@/lib/frontend-data";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase.config";

const ProductGrid = () => {
  const [selectedTab, setSelectedTab] = useState(productCategories[0].value);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...(doc.data() as Omit<Product, "_id">),
          _id: doc.id,
        }));

        setProducts(data);
      },
      (error) => {
        console.error(error);
      },
    );

    return unsubscribe;
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedTab === "all") {
      return products;
    }
    return products.filter((product) => product.category === selectedTab);
  }, [products, selectedTab]);

  return (
    <div className="w-full">
      <HomeTabBar selectedTab={selectedTab} onTabSelect={setSelectedTab} />

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 lg:gap-4 w-full mt-7">
          <AnimatePresence>
            {filteredProducts.map((p) => (
              <motion.div key={p._id} layout>
                <ProductCard product={p} layout="compact" />
              </motion.div>
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
