'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Merge, Scissors, ImageIcon, FileImage, RotateCw, FileDown,
  Droplets, Hash, Lock, Unlock, FileText, PenTool, Search,
  Shield, Zap, Globe, FileUp, Code, Type,
  LayoutList, Pencil, Crop, FileSearch, Wrench, Table,
  Presentation, ArrowRight, Sparkles
} from 'lucide-react'
import { Input } from '@/components/ui/input'

type Category = 'all' | 'organize' | 'optimize' | 'convert-to' | 'convert-from' | 'edit' | 'security'

interface ToolDef {
  id: string
  name: string
  description: string
  icon: any
  color: string
  category: Category[]
  popular?: boolean
  href: string
}

const categories: { id: Category; label: string; icon: any }[] = [
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
  { id: 'word-to-pdf', name: 'Word to PDF', description: 'Convert DOCX, XLSX, TXT', icon: FileUp, color: '#7B68EE', category: ['convert-to'], href: '/word-to-pdf' },
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
      <section className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-[#EE6C4D]/8 via-[#7B68EE]/5 to-[#2A9D8F]/8" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#EE6C4D]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#5F83C6]/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/3 w-64 h-64 bg-[#8FBC5D]/8 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 pt-20 pb-14 text-center">
          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-2">
              <span className="bg-gradient-to-r from-[#EE6C4D] via-[#D04526] to-[#7B68EE] bg-clip-text text-transparent">
                mypdftools
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-4 mb-3 leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Every tool you need to work with PDFs — all in one place.
          </motion.p>

          <motion.p
            className="text-sm text-muted-foreground/70 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            Merge, split, compress, convert, sign, watermark &amp; more. 100% free. 100% private. All in your browser.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="max-w-xl mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools... (merge, compress, convert...)"
              className="pl-13 h-14 rounded-2xl text-base shadow-lg border-2 border-transparent focus:border-[#EE6C4D]/40 focus:shadow-xl transition-all bg-card"
            />
          </motion.div>

          {/* Quick Access Popular Tools */}
          {!search && activeCategory === 'all' && (
            <motion.div
              className="flex flex-wrap justify-center gap-2 mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {popularTools.map(tool => (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="group flex items-center gap-1.5 px-4 py-2 rounded-full bg-card border shadow-sm hover:shadow-md hover:border-primary/30 transition-all text-sm font-medium"
                >
                  <tool.icon className="h-3.5 w-3.5" style={{ color: tool.color }} />
                  {tool.name}
                  <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ===== CATEGORY TABS ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2 justify-center scrollbar-none">
          {categories.map(cat => {
            const Icon = cat.icon
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#EE6C4D] to-[#D04526] text-white shadow-md shadow-[#EE6C4D]/25'
                    : 'bg-card border hover:border-primary/30 hover:shadow-sm text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {cat.label}
              </button>
            )
          })}
        </div>
      </section>

      {/* ===== TOOLS GRID ===== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {filteredTools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.id}
                href={tool.href}
                className="group relative text-left rounded-2xl border bg-card p-4 sm:p-5 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden glow-card"
              >
                {/* Top color accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${tool.color}, ${tool.color}88)` }}
                />

                {/* Hover glow background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at top left, ${tool.color}12, transparent 70%)` }}
                />

                <div className="relative">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm"
                    style={{ backgroundColor: `${tool.color}15` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: tool.color }} />
                  </div>
                  <h3 className="font-semibold text-sm mb-0.5 group-hover:text-foreground transition-colors">{tool.name}</h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{tool.description}</p>
                </div>

                {/* Popular badge */}
                {tool.popular && (
                  <div className="absolute top-3 right-3">
                    <span className="flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EE6C4D] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EE6C4D]"></span>
                    </span>
                  </div>
                )}
              </Link>
            )
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mb-4">
              <Search className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <p className="text-lg font-medium">No tools found</p>
            <p className="text-sm text-muted-foreground mt-1">Try a different search or category</p>
          </div>
        )}
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '23+', label: 'PDF Tools', icon: Sparkles },
              { value: '100%', label: 'Free & Private', icon: Shield },
              { value: '0', label: 'Files Uploaded', icon: Globe },
              { value: '<3s', label: 'Avg. Processing', icon: Zap },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <stat.icon className="h-5 w-5 mx-auto mb-2 text-primary" />
                <p className="text-2xl sm:text-3xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
