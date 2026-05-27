'use client'

import React, { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { Scissors, Loader2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

export default function SplitPdf({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [pageRanges, setPageRanges] = useState('1-1')
  const [processing, setProcessing] = useState(false)

  const parseRanges = (input: string): number[][] => {
    const ranges: number[][] = []
    const parts = input.split(',').map(s => s.trim()).filter(Boolean)
    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number)
        if (!isNaN(start) && !isNaN(end) && start > 0 && end >= start) {
          const pages: number[] = []
          for (let i = start; i <= end; i++) pages.push(i)
          ranges.push(pages)
        }
      } else {
        const num = Number(part)
        if (!isNaN(num) && num > 0) ranges.push([num])
      }
    }
    return ranges
  }

  const handleSplit = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file')
      return
    }
    setProcessing(true)
    try {
      const arrayBuffer = await files[0].arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const totalPages = pdfDoc.getPageCount()
      const ranges = parseRanges(pageRanges)

      for (let i = 0; i < ranges.length; i++) {
        const newPdf = await PDFDocument.create()
        for (const pageNum of ranges[i]) {
          if (pageNum <= totalPages) {
            const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageNum - 1])
            newPdf.addPage(copiedPage)
          }
        }
        const pdfBytes = await newPdf.save()
        const blob = new Blob([pdfBytes], { type: 'application/pdf' })
        saveAs(blob, `split_part_${i + 1}.pdf`)
      }
      toast.success(`Split into ${ranges.length} file(s) successfully!`)
    } catch (error) {
      console.error(error)
      toast.error('Failed to split PDF. Check your page ranges.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <ToolLayout
      title="Split PDF"
      description="Extract specific pages or page ranges from a PDF file."
      icon={<Scissors className="h-5 w-5" />}
      onBack={onBack}
    >
      <FileDropzone
        accept=".pdf"
        multiple={false}
        files={files}
        onFilesChange={setFiles}
        label="Drop a PDF file here"
        description="Select a PDF to split"
      />
      <div className="space-y-2">
        <Label htmlFor="pageRanges">Page Ranges</Label>
        <Input
          id="pageRanges"
          value={pageRanges}
          onChange={(e) => setPageRanges(e.target.value)}
          placeholder="e.g., 1-3, 5, 7-9"
        />
        <p className="text-xs text-muted-foreground">
          Separate ranges with commas. Each range creates a separate file.
          Example: &quot;1-3, 5, 7-9&quot; creates 3 files.
        </p>
      </div>
      <Button onClick={handleSplit} disabled={processing || files.length === 0} className="w-full" size="lg">
        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
        {processing ? 'Splitting...' : 'Split & Download'}
      </Button>
    </ToolLayout>
  )
}
