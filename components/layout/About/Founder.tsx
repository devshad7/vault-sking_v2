"use client";

import Image from "next/image";
import Container from "@/components/Container";
import Link from "next/link";
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
              sizes="(min-width: 1024px) 480px, (min-width: 768px) 384px, 336px"
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


          <p>
            Vault Enterprises Pvt. Ltd. is a Nepal-based company specializing in the
            import and distribution of premium skincare and beauty products. As the
            authorized importer and distributor of{" "}
            <Link
              href="https://www.skininspired.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              SkinInspired
            </Link>{" "}
            skincare products from India, we bring dermatologist-inspired, high-quality
            skincare solutions designed to address a wide range of skin concerns while
            ensuring authenticity, quality, and customer satisfaction.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Founder;