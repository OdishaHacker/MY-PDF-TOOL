'use client'

import React, { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { Merge, Loader2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

export default function MergePdf({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [processing, setProcessing] = useState(false)

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= newFiles.length) return
    ;[newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]]
    setFiles(newFiles)
  }

  const handleMerge = async () => {
    if (files.length < 2) {
      toast.error('Please select at least 2 PDF files to merge')
      return
    }
    setProcessing(true)
    try {
      const mergedPdf = await PDFDocument.create()
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        copiedPages.forEach((page) => mergedPdf.addPage(page))
      }
      const pdfBytes = await mergedPdf.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, 'merged.pdf')
      toast.success('PDFs merged successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to merge PDFs. Please ensure all files are valid PDFs.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <ToolLayout
      title="Merge PDF"
      description="Combine multiple PDF files into a single document. Drag to reorder."
      icon={<Merge className="h-5 w-5" />}
      onBack={onBack}
    >
      <FileDropzone
        accept=".pdf"
        multiple
        files={files}
        onFilesChange={setFiles}
        label="Drop PDF files here or click to browse"
        description="Select 2 or more PDF files to merge"
      />
      {files.length > 1 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">File order (drag to reorder):</p>
          {files.map((file, index) => (
            <div key={`merge-${index}`} className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
              <span className="text-sm font-mono text-muted-foreground w-6">{index + 1}.</span>
              <span className="text-sm flex-1 truncate">{file.name}</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" disabled={index === 0} onClick={() => moveFile(index, 'up')} className="h-6 w-6 p-0 text-xs">
                  ↑
                </Button>
                <Button variant="ghost" size="sm" disabled={index === files.length - 1} onClick={() => moveFile(index, 'down')} className="h-6 w-6 p-0 text-xs">
                  ↓
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Button onClick={handleMerge} disabled={processing || files.length < 2} className="w-full" size="lg">
        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
        {processing ? 'Merging...' : 'Merge & Download'}
      </Button>
    </ToolLayout>
  )
}
