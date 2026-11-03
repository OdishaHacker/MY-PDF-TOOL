import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft, Hash, CheckCircle, AlertTriangle, Lightbulb, ListOrdered,
  BookOpen, ShieldCheck, Zap, ArrowRight, Table as TableIcon, HelpCircle,
  Clock, User, FileText, AlignCenter
} from "lucide-react";

export const metadata: Metadata = {
  title: "How to Add Page Numbers to PDF Files (Bates & Custom Formats) — mypdftools",
  description: "Learn how to insert clean page numbers, Roman numerals, and legal Bates numbering into PDF documents. Customize start pages, positions, fonts, and prefixes.",
  keywords: ["add page numbers to PDF", "PDF page numbering guide", "Bates numbering PDF", "Roman numeral page numbers PDF", "number PDF pages free online", "mypdftools"],
  alternates: { canonical: "https://mypdftools.in/blog/pdf-page-numbers/" },
};

export default function PdfPageNumbers() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "How to Add Page Numbers to PDF Files (Bates & Custom Formats)",
    description: "Learn how to insert clean page numbers, Roman numerals, and legal Bates numbering into PDF documents with custom start pages.",
    url: "https://mypdftools.in/blog/pdf-page-numbers/",
    datePublished: "2026-08-12T08:00:00Z",
    dateModified: "2026-11-02T09:00:00Z",
    author: {
      "@type": "Person",
      name: "mypdftools Team",
      jobTitle: "mypdftools Editorial Team"
    },
    publisher: {
      "@type": "Organization",
      name: "mypdftools",
      url: "https://mypdftools.in"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can I skip numbering on the cover page and table of contents?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can specify a custom 'Start Numbering From Page' offset (e.g. start on page 3) so that your title sheet and executive summary remain unnumbered."
        }
      },
      {
        "@type": "Question",
        name: "What is Bates numbering used for in legal proceedings?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bates numbering adds sequential alphanumeric identifiers (e.g. DEF-000142) across thousands of discovery documents so attorneys and judges can reference specific pages precisely during trials."
        }
      },
      {
        "@type": "Question",
        name: "Will adding page numbers overwrite existing text at the bottom of the page?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our tool lets you customize margin offsets (in points/millimeters) and choose between top-right, bottom-center, or bottom-right placement to prevent overlapping existing footnotes."
        }
      }
    ]
  };

  return (
    <div className="bg-background min-h-screen pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Knowledge Hub
          </Link>

          <header className="mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#AF7AC5]/10 text-[#AF7AC5] mb-4">
              <Hash className="h-3.5 w-3.5" /> Document Formatting
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight mb-4">
              How to Add Page Numbers to PDF Files: Formats, Positions &amp; Bates Stamping
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground border-y py-3">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-primary" /> mypdftools Team
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> 7 min read
              </span>
              <span>•</span>
              <span>Updated November 2026</span>
            </div>
          </header>
          <figure className="my-10">
            <img src="/blog-images/pdf-page-numbers-hero.svg" alt="Add Page Numbers to PDF — Position, Font & Format" width={1200} height={630} className="w-full h-auto rounded-2xl border" />
            <figcaption className="text-xs text-muted-foreground mt-2 text-center">Add Page Numbers to PDF — Position, Font & Format — mypdftools Knowledge Hub</figcaption>
          </figure>

          <div className="prose-custom space-y-6 text-base leading-relaxed text-muted-foreground">
            <p className="text-lg font-medium text-foreground leading-relaxed">
              When reviewing a 100-page dissertation or presenting an evidence packet in court, telling colleagues to &quot;scroll down about halfway to the chart&quot; is frustrating and inefficient. Clear, consistent page numbers make documents easy to navigate and professional to cite.
            </p>

            <p>
              Adding page numbers to an existing PDF involves injecting dynamic text objects into the page stream at precise footer or header coordinates. In this guide, we explore page numbering conventions, custom offset rules (skipping cover pages), Bates stamping for legal compliance, and step-by-step numbering on mypdftools.in.
            </p>

            {/* Table of Contents */}
            <div className="bg-muted/40 border rounded-2xl p-6 my-8">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-3">
                <ListOrdered className="h-5 w-5 text-primary" /> Table of Contents
              </h3>
              <ul className="space-y-2 text-sm list-none p-0 m-0">
                <li><a href="#numbering-formats" className="text-primary hover:underline">1. Numbering Formats: Standard, &apos;Page X of Y&apos;, &amp; Roman</a></li>
                <li><a href="#bates-stamping" className="text-primary hover:underline">2. What is Bates Numbering in Legal Practice?</a></li>
                <li><a href="#step-by-step" className="text-primary hover:underline">3. Step-by-Step Guide to Numbering PDFs</a></li>
                <li><a href="#custom-offsets" className="text-primary hover:underline">4. Skipping Cover Pages &amp; Setting Starting Offsets</a></li>
                <li><a href="#mistakes" className="text-primary hover:underline">5. Placement and Typography for Professional Numbering</a></li>
                <li><a href="#pro-tips" className="text-primary hover:underline">6. Troubleshooting Overlapping or Missing Numbers</a></li>
                <li><a href="#faq" className="text-primary hover:underline">7. Frequently Asked Questions</a></li>
              </ul>
            </div>

          <figure className="my-10">
            <img src="/blog-images/diagram-workflow-3steps.svg" alt="The simple three-step mypdftools workflow — select, customize, download" width={1200} height={630} className="w-full h-auto rounded-2xl border" />
            <figcaption className="text-xs text-muted-foreground mt-2 text-center">The simple three-step mypdftools workflow — select, customize, download</figcaption>
          </figure>


            <h2 id="numbering-formats" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <Hash className="h-5 w-5 text-primary" /> 1. Numbering Formats: Standard, &apos;Page X of Y&apos;, &amp; Roman
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
              <div className="p-4 rounded-xl border bg-card">
                <h4 className="font-semibold text-sm text-foreground mb-1">Single Number (1, 2, 3)</h4>
                <p className="text-xs text-muted-foreground">Minimalist style. Best for novels, clean reading reports, and single-author articles.</p>
              </div>
              <div className="p-4 rounded-xl border bg-card">
                <h4 className="font-semibold text-sm text-foreground mb-1">&quot;Page X of Y&quot; Format</h4>
                <p className="text-xs text-muted-foreground">Provides total page context (e.g. <em>Page 4 of 24</em>). Essential for contracts to prove no pages were detached or lost.</p>
              </div>
              <div className="p-4 rounded-xl border bg-card">
                <h4 className="font-semibold text-sm text-foreground mb-1">Roman Numerals (i, ii, iii)</h4>
                <p className="text-xs text-muted-foreground">Traditional academic format for prefaces, acknowledgments, and tables of contents.</p>
              </div>
            </div>

            <h2 id="bates-stamping" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" /> 2. What is Bates Numbering in Legal Practice?
            </h2>
            <p>
              Invented by Edwin G. Bates in the late 19th century, Bates numbering applies sequential alphanumeric prefix labels across multi-box evidentiary documents (e.g. <code>PLAINTIFF-000452</code>).
            </p>
            <p>
              In modern electronic discovery (e-Discovery), our tool enables law firms to define a custom prefix, zero-padded digit count (e.g. 6 digits), and starting integer, stamping every page in seconds without manual intervention.
            </p>

            <h2 id="step-by-step" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" /> 3. Step-by-Step Guide to Numbering PDFs
            </h2>

            <div className="space-y-4 my-6">
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground">Step 1</span>
                <h4 className="font-semibold text-foreground">Open Page Numbers Tool</h4>
                <p className="text-sm">Navigate to our <Link href="/page-numbers" className="text-primary underline">Page Numbers Tool</Link> and upload your PDF.</p>
              </div>

              <div className="p-4 rounded-xl border bg-card space-y-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground">Step 2</span>
                <h4 className="font-semibold text-foreground">Select Position, Format &amp; Start Page</h4>
                <p className="text-sm">Choose placement (Bottom Center, Bottom Right, Top Right), font size, number format, and the start page offset.</p>
              </div>

              <div className="p-4 rounded-xl border bg-card space-y-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground">Step 3</span>
                <h4 className="font-semibold text-foreground">Execute &amp; Download</h4>
                <p className="text-sm">Click Apply Numbers. Page numbers are dynamically stamped into the PDF stream in memory. Download immediately.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 my-8 text-center space-y-3">
              <h3 className="font-bold text-foreground text-lg">Add page numbers to your PDF right now</h3>
              <p className="text-sm text-muted-foreground">100% free, private client-side page numbering. No registration or limits.</p>
              <Link
                href="/page-numbers"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm"
              >
                Open Free Page Numbers Tool <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <h2 id="custom-offsets" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <AlignCenter className="h-5 w-5 text-primary" /> 4. Skipping Cover Pages &amp; Setting Starting Offsets
            </h2>
            <p>
              To skip your title sheet and table of contents:
            </p>
            <ul className="space-y-2 list-disc pl-6">
              <li>Set <strong>Start Numbering From Page</strong> to <code>3</code>.</li>
              <li>Set <strong>Initial Number Value</strong> to <code>1</code>.</li>
              <li>This ensures pages 1 and 2 remain clean and unnumbered, while page 3 displays as &quot;Page 1.&quot;</li>
            </ul>

            <h2 id="mistakes" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" /> 5. Placement and Typography for Professional Numbering
            </h2>
            <p>
              Number placement is a small decision that changes how finished documents feel. Bottom-center is the classic choice for reports, manuscripts, and academic work; bottom-right suits business documents where stapling or binding on the left edge is expected; top-right is traditional for legal filings. Whichever you pick, consistency matters more than the specific position — a document where numbers jump from corner to corner looks unfinished.
            </p>

            <p>
              Typography deserves the same care. Match the numbering font to your document's body font at a size two to three points smaller, in a grey or black tone rather than bright color. Numbers that shout distract from content; numbers that whisper guide the reader. Keep at least half an inch of clearance from the page edge so nothing is lost when printing on equipment with narrow margins.
            </p>

            <h2 id="pro-tips" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" /> 6. Troubleshooting Overlapping or Missing Numbers
            </h2>
            <p>
              When stamped numbers collide with existing content, the fix is usually positional rather than aesthetic. Footers that already contain document titles or dates leave little free space — try bottom-center at a slightly higher offset, or move to top-right where headers tend to be emptier. If a number lands on top of text, increasing the vertical offset by 10–20 points typically clears the collision without pushing the number off the page.
            </p>

            <p>
              Missing numbers have two usual causes: an offset set higher than the page count, which makes the stamper start beyond the final page, or a starting number typed with extra characters. If page one seems to have no number when its neighbors do, check whether a cover page is being skipped by an offset setting — that is normally intended behavior. Previewing the first, middle, and last page before downloading catches every one of these in seconds.
            </p>

            <h2 id="faq" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" /> 7. Frequently Asked Questions
            </h2>
            <div className="space-y-4 my-6">
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <h4 className="font-semibold text-sm text-foreground">Can I skip numbering on the cover page and table of contents?</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">Yes. You can specify a custom &apos;Start Numbering From Page&apos; offset (e.g. start on page 3) so that your title sheet and executive summary remain unnumbered.</p>
              </div>
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <h4 className="font-semibold text-sm text-foreground">What is Bates numbering used for in legal proceedings?</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">Bates numbering adds sequential alphanumeric identifiers (e.g. DEF-000142) across thousands of discovery documents so attorneys and judges can reference specific pages precisely during trials.</p>
              </div>
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <h4 className="font-semibold text-sm text-foreground">Will adding page numbers overwrite existing text at the bottom of the page?</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">Our tool lets you customize margin offsets (in points/millimeters) and choose between top-right, bottom-center, or bottom-right placement to prevent overlapping existing footnotes.</p>
              </div>
            </div>

            {/* Author Bio Box */}
            <div className="border-t pt-8 mt-12">
              <div className="p-6 rounded-2xl bg-muted/40 border flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-pink-500/20 text-pink-600 flex items-center justify-center font-bold text-lg shrink-0">
                  MT
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-foreground text-sm">mypdftools Team</h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">Editorial Team</span>
                  </div>
                  <p className="text-xs text-muted-foreground">The mypdftools team researches, writes, and reviews every guide on this site. We test each workflow in real browsers before publishing, and we update articles regularly as PDF tools and standards evolve. Questions or corrections are always welcome at support@mypdftools.in.</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
