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
