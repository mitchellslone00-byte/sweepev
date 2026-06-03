import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-panel">
      <div className="container-x py-10 text-sm text-muted space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="text-text font-semibold mb-2">{siteConfig.name}</div>
            <p>{siteConfig.description}</p>
          </div>
          <div>
            <div className="text-text font-semibold mb-2">Site</div>
            <ul className="space-y-1">
              <li><Link href="/">Top Sweepstakes sites</Link></li>
              <li><Link href="/#faq">FAQ</Link></li>
              <li><Link href="/support">Support</Link></li>
              <li><Link href="/disclaimer">Disclaimer</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-text font-semibold mb-2">Disclosure</div>
            <p>
              SweepEV may earn a commission when you sign up through our links.
              This never affects our rankings, sites are scored on bonus value,
              redemption speed, game library, and overall trustworthiness.
            </p>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col md:flex-row gap-2 justify-between">
          <div>© {new Date().getFullYear()} {siteConfig.name}. 21+. Play responsibly.</div>
          <div>
            Problem gambling? Call <a className="underline" href="tel:1-800-522-4700">1-800-GAMBLER</a>.
          </div>
        </div>
      </div>
    </footer>
  );
}
