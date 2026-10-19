import type { Metadata } from "next";
import Link from "next/link";
import { ogMeta } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { guideDate } from "@/lib/guide-dates";
import { AffiliateLink } from "@/components/AffiliateLink";
import { StateFaq } from "@/components/StateFaq";

const TITLE = "Crown Coins in Indiana: How It Still Works After HB 1052";
const DESCRIPTION =
  "Crown Coins still accepts Indiana players after HB 1052, but not with Sweeps Coins. Here is how the Sweeps Crown Tickets model works, what the $50 redemption floor means, and what you give up.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${siteConfig.url}/states/indiana/crown-coins`,
  },
  ...ogMeta("/states/indiana/crown-coins", TITLE, DESCRIPTION),
};

const faqs = [
  {
    q: "Can Indiana residents still play Crown Coins?",
    a: "Yes, but not the standard product. HB 1052 ended the dual-currency sweepstakes model in Indiana in 2026 and most operators withdrew from the state entirely. Crown Coins restructured instead, so Indiana players get a reworked version of the site rather than no site at all.",
  },
  {
    q: "What are Sweeps Crown Tickets?",
    a: "They are the currency Indiana players use in place of Sweeps Coins. You spend a ticket on each spin rather than holding a Sweeps Coins balance, and winnings accumulate in a separate cash balance that you redeem from. The games are the same, the currency wrapped around them is not.",
  },
  {
    q: "What is the minimum redemption for Indiana players?",
    a: "$50 from your cash balance, rather than the 100 SC minimum the standard product uses. In practice that is a lower bar than most of the country faces, which is one of the few ways the Indiana version is better rather than worse.",
  },
  {
    q: "Do Indiana players get Coinback?",
    a: "No, but it is a smaller loss than it sounds. Coinback is the loss-return program, worth 4% of wagered coins at Gold and 6% at Emerald, so it is a slow background rebate rather than a headline perk. Unless you are wagering heavily every month the absolute numbers are modest, and the lower $50 cashout floor Indiana players get is the change you are more likely to notice.",
  },
  {
    q: "Is it legal to play Crown Coins in Indiana?",
    a: "HB 1052 targeted the dual-currency sweepstakes model, which is why that version is gone from the state. Crown Coins operates a restructured product in Indiana rather than the banned one. Enforcement in this area is aimed at operators rather than players, and we are not aware of players being pursued. That is context rather than legal advice, and nothing here substitutes for your own judgment.",
  },
  {
    q: "What other casinos still work in Indiana?",
    a: "Card Crush, Candy Coins and Clash 5 all still accept Indiana players. Each runs on a card-based or alternative currency model that sits outside the sweepstakes framework HB 1052 targeted, which is why they were not affected the way conventional sweeps casinos were.",
  },
];

const LINK = "font-semibold text-accent underline underline-offset-2 hover:opacity-80";

export default function CrownCoinsIndianaPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "States", item: `${siteConfig.url}/where-legal` },
      { "@type": "ListItem", position: 3, name: "Indiana", item: `${siteConfig.url}/states/indiana` },
      {
        "@type": "ListItem",
        position: 4,
        name: "Crown Coins",
        item: `${siteConfig.url}/states/indiana/crown-coins`,
      },
    ],
  };

  return (
    <article className="container-x py-10 md:py-14 max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <nav className="text-sm text-muted">
        <Link href="/" className="hover:text-text">
          Home
        </Link>{" "}
        ›{" "}
        <Link href="/states/indiana" className="hover:text-text">
          Indiana
        </Link>{" "}
        › <span className="text-text">Crown Coins</span>
      </nav>

      <header className="mt-4">
        <h1 className="text-3xl md:text-4xl font-black">{TITLE}</h1>
        <p className="mt-2 text-xs text-muted">
          By <span className="font-medium text-text">Jordan Thacker</span> · Last updated:{" "}
          {guideDate("/states/indiana/crown-coins").modifiedDisplay}
        </p>
      </header>

      {/* Quick answer */}
      <section className="mt-6 rounded-2xl border border-accent/40 bg-panel p-5">
        <p className="font-semibold text-text">Short answer: yes, but it is a different site now.</p>
        <p className="mt-3 text-muted leading-relaxed">
          HB 1052 ended the standard dual-currency sweepstakes model in Indiana in 2026. Most
          operators responded by blocking the state outright. Crown Coins did not. It rebuilt the
          product instead, so you can still play and still cash out, but through{" "}
          <strong className="text-text">Sweeps Crown Tickets</strong> rather than Sweeps Coins.
        </p>
      </section>

      {/* What changed */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold">What HB 1052 actually did</h2>
        <p className="mt-3 text-muted leading-relaxed">
          The law went after a structure, not a brand. The dual-currency sweepstakes model, where you
          play with a free currency and hold a second redeemable one, is what Indiana legislated
          against. Every site built on that model had the same problem on the same day, which is why
          the state emptied out so quickly in 2026.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          Pulling out was the cheap answer and most operators took it. Rebuilding the product for one
          state is expensive, and only a brand with enough players in Indiana to justify the work
          would bother. Crown Coins is one of the largest sweeps casinos in the US, so the maths
          worked out differently for them.
        </p>
      </section>

      {/* How it works */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold">How the Indiana version works</h2>
        <p className="mt-3 text-muted leading-relaxed">
          Three things change. The rest of the site, the games, the lobby and the apps, is what
          everyone else sees.
        </p>
        <ul className="mt-4 space-y-3 text-muted leading-relaxed">
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Sweeps Crown Tickets replace Sweeps Coins.</strong> You
            spend a ticket on each spin rather than wagering down a Sweeps Coins balance. It is the
            same action with a different unit attached to it.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Winnings land in a cash balance.</strong> Rather than
            accruing redeemable Sweeps Coins, what you win sits in a cash balance you withdraw from
            directly, with a <strong className="text-text">$50 minimum</strong>.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Coinback is not included.</strong> The rebate that higher
            Crown VIP Club tiers get everywhere else does not apply in Indiana.
          </li>
        </ul>

        <h3 className="mt-6 text-lg font-bold text-text">Side by side</h3>
        <div className="mt-3 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-panel2 text-left">
                <th className="px-4 py-3 font-semibold text-text"></th>
                <th className="px-4 py-3 font-semibold text-text">Standard Crown Coins</th>
                <th className="px-4 py-3 font-semibold text-text">Indiana</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted">
              <tr className="bg-panel">
                <td className="px-4 py-3 font-medium text-text">Currency</td>
                <td className="px-4 py-3">Sweeps Coins</td>
                <td className="px-4 py-3">Sweeps Crown Tickets</td>
              </tr>
              <tr className="bg-panel/60">
                <td className="px-4 py-3 font-medium text-text">How you play</td>
                <td className="px-4 py-3">Wager down an SC balance</td>
                <td className="px-4 py-3">Spend a ticket on each spin</td>
              </tr>
              <tr className="bg-panel">
                <td className="px-4 py-3 font-medium text-text">Where winnings go</td>
                <td className="px-4 py-3">Redeemable Sweeps Coins</td>
                <td className="px-4 py-3">A separate cash balance</td>
              </tr>
              <tr className="bg-panel/60">
                <td className="px-4 py-3 font-medium text-text">Cashout floor</td>
                <td className="px-4 py-3">100 SC</td>
                <td className="px-4 py-3 font-semibold text-green-400">$50</td>
              </tr>
              <tr className="bg-panel">
                <td className="px-4 py-3 font-medium text-text">Coinback</td>
                <td className="px-4 py-3">4% at Gold, 6% at Emerald</td>
                <td className="px-4 py-3 text-red-400">Not included</td>
              </tr>
              <tr className="bg-panel/60">
                <td className="px-4 py-3 font-medium text-text">Games, VIP ladder, races, apps</td>
                <td className="px-4 py-3" colSpan={2}>
                  The same in both
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          Two rows change the maths and one row is the point: almost everything about the site is
          identical, so this is the same casino with a different currency bolted to the front of it.
        </p>
      </section>

      {/* Better and worse */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold">What you gain and what you lose</h2>
        <p className="mt-3 text-muted leading-relaxed">
          It is not simply a worse deal, which is worth saying because most coverage treats it as a
          consolation prize. The one thing you lose is minor, and the one thing you gain is not.
        </p>
        <h3 className="mt-5 text-lg font-bold text-text">Better in Indiana</h3>
        <p className="mt-2 text-muted leading-relaxed">
          The cashout floor. Indiana players withdraw from $50, where the standard product asks for
          100 SC. That halves the balance you have to build before you can take anything off the
          site, and a lower floor is worth more to a casual player than almost any bonus.
        </p>
        <h3 className="mt-5 text-lg font-bold text-text">Worse in Indiana</h3>
        <p className="mt-2 text-muted leading-relaxed">
          Coinback, and honestly it is a smaller loss than it sounds. Coinback is the loss-return
          program, worth 4% of wagered coins at Gold and 6% at Emerald. It is a slow background
          rebate rather than something you notice, and unless you are wagering heavily every month
          the absolute numbers are modest.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          So on balance the Indiana version is a reasonable trade for most people. You give up a few
          percent back on sustained play and gain a cashout floor at half the height, which is the
          change you will actually feel. Only genuinely high-volume players at the upper tiers will
          miss Coinback enough to care, and everything else about the site, the games, the VIP
          ladder, the races and the apps, is unchanged.
        </p>
      </section>

      {/* Caveat */}
      <section className="mt-8 rounded-2xl border border-yellow-500/40 bg-yellow-500/5 p-5">
        <h2 className="text-xl font-bold text-text">One thing to check yourself</h2>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          Coverage of this is genuinely split. Several sites still list Indiana as fully blocked for
          Crown Coins, which is how it looked in the weeks after the law changed, and we have not been
          able to confirm the current setup against Crown Coins&apos; own published terms. What is
          described here matches what we have been able to establish, but Indiana is a state where the
          rules moved recently and operators do not always announce changes.
        </p>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          Confirm the current position at signup before you spend anything. That is good advice
          anywhere and particularly here.
        </p>
      </section>

      {/* CTA */}
      <section className="mt-8 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Getting started from Indiana</h2>
        <p className="mt-3 text-muted leading-relaxed">
          Sign up as normal and the Indiana version is what you get. Complete identity verification
          early rather than at your first withdrawal, using your name exactly as it appears on your
          Indiana ID, since a mismatch is the most common reason a payout stalls anywhere in this
          space.
        </p>
        <div className="mt-4">
          <AffiliateLink
            slug="crown-coins"
            name="CrownCoinsCasino"
            source="indiana_crown_coins"
            className="inline-block rounded-lg bg-accent px-6 py-3 font-semibold text-bg hover:opacity-90"
          >
            Sign Up for Crown Coins
          </AffiliateLink>
        </div>
        <p className="mt-3 text-sm text-muted">
          Read the full{" "}
          <Link href="/sites/crown-coins" className={LINK}>
            Crown Coins review
          </Link>{" "}
          for scoring, bonuses and redemption detail on the standard product.
        </p>
      </section>

      {/* Alternatives */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold">Other casinos that still work in Indiana</h2>
        <p className="mt-3 text-muted leading-relaxed">
          Crown Coins is not the only option. Three other platforms accept Indiana players, and all
          three for the same underlying reason: none of them is built on the dual-currency model HB
          1052 targeted, so the law left them alone.
        </p>
        <ul className="mt-4 space-y-3 text-muted leading-relaxed">
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">
              <Link href="/sites/card-crush" className={LINK}>
                Card Crush
              </Link>
              .
            </strong>{" "}
            A card-based platform available in 48 states, excluded only from Nevada and Washington.
            Redeems from a $10 gift card, the lowest floor of anything here.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">
              <Link href="/sites/candy-coins" className={LINK}>
                Candy Coins
              </Link>
              .
            </strong>{" "}
            An alternative currency model from the Sweet Sweeps group, also playable in 48 states.
            Purchased coins carry no playthrough at all, and VIP tiers climb through a skill-based
            Battle Arena rather than through spending.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">
              <Link href="/sites/clash5" className={LINK}>
                Clash 5
              </Link>
              .
            </strong>{" "}
            A digital trading-card platform rather than a sweepstakes casino, with near-instant
            redemptions and a 1x playthrough.
          </li>
        </ul>
        <p className="mt-4 text-muted leading-relaxed">
          They are separate accounts with separate welcome offers, so there is no reason to pick only
          one. See the{" "}
          <Link href="/states/indiana" className={LINK}>
            full Indiana page
          </Link>{" "}
          for the legal picture, or our{" "}
          <Link href="/where-legal" className={LINK}>
            state legality map
          </Link>{" "}
          for where things stand elsewhere.
        </p>
      </section>

      <StateFaq faqs={faqs} heading="Crown Coins in Indiana: FAQ" />

      <section className="mt-8 rounded-2xl border border-border bg-panel/60 p-5 text-sm text-muted leading-relaxed">
        <p>
          21+ where required, and availability and terms change. Always confirm the current rules for
          Indiana on the operator&apos;s own site. If gambling stops being fun, call 1-800-GAMBLER.
        </p>
      </section>
    </article>
  );
}
