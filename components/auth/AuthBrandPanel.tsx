import React from "react";
import Image from "next/image";
import { ShieldCheck, Lock, Truck, BadgeCheck } from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "100% Authentic",
    desc: "Direct from trusted brands",
  },
  {
    icon: Lock,
    title: "Secure Payment",
    desc: "Encrypted checkout",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Nationwide shipping",
  },
];

export default function AuthBrandPanel() {
  return (
    <div className="hidden md:flex md:w-[40%] relative overflow-hidden bg-primary">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/90 to-primary/80" />

      {/* Abstract blurred shapes */}
      <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-accent opacity-20 blur-[90px]" />
      <div className="absolute bottom-10 -right-16 w-72 h-72 rounded-full bg-secondary opacity-10 blur-[100px]" />
      <div className="absolute top-1/3 right-0 w-40 h-40 rounded-full bg-secondary opacity-5 blur-[60px]" />



      {/* Content */}
      <div className="relative z-10 flex flex-col w-full px-8 lg:px-12 py-6 gap-8">
        {/* Upper Content */}
        <div className="flex flex-col gap-3 max-w-xs mt-2">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">
            Vault Enterprises Pvt. Ltd.
          </span>
          <h1 className="font-sans text-[32px] lg:text-[36px] leading-[1.15] text-white">
            Skincare worth vaulting.
          </h1>
          <p className="text-[14px] leading-relaxed text-secondary/80">
            Authenticated formulas, sourced direct, delivered to your door.
          </p>
        </div>

         <div className="grid gap-3">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
              >
                <div className="rounded-xl bg-accent/15 p-3">
                  <Icon className="h-5 w-5 text-accent" />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {title}
                  </h4>

                  <p className="text-xs text-secondary/70">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}
