import { cn } from "@/lib/utils";
import PriceFormatter from "./PriceFormatter";

interface Props {
  price: number | undefined;
  discount: number | undefined;
  className?: string;
}

const PriceView = ({ price = 0, discount = 0, className }: Props) => {
  const finalPrice = price - discount;

  return (
    <div className="flex items-center gap-2">
      <PriceFormatter
        amount={finalPrice}
        className={cn("text-primary font-bold", className)}
      />

      {discount > 0 && (
        <PriceFormatter
          amount={price}
          className="line-through text-xs font-normal text-text-muted"
        />
      )}
    </div>
  );
};

export default PriceView;