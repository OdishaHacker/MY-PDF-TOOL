'use client'

import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface ToolLayoutProps {
  title: string
  description: string
  icon: React.ReactNode
  onBack: () => void
  children: React.ReactNode
}

export default function ToolLayout({
  title,
  description,
  icon,
  onBack,
  children,
}: ToolLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-3xl"
    >
      {/* Back + Header */}
      <div className="flex items-start gap-3 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mt-1 shrink-0 rounded-xl hover:bg-primary/10"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#EE6C4D]/15 to-[#D04526]/10 text-[#EE6C4D] shadow-sm">
              {icon}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>

      {/* Tool Content */}
      <div className="space-y-6">
        {children}
      </div>

      {/* Privacy notice */}
      <div className="mt-8 rounded-xl border bg-muted/30 p-4 flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-600 dark:text-green-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium">Your files stay private</p>
          <p className="text-xs text-muted-foreground mt-0.5">All processing happens in your browser. No files are uploaded to any server.</p>
        </div>
      </div>
    </motion.div>
  )
}
