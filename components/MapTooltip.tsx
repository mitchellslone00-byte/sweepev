"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type Info = { name: string; status: string; note: string };

const DOT: Record<string, string> = {
  Available: "#34d399",
  "Gray area": "#fbbf24",
  Banned: "#f87171",
};

export function MapTooltip({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [info, setInfo] = useState<Info | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = (e.target as HTMLElement).closest("[data-code]") as HTMLElement | null;
    if (el) {
      setInfo({
        name: el.dataset.name ?? "",
        status: el.dataset.status ?? "",
        note: el.dataset.note ?? "",
      });
      setPos({ x: e.clientX, y: e.clientY });
    } else {
      setInfo(null);
    }
  }, []);

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-slug]") as HTMLElement | null;
      const slug = el?.dataset.slug;
      if (slug) router.push(`/states/${slug}`);
    },
    [router]
  );

  return (
    <div className="relative" onMouseMove={onMove} onMouseLeave={() => setInfo(null)} onClick={onClick}>
      {children}
      {info && (
        <div
          className="pointer-events-none fixed z-50 w-max max-w-[220px] rounded-lg border border-border bg-panel2 px-3 py-2 shadow-xl"
          style={{ left: Math.min(pos.x + 14, typeof window !== "undefined" ? window.innerWidth - 232 : pos.x + 14), top: pos.y + 14 }}
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-text">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: DOT[info.status] ?? "#9ca3af" }}
            />
            {info.name}
          </div>
          {info.status && (
            <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
              {info.status}
            </div>
          )}
          {info.note && <p className="mt-1 text-[11px] leading-snug text-muted">{info.note}</p>}
        </div>
      )}
    </div>
  );
}
