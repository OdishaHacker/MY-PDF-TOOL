'use client'

import React, { useState } from 'react'
import { jsPDF } from 'jspdf'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { ImageIcon, Loader2, Download, Settings2 } from 'lucide-react'
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
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

type FitOption = 'fit' | 'fill' | 'original'

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

export default function JpgToPdf({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  // Advanced features
  const [pageSize, setPageSize] = useState<string>('a4')
  const [customWidth, setCustomWidth] = useState<string>('210')
  const [customHeight, setCustomHeight] = useState<string>('297')
  const [orientation, setOrientation] = useState<string>('portrait')
  const [margin, setMargin] = useState<number>(10)
  const [imageQuality, setImageQuality] = useState<number>(92)
  const [fitOption, setFitOption] = useState<FitOption>('fit')

  const handleConvert = async () => {
    if (files.length === 0) {
      toast.error('Please select at least one image')
      return
    }

    setProcessing(true)
    setProgress(0)

    try {
      let format: string | [number, number]
      if (pageSize === 'custom') {
        format = [Number(customWidth), Number(customHeight)]
      } else {
        format = pageSize
      }

      const pdf = new jsPDF({
        orientation: orientation as 'portrait' | 'landscape',
        unit: 'mm',
        format: format as any,
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      for (let i = 0; i < files.length; i++) {
        if (i > 0) pdf.addPage()

        const file = files[i]
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.readAsDataURL(file)
        })

        const img = new Image()
        await new Promise<void>((resolve) => {
          img.onload = () => resolve()
          img.src = dataUrl
        })

        const imgFormat = file.type === 'image/png' ? 'PNG' : 'JPG'
        const availW = pageWidth - 2 * margin
        const availH = pageHeight - 2 * margin

        let drawX: number, drawY: number, drawW: number, drawH: number

        if (fitOption === 'original') {
          const pxToMm = 25.4 / 96
          drawW = img.width * pxToMm
          drawH = img.height * pxToMm
          drawX = (pageWidth - drawW) / 2
          drawY = (pageHeight - drawH) / 2
        } else if (fitOption === 'fill') {
          const scaleX = availW / img.width
          const scaleY = availH / img.height
          const scale = Math.max(scaleX, scaleY)
          drawW = img.width * scale
          drawH = img.height * scale
          drawX = (pageWidth - drawW) / 2
          drawY = (pageHeight - drawH) / 2
        } else {
          const ratio = Math.min(availW / img.width, availH / img.height)
          drawW = img.width * ratio
          drawH = img.height * ratio
          drawX = (pageWidth - drawW) / 2
          drawY = (pageHeight - drawH) / 2
        }

        pdf.addImage(dataUrl, imgFormat, drawX, drawY, drawW, drawH, undefined, 'FAST')

        setProgress(Math.round(((i + 1) / files.length) * 100))
      }

      pdf.setProperties({
        creator: 'mypdftools.in',
        producer: 'mypdftools.in',
      })

      const blob = pdf.output('blob')
      saveAs(blob, 'images-to-pdf.pdf')
      toast.success(`${files.length} image(s) converted to PDF successfully!`)
    } catch (err) {
      console.error(err)
      toast.error('Failed to convert images to PDF.')
    } finally {
      setProcessing(false)
      setProgress(0)
    }
  }

  return (
    <ToolLayout
      title="JPG to PDF"
      description="Convert JPG, PNG, or WebP images to a PDF document."
      icon={<ImageIcon className="h-5 w-5" />}
      onBack={onBack}
    >
      <FileDropzone
        accept=".jpg,.jpeg,.png,.webp"
        multiple={true}
        files={files}
        onFilesChange={setFiles}
        label="Drop images here or click to browse"
        description="Supports JPG, PNG, WebP — up to 50 images"
      />

      {files.length > 0 && (
        <div className="rounded-xl border bg-muted/30 p-4 space-y-1">
          <p className="text-sm font-medium">Selected Images</p>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Count:</span>
            <span className="font-medium">{files.length} image(s)</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total size:</span>
            <span className="font-medium">{formatSize(files.reduce((acc, f) => acc + f.size, 0))}</span>
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className="rounded-xl border bg-muted/20 p-5 space-y-5">
          <div className="flex items-center gap-2 mb-1">
            <Settings2 className="h-4 w-4 text-[#EE6C4D]" />
            <Label className="text-sm font-semibold">Advanced Settings</Label>
          </div>

          {/* Page Size & Orientation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Page Size</Label>
              <Select value={pageSize} onValueChange={setPageSize}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a4">A4 (210 × 297 mm)</SelectItem>
                  <SelectItem value="letter">Letter (216 × 279 mm)</SelectItem>
                  <SelectItem value="legal">Legal (216 × 356 mm)</SelectItem>
                  <SelectItem value="custom">Custom Size</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Orientation</Label>
              <Select value={orientation} onValueChange={setOrientation}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="portrait">Portrait</SelectItem>
                  <SelectItem value="landscape">Landscape</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Custom Size */}
          {pageSize === 'custom' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="custom-width" className="text-xs text-muted-foreground">Width (mm)</Label>
                <Input
                  id="custom-width"
                  type="number"
                  min="1"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(e.target.value)}
                  placeholder="210"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-height" className="text-xs text-muted-foreground">Height (mm)</Label>
                <Input
                  id="custom-height"
                  type="number"
                  min="1"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(e.target.value)}
                  placeholder="297"
                />
              </div>
            </div>
          )}

          <Separator />

          {/* Fit Option */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Image Fit</Label>
            <RadioGroup
              value={fitOption}
              onValueChange={(val) => setFitOption(val as FitOption)}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <Label
                htmlFor="fit-page"
                className={`flex flex-col items-center gap-2 rounded-xl border p-4 cursor-pointer transition-all ${
                  fitOption === 'fit'
                    ? 'border-[#EE6C4D] bg-[#EE6C4D]/5 shadow-sm'
                    : 'border-muted hover:border-muted-foreground/30'
                }`}
              >
                <RadioGroupItem value="fit" id="fit-page" />
                <div className="text-center">
                  <p className="text-sm font-medium">Fit to Page</p>
                  <p className="text-[10px] text-muted-foreground">Maintain aspect ratio</p>
                </div>
              </Label>
              <Label
                htmlFor="fill-page"
                className={`flex flex-col items-center gap-2 rounded-xl border p-4 cursor-pointer transition-all ${
                  fitOption === 'fill'
                    ? 'border-[#EE6C4D] bg-[#EE6C4D]/5 shadow-sm'
                    : 'border-muted hover:border-muted-foreground/30'
                }`}
              >
                <RadioGroupItem value="fill" id="fill-page" />
                <div className="text-center">
                  <p className="text-sm font-medium">Fill Page</p>
                  <p className="text-[10px] text-muted-foreground">May crop edges</p>
                </div>
              </Label>
              <Label
                htmlFor="original-size"
                className={`flex flex-col items-center gap-2 rounded-xl border p-4 cursor-pointer transition-all ${
                  fitOption === 'original'
                    ? 'border-[#EE6C4D] bg-[#EE6C4D]/5 shadow-sm'
                    : 'border-muted hover:border-muted-foreground/30'
                }`}
              >
                <RadioGroupItem value="original" id="original-size" />
                <div className="text-center">
                  <p className="text-sm font-medium">Original Size</p>
                  <p className="text-[10px] text-muted-foreground">Pixel-based sizing</p>
                </div>
              </Label>
            </RadioGroup>
          </div>

          <Separator />

          {/* Margin & Quality */}
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">Page Margin</Label>
                <span className="text-xs font-medium text-[#EE6C4D]">{margin} mm</span>
              </div>
              <Slider
                value={[margin]}
                onValueChange={(val) => setMargin(val[0])}
                min={0}
                max={40}
                step={1}
              />
              <p className="text-[10px] text-muted-foreground">Margin around the image on each page</p>
            </div>

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
                Higher quality produces larger files. 92% is recommended for most uses.
              </p>
            </div>
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
            Convert to PDF
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
