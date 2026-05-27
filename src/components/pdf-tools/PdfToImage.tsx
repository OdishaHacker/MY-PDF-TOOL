'use client'

import React, { useState } from 'react'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { FileImage, Loader2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

export default function PdfToImage({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [format, setFormat] = useState('png')
  const [scale, setScale] = useState('2')
  const [processing, setProcessing] = useState(false)
  const [previews, setPreviews] = useState<string[]>([])

  const handleConvert = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file')
      return
    }
    setProcessing(true)
    setPreviews([])
    try {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`

      const arrayBuffer = await files[0].arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise
      const images: string[] = []
      const scaleNum = Number(scale)

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const viewport = page.getViewport({ scale: scaleNum })
        const canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        const ctx = canvas.getContext('2d')!
        await page.render({ canvasContext: ctx, viewport }).promise

        const mimeType = format === 'png' ? 'image/png' : 'image/jpeg'
        const dataUrl = canvas.toDataURL(mimeType, 0.95)
        images.push(dataUrl)

        canvas.toBlob((blob) => {
          if (blob) {
            saveAs(blob, `page_${i}.${format}`)
          }
        }, mimeType, 0.95)
      }
      setPreviews(images)
      toast.success(`Converted ${pdf.numPages} page(s) to ${format.toUpperCase()}!`)
    } catch (error) {
      console.error(error)
      toast.error('Failed to convert PDF to images.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <ToolLayout
      title="PDF to Image"
      description="Convert each page of a PDF to PNG or JPG images."
      icon={<FileImage className="h-5 w-5" />}
      onBack={onBack}
    >
      <FileDropzone
        accept=".pdf"
        multiple={false}
        files={files}
        onFilesChange={setFiles}
        label="Drop a PDF file here"
        description="Select a PDF to convert to images"
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Image Format</Label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="jpg">JPG</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Quality (Scale)</Label>
          <Select value={scale} onValueChange={setScale}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1x (Standard)</SelectItem>
              <SelectItem value="2">2x (High)</SelectItem>
              <SelectItem value="3">3x (Ultra)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={handleConvert} disabled={processing || files.length === 0} className="w-full" size="lg">
        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
        {processing ? 'Converting...' : 'Convert to Images'}
      </Button>
      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {previews.map((src, i) => (
            <div key={i} className="rounded-lg border overflow-hidden bg-muted/30">
              <img src={src} alt={`Page ${i + 1}`} className="w-full h-auto" />
              <p className="text-xs text-center py-1 text-muted-foreground">Page {i + 1}</p>
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  )
}
