/** Google cuts meta descriptions around here, so anything longer is wasted. */
export const META_DESCRIPTION_LIMIT = 160;

/**
 * Trim a description to the limit on a word boundary.
 *
 * Only generated fallbacks should ever need this. A hand-written description
 * that trips it is a mistake to fix at the source, which is what
 * `npm run check:meta` is for.
 */
export function clampDescription(text: string, limit = META_DESCRIPTION_LIMIT): string {
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > limit * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:]+$/, '') + '\u2026';
}

import { siteConfig } from "./site-config";

/**
 * Per-page Open Graph + Twitter card metadata. Without this, child pages inherit
 * the homepage og:url / og:title / og:description from the root layout, so every
 * shared link previews as the generic homepage. Spread the result into a page's
 * `metadata` (or the return of `generateMetadata`) alongside its own title/description.
 */
export function ogMeta(path: string, title: string, description: string) {
  const url = path.startsWith("http") ? path : `${siteConfig.url}${path}`;
  return {
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
    },
  };
}
