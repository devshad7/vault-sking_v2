import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function ProductBenefits({ benefits }: { benefits: string[] }) {
  if (!benefits || benefits.length === 0) return null;

  return (
    <div className="py-4">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <span className="text-gray-700">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
