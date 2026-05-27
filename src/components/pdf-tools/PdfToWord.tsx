'use client'

import React, { useState } from 'react'
import { saveAs } from 'file-saver'
import { Document, Packer, Paragraph, TextRun } from 'docx'
import { toast } from 'sonner'
import { FileText, Loader2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

export default function PdfToWord({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [processing, setProcessing] = useState(false)

  const handleConvert = async () => {
    if (files.length === 0) { toast.error('Please select a PDF file'); return }
    setProcessing(true)
    try {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`
      const arrayBuffer = await files[0].arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise
      const paragraphs: Paragraph[] = []

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        const lineTexts: string[] = []
        let lastY: number | null = null
        for (const item of textContent.items as any[]) {
          if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
            paragraphs.push(new Paragraph({ children: [new TextRun(lineTexts.join(' '))], spacing: { after: 120 } }))
            lineTexts.length = 0
          }
          lineTexts.push(item.str)
          lastY = item.transform[5]
        }
        if (lineTexts.length > 0) {
          paragraphs.push(new Paragraph({ children: [new TextRun(lineTexts.join(' '))], spacing: { after: 120 } }))
        }
        if (i < pdf.numPages) {
          paragraphs.push(new Paragraph({ children: [new TextRun({ text: '', break: 1 })] }))
        }
      }

      const doc = new Document({ sections: [{ properties: {}, children: paragraphs }] })
      const blob = await Packer.toBlob(doc)
      saveAs(blob, 'converted.docx')
      toast.success('PDF converted to Word successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to convert PDF to Word.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <ToolLayout title="PDF to Word" description="Convert PDF documents to editable Word (DOCX) files." icon={<FileText className="h-5 w-5" />} onBack={onBack}>
      <FileDropzone accept=".pdf" multiple={false} files={files} onFilesChange={setFiles} label="Drop a PDF file here" description="Select a PDF to convert to Word" />
      <Button onClick={handleConvert} disabled={processing || files.length === 0} className="w-full" size="lg">
        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
        {processing ? 'Converting...' : 'Convert to Word'}
      </Button>
    </ToolLayout>
  )
}
