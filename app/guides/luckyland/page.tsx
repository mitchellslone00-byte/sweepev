import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { ogMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "LuckyLand Slots & Casino, VIP Leveling Guide",
  description: "How to climb LuckyLand Slots / LuckyLand Casino VIP tiers each month for exclusive package offers, Quacky Hour sales, and free SC scavenger hunts.",
  alternates: {
    canonical: `${siteConfig.url}/guides/luckyland`,
  },
  ...ogMeta(
    "/guides/luckyland",
    "LuckyLand Slots & Casino, VIP Leveling Guide",
    "How to climb LuckyLand Slots / LuckyLand Casino VIP tiers each month for exclusive package offers, Quacky Hour sales, and free SC scavenger hunts."
  ),
};

export default function LuckyLandGuidePage() {
  return (
    <article className="container-x py-10 md:py-14 max-w-3xl">
      <Link href="/" className="text-sm text-muted hover:text-text">← Back to rankings</Link>

      <header className="mt-4">
        <h1 className="text-3xl md:text-4xl font-black">
          LuckyLand Slots &amp; LuckyLand Casino, VIP Leveling Guide
        </h1>
        <p className="mt-2 text-muted">
          The monthly play on LuckyLand. Climb VIP at the start of each month
          to unlock the discounted packages that scale with your tier.
        </p>
        <p className="mt-2 text-xs text-muted">Last updated: {siteConfig.lastUpdated}</p>
      </header>

      <section className="mt-8 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">
          Monthly VIP reset
        </h2>
        <p className="mt-3 text-muted leading-relaxed">
          At the beginning of each month, your VIP level{" "}
          <strong className="text-text">resets</strong> on both LuckyLand Slots
          and LuckyLand Casino. You climb back up by wagering Gold Coins ,{" "}
          <strong className="text-text">spin size doesn&apos;t matter</strong>,
          only wagered volume counts. Run GC auto-spin overnight in the first
          few days of the month to climb fast.
        </p>
      </section>

      <section className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">
          What hitting VIP unlocks
        </h2>
        <ul className="mt-3 list-disc pl-6 text-muted space-y-1.5 leading-relaxed">
          <li>
            <strong className="text-text">Exclusive purchase offers</strong>{" "}
            that scale with your tier. Concrete example: hitting the first{" "}
            <em>Lucky Duck</em> tier unlocks a{" "}
            <strong className="text-text">$1 for $30</strong> package.
            That&apos;s a ~30× return on a single dollar after washing, the
            kind of math that doesn&apos;t exist anywhere else in the space.
            Higher tiers unlock progressively better deals.
          </li>
          <li>
            <strong className="text-text">Quacky Hour sales</strong>, flash
            promos with discounted packages, only available to VIP-tier
            players.
          </li>
          <li>
            <strong className="text-text">Exclusive scavenger hunts for free SC</strong>{" "}
           , site events that drop redeemable SC just for participating, gated
            behind VIP eligibility.
          </li>
        </ul>
      </section>

      <section className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">
          The play
        </h2>
        <ol className="mt-3 list-decimal pl-6 text-muted space-y-1.5 leading-relaxed">
          <li>
            On day 1 or 2 of the month, pin a low-volatility GC slot at max
            bet and run auto-spin overnight. Your VIP level climbs purely on
            wagered GC volume.
          </li>
          <li>
            Hit the first VIP tier (Lucky Duck) and{" "}
            <strong className="text-text">buy the unlocked $1 for $30 package</strong>.
            Wash the 30 SC the standard way: 97%+ RTP slot, lowest possible spin size, 1×
            playthrough, redeem. You walk out with ~$28 of redeemable cash on
            a $1 outlay.
          </li>
          <li>
            Keep climbing VIP through the month, each tier unlocks better
            packages. Buy them only when the SC value comfortably exceeds the
            dollar cost.
          </li>
          <li>
            Hit the scavenger hunts and Quacky Hour drops as they appear ,
            small free-SC top-ups that compound the EV.
          </li>
          <li>
            <strong className="text-text">Don&apos;t skip this site.</strong>{" "}
            The Lucky Duck unlock alone is one of the most aggressively +EV
            plays in the entire sweepstakes space.
          </li>
        </ol>
      </section>

      <section className="mt-4 rounded-2xl border border-border bg-panel/60 p-5 text-sm text-muted">
        <p>
          New to washing SC or unsure which slot to pick? Read the{" "}
          <Link href="/guides" className="underline hover:text-text">
            general strategy guide
          </Link>{" "}
          for the basics, then come back here for the LuckyLand-specific
          monthly play.
        </p>
      </section>
    </article>
  );
}
