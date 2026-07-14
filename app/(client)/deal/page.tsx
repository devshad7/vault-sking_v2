"use client";

import Container from "@/components/Container";
import ProductCard from "@/components/layout/Products/ProductCard";
import Title from "@/components/layout/Products/Title";
import { db } from "@/config/firebase.config";
import type { Product } from "@/data/products";
import { collection, onSnapshot,query,where } from "firebase/firestore";
import { useEffect, useState } from "react";

const DealPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
useEffect(() => {
  const q = query(
    collection(db, "products"),
    where("status", "==", "hot")
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...(doc.data() as Omit<Product, "_id">),
        _id: doc.id,
      }));

      setProducts(data);
    },
    (error) => {
      console.error(error);
    }
  );

  return unsubscribe;
}, []);

  const dealProducts = products.filter(
    (product) => product.discount > 0 || product.status === "hot",
  );

  return (
    <div className="py-10 bg-deal-bg">
      <Container>
        <Title className="mb-5 underline underline-offset-4 decoration text-base uppercase tracking-wide">
          Hot Deals of the Week
        </Title>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {dealProducts.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DealPage;
