import type { Metadata } from "next";
import { ogMeta } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sweepstakes Casinos in California. What Actually Works (2026)",
  description:
    "Most sweepstakes casinos don't work in California. Here's which platforms are available for CA residents in 2026 and why card-based casinos are the best option.",
  alternates: {
    canonical: "https://www.sweepev.com/states/california",
  },
  ...ogMeta(
    "/states/california",
    "Sweepstakes Casinos in California. What Actually Works (2026)",
    "Most sweepstakes casinos don't work in California. Here's which platforms are available for CA residents in 2026 and why card-based casinos are the best option."
  ),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can California residents play sweepstakes casinos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most traditional sweepstakes casinos are not available in California. However, card-based social casino platforms like Card Crush and Clash 5 operate under a different model and are fully available to California residents.",
      },
    },
    {
      "@type": "Question",
      name: "Why are sweepstakes casinos not available in California?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "California has stricter regulations around sweepstakes and promotional gaming than most US states. Most sweepstakes casino operators have chosen to exclude California rather than navigate the state's legal requirements.",
      },
    },
    {
      "@type": "Question",
      name: "What online casinos can California residents use in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "California residents have a few solid options in 2026. Crown Coins Casino. The top-ranked sweepstakes casino overall. Continues to operate in California. Card Crush and Clash 5 are also available, operating on a card-based model purpose-built for restricted states like California.",
      },
    },
    {
      "@type": "Question",
      name: "Is Card Crush available in California?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Card Crush is available in 48 US states including California. It operates on a card-based model rather than a sweepstakes framework, which is why it is accessible where most sweepstakes casinos are not.",
      },
    },
    {
      "@type": "Question",
      name: "Is Clash 5 available in California?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Clash 5 is available in California. Like Card Crush, it uses a card-based mechanism rather than traditional sweepstakes law, making it accessible to California residents.",
      },
    },
    {
      "@type": "Question",
      name: "Can California residents win real money on social casinos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Card-based platforms like Card Crush and Clash 5 offer prize redemptions similar to sweepstakes casinos. California residents can redeem their winnings for real prizes through these platforms.",
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
      name: "California",
      item: "https://www.sweepev.com/states/california",
    },
  ],
};

export default function CaliforniaPage() {
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
          <span className="text-text">California</span>
        </nav>

        <header>
          <h1 className="text-3xl md:text-4xl font-black leading-tight">
            Sweepstakes Casinos in California. What Actually Works (2026)
          </h1>
          <div className="mt-3 flex items-center gap-3 text-xs text-muted">
            <span>By <span className="text-text font-medium">Jordan Thacker</span></span>
            <span>·</span>
            <span>Last updated: July 21, 2026</span>
          </div>
        </header>

        {/* Quick Answer */}
        <section className="mt-6 rounded-2xl border border-green-500/40 bg-green-500/5 p-5">
          <p className="font-bold text-text text-lg">Good news. California has some solid options.</p>
          <p className="mt-1 text-muted leading-relaxed">
            While most sweepstakes casinos block California, a few notable platforms are fully available. Crown Coins Casino. Our top-ranked site overall. Still operates in California, which is a big deal. On top of that, card-based platforms like Card Crush and Clash 5 are purpose-built for states like California. You have real options here.
          </p>
        </section>

        {/* Why CA is different */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Why Most Sweepstakes Casinos Block California</h2>
          <p className="mt-3 text-muted leading-relaxed">
            Sweepstakes casinos operate under promotional sweepstakes law, which varies significantly by state. California has stricter regulations around sweepstakes and promotional gaming than most of the country, and most operators have made the business decision to exclude California rather than navigate the state&apos;s compliance requirements. Idaho, Washington, and a handful of other states face similar restrictions.
          </p>
          <p className="mt-3 text-muted leading-relaxed">
            That said, Crown Coins Casino. Our number one ranked site. Continues to operate in California. It is one of the few traditional sweepstakes casinos that has maintained California availability, which makes it a standout option for CA residents who want access to a full-featured sweepstakes platform. Beyond Crown Coins, card-based platforms like Card Crush and Clash 5 are purpose-built for restricted states and are also fully available here.
          </p>
        </section>

        {/* What is card-based */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold">How Card-Based Platforms Work</h2>
          <p className="mt-3 text-muted leading-relaxed">
            Card-based social casinos use a token or card mechanic instead of the traditional sweepstakes dual-currency model. Rather than Sweeps Coins governed by promotional law, these platforms use their own proprietary currency system that sits outside the sweepstakes legal framework. This is what allows them to operate in California and other restricted states.
          </p>
          <p className="mt-3 text-muted leading-relaxed">
            The practical experience is similar to a sweepstakes casino. You receive tokens on signup, can purchase additional packages, play casino-style games, and redeem your winnings for prizes. The legal structure underneath is just different, which is why California residents can access them.
          </p>
          <p className="mt-3 text-muted leading-relaxed">
            Card-based platforms have been growing quickly in 2025 and 2026 as operators look for ways to serve players in restricted states. We expect more platforms to adopt this model over time.
          </p>
        </section>

        {/* Available options */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Best Options for California Residents in 2026</h2>

          {/* Crown Coins */}
          <div className="mt-5 rounded-2xl border border-accent/40 bg-panel p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-accent mb-1">Top Pick</div>
                <h3 className="text-xl font-bold">Crown Coins Casino</h3>
                <p className="mt-1 text-sm text-muted">Our #1 ranked sweepstakes casino. And one of the few that still operates in California</p>
              </div>
              <span className="shrink-0 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold px-3 py-1">Available in CA</span>
            </div>
            <ul className="mt-4 space-y-1.5 text-sm text-muted">
              <li className="before:content-['✓'] before:text-accent before:mr-2">$20 for 75 SC welcome offer + 2 SC free on signup</li>
              <li className="before:content-['✓'] before:text-accent before:mr-2">Daily SC that scales with VIP level</li>
              <li className="before:content-['✓'] before:text-accent before:mr-2">Weekly Thursday races and monthly VIP bonuses</li>
              <li className="before:content-['✓'] before:text-accent before:mr-2">Fast Skrill redemptions</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://crowncoinscasino.com/?utm_campaign=899836c7-8f89-47a1-88b5-217032931dcf&utm_source=friends"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-accent text-bg font-semibold px-5 py-2.5 text-sm hover:opacity-90"
              >
                Sign Up for Crown Coins
              </a>
              <Link href="/sites/crown-coins" className="inline-block rounded-lg border border-border px-5 py-2.5 text-sm text-muted hover:text-text">
                Read the Review
              </Link>
            </div>
          </div>

          {/* Card Crush */}
          <div className="mt-5 rounded-2xl border border-accent/40 bg-panel p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">Card Crush</h3>
                <p className="mt-1 text-sm text-muted">Card-based social casino available in 48 states including California</p>
              </div>
              <span className="shrink-0 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold px-3 py-1">Available in CA</span>
            </div>
            <ul className="mt-4 space-y-1.5 text-sm text-muted">
              <li className="before:content-['✓'] before:text-accent before:mr-2">Rolling welcome offers up to 120 SC for $60</li>
              <li className="before:content-['✓'] before:text-accent before:mr-2">VIP matching program</li>
              <li className="before:content-['✓'] before:text-accent before:mr-2">$10 gift card redemption minimum</li>
              <li className="before:content-['✓'] before:text-accent before:mr-2">Available in California and New York</li>
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

          {/* Clash 5 */}
          <div className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">Clash 5</h3>
                <p className="mt-1 text-sm text-muted">Card-based sister site to SpinPals, available in California and New York</p>
              </div>
              <span className="shrink-0 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold px-3 py-1">Available in CA</span>
            </div>
            <ul className="mt-4 space-y-1.5 text-sm text-muted">
              <li className="before:content-['✓'] before:text-accent before:mr-2">5 Clash Coins free on signup</li>
              <li className="before:content-['✓'] before:text-accent before:mr-2">Near-instant redemptions</li>
              <li className="before:content-['✓'] before:text-accent before:mr-2">1x playthrough requirement</li>
              <li className="before:content-['✓'] before:text-accent before:mr-2">Available in California and New York</li>
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
          <h2 className="text-2xl font-bold">California Availability at a Glance</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-panel2">
                  <th className="px-4 py-3 text-left font-semibold text-text">Platform</th>
                  <th className="px-4 py-3 text-left font-semibold text-text">Available in CA</th>
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
                  <td className="px-4 py-3 font-medium text-text">Crown Coins</td>
                  <td className="px-4 py-3 text-green-400 font-semibold">Yes</td>
                  <td className="px-4 py-3">Sweepstakes</td>
                  <td className="px-4 py-3">Skrill, bank transfer</td>
                </tr>
                <tr className="bg-panel/60">
                  <td className="px-4 py-3 font-medium text-text">Pulsz</td>
                  <td className="px-4 py-3 text-red-400 font-semibold">No</td>
                  <td className="px-4 py-3">Sweepstakes</td>
                  <td className="px-4 py-3">Not available in CA</td>
                </tr>
                <tr className="bg-panel">
                  <td className="px-4 py-3 font-medium text-text">WOW Vegas</td>
                  <td className="px-4 py-3 text-red-400 font-semibold">No</td>
                  <td className="px-4 py-3">Sweepstakes</td>
                  <td className="px-4 py-3">Not available in CA</td>
                </tr>
                <tr className="bg-panel/60">
                  <td className="px-4 py-3 font-medium text-text">Chumba Casino</td>
                  <td className="px-4 py-3 text-red-400 font-semibold">No</td>
                  <td className="px-4 py-3">Sweepstakes</td>
                  <td className="px-4 py-3">Not available in CA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Tips for CA players */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Tips for California Players</h2>

          <h3 className="text-xl font-semibold mt-5">Verify Your Account Early</h3>
          <p className="mt-2 text-muted leading-relaxed">
            On any platform you join, complete identity verification before you need to redeem. Use your real name exactly as it appears on your California ID or driver&apos;s license. Inconsistencies between your account info and your ID are the most common cause of redemption delays.
          </p>

          <h3 className="text-xl font-semibold mt-5">Run Multiple Platforms</h3>
          <p className="mt-2 text-muted leading-relaxed">
            Crown Coins, Card Crush, and Clash 5 are all separate platforms with their own welcome offers and daily bonuses. Running all three gives you more value to accumulate and more welcome offers to clear. Since the redemption minimums are low across all three, it is practical to run them simultaneously as part of a daily routine.
          </p>

          <h3 className="text-xl font-semibold mt-5">Watch for New Platforms</h3>
          <p className="mt-2 text-muted leading-relaxed">
            The card-based casino category is growing fast. More operators are moving toward this model to serve restricted states, and California is one of the biggest markets they want access to. We expect more CA-compatible platforms to launch in 2026. Join our Discord to stay up to date as new options become available.
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
