import type { Brand, Category, Product } from "@/data/products";
import { productCategories } from "@/constants/data";

/** Read slug whether stored as a plain string or `{ current: string }`. */
export function getSlugValue(
  slug: Category["slug"] | Brand["slug"] | string | undefined,
): string | undefined {
  if (!slug) return undefined;
  if (typeof slug === "string") return slug;
  return slug.current || undefined;
}

/** Normalize for loose category comparison: lowercase, no separators, singular form. */
export function normalizeCategoryKey(value = ""): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[\s-_]/g, "")
    .replace(/s$/, "");
}

export function normalizeBrandKey(value = ""): string {
  return value.toLowerCase().trim().replace(/[\s-_]/g, "");
}

export type CategoryLookup = {
  bySlug: Map<string, Category>;
  byId: Map<string, Category>;
  all: Category[];
};

export function buildCategoryLookup(categories: Category[]): CategoryLookup {
  const bySlug = new Map<string, Category>();
  const byId = new Map<string, Category>();
  const all: Category[] = [];

  for (const category of categories) {
    if (byId.has(category._id)) continue;

    byId.set(category._id, category);
    all.push(category);

    const slug = getSlugValue(category.slug);
    if (slug) {
      bySlug.set(slug, category);
    }
  }

  return { bySlug, byId, all };
}

function addCategoryKeys(keys: Set<string>, category: Category) {
  keys.add(category._id);

  if (category.title) {
    keys.add(category.title);
    keys.add(normalizeCategoryKey(category.title));
  }

  const slug = getSlugValue(category.slug);
  if (slug) {
    keys.add(slug);
    keys.add(normalizeCategoryKey(slug));
  }
}

function getCategoryMatchKeys(
  categorySlug: string,
  lookup: CategoryLookup,
): Set<string> {
  const keys = new Set<string>();
  const normalizedTarget = normalizeCategoryKey(categorySlug);

  keys.add(categorySlug);
  keys.add(normalizedTarget);

  const direct = lookup.bySlug.get(categorySlug);
  if (direct) {
    addCategoryKeys(keys, direct);
  }

  for (const category of lookup.all) {
    const slug = getSlugValue(category.slug);
    const slugMatches =
      slug === categorySlug || normalizeCategoryKey(slug ?? "") === normalizedTarget;
    const titleMatches =
      !!category.title &&
      normalizeCategoryKey(category.title) === normalizedTarget;

    if (slugMatches || titleMatches) {
      addCategoryKeys(keys, category);
    }
  }

  for (const { title, value } of productCategories) {
    if (value === "all") continue;

    const valueMatches =
      value === categorySlug || normalizeCategoryKey(value) === normalizedTarget;
    const titleMatches = normalizeCategoryKey(title) === normalizedTarget;

    if (valueMatches || titleMatches) {
      keys.add(value);
      keys.add(title);
      keys.add(normalizeCategoryKey(value));
      keys.add(normalizeCategoryKey(title));
    }
  }

  return keys;
}

function valueMatchesKeys(value: string, keys: Set<string>): boolean {
  if (keys.has(value)) return true;

  const normalizedValue = normalizeCategoryKey(value);
  for (const key of keys) {
    if (normalizeCategoryKey(key) === normalizedValue) return true;
  }

  return false;
}

export function productMatchesCategorySlug(
  product: Product,
  categorySlug: string,
  lookup: CategoryLookup,
): boolean {
  const matchKeys = getCategoryMatchKeys(categorySlug, lookup);

  const productValues = [
    ...(product.categories ?? []),
    product.category ?? "",
  ].filter(Boolean);

  for (const value of productValues) {
    if (valueMatchesKeys(value, matchKeys)) return true;

    const categoryFromId = lookup.byId.get(value);
    if (categoryFromId) {
      const slug = getSlugValue(categoryFromId.slug);
      if (slug && valueMatchesKeys(slug, matchKeys)) return true;
      if (categoryFromId.title && valueMatchesKeys(categoryFromId.title, matchKeys)) {
        return true;
      }
    }
  }

  return false;
}

export function productMatchesBrandSlug(
  product: Product,
  brandSlug: string,
  brands: Brand[],
): boolean {
  const matchKeys = new Set<string>([brandSlug, normalizeBrandKey(brandSlug)]);

  for (const brand of brands) {
    const slug = getSlugValue(brand.slug);
    const slugMatches =
      slug === brandSlug || normalizeBrandKey(slug ?? "") === normalizeBrandKey(brandSlug);
    const titleMatches =
      !!brand.title &&
      normalizeBrandKey(brand.title) === normalizeBrandKey(brandSlug);

    if (slugMatches || titleMatches) {
      matchKeys.add(brand._id);
      if (brand.title) {
        matchKeys.add(brand.title);
        matchKeys.add(normalizeBrandKey(brand.title));
      }
      if (slug) {
        matchKeys.add(slug);
        matchKeys.add(normalizeBrandKey(slug));
      }
    }
  }

  const productBrand = product.brand ?? "";
  if (!productBrand) return false;

  if (matchKeys.has(productBrand)) return true;
  if (matchKeys.has(normalizeBrandKey(productBrand))) return true;

  const brandFromId = brands.find((brand) => brand._id === productBrand);
  if (brandFromId) {
    const slug = getSlugValue(brandFromId.slug);
    if (slug && matchKeys.has(slug)) return true;
    if (brandFromId.title && matchKeys.has(brandFromId.title)) return true;
  }

  return normalizeBrandKey(productBrand) === normalizeBrandKey(brandSlug);
}
