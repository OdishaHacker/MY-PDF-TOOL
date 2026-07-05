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
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`
      const arrayBuffer = await files[0].arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise
      const paragraphs: Paragraph[] = []

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        const lineTexts: string[] = []
        let lastY: number | null = null
        let currentSize = 12
        let isBold = false
        for (const item of textContent.items as any[]) {
          if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
            paragraphs.push(new Paragraph({ 
              children: [new TextRun({ text: lineTexts.join(' '), size: Math.round(currentSize * 2), bold: isBold })], 
              spacing: { after: 120 } 
            }))
            lineTexts.length = 0
          }
          lineTexts.push(item.str)
          lastY = item.transform[5]
          currentSize = item.height || Math.abs(item.transform[0]) || 12
          isBold = currentSize > 14
        }
        if (lineTexts.length > 0) {
          paragraphs.push(new Paragraph({ 
            children: [new TextRun({ text: lineTexts.join(' '), size: Math.round(currentSize * 2), bold: isBold })], 
            spacing: { after: 120 } 
          }))
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
    <ToolLayout 
      title="PDF to Word" 
      description="Convert PDF documents to editable Word (DOCX) files." 
      icon={<FileText className="h-5 w-5" />} 
      onBack={onBack}
      seoContent={
        <>
          <h2 className="text-2xl font-bold text-foreground">Transform PDFs into Editable Word Documents</h2>
          <p>
            PDF files are fantastic for sharing documents because they look exactly the same on every device. However, this strength becomes a massive headache when you actually need to edit the text, update a chart, or fix a typo. Unless you have expensive desktop software, editing a PDF directly is notoriously difficult. Our <strong>PDF to Word</strong> converter bridges this gap effortlessly.
          </p>
          <p>
            By converting your rigid PDF into a flexible Microsoft Word (.docx) file, you instantly regain total control over your document's contents. You can edit paragraphs, change fonts, delete pages, and adjust margins using the familiar interface of Microsoft Word, Google Docs, or LibreOffice.
          </p>
          <h3 className="text-xl font-bold text-foreground mt-8 mb-4">How Does the Conversion Work?</h3>
          <p>
            When you upload a file to our converter, our advanced extraction engine analyzes the internal structure of the PDF. It doesn't just take pictures of the text; it reads the underlying character data, spacing, and font weight. It then dynamically rebuilds those elements into native Word paragraphs.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Text Extraction:</strong> We extract actual text, not just flattened images, ensuring you can immediately start typing and editing without needing third-party OCR software.</li>
            <li><strong>Formatting Preservation:</strong> The engine works hard to maintain your document's original flow, translating PDF coordinates into Word-friendly spacing, indents, and line breaks.</li>
            <li><strong>Instant Access:</strong> As soon as the conversion is complete, a standard .docx file is generated and saved directly to your computer.</li>
          </ul>
          <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Secure, Browser-Based Conversion</h3>
          <p>
            Unlike other popular conversion websites that require you to upload your sensitive contracts and resumes to their cloud servers, mypdftools processes everything directly within your web browser. This means your personal data never leaves your computer, eliminating the risk of data leaks and ensuring absolute privacy.
          </p>
        </>
      }
    >
      <FileDropzone accept=".pdf" multiple={false} files={files} onFilesChange={setFiles} label="Drop a PDF file here" description="Select a PDF to convert to Word" />
      <Button onClick={handleConvert} disabled={processing || files.length === 0} className="w-full" size="lg">
        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
        {processing ? 'Converting...' : 'Convert to Word'}
      </Button>
    </ToolLayout>
  )
}
