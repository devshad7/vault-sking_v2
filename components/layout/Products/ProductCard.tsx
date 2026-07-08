import type { Product } from "@/data/products";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import PriceView from "./PriceView";
import Title from "./Title";
import AddToCartButton from "./AddToCartButton";
import AddToWishlistButton from "./AddToWishlistButton";

const statusConfig = {
  sale: "bg-red-500 text-white",
  new: "bg-green-500 text-white",
  hot: "bg-orange-500 text-white",
};

const ProductCard = ({
  product,
  layout = "default",
}: {
  product: Product;
  layout?: "default" | "compact";
}) => {
  const isCompact = layout === "compact";
  return (
    <div
      className={`text-sm group flex flex-col ${isCompact ? "gap-2.5 w-full" : "gap-3"}`}
    >
      <div className="relative overflow-hidden bg-bg/90 rounded-md aspect-4/5">
        {product?.images && (
          <Link
            href={`/product/${product?.slug?.current}`}
            className=" relative w-full h-full block"
          >
            <Image
              src={product.images[0]?.url || product.thumbnail || ""}
              alt={product?.name || "Product Image"}
              fill
              priority
              sizes={
                isCompact
                  ? "(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                  : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              }
              className={`object-cover transition-transform duration-300 ease-out 
              ${product?.stock !== 0 ? "group-hover:scale-[1.02]" : "opacity-60"}`}
            />
          </Link>
        )}
        <div className="absolute top-2 right-2 z-10">
          <AddToWishlistButton product={product} />
        </div>
        {product?.status &&
          statusConfig[product.status as keyof typeof statusConfig] && (
            <span
              className={`absolute top-2 left-2 z-10 px-2 py-0.5 text-xs font-medium rounded shadow-sm ${
                statusConfig[product.status as keyof typeof statusConfig]
              }`}
            >
              {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
            </span>
          )}
      </div>
      <div className="flex flex-col gap-1">
        <Link
          href={`/product/${product?.slug?.current}`}
          className="hover:opacity-80 transition-opacity"
        >
          <Title className="text-base font-medium line-clamp-1">
            {product?.name}
          </Title>
        </Link>
        <PriceView price={product?.price} discount={product?.discount} />
        <div className="mt-2 opacity-100 lg:opacity-0 lg:-translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-300 ease-out">
          <AddToCartButton product={product} className="w-full rounded" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
