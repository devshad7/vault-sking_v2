"use client";

import Container from "@/components/Container";
import HomeBanner from "@/components/layout/HeroBanner";
import ProductGrid from "@/components/layout/Products/ProductGrid";
import HomeCategories from "@/components/layout/Category/HomeCategories";
import ShopByBrands from "@/components/layout/Brands/ShopByBrands";
import LatestBlog from "@/components/layout/Blogs/LatestBlog";

const Home = () => {
  return (
    <>
      <HomeBanner />

      <Container className="py-8 md:py-12 flex flex-col gap-4 md:gap-6">
        <ProductGrid />
        <HomeCategories />
        <ShopByBrands />
        <LatestBlog />
      </Container>
    </>
  );
};

export default Home;
