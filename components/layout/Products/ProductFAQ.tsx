import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ProductFAQ({ faq }: { faq: { question: string; answer: string }[] }) {
  if (!faq || faq.length === 0) return <p className="text-gray-500">No frequently asked questions available.</p>;

  return (
    <div className="max-w-3xl py-4">
      <Accordion className="w-full">
        {faq.map((item) => (
          <AccordionItem key={item.question} value={`faq-${item.question}`}>
            <AccordionTrigger className="text-lg font-medium text-gray-900 hover:text-primary">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-600 leading-relaxed pt-2 pb-6">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
