import Link from "next/link";
import { matchups } from "@/lib/comparisons";

/**
 * Head-to-head links for a review page.
 *
 * The comparison pages are generated from the rankings and from relatedSites,
 * so they already exist for every site worth comparing. Nothing linked to them
 * from the reviews, which left a whole section of the site reachable only by
 * guessing the URL. Sister sites come first, since "which of these two" is the
 * question a reader on either page is most likely to have.
 */
export function CompareLinks({
  slug,
  name,
  relatedSites = [],
  limit = 4,
}: {
  slug: string;
  name: string;
  relatedSites?: string[];
  limit?: number;
}) {
  const mine = matchups.filter((m) => m.a.slug === slug || m.b.slug === slug);
  if (!mine.length) return null;

  const other = (m: (typeof mine)[number]) => (m.a.slug === slug ? m.b : m.a);
  const related = new Set(relatedSites);

  const ordered = [...mine].sort((x, y) => {
    const xr = related.has(other(x).slug) ? 0 : 1;
    const yr = related.has(other(y).slug) ? 0 : 1;
    return xr - yr;
  });

  const shown = ordered.slice(0, limit);

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold">How {name} compares</h2>
      <p className="mt-3 text-muted leading-relaxed">
        Side-by-side breakdowns against the sites people weigh it up against most.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {shown.map((m) => {
          const o = other(m);
          const sister = related.has(o.slug);
          return (
            <Link
              key={m.slug}
              href={`/compare/${m.slug}`}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-panel px-4 py-2 text-sm text-muted transition-colors hover:border-accent/40 hover:text-text"
            >
              <span className="font-medium text-text">
                {name} vs {o.name}
              </span>
              {sister && (
                <span className="rounded-full border border-accent/30 bg-accent/[0.08] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                  Sister site
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
