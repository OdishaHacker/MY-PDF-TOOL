import Link from 'next/link';

interface FAQItem {
  q: string;
  a: string;
}

interface ToolSeoContentProps {
  title: string;
  description: string;
  howTo: string[];
  features: string[];
  faqs: FAQItem[];
  relatedTools: { name: string; href: string }[];
}

export default function ToolSeoContent({ title, description, howTo, features, faqs, relatedTools }: ToolSeoContentProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 space-y-10 text-sm leading-relaxed text-muted-foreground">
      {/* Structured Data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* About This Tool */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-3">{title}</h2>
        <p>{description}</p>
      </div>

      {/* How to Use */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">How to Use</h2>
        <ol className="list-decimal list-inside space-y-2">
          {howTo.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>

      {/* Key Features */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Key Features</h2>
        <ul className="grid sm:grid-cols-2 gap-2">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-emerald-500 mt-0.5">✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group border rounded-lg p-3">
              <summary className="font-medium text-foreground cursor-pointer">{faq.q}</summary>
              <p className="mt-2">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Related Tools */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Related Tools</h2>
        <div className="flex flex-wrap gap-2">
          {relatedTools.map(tool => (
            <Link
              key={tool.href}
              href={tool.href}
              className="px-3 py-1.5 rounded-full border text-xs font-medium hover:bg-accent transition-colors"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Trust Signal */}
      <div className="border-t pt-6 text-center text-xs text-muted-foreground/70">
        <p>All processing happens entirely in your browser. Your files are never uploaded to any server. mypdftools is 100% free, private, and secure.</p>
      </div>
    </section>
  );
}
