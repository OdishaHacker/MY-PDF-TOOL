import Link from "next/link";
import type { Metadata } from "next";
import {
  FileText,
  Clock,
  ArrowRight,
  BookOpen,
  Merge,
  Scissors,
  FileDown,
  FileOutput,
  Lock,
  ImageIcon,
  PenTool,
  Droplets,
  Shield,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — mypdftools | PDF Tips, Guides & Tutorials",
  description:
    "Expert guides, tips, and tutorials on PDF tools. Learn how to merge, split, compress, convert, sign, and secure your PDF files with our comprehensive blog.",
  keywords: [
    "PDF blog",
    "PDF tips",
    "PDF tutorials",
    "merge PDF guide",
    "split PDF",
    "compress PDF",
    "PDF to Word",
    "password protect PDF",
    "JPG to PDF",
    "sign PDF online",
    "watermark PDF",
    "PDF security",
    "free PDF tools",
    "mypdftools blog",
  ],
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
    title: "How to Merge PDF Files Like a Pro: Complete Guide 2026",
    description:
      "Learn the easiest ways to combine multiple PDF files into one seamless document. Step-by-step instructions, pro tips, and common mistakes to avoid.",
    date: "May 2, 2026",
    readTime: "6 min read",
    icon: Merge,
    color: "#EE6C4D",
    category: "Organize",
  },
  {
    slug: "split-pdf-tips",
    title: "Split PDF Files Instantly: Tips and Tricks You Need to Know",
    description:
      "Discover how to split large PDFs into smaller files with precision. From extracting single pages to custom ranges — everything covered.",
    date: "May 5, 2026",
    readTime: "5 min read",
    icon: Scissors,
    color: "#F4A261",
    category: "Organize",
  },
  {
    slug: "compress-pdf-guide",
    title: "Reduce PDF File Size Without Losing Quality: Expert Guide",
    description:
      "Master the art of PDF compression. Learn how to shrink file sizes while keeping crisp text and sharp images intact.",
    date: "May 8, 2026",
    readTime: "7 min read",
    icon: FileDown,
    color: "#8FBC5D",
    category: "Optimize",
  },
  {
    slug: "pdf-to-word-conversion",
    title: "Convert PDF to Word Documents: The Easiest Methods Explained",
    description:
      "Transform static PDFs into editable Word documents in seconds. Compare methods and find the one that works best for your needs.",
    date: "May 11, 2026",
    readTime: "6 min read",
    icon: FileOutput,
    color: "#295795",
    category: "Convert",
  },
  {
    slug: "protect-pdf-password",
    title: "How to Password Protect Your PDF Files for Free",
    description:
      "Keep sensitive documents safe with PDF password protection. A complete walkthrough on encrypting and securing your files.",
    date: "May 14, 2026",
    readTime: "5 min read",
    icon: Lock,
    color: "#F39C12",
    category: "Security",
  },
  {
    slug: "jpg-to-pdf-conversion",
    title: "Convert JPG Images to PDF in Seconds: Step-by-Step Tutorial",
    description:
      "Turn your photos and scans into organized PDF documents. Perfect for receipts, portfolios, and multi-page image collections.",
    date: "May 16, 2026",
    readTime: "5 min read",
    icon: ImageIcon,
    color: "#5F83C6",
    category: "Convert",
  },
  {
    slug: "sign-pdf-electronically",
    title: "Electronic Signatures: How to Sign PDF Documents Online",
    description:
      "Go paperless with e-signatures. Learn how to sign PDFs digitally — legally binding, fast, and completely free.",
    date: "May 19, 2026",
    readTime: "6 min read",
    icon: PenTool,
    color: "#E67E22",
    category: "Security",
  },
  {
    slug: "watermark-pdf-guide",
    title: "Add Watermarks to PDF: Protect Your Documents Easily",
    description:
      "Brand your PDFs and deter unauthorized use with custom watermarks. Text or image-based — we show you exactly how.",
    date: "May 22, 2026",
    readTime: "5 min read",
    icon: Droplets,
    color: "#5DADE2",
    category: "Edit",
  },
  {
    slug: "pdf-security-tips",
    title: "PDF Security Best Practices: Keep Your Documents Safe in 2026",
    description:
      "From password protection to redaction — a comprehensive security checklist to safeguard your most sensitive PDF documents.",
    date: "May 25, 2026",
    readTime: "7 min read",
    icon: Shield,
    color: "#2A9D8F",
    category: "Security",
  },
  {
    slug: "free-pdf-tools-online",
    title: "Top Free Online PDF Tools You Should Know About in 2026",
    description:
      "A curated roundup of the best free PDF tools on the web. Merge, split, convert, compress — all without spending a dime.",
    date: "May 27, 2026",
    readTime: "8 min read",
    icon: Sparkles,
    color: "#7B68EE",
    category: "Resources",
  },
];

export default function BlogPage() {
  return (
    <div className="bg-background">

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-gradient-to-br from-[#EE6C4D]/5 via-transparent to-[#2A9D8F]/5" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              mypdftools Blog
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              PDF Tips, Guides &amp; Tutorials
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Expert advice on working with PDFs. From merging and splitting to
              securing and signing — learn everything you need to be more
              productive.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => {
              const Icon = post.icon;
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group relative rounded-2xl border bg-card p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* Top accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(90deg, ${post.color}, ${post.color}88)`,
                    }}
                  />

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{
                      background: `radial-gradient(ellipse at top left, ${post.color}08, transparent 70%)`,
                    }}
                  />

                  <div className="relative">
                    {/* Category + Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: `${post.color}12`,
                          color: post.color,
                        }}
                      >
                        {post.category}
                      </span>
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${post.color}12` }}
                      >
                        <Icon
                          className="h-5 w-5"
                          style={{ color: post.color }}
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-base font-semibold leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {post.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </div>
                    </div>

                    {/* Read more */}
                    <div className="flex items-center gap-1 text-sm font-medium mt-3 group-hover:text-primary transition-colors">
                      Read article
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Ready to work smarter with PDFs?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Try our free online PDF tools — merge, split, compress, convert,
              sign, and more. No signup required.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#EE6C4D] to-[#D04526] text-white font-medium shadow-lg shadow-[#EE6C4D]/25 hover:shadow-xl hover:shadow-[#EE6C4D]/30 transition-all"
            >
              <FileText className="h-4 w-4" />
              Explore All Tools
            </Link>
          </div>
        </section>
      </main>

    </div>
  );
}
