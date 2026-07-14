import Link from "next/link";
import type { Brand } from "@/data/products";
import Title from "../Products/Title";
import BrandCarousel from "./BrandCarousel";
import { GitCompareArrows, Headset, ShieldCheck} from "lucide-react";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase.config";

const extraData = [
  {
    title: "Easy Returns",
    description: "Hassle-free return policy",
    icon: <GitCompareArrows size={42} />,
  },
  {
    title: "Customer Support",
    description: "Friendly 24/7 customer support",
    icon: <Headset size={42} />,
  },
  {
    title: "Money Back Guarantee",
    description: "Quality checked by our team",
    icon: <ShieldCheck size={42} />,
  },
];

const ShopByBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "categories"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...(doc.data() as Omit<Brand, "_id">),
          _id: doc.id,
        }));

        setBrands(data);
      },
      (error) => {
        console.error(error);
      },
    );

    return unsubscribe;
  }, []);

  if (!brands?.length) return null;

  return (
    <section className="mb-2 rounded-2xl bg-surface p-5 lg:mb-6 lg:p-7">
      <div className="mb-6 flex items-center justify-between">
        <Title>Shop By Brands</Title>

        <Link
          href="/shop"
          className="text-sm font-semibold tracking-wide transition-colors hover:text-primary"
        >
          View all
        </Link>
      </div>

      <BrandCarousel brands={brands} />

      <div className="mt-4 grid grid-cols-1 gap-6 border-t border-accent/90 pt-4 sm:grid-cols-2 lg:grid-cols-4">
        {extraData.map((item) => (
          <div key={item.title} className="group flex items-center gap-4">
            <span className="text-primary transition-transform duration-300 group-hover:scale-90">
              {item.icon}
            </span>

            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByBrands;
