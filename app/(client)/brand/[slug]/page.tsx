import React from "react";
import type { Metadata } from "next";
import { getBrands } from "@/lib/frontend-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrands().find((item) => item.slug.current === slug);

  return {
    title: brand
      ? `${brand.title} | Vault Skin`
      : `${slug} | Vault Skin`,
    description:
      brand?.description ||
      `Shop ${brand?.title ?? slug} skincare products at Vault Skin.`,
  };
}

const BrandPage = () => {
  return <div>BrandPage</div>;
};

export default BrandPage;