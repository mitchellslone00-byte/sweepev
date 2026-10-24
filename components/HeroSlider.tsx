"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type Slide = {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
};

const INTERVAL_MS = 4000;

/**
 * Rotating promo strip under the hero CTAs. Deliberately sits below the h1
 * rather than replacing it: the heading carries the page's ranking intent and
 * should not change under the reader, or between crawls.
 *
 * Slides are stacked in a single grid cell so the container is always as tall as
 * the tallest one and nothing shifts as it rotates. Every slide stays in the DOM
 * and linked, so all of them are crawlable even though one is visible.
 */
export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    // Holding still while hovered or focused keeps a slide readable, and no
    // auto-advance at all for anyone who asked for reduced motion.
    if (paused || reduced.current || slides.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL_MS);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  if (!slides.length) return null;

  return (
    <div
      className="mx-auto mt-7 max-w-2xl sm:mt-9"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="grid rounded-2xl border border-border bg-panel/80 p-4 text-left backdrop-blur sm:p-5">
        {slides.map((s, i) => (
          <div
            key={s.href}
            // Every slide occupies the same grid cell, so height is stable.
            style={{ gridArea: "1 / 1" }}
            aria-hidden={i !== index}
            className={`transition-opacity duration-500 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
              {s.eyebrow}
            </span>
            <p className="mt-1.5 text-lg font-bold text-text sm:text-xl">{s.title}</p>
            <p className="mt-1.5 text-sm text-muted leading-relaxed">{s.body}</p>
            <Link
              href={s.href}
              tabIndex={i === index ? 0 : -1}
              className="mt-3 inline-block text-sm font-semibold text-accent underline decoration-dotted underline-offset-4 hover:text-accent2"
            >
              {s.cta} →
            </Link>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.href}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show: ${s.title}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-accent" : "w-1.5 bg-border hover:bg-muted"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
