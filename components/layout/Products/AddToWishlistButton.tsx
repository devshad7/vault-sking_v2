"use client";

import { Heart } from "lucide-react";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

const AddToWishlistButton = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  return (
    <div
      // onClick={handleFavorite}
      className={cn("absolute top-1 right-2 z-10 cursor-pointer", className)}
    >
      <div className="p-2.5 rounded-full hover:bg-accent/10 hoverEffect">
        <Heart
          size={20}
          fill={"none"}
          // className={cn("text-accent", isFavorite && "fill-current")}
        />
      </div>
    </div>
  );
};

export default AddToWishlistButton;
