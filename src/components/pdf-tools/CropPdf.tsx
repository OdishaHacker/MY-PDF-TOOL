'use client'

import React, { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { Crop, Loader2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

export default function CropPdf({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [margin, setMargin] = useState({ top: 20, bottom: 20, left: 20, right: 20 })
  const [processing, setProcessing] = useState(false)

  const handleCrop = async () => {
    if (files.length === 0) { toast.error('Please select a PDF file'); return }
    setProcessing(true)
    try {
      const arrayBuffer = await files[0].arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const pages = pdfDoc.getPages()

      pages.forEach((page) => {
        const { width, height } = page.getSize()
        page.setCropBox(
          margin.left,
          margin.bottom,
          width - margin.left - margin.right,
          height - margin.top - margin.bottom
        )
      })

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, 'cropped.pdf')
      toast.success('PDF cropped successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to crop PDF.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <ToolLayout title="Crop PDF" description="Crop margins from your PDF pages." icon={<Crop className="h-5 w-5" />} onBack={onBack}>
      <FileDropzone accept=".pdf" multiple={false} files={files} onFilesChange={setFiles} label="Drop a PDF file here" description="Select a PDF to crop" />
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Set margins to crop (in PDF points, 1 point = 1/72 inch)</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Top Margin</Label>
            <Input type="number" min={0} value={margin.top} onChange={(e) => setMargin({ ...margin, top: Number(e.target.value) })} />
          </div>
          <div className="space-y-2">
            <Label>Bottom Margin</Label>
            <Input type="number" min={0} value={margin.bottom} onChange={(e) => setMargin({ ...margin, bottom: Number(e.target.value) })} />
          </div>
          <div className="space-y-2">
            <Label>Left Margin</Label>
            <Input type="number" min={0} value={margin.left} onChange={(e) => setMargin({ ...margin, left: Number(e.target.value) })} />
          </div>
          <div className="space-y-2">
            <Label>Right Margin</Label>
            <Input type="number" min={0} value={margin.right} onChange={(e) => setMargin({ ...margin, right: Number(e.target.value) })} />
          </div>
        </div>
      </div>
      <Button onClick={handleCrop} disabled={processing || files.length === 0} className="w-full" size="lg">
        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
        {processing ? 'Cropping...' : 'Crop & Download'}
      </Button>
    </ToolLayout>
  )
}
