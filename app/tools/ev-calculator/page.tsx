import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { sites } from "@/lib/sites";
import { buildRecommendations } from "@/lib/calculators/recommendations";
import { EVCalculator } from "@/components/EVCalculator";

export const metadata: Metadata = {
  title: "Estimated Value Calculator",
  description:
    "Free analytical tool for estimating the net value and realistic cashout of a sweepstakes bundle. Enter what the package costs and the Sweeps Coins it gives you. Probability-based analysis, not promotional hype.",
  alternates: { canonical: "/tools/ev-calculator" },
  openGraph: {
    title: `Estimated Value Calculator | ${siteConfig.name}`,
    description:
      "Estimate net value, wagering loss, and realistic cashout for any casino or sweepstakes bonus. Probability-based, not hype.",
    url: `${siteConfig.url}/tools/ev-calculator`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Estimated Value Calculator | ${siteConfig.name}`,
    description:
      "Estimate net value, wagering loss, and realistic cashout for any casino or sweepstakes bonus.",
  },
  robots: { index: true, follow: true },
};

const FAQS = [
  {
    q: "What is estimated value (EV) on a casino bonus?",
    a: "Estimated value is the average net result of a bonus or playthrough scenario over many repetitions. Positive EV means that on average you finish ahead of your deposit; negative EV means you finish behind. It is not a guarantee for any single session, but it is the long-run average outcome given your inputs.",
  },
  {
    q: "What is RTP and where do I find it?",
    a: "Return to Player (RTP) is the long-run percentage of wagered money a slot returns to players. A 97% RTP slot returns $97 of every $100 wagered on average, with the remaining $3 being the house edge. Operators publish RTP per game in the help / paytable section. Higher RTP means lower expected loss while clearing playthrough.",
  },
  {
    q: "How is the playthrough multiplier applied?",
    a: "Playthrough applies to your bonus / SC bundle, not your deposit. If you purchase 50 SC on a site with a 2× playthrough, you must wager 100 SC before redeeming. A 1× playthrough on a sweepstakes site means you wager the bundle once before redemption; online casino bonuses commonly run 20×–40×. Check your operator's terms. A few apply playthrough to deposit + bonus combined.",
  },
  {
    q: "Why does volatility matter if RTP is the same?",
    a: "Higher volatility means a wider distribution of outcomes around the same estimated value. A 97% RTP low-volatility slot lands you near the average loss most of the time, while a 97% RTP high-volatility slot can wipe out your Sweeps Coins before you finish playthrough, or pay big in rare hits. Volatility doesn't change EV; it changes how far a single run can land from it.",
  },
  {
    q: "Why doesn't the calculator ask for my bankroll?",
    a: "Because it doesn't change the answer. On a sweepstakes bundle you are washing a fixed number of Sweeps Coins, and the most you can lose is what the package cost. Your balance outside the site has no bearing on whether the offer is worth buying, so the only figures that matter are the price, the Sweeps Coins it gives you, the playthrough, and the RTP you clear it on.",
  },
  {
    q: "Is positive EV a guarantee of profit?",
    a: "No. Positive EV means the strategy is profitable on average over many trials, not on any single attempt. Variance can produce a losing session even with a strong +EV setup. This calculator is informational only and does not constitute financial or gambling advice.",
  },
];

const UPDATED_DISPLAY = "August 2026";

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "EV Calculator",
      item: `${siteConfig.url}/tools/ev-calculator`,
    },
  ],
};

const webAppLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Sweepstakes & Casino Bonus EV Calculator",
  url: `${siteConfig.url}/tools/ev-calculator`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Free calculator that estimates the net value, wagering loss, and realistic cashout of any sweepstakes bundle or casino bonus.",
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
};

export default function EVCalculatorPage() {
  const recommendations = buildRecommendations(sites);

  return (
    <main className="container-x py-8 sm:py-12 md:py-16 max-w-5xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />

      <nav className="flex items-center gap-1.5 text-xs text-muted">
        <Link href="/" className="hover:text-text">
          Home
        </Link>
        <span aria-hidden>›</span>
        <span className="text-text">EV Calculator</span>
      </nav>

      <header className="mt-4">
        <p className="text-xs uppercase tracking-widest text-accent">Free tool</p>
        <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
          Sweepstakes &amp; Casino Bonus EV Calculator
        </h1>
        <p className="mt-3 text-muted text-base sm:text-lg max-w-2xl">
          Is that bonus actually worth it? Enter the offer and this free calculator tells you its{" "}
          <span className="text-text">estimated value</span>. Whether you come out ahead or behind on
          average. Plus the Sweeps Coins you can expect to redeem. Results update as you type.
        </p>
        <p className="mt-3 text-sm text-muted">
          By <span className="font-medium text-text">Jordan Thacker</span> · Updated {UPDATED_DISPLAY}
        </p>
      </header>

      <EVCalculator recommendations={recommendations} faqs={FAQS} />

      {/* What is EV */}
      <section className="mt-12 max-w-[72ch] space-y-4 text-muted leading-relaxed">
        <h2 className="text-2xl font-bold text-text">What is estimated value (EV) on a bonus?</h2>
        <p>
          Estimated value (EV) is the average result you&apos;d expect from a bonus or purchase if you
          played it out many times over. In plain terms, it answers one question:{" "}
          <span className="text-text">is this offer actually worth it?</span> A{" "}
          <strong className="text-text">positive EV (+EV)</strong> means that, on average, you finish
          ahead. The bonus pays you. A <strong className="text-text">negative EV (−EV)</strong> means the
          math is against you and you&apos;d lose money on average, however any single session happens to
          go. For sweepstakes and social-casino players, EV is the whole game: it&apos;s the line between
          grinding offers that quietly pay you and ones that quietly cost you.
        </p>
      </section>

      {/* How to use */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold">How to use this calculator</h2>
        <ol className="mt-4 space-y-3">
          <li className="rounded-xl border border-border bg-panel p-4 text-muted leading-relaxed">
            <span className="font-semibold text-text">1. Enter the bonus.</span> Add your deposit (if any)
            and the bonus or Sweeps Coins bundle you&apos;re getting on top.
          </li>
          <li className="rounded-xl border border-border bg-panel p-4 text-muted leading-relaxed">
            <span className="font-semibold text-text">2. Set the playthrough.</span> How many times you must
            wager the bundle before you can redeem. <strong className="text-text">1×</strong> on most
            sweepstakes sites, 20×–40× on typical online-casino bonuses.
          </li>
          <li className="rounded-xl border border-border bg-panel p-4 text-muted leading-relaxed">
            <span className="font-semibold text-text">3. Pick your game&apos;s RTP.</span> The
            return-to-player of the slot you&apos;ll clear it on (published in each game&apos;s paytable).
            Higher RTP means lower expected loss.
          </li>
          <li className="rounded-xl border border-border bg-panel p-4 text-muted leading-relaxed">
            <span className="font-semibold text-text">4. (Optional) Fine-tune the risk.</span> Add cashback,
            your average bet, and volatility to see how wide the realistic range of outcomes gets.
          </li>
          <li className="rounded-xl border border-border bg-panel p-4 text-muted leading-relaxed">
            <span className="font-semibold text-text">5. Read the verdict.</span> The green or red line at
            the top of the results tells you instantly whether the setup is +EV or −EV, with the exact
            dollar figure and your realistic cashout. Weighing two offers? Hit{" "}
            <span className="text-text">&ldquo;Compare two scenarios&rdquo;</span> to see them side by side.
          </li>
        </ol>
      </section>

      {/* Why it matters + worked example */}
      <section className="mt-10 max-w-[72ch] space-y-4 text-muted leading-relaxed">
        <h2 className="text-2xl font-bold text-text">Why EV matters for sweepstakes players</h2>
        <p>
          The entire edge in sweepstakes and social casinos comes from clearing a{" "}
          <strong className="text-text">low playthrough on a high-RTP game</strong> and redeeming what&apos;s
          left. Here&apos;s the difference EV makes, with real numbers:
        </p>
        <p>
          A <strong className="text-text">50 SC bundle with a 1× playthrough on a 97% RTP slot</strong>{" "}
          means you wager 50 SC once and expect to give back about 3%. Roughly 1.5 SC. Leaving about{" "}
          <span className="text-emerald-300">48.5 SC to redeem</span>. That&apos;s a strong +EV setup. Now
          swap in a <strong className="text-text">40× playthrough</strong> (a typical online-casino bonus)
          on the same slot: you&apos;d wager 2,000 and expect to lose about{" "}
          <span className="text-rose-300">60</span>. Turning the exact same bonus deeply −EV. The
          calculator runs this math instantly, so you can tell the good offers from the traps{" "}
          <em>before</em> you deposit.
        </p>
        <p>
          Then put it to work: find the best +EV offers on our{" "}
          <Link href="/" className="font-semibold text-accent underline underline-offset-2 hover:opacity-80">
            sweepstakes casino rankings
          </Link>
          , stack free coins from the{" "}
          <Link href="/daily-sc" className="font-semibold text-accent underline underline-offset-2 hover:opacity-80">
            free daily SC list
          </Link>
          , and cash out at the{" "}
          <Link href="/fastest-payouts" className="font-semibold text-accent underline underline-offset-2 hover:opacity-80">
            fastest-paying sites
          </Link>
          .
        </p>
      </section>

      <section className="mt-12 rounded-2xl border border-border bg-panel/60 p-5 sm:p-6">
        <h2 className="text-xl font-semibold">More tools coming</h2>
        <p className="mt-2 text-sm text-muted leading-relaxed">
          The calculation engine here is shared infrastructure. Future tools
          plugging into the same pipeline: dedicated RTP calculator, bonus
          comparison side-by-side, multi-session bankroll simulator, cashback
          optimizer, variance simulator, profit tracker, and live promo EV
          rankings. If there&apos;s one you want first, email{" "}
          <Link href="/support" className="underline hover:text-text">
            support
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
