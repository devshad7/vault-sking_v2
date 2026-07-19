"use client";

import { m } from "framer-motion";
import Image from "next/image";
import Container from "@/components/Container";
import { CheckCircle2 } from "lucide-react";

const bulletPoints = [
  "Authentic products only",
  "Carefully curated collection",
  "Customer-first shopping",
  "Secure ordering",
  "Fast delivery",
  "Growing skincare destination",
];

const Story = () => {
  return (
    <Container className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
  {/* Image */}
  <m.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="relative flex items-center justify-center rounded-2xl border border-border/10 bg-accent/5 min-h-[400px] lg:min-h-full"
  >
    <Image
      src="/Images/logo.svg"
      alt="Vault Skin"
      width={400}
      height={400}
      className="object-contain"
    />
  </m.div>

  {/* Content */}
  <m.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="flex flex-col justify-center"
  >
    <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-accent tracking-tight">
      Curating Skincare You Can Trust
    </h2>

    <div className="space-y-4 mb-8 max-w-xl">
      <p className="text-base leading-relaxed text-text-muted">
        Vault Skin is a newly launched skincare retailer dedicated to bringing authentic products from trusted brands like SkinInspired to customers across Nepal.
      </p>
      <p className="text-base leading-relaxed text-text-muted">
        We believe that everyone deserves access to genuine, high-quality skincare without the guesswork.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
      {bulletPoints.map((point, index) => (
        <m.div
          key={point}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
          className="flex items-center gap-3"
        >
          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
          <span className="text-sm font-medium text-accent">
            {point}
          </span>
        </m.div>
      ))}
    </div>
  </m.div>
</div>
    </Container>
  );
};

export default Story;
