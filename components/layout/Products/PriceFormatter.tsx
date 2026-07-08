import { twMerge } from "tailwind-merge";

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormatter = ({ amount = 0, className }: Props) => {
  const formattedPrice = Number(amount).toLocaleString("en-NP", {
    style: "currency",
    currency: "NPR",
    minimumFractionDigits: 0,
  });

  return (
    <span
      className={twMerge("text-sm font-semibold text-text", className)}
    >
      {formattedPrice}
    </span>
  );
};

export default PriceFormatter;