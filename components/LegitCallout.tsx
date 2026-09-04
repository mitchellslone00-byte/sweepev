import Link from "next/link";

/**
 * Short trust answer near the top of a review. Targets the "is <site> legit" query
 * with a direct yes before the detail further down the page.
 *
 * Deliberately not a heading: reviews already carry an "Is X legit?" <h2> lower down,
 * and two identical headings on one page would compete rather than reinforce.
 */
export function LegitCallout({ name, rating }: { name: string; rating: number }) {
  return (
    <section className="mt-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/[0.06] p-4 sm:p-5">
      <p className="text-sm sm:text-base leading-relaxed text-muted">
        <span className="font-bold text-text">Is {name} legit?</span>{" "}
        <span className="font-bold text-emerald-300">Yes.</span> Every casino we list is personally
        tested and vetted before it goes up. We confirm redemptions actually pay, read the terms, and
        track player complaints. {name} scores{" "}
        <span className="font-semibold text-text">{rating.toFixed(1)}/5</span> in our testing. If a site
        fails that bar we downrank it or leave it off entirely, regardless of what it pays us.{" "}
        <Link
          href="/#how-we-rank"
          className="font-semibold text-accent underline underline-offset-2 hover:opacity-80"
        >
          How we rank
        </Link>
      </p>
    </section>
  );
}
