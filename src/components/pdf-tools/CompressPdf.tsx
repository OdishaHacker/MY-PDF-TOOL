'use client'

import React, { useState } from 'react'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { FileDown, Loader2, Download, Minimize2, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

type CompressionMode = 'preset' | 'custom'

interface CompressionLevel {
  label: string
  description: string
  quality: number
  scale: number
}

const COMPRESSION_LEVELS: Record<string, CompressionLevel> = {
  low: { label: 'Low Compression', description: 'Better quality, larger file (60% quality)', quality: 0.6, scale: 1.5 },
  medium: { label: 'Medium Compression', description: 'Balanced quality and size (40% quality)', quality: 0.4, scale: 1.2 },
  high: { label: 'High Compression', description: 'Smallest file, lower quality (20% quality)', quality: 0.2, scale: 1.0 },
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

export default function CompressPdf({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [compressionMode, setCompressionMode] = useState<CompressionMode>('preset')
  const [compressionLevel, setCompressionLevel] = useState<string>('medium')
  const [targetSize, setTargetSize] = useState<string>('')
  const [targetUnit, setTargetUnit] = useState<string>('KB')
  const [result, setResult] = useState<{
    original: number
    compressed: number
    quality: number
    scale: number
  } | null>(null)

  const originalSize = files.length > 0 ? files[0].size : 0

  const getTargetSizeBytes = (): number | null => {
    if (!targetSize || isNaN(Number(targetSize)) || Number(targetSize) <= 0) return null
    const value = Number(targetSize)
    return targetUnit === 'KB' ? value * 1024 : value * 1024 * 1024
  }

  const handleCompress = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file')
      return
    }

    if (compressionMode === 'custom') {
      const target = getTargetSizeBytes()
      if (!target) {
        toast.error('Please enter a valid target size')
        return
      }
      if (target >= originalSize) {
        toast.error('Target size must be smaller than the original file size')
        return
      }
    }

    setProcessing(true)
    setResult(null)
    setProgress(0)

    try {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.7.284/build/pdf.worker.min.mjs'

      const jsPDF = (await import('jspdf')).default

      const arrayBuffer = await files[0].arrayBuffer()
      const originalSizeBytes = arrayBuffer.byteLength

      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      const totalPages = pdf.numPages

      let quality: number
      let scale: number

      if (compressionMode === 'preset') {
        const level = COMPRESSION_LEVELS[compressionLevel]
        quality = level.quality
        scale = level.scale
      } else {
        quality = 0.6
        scale = 1.0
      }

      const compressWithParams = async (q: number, s: number): Promise<Blob> => {
        const pageImages: { dataUrl: string; width: number; height: number }[] = []

        for (let i = 1; i <= totalPages; i++) {
          const page = await pdf.getPage(i)
          const viewport = page.getViewport({ scale: s })

          const canvas = document.createElement('canvas')
          canvas.width = viewport.width
          canvas.height = viewport.height
          const context = canvas.getContext('2d')!

          await page.render({ canvasContext: context, viewport, canvas } as any).promise

          const dataUrl = canvas.toDataURL('image/jpeg', q)
          pageImages.push({
            dataUrl,
            width: viewport.width,
            height: viewport.height,
          })

          setProgress(Math.round((i / totalPages) * 100))

          canvas.width = 0
          canvas.height = 0
        }

        const firstImage = pageImages[0]
        const pdfDoc = new jsPDF({
          orientation: firstImage.width > firstImage.height ? 'landscape' : 'portrait',
          unit: 'px',
          format: [firstImage.width, firstImage.height],
        })

        pdfDoc.setProperties({
          creator: 'mypdftools.in',
          producer: 'mypdftools.in',
        })

        for (let i = 0; i < pageImages.length; i++) {
          if (i > 0) {
            pdfDoc.addPage(
              [pageImages[i].width, pageImages[i].height],
              pageImages[i].width > pageImages[i].height ? 'landscape' : 'portrait'
            )
          }
          pdfDoc.addImage(pageImages[i].dataUrl, 'JPEG', 0, 0, pageImages[i].width, pageImages[i].height, undefined, 'FAST')
        }

        return pdfDoc.output('blob')
      }

      let compressedBlob: Blob

      if (compressionMode === 'preset') {
        compressedBlob = await compressWithParams(quality, scale)
      } else {
        const targetBytes = getTargetSizeBytes()!
        let bestBlob: Blob | null = null
        let bestQuality = quality
        let bestScale = scale

        const scalesToTry = [1.5, 1.2, 1.0]

        for (const tryScale of scalesToTry) {
          let lowQ = 0.05
          let highQ = 0.8

          for (let iteration = 0; iteration < 6; iteration++) {
            const midQ = (lowQ + highQ) / 2
            const blob = await compressWithParams(midQ, tryScale)

            if (blob.size <= targetBytes) {
              if (!bestBlob || blob.size > bestBlob.size) {
                bestBlob = blob
                bestQuality = midQ
                bestScale = tryScale
              }
              lowQ = midQ
            } else {
              highQ = midQ
            }

            if (blob.size <= targetBytes * 1.05 && blob.size >= targetBytes * 0.5) {
              bestBlob = blob
              bestQuality = midQ
              bestScale = tryScale
              break
            }
          }

          if (bestBlob && bestBlob.size <= targetBytes) break
        }

        if (!bestBlob) {
          bestBlob = await compressWithParams(0.05, 1.0)
          bestQuality = 0.05
          bestScale = 1.0
        }

        compressedBlob = bestBlob
        quality = bestQuality
        scale = bestScale
      }

      const compressedSize = compressedBlob.size
      const fileName = files[0].name.replace(/\.pdf$/i, '')
      saveAs(compressedBlob, `${fileName}-compressed.pdf`)

      setResult({
        original: originalSizeBytes,
        compressed: compressedSize,
        quality,
        scale,
      })

      const reduction = ((1 - compressedSize / originalSizeBytes) * 100).toFixed(1)
      toast.success(`PDF compressed! Size reduced by ${reduction}%`)
    } catch (error) {
      console.error(error)
      toast.error('Failed to compress PDF. The file may be corrupted or too large.')
    } finally {
      setProcessing(false)
      setProgress(0)
    }
  }

  const targetSizeBytes = getTargetSizeBytes()

  return (
    <ToolLayout
      title="Compress PDF"
      description="Reduce PDF file size by rendering pages as compressed images for real file size reduction."
      icon={<FileDown className="h-5 w-5" />}
      onBack={onBack}
    >
      <FileDropzone
        accept=".pdf"
        multiple={false}
        files={files}
        onFilesChange={setFiles}
        label="Drop a PDF file here"
        description="Select a PDF to compress"
      />

      {files.length > 0 && (
        <div className="rounded-xl border bg-muted/30 p-4 space-y-1">
          <p className="text-sm font-medium">Current File</p>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">File name:</span>
            <span className="truncate max-w-[60%] text-right">{files[0].name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Original size:</span>
            <span className="font-medium">{formatSize(originalSize)}</span>
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className="rounded-xl border bg-muted/20 p-5 space-y-5">
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Compression Method</Label>
            <RadioGroup
              value={compressionMode}
              onValueChange={(val) => setCompressionMode(val as CompressionMode)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              <Label
                htmlFor="mode-preset"
                className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all ${
                  compressionMode === 'preset'
                    ? 'border-[#EE6C4D] bg-[#EE6C4D]/5 shadow-sm'
                    : 'border-muted hover:border-muted-foreground/30'
                }`}
              >
                <RadioGroupItem value="preset" id="mode-preset" />
                <div>
                  <p className="text-sm font-medium">Preset Level</p>
                  <p className="text-xs text-muted-foreground">Choose Low, Medium, or High</p>
                </div>
              </Label>
              <Label
                htmlFor="mode-custom"
                className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all ${
                  compressionMode === 'custom'
                    ? 'border-[#EE6C4D] bg-[#EE6C4D]/5 shadow-sm'
                    : 'border-muted hover:border-muted-foreground/30'
                }`}
              >
                <RadioGroupItem value="custom" id="mode-custom" />
                <div>
                  <p className="text-sm font-medium">Target Size</p>
                  <p className="text-xs text-muted-foreground">Specify desired file size</p>
                </div>
              </Label>
            </RadioGroup>
          </div>

          {compressionMode === 'preset' && (
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Compression Level</Label>
              <RadioGroup
                value={compressionLevel}
                onValueChange={setCompressionLevel}
                className="space-y-2"
              >
                {Object.entries(COMPRESSION_LEVELS).map(([key, level]) => (
                  <Label
                    key={key}
                    htmlFor={`level-${key}`}
                    className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all ${
                      compressionLevel === key
                        ? 'border-[#EE6C4D] bg-[#EE6C4D]/5 shadow-sm'
                        : 'border-muted hover:border-muted-foreground/30'
                    }`}
                  >
                    <RadioGroupItem value={key} id={`level-${key}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{level.label}</p>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#EE6C4D]/10 text-[#EE6C4D]">
                          {Math.round(level.quality * 100)}% quality
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{level.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Scale: {level.scale}x</p>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
              <p className="text-xs text-muted-foreground mt-2">
                Compression works by rendering each page as a JPEG image at the specified quality level and scale,
                then rebuilding the PDF. Lower quality and scale produce smaller files.
              </p>
            </div>
          )}

          {compressionMode === 'custom' && (
            <div className="space-y-4">
              <Label className="text-sm font-semibold">
                <span className="inline-flex items-center gap-1.5">
                  <Target className="h-4 w-4" />
                  Target File Size
                </span>
              </Label>
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <Label htmlFor="target-size" className="text-xs text-muted-foreground mb-1.5 block">
                    Size
                  </Label>
                  <Input
                    id="target-size"
                    type="number"
                    min="1"
                    step="any"
                    placeholder="e.g. 500"
                    value={targetSize}
                    onChange={(e) => setTargetSize(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-24">
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Unit</Label>
                  <Select value={targetUnit} onValueChange={setTargetUnit}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="KB">KB</SelectItem>
                      <SelectItem value="MB">MB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {targetSizeBytes && (
                <div className="rounded-lg border bg-muted/30 p-3 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Original:</span>
                    <span className="font-medium">{formatSize(originalSize)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Target:</span>
                    <span className="font-medium text-[#EE6C4D]">{formatSize(targetSizeBytes)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Target reduction:</span>
                    <span className="font-medium">
                      {Math.max(0, ((1 - targetSizeBytes / originalSize) * 100)).toFixed(1)}%
                    </span>
                  </div>
                  {targetSizeBytes >= originalSize && (
                    <p className="text-xs text-red-500 mt-1">
                      Target size must be smaller than the original file size.
                    </p>
                  )}
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                The tool will automatically find the best quality level to meet your target size.
                It may try multiple quality settings, which can take a moment for large files.
              </p>
            </div>
          )}
        </div>
      )}

      <Button
        onClick={handleCompress}
        disabled={processing || files.length === 0 || (compressionMode === 'custom' && (!targetSizeBytes || targetSizeBytes >= originalSize))}
        className="w-full"
        size="lg"
      >
        {processing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Compressing... {progress > 0 ? `${progress}%` : ''}
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            Compress & Download
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

      {result && (
        <div className="rounded-xl border bg-muted/30 p-5 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <Minimize2 className="h-4 w-4 text-green-600" />
            <p className="text-sm font-semibold">Compression Results</p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg border bg-background p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Original</p>
              <p className="text-sm font-bold">{formatSize(result.original)}</p>
            </div>
            <div className="rounded-lg border bg-background p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Compressed</p>
              <p className="text-sm font-bold text-green-600">{formatSize(result.compressed)}</p>
            </div>
            <div className="rounded-lg border bg-background p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Reduction</p>
              <p className="text-sm font-bold text-[#EE6C4D]">
                {((1 - result.compressed / result.original) * 100).toFixed(1)}%
              </p>
            </div>
          </div>

          <div className="flex justify-between text-xs text-muted-foreground pt-1">
            <span>JPEG Quality: {Math.round(result.quality * 100)}%</span>
            <span>Render Scale: {result.scale}x</span>
            <span>Saved: {formatSize(result.original - result.compressed)}</span>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-16">Before</span>
              <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-foreground/30 rounded-full" style={{ width: '100%' }} />
              </div>
              <span className="w-20 text-right">{formatSize(result.original)}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-16">After</span>
              <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(3, (result.compressed / result.original) * 100)}%` }}
                />
              </div>
              <span className="w-20 text-right font-medium text-green-600">{formatSize(result.compressed)}</span>
            </div>
          </div>
        </div>
      )}
    </ToolLayout>
  )
}

