"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";

const Hero = () => {
  return (
    <section className="relative w-full py-8 md:py-16 flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/Images/about-bannerq.avif"
        alt="Banner"
        fill
        priority
        className="object-cover opacity-45 filter"
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/60 pointer-events-none" />

      <Container className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-text-muted mb-6 justify-center uppercase tracking-widest">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-primary">About</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-accent tracking-tight">
            About Vault Skin
          </h1>

          <p className="max-w-2xl text-base md:text-lg text-text-muted mx-auto leading-relaxed">
            Your trusted destination for authentic skincare products from carefully selected brands.
          </p>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
