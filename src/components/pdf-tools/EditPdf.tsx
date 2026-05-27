'use client'

import React, { useState } from 'react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { Pencil, Loader2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

export default function EditPdf({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [addText, setAddText] = useState('')
  const [textX, setTextX] = useState(50)
  const [textY, setTextY] = useState(50)
  const [textSize, setTextSize] = useState(16)
  const [processing, setProcessing] = useState(false)

  const handleEdit = async () => {
    if (files.length === 0) { toast.error('Please select a PDF file'); return }
    setProcessing(true)
    try {
      const arrayBuffer = await files[0].arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const pages = pdfDoc.getPages()

      if (pages.length > 0 && addText.trim()) {
        const page = pages[0]
        page.drawText(addText, {
          x: textX,
          y: textY,
          size: textSize,
          font,
          color: rgb(0, 0, 0),
        })
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, 'edited.pdf')
      toast.success('PDF edited successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to edit PDF.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <ToolLayout title="Edit PDF" description="Add text to your PDF document." icon={<Pencil className="h-5 w-5" />} onBack={onBack}>
      <FileDropzone accept=".pdf" multiple={false} files={files} onFilesChange={setFiles} label="Drop a PDF file here" description="Select a PDF to edit" />
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Text to Add</Label>
          <Textarea value={addText} onChange={(e) => setAddText(e.target.value)} placeholder="Enter text to add on the first page..." className="min-h-20" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>X Position</Label>
            <Input type="number" value={textX} onChange={(e) => setTextX(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>Y Position</Label>
            <Input type="number" value={textY} onChange={(e) => setTextY(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>Font Size</Label>
            <Input type="number" min={8} max={72} value={textSize} onChange={(e) => setTextSize(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <Button onClick={handleEdit} disabled={processing || files.length === 0} className="w-full" size="lg">
        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
        {processing ? 'Editing...' : 'Edit & Download'}
      </Button>
    </ToolLayout>
  )
}
