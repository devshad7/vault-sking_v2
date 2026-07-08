"use client";

import { A11y, Autoplay, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

type Banner = {
  src: string;
  alt: string;
};

const desktopBanners: Banner[] = [
  {
    src: "https://ik.imagekit.io/vault088/vault/1.webp",
    alt: "Hydrating serum collection on a marble surface",
  },
  {
    src: "https://ik.imagekit.io/vault088/vault/2.webp",
    alt: "New vitamin C brightening range",
  },
  {
    src: "https://ik.imagekit.io/vault088/vault/3.webp",
    alt: "Daily SPF moisturizer for sensitive skin",
  },
  {
    src: "https://ik.imagekit.io/vault088/vault/4.webp",
    alt: "Seasonal skincare gift sets",
  },
  {
    src: "https://ik.imagekit.io/vault088/vault/5.webp",
    alt: "Seasonal skincare collection",
  },
];

const mobileBanners: Banner[] = [
  {
    src: "https://ik.imagekit.io/vault088/vault/6.webp",
    alt: "Hydrating serum collection – mobile",
  },
  {
    src: "https://ik.imagekit.io/vault088/vault/7.webp",
    alt: "New vitamin C brightening range – mobile",
  },
  {
    src: "https://ik.imagekit.io/vault088/vault/8.webp",
    alt: "Daily SPF moisturizer for sensitive skin – mobile",
  },
  {
    src: "https://ik.imagekit.io/vault088/vault/9.webp",
    alt: "Seasonal skincare gift sets – mobile",
  },
  {
    src: "https://ik.imagekit.io/vault088/vault/10.webp",
    alt: "Seasonal skincare collection – mobile",
  },
];

const swiperConfig = {
  modules: [Autoplay, Pagination, A11y, Keyboard],
  slidesPerView: 1 as const,
  loop: true,
  speed: 800,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: { clickable: true },
  keyboard: { enabled: true },
  a11y: { enabled: true },
};

export default function HomeBanner() {
  return (
    <section className="w-full cursor-pointer" aria-label="Featured promotions">
      {/* ── Mobile carousel (< 1280px) ── */}
      <div className="block xl:hidden">
        <Swiper {...swiperConfig} className="w-full">
          {mobileBanners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[clamp(220px,55vw,480px)] overflow-hidden">
                <Image
                  src={banner.src || ""}
                  alt={banner.alt}
                  loading="eager"
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                  // transformation={[{ quality: 90, format: "webp" }]}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ── Desktop carousel (≥ 1280px) — untouched ── */}
      <div className="hidden xl:block">
        <Swiper {...swiperConfig} className="w-full">
          {desktopBanners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[clamp(280px,50svh,680px)] overflow-hidden">
                <Image
                  src={banner.src || ""}
                  alt={banner.alt}
                  loading="eager"
                  width={1920}
                  height={1080}
                  className="h-full w-full object-cover object-center"
                  // transformation={[{ quality: 90, format: "webp" }]}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
