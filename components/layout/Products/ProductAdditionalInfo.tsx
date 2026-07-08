import React from "react";
import type { Product } from "@/data/products";

export default function ProductAdditionalInfo({ product }: { product: Product }) {
  const allSpecs = product?.specifications || [];

  if (allSpecs.length === 0) {
    return <p className="text-gray-500">No additional information available.</p>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <table className="w-full text-left text-sm text-gray-700">
        <tbody className="divide-y divide-gray-200">
          {allSpecs.map((spec, index) => (
            <tr key={index} className="even:bg-gray-50 hover:bg-gray-100 transition-colors">
              <th className="w-1/3 p-4 font-semibold text-gray-900 border-r border-gray-200">
                {spec.label}
              </th>
              <td className="p-4">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
