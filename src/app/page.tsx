'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Merge, Scissors, ImageIcon, FileImage, RotateCw, FileDown,
  Droplets, Hash, Lock, Unlock, FileText, PenTool, Search,
  Shield, Zap, Globe, FileUp, Code, Type,
  LayoutList, Pencil, Crop, FileSearch, Wrench, Table,
  Presentation, ArrowRight, Sparkles, CheckCircle2, ShieldCheck,
  Cpu, HeartHandshake, HelpCircle, BookOpen
} from 'lucide-react'
import { Input } from '@/components/ui/input'

type Category = 'all' | 'organize' | 'optimize' | 'convert-to' | 'convert-from' | 'edit' | 'security'

interface ToolDef {
  id: string
  name: string
  description: string
  icon: React.ElementType
  color: string
  category: Category[]
  popular?: boolean
  href: string
}

const categories: { id: Category; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: 'All Tools', icon: Sparkles },
  { id: 'organize', label: 'Organize', icon: LayoutList },
  { id: 'optimize', label: 'Optimize', icon: Zap },
  { id: 'convert-to', label: 'To PDF', icon: FileUp },
  { id: 'convert-from', label: 'From PDF', icon: FileImage },
  { id: 'edit', label: 'Edit', icon: Pencil },
  { id: 'security', label: 'Security', icon: Shield },
]

const tools: ToolDef[] = [
  { id: 'merge', name: 'Merge PDF', description: 'Combine multiple PDFs into one', icon: Merge, color: '#EE6C4D', category: ['organize'], popular: true, href: '/merge-pdf' },
  { id: 'split', name: 'Split PDF', description: 'Split or extract pages from PDF', icon: Scissors, color: '#F4A261', category: ['organize'], popular: true, href: '/split-pdf' },
  { id: 'organize', name: 'Organize PDF', description: 'Remove or reorder pages', icon: LayoutList, color: '#E9C46A', category: ['organize'], href: '/organize-pdf' },
  { id: 'rotate', name: 'Rotate PDF', description: 'Rotate PDF pages', icon: RotateCw, color: '#2A9D8F', category: ['organize'], href: '/rotate-pdf' },
  { id: 'compress', name: 'Compress PDF', description: 'Reduce file size', icon: FileDown, color: '#8FBC5D', category: ['optimize'], popular: true, href: '/compress-pdf' },
  { id: 'repair', name: 'Repair PDF', description: 'Fix corrupted PDFs', icon: Wrench, color: '#6D9DC5', category: ['optimize'], href: '/repair-pdf' },
  { id: 'image-to-pdf', name: 'JPG to PDF', description: 'Convert images to PDF', icon: ImageIcon, color: '#5F83C6', category: ['convert-to'], popular: true, href: '/jpg-to-pdf' },
  { id: 'word-to-pdf', name: 'Word to PDF', description: 'Convert DOCX to PDF', icon: FileUp, color: '#7B68EE', category: ['convert-to'], href: '/word-to-pdf' },
  { id: 'excel-to-pdf', name: 'Excel to PDF', description: 'Convert XLSX to PDF', icon: Table, color: '#2E7237', category: ['convert-to'], href: '/excel-to-pdf' },
  { id: 'html-to-pdf', name: 'HTML to PDF', description: 'Convert HTML to PDF', icon: Code, color: '#9B59B6', category: ['convert-to'], href: '/html-to-pdf' },
  { id: 'text-to-pdf', name: 'Text to PDF', description: 'Convert plain text to PDF', icon: Type, color: '#3498DB', category: ['convert-to'], href: '/text-to-pdf' },
  { id: 'pdf-to-image', name: 'PDF to JPG', description: 'Convert pages to images', icon: FileImage, color: '#E76F51', category: ['convert-from'], popular: true, href: '/pdf-to-jpg' },
  { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert to DOCX', icon: FileText, color: '#295795', category: ['convert-from'], popular: true, href: '/pdf-to-word' },
  { id: 'pdf-to-excel', name: 'PDF to Excel', description: 'Extract data to XLSX', icon: Table, color: '#2E7237', category: ['convert-from'], href: '/pdf-to-excel' },
  { id: 'pdf-to-ppt', name: 'PDF to PPT', description: 'Convert to PowerPoint', icon: Presentation, color: '#D04526', category: ['convert-from'], href: '/pdf-to-powerpoint' },
  { id: 'pdf-to-text', name: 'PDF to Text', description: 'Extract text from PDF', icon: FileText, color: '#C0392B', category: ['convert-from'], href: '/pdf-to-text' },
  { id: 'edit-pdf', name: 'Edit PDF', description: 'Add text & shapes', icon: Pencil, color: '#AB6993', category: ['edit'], href: '/edit-pdf' },
  { id: 'watermark', name: 'Watermark', description: 'Add text watermark', icon: Droplets, color: '#5DADE2', category: ['edit'], href: '/add-watermark' },
  { id: 'page-numbers', name: 'Page Numbers', description: 'Add page numbers', icon: Hash, color: '#AF7AC5', category: ['edit'], href: '/page-numbers' },
  { id: 'crop', name: 'Crop PDF', description: 'Crop page margins', icon: Crop, color: '#48C9B0', category: ['edit'], href: '/crop-pdf' },
  { id: 'redact', name: 'Redact PDF', description: 'Black out sensitive text', icon: FileSearch, color: '#E74C3C', category: ['edit'], href: '/redact-pdf' },
  { id: 'protect', name: 'Protect PDF', description: 'Add password', icon: Lock, color: '#F39C12', category: ['security'], href: '/protect-pdf' },
  { id: 'unlock', name: 'Unlock PDF', description: 'Remove password', icon: Unlock, color: '#27AE60', category: ['security'], href: '/unlock-pdf' },
  { id: 'sign', name: 'Sign PDF', description: 'Draw & place signature', icon: PenTool, color: '#E67E22', category: ['security'], popular: true, href: '/sign-pdf' },
]

export default function Home() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  const filteredTools = useMemo(() => {
    let filtered = tools
    if (activeCategory !== 'all') {
      filtered = filtered.filter(t => t.category.includes(activeCategory))
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      filtered = filtered.filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
    }
    return filtered
  }, [search, activeCategory])

  const popularTools = tools.filter(t => t.popular)

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EE6C4D]/8 via-[#7B68EE]/5 to-[#2A9D8F]/8" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#EE6C4D]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#5F83C6]/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/3 w-64 h-64 bg-[#8FBC5D]/8 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 pt-16 pb-14 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
            <Sparkles className="h-3.5 w-3.5" /> 100% Free &amp; Private Browser-Based PDF Suite
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight mb-4">
            <span className="bg-gradient-to-r from-[#EE6C4D] via-[#D04526] to-[#7B68EE] bg-clip-text text-transparent">
              mypdftools
            </span>{' '}
            <span className="text-foreground">— Online PDF Tools</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-2 leading-relaxed">
            Every tool you need to work with PDFs — all in one place.
          </p>
          <p className="text-sm text-muted-foreground/80 mb-8 max-w-xl mx-auto">
            Merge, split, compress, convert, sign, watermark &amp; redact. 100% free, 100% private. Files never leave your browser.
          </p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto relative mb-6">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search tools... (e.g. merge, compress, word to pdf)"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-13 h-14 rounded-2xl text-base shadow-lg border-2 border-transparent focus:border-[#EE6C4D]/40 focus:shadow-xl transition-all bg-card"
            />
          </div>

          {/* Popular shortcuts */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {popularTools.map(t => {
              const Icon = t.icon
              return (
                <Link
                  key={t.id}
                  href={t.href}
                  className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-card border shadow-xs hover:shadow-md hover:border-primary/30 transition-all text-xs font-medium text-foreground"
                >
                  <Icon className="h-3.5 w-3.5" style={{ color: t.color }} />
                  {t.name}
                  <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== TOOLS DIRECTORY SECTION ===== */}
      <section id="all-tools" className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 justify-start sm:justify-center scrollbar-none">
          {categories.map(cat => {
            const Icon = cat.icon
            const active = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-[#EE6C4D] to-[#D04526] text-white shadow-md shadow-[#EE6C4D]/25'
                    : 'bg-card border hover:border-primary/30 hover:shadow-xs text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {filteredTools.map(tool => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.id}
                href={tool.href}
                className="group relative text-left rounded-2xl border bg-card p-4 sm:p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: `linear-gradient(90deg, ${tool.color}, ${tool.color}88)` }}
                />
                <div className="relative">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl mb-3 group-hover:scale-105 transition-all duration-200 shadow-xs"
                    style={{ backgroundColor: `${tool.color}15` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: tool.color }} />
                  </div>
                  <h3 className="font-semibold text-sm mb-0.5 text-foreground group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                    {tool.description}
                  </p>
                </div>
                {tool.popular && (
                  <div className="absolute top-3 right-3">
                    <span className="relative flex h-2 w-2">
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EE6C4D]" />
                    </span>
                  </div>
                )}
              </Link>
            )
          })}
        </div>
      </section>

      {/* ===== WHY CHOOSE SECTION ===== */}
      <section className="bg-muted/30 border-y py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Why Millions Choose mypdftools for PDF Workflows
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              Built from the ground up for maximum speed, security, and simplicity without bloated software or hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-card border shadow-xs space-y-3">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 w-fit">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">100% Client-Side Privacy</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your PDF documents never leave your computer or get uploaded to cloud servers. All conversions, merges, and edits happen directly in your browser using local memory.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border shadow-xs space-y-3">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 w-fit">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">High-Speed WebAssembly</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Powered by next-generation WebAssembly engines that process huge files in milliseconds without waiting in long server upload queues.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border shadow-xs space-y-3">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 w-fit">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Free Forever &amp; No Signup</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No credit cards, no subscriptions, no email registration, and no intrusive watermarks stamped on your finished PDF documents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS SECTION ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            How It Works in 3 Simple Steps
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Professional PDF editing made accessible in just a few clicks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative p-6 rounded-2xl border bg-card text-center space-y-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold mx-auto text-sm">
              1
            </span>
            <h3 className="font-semibold text-base text-foreground">Select Your Tool &amp; File</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Choose from 24+ free PDF tools and drag-and-drop your documents into the clean dropzone.
            </p>
          </div>

          <div className="relative p-6 rounded-2xl border bg-card text-center space-y-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold mx-auto text-sm">
              2
            </span>
            <h3 className="font-semibold text-base text-foreground">Customize &amp; Process</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Reorder pages, select compression level, add signatures, or set passwords with instant visual preview.
            </p>
          </div>

          <div className="relative p-6 rounded-2xl border bg-card text-center space-y-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold mx-auto text-sm">
              3
            </span>
            <h3 className="font-semibold text-base text-foreground">Download Instantly</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Click download to save your finalized, pristine PDF document directly to your device storage.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FREQUENTLY ASKED QUESTIONS SECTION ===== */}
      <section className="bg-muted/30 border-t py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center justify-center gap-2">
              <HelpCircle className="h-6 w-6 text-primary" />
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Everything you need to know about our free online PDF tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border bg-card space-y-2">
              <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                Are my documents safe and private?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Yes, 100%. Unlike standard online converters that upload your confidential files to remote cloud servers, mypdftools executes all logic locally in your web browser. Your files never touch our servers.
              </p>
            </div>

            <div className="p-5 rounded-2xl border bg-card space-y-2">
              <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                Is there any page or file size limit?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                There are no artificial limits imposed on file sizes or page counts. You can process as many documents as your local device RAM and browser can handle.
              </p>
            </div>

            <div className="p-5 rounded-2xl border bg-card space-y-2">
              <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                Do I need to install any software or plugins?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                No software installation or browser extensions are required. mypdftools works seamlessly across Chrome, Safari, Firefox, Edge, and mobile browsers on iOS and Android.
              </p>
            </div>

            <div className="p-5 rounded-2xl border bg-card space-y-2">
              <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                Will watermarks be added to my output files?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Never. All output documents remain clean, professional, and free of any promotional watermarks or branding.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
