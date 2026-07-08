"use client";
import type { Product } from "@/data/products";
import { Heart } from "lucide-react";

const FavoriteButton = ({
  showProduct = false,
  product,
}: {
  showProduct?: boolean;
  product?: Product | null | undefined;
}) => {
  return (
    <button
      // onClick={handleFavorite}
      className="group relative hover:text-accent hoverEffect border border-accent/80 hover:border-accent p-1.5 rounded-sm"
    >
      <Heart
        fill={"none"}
        className="text-accent/80 group-hover:text-accent hoverEffect mt-.5 w-5 h-5"
      />
    </button>
  );
};

export default FavoriteButton;
