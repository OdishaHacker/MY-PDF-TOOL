'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, REPLACEMEICON } from 'lucide-react'

export const metadata = {
  title: "REPLACEMETITLE — mypdftools Blog",
  description: "REPLACEMEDESC",
  keywords: ["pdf", "pdf tools", "mypdftools", "free pdf", "online pdf tools"],
}

export default function REPLACESLUGPascal() {
  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
        {/* Back button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#EE6C4D]/15 to-[#D04526]/10 text-[#EE6C4D]">
              <REPLACEMEICON className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium text-muted-foreground px-3 py-1 rounded-full bg-muted">REPLACEMECATEGORY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">REPLACEMETITLE</h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>REPLACEMEDATE</span>
            <span>·</span>
            <span>6 min read</span>
          </div>
        </div>

        {/* Content */}
        <article className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
