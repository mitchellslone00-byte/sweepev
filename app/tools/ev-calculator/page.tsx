import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { sites } from "@/lib/sites";
import { buildRecommendations } from "@/lib/calculators/recommendations";
import { EVCalculator } from "@/components/EVCalculator";

export const metadata: Metadata = {
  title: "Estimated Value Calculator",
  description:
    "Free analytical tool for estimating net value, bankroll risk, and realistic cashout amounts on sweepstakes and online casino bonuses. Probability-based analysis, not promotional hype.",
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
    a: "Playthrough applies to your bonus / SC bundle, not your deposit. If you purchase 50 SC on a site with a 2× playthrough, you must wager 100 SC before redeeming. A 1× playthrough on a sweepstakes site means you wager the bundle once before redemption; online casino bonuses commonly run 20×–40×. Check your operator's terms — a few apply playthrough to deposit + bonus combined.",
  },
  {
    q: "Why does volatility matter if RTP is the same?",
    a: "Higher volatility means a wider distribution of outcomes around the same estimated value. A 97% RTP low-volatility slot will land you near the average loss most of the time, while a 97% RTP high-volatility slot might bust your bankroll before you finish playthrough or pay big in rare hits. Volatility doesn't change EV; it changes your bankroll survival probability.",
  },
  {
    q: "How accurate is the bankroll survival estimate?",
    a: "The survival probability is a normal-distribution approximation based on the expected loss and total variance over the playthrough. Real slot distributions are heavily skewed by jackpot hits and bonus rounds, so treat this number as a directional estimate rather than a precise probability.",
  },
  {
    q: "Is positive EV a guarantee of profit?",
    a: "No. Positive EV means the strategy is profitable on average over many trials, not on any single attempt. Variance can produce a losing session even with a strong +EV setup. This calculator is informational only and does not constitute financial or gambling advice.",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function EVCalculatorPage() {
  const recommendations = buildRecommendations(sites);

  return (
    <main className="container-x py-8 sm:py-12 md:py-16 max-w-5xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <header>
        <p className="text-xs uppercase tracking-widest text-accent">Tool</p>
        <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
          Estimated Value Calculator
        </h1>
        <p className="mt-3 text-muted text-base sm:text-lg max-w-2xl">
          A probability-based analysis tool for estimating net value,
          bankroll risk, and realistic cashout on any casino or sweepstakes
          bonus. Inputs update results instantly. Numbers are estimates, not
          guarantees.
        </p>
      </header>

      <EVCalculator recommendations={recommendations} faqs={FAQS} />

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
