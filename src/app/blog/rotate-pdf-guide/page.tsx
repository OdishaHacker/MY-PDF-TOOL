import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft, RotateCw, CheckCircle, AlertTriangle, Lightbulb, ListOrdered,
  BookOpen, ShieldCheck, Zap, ArrowRight, Table as TableIcon, HelpCircle,
  Clock, User, RefreshCw, Compass
} from "lucide-react";

export const metadata: Metadata = {
  title: "How to Rotate PDF Pages Permanently (90°, 180°, 270°) — mypdftools",
  description: "Learn how to permanently rotate upside down or sideways PDF pages. Fix scanner orientation errors and save rotated documents without quality loss.",
  keywords: ["rotate PDF guide", "rotate PDF pages permanently", "fix upside down PDF", "rotate landscape PDF to portrait", "free PDF rotator", "mypdftools rotation"],
  alternates: { canonical: "https://mypdftools.in/blog/rotate-pdf-guide/" },
};

export default function RotatePdfGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "How to Rotate PDF Pages Permanently (90°, 180°, 270°)",
    description: "Learn how to permanently rotate upside down or sideways PDF pages and fix scanner orientation errors.",
    url: "https://mypdftools.in/blog/rotate-pdf-guide/",
    datePublished: "2026-08-10T08:00:00Z",
    dateModified: "2026-08-15T10:00:00Z",
    author: {
      "@type": "Person",
      name: "Marcus Vance",
      jobTitle: "Senior Document Systems Engineer"
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
        name: "Why does my PDF revert to sideways orientation when I reopen it in Adobe Reader?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Clicking 'Rotate View' in standard desktop PDF readers only alters your temporary display buffer. To make rotation permanent across all devices, the underlying /Rotate key in the PDF page dictionary must be rewritten and saved."
        }
      },
      {
        "@type": "Question",
        name: "Can I rotate only specific pages (such as a landscape table) while leaving the rest portrait?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Our visual rotation interface allows you to click individual page thumbnails to rotate single pages by 90 or 180 degrees without affecting surrounding pages."
        }
      },
      {
        "@type": "Question",
        name: "Does rotating PDF pages degrade image quality or vector text?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Rotating simply updates a mathematical transformation matrix angle in the page metadata. Zero pixels are re-encoded, ensuring 100% lossless fidelity."
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
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#2A9D8F]/10 text-[#2A9D8F] mb-4">
              <Compass className="h-3.5 w-3.5" /> Page Layout
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight mb-4">
              How to Rotate PDF Pages Permanently (90°, 180°, 270°)
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground border-y py-3">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-primary" /> Marcus Vance (Document Architect)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> 6 min read
              </span>
              <span>•</span>
              <span>Updated August 2026</span>
            </div>
          </header>

          <div className="prose-custom space-y-6 text-base leading-relaxed text-muted-foreground">
            <p className="text-lg font-medium text-foreground leading-relaxed">
              Few things look more unprofessional than submitting a job portfolio or legal contract where half the pages were scanned upside down or sideways. Forcing clients or hiring managers to tilt their heads to read your document ruins their user experience.
            </p>

            <p>
              Many users rotate a document inside their desktop PDF viewer, only to find that the changes disappear the moment the file is sent over email. In this technical guide, we explain the difference between temporary viewer rotation and permanent page dictionary rotation, and show you how to permanently orient your PDF pages in seconds.
            </p>

            {/* Table of Contents */}
            <div className="bg-muted/40 border rounded-2xl p-6 my-8">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-3">
                <ListOrdered className="h-5 w-5 text-primary" /> Table of Contents
              </h3>
              <ul className="space-y-2 text-sm list-none p-0 m-0">
                <li><a href="#temporary-vs-permanent" className="text-primary hover:underline">1. Temporary View Rotation vs. Permanent Dictionary Rotation</a></li>
                <li><a href="#common-causes" className="text-primary hover:underline">2. Why Scanners Produce Inverted Documents</a></li>
                <li><a href="#step-by-step" className="text-primary hover:underline">3. Step-by-Step Guide to Rotating PDFs</a></li>
                <li><a href="#selective-rotation" className="text-primary hover:underline">4. Managing Mixed Landscape &amp; Portrait Pages</a></li>
                <li><a href="#faq" className="text-primary hover:underline">5. Frequently Asked Questions</a></li>
              </ul>
            </div>

            <h2 id="temporary-vs-permanent" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" /> 1. Temporary View Rotation vs. Permanent Dictionary Rotation
            </h2>
            <p>
              In the ISO 32000 PDF standard, each page object contains a dedicated orientation entry: <code>/Rotate &lt;angle&gt;</code>, where angle is a multiple of 90 (0, 90, 180, 270 degrees clockwise).
            </p>
            <p>
              When you click the rotate icon in standard PDF viewers (like Chrome Viewer or Acrobat Reader), the software merely applies a temporary zoom-matrix rotation to your local computer screen. It does not rewrite the underlying <code>/Rotate</code> dictionary key on the disk file.
            </p>
            <p>
              Our <Link href="/rotate-pdf" className="text-primary underline">Rotate PDF Tool</Link> updates the actual page tree object definitions in memory, ensuring the document stays correctly oriented on every mobile phone, email client, and printer permanently.
            </p>

            <h2 id="common-causes" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" /> 2. Why Scanners Produce Inverted Documents
            </h2>
            <p>
              Orientation issues typically arise from two primary hardware scenarios:
            </p>
            <ul className="space-y-2 list-disc pl-6">
              <li><strong>Automatic Document Feeder (ADF) Inversions:</strong> Double-sided (duplex) scanners often flip reverse pages 180 degrees if the feed sensor orientation is misconfigured.</li>
              <li><strong>Mixed Spreadsheets in Word:</strong> Exporting a report with 9 portrait pages and 1 wide landscape table creates mixed orientation angles that require standardization.</li>
            </ul>

            <h2 id="step-by-step" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" /> 3. Step-by-Step Guide to Rotating PDFs
            </h2>

            <div className="space-y-4 my-6">
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground">Step 1</span>
                <h4 className="font-semibold text-foreground">Select PDF Document</h4>
                <p className="text-sm">Open our <Link href="/rotate-pdf" className="text-primary underline">Rotate PDF Tool</Link> and select your file.</p>
              </div>

              <div className="p-4 rounded-xl border bg-card space-y-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground">Step 2</span>
                <h4 className="font-semibold text-foreground">Rotate Single Pages or All Pages</h4>
                <p className="text-sm">Hover over any thumbnail to rotate that individual page 90°, or use the global &quot;Rotate All&quot; buttons at the top.</p>
              </div>

              <div className="p-4 rounded-xl border bg-card space-y-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground">Step 3</span>
                <h4 className="font-semibold text-foreground">Save &amp; Download</h4>
                <p className="text-sm">Click Save. The transformation angles are written into the PDF dictionary and downloaded immediately.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 my-8 text-center space-y-3">
              <h3 className="font-bold text-foreground text-lg">Rotate your PDF pages right now</h3>
              <p className="text-sm text-muted-foreground">100% free, permanent in-browser rotation. Lossless quality guarantee.</p>
              <Link
                href="/rotate-pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm"
              >
                Open Free Rotate PDF Tool <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <h2 id="selective-rotation" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" /> 4. Managing Mixed Landscape &amp; Portrait Pages
            </h2>
            <p>
              When combining technical drawings with narrative text, you often want narrative pages in portrait (0°) and schematic diagrams in landscape (90°). Our visual thumbnail grid displays real-time previews for every page so you can verify each page&apos;s angle prior to exporting.
            </p>

            <h2 id="faq" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" /> 5. Frequently Asked Questions
            </h2>
            <div className="space-y-4 my-6">
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <h4 className="font-semibold text-sm text-foreground">Why does my PDF revert to sideways orientation when I reopen it in Adobe Reader?</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">Clicking &apos;Rotate View&apos; in standard desktop PDF readers only alters your temporary display buffer. To make rotation permanent across all devices, the underlying /Rotate key in the PDF page dictionary must be rewritten and saved.</p>
              </div>
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <h4 className="font-semibold text-sm text-foreground">Can I rotate only specific pages (such as a landscape table) while leaving the rest portrait?</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">Yes. Our visual rotation interface allows you to click individual page thumbnails to rotate single pages by 90 or 180 degrees without affecting surrounding pages.</p>
              </div>
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <h4 className="font-semibold text-sm text-foreground">Does rotating PDF pages degrade image quality or vector text?</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">No. Rotating simply updates a mathematical transformation matrix angle in the page metadata. Zero pixels are re-encoded, ensuring 100% lossless fidelity.</p>
              </div>
            </div>

            {/* Author Bio Box */}
            <div className="border-t pt-8 mt-12">
              <div className="p-6 rounded-2xl bg-muted/40 border flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-teal-500/20 text-teal-600 flex items-center justify-center font-bold text-lg shrink-0">
                  MV
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-foreground text-sm">Marcus Vance</h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">Verified Author</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Senior Document Systems Engineer with deep expertise in PDF coordinate transforms, page tree dictionaries, and raster scan post-processing.</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
