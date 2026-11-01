import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft, ImageIcon, CheckCircle, AlertTriangle, Lightbulb, ListOrdered,
  BookOpen, ShieldCheck, Zap, ArrowRight, Table as TableIcon, HelpCircle,
  Clock, User, FileImage, Layout
} from "lucide-react";

export const metadata: Metadata = {
  title: "How to Convert JPG to PDF Online: Multi-Image Portfolio Guide (2026) — mypdftools",
  description: "Learn how to convert JPG, PNG, and WebP images into high-quality PDF documents. Master page sizing (A4, Letter), margin controls, and EXIF photo orientation fixes.",
  keywords: ["JPG to PDF guide", "convert images to PDF", "combine photos into PDF", "PNG to PDF tutorial", "make PDF portfolio", "free JPG to PDF converter"],
  alternates: { canonical: "https://mypdftools.in/blog/jpg-to-pdf-conversion/" },
};

export default function JpgToPdfConversion() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "How to Convert JPG to PDF Online: Multi-Image Portfolio Guide (2026)",
    description: "Learn how to convert JPG, PNG, and WebP images into high-quality PDF documents with customizable page sizing and margin controls.",
    url: "https://mypdftools.in/blog/jpg-to-pdf-conversion/",
    datePublished: "2026-08-06T08:00:00Z",
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
        name: "Can I combine multiple photos into a single multi-page PDF document?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can select multiple JPG, PNG, or WebP images and drag them into your desired order. Our engine merges them into a clean multi-page document instantly."
        }
      },
      {
        "@type": "Question",
        name: "Does converting JPG to PDF reduce image resolution or clarity?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The raw JPEG DCT image stream is wrapped directly into a PDF Image XObject dictionary without re-compressing the pixels, preserving 100% original quality."
        }
      },
      {
        "@type": "Question",
        name: "What page size should I select for printing (A4 vs Letter)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use A4 for Europe, Asia, and international documentation. Use US Letter (8.5 x 11 inches) for the United States, Canada, and Mexico."
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
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#5F83C6]/10 text-[#5F83C6] mb-4">
              <FileImage className="h-3.5 w-3.5" /> Media &amp; Imaging
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight mb-4">
              How to Convert JPG Images to PDF: Complete Multi-Image Guide
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
            <img src="/blog-images/jpg-to-pdf-conversion-hero.svg" alt="Convert JPG Images to PDF — Step-by-Step Tutorial" width={1200} height={630} className="w-full h-auto rounded-2xl border" />
            <figcaption className="text-xs text-muted-foreground mt-2 text-center">Convert JPG Images to PDF — Step-by-Step Tutorial — mypdftools Knowledge Hub</figcaption>
          </figure>

          <div className="prose-custom space-y-6 text-base leading-relaxed text-muted-foreground">
            <p className="text-lg font-medium text-foreground leading-relaxed">
              When applying for a visa, submitting university assignments, or filing insurance claims, submitting a folder full of 20 separate JPEG image files is almost guaranteed to be rejected. Professional workflows demand a single, polished PDF document.
            </p>

            <p>
              Converting raster images into PDF is not just about changing the file extension. It involves calculating aspect ratios, managing print bleed margins, standardizing page dimensions (A4, US Letter), and embedding color spaces. In this guide, we show you how to assemble pristine multi-page image PDFs in your browser without quality degradation.
            </p>

            {/* Table of Contents */}
            <div className="bg-muted/40 border rounded-2xl p-6 my-8">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-3">
                <ListOrdered className="h-5 w-5 text-primary" /> Table of Contents
              </h3>
              <ul className="space-y-2 text-sm list-none p-0 m-0">
                <li><a href="#how-it-works" className="text-primary hover:underline">1. How Images are Embedded Inside PDF Objects</a></li>
                <li><a href="#page-layout" className="text-primary hover:underline">2. Choosing the Right Page Sizing &amp; Margins</a></li>
                <li><a href="#step-by-step" className="text-primary hover:underline">3. Step-by-Step Multi-Image Conversion Guide</a></li>
                <li><a href="#exif-rotation" className="text-primary hover:underline">4. Handling Smartphone EXIF Orientation Metadata</a></li>
                <li><a href="#use-cases" className="text-primary hover:underline">5. Best Practices for Receipts, IDs, and Portfolios</a></li>
                <li><a href="#faq" className="text-primary hover:underline">6. Frequently Asked Questions</a></li>
              </ul>
            </div>

          <figure className="my-10">
            <img src="/blog-images/diagram-conversion-map.svg" alt="Images and documents convert both ways in the mypdftools suite" width={1200} height={630} className="w-full h-auto rounded-2xl border" />
            <figcaption className="text-xs text-muted-foreground mt-2 text-center">Images and documents convert both ways in the mypdftools suite</figcaption>
          </figure>


            <h2 id="how-it-works" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" /> 1. How Images are Embedded Inside PDF Objects
            </h2>
            <p>
              When an image (JPEG, PNG, WebP) is added to a PDF, the converter creates an <strong>XObject Image dictionary</strong>. The PDF specification allows native JPEG byte streams (DCTDecode) to be stored directly inside the container without uncompressing and re-encoding.
            </p>
            <p>
              This means a 2MB JPEG converted using our lossless wrapper will result in a crisp 2.01MB PDF file with zero artifact generation or color shift.
            </p>

            <h2 id="page-layout" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <Layout className="h-5 w-5 text-primary" /> 2. Choosing the Right Page Sizing &amp; Margins
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
              <div className="p-4 rounded-xl border bg-card">
                <h4 className="font-semibold text-sm text-foreground mb-1">Standard A4 / Letter</h4>
                <p className="text-xs text-muted-foreground">Centers the image on a standard sheet with clean white borders. Best for formal office printing and official document submissions.</p>
              </div>
              <div className="p-4 rounded-xl border bg-card">
                <h4 className="font-semibold text-sm text-foreground mb-1">Fit to Image (No Borders)</h4>
                <p className="text-xs text-muted-foreground">Adjusts the PDF page canvas to match the exact pixel aspect ratio of your image with zero margin. Perfect for digital art and photo albums.</p>
              </div>
              <div className="p-4 rounded-xl border bg-card">
                <h4 className="font-semibold text-sm text-foreground mb-1">Landscape vs Portrait</h4>
                <p className="text-xs text-muted-foreground">Auto-orientation detects whether each photo is horizontal or vertical, rotating individual pages to avoid awkward cropping.</p>
              </div>
            </div>

            <h2 id="step-by-step" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" /> 3. Step-by-Step Multi-Image Conversion Guide
            </h2>

            <div className="space-y-4 my-6">
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground">Step 1</span>
                <h4 className="font-semibold text-foreground">Select Images</h4>
                <p className="text-sm">Open our <Link href="/jpg-to-pdf" className="text-primary underline">JPG to PDF Converter</Link> and select all your images from your desktop or phone gallery.</p>
              </div>

              <div className="p-4 rounded-xl border bg-card space-y-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground">Step 2</span>
                <h4 className="font-semibold text-foreground">Reorder Thumbnails &amp; Set Orientation</h4>
                <p className="text-sm">Drag thumbnails into your desired reading sequence. Select page size (A4 / Letter) and margin settings.</p>
              </div>

              <div className="p-4 rounded-xl border bg-card space-y-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary text-primary-foreground">Step 3</span>
                <h4 className="font-semibold text-foreground">Compile &amp; Download</h4>
                <p className="text-sm">Click Convert. Your images are compiled into a unified PDF file in memory and downloaded instantly.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 my-8 text-center space-y-3">
              <h3 className="font-bold text-foreground text-lg">Convert your images to PDF right now</h3>
              <p className="text-sm text-muted-foreground">100% free, private browser-based image conversion. No file upload limits.</p>
              <Link
                href="/jpg-to-pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm"
              >
                Open Free JPG to PDF Tool <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <h2 id="exif-rotation" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" /> 4. Handling Smartphone EXIF Orientation Metadata
            </h2>
            <p>
              Smartphone cameras (iOS and Android) record orientation using an internal EXIF flag rather than rotating raw pixel rows. Basic converters ignore EXIF tags, resulting in sideways photos in the output PDF.
            </p>
            <p>
              Our engine reads EXIF tags (Orientation 1 through 8) automatically and applies corresponding matrix transforms so your photos always display right-side up.
            </p>

            <h2 id="faq" className="text-2xl font-bold tracking-tight text-foreground pt-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" /> 5. Frequently Asked Questions
            </h2>
            <div className="space-y-4 my-6">
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <h4 className="font-semibold text-sm text-foreground">Can I combine multiple photos into a single multi-page PDF document?</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">Yes. You can select multiple JPG, PNG, or WebP images and drag them into your desired order. Our engine merges them into a clean multi-page document instantly.</p>
              </div>
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <h4 className="font-semibold text-sm text-foreground">Does converting JPG to PDF reduce image resolution or clarity?</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">No. The raw JPEG DCT image stream is wrapped directly into a PDF Image XObject dictionary without re-compressing the pixels, preserving 100% original quality.</p>
              </div>
              <div className="p-4 rounded-xl border bg-card space-y-1">
                <h4 className="font-semibold text-sm text-foreground">What page size should I select for printing (A4 vs Letter)?</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">Use A4 for Europe, Asia, and international documentation. Use US Letter (8.5 x 11 inches) for the United States, Canada, and Mexico.</p>
              </div>
            </div>

            {/* Author Bio Box */}
            <div className="border-t pt-8 mt-12">
              <div className="p-6 rounded-2xl bg-muted/40 border flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-purple-500/20 text-purple-600 flex items-center justify-center font-bold text-lg shrink-0">
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
