import Link from "next/link";
import type { Metadata } from "next";
import {
  FileText, Clock, ArrowRight, BookOpen, Merge, Scissors, FileDown,
  FileOutput, Lock, ImageIcon, PenTool, Droplets, Shield, Sparkles,
  RotateCw, Crop, Hash, Wrench, Code, Type, LayoutList, Table, FileImage,
  CheckCircle2, User
} from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — mypdftools | PDF Tips, Guides & Tutorials",
  description: "Expert guides, tips, and tutorials on PDF tools. Learn how to merge, split, compress, convert, sign, and secure your PDF files with our comprehensive blog.",
  keywords: ["PDF blog", "PDF tips", "PDF tutorials", "merge PDF guide", "split PDF", "compress PDF", "PDF to Word", "mypdftools blog"],
  alternates: { canonical: "https://mypdftools.in/blog/" },
};

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  icon: React.ElementType;
  color: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: "merge-pdf-guide",
    title: "How to Merge PDF Files Like a Pro: Complete Guide",
    description: "Learn the easiest ways to combine multiple PDF files into one seamless document. Step-by-step instructions, pro tips, and common mistakes to avoid.",
    date: "August 2026",
    readTime: "6 min read",
    icon: Merge,
    color: "#EE6C4D",
    category: "Organize",
  },
  {
    slug: "split-pdf-tips",
    title: "Split PDF Files Instantly: Tips and Tricks You Need to Know",
    description: "Discover how to split large PDFs into smaller files with precision. From extracting single pages to custom ranges — everything covered.",
    date: "August 2026",
    readTime: "5 min read",
    icon: Scissors,
    color: "#F4A261",
    category: "Organize",
  },
  {
    slug: "compress-pdf-guide",
    title: "Reduce PDF File Size Without Losing Quality: Expert Guide",
    description: "Master the art of PDF compression. Learn how to shrink file sizes while keeping crisp text and sharp images intact.",
    date: "August 2026",
    readTime: "7 min read",
    icon: FileDown,
    color: "#8FBC5D",
    category: "Optimize",
  },
  {
    slug: "pdf-to-word-conversion",
    title: "Convert PDF to Word Documents: The Easiest Methods Explained",
    description: "Transform static PDFs into editable Word documents in seconds. Compare methods and find the one that works best for your needs.",
    date: "August 2026",
    readTime: "6 min read",
    icon: FileOutput,
    color: "#295795",
    category: "Convert",
  },
  {
    slug: "protect-pdf-password",
    title: "How to Password Protect Your PDF Files for Free",
    description: "Keep sensitive documents safe with PDF password protection. A complete walkthrough on encrypting and securing your files.",
    date: "August 2026",
    readTime: "5 min read",
    icon: Lock,
    color: "#F39C12",
    category: "Security",
  },
  {
    slug: "jpg-to-pdf-conversion",
    title: "Convert JPG Images to PDF in Seconds: Step-by-Step Tutorial",
    description: "Turn your photos and scans into organized PDF documents. Perfect for receipts, portfolios, and multi-page image collections.",
    date: "August 2026",
    readTime: "5 min read",
    icon: ImageIcon,
    color: "#5F83C6",
    category: "Convert",
  },
  {
    slug: "watermark-pdf-guide",
    title: "Add Watermarks to PDF Files: Protect Your Intellectual Property",
    description: "Learn how to easily add text and image watermarks to your PDF documents to prevent unauthorized use and copying.",
    date: "August 2026",
    readTime: "4 min read",
    icon: Droplets,
    color: "#5DADE2",
    category: "Edit",
  },
  {
    slug: "sign-pdf-electronically",
    title: "How to Sign PDF Documents Electronically (Legally Binding)",
    description: "Ditch the printer and scanner. Discover how to add legally binding electronic signatures to your PDF contracts and forms.",
    date: "August 2026",
    readTime: "6 min read",
    icon: PenTool,
    color: "#9B59B6",
    category: "Security",
  },
  {
    slug: "pdf-security-tips",
    title: "7 Essential PDF Security Tips Every Business Needs to Know",
    description: "Protect your confidential business data with these crucial PDF security best practices, from redaction to strong encryption.",
    date: "August 2026",
    readTime: "8 min read",
    icon: Shield,
    color: "#E74C3C",
    category: "Security",
  },
  {
    slug: "free-pdf-tools-online",
    title: "Why You Should Stop Using Paid PDF Software in 2026",
    description: "Explore the powerful capabilities of free online PDF tools that can replace your expensive Adobe Acrobat subscription.",
    date: "August 2026",
    readTime: "5 min read",
    icon: Sparkles,
    color: "#F1C40F",
    category: "Tools",
  },
  {
    slug: "pdf-to-excel-guide",
    title: "How to Convert PDF to Excel: Extract Tables Perfectly",
    description: "Learn how to accurately extract tabular data from PDF files into Excel spreadsheets without losing formatting.",
    date: "August 2026",
    readTime: "5 min read",
    icon: Table,
    color: "#2E7237",
    category: "Convert",
  },
  {
    slug: "rotate-pdf-guide",
    title: "How to Rotate PDF Pages — Quick & Easy Guide",
    description: "Scanned your documents upside down? Here is a simple guide on how to permanently rotate individual pages or entire PDFs.",
    date: "August 2026",
    readTime: "4 min read",
    icon: RotateCw,
    color: "#2A9D8F",
    category: "Organize",
  },
  {
    slug: "crop-pdf-guide",
    title: "How to Crop PDF Pages and Trim Margins Online",
    description: "A complete walkthrough on how to remove white borders and trim page margins from your PDF documents for clean printing.",
    date: "August 2026",
    readTime: "5 min read",
    icon: Crop,
    color: "#48C9B0",
    category: "Edit",
  },
  {
    slug: "pdf-page-numbers",
    title: "How to Add Page Numbers to PDF Files (Position, Font & Format)",
    description: "Learn how to number your PDF pages cleanly for legal briefs, academic dissertations, and multi-chapter documents.",
    date: "August 2026",
    readTime: "5 min read",
    icon: Hash,
    color: "#AF7AC5",
    category: "Edit",
  },
  {
    slug: "repair-pdf-guide",
    title: "How to Repair Corrupted and Damaged PDF Files Online",
    description: "Step-by-step guide to recovering unreadable or broken PDF files and restoring critical document contents.",
    date: "August 2026",
    readTime: "6 min read",
    icon: Wrench,
    color: "#6D9DC5",
    category: "Optimize",
  },
  {
    slug: "html-to-pdf-guide",
    title: "Convert HTML to PDF: Complete Developer & User Guide",
    description: "Discover how to convert HTML web pages and raw code into clean vector PDF documents with full styling preserved.",
    date: "August 2026",
    readTime: "6 min read",
    icon: Code,
    color: "#9B59B6",
    category: "Convert",
  },
  {
    slug: "text-to-pdf-guide",
    title: "How to Convert Plain Text to Formatted PDF Online",
    description: "Learn how to turn raw text files and plain notes into beautifully formatted, printable PDF documents in seconds.",
    date: "August 2026",
    readTime: "4 min read",
    icon: Type,
    color: "#3498DB",
    category: "Convert",
  },
  {
    slug: "organize-pdf-pages",
    title: "How to Rearrange and Reorder PDF Pages Visually",
    description: "Master PDF page management: learn how to reorder, delete unnecessary pages, and restructure documents with visual drag and drop.",
    date: "August 2026",
    readTime: "5 min read",
    icon: LayoutList,
    color: "#E9C46A",
    category: "Organize",
  },
  {
    slug: "edit-pdf-online",
    title: "How to Edit PDF Files Online: Add Text, Images & Annotations",
    description: "A comprehensive guide on editing existing PDF documents directly in your web browser without installing heavy software.",
    date: "August 2026",
    readTime: "7 min read",
    icon: FileText,
    color: "#AB6993",
    category: "Edit",
  },
  {
    slug: "pdf-to-jpg-guide",
    title: "How to Extract High-Quality JPG Images from PDF Files",
    description: "Learn the best methods for converting PDF pages into crisp JPG and PNG image files with zero quality degradation.",
    date: "August 2026",
    readTime: "5 min read",
    icon: FileImage,
    color: "#E76F51",
    category: "Convert",
  },
  {
    slug: "pdf-metadata-hidden-info",
    title: "PDF Metadata: What Hidden Information Is Lurking in Your Files?",
    description: "Discover what PDF metadata is, how it affects your document privacy, and how to safely inspect and remove sensitive info.",
    date: "August 2026",
    readTime: "6 min read",
    icon: Shield,
    color: "#16A085",
    category: "Security",
  }
];

export default function BlogIndex() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "mypdftools Knowledge Hub",
    description: "Comprehensive guides, tutorials, and security tips for working with PDF documents.",
    url: "https://mypdftools.in/blog/",
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `https://mypdftools.in/blog/${post.slug}/`,
      datePublished: "2026-08-01T00:00:00Z",
      author: {
        "@type": "Organization",
        name: "mypdftools Editorial Team"
      }
    }))
  };

  return (
    <div className="bg-background min-h-screen pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b bg-muted/20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
              <BookOpen className="h-3.5 w-3.5" /> PDF Guides &amp; Tutorials
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
              The mypdftools Knowledge Hub
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              In-depth tutorials, practical tips, and document security insights to help you work faster, safer, and more effectively with PDF files.
            </p>
            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Fact-checked &amp; Verified
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-primary" /> Written by Technical Specialists
              </span>
            </div>
          </div>
        </section>

        {/* Blog Post Grid */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => {
              const Icon = post.icon;
              return (
                <article
                  key={post.slug}
                  className="group flex flex-col rounded-2xl border bg-card p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl mb-4 group-hover:scale-105 transition-transform duration-200"
                    style={{ backgroundColor: `${post.color}15` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: post.color }} />
                  </div>

                  <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6 flex-1">
                    {post.description}
                  </p>

                  <div className="pt-4 border-t flex items-center justify-between text-xs text-muted-foreground mt-auto">
                    <span>{post.date}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-primary font-medium inline-flex items-center gap-1 group-hover:underline"
                    >
                      Read Guide <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
