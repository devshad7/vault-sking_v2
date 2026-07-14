"use client";

import { Heart } from "lucide-react";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/hooks/useWishlist";
import toast from "react-hot-toast";

const AddToWishlistButton = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const isFavorite = product._id ? isWishlisted(product._id) : false;

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.promise(toggleWishlist(product), {
      loading: "Updating wishlist...",
      success: isFavorite
        ? `${product.name} removed from wishlist`
        : `${product.name} added to wishlist`,
      error: "Failed to update wishlist",
    });
  };

  return (
    <div
      onClick={handleFavorite}
      className={cn("cursor-pointer", className)}
    >
      <div className="p-2.5 rounded-full hover:bg-accent/10 hoverEffect">
        <Heart
          size={20}
          fill={isFavorite ? "currentColor" : "none"}
          className={cn("text-accent", isFavorite && "fill-current")}
        />
      </div>
    </div>
  );
};

export default AddToWishlistButton;
