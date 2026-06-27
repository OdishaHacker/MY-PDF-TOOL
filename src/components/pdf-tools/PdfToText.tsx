'use client'

import React, { useState } from 'react'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { FileText, Loader2, Download, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

export default function PdfToText({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [extractedText, setExtractedText] = useState('')
  const [processing, setProcessing] = useState(false)

  const handleExtract = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file')
      return
    }
    setProcessing(true)
    setExtractedText('')
    try {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`

      const arrayBuffer = await files[0].arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise
      let fullText = ''

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ')
        fullText += `--- Page ${i} ---\n${pageText}\n\n`
      }

      setExtractedText(fullText)
      toast.success(`Text extracted from ${pdf.numPages} page(s)!`)
    } catch (error) {
      console.error(error)
      toast.error('Failed to extract text from PDF.')
    } finally {
      setProcessing(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(extractedText)
      toast.success('Text copied to clipboard!')
    } catch {
      toast.error('Failed to copy text.')
    }
  }

  const downloadAsText = () => {
    const blob = new Blob([extractedText], { type: 'text/plain' })
    saveAs(blob, 'extracted_text.txt')
  }

  return (
    <ToolLayout
      title="PDF to Text"
      description="Extract text content from a PDF document."
      icon={<FileText className="h-5 w-5" />}
      onBack={onBack}
    >
      <FileDropzone
        accept=".pdf"
        multiple={false}
        files={files}
        onFilesChange={setFiles}
        label="Drop a PDF file here"
        description="Select a PDF to extract text from"
      />
      <Button onClick={handleExtract} disabled={processing || files.length === 0} className="w-full" size="lg">
        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
        {processing ? 'Extracting...' : 'Extract Text'}
      </Button>
      {extractedText && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              <Copy className="h-4 w-4 mr-1" /> Copy
            </Button>
            <Button variant="outline" size="sm" onClick={downloadAsText}>
              <Download className="h-4 w-4 mr-1" /> Download .txt
            </Button>
          </div>
          <textarea
            readOnly
            value={extractedText}
            className="w-full h-64 rounded-lg border bg-muted/30 p-3 text-sm font-mono resize-y focus:outline-none"
          />
        </div>
      )}
    </ToolLayout>
  )
}
