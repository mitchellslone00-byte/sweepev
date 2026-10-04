import type { Metadata } from "next";
import { ogMeta } from "@/lib/seo";
import Link from "next/link";
import { StateFaq } from "@/components/StateFaq";
import { guideDate } from "@/lib/guide-dates";
import { StateSiteList } from "@/components/StateSiteList";

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

const faqs = [
  {
    q: "Can California residents play sweepstakes casinos?",
    a: "Most traditional sweepstakes casinos are not available in California, but several platforms are. Crown Coins Casino and AceBet are conventional sweepstakes casinos that have chosen not to exclude California. Card Crush and Clash 5 use a card-based model that sits outside the sweepstakes framework. Candy Coins is an alternative-model sweeps site available in 48 states.",
  },
  {
    q: "Why are sweepstakes casinos not available in California?",
    a: "California has stricter regulations around sweepstakes and promotional gaming than most US states. Most sweepstakes casino operators have chosen to exclude California rather than navigate the state's legal requirements.",
  },
  {
    q: "What online casinos can California residents use in 2026?",
    a: "California residents have several solid options in 2026. Crown Coins Casino, the top-ranked sweepstakes casino overall, still accepts California players. Card Crush and Clash 5 are card-based platforms purpose-built for restricted states like California. Candy Coins, from the same operator as Sweet Sweeps, plays in 48 states. AceBet is another conventional sweepstakes casino that accepts California players, with a 1 SC daily bonus and instant redemptions.",
  },
  {
    q: "Is Card Crush available in California?",
    a: "Yes. Card Crush is available in 48 US states including California. It operates on a card-based model rather than a sweepstakes framework, which is why it is accessible where most sweepstakes casinos are not.",
  },
  {
    q: "Is Candy Coins available in California?",
    a: "Yes. Candy Coins is available in 48 US states, with Nevada and Washington the only exclusions, so California residents can play. It launched in August 2026 under Inimitable Solutions Limited, the same operator behind Sweet Sweeps, and gives 2 SC free on signup with no purchase needed.",
  },
  {
    q: "Can California players use Crown Coins Casino?",
    a: "Yes. Crown Coins Casino is our top-ranked sweepstakes casino overall and it accepts California players, which makes it the strongest option on this page. It pairs a $20 for 75 SC welcome offer with 2 SC free on signup, daily SC that scales with your VIP level, and fast Skrill redemptions.",
  },
  {
    q: "Is AceBet available in California?",
    a: "Yes. AceBet is a conventional sweepstakes casino that excludes only seven states, and California is not one of them. It offers a 1 SC daily login bonus and instant redemptions, which makes it the one traditional dual-currency option on this list.",
  },
  {
    q: "Is Clash 5 available in California?",
    a: "Yes. Clash 5 is available in California. Like Card Crush, it uses a card-based mechanism rather than traditional sweepstakes law, making it accessible to California residents.",
  },
  {
    q: "Can California residents win real money on social casinos?",
    a: "Yes. Crown Coins, Card Crush, Clash 5, Candy Coins and AceBet all offer prize redemptions to California residents, so winnings can be redeemed for real prizes. Redemption minimums and payout speeds vary by platform.",
  },
];

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
            <span>Last updated: {guideDate("/states/california").modifiedDisplay}</span>
          </div>
        </header>

        {/* Quick Answer */}
        <section className="mt-6 rounded-2xl border border-green-500/40 bg-green-500/5 p-5">
          <p className="font-bold text-text text-lg">Good news. California has some solid options.</p>
          <p className="mt-1 text-muted leading-relaxed">
            While most sweepstakes casinos block California, several platforms are fully available. Crown Coins Casino, our top-ranked site overall, still takes California players, which is a big deal. Card Crush and Clash 5 are purpose-built for states like California, Candy Coins is the newest arrival and plays in 48 states, and AceBet is another conventional sweeps casino that has stayed. You have real options here.
          </p>
        </section>

        {/* Available options */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Best Options for California Residents in 2026</h2>

          <StateSiteList
            state="California"
            stateAbbr="CA"
            source="state_california"
            entries={[
              {
                slug: "crown-coins",
                topPick: true,
                blurb: "Our #1 ranked sweepstakes casino. And one of the few that still operates in California",
                bullets: [
                  "$20 for 75 SC welcome offer + 2 SC free on signup",
                  "Daily SC that scales with VIP level",
                  "Weekly Thursday races and monthly VIP bonuses",
                  "Fast Skrill redemptions",
                ],
              },
              {
                slug: "card-crush",
                blurb: "Card-based social casino available in 48 states including California",
                bullets: [
                  "Rolling welcome offers up to 120 SC for $60",
                  "VIP matching program",
                  "$10 gift card redemption minimum",
                  "Available in California and New York",
                ],
              },
              {
                slug: "clash5",
                blurb: "Card-based sister site to SpinPals, available in California and New York",
                bullets: [
                  "5 Clash Coins free on signup",
                  "Near-instant redemptions",
                  "1x playthrough requirement",
                  "Available in California and New York",
                ],
              },
              {
                slug: "candy-coins",
                blurb: "Newest option from the Sweet Sweeps group, playable in 48 states",
                bullets: [
                  "2 SC free on signup, no purchase needed",
                  "Welcome Series up to 70 SC for $34.99",
                  "No playthrough on purchased coins",
                  "VIP tiers climb through skill-based Battle Arena",
                ],
              },
              {
                slug: "acebet",
                blurb: "Sweepstakes casino that still takes California players, with a 1 SC daily bonus",
                bullets: [
                  "1 SC daily login bonus",
                  "Instant redemptions",
                  "Decent rakeback",
                  "Only excluded from seven states",
                ],
              },
            ]}
          />
        </section>

        {/* How to choose */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Which of the Five Should You Pick?</h2>
          <p className="mt-3 text-muted leading-relaxed">
            They are not interchangeable. Pick by what you actually care about.
          </p>

          <h3 className="mt-5 text-lg font-bold text-text">If you want the most complete site</h3>
          <p className="mt-2 text-muted leading-relaxed">
            Crown Coins. It is our top-ranked sweepstakes casino overall and the only one on this
            list that gives California players the full dual-currency experience with a mature VIP
            programme behind it. The trade-off is the highest cashout floor of the five at 100 SC.
          </p>

          <h3 className="mt-5 text-lg font-bold text-text">If you want money off the site quickly</h3>
          <p className="mt-2 text-muted leading-relaxed">
            AceBet redeems instantly, and Clash 5 lands within about 48 hours. Crown Coins takes 1 to
            2 days through Skrill, and Candy Coins 2 to 3 business days by card. If waiting is the
            thing that puts you off, start with AceBet.
          </p>

          <h3 className="mt-5 text-lg font-bold text-text">If you want to take value out early</h3>
          <p className="mt-2 text-muted leading-relaxed">
            Card Crush, which redeems from a $10 gift card. That is far below everything else here
            and it means you are never sitting on a balance you cannot touch. Candy Coins is next at
            75 SC, then Crown Coins and Clash 5 at 100.
          </p>

          <h3 className="mt-5 text-lg font-bold text-text">If you want free coins without spending</h3>
          <p className="mt-2 text-muted leading-relaxed">
            Crown Coins and AceBet are the two with a daily login bonus, at around 1.5 SC and 1 SC a
            day respectively. That is the most reliable way to build a balance here without a
            purchase, and over a month it adds up to more than any single welcome offer on this page.
          </p>

          <h3 className="mt-5 text-lg font-bold text-text">If you want something new</h3>
          <p className="mt-2 text-muted leading-relaxed">
            Candy Coins launched in August 2026 and runs an unusual setup where purchased coins carry
            no playthrough at all and VIP tiers climb through a skill-based Battle Arena rather than
            through spending. It is the least proven of the five, so treat it accordingly, but it is
            the most interesting.
          </p>

          <p className="mt-3 text-muted leading-relaxed">
            There is no reason to pick only one. They are separate accounts with separate welcome
            offers, and running several is the single easiest way to increase what California play is
            worth to you.
          </p>
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
                  <td className="px-4 py-3 font-medium text-text">Candy Coins</td>
                  <td className="px-4 py-3 text-green-400 font-semibold">Yes</td>
                  <td className="px-4 py-3">Sweeps alternative</td>
                  <td className="px-4 py-3">Card, 2 to 3 business days</td>
                </tr>
                <tr className="bg-panel/60">
                  <td className="px-4 py-3 font-medium text-text">AceBet</td>
                  <td className="px-4 py-3 text-green-400 font-semibold">Yes</td>
                  <td className="px-4 py-3">Sweepstakes</td>
                  <td className="px-4 py-3">Instant</td>
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

        {/* Is it legal */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Is It Legal to Play in California?</h2>
          <p className="mt-3 text-muted leading-relaxed">
            The short version: the law that changed things targets the operators, not you. California
            passed <strong className="text-text">AB 831</strong>, which took effect on{" "}
            <strong className="text-text">January 1, 2026</strong> and tightened the state&apos;s
            treatment of dual-currency sweepstakes gaming. What followed was an exodus. Operators
            weighed the compliance risk and most of them simply switched California off rather than
            fight about it.
          </p>
          <p className="mt-3 text-muted leading-relaxed">
            That is why this page exists in the form it does. The question for a California player is
            not really whether you are allowed to play, it is which platforms will still have you.
            Enforcement in this area is aimed at the businesses running the games, and we are not
            aware of players being pursued for taking part. That is context, not legal advice, and
            nothing on this site is a substitute for your own judgment or a lawyer.
          </p>
          <p className="mt-3 text-muted leading-relaxed">
            The practical rule we would give anyone in a restricted state: play where the operator
            says you are welcome. If a site&apos;s own terms accept California residents, your
            account and your balance stand on solid ground. If a site excludes California and you
            get in anyway, the problem usually surfaces at verification on your first withdrawal,
            which is the worst possible moment to find out.
          </p>
        </section>

        {/* Why CA is different */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Why Most Sweepstakes Casinos Block California</h2>
          <p className="mt-3 text-muted leading-relaxed">
            Sweepstakes casinos operate under promotional sweepstakes law, which varies significantly by state. California has stricter regulations around sweepstakes and promotional gaming than most of the country, and most operators have made the business decision to exclude California rather than navigate the state&apos;s compliance requirements. Idaho, Washington, and a handful of other states face similar restrictions.
          </p>
          <p className="mt-3 text-muted leading-relaxed">
            That said, some have stayed. Crown Coins Casino, our number one ranked site, continues to accept California players, which makes it a standout option for anyone who wants a full-featured sweepstakes platform rather than an alternative model. Card Crush and Clash 5 are purpose-built for restricted states and are fully available here, as is Candy Coins, which launched in August 2026 from the same group behind Sweet Sweeps and plays everywhere except Nevada and Washington.
          </p>
        </section>

        {/* What is card-based */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold">The Three Ways a Site Can Still Serve California</h2>
          <p className="mt-3 text-muted leading-relaxed">
            The sites on this page are not all doing the same thing, and the difference is worth understanding before you pick one.
          </p>
          <p className="mt-3 text-muted leading-relaxed">
            The first route is the card-based model, used by Card Crush and Clash 5. Instead of Sweeps Coins governed by promotional sweepstakes law, these run a proprietary card or token currency that sits outside the sweepstakes framework entirely. California's rules target the dual-currency sweepstakes structure, and these platforms simply are not that structure.

The second is an alternative-model sweeps site, which is where Candy Coins sits. It still looks and plays like a sweepstakes casino, but the currency design differs enough from the standard dual-currency setup to keep it available in 48 states. In practice it feels closer to a normal sweeps casino than the card-based sites do.

The third is simply a conventional sweepstakes casino that has chosen not to exclude California. Crown Coins and AceBet are the examples here. Nothing clever about the mechanism; those operators have just made a different business call from most of their competitors, and it means you get a standard dual-currency sweeps experience rather than an alternative model.

Whatever the route, the practical experience is similar. You get coins on signup, can buy more, play casino-style games, and redeem winnings for prizes. What changes is the legal structure underneath, and that is what determines whether you can play at all.
          </p>
          <p className="mt-3 text-muted leading-relaxed">
            Alternative models have been growing quickly through 2025 and 2026 as operators look for ways to serve players in restricted states, and we expect more platforms to adopt them. The flip side is that conventional sweeps casinos keep withdrawing from California, so the balance between those three routes is still shifting.
          </p>
        </section>

        {/* Who left */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Who Left California, and Who Stayed</h2>
          <p className="mt-3 text-muted leading-relaxed">
            It is worth seeing the scale of this plainly. Of the{" "}
            <strong className="text-text">45 sites we track</strong>, only{" "}
            <strong className="text-text">five</strong> accept California players. Forty do not.
            California went from one of the biggest sweepstakes markets in the country to one of the
            thinnest in about a year.
          </p>
          <p className="mt-3 text-muted leading-relaxed">
            The names that left are the ones you have most likely heard of: Pulsz and Pulsz Bingo,
            Chumba Casino, Global Poker and LuckyLand Casino, WOW Vegas, Modo, ReBet and Dogg House,
            Legendz, Sweet Sweeps, LoneStar, RealPrize, Zula, Fortune Coins, Moozi, Golden Hearts and
            Coin Wizard among them. If you had an account at any of those before 2026, that is why it
            stopped working.
          </p>
          <p className="mt-3 text-muted leading-relaxed">
            Two consequences follow. First, be sceptical of any list that tells you a big-name sweeps
            casino is still available here; a lot of pages have not been updated since the exodus.
            Second, the five below are worth more attention than a short list might suggest, because
            they are genuinely most of what is left.
          </p>
        </section>

        {/* Free SC */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Getting Free Sweeps Coins in California</h2>
          <p className="mt-3 text-muted leading-relaxed">
            Every legitimate sweepstakes platform has to offer a way to get its premium currency
            without paying, and that matters more here than almost anywhere, because your options are
            narrow enough that stacking the free routes across all five is a real strategy rather
            than an afterthought.
          </p>
          <ul className="mt-3 space-y-2 text-muted leading-relaxed">
            <li className="before:content-['◆'] before:text-accent2 before:mr-2">
              <strong className="text-text">Daily login bonuses.</strong> Crown Coins pays around 1.5
              SC a day scaling with your VIP level, and AceBet pays 1 SC. Those two are the backbone
              of free value on this page. Claim them every day; a missed day is simply gone.
            </li>
            <li className="before:content-['◆'] before:text-accent2 before:mr-2">
              <strong className="text-text">Signup coins.</strong> Crown Coins gives 2 SC free with no
              purchase, Candy Coins gives 2 SC plus 2 Battle Passes, and Clash 5 gives 5 Clash Coins.
              Opening all five accounts is free and gets you playing without spending anything.
            </li>
            <li className="before:content-['◆'] before:text-accent2 before:mr-2">
              <strong className="text-text">AMOE, where it is offered.</strong> The no-purchase entry
              route varies by operator and is worth checking on each site&apos;s own promotions page,
              since terms change more often than anything else in this space. Our{" "}
              <Link href="/guides/amoe" className="font-semibold text-accent underline underline-offset-2 hover:opacity-80">
                AMOE guide
              </Link>{" "}
              covers how the method works and how to judge whether a given site&apos;s version is
              worth the effort.
            </li>
          </ul>
          <p className="mt-3 text-muted leading-relaxed">
            Run the dailies across both sites that offer them and you are collecting roughly 2.5 SC a
            day without spending a cent. That is the closest thing to a free income stream available
            to a California player right now, and it costs you a couple of minutes.
          </p>
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
            Crown Coins, Card Crush, Clash 5, Candy Coins and AceBet are all separate platforms with their own welcome offers and bonuses. Running several gives you more value to accumulate and more welcome offers to clear, and it is practical to keep them going side by side as part of a daily routine.
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

        <StateFaq faqs={faqs} heading="Sweepstakes Casinos in California: FAQ" />

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
