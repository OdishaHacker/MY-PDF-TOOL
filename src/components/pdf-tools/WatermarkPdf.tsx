'use client'

import React, { useState } from 'react'
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { Droplets, Loader2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

export default function WatermarkPdf({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [text, setText] = useState('CONFIDENTIAL')
  const [fontSize, setFontSize] = useState(48)
  const [opacity, setOpacity] = useState(20)
  const [rotation, setRotation] = useState(45)
  const [processing, setProcessing] = useState(false)

  const handleWatermark = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file')
      return
    }
    if (!text.trim()) {
      toast.error('Please enter watermark text')
      return
    }
    setProcessing(true)
    try {
      const arrayBuffer = await files[0].arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
      const pages = pdfDoc.getPages()

      pages.forEach((page) => {
        const { width, height } = page.getSize()
        const textWidth = font.widthOfTextAtSize(text, fontSize)
        page.drawText(text, {
          x: width / 2 - textWidth / 2,
          y: height / 2,
          size: fontSize,
          font,
          color: rgb(0.5, 0.5, 0.5),
          opacity: opacity / 100,
          rotate: degrees(360 - rotation),
        })
      })

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, 'watermarked.pdf')
      toast.success('Watermark added successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to add watermark.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <ToolLayout
      title="Add Watermark"
      description="Add a diagonal text watermark to all pages of a PDF."
      icon={<Droplets className="h-5 w-5" />}
      onBack={onBack}
    >
      <FileDropzone
        accept=".pdf"
        multiple={false}
        files={files}
        onFilesChange={setFiles}
        label="Drop a PDF file here"
        description="Select a PDF to add watermark"
      />
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="watermarkText">Watermark Text</Label>
          <Input
            id="watermarkText"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter watermark text"
          />
        </div>
        <div className="space-y-2">
          <Label>Font Size: {fontSize}px</Label>
          <Slider value={[fontSize]} onValueChange={([v]) => setFontSize(v)} min={12} max={120} step={2} />
        </div>
        <div className="space-y-2">
          <Label>Opacity: {opacity}%</Label>
          <Slider value={[opacity]} onValueChange={([v]) => setOpacity(v)} min={5} max={100} step={5} />
        </div>
        <div className="space-y-2">
          <Label>Rotation: {rotation}°</Label>
          <Slider value={[rotation]} onValueChange={([v]) => setRotation(v)} min={0} max={90} step={5} />
        </div>
      </div>
      <Button onClick={handleWatermark} disabled={processing || files.length === 0} className="w-full" size="lg">
        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
        {processing ? 'Adding Watermark...' : 'Add Watermark & Download'}
      </Button>
    </ToolLayout>
  )
}
