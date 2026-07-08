"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { Brand } from "@/data/products";
import BrandCard from "./BrandCard";

interface BrandCarouselProps {
  brands: Brand[];
}

const BrandCarousel = ({ brands }: BrandCarouselProps) => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
    },
    [
      Autoplay({
        delay: 2500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="min-w-[50%] pl-3 sm:min-w-[33%] md:min-w-[25%] lg:min-w-[20%] xl:min-w-[16.66%]"
          >
            <BrandCard brand={brand} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandCarousel;