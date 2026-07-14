"use client";

import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import toast from "react-hot-toast";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const { addToCart } = useCart();

  const isOutOfStock = product?.stock === 0;

  return (
    <div className="w-full h-10 flex items-center">
      <Button
        disabled={isOutOfStock}
        onClick={() => {
          toast.promise(addToCart(product), {
            loading: "Adding to cart...",
            success: `${product.name} added to cart`,
            error: "Failed to add to cart",
          });
        }}
        className={cn(
          "w-full h-9 rounded-xl bg-primary text-white font-medium shadow-sm border border-primary transition-all duration-300 hover:bg-accent hover:border-accent hover:shadow-md hover:-translate-y-0.5 disabled:bg-border disabled:border-border disabled:text-text-muted disabled:cursor-not-allowed",
          className,
        )}
      >
        <ShoppingBag className="w-4 h-4 mr-2" />
        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  );
};

export default AddToCartButton;
