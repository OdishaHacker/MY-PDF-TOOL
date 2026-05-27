'use client'

import React, { useState } from 'react'
import { PDFDocument, degrees } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { RotateCw, Loader2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

export default function RotatePdf({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [angle, setAngle] = useState('90')
  const [processing, setProcessing] = useState(false)

  const handleRotate = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file')
      return
    }
    setProcessing(true)
    try {
      const arrayBuffer = await files[0].arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const pages = pdfDoc.getPages()
      const rotationAngle = Number(angle)

      pages.forEach((page) => {
        const currentRotation = page.getRotation().angle
        page.setRotation(degrees(currentRotation + rotationAngle))
      })

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, 'rotated.pdf')
      toast.success(`PDF rotated ${angle}° successfully!`)
    } catch (error) {
      console.error(error)
      toast.error('Failed to rotate PDF.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <ToolLayout
      title="Rotate PDF"
      description="Rotate all pages of a PDF by a specified angle."
      icon={<RotateCw className="h-5 w-5" />}
      onBack={onBack}
    >
      <FileDropzone
        accept=".pdf"
        multiple={false}
        files={files}
        onFilesChange={setFiles}
        label="Drop a PDF file here"
        description="Select a PDF to rotate"
      />
      <div className="space-y-2">
        <Label>Rotation Angle</Label>
        <Select value={angle} onValueChange={setAngle}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="90">90° Clockwise</SelectItem>
            <SelectItem value="180">180°</SelectItem>
            <SelectItem value="270">270° Clockwise (90° Counter)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleRotate} disabled={processing || files.length === 0} className="w-full" size="lg">
        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
        {processing ? 'Rotating...' : 'Rotate & Download'}
      </Button>
    </ToolLayout>
  )
}
