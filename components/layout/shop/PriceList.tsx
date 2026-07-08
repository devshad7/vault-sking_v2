import React from "react";
import Title from "../Products/Title";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";

const priceArray = [
  { title: "Under NPR 1,000", value: "0-1000" },
  { title: "NPR 1,000 – 3,000", value: "1000-3000" },
  { title: "NPR 3,000 – 5,000", value: "3000-5000" },
  { title: "NPR 5,000+", value: "5000-100000" },
];

interface Props {
  selectedPrice?: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}

const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
  return (
    <div className="w-full py-3 border-b border-border/20 last:border-none">
      <Title className="text-sm font-semibold text-zinc-900 mb-2">Price Range</Title>
      <RadioGroup
        className="space-y-0.5"
        value={selectedPrice || ""}
        onValueChange={(val) => setSelectedPrice(val)}
      >
        {priceArray?.map((price, index) => {
          const isChecked = selectedPrice === price?.value;
          return (
            <div
              key={index}
              onClick={() => setSelectedPrice(price?.value)}
className="flex items-center gap-2 h-8 px-1 rounded-md hover:bg-muted/40 cursor-pointer transition-colors"            >
              <RadioGroupItem
                value={price?.value}
                id={`price-${price?.value}`}
              />
              <Label
                htmlFor={`price-${price?.value}`}
                className={`cursor-pointer text-sm transition-colors duration-150 ${
                  isChecked ? "font-semibold text-primary" : "font-normal text-text"
                } group-hover:text-primary flex-1 py-2`}
                onClick={(e) => e.preventDefault()} // Let parent div handle clicking
              >
                {price?.title}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
      {selectedPrice && (
        <button
          onClick={() => setSelectedPrice(null)}
          className="text-xs font-medium mt-3 block text-primary underline underline-offset-2 hover:text-accent hoverEffect"
        >
          Clear price
        </button>
      )}
    </div>
  );
};

export default PriceList;