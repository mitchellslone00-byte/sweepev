"use client";

import { track } from "@vercel/analytics";
import type { ReactNode } from "react";

interface AffiliateLinkProps {
  slug: string;
  name: string;
  source: string;
  className?: string;
  children: ReactNode;
}

/**
 * Wraps the affiliate `<a href="/go/<slug>">` so we can fire a Vercel Analytics
 * event before the browser hands off to /go which 302-redirects to the
 * operator. Use one source string per UI surface so we can later split
 * conversions by where the user clicked from (e.g. "rankings_card",
 * "featured_top_pick", "site_review_cta").
 */
export function AffiliateLink({
  slug,
  name,
  source,
  className,
  children,
}: AffiliateLinkProps) {
  return (
    <a
      href={`/go/${slug}`}
      target="_blank"
      rel="nofollow sponsored noopener"
      className={className}
      onClick={() => {
        try {
          track("claim_bonus", { slug, name, source });
        } catch {
          // Analytics is non-essential. Never block the click on tracking failures.
        }
      }}
    >
      {children}
    </a>
  );
}
