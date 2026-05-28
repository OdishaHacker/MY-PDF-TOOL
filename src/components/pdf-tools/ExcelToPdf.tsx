'use client'

import React, { useState } from 'react'
import { jsPDF } from 'jspdf'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import { toast } from 'sonner'
import { Table, Loader2, Download, Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
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

export default function ExcelToPdf({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  // Advanced features
  const [orientation, setOrientation] = useState<string>('landscape')
  const [fontSize, setFontSize] = useState<number>(8)
  const [margin, setMargin] = useState<number>(15)
  const [includeGridLines, setIncludeGridLines] = useState<boolean>(true)

  const handleConvert = async () => {
    if (files.length === 0) {
      toast.error('Please select an Excel file')
      return
    }

    setProcessing(true)
    setProgress(0)

    try {
      const file = files[0]
      const buffer = await file.arrayBuffer()
      const workbook = XLSX.read(buffer, { type: 'array' })

      const pdf = new jsPDF({
        orientation: orientation as 'portrait' | 'landscape',
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      let firstSheet = true
      let totalSheets = workbook.SheetNames.length

      for (let si = 0; si < workbook.SheetNames.length; si++) {
        const sheetName = workbook.SheetNames[si]
        const sheet = workbook.Sheets[sheetName]
        const data: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 })

        if (!firstSheet) pdf.addPage()
        firstSheet = false

        pdf.setFontSize(fontSize + 4)
        pdf.text(sheetName, margin, margin + 5)

        pdf.setFontSize(fontSize)

        const maxCols = data[0]?.length || 1
        const colWidth = Math.min(40, (pageWidth - margin * 2) / Math.max(maxCols, 1))
        const rowHeight = fontSize * 0.5

        let y = margin + 15

        for (let ri = 0; ri < data.length; ri++) {
          if (y > pageHeight - margin) {
            pdf.addPage()
            y = margin
          }

          const row = data[ri] as string[]
          let x = margin

          for (let c = 0; c < maxCols; c++) {
            const cellValue = String(row?.[c] ?? '')

            if (includeGridLines) {
              pdf.setDrawColor(200, 200, 200)
              pdf.rect(x, y - rowHeight * 0.7, colWidth, rowHeight * 1.2)
            }

            pdf.text(cellValue.slice(0, 20), x + 1, y)
            x += colWidth
          }

          y += rowHeight * 1.2
        }

        setProgress(Math.round(((si + 1) / totalSheets) * 100))
      }

      pdf.setProperties({
        creator: 'mypdftools.in',
        producer: 'mypdftools.in',
      })

      const blob = pdf.output('blob')
      const fileName = files[0].name.replace(/\.(xlsx|xls)$/i, '')
      saveAs(blob, `${fileName}-converted.pdf`)
      toast.success('Excel file converted to PDF successfully!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to convert Excel file. Please ensure it is a valid .xlsx file.')
    } finally {
      setProcessing(false)
      setProgress(0)
    }
  }

  return (
    <ToolLayout
      title="Excel to PDF"
      description="Convert Excel (.xlsx) spreadsheets to PDF documents."
      icon={<Table className="h-5 w-5" />}
      onBack={onBack}
    >
      <FileDropzone
        accept=".xlsx,.xls"
        multiple={false}
        files={files}
        onFilesChange={setFiles}
        label="Drop an Excel file here"
        description="Supports .xlsx and .xls files"
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

          {/* Orientation */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Orientation</Label>
            <Select value={orientation} onValueChange={setOrientation}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="landscape">Landscape</SelectItem>
                <SelectItem value="portrait">Portrait</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Font Size */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Font Size</Label>
              <span className="text-xs font-medium text-[#EE6C4D]">{fontSize}pt</span>
            </div>
            <Slider
              value={[fontSize]}
              onValueChange={(val) => setFontSize(val[0])}
              min={5}
              max={16}
              step={1}
            />
            <p className="text-[10px] text-muted-foreground">
              Smaller font fits more data per page. 8pt is recommended for most spreadsheets.
            </p>
          </div>

          <Separator />

          {/* Margin */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Page Margin</Label>
              <span className="text-xs font-medium text-[#EE6C4D]">{margin}mm</span>
            </div>
            <Slider
              value={[margin]}
              onValueChange={(val) => setMargin(val[0])}
              min={5}
              max={40}
              step={1}
            />
          </div>

          <Separator />

          {/* Grid Lines */}
          <div className="flex items-center gap-3">
            <Checkbox
              id="gridlines"
              checked={includeGridLines}
              onCheckedChange={(checked) => setIncludeGridLines(checked === true)}
            />
            <div>
              <Label htmlFor="gridlines" className="text-sm font-medium cursor-pointer">
                Include Grid Lines
              </Label>
              <p className="text-[10px] text-muted-foreground">
                Draw cell borders around each data cell
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
