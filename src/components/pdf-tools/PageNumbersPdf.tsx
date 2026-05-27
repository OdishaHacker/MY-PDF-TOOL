'use client'

import React, { useState } from 'react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { Hash, Loader2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

export default function PageNumbersPdf({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [position, setPosition] = useState('bottom-center')
  const [startNum, setStartNum] = useState(1)
  const [fontSize, setFontSize] = useState(12)
  const [processing, setProcessing] = useState(false)

  const handleAddNumbers = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file')
      return
    }
    setProcessing(true)
    try {
      const arrayBuffer = await files[0].arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const pages = pdfDoc.getPages()

      pages.forEach((page, index) => {
        const { width, height } = page.getSize()
        const pageNum = (index + startNum).toString()
        const textWidth = font.widthOfTextAtSize(pageNum, fontSize)

        let x: number, y: number
        switch (position) {
          case 'bottom-center':
            x = width / 2 - textWidth / 2
            y = 30
            break
          case 'bottom-right':
            x = width - textWidth - 40
            y = 30
            break
          case 'bottom-left':
            x = 40
            y = 30
            break
          case 'top-center':
            x = width / 2 - textWidth / 2
            y = height - 40
            break
          case 'top-right':
            x = width - textWidth - 40
            y = height - 40
            break
          default:
            x = width / 2 - textWidth / 2
            y = 30
        }

        page.drawText(pageNum, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        })
      })

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, 'numbered.pdf')
      toast.success('Page numbers added successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to add page numbers.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <ToolLayout
      title="Add Page Numbers"
      description="Add page numbers to every page of a PDF document."
      icon={<Hash className="h-5 w-5" />}
      onBack={onBack}
    >
      <FileDropzone
        accept=".pdf"
        multiple={false}
        files={files}
        onFilesChange={setFiles}
        label="Drop a PDF file here"
        description="Select a PDF to add page numbers"
      />
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Position</Label>
          <Select value={position} onValueChange={setPosition}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="bottom-center">Bottom Center</SelectItem>
              <SelectItem value="bottom-right">Bottom Right</SelectItem>
              <SelectItem value="bottom-left">Bottom Left</SelectItem>
              <SelectItem value="top-center">Top Center</SelectItem>
              <SelectItem value="top-right">Top Right</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Start Number</Label>
          <Input
            type="number"
            min={1}
            value={startNum}
            onChange={(e) => setStartNum(Number(e.target.value) || 1)}
          />
        </div>
        <div className="space-y-2">
          <Label>Font Size</Label>
          <Input
            type="number"
            min={6}
            max={48}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value) || 12)}
          />
        </div>
      </div>
      <Button onClick={handleAddNumbers} disabled={processing || files.length === 0} className="w-full" size="lg">
        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
        {processing ? 'Adding Numbers...' : 'Add Page Numbers & Download'}
      </Button>
    </ToolLayout>
  )
}
