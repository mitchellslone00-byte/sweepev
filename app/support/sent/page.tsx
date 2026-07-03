import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Message sent",
  description: `Your message was sent to ${siteConfig.name} support.`,
  robots: { index: false, follow: false },
};

export default function SupportSentPage() {
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
          Message sent
        </h1>
        <p className="mt-2 text-center text-muted">
          Thanks for reaching out. We usually respond within 1–3 business days.
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            href="/"
            className="rounded-lg bg-accent text-bg font-semibold px-5 py-2.5 text-sm hover:opacity-90"
          >
            Back to rankings
          </Link>
        </div>
      </div>
    </main>
  );
}
