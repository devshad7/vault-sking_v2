"use client";

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
        <div className="flex-1 w-full max-w-sm">
          <div className="w-full h-32 bg-surface rounded-xl overflow-hidden relative border border-border/20">
            <Image
              src="/Images/brand.avif"
              alt="SkinInspired Brand Logo"
              fill
              className="object-contain p-4"
            />
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
            <BadgeCheck size={14} />
            <span>Official Partner</span>
          </div>
          <h3 className="text-2xl font-bold text-accent tracking-tight">
            Science-Backed Solutions
          </h3>
          <p className="text-base text-text-muted leading-relaxed max-w-lg">
            SkinInspired is our premier skincare partner, renowned for their science-backed formulations and uncompromising quality. We are proud to bring their authentic solutions directly to you.
          </p>
        </div>
      </motion.div>
    </Container>
  );
};

export default PartnerBrand;
