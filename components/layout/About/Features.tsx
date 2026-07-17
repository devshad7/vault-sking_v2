"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container";
import { BadgeCheck, Truck, ShieldCheck, Headphones, HeartHandshake, Sparkles } from "lucide-react";

const features = [
  {
    title: "100% Authentic Products",
    description: "We guarantee the authenticity of every single item we sell.",
    icon: BadgeCheck,
  },
  {
    title: "Trusted Brand Partners",
    description: "Direct partnerships with reputable skincare brands.",
    icon: HeartHandshake,
  },
  {
    title: "Fast Delivery",
    description: "Quick and reliable shipping across Nepal.",
    icon: Truck,
  },
  {
    title: "Secure Shopping",
    description: "Your payment and personal data are always protected.",
    icon: ShieldCheck,
  },
  {
    title: "Responsive Support",
    description: "Our dedicated team is here to help you anytime.",
    icon: Headphones,
  },
  {
    title: "Curated Collection",
    description: "Hand-picked products that actually deliver results.",
    icon: Sparkles,
  },
];

const Features = () => {
  return (
    <Container className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-accent tracking-tight">Why Choose Vault Skin ?</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white border border-border/10 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center mb-5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Icon size={20} strokeWidth={2} />
              </div>
              <h3 className="text-lg font-semibold text-accent mb-2">{feature.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </Container>
  );
};

export default Features;
