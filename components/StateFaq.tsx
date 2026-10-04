export type StateFaqItem = { q: string; a: string };

/**
 * FAQ block for the hand-written state pages.
 *
 * It emits the FAQPage structured data and renders the same questions on the
 * page, from one array. These pages previously declared FAQ markup with no
 * visible FAQ anywhere, which Google treats as a structured-data policy
 * violation: marked-up content has to be visible to the reader. Keeping both
 * outputs in one component means the schema and the page cannot drift apart
 * again.
 */
export function StateFaq({
  faqs,
  heading,
}: {
  faqs: StateFaqItem[];
  heading: string;
}) {
  if (!faqs.length) return null;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="mt-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <h2 className="text-2xl font-bold">{heading}</h2>
      <div className="mt-4 space-y-2">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-xl border border-border bg-panel p-4">
            <summary className="cursor-pointer list-none font-semibold text-text">
              <span className="text-accent">▸ </span>
              {f.q}
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
