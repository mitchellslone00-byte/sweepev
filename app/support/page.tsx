import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { ogMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Support",
  description: `Contact ${siteConfig.name} for support, feedback, or business inquiries.`,
  alternates: { canonical: `${siteConfig.url}/support` },
  ...ogMeta(
    "/support",
    "Support",
    `Contact ${siteConfig.name} for support, feedback, or business inquiries.`
  ),
};

export default function SupportPage() {
  const email = "support@sweepev.com";

  return (
    <main className="min-h-screen bg-transparent px-6 py-16 text-text">
      <div className="mx-auto w-full max-w-3xl">
        {/* Centered glow logo (clickable home) */}
        <div className="flex justify-center">
          <Link href="/" className="group inline-flex items-center">
            <span className="relative transition-all duration-300">
              {/* ambient halo */}
              <span
                aria-hidden
                className="
                  absolute -inset-3 -z-10 rounded-3xl
                  bg-accent/20 blur-lg
                  transition-all duration-300
                  group-hover:bg-accent/40
                  group-hover:blur-xl
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

        <h1 className="mt-8 text-center text-3xl md:text-4xl font-black">
          Support
        </h1>
        <p className="mt-2 text-center text-muted">
          Questions, feedback, or business inquiries, we&apos;re happy to help.
        </p>

        {/* Contact card */}
        <div className="mt-10 rounded-2xl border border-border bg-panel p-6">
          <p className="text-text">
            Email:{" "}
            <a
              className="text-text underline underline-offset-4 hover:text-accent"
              href={`mailto:${email}`}
            >
              {email}
            </a>
          </p>

          <p className="mt-3 text-sm text-muted">
            We usually respond within 1–3 business days.
          </p>
        </div>

        {/* Contact form */}
        <form
          action={`https://formsubmit.co/${email}`}
          method="POST"
          className="mt-6 rounded-2xl border border-border bg-panel p-6 space-y-4"
        >
          <h2 className="text-lg font-bold text-text">Send us a message</h2>
          <p className="text-sm text-muted">
            Drop your email and what you&apos;re reaching out about. Goes
            straight to {email}.
          </p>

          {/* FormSubmit configuration */}
          <input type="hidden" name="_subject" value="New SweepEV contact form message" />
          <input type="hidden" name="_template" value="box" />
          <input type="hidden" name="_captcha" value="true" />
          <input type="hidden" name="_next" value={`${siteConfig.url}/support/sent`} />
          {/* Honeypot to silently filter bots */}
          <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

          <div>
            <label htmlFor="contact-email" className="block text-xs uppercase tracking-widest text-muted font-semibold mb-1">
              Your email
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-border bg-panel2 px-3 py-2 text-sm text-text outline-none focus:border-accent transition-colors"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-xs uppercase tracking-widest text-muted font-semibold mb-1">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              placeholder="What's up?"
              className="w-full rounded-lg border border-border bg-panel2 px-3 py-2 text-sm text-text outline-none focus:border-accent transition-colors resize-y"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto rounded-lg bg-accent text-bg font-bold px-5 py-2.5 text-sm hover:opacity-90 transition-opacity"
          >
            Send message
          </button>
        </form>

        {/* Responsible play note */}
        <div className="mt-6 rounded-2xl border border-border bg-panel/60 p-6 text-sm text-muted">
          <p>
            Need help with a gambling problem? This isn&apos;t {siteConfig.name} support, call{" "}
            <a className="underline underline-offset-4 hover:text-text" href="tel:1-800-522-4700">
              1-800-GAMBLER
            </a>{" "}
            for free, confidential help, 24/7.
          </p>
        </div>
      </div>
    </main>
  );
}
