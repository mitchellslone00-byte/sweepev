import Link from "next/link";
import { NavDropdown } from "@/components/NavDropdown";
import { MobileMenu } from "@/components/MobileMenu";
import { DiscordBanner } from "@/components/DiscordBanner";
import { CARD_RIPS, DAILY_SC, GUIDES, RANKINGS, STANDALONE } from "@/lib/nav";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/80 backdrop-blur">
      <DiscordBanner />
      <div className="container-x flex h-14 items-center justify-between gap-2 sm:h-16">
        {/* Doubles as the Home link, so the nav does not repeat it. */}
        <Link href="/" className="flex shrink-0 items-center gap-2 text-base font-bold sm:text-lg">
          <span className="grid h-7 w-7 place-items-center rounded bg-accent text-sm font-black text-bg">
            EV
          </span>
          <span>
            Sweep<span className="text-accent">EV</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 text-sm text-muted md:flex lg:gap-6">
          <Link href={CARD_RIPS.href} className="transition-colors hover:text-accent">
            {CARD_RIPS.label}
          </Link>

          <Link href={DAILY_SC.href} className="transition-colors hover:text-accent">
            {DAILY_SC.label}
          </Link>

          <NavDropdown label="Rankings" items={RANKINGS} />

          <NavDropdown label="Guides" items={GUIDES} />

          {STANDALONE.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-accent">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile nav */}
        <MobileMenu />
      </div>
    </header>
  );
}
