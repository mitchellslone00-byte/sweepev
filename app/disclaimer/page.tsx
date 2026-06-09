import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Disclaimer | ${siteConfig.name}`,
  description: `Important disclaimers about ${siteConfig.name}, affiliate relationships, editorial independence, and the limits of strategy content.`,
  alternates: { canonical: `${siteConfig.url}/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-transparent text-text px-6 py-16">
      <div className="mx-auto w-full max-w-3xl">
        {/* Centered glow logo */}
        <div className="flex justify-center">
          <Link href="/" className="group inline-flex items-center">
            <span className="relative transition-all duration-300">
              <span
                aria-hidden
                className="
                  absolute -inset-3 -z-10 rounded-3xl
                  bg-accent/20 blur-lg
                  transition-all duration-300
                  group-hover:bg-accent/45
                  group-hover:blur-2xl
                "
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icon.png"
                alt={siteConfig.name}
                className="
                  h-14 w-14 rounded-2xl
                  bg-bg p-1
                  shadow-[0_0_40px_rgba(34,197,94,0.25)]
                  transition-all duration-300
                  group-hover:shadow-[0_0_80px_rgba(34,197,94,0.55)]
                  group-hover:scale-[1.05]
                "
              />
            </span>
          </Link>
        </div>

        <h1 className="mt-8 text-4xl font-semibold tracking-tight">Disclaimer</h1>

        <section className="mt-8 space-y-6 text-muted leading-relaxed">
          <p>
            <strong className="text-text">Editorial &amp; affiliate disclaimer:</strong>{" "}
            {siteConfig.name} is an independent review and ranking site. We are{" "}
            <strong className="text-text">not affiliated with, endorsed by, sponsored by, or associated with</strong>{" "}
            any of the sweepstakes operators listed on the site, including but not
            limited to Crown Coins, Pulsz, WOW Vegas, ReBet, Modo, Zula, Fortune
            Coins, or any other brand referenced. All operator names, logos, and
            trademarks belong to their respective owners and are used for
            identification purposes only.
          </p>

          <p>
            {siteConfig.name} participates in affiliate / referral programs offered
            by some of the operators we cover. When you click an outbound link or
            sign up through one of our buttons, we may receive a commission or
            referral credit at no additional cost to you. These commissions help
            fund the site but{" "}
            <strong className="text-text">do not influence editorial rankings</strong>{" "}
           , sites are scored on bonus value, redemption speed, game library, and
            operator trust.
          </p>

          <p>
            <strong className="text-text">Strategy content is informational, not a guarantee.</strong>{" "}
            Strategy material on this site describes general approaches to
            playthrough, promo evaluation, and expected-value math on sweepstakes
            platforms. Outcomes depend on slot RTP, variance, individual play
            decisions, operator promotions, and account-level factors that change
            frequently. {siteConfig.name} makes no guarantee of profit or specific
            redemption amount, and you can lose your purchase value playing
            high-volatility games.
          </p>

          <p>
            Sweepstakes casino availability, welcome offers, package values, VIP
            structures, and game catalogs change frequently. Always verify current
            terms on the operator&apos;s own website before purchasing or playing.
            Operators may restrict access by state, check eligibility for your
            jurisdiction in each operator&apos;s terms.
          </p>

          <p>
            <strong className="text-text">21+ and responsible play.</strong>{" "}
            Sweepstakes social casinos involve real money purchases and prize
            redemptions. You must be of legal age to participate (typically 21+ in
            applicable US jurisdictions). Set a budget, take breaks, and never chase
            losses. If gambling stops being fun, please call{" "}
            <a className="underline underline-offset-4 hover:text-text" href="tel:1-800-522-4700">
              1-800-GAMBLER
            </a>{" "}
            for free, confidential help, available 24/7.
          </p>
        </section>
      </div>
    </main>
  );
}
