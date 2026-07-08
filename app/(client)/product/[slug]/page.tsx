import AddToCartButton from "@/components/layout/Products/AddToCartButton";
import Container from "@/components/Container";
import FavoriteButton from "@/components/layout/Products/FavoriteButton";
import ImageView from "@/components/layout/Products/ImageView";
import PriceView from "@/components/layout/Products/PriceView";
import ProductDescription from "@/components/layout/Products/ProductDescription";
import ProductAdditionalInfo from "@/components/layout/Products/ProductAdditionalInfo";
import ProductIngredients from "@/components/layout/Products/ProductIngredients";
import ProductFAQ from "@/components/layout/Products/ProductFAQ";
import ProductReviews from "@/components/layout/Products/ProductReviews";
import ProductTabs, {
  type Tab,
} from "@/components/layout/Products/ProductTabs";
import { CornerDownLeft, StarIcon, Truck } from "lucide-react";
import { notFound } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { Product } from "@/data/products";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SingleProductPage({ params }: Props) {
  const { slug } = await params;

  const q = query(
    collection(db, "products"),
    where("slug.current", "==", slug),
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    notFound();
  }

  const doc = snapshot.docs[0];

  const product = {
    ...(doc.data() as Omit<Product, "_id">),
    _id: doc.id,
  };
  return (
    <>
      <Container className="flex flex-col md:flex-row gap-8 py-5 md:py-8">
        {product?.thumbnail && (
          <ImageView images={product?.thumbnail} isStock={product?.stock} />
        )}
        <div className="w-full lg:w-[50%] flex flex-col gap-5">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{product?.name}</h2>
            <p className="text-sm text-gray-600 tracking-wide">
              {product?.description}
            </p>
            <div className="flex items-center gap-0.5 text-xs">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  className={
                    index < 4
                      ? "w-4 h-4  fill-yellow-600 "
                      : "w-4 h-4 text-primary fill-transparent"
                  }
                />
              ))}
              <p className="font-semibold">{`(12)`}</p>
            </div>
          </div>
          <div className="border-t border-b border-gray-200 ">
            <PriceView
              price={product?.price}
              discount={product?.discount}
              className="text-lg font-bold mb-1"
            />
            <p
              className={`mb-2 px-4 py-1 text-sm text-center inline-block font-semibold rounded-lg ${product?.stock === 0 ? "bg-red-100 text-red-600" : "text-green-600 bg-green-100"}`}
            >
              {(product?.stock as number) > 0 ? "In Stock" : "Out of Stock"}
            </p>
          </div>
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-border z-50 md:relative md:p-0 md:bg-transparent md:border-none md:z-auto flex items-center gap-3">
            <AddToCartButton
              product={product}
              className="flex-1 md:w-auto md:flex-none"
            />
            <FavoriteButton showProduct={true} product={product} />
          </div>
          <div className="space-y-3">
            <div className="border border-border/25 border-b-0 p-3 flex items-center gap-2.5">
              <Truck size={30} className="text-shop_orange" />
              <div>
                <p className="text-base font-semibold text-black">
                  Free Delivery
                </p>
                <p className="text-sm text-gray-500 underline underline-offset-2">
                  Enter your Postal code for Delivey Availability.
                </p>
              </div>
            </div>
            <div className="border border-border/25 p-3 flex items-center gap-2.5">
              <CornerDownLeft size={30} className="text-shop_orange" />
              <div>
                <p className="text-base font-semibold text-black">
                  Return Delivery
                </p>
                <p className="text-sm text-gray-500 ">
                  Free 30days Delivery Returns.{" "}
                  <span className="underline underline-offset-2">Details</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container className="pb-10">
        {(() => {
          const prod = product;
          const tabs: Tab[] = [];

          if (prod.richDescription) {
            tabs.push({
              id: "desc",
              label: "Description",
              content: <ProductDescription data={prod.richDescription} />,
            });
          }

          if (prod.specifications && prod.specifications.length > 0) {
            tabs.push({
              id: "specs",
              label: "Specifications",
              content: <ProductAdditionalInfo product={prod} />,
            });
          }

          if (prod.ingredients && prod.ingredients.length > 0) {
            tabs.push({
              id: "ingredients",
              label: "Ingredients",
              content: <ProductIngredients ingredients={prod.ingredients} />,
            });
          }

          if (prod.faqs && prod.faqs.length > 0) {
            tabs.push({
              id: "faq",
              label: "FAQ",
              content: <ProductFAQ faq={prod.faqs} />,
            });
          }

          tabs.push({
            id: "reviews",
            label: "Reviews",
            content: <ProductReviews />,
          });

          return <ProductTabs tabs={tabs} />;
        })()}
      </Container>
    </>
  );
}
