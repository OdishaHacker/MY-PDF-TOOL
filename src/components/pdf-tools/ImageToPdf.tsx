'use client'

import React, { useState } from 'react'
import { jsPDF } from 'jspdf'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { ImageIcon, Loader2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

export default function ImageToPdf({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [pageSize, setPageSize] = useState('a4')
  const [orientation, setOrientation] = useState('portrait')
  const [processing, setProcessing] = useState(false)

  const handleConvert = async () => {
    if (files.length === 0) {
      toast.error('Please select at least one image')
      return
    }
    setProcessing(true)
    try {
      const doc = new jsPDF({ orientation: orientation as 'portrait' | 'landscape', unit: 'mm', format: pageSize as 'a4' | 'letter' | 'legal' })
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      const margin = 10

      for (let i = 0; i < files.length; i++) {
        if (i > 0) doc.addPage()
        const file = files[i]
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.readAsDataURL(file)
        })
        const format = file.type === 'image/png' ? 'PNG' : 'JPG'
        const img = new Image()
        await new Promise<void>((resolve) => {
          img.onload = () => resolve()
          img.src = dataUrl
        })
        const availW = pageWidth - 2 * margin
        const availH = pageHeight - 2 * margin
        const ratio = Math.min(availW / img.width, availH / img.height)
        const w = img.width * ratio
        const h = img.height * ratio
        const x = (pageWidth - w) / 2
        const y = (pageHeight - h) / 2
        doc.addImage(dataUrl, format, x, y, w, h)
      }
      const blob = doc.output('blob')
      saveAs(blob, 'images_to_pdf.pdf')
      toast.success('Images converted to PDF successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to convert images to PDF.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <ToolLayout
      title="Image to PDF"
      description="Convert JPG, PNG, or WebP images to a PDF document."
      icon={<ImageIcon className="h-5 w-5" />}
      onBack={onBack}
    >
      <FileDropzone
        accept=".jpg,.jpeg,.png,.webp"
        multiple
        files={files}
        onFilesChange={setFiles}
        label="Drop images here or click to browse"
        description="Supports JPG, PNG, WebP"
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Page Size</Label>
          <Select value={pageSize} onValueChange={setPageSize}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="a4">A4</SelectItem>
              <SelectItem value="letter">Letter</SelectItem>
              <SelectItem value="legal">Legal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Orientation</Label>
          <Select value={orientation} onValueChange={setOrientation}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="portrait">Portrait</SelectItem>
              <SelectItem value="landscape">Landscape</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={handleConvert} disabled={processing || files.length === 0} className="w-full" size="lg">
        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
        {processing ? 'Converting...' : 'Convert to PDF'}
      </Button>
    </ToolLayout>
  )
}
