'use client'

import React, { useState } from 'react'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { FileImage, Loader2, Download, Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
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

const DPI_OPTIONS: Record<string, { label: string; scale: number }> = {
  '72': { label: '72 DPI (Screen)', scale: 1 },
  '150': { label: '150 DPI (Medium)', scale: 2.08 },
  '300': { label: '300 DPI (Print)', scale: 4.17 },
}

export default function PdfToJpg({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  // Advanced features
  const [imageFormat, setImageFormat] = useState<string>('jpg')
  const [dpiOption, setDpiOption] = useState<string>('150')
  const [quality, setQuality] = useState<number>(92)
  const [pageRange, setPageRange] = useState<string>('all')

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
      const totalPages = pdf.numPages

      // Parse page range
      let pagesToConvert: number[] = []
      if (pageRange === 'all') {
        for (let i = 1; i <= totalPages; i++) pagesToConvert.push(i)
      } else {
        // Parse range like "1-3,5,7-9"
        const parts = pageRange.split(',').map((s) => s.trim()).filter(Boolean)
        for (const part of parts) {
          if (part.includes('-')) {
            const [start, end] = part.split('-').map(Number)
            if (!isNaN(start) && !isNaN(end)) {
              for (let i = Math.max(1, start); i <= Math.min(totalPages, end); i++) {
                pagesToConvert.push(i)
              }
            }
          } else {
            const num = Number(part)
            if (!isNaN(num) && num >= 1 && num <= totalPages) {
              pagesToConvert.push(num)
            }
          }
        }
        // Remove duplicates
        pagesToConvert = [...new Set(pagesToConvert)].sort((a, b) => a - b)
      }

      if (pagesToConvert.length === 0) {
        toast.error('No valid pages specified in range')
        setProcessing(false)
        return
      }

      const scale = DPI_OPTIONS[dpiOption]?.scale || 2.08
      const isJpg = imageFormat === 'jpg'
      const mimeType = isJpg ? 'image/jpeg' : 'image/png'
      const extension = isJpg ? 'jpg' : 'png'
      
      const JSZip = (await import('jszip')).default
      const zip = new JSZip()
      let lastBlob: Blob | null = null
      const fileName = files[0].name.replace(/\.pdf$/i, '')

      for (let pi = 0; pi < pagesToConvert.length; pi++) {
        const pageNum = pagesToConvert[pi]
        const page = await pdf.getPage(pageNum)
        const viewport = page.getViewport({ scale })

        const canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        const context = canvas.getContext('2d')!

        await page.render({ canvasContext: context, viewport, canvas } as any).promise

        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob(
            (b) => resolve(b!),
            mimeType,
            isJpg ? quality / 100 : undefined
          )
        })

        lastBlob = blob
        zip.file(`${fileName}-page-${pageNum}.${extension}`, blob)

        setProgress(Math.round(((pi + 1) / pagesToConvert.length) * 100))

        canvas.width = 0
        canvas.height = 0
      }

      if (pagesToConvert.length === 1 && lastBlob) {
        saveAs(lastBlob, `${fileName}-page-${pagesToConvert[0]}.${extension}`)
      } else {
        const zipBlob = await zip.generateAsync({ type: 'blob' })
        saveAs(zipBlob, `${fileName}-images.zip`)
      }

      toast.success(`${pagesToConvert.length} page(s) converted to ${extension.toUpperCase()} successfully!`)
    } catch (err) {
      console.error(err)
      toast.error('Failed to convert PDF to images.')
    } finally {
      setProcessing(false)
      setProgress(0)
    }
  }

  return (
    <ToolLayout
      title="PDF to JPG"
      description="Convert PDF pages to high-quality JPG or PNG images."
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

          {/* Format & DPI */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Image Format</Label>
              <Select value={imageFormat} onValueChange={setImageFormat}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jpg">JPG â€” Smaller file size</SelectItem>
                  <SelectItem value="png">PNG â€” Lossless quality</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Resolution (DPI)</Label>
              <Select value={dpiOption} onValueChange={setDpiOption}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(DPI_OPTIONS).map(([key, opt]) => (
                    <SelectItem key={key} value={key}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Quality slider (only for JPG) */}
          {imageFormat === 'jpg' && (
            <>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold">Image Quality</Label>
                  <span className="text-xs font-medium text-[#EE6C4D]">{quality}%</span>
                </div>
                <Slider
                  value={[quality]}
                  onValueChange={(val) => setQuality(val[0])}
                  min={10}
                  max={100}
                  step={1}
                />
                <p className="text-[10px] text-muted-foreground">
                  Higher quality produces larger files. 92% is recommended for most uses.
                </p>
              </div>
              <Separator />
            </>
          )}

          {/* Page Range */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Page Range</Label>
            <Select value={pageRange} onValueChange={setPageRange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pages</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            {pageRange === 'custom' && (
              <div className="space-y-1.5">
                <Input
                  type="text"
                  placeholder="e.g. 1-3, 5, 7-9"
                  onChange={(e) => setPageRange(e.target.value || 'all')}
                  className="w-full"
                />
                <p className="text-[10px] text-muted-foreground">
                  Enter page numbers and ranges separated by commas. Example: 1-3, 5, 7-9
                </p>
              </div>
            )}
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
            Convert to {imageFormat.toUpperCase()}
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

