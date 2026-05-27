'use client'

import React, { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { LayoutList, Loader2, Download, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

export default function OrganizePdf({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [processing, setProcessing] = useState(false)
  const [pageCount, setPageCount] = useState(0)
  const [deletedPages, setDeletedPages] = useState<Set<number>>(new Set())

  const loadPdf = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      setPageCount(pdf.getPageCount())
      setDeletedPages(new Set())
    } catch { /* ignore */ }
  }

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles)
    if (newFiles.length > 0) loadPdf(newFiles[0])
    else setPageCount(0)
  }

  const toggleDelete = (pageNum: number) => {
    const newSet = new Set(deletedPages)
    if (newSet.has(pageNum)) newSet.delete(pageNum)
    else newSet.add(pageNum)
    setDeletedPages(newSet)
  }

  const handleOrganize = async () => {
    if (files.length === 0) { toast.error('Please select a PDF file'); return }
    setProcessing(true)
    try {
      const arrayBuffer = await files[0].arrayBuffer()
      const srcPdf = await PDFDocument.load(arrayBuffer)
      const newPdf = await PDFDocument.create()

      for (let i = 0; i < srcPdf.getPageCount(); i++) {
        if (deletedPages.has(i + 1)) continue
        const [copiedPage] = await newPdf.copyPages(srcPdf, [i])
        newPdf.addPage(copiedPage)
      }

      const pdfBytes = await newPdf.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, 'organized.pdf')
      toast.success(`PDF organized! Removed ${deletedPages.size} page(s).`)
    } catch (error) {
      console.error(error)
      toast.error('Failed to organize PDF.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <ToolLayout title="Organize PDF" description="Remove pages and reorganize your PDF document." icon={<LayoutList className="h-5 w-5" />} onBack={onBack}>
      <FileDropzone accept=".pdf" multiple={false} files={files} onFilesChange={handleFileChange} label="Drop a PDF file here" description="Select a PDF to organize" />
      {pageCount > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Click pages to mark for removal:</p>
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                onClick={() => toggleDelete(i + 1)}
                className={`flex items-center justify-center h-10 rounded-lg text-sm font-medium transition-all ${
                  deletedPages.has(i + 1)
                    ? 'bg-red-500/20 text-red-600 line-through border-2 border-red-300'
                    : 'bg-primary/10 text-primary border-2 border-transparent hover:border-primary/30'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          {deletedPages.size > 0 && (
            <p className="text-xs text-red-500">{deletedPages.size} page(s) will be removed</p>
          )}
        </div>
      )}
      <Button onClick={handleOrganize} disabled={processing || files.length === 0} className="w-full" size="lg">
        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
        {processing ? 'Organizing...' : 'Organize & Download'}
      </Button>
    </ToolLayout>
  )
}
