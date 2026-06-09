import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Terms of Service | ${siteConfig.name}`,
  description: `${siteConfig.name} Terms of Service: rules, disclaimers, and limitations of liability for the rankings, reviews, and strategy content.`,
  alternates: { canonical: `${siteConfig.url}/terms` },
};

export default function TermsPage() {
  const lastUpdated = "May 4, 2026";

  return (
    <main className="min-h-screen bg-transparent text-text px-6 py-16">
      <div className="mx-auto max-w-3xl">
        {/* Centered glow logo */}
        <div className="flex justify-center mb-10">
          <Link href="/" className="inline-flex items-center group">
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

        <h1 className="text-4xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="mt-3 text-sm text-muted">Last updated: {lastUpdated}</p>

        <section className="mt-10 space-y-4 text-muted leading-relaxed">
          <p>
            Welcome to <span className="font-semibold text-text">{siteConfig.name}</span>.
            By accessing or using this website, you agree to these Terms. If you do
            not agree, do not use the site.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-text">1) What {siteConfig.name} is</h2>
          <p>
            {siteConfig.name} is an independent review and comparison site for US
            sweepstakes social casinos. We publish editorial rankings, operator
            reviews, welcome offer breakdowns, and general strategy content. All
            content is informational and does not constitute financial, legal,
            or gambling advice.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-text">2) Affiliate disclosure</h2>
          <p>
            We participate in referral / affiliate programs offered by some of the
            operators we cover. When you click outbound buttons or sign up through
            our links, we may receive a commission or referral credit at no
            additional cost to you. Commissions help fund the site but do not
            change editorial rankings, sites are scored on bonus value, redemption
            speed, game library, and operator trust.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-text">3) No warranties</h2>
          <p>
            The site is provided as is. We make no warranties of any kind, express
            or implied, including accuracy, reliability, completeness, or fitness
            for a particular purpose. Welcome offers, package values, VIP structures,
            game catalogs, and state availability change frequently, always verify
            current terms on the operator&apos;s own website before purchasing or playing.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-text">4) Strategy content is not a guarantee</h2>
          <p>
            Strategy content on the site describes general approaches to
            playthrough, expected-value math, and promo evaluation. Real results
            depend on slot RTP, variance, your play decisions, operator
            promotions, and other factors that vary by account and over time.
            {" "}{siteConfig.name} makes no guarantee of profit, redemption
            amount, or specific outcome, and you can lose your purchase value
            playing high-volatility games.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-text">5) Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, {siteConfig.name} and its
            operators will not be liable for any indirect, incidental, consequential,
            special, or punitive damages, or any loss of money, data, revenue, or
            profits arising from your use of the site, including any decisions you
            make about purchasing, playing, or redeeming on third-party sweepstakes
            platforms.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-text">6) Eligibility &amp; responsible play</h2>
          <p>
            You must be of legal age (typically 21+ in applicable US jurisdictions)
            to participate in sweepstakes social casinos. Operator availability
            varies by state, check each operator&apos;s eligibility rules for
            your jurisdiction. Set a budget, take breaks, and never chase losses.
            If gambling stops being fun, call{" "}
            <a className="underline underline-offset-4 hover:text-text" href="tel:1-800-522-4700">
              1-800-GAMBLER
            </a>{" "}
            for free, confidential help, 24/7.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-text">7) User conduct</h2>
          <p>
            You agree not to misuse the site, attempt to disrupt it, scrape it
            excessively, reverse engineer it, or use it for unlawful purposes.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-text">8) Intellectual property</h2>
          <p>
            Site code, branding, and original written content are owned by{" "}
            {siteConfig.name} or licensed to it. Operator names, logos, and
            trademarks belong to their respective owners and are used for
            identification only.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-text">9) Third-party links</h2>
          <p>
            The site includes outbound links to third-party operators and other
            websites. We are not responsible for third-party content, products,
            services, terms, or privacy practices, and you use them at your own
            risk under the third party&apos;s own terms.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-text">10) Changes</h2>
          <p>
            We may update these Terms at any time. Continued use of the site means
            you accept the updated Terms.
          </p>

          <h2 className="mt-8 text-xl font-semibold text-text">11) Contact</h2>
          <p>
            Questions? Email{" "}
            <a className="underline underline-offset-4 hover:text-text" href="mailto:support@sweepev.com">
              support@sweepev.com
            </a>{" "}
            or visit the{" "}
            <Link href="/support" className="underline underline-offset-4 hover:text-text">
              Support page
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
