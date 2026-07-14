"use client";

import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";
import Container from "@/components/Container";

const MissionVision = () => {
  return (
    <Container className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-border/10 p-8 rounded-2xl flex flex-col items-center text-center shadow-sm h-full"
        >
          <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center mb-5 text-primary">
            <Target size={24} strokeWidth={2} />
          </div>
          <h3 className="text-xl font-semibold text-accent mb-3">Our Mission</h3>
          <p className="text-base text-text-muted leading-relaxed">
           To make authentic skincare accessible, affordable, and trustworthy for everyone.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white border border-border/10 p-8 rounded-2xl flex flex-col items-center text-center shadow-sm h-full"
        >
          <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center mb-5 text-primary">
            <Eye size={24} strokeWidth={2} />
          </div>
          <h3 className="text-xl font-semibold text-accent mb-3">Our Vision</h3>
          <p className="text-base text-text-muted leading-relaxed">
            To become Nepal's most trusted online destination for premium skincare.
          </p>
        </motion.div>
      </div>

    </Container>
  );
};

export default MissionVision;
