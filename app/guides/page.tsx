import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `General Sweeps Strategy | ${siteConfig.name}`,
  description: "How to collect free Sweeps Coins daily and how to actually use welcome offers on Sweepstakes casinos.",
};

export default function GuidesPage() {
  return (
    <article className="container-x py-10 md:py-14 max-w-3xl">
      <Link href="/" className="text-sm text-muted hover:text-text">← Back to rankings</Link>

      <header className="mt-4">
        <h1 className="text-3xl md:text-4xl font-black">General Sweeps Strategy</h1>
        <p className="mt-2 text-muted">
          The two free-money plays every player should run on every site:
          collect daily SC and turn welcome offers into +EV redemptions.
        </p>
        <p className="mt-2 text-xs text-muted">Last updated: {siteConfig.lastUpdated}</p>
      </header>

      <section className="mt-8 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">
          Collecting daily free coins
        </h2>
        <p className="mt-3 text-muted leading-relaxed">
          Every legitimate Sweepstakes casino is required by law to offer a
          no-purchase-necessary path to obtain Sweeps Coins. The whole free-money
          game is showing up daily and claiming whatever the site hands out, it
          adds up faster than you&apos;d think when you stack 5–10 sites.
        </p>
        <ul className="list-disc pl-6 mt-3 text-muted space-y-1.5 leading-relaxed">
          <li>
            <strong className="text-text">Daily login bonus</strong>, log in once
            every 24 hours on every site you have an account on. Some sites give
            it as a wheel spin, some as a flat SC drop. Don&apos;t skip days; many
            sites scale the bonus the longer your streak runs.
          </li>
          <li>
            <strong className="text-text">Mail-in requests</strong>, every site
            allows you to mail a postcard with a specific format to receive free
            SC. The format is buried in the operator&apos;s sweepstakes rules
            page. Slow but free, and you can mail multiple per month.
          </li>
          <li>
            <strong className="text-text">Social media giveaways</strong> ,
            follow each operator on X, Facebook, and Discord. Most run weekly
            free-SC giveaways that take 30 seconds to enter (like, share, comment).
          </li>
          <li>
            <strong className="text-text">Scavenger hunts &amp; events</strong> ,
            sites like LuckyLand drop free SC inside in-game events. Check the
            promotions tab once a week.
          </li>
          <li>
            <strong className="text-text">Verify your account early</strong> ,
            most sites require ID + address verification before paying out. Get
            this done day one so daily SC isn&apos;t stuck in your account when
            you finally try to redeem.
          </li>
        </ul>
        <p className="mt-3 text-muted leading-relaxed">
          Realistic baseline: 5–10 active accounts at the daily-bonus tier
          generates <strong className="text-text">$5–$20 in free redeemable SC
          per week</strong> with under 10 minutes of daily effort, before you
          ever spend a dollar.
        </p>
      </section>

      <section className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">
          What to do with welcome offers
        </h2>
        <p className="mt-3 text-muted leading-relaxed">
          Welcome offers are where the real EV lives. Most sites front-load a
          dramatically discounted first-purchase package, you can flip a $10
          buy into 30 SC of redeemable cash by washing it correctly. The play
          works on every major site; only the dollar amounts change.
        </p>
        <ol className="list-decimal pl-6 mt-3 text-muted space-y-1.5 leading-relaxed">
          <li>
            <strong className="text-text">Sign up and verify the account first.</strong>
            {" "}You can&apos;t redeem until KYC is done, so do it on day one,
            before you&apos;ve bought anything.
          </li>
          <li>
            <strong className="text-text">Check the buy page for the welcome package.</strong>
            {" "}Ignore the Gold Coin totals, they&apos;re not redeemable. Look
            only at the bundled SC amount and the dollar cost. The welcome
            offer is usually labeled &ldquo;first purchase&rdquo; and only
            available once.
          </li>
          <li>
            <strong className="text-text">Verify the SC is &gt; the dollar cost.</strong>
            {" "}Every welcome offer on the sites we rank meets this bar, e.g.,
            $10 for 30 SC, $20 for 75 SC, $200 for 300 SC. If the math
            isn&apos;t in your favor, skip it.
          </li>
          <li>
            <strong className="text-text">Buy the package, then wash the SC.</strong>{" "}
            Two separate plays here, in this order:
            <ol className="list-[lower-alpha] pl-6 mt-2 space-y-1.5 leading-relaxed">
              <li>
                <strong className="text-text">Cross-wash if it&apos;s available on the site.</strong>{" "}
                Cross-washing consistently gets you the highest return on
                redemption, so it&apos;s the default play. Use it any time
                the site allows it.
              </li>
              <li>
                <strong className="text-text">If cross-washing isn&apos;t possible, bet the lowest possible SC per spin</strong>{" "}
                on a high-RTP slot (97%+, Relax Gaming&apos;s Epic Joker is a
                standard pick). Minimum bet sticks closest to the slot&apos;s
                posted RTP over a long session and keeps variance low so you
                don&apos;t bust before clearing playthrough.
              </li>
            </ol>
            <span className="block mt-2">
              Either way, play until your wagered SC equals your balance
              (1× playthrough), then redeem.
            </span>
          </li>
          <li>
            <strong className="text-text">Sales and reload offers can still be +EV, you just have to do the math.</strong>
            {" "}When a site runs a 10–15% (or larger) sale on a package, work
            out the SC-to-dollar ratio and decide if it&apos;s worth buying.
            If the discount makes the bundled SC worth more than the cash you
            paid, buy it and wash it on a high-RTP slot the same way as the
            welcome offer. Skip anything that doesn&apos;t clear that bar ,
            buying GC at face value is negative EV.
          </li>
        </ol>
        <p className="mt-3 text-muted leading-relaxed">
          Done correctly, a $10-for-30-SC welcome washes out to{" "}
          <strong className="text-text">$28–$29 in redeemable cash</strong>{" "}
          (95–98% return on the SC after 1× playthrough on a 97% RTP slot).
          That&apos;s a clean ~$18–19 profit on every site that runs this offer.
          Stack 10 sites with welcome offers and you&apos;re looking at
          $150–$300 in one-time profit just from signups.
        </p>
      </section>

      <section className="mt-4 rounded-2xl border border-border bg-panel/60 p-5 text-sm text-muted">
        <p>
          For site-specific deeper dives, VIP unlocks, package timing, the
          best games to wash on, open the{" "}
          <strong className="text-text">Guides</strong> dropdown in the header
          and pick a casino. Each operator has its own quirks worth learning
          before you commit to grinding it.
        </p>
        <p className="mt-3">
          Sweepstakes are entertainment first, side-income second. Set a
          budget, take breaks, never chase losses. If gambling stops being
          fun, call{" "}
          <a className="underline hover:text-text" href="tel:1-800-522-4700">
            1-800-GAMBLER
          </a>
          .
        </p>
      </section>
    </article>
  );
}
