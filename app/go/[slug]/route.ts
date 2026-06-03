import { NextResponse } from "next/server";
import { getSite, sites } from "@/lib/sites";

export const dynamic = "force-static";

export function generateStaticParams() {
  return sites.map((s) => ({ slug: s.slug }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const site = getSite(slug);
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const res = NextResponse.redirect(site.affiliateUrl, 302);
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "no-store");
  return res;
}
