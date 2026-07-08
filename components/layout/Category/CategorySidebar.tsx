import Link from "next/link";
import type { Category } from "@/data/products";

interface Props {
  categories: Category[];
  activeSlug: string;
}

export function CategorySidebar({ categories, activeSlug }: Props) {
  return (
    <nav className="flex flex-col md:min-w-40 border border-border bg-surface rounded-md overflow-hidden">
      {categories.map((item) => {
        const slug = item.slug?.current;
        if (!slug) return null;

        const isActive = slug === activeSlug;

        return (
          <Link
            key={item._id}
            href={`/category/${slug}`}
            scroll={false}
            aria-current={isActive ? "page" : undefined}
            className={`px-3 py-2 border-b border-border last:border-b-0 transition-colors capitalize
              hover:bg-primary hover:text-white
              ${isActive ? "bg-primary text-white" : "text-text"}
            `}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}