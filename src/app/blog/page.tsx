import Link from "next/link";
import type { Metadata } from "next";
import {
  FileText, Clock, ArrowRight, BookOpen, Merge, Scissors, FileDown,
  FileOutput, Lock, ImageIcon, PenTool, Droplets, Shield, Sparkles,
  RotateCw, Crop, Hash, Wrench, Code, Type, LayoutList, Table, FileImage
} from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — mypdftools | PDF Tips, Guides & Tutorials",
  description: "Expert guides, tips, and tutorials on PDF tools. Learn how to merge, split, compress, convert, sign, and secure your PDF files with our comprehensive blog.",
  keywords: ["PDF blog", "PDF tips", "PDF tutorials", "merge PDF guide", "split PDF", "compress PDF", "PDF to Word", "mypdftools blog"],
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
  // EXISTING 10 POSTS
  {
    slug: "merge-pdf-guide",
    title: "How to Merge PDF Files Like a Pro: Complete Guide 2026",
    description: "Learn the easiest ways to combine multiple PDF files into one seamless document. Step-by-step instructions, pro tips, and common mistakes to avoid.",
    date: "May 2, 2026",
    readTime: "6 min read",
    icon: Merge,
    color: "#EE6C4D",
    category: "Organize",
  },
  {
    slug: "split-pdf-tips",
    title: "Split PDF Files Instantly: Tips and Tricks You Need to Know",
    description: "Discover how to split large PDFs into smaller files with precision. From extracting single pages to custom ranges — everything covered.",
    date: "May 5, 2026",
    readTime: "5 min read",
    icon: Scissors,
    color: "#F4A261",
    category: "Organize",
  },
  {
    slug: "compress-pdf-guide",
    title: "Reduce PDF File Size Without Losing Quality: Expert Guide",
    description: "Master the art of PDF compression. Learn how to shrink file sizes while keeping crisp text and sharp images intact.",
    date: "May 8, 2026",
    readTime: "7 min read",
    icon: FileDown,
    color: "#8FBC5D",
    category: "Optimize",
  },
  {
    slug: "pdf-to-word-conversion",
    title: "Convert PDF to Word Documents: The Easiest Methods Explained",
    description: "Transform static PDFs into editable Word documents in seconds. Compare methods and find the one that works best for your needs.",
    date: "May 11, 2026",
    readTime: "6 min read",
    icon: FileOutput,
    color: "#295795",
    category: "Convert",
  },
  {
    slug: "protect-pdf-password",
    title: "How to Password Protect Your PDF Files for Free",
    description: "Keep sensitive documents safe with PDF password protection. A complete walkthrough on encrypting and securing your files.",
    date: "May 14, 2026",
    readTime: "5 min read",
    icon: Lock,
    color: "#F39C12",
    category: "Security",
  },
  {
    slug: "jpg-to-pdf-conversion",
    title: "Convert JPG Images to PDF in Seconds: Step-by-Step Tutorial",
    description: "Turn your photos and scans into organized PDF documents. Perfect for receipts, portfolios, and multi-page image collections.",
    date: "May 16, 2026",
    readTime: "5 min read",
    icon: ImageIcon,
    color: "#5F83C6",
    category: "Convert",
  },
  {
    slug: "watermark-pdf-guide",
    title: "Add Watermarks to PDF Files: Protect Your Intellectual Property",
    description: "Learn how to easily add text and image watermarks to your PDF documents to prevent unauthorized use and copying.",
    date: "May 19, 2026",
    readTime: "4 min read",
    icon: Droplets,
    color: "#5DADE2",
    category: "Edit",
  },
  {
    slug: "sign-pdf-electronically",
    title: "How to Sign PDF Documents Electronically (Legally Binding)",
    description: "Ditch the printer and scanner. Discover how to add legally binding electronic signatures to your PDF contracts and forms.",
    date: "May 22, 2026",
    readTime: "6 min read",
    icon: PenTool,
    color: "#9B59B6",
    category: "Security",
  },
  {
    slug: "pdf-security-tips",
    title: "7 Essential PDF Security Tips Every Business Needs to Know",
    description: "Protect your confidential business data with these crucial PDF security best practices, from redaction to strong encryption.",
    date: "May 25, 2026",
    readTime: "8 min read",
    icon: Shield,
    color: "#E74C3C",
    category: "Security",
  },
  {
    slug: "free-pdf-tools-online",
    title: "Why You Should Stop Using Paid PDF Software in 2026",
    description: "Explore the powerful capabilities of free online PDF tools that can replace your expensive Adobe Acrobat subscription.",
    date: "May 28, 2026",
    readTime: "5 min read",
    icon: Sparkles,
    color: "#F1C40F",
    category: "Tools",
  },
  
  // NEW 10 POSTS (AdSense Ready)
  {
    slug: "pdf-to-excel-guide",
    title: "How to Convert PDF to Excel: Extract Tables Perfectly",
    description: "Learn how to accurately extract tabular data from PDF files into Excel spreadsheets without losing formatting.",
    date: "June 1, 2026",
    readTime: "5 min read",
    icon: Table,
    color: "#2E7237",
    category: "Convert",
  },
  {
    slug: "rotate-pdf-guide",
    title: "How to Rotate PDF Pages — Quick & Easy Guide",
    description: "Scanned your documents upside down? Here is a simple guide on how to permanently rotate individual pages or entire PDFs.",
    date: "June 4, 2026",
    readTime: "4 min read",
    icon: RotateCw,
    color: "#2A9D8F",
    category: "Organize",
  },
  {
    slug: "edit-pdf-online",
    title: "How to Edit a PDF Online Without Adobe Acrobat",
    description: "Need to fix a typo or add text to a PDF? Discover how to quickly edit PDF documents directly in your web browser.",
    date: "June 7, 2026",
    readTime: "6 min read",
    icon: FileText,
    color: "#AB6993",
    category: "Edit",
  },
  {
    slug: "pdf-to-jpg-guide",
    title: "Best Way to Convert PDF to JPG Images (High Quality)",
    description: "Extract high-resolution JPG images from your PDF files or convert entire PDF pages into images seamlessly.",
    date: "June 10, 2026",
    readTime: "5 min read",
    icon: FileImage,
    color: "#E76F51",
    category: "Convert",
  },
  {
    slug: "crop-pdf-guide",
    title: "How to Crop PDF Pages to Remove Margins and White Space",
    description: "Optimize your PDFs for e-readers or mobile devices by cropping out unnecessary white space and margins.",
    date: "June 13, 2026",
    readTime: "4 min read",
    icon: Crop,
    color: "#9C6ADE",
    category: "Edit",
  },
  {
    slug: "pdf-page-numbers",
    title: "How to Add Page Numbers to PDF Files Effortlessly",
    description: "Make your PDF documents look professional by adding sequential page numbers to the header or footer of your files.",
    date: "June 16, 2026",
    readTime: "4 min read",
    icon: Hash,
    color: "#4A90E2",
    category: "Edit",
  },
  {
    slug: "repair-pdf-guide",
    title: "How to Fix and Repair Corrupted PDF Files",
    description: "Cannot open a PDF file? Follow our comprehensive guide to repair damaged and corrupted PDF documents to recover your data.",
    date: "June 19, 2026",
    readTime: "7 min read",
    icon: Wrench,
    color: "#6D9DC5",
    category: "Optimize",
  },
  {
    slug: "html-to-pdf-guide",
    title: "How to Convert HTML Webpages to PDF Documents",
    description: "Save any webpage for offline reading or archiving. Learn how to convert HTML to PDF while retaining styling and links.",
    date: "June 22, 2026",
    readTime: "5 min read",
    icon: Code,
    color: "#9B59B6",
    category: "Convert",
  },
  {
    slug: "text-to-pdf-guide",
    title: "How to Convert Plain Text Files (TXT) to PDF",
    description: "Easily turn your plain text notes and documents into secure, universally readable PDF files with a few clicks.",
    date: "June 24, 2026",
    readTime: "3 min read",
    icon: Type,
    color: "#3498DB",
    category: "Convert",
  },
  {
    slug: "organize-pdf-pages",
    title: "How to Organize, Reorder, and Delete PDF Pages Like a Pro",
    description: "Master PDF organization. Learn how to rearrange pages, delete unwanted sections, and structure your PDF perfectly.",
    date: "June 25, 2026",
    readTime: "6 min read",
    icon: LayoutList,
    color: "#E9C46A",
    category: "Organize",
  },
];

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const remainingPosts = blogPosts.slice(1);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-24 pb-32">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500 via-slate-900 to-slate-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">mypdftools</span> Blog
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Expert guides, tutorials, and tips to master your PDF documents. Learn how to edit, convert, organize, and secure your files effortlessly.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-20 relative z-20">
        
        {/* Featured Post */}
        <div className="mb-20">
          <div className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-6 drop-shadow-md">Featured Article</div>
          <Link href={`/blog/${featuredPost.slug}`} className="group block">
            <div className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border/50 hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row">
              <div className="md:w-2/5 p-12 flex items-center justify-center" style={{ backgroundColor: `${featuredPost.color}15` }}>
                <featuredPost.icon className="w-32 h-32 transition-transform duration-300 group-hover:scale-110" style={{ color: featuredPost.color }} />
              </div>
              <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: `${featuredPost.color}20`, color: featuredPost.color }}>
                    {featuredPost.category}
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors text-foreground">{featuredPost.title}</h2>
                <p className="text-lg text-muted-foreground mb-8">{featuredPost.description}</p>
                <div className="flex items-center gap-2 text-primary font-medium">
                  Read Full Guide <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Latest Posts Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Latest Articles</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group h-full block">
                <article className="bg-card rounded-xl border border-border/50 h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="h-48 flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: `${post.color}10` }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-background/80 to-transparent z-10" />
                    <post.icon className="w-20 h-20 transition-transform duration-500 group-hover:scale-110" style={{ color: post.color }} />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4 text-xs font-medium">
                      <span className="px-2.5 py-1 rounded-md" style={{ backgroundColor: `${post.color}15`, color: post.color }}>
                        {post.category}
                      </span>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors text-foreground">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm flex-1 mb-6">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                      <span className="text-sm font-medium text-primary flex items-center gap-1">
                        Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
