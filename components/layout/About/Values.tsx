"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container";
import Title from "../Products/Title";

const values = [
  {
    title: "Transparency",
    description: "We believe customers deserve genuine products and honest information.",
  },
  {
    title: "Quality",
    description: "Every product is carefully selected before becoming part of our collection.",
  },
  {
    title: "Customer First",
    description: "Every decision we make starts with our customers.",
  },
];

const Values = () => {
  return (
    <Container className="w-full">
      <div className="text-center mb-6 mt-3">
        <Title className="text-3xl font-semibold text-accent tracking-tight border-b w-fit mx-auto p-1">Our Values</Title>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {values.map((value, index) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white border border-border/10 p-6 rounded-2xl text-center shadow-sm h-full"
          >
            <div className="text-primary font-serif text-3xl opacity-20 mb-3">
              0{index + 1}
            </div>
            <h3 className="text-lg font-semibold text-accent mb-2">{value.title}</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              {value.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Container>
  );
};

export default Values;
