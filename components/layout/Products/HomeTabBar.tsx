import Link from "next/link";
import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { Category } from "@/data/products";
import Title from "@/components/layout/Products/Title";
interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabBar = ({ selectedTab, onTabSelect }: Props) => {
  const [categories, setCategories] = React.useState<Category[]>([]);

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

  return (
    <div className=" max-w-7xl mx-auto space-y-4">
      {/* Header row */}
      <div className="w-full border-b border-border pb-4">
        <div className="flex items-center justify-between">
          <Title className="text-2xl font-bold">Our Products</Title>

          <Link
            href="/shop"
            className="group flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            See all
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      {/* Scrollable pill chips — mobile-first */}
      <div
        className="hidden md:flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 snap-x snap-mandatory scrollbar-hide"
        role="tablist"
      >
        {categories?.map((item) => {
          const isActive = selectedTab === item._id;
          return (
            <button
              key={item._id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabSelect(item._id)}
              className={`
                snap-start shrink-0
                px-4 py-2.5
                text-sm font-medium
                rounded-full
                min-h-11
                border
                transition-all duration-200
                ${
                  isActive
                    ? "bg-primary text-white border-primary"
                    : "bg-transparent text-text-muted border-border hover:border-primary/40 hover:text-text"
                }
              `}
            >
              {item.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HomeTabBar;
