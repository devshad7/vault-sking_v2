"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/Container";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";

const PartnerBrand = () => {
  return (
    <Container className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white border border-border/10 rounded-2xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center gap-10 md:gap-16"
      >
        {/* Brand Logo */}
        <div className="flex-1 w-full max-w-sm">
          <div className="relative w-full h-32 bg-surface rounded-xl overflow-hidden border border-border/20">
            <Image
              src="/Images/brand.avif"
              alt="SkinInspired Brand Logo"
              fill
              className="object-contain p-4"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <BadgeCheck size={14} />
            <span>Official Brand Partner</span>
          </div>

          <h3 className="text-2xl font-bold tracking-tight text-accent">
            Authorized Importer & Distributor in Nepal
          </h3>

          <p className="max-w-lg text-base leading-relaxed text-text-muted">
            Vault Enterprises Pvt. Ltd. is the authorized importer and
            distributor of{" "}
            <Link
              href="https://www.skininspired.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary transition-colors hover:underline"
            >
              SkinInspired
            </Link>{" "}
            skincare products in Nepal. Developed in India, SkinInspired offers
            dermatologist-inspired, premium-quality skincare solutions designed
            to address a wide range of skin concerns. We are committed to
            delivering only authentic products, ensuring quality, trust, and
            customer satisfaction with every purchase.
          </p>
        </div>
      </motion.div>
    </Container>
  );
};

export default PartnerBrand;