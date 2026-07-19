"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const SwiperBanner = dynamic(() => import("./SwiperBanner"), {
  ssr: false,
  loading: () => (
    <Image
      src="https://ik.imagekit.io/vault088/vault/1.svg"
      alt="Featured promotion"
      width={1920}
      height={680}
      priority
      fetchPriority="high"
      sizes="100vw"
      className="h-[clamp(280px,50svh,680px)] w-full object-cover object-center"
    />
  ),
});

export default function HomeBanner() {
  return <SwiperBanner />;
}