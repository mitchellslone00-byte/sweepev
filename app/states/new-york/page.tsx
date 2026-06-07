import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sweepstakes Casinos in New York — What Actually Works (2026) | SweepEV",
  description:
    "Most sweepstakes casinos don't work in New York. Here's which platforms are available for NY residents in 2026, including Card Crush and Clash 5.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can New York residents play sweepstakes casinos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most traditional sweepstakes casinos are not available in New York. However, card-based social casino platforms like Card Crush and Clash 5 operate under a different model and are fully available to New York residents.",
      },
    },
    {
      "@type": "Question",
      name: "Why are sweepstakes casinos not available in New York?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "New York has strict regulations around sweepstakes and promotional gaming. Most sweepstakes casino operators have chosen to exclude New York rather than navigate the state's compliance requirements.",
      },
    },
    {
      "@type": "Question",
      name: "What online casinos can New York residents use in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "New York residents have a few solid options in 2026. Card Crush and Clash 5 are card-based platforms explicitly available in New York. AceBet is a sweepstakes casino that also operates in New York, offering 1 SC daily and instant redemptions.",
      },
    },
    {
      "@type": "Question",
      name: "Is Card Crush available in New York?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Card Crush is available in New York. It operates on a card-based model rather than a sweepstakes framework, which is why it is accessible where most sweepstakes casinos are not.",
      },
    },
    {
      "@type": "Question",
      name: "Is Clash 5 available in New York?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Clash 5 is available in New York. Like Card Crush, it uses a card-based mechanism rather than traditional sweepstakes law, making it fully accessible to New York residents.",
      },
    },
    {
      "@type": "Question",
      name: "Is Crown Coins available in New York?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Crown Coins Casino is not available in New York. New York residents should use Card Crush or Clash 5 as their primary platforms.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.sweepev.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "States",
      item: "https://www.sweepev.com/states",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "New York",
      item: "https://www.sweepev.com/states/new-york",
    },
  ],
};

export default function NewYorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="container-x py-10 md:py-14 max-w-3xl">

        {/* Breadcrumb */}
        <nav className="text-xs text-muted mb-4">
          <Link href="/" className="hover:text-text">Home</Link>
          <span className="mx-1">›</span>
          <span>States</span>
          <span className="mx-1">›</span>
          <span className="text-text">New York</span>
        </nav>

        <header>
          <h1 className="text-3xl md:text-4xl font-black leading-tight">
            Sweepstakes Casinos in New York — What Actually Works (2026)
          </h1>
          <div className="mt-3 flex items-center gap-3 text-xs text-muted">
            <span>By <span className="text-text font-medium">Jordan Thacker</span></span>
            <span>·</span>
            <span>Last updated: June 2026</span>
          </div>
        </header>

        {/* Quick Answer */}
        <section className="mt-6 rounded-2xl border border-yellow-500/40 bg-yellow-500/5 p-5">
          <p className="font-bold text-text text-lg">Most sweepstakes casinos are not available in New York.</p>
          <p className="mt-1 text-muted leading-relaxed">
            New York is one of the more restricted states for sweepstakes casinos. Most major platforms — including Crown Coins, Pulsz, WOW Vegas, and Chumba — do not operate in New York. The good news is that you still have real options. Card Crush and Clash 5 are card-based platforms built specifically for restricted states like New York, and AceBet is a sweepstakes casino that also operates here with a 1 SC daily bonus and instant redemptions.
          </p>
        </section>

        {/* Why NY is restricted */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Why Most Sweepstakes Casinos Don&apos;t Work in New York</h2>
          <p className="mt-3 text-muted leading-relaxed">
            New York has some of the strictest promotional gaming regulations in the country. Most sweepstakes casino operators have made the decision to exclude New York rather than deal with the state&apos;s compliance requirements. This puts New York alongside California, Washington, and Idaho as states where the traditional sweepstakes casino model largely does not apply.
          </p>
          <p className="mt-3 text-muted leading-relaxed">
            Card-based platforms sidestep this entirely. Instead of operating under sweepstakes promotional law, they use a proprietary token or card currency system that sits outside the sweepstakes framework. That is why Card Crush and Clash 5 can serve New York residents while most sweepstakes casinos cannot.
          </p>
        </section>

        {/* Available options */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Best Options for New York Residents in 2026</h2>

          {/* Card Crush */}
          <div className="mt-5 rounded-2xl border border-accent/40 bg-panel p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-accent mb-1">Top Pick</div>
                <h3 className="text-xl font-bold">Card Crush</h3>
                <p className="mt-1 text-sm text-muted">Card-based social casino available in 48 states — explicitly NY friendly</p>
              </div>
              <span className="shrink-0 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold px-3 py-1">Available in NY</span>
            </div>
            <ul className="mt-4 space-y-1.5 text-sm text-muted">
              <li className="before:content-['✓'] before:text-accent before:mr-2">Rolling welcome offers up to 120 SC for $60</li>
              <li className="before:content-['✓'] before:text-accent before:mr-2">VIP matching program</li>
              <li className="before:content-['✓'] before:text-accent before:mr-2">$10 gift card redemption minimum</li>
              <li className="before:content-['✓'] before:text-accent before:mr-2">Available in New York and California</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://www.cardcrush.com/lp/raf?r=5cce8358%2F47169795"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-accent text-bg font-semibold px-5 py-2.5 text-sm hover:opacity-90"
              >
                Sign Up for Card Crush
              </a>
              <Link href="/sites/card-crush" className="inline-block rounded-lg border border-border px-5 py-2.5 text-sm text-muted hover:text-text">
                Read the Review
              </Link>
            </div>
          </div>

          {/* AceBet */}
          <div className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">AceBet</h3>
                <p className="mt-1 text-sm text-muted">Sweepstakes casino with 1 SC daily and instant redemptions — available in New York</p>
              </div>
              <span className="shrink-0 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold px-3 py-1">Available in NY</span>
            </div>
            <ul className="mt-4 space-y-1.5 text-sm text-muted">
              <li className="before:content-['✓'] before:text-accent before:mr-2">1 SC daily login bonus</li>
              <li className="before:content-['✓'] before:text-accent before:mr-2">Decent rakeback</li>
              <li className="before:content-['✓'] before:text-accent before:mr-2">Instant redemptions</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://acebet.cc/welcome/r/theturbokermit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-accent text-bg font-semibold px-5 py-2.5 text-sm hover:opacity-90"
              >
                Sign Up for AceBet
              </a>
              <Link href="/sites/acebet" className="inline-block rounded-lg border border-border px-5 py-2.5 text-sm text-muted hover:text-text">
                Read the Review
              </Link>
            </div>
          </div>

          {/* Clash 5 */}
          <div className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">Clash 5</h3>
                <p className="mt-1 text-sm text-muted">Card-based sister site to SpinPals — available in New York and California</p>
              </div>
              <span className="shrink-0 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold px-3 py-1">Available in NY</span>
            </div>
            <ul className="mt-4 space-y-1.5 text-sm text-muted">
              <li className="before:content-['✓'] before:text-accent before:mr-2">5 Clash Coins free on signup</li>
              <li className="before:content-['✓'] before:text-accent before:mr-2">Near-instant redemptions</li>
              <li className="before:content-['✓'] before:text-accent before:mr-2">1x playthrough requirement</li>
              <li className="before:content-['✓'] before:text-accent before:mr-2">Available in New York and California</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://www.clash5.com?referralcode=198af5dd-3f48-4ffb-a99a-c9f9606303d5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-accent text-bg font-semibold px-5 py-2.5 text-sm hover:opacity-90"
              >
                Sign Up for Clash 5
              </a>
              <Link href="/sites/clash5" className="inline-block rounded-lg border border-border px-5 py-2.5 text-sm text-muted hover:text-text">
                Read the Review
              </Link>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold">New York Availability at a Glance</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-panel2">
                  <th className="px-4 py-3 text-left font-semibold text-text">Platform</th>
                  <th className="px-4 py-3 text-left font-semibold text-text">Available in NY</th>
                  <th className="px-4 py-3 text-left font-semibold text-text">Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-text">Redemptions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted">
                <tr className="bg-panel">
                  <td className="px-4 py-3 font-medium text-text">Card Crush</td>
                  <td className="px-4 py-3 text-green-400 font-semibold">Yes</td>
                  <td className="px-4 py-3">Card-based</td>
                  <td className="px-4 py-3">From $10 gift card</td>
                </tr>
                <tr className="bg-panel/60">
                  <td className="px-4 py-3 font-medium text-text">Clash 5</td>
                  <td className="px-4 py-3 text-green-400 font-semibold">Yes</td>
                  <td className="px-4 py-3">Card-based</td>
                  <td className="px-4 py-3">Near-instant</td>
                </tr>
                <tr className="bg-panel">
                  <td className="px-4 py-3 font-medium text-text">AceBet</td>
                  <td className="px-4 py-3 text-green-400 font-semibold">Yes</td>
                  <td className="px-4 py-3">Sweepstakes</td>
                  <td className="px-4 py-3">Instant redemptions</td>
                </tr>
                <tr className="bg-panel/60">
                  <td className="px-4 py-3 font-medium text-text">Crown Coins</td>
                  <td className="px-4 py-3 text-red-400 font-semibold">No</td>
                  <td className="px-4 py-3">Sweepstakes</td>
                  <td className="px-4 py-3">Not available in NY</td>
                </tr>
                <tr className="bg-panel/60">
                  <td className="px-4 py-3 font-medium text-text">Pulsz</td>
                  <td className="px-4 py-3 text-red-400 font-semibold">No</td>
                  <td className="px-4 py-3">Sweepstakes</td>
                  <td className="px-4 py-3">Not available in NY</td>
                </tr>
                <tr className="bg-panel">
                  <td className="px-4 py-3 font-medium text-text">WOW Vegas</td>
                  <td className="px-4 py-3 text-red-400 font-semibold">No</td>
                  <td className="px-4 py-3">Sweepstakes</td>
                  <td className="px-4 py-3">Not available in NY</td>
                </tr>
                <tr className="bg-panel/60">
                  <td className="px-4 py-3 font-medium text-text">Chumba Casino</td>
                  <td className="px-4 py-3 text-red-400 font-semibold">No</td>
                  <td className="px-4 py-3">Sweepstakes</td>
                  <td className="px-4 py-3">Not available in NY</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Tips */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Tips for New York Players</h2>

          <h3 className="text-xl font-semibold mt-5">Verify Early</h3>
          <p className="mt-2 text-muted leading-relaxed">
            On both platforms, complete your identity verification before you need to redeem. Use your real name exactly as it appears on your New York ID or driver&apos;s license. This is the most common cause of delays and is easy to get ahead of.
          </p>

          <h3 className="text-xl font-semibold mt-5">Run Both Platforms</h3>
          <p className="mt-2 text-muted leading-relaxed">
            Card Crush and Clash 5 are separate platforms with their own welcome offers, daily bonuses, and promotions. Running both gives you more value to accumulate daily and more welcome offers to clear. The redemption minimums are low enough that it is practical to run them together as part of a daily routine.
          </p>

          <h3 className="text-xl font-semibold mt-5">Watch for New Options</h3>
          <p className="mt-2 text-muted leading-relaxed">
            More operators are moving toward card-based models to serve New York and other restricted states. We expect more NY-compatible platforms to become available in 2026. Join our Discord to stay current as new options launch.
          </p>
          <a
            href="https://discord.gg/A62yrjBPZN"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#5865F2] hover:bg-[#4752c4] text-white font-semibold px-5 py-2.5 text-sm transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden="true">
              <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189z"/>
            </svg>
            Join our Discord
          </a>
        </section>

        {/* Responsible Gaming */}
        <section className="mt-8 rounded-2xl border border-border bg-panel/60 p-5 text-sm text-muted">
          <p className="font-semibold text-text">Responsible Gaming</p>
          <p className="mt-2 leading-relaxed">
            Social and card-based casino platforms are entertainment first. Never spend money you cannot afford to lose on purchases. If you find yourself spending more than intended, take a break. If gambling stops being enjoyable, call the National Problem Gambling Helpline at{" "}
            <a href="tel:1-800-522-4700" className="underline hover:text-text">1-800-GAMBLER</a>.
          </p>
        </section>

      </article>
    </>
  );
}
