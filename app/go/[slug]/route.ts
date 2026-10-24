import { NextResponse } from "next/server";
import { getSite, sites } from "@/lib/sites";
import { getRipSite, ripSites } from "@/lib/rip-sites";

export const dynamic = "force-static";

export function generateStaticParams() {
  // Card rip sites redirect through here too, so referrals track the same way.
  // Only the ones we actually hold a referral link for; the rest link direct.
  return [
    ...sites.map((s) => ({ slug: s.slug })),
    ...ripSites.filter((s) => s.affiliateUrl).map((s) => ({ slug: s.slug })),
  ];
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const target = getSite(slug)?.affiliateUrl ?? getRipSite(slug)?.affiliateUrl;
  if (!target) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const res = NextResponse.redirect(target, 302);
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "no-store");
  return res;
}
