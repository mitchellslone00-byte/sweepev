import Link from "next/link";
import { buybackIsCash, rankedRipSites } from "@/lib/rip-sites";

function logoUrl(homepageUrl: string): string {
  try {
    const domain = new URL(homepageUrl).hostname.replace(/^www\./, "");
    return `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;
  } catch {
    return "";
  }
}

/**
 * Homepage entry point for the card rips vertical. It is a different product
 * from the casinos ranked above it, so it gets its own block rather than a row
 * in that table, and it leads with the free pack because that is the hook.
 */
export function CardRipsTeaser() {
  const top = rankedRipSites().slice(0, 3);
  const all = rankedRipSites();
  const freePacks = all.filter((s) => /free/i.test(s.signupOffer)).length;

  return (
    <section id="card-rips" className="container-x py-8">
      <div className="rounded-2xl border border-accent/40 bg-gradient-to-b from-panel to-bg p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-accent/15 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-accent">
            New
          </span>
          <h2 className="text-2xl font-bold md:text-3xl">Card rips: open a pack, get a real card</h2>
        </div>

        <p className="mt-3 max-w-[64ch] text-muted leading-relaxed">
          The fastest-growing thing in the space right now. You rip a digital pack, there is a real
          trading card inside, and you either ship it or sell it straight back. Because you are buying
          a product rather than entering a sweepstakes,{" "}
          <strong className="text-text">most of these work in California, New York and Indiana</strong>{" "}
          where sweepstakes casinos do not.
        </p>

        <p className="mt-3 max-w-[64ch] text-muted leading-relaxed">
          <strong className="text-text">{freePacks} of the {all.length} sites we track</strong> hand new
          accounts a free pack, so you can test one without depositing. We rank them on the buyback
          rate, and on whether it pays cash or store credit, which is the part nobody else leads with.
        </p>

        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {top.map((s) => (
            <li key={s.slug} className="rounded-xl border border-border bg-panel p-3">
              <Link href={`/card-rips/${s.slug}`} className="flex items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logoUrl(s.homepageUrl)}
                  alt=""
                  width={26}
                  height={26}
                  className="h-[26px] w-[26px] shrink-0 rounded-full border border-border bg-panel2 object-cover"
                />
                <span className="font-semibold text-text hover:text-accent">{s.name}</span>
              </Link>
              <p className="mt-2 text-xs text-muted">{s.signupOffer}</p>
              <p className="mt-1.5 font-mono text-[11px]">
                <span className="text-muted">{s.buyback.rate}</span>{" "}
                <span className={buybackIsCash(s) ? "text-accent" : "text-muted"}>
                  {buybackIsCash(s) ? "cash" : s.buyback.paidIn}
                </span>
              </p>
            </li>
          ))}
        </ul>

        <Link
          href="/card-rips"
          className="mt-5 inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg hover:opacity-90"
        >
          Compare all {all.length} card rip sites →
        </Link>
      </div>
    </section>
  );
}
