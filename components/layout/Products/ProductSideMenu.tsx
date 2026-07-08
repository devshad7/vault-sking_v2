
import type { Product } from "@/data/products";
interface ProductSideMenuProps {
  product: Product;
  className?: string;
}

const ProductSideMenu = ({
  className,
}: ProductSideMenuProps) => {
  return <div className={className}>...</div>;
};

export default ProductSideMenu;