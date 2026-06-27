'use client'

import React, { useState } from 'react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { FileSearch, Loader2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

export default function RedactPdf({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [searchText, setSearchText] = useState('')
  const [replaceColor, setReplaceColor] = useState('black')
  const [processing, setProcessing] = useState(false)

  const handleRedact = async () => {
    if (files.length === 0) { toast.error('Please select a PDF file'); return }
    if (!searchText.trim()) { toast.error('Please enter text to redact'); return }
    setProcessing(true)
    try {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`
      const arrayBuffer = await files[0].arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const pages = pdfDoc.getPages()

      // Use pdfjs to find text positions, then overlay with pdf-lib
      const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise
      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1)
        const textContent = await page.getTextContent()
        const pageObj = pages[i]
        const { height } = pageObj.getSize()

        for (const item of textContent.items as any[]) {
          if (item.str.toLowerCase().includes(searchText.toLowerCase())) {
            const x = item.transform[4]
            // pdfjs returns y from bottom, pdf-lib expects y from bottom
            const y = item.transform[5]
            const textWidth = item.width || font.widthOfTextAtSize(item.str, item.transform[0] || 12)
            const textHeight = item.height || Math.abs(item.transform[3]) || 12

            const fillColor = replaceColor === 'black' ? rgb(0, 0, 0) : rgb(1, 1, 1)
            pageObj.drawRectangle({
              x, y, width: textWidth + 2, height: textHeight + 2,
              color: fillColor,
            })
          }
        }
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, 'redacted.pdf')
      toast.success('Text redacted successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to redact PDF.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <ToolLayout title="Redact PDF" description="Black out sensitive text in your PDF document." icon={<FileSearch className="h-5 w-5" />} onBack={onBack}>
      <FileDropzone accept=".pdf" multiple={false} files={files} onFilesChange={setFiles} label="Drop a PDF file here" description="Select a PDF to redact" />
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Text to Redact</Label>
          <Input value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Enter text to find & redact" />
        </div>
        <div className="space-y-2">
          <Label>Redaction Color</Label>
          <Select value={replaceColor} onValueChange={setReplaceColor}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="black">Black</SelectItem>
              <SelectItem value="white">White</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={handleRedact} disabled={processing || files.length === 0} className="w-full" size="lg">
        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
        {processing ? 'Redacting...' : 'Redact & Download'}
      </Button>
    </ToolLayout>
  )
}
