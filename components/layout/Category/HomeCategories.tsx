"use client";

import { collection, onSnapshot } from "firebase/firestore";
import Title from "../Products/Title";
import type { Category } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "@/config/firebase.config";
import { getCategoryProductCount } from "@/utils/helper";

const HomeCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "categories"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...(doc.data() as Omit<Category, "_id">),
          _id: doc.id,
        }));

        setCategories(data);
      },
      (error) => {
        console.error(error);
      },
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "categories"),
      async (snapshot) => {
        const data = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const category = {
              ...(doc.data() as Category),
              _id: doc.id,
            };

            const productCount = await getCategoryProductCount(doc.id);

            return {
              ...category,
              productCount,
            };
          }),
        );

        setCategories(data);
      },
    );

    return unsubscribe;
  }, []);

  return (
    <div className="bg-white border border-border/20  p-3 lg:p-5 rounded-md">
      <Title className="border-b pb-3">Popular Categories</Title>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {categories?.map((category) => (
          <div
            key={category?._id}
            className="bg-bg p-5 flex items-center gap-3 group"
          >
            {category?.image && (
              <div className="overflow-hidden border border-accent/30 hover:border-accent hoverEffect w-20 h-20 p-1">
                <Link href={`/category/${category?.slug?.current}`}>
                  <Image
                    src={category?.image}
                    alt="categoryImage"
                    width={500}
                    height={500}
                    className="w-full h-full object-contain group-hover:scale-110 hoverEffect"
                  />
                </Link>
              </div>
            )}
            <div className="space-y-1">
              <h3 className="text-base font-semibold">{category?.title}</h3>
              <p className="text-sm">
                <span className="font-bold text-primary">{`(${category?.productCount ?? 0})`}</span>{" "}
                items Available
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
