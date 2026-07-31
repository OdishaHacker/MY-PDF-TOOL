import React from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Info, HelpCircle, ShieldCheck, Zap, Lock, Sparkles, CheckCircle2 } from 'lucide-react'

export interface FaqItem {
  question: string
  answer: string
}

export interface ToolSeoPageProps {
  title: string
  description: string
  slug: string
  category?: string
  howToUseSteps: string[]
  aboutContent: string
  faqItems: FaqItem[]
  children: React.ReactNode
}

export default function ToolSeoPage({
  title,
  description,
  slug,
  category = 'PDF Tools',
  howToUseSteps,
  aboutContent,
  faqItems,
  children,
}: ToolSeoPageProps) {
  const canonicalUrl = `https://mypdftools.in/${slug}/`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: title,
    description: description,
    url: canonicalUrl,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

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

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to All Tools
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{title}</span>
        </div>

        {/* Header Section (Server-Rendered H1 and Intro) */}
        <header className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="h-3.5 w-3.5" /> {category}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        </header>

        {/* Interactive Client Tool Container */}
        <section className="bg-card border rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
          {children}
        </section>

        {/* Value Highlights Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/40 border">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">100% Client-Side Privacy</h3>
              <p className="text-xs text-muted-foreground mt-1">Your files are processed directly in your browser. No uploads to external servers.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/40 border">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 shrink-0">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">Instant Processing</h3>
              <p className="text-xs text-muted-foreground mt-1">Powered by WebAssembly & modern JS engines for high-speed file operations.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/40 border">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 shrink-0">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">Free Forever</h3>
              <p className="text-xs text-muted-foreground mt-1">No registration, no subscriptions, and no hidden watermarks added to your PDFs.</p>
            </div>
          </div>
        </section>

        {/* How to Use Section (Server-Rendered HTML) */}
        {howToUseSteps && howToUseSteps.length > 0 && (
          <section className="space-y-4 pt-6 border-t">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              How to Use {title}
            </h2>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
              {howToUseSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 p-4 rounded-xl border bg-card shadow-xs">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xs shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed pt-0.5">{step}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* About Tool Section (Server-Rendered HTML) */}
        {aboutContent && (
          <section className="space-y-3 pt-6 border-t">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              About This Tool
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-muted-foreground leading-relaxed">
              <p>{aboutContent}</p>
            </div>
          </section>
        )}

        {/* FAQ Section (Server-Rendered HTML) */}
        {faqItems && faqItems.length > 0 && (
          <section className="space-y-4 pt-6 border-t">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-4">
              {faqItems.map((faq, idx) => (
                <div key={idx} className="p-4 sm:p-5 rounded-xl border bg-card space-y-2">
                  <h3 className="font-semibold text-sm sm:text-base text-foreground flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
