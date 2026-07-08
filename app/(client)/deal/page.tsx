import Container from "@/components/Container";
import ProductCard from "@/components/layout/Products/ProductCard";
import Title from "@/components/layout/Products/Title";
import { getDealProducts } from "@/lib/frontend-data";
import React from "react";

const DealPage = () => {
  const products = getDealProducts();
  return (
    <div className="py-10 bg-deal-bg">
      <Container>
        <Title className="mb-5 underline underline-offset-4 decoration text-base uppercase tracking-wide">
          Hot Deals of the Week
        </Title>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {products?.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DealPage;