"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface LegalSectionProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  delay?: number;
}

export function LegalSection({ icon: Icon, title, children, delay = 0 }: LegalSectionProps) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-6 hover:shadow-sm hoverEffect"
    >
      <div className="flex items-center gap-3 border-b border-border/50 pb-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg text-primary group-hover:scale-105 transition-transform">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-[19px] font-semibold text-text">{title}</h3>
      </div>
      <div className="text-[15.5px] leading-[1.8] text-text-muted space-y-4">
        {children}
      </div>
    </motion.section>
  );
}
