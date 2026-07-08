import CategoryProducts from "@/components/layout/Category/CatergoryProducts";
import Container from "@/components/Container";
import Title from "@/components/layout/Products/Title";
import { getCategories } from "@/lib/frontend-data";
import React from "react";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return (
    <div className="py-10">
      <Container>
        <Title>
          Products by Category:{" "}
          <span className="font-bold text-green-600 capitalize tracking-wide">
            {slug && slug}
          </span>
        </Title>
        <CategoryProducts categories={getCategories()} slug={slug} />
      </Container>
    </div>
  );
};

export default CategoryPage;