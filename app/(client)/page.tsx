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

      <Container>
        <div className="py-5">
          <ProductGrid />
        </div>
        <HomeCategories />
        <div className="py-5">
          <ShopByBrands />
        </div>
        <LatestBlog />
      </Container>
    </>
  );
};

export default Home;
