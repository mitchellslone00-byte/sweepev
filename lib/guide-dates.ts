import guideDates from "@/data/guide-dates.json";
import { siteConfig } from "./site-config";

type GuideDate = { publishedAt?: string; updatedAt?: string };

const dates: Record<string, GuideDate> = guideDates;

/**
 * Publish and last-modified dates for a guide page. Stamped automatically on commit
 * by scripts/stamp-updated.js, so the visible "Last updated" line always reflects when
 * the page actually changed. Falls back to the site-wide stamp for an unknown path.
 */
export function guideDate(path: string) {
  const entry = dates[path] ?? {};
  const publishedISO = entry.publishedAt ?? siteConfig.lastUpdatedISO;
  const modifiedISO = entry.updatedAt ?? entry.publishedAt ?? siteConfig.lastUpdatedISO;
  return {
    publishedISO,
    modifiedISO,
    modifiedDisplay: new Date(`${modifiedISO}T00:00:00`).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}
