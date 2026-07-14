"use client";

import Image from "next/image";
import Container from "@/components/Container";

const Founder = () => {
  return (
    <Container className="py-6 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        {/* Image */}
        <div className="relative h-[300px] md:h-[340px] lg:h-[383px] flex items-center justify-center">
          <div className="relative w-84 md:w-96 lg:w-120 h-full -mr-8 lg:-mr-43 rounded-2xl">
            <Image
              src="/Images/Founder.png"
              alt="Drishti Bhattrai"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-xl">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Founder
          </span>

          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-text">
            Drishti Bhattrai
          </h2>

          <p className="mt-2 text-base font-medium text-accent">
            Founder, Vault Skin
          </p>

          <div className="mt-6 space-y-3 text-base leading-8 text-text-muted">
            <p>
              Vault Skin was established with a simple purpose—to make authentic,
              high-quality skincare products easily accessible to customers
              across Nepal.
            </p>

            <p>
              We carefully select products from trusted brands, ensuring every
              item meets our standards for quality, authenticity, and customer
              satisfaction.
            </p>

            <p>
              As we continue to grow, our focus remains the same: providing a
              reliable shopping experience backed by genuine products,
              transparent service, and customer-first support.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Founder;