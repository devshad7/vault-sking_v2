"use client";

import type { Product } from "@/data/products";
import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";

const FavoriteButton = ({
  product,
}: {
  showProduct?: boolean;
  product?: Product | null | undefined;
}) => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const isFavorite = product?._id ? isWishlisted(product._id) : false;

  const handleFavorite = async () => {
    if (!product) return;
    await toggleWishlist(product);
  };

  return (
    <button
      onClick={handleFavorite}
      className="group relative hover:text-accent hoverEffect border border-accent/80 hover:border-accent p-1.5 rounded-sm"
      aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        fill={isFavorite ? "currentColor" : "none"}
        className={cn(
          "text-accent/80 group-hover:text-accent hoverEffect mt-.5 w-5 h-5",
          isFavorite && "fill-current text-accent",
        )}
      />
    </button>
  );
};

export default FavoriteButton;
