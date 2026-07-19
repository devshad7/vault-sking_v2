import Link from "next/link";
import Image from "next/image";
import type { Brand } from "@/data/products";

interface BrandCardProps {
  brand: Brand;
}

const BrandCard = ({ brand }: BrandCardProps) => {
  if (!brand?.image || brand.image.trim().length === 0) return null;

  return (
    <Link
  href={{
    pathname: "/shop",
    query: { brand: brand.slug?.current },
  }}
  className="group flex h-20 items-center justify-center rounded-xl border border-border bg-white p-3 transition-all duration-300 hover:border-primary hover:shadow-md"
>
  <Image
    src={brand.image}
    alt={brand.title || "Brand"}
    width={220}
    height={120}
    className="max-h-20 w-auto object-contain transition-all duration-300 group-hover:scale-105"
  />
</Link>
  );
};

export default BrandCard;