import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft, Crop, CheckCircle, AlertTriangle, Lightbulb, ListOrdered,
  BookOpen, ShieldCheck, Zap, ArrowRight, Table as TableIcon, HelpCircle,
  Clock, User, Maximize2, Box
} from "lucide-react";

export const metadata: Metadata = {
  title: "How to Crop PDF Pages & Trim Margins Online (2026 Guide) — mypdftools",
  description: "Master PDF page cropping. Understand CropBox vs MediaBox geometry, remove dark scanner borders, and optimize document margins for Kindle, iPad, and printing.",
  keywords: ["crop PDF guide", "trim PDF margins", "CropBox vs MediaBox", "remove scanner black borders", "crop PDF for Kindle", "free online PDF cropper"],
  alternates: { canonical: "https://mypdftools.in/blog/crop-pdf-guide/" },
};

export default function CropPdfGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "How to Crop PDF Pages & Trim Margins Online (2026 Guide)",
    description: "Master PDF page cropping. Understand CropBox vs MediaBox geometry, remove dark scanner borders, and optimize document margins.",
    url: "https://mypdftools.in/blog/crop-pdf-guide/",
    datePublished: "2026-08-11T08:00:00Z",
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
        name: "What is the technical difference between MediaBox and CropBox in PDF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MediaBox defines the full physical page boundary. CropBox defines the visible viewport displayed on screen and sent to the printer. Cropping updates the CropBox coordinates without permanently destroying underlying content."
        }
      },
      {
        "@type": "Question",
        name: "Can I crop all pages in a document uniformly at the same time?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Our cropping tool allows you to draw a crop box on page 1 and apply the exact margin trimming dimensions across all pages in the document with one click."
        }
      },
      {
        "@type": "Question",
        name: "Does cropping PDF pages reduce file size?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Standard cropping hides margins by updating bounding coordinates. To actively reduce file size by stripping out invisible cropped pixels, run the cropped file through our Compress PDF tool."
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
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#48C9B0]/10 text-[#48C9B0] mb-4">
              <Crop className="h-3.5 w-3.5" /> Geometry &amp; Layout
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight mb-4">
              How to Crop PDF Pages: Master Margins &amp; Page Bounding Boxes
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
            <img src="/blog-images/crop-pdf-guide-hero.svg" alt="Crop PDF Pages Online — Trim Margins Precisely" width={1200} height={630} className="w-full h-auto rounded-2xl border" />
            <figcaption className="text-xs text-muted-foreground mt-2 text-center">Crop PDF Pages Online — Trim Margins Precisely — mypdftools Knowledge Hub</figcaption>
          </figure>

          <div className="prose-custom space-y-6 text-base leading-relaxed text-muted-foreground">
            <p className="text-lg font-medium text-foreground leading-relaxed">
              Whether you are reading an academic paper with two-inch wide white margins on a small Kindle screen, or trying to remove ugly black scanner borders from a batch of receipts, cropping your PDF transforms unreadable documents into clean, compact reading material.
            </p>

            <p>
              In this technical guide, we explain the mathematics of the five PDF page boundary boxes (MediaBox, CropBox, BleedBox, TrimBox, ArtBox), and show you how to crop margins with pixel-level precision directly in your browser.
            </p>

            {/* Table of Contents */}
            <div className="bg-muted/40 border rounded-2xl p-6 my-8">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-3">
                <ListOrdered className="h-5 w-5 text-primary" /> Table of Contents
              </h3>
              <ul className="space-y-2 text-sm list-none p-0 m-0">
                <li><a href="#pdf-boxes" className="text-primary hover:underline">1. Understanding the 5 PDF Page Boxes</a></li>
                <li><a href="#common-reasons" className="text-primary hover:underline">2. Practical Reasons to Crop Margins</a></li>
                <li><a href="#step-by-step" className="text-primary hover:underline">3. Step-by-Step Guide to Cropping PDFs</a></li>
                <li><a href="#ebook-optimization" className="text-primary hover:underline">4. Optimizing PDFs for E-Readers (Kindle, Kobo, iPad)</a></li>
                <li><a href="#mistakes" className="text-primary hover:underline">5. Common Cropping Mistakes That Ruin Documents</a></li>
                <li><a href="#pro-tips" className="text-primary hover:underline">6. Cropping Workflows for Repeated Tasks</a></li>
                <li><a href="#faq" className="text-primary hover:underline">7. Frequently Asked Questions</a></li>
              </ul>
            </div>

          <figure className="my-10">
            <img src="/blog-images/diagram-workflow-3steps.svg" alt="The simple three-step mypdftools workflow — select, customize, download" width={1200} height={630} className="w-full h-auto rounded-2xl border" />
            <figcaption className="text-xs text-muted-foreground mt-2 text-center">The simple three-step mypdftools workflow — select, customize, download</figcaption>
          </figure>


            <h2 id="pdf-boxes" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <Box className="h-5 w-5 text-primary" /> 1. Understanding the 5 PDF Page Boxes
            </h2>
            <p>
              The ISO 32000 specification defines five distinct rectangular coordinate boundaries for every PDF page:
            </p>
            <ul className="space-y-2 list-disc pl-6">
              <li><strong>MediaBox:</strong> The overall physical medium boundary (e.g. <code>[0 0 595.28 841.89]</code> for A4).</li>
              <li><strong>CropBox:</strong> The active display region rendered on screen and printed by standard PDF viewers.</li>
              <li><strong>BleedBox:</strong> The boundary used in commercial printing environments for physical paper trimming.</li>
              <li><strong>TrimBox:</strong> Specifies intended finished dimensions of the page after trimming.</li>
              <li><strong>ArtBox:</strong> Defines the bounding box of the meaningful editorial content.</li>
            </ul>
            <p>
              When our <Link href="/crop-pdf" className="text-primary underline">Crop PDF Tool</Link> executes, it recalculates the <code>/CropBox</code> rectangle coordinates, instantly trimming unwanted whitespace without destructive rasterization.
            </p>

            <h2 id="common-reasons" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <Maximize2 className="h-5 w-5 text-primary" /> 2. Practical Reasons to Crop Margins
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <div className="p-4 rounded-xl border bg-card">
                <h4 className="font-semibold text-sm text-foreground mb-1">Remove Scanner Bed Black Edges</h4>
                <p className="text-xs text-muted-foreground">Scanners often leave dark black shadows around the edges of small receipts or passport photos. Cropping creates a clean, professional edge.</p>
              </div>
              <div className="p-4 rounded-xl border bg-card">
                <h4 className="font-semibold text-sm text-foreground mb-1">Eliminate Header / Footer Clutter</h4>
                <p className="text-xs text-muted-foreground">Trim off repetitive page numbers or web browser print URLs before bundling documents into legal exhibits.</p>
              </div>
            </div>

            <h2 id="step-by-step" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" /> 3. Step-by-Step Guide to Cropping PDFs
            </h2>

            <div className="space-y-4 my-6">
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground">Step 1</span>
                <h4 className="font-semibold text-foreground">Open Crop Tool</h4>
                <p className="text-sm">Navigate to our <Link href="/crop-pdf" className="text-primary underline">Crop PDF Tool</Link> and select your file.</p>
              </div>

              <div className="p-4 rounded-xl border bg-card space-y-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground">Step 2</span>
                <h4 className="font-semibold text-foreground">Adjust Visual Crop Handles</h4>
                <p className="text-sm">Drag the interactive bounding handles to frame the exact content area you want to keep. Choose whether to apply to the current page or all pages.</p>
              </div>

              <div className="p-4 rounded-xl border bg-card space-y-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground">Step 3</span>
                <h4 className="font-semibold text-foreground">Execute &amp; Download</h4>
                <p className="text-sm">Click Crop PDF. The CropBox coordinates are updated in memory and your trimmed document is downloaded immediately.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 my-8 text-center space-y-3">
              <h3 className="font-bold text-foreground text-lg">Crop your PDF margins right now</h3>
              <p className="text-sm text-muted-foreground">100% free, private client-side page cropping in your browser.</p>
              <Link
                href="/crop-pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm"
              >
                Open Free Crop PDF Tool <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <h2 id="ebook-optimization" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" /> 4. Optimizing PDFs for E-Readers (Kindle &amp; Tablets)
            </h2>
            <p>
              Academic papers designed for standard 8.5x11 inch paper waste up to 40% of their area on blank outer margins. On a 6-inch or 7-inch E-Ink reader (like a Kindle Paperwhite), this shrinks font size to unreadable levels.
            </p>
            <p>
              By trimming the outer margins tightly against the text columns, your e-reader scales the actual typography to fill 100% of the screen, dramatically boosting legibility without requiring continuous manual zooming.
            </p>

            <h2 id="mistakes" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" /> 5. Common Cropping Mistakes That Ruin Documents
            </h2>
            <p>
              The most common mistake is cropping too aggressively and slicing into the content itself. Text that sits close to the edge — headers, page numbers, footnotes — disappears silently, and the loss often goes unnoticed until the document is printed or read on a different screen. Always crop in small steps and preview the result at 100% zoom before saving; if a margin looks tight, leave an extra quarter inch rather than shaving it to the pixel.
            </p>

            <p>
              The second error is cropping a document that other people will print. Your screen shows the cropped page perfectly, but a printer's unprintable border can swallow the remaining margin, and borderless printing is rarely enabled by default. For anything destined for paper, keep at least half an inch on every side. Finally, remember that cropping changes the visual page box, not the underlying content — someone with a tool can restore the hidden areas, so never rely on cropping to remove sensitive information.
            </p>

            <h2 id="pro-tips" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" /> 6. Cropping Workflows for Repeated Tasks
            </h2>
            <p>
              If you regularly process documents with identical dimensions — exam papers, presentation exports, journal offprints — set the crop once, note the numbers, and reuse them. Applying the same margin settings to every file in a series keeps page sizes uniform, which matters more than people expect: mixed page dimensions make documents look sloppy in print and cause zoom-jumps when scrolling on screen.
            </p>

            <p>
              For e-readers and phones, pair cropping with rotation in a single pass: crop the wide margins first, then set the orientation to match how the file will be held. Book scans benefit from cropping toward the text block on each page, which enlarges the effective font size on a Kindle or phone screen without any reflow. A consistent crop-and-rotate routine turns a pile of awkward scans into a library that reads comfortably everywhere.
            </p>

            <h2 id="faq" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" /> 7. Frequently Asked Questions
            </h2>
            <div className="space-y-4 my-6">
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <h4 className="font-semibold text-sm text-foreground">What is the technical difference between MediaBox and CropBox in PDF?</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">MediaBox defines the full physical page boundary. CropBox defines the visible viewport displayed on screen and sent to the printer. Cropping updates the CropBox coordinates without permanently destroying underlying content.</p>
              </div>
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <h4 className="font-semibold text-sm text-foreground">Can I crop all pages in a document uniformly at the same time?</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">Yes. Our cropping tool allows you to draw a crop box on page 1 and apply the exact margin trimming dimensions across all pages in the document with one click.</p>
              </div>
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <h4 className="font-semibold text-sm text-foreground">Does cropping PDF pages reduce file size?</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">Standard cropping hides margins by updating bounding coordinates. To actively reduce file size by stripping out invisible cropped pixels, run the cropped file through our Compress PDF tool.</p>
              </div>
            </div>

            {/* Author Bio Box */}
            <div className="border-t pt-8 mt-12">
              <div className="p-6 rounded-2xl bg-muted/40 border flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold text-lg shrink-0">
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
