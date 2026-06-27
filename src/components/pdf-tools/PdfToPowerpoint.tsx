'use client'

import React, { useState } from 'react'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { Presentation, Loader2, Download, Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

type SlideLayout = 'fit' | 'fill' | 'stretch'

export default function PdfToPowerpoint({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  // Advanced features
  const [imageQuality, setImageQuality] = useState<number>(92)
  const [slideLayout, setSlideLayout] = useState<SlideLayout>('fit')

  const handleConvert = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file')
      return
    }

    setProcessing(true)
    setProgress(0)

    try {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.7.284/build/pdf.worker.min.mjs'

      const buffer = await files[0].arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise

      const { default: PptxGenJS } = await import('pptxgenjs')
      const pptx = new PptxGenJS()

      const totalPages = pdf.numPages

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i)
        const viewport = page.getViewport({ scale: 2 })
        const canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        const ctx = canvas.getContext('2d')!
        await page.render({ canvasContext: ctx, viewport, canvas } as any).promise

        const mimeType = imageQuality > 80 ? 'image/png' : 'image/jpeg'
        const imgData = canvas.toDataURL(mimeType, imageQuality / 100)

        const slide = pptx.addSlide()

        // Calculate image placement based on layout option
        const imgRatio = viewport.width / viewport.height
        const slideW = 10 // inches (standard PPT width)
        const slideH = 7.5 // inches (standard PPT height)
        const slideRatio = slideW / slideH

        let imgOpts: Record<string, unknown>

        if (slideLayout === 'stretch') {
          // Stretch to fill entire slide
          imgOpts = { data: imgData, x: 0, y: 0, w: slideW, h: slideH }
        } else if (slideLayout === 'fill') {
          // Fill â€” cover entire slide, may crop
          if (imgRatio > slideRatio) {
            // Image is wider â€” fit height, crop sides
            const w = slideH * imgRatio
            const x = (slideW - w) / 2
            imgOpts = { data: imgData, x, y: 0, w, h: slideH }
          } else {
            // Image is taller â€” fit width, crop top/bottom
            const h = slideW / imgRatio
            const y = (slideH - h) / 2
            imgOpts = { data: imgData, x: 0, y, w: slideW, h }
          }
        } else {
          // Fit â€” maintain aspect ratio, center on slide
          if (imgRatio > slideRatio) {
            const w = slideW
            const h = slideW / imgRatio
            const y = (slideH - h) / 2
            imgOpts = { data: imgData, x: 0, y, w, h }
          } else {
            const h = slideH
            const w = slideH * imgRatio
            const x = (slideW - w) / 2
            imgOpts = { data: imgData, x, y: 0, w, h }
          }
        }

        slide.addImage(imgOpts as any)

        setProgress(Math.round((i / totalPages) * 100))

        canvas.width = 0
        canvas.height = 0
      }

      const pptxBuf = (await pptx.write({ outputType: 'arraybuffer' })) as ArrayBuffer
      const blob = new Blob([pptxBuf], {
        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      })
      const fileName = files[0].name.replace(/\.pdf$/i, '')
      saveAs(blob, `${fileName}-converted.pptx`)
      toast.success('PDF converted to PowerPoint successfully!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to convert PDF to PowerPoint. Try a smaller PDF.')
    } finally {
      setProcessing(false)
      setProgress(0)
    }
  }

  return (
    <ToolLayout
      title="PDF to PowerPoint"
      description="Convert PDF pages into PowerPoint slides."
      icon={<Presentation className="h-5 w-5" />}
      onBack={onBack}
    >
      <FileDropzone
        accept=".pdf"
        multiple={false}
        files={files}
        onFilesChange={setFiles}
        label="Drop a PDF file here"
        description="Select a PDF to convert to PowerPoint"
      />

      {files.length > 0 && (
        <div className="rounded-xl border bg-muted/30 p-4 space-y-1">
          <p className="text-sm font-medium">Current File</p>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">File name:</span>
            <span className="truncate max-w-[60%] text-right">{files[0].name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">File size:</span>
            <span className="font-medium">{formatSize(files[0].size)}</span>
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className="rounded-xl border bg-muted/20 p-5 space-y-5">
          <div className="flex items-center gap-2 mb-1">
            <Settings2 className="h-4 w-4 text-[#EE6C4D]" />
            <Label className="text-sm font-semibold">Advanced Settings</Label>
          </div>

          {/* Image Quality */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Image Quality</Label>
              <span className="text-xs font-medium text-[#EE6C4D]">{imageQuality}%</span>
            </div>
            <Slider
              value={[imageQuality]}
              onValueChange={(val) => setImageQuality(val[0])}
              min={10}
              max={100}
              step={1}
            />
            <p className="text-[10px] text-muted-foreground">
              Higher quality uses PNG for fidelity; lower quality uses JPEG for smaller file size.
            </p>
          </div>

          <Separator />

          {/* Slide Layout */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Slide Layout</Label>
            <Select value={slideLayout} onValueChange={(val) => setSlideLayout(val as SlideLayout)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fit">Fit â€” Center with letterbox</SelectItem>
                <SelectItem value="fill">Fill â€” Cover, may crop edges</SelectItem>
                <SelectItem value="stretch">Stretch â€” Fill entire slide</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-[10px] text-muted-foreground">
              Controls how each PDF page image is placed on the PowerPoint slide.
            </p>
          </div>
        </div>
      )}

      <Button
        onClick={handleConvert}
        disabled={processing || files.length === 0}
        className="w-full"
        size="lg"
      >
        {processing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Converting... {progress > 0 ? `${progress}%` : ''}
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            Convert to PowerPoint
          </>
        )}
      </Button>

      {processing && (
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-[#EE6C4D] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </ToolLayout>
  )
}

