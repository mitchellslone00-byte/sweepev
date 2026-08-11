import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { GuidesDropdown } from "@/components/GuidesDropdown";
import { MobileMenu } from "@/components/MobileMenu";
import { DiscordBanner } from "@/components/DiscordBanner";

export function Header() {
  return (
    <header className="border-b border-border bg-bg/80 backdrop-blur sticky top-0 z-30">
      <DiscordBanner />
      <div className="container-x flex h-14 sm:h-16 items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2 font-bold text-base sm:text-lg shrink-0">
          <span className="inline-block h-7 w-7 rounded bg-accent text-bg grid place-items-center text-sm font-black">
            EV
          </span>
          <span>
            Sweep<span className="text-accent">EV</span>
          </span>
        </Link>
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm text-muted">
          <Link href="/" className="hover:text-text">Home</Link>

          <GuidesDropdown />

          <Link href="/daily-sc" className="hover:text-accent transition-colors">
            Free Daily SC
          </Link>

          <Link href="/fastest-payouts" className="hover:text-accent transition-colors">
            Fastest Payouts
          </Link>

          <Link href="/where-legal" className="hover:text-accent transition-colors">
            Where Legal
          </Link>

          <Link href="/tools/ev-calculator" className="hover:text-accent transition-colors">
            Calculate EV
          </Link>

          <a
            href="https://discord.gg/A62yrjBPZN"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text"
          >
            Discord
          </a>
        </nav>

        {/* Mobile nav */}
        <MobileMenu />
      </div>
    </header>
  );
}
