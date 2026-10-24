import Link from "next/link";
import { sites, hasClosed } from "@/lib/sites";
import { AffiliateLink } from "./AffiliateLink";

/**
 * What still works in a state that has banned the standard dual-currency model.
 *
 * This deliberately does not fall back on restrictedStates alone. Most sites are
 * missing data for the states that banned play late, so "does not say no" would
 * surface dozens of conventional sweeps casinos that do not operate there at
 * all. A site appears here only if it carries bannedStateAccess, and if that
 * entry names specific states, only in those.
 */
export function bannedStateOptions(state: string) {
  return sites.filter((s) => {
    if (hasClosed(s) || s.comingSoon) return false;
    if (s.shutdownNotice) return false;
    const access = s.bannedStateAccess;
    if (!access) return false;
    if ((s.restrictedStates ?? []).includes(state)) return false;
    // A per-state map is an allowlist, not extra detail.
    if (access.states) return Object.prototype.hasOwnProperty.call(access.states, state);
    return true;
  });
}

export function BannedStateOptions({ state }: { state: string }) {
  const options = bannedStateOptions(state);

  return (
    <section className="mt-6 rounded-2xl border border-accent/40 bg-panel p-5 sm:p-6">
      <h2 className="text-lg md:text-xl font-bold text-accent">
        What still works in {state}
      </h2>
      <p className="mt-3 text-sm text-muted leading-relaxed">
        {options.length ? (
          <>
            The ban covers the standard dual-currency sweepstakes model. A handful of
            platforms run on a different footing and still accept {state} players, so you
            are not out of options entirely. Expect a different experience from the one
            the rest of the country gets.
          </>
        ) : (
          <>
            The ban covers the standard dual-currency sweepstakes model, and we do not
            currently list a sweeps casino that still accepts {state} players. That does
            not leave you with nothing, because card rips are a different product
            entirely and the ban does not reach them.
          </>
        )}
      </p>
      <div className="mt-4 space-y-3">
        {options.map((s) => {
          const detail = s.bannedStateAccess?.states?.[state] ?? s.bannedStateAccess?.note;
          const deepLink = s.bannedStateAccess?.guides?.[state];
          return (
            <div key={s.slug} className="rounded-xl border border-border bg-panel2/40 p-4">
              {/* Pill pushed right, matching StateSiteCard on the hand-written state pages. */}
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-bold text-text">{s.name}</h3>
                <span className="shrink-0 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-green-400">
                  Accepts {state}
                </span>
              </div>
              {detail && <p className="mt-2 text-sm leading-relaxed text-muted">{detail}</p>}
              {deepLink && (
                <p className="mt-2 text-sm leading-relaxed">
                  <Link href={deepLink} className="font-semibold text-accent underline underline-offset-2 hover:opacity-80">
                    Full guide: how {s.name} works in {state}
                  </Link>
                </p>
              )}
              <div className="mt-3 flex flex-wrap gap-3">
                <AffiliateLink
                  slug={s.slug}
                  name={s.name}
                  source={`banned_state_${state.toLowerCase().replace(/\s+/g, "_")}`}
                  className="inline-block rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg hover:opacity-90"
                >
                  Sign Up for {s.name}
                </AffiliateLink>
                <Link
                  href={`/sites/${s.slug}`}
                  className="inline-block rounded-lg border border-border px-4 py-2 text-sm text-muted hover:text-text"
                >
                  Read the Review
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      {/* Card rips are a different product rather than another sweeps workaround,
          so they sit apart from the list above rather than inside it. */}
      <div className="mt-5 rounded-xl border border-border bg-panel2/40 p-4">
        <h3 className="font-bold text-text">Card rips are an option here too</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Worth knowing about separately, because they are not sweepstakes at all. On a card
          rip site you buy a digital pack, open it, and a real trading card is inside, which you
          either have shipped to you or sell back to the operator. That is a product purchase
          rather than a dual-currency promotion, so the rules that pushed sweeps casinos out of{" "}
          {state} generally do not apply to them.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Several hand out free packs every day, which costs nothing to collect. Check the buyback
          before you spend, though: what the operator pays for a card you do not want, and whether
          it pays cash or store credit you can only spend on more packs.
        </p>
        <Link
          href="/card-rips"
          className="mt-3 inline-block rounded-lg border border-accent/40 px-4 py-2 text-sm font-semibold text-accent hover:border-accent"
        >
          Compare card rip sites →
        </Link>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Availability changes quickly in states that have legislated, and operators do
        not always announce it. Confirm the current position at signup rather than
        relying on any list, ours included. Card rip operators set their own state and
        age rules as well, and at least one cannot ship to every state.
      </p>
    </section>
  );
}
