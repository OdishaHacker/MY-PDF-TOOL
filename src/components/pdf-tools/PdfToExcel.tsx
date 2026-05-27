'use client'

import React, { useState } from 'react'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import { toast } from 'sonner'
import { Table, Loader2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

export default function PdfToExcel({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [processing, setProcessing] = useState(false)

  const handleConvert = async () => {
    if (files.length === 0) { toast.error('Please select a PDF file'); return }
    setProcessing(true)
    try {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`
      const arrayBuffer = await files[0].arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise
      const wb = XLSX.utils.book_new()

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        const rows: string[][] = []
        let currentRow: string[] = []
        let lastY: number | null = null

        for (const item of textContent.items as any[]) {
          if (lastY !== null && Math.abs(item.transform[5] - lastY) > 3) {
            rows.push(currentRow)
            currentRow = []
          }
          currentRow.push(item.str.trim())
          lastY = item.transform[5]
        }
        if (currentRow.length > 0) rows.push(currentRow)

        const ws = XLSX.utils.aoa_to_sheet(rows)
        XLSX.utils.book_append_sheet(wb, ws, `Page ${i}`)
      }

      const xlsxBuf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
      const blob = new Blob([xlsxBuf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      saveAs(blob, 'converted.xlsx')
      toast.success('PDF converted to Excel successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to convert PDF to Excel.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <ToolLayout title="PDF to Excel" description="Extract data from PDF into Excel spreadsheets." icon={<Table className="h-5 w-5" />} onBack={onBack}>
      <FileDropzone accept=".pdf" multiple={false} files={files} onFilesChange={setFiles} label="Drop a PDF file here" description="Select a PDF to convert to Excel" />
      <Button onClick={handleConvert} disabled={processing || files.length === 0} className="w-full" size="lg">
        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
        {processing ? 'Converting...' : 'Convert to Excel'}
      </Button>
    </ToolLayout>
  )
}
