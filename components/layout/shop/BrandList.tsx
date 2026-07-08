import type { Brand } from "@/data/products";
import React, { useState } from "react";
import Title from "../Products/Title";
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";

interface Props {
  brands: Brand[];
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
}

const BrandList = ({ brands, selectedBrands, setSelectedBrands }: Props) => {
  const [showAll, setShowAll] = useState(false);

  const toggleBrand = (slug: string) => {
    setSelectedBrands((prev) =>
      prev.includes(slug) ? prev.filter((b) => b !== slug) : [...prev, slug]
    );
  };

  const visibleBrands = showAll ? brands : brands?.slice(0, 5);

  return (
<div className="w-full py-3 border-b border-border/20 last:border-none">
<Title className="text-base font-bold text-text mb-3">Brands</Title>
      <div className="space-y-0.5">
        {visibleBrands?.map((brand) => {
          const slug = brand?.slug?.current as string;
          const isChecked = selectedBrands.includes(slug);
          return (
            <div
              onClick={() => toggleBrand(slug)}
              key={brand?._id}
className="flex items-center gap-2 h-8 px-1 rounded-md hover:bg-muted/40 cursor-pointer transition-colors"            >
              <Checkbox
                checked={isChecked}
                id={`brand-${slug}`}
                onCheckedChange={() => toggleBrand(slug)}
              />
              <Label
                htmlFor={`brand-${slug}`}
                className={`cursor-pointer text-sm transition-colors duration-150 ${
                  isChecked ? "font-semibold text-primary" : "font-normal text-text"
                } group-hover:text-primary flex-1 py-2`}
                onClick={(e) => e.preventDefault()} // Let parent div handle clicking
              >
                {brand?.title}
              </Label>
            </div>
          );
        })}
      </div>

      {brands?.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-xs font-semibold mt-3 text-primary/80 hover:text-primary hoverEffect cursor-pointer flex items-center gap-1 py-1"
        >
          {showAll ? "Show Less ▲" : `Show More (+${brands.length - 5}) ▼`}
        </button>
      )}

      {selectedBrands.length > 0 && (
        <button
          onClick={() => setSelectedBrands([])}
          className="text-xs font-medium mt-3 block text-primary underline underline-offset-2 hover:text-accent hoverEffect"
        >
          Clear brands
        </button>
      )}
    </div>
  );
};

export default BrandList;