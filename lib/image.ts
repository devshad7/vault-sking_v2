/**
 * Centralized image-safety utilities.
 *
 * Every Next.js `<Image>` component in the project should run its `src`
 * through `getSafeImageSrc` so that `undefined`, `null`, and empty-string
 * values never reach the DOM.
 */

/** Path served from `public/` – always exists and always valid. */
export const PLACEHOLDER_IMAGE = "/placeholder-product.png";

/**
 * Returns a guaranteed non-empty image URL.
 *
 * - `undefined` / `null` / `""` / whitespace-only → placeholder
 * - Otherwise → the trimmed original value
 */
export function getSafeImageSrc(src?: string | null): string {
  if (!src) return PLACEHOLDER_IMAGE;

  const value = src.trim();
  if (value.length === 0) return PLACEHOLDER_IMAGE;

  return value;
}
