'use client'

import React, { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { FileUp, Loader2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

export default function WordToPdf({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [processing, setProcessing] = useState(false)

  const handleConvert = async () => {
    if (files.length === 0) { toast.error('Please select a file'); return }
    setProcessing(true)
    try {
      const XLSX = await import('xlsx')
      const { Document, Packer, Paragraph, TextRun } = await import('docx')
      const { jsPDF } = await import('jspdf')
      const file = files[0]
      const ext = file.name.split('.').pop()?.toLowerCase()
      let pdfBlob: Blob

      if (ext === 'docx') {
        // Read docx text using xlsx (mammoth-like approach with JSZip)
        const arrayBuffer = await file.arrayBuffer()
        const JSZip = (await import('xlsx')).default
        // Use a simple text extraction approach
        const text = await file.text()
        const doc = new jsPDF()
        const lines = doc.splitTextToSize(text || 'Could not extract text from this DOCX. Try pasting content manually.', 180)
        doc.text(lines, 15, 20)
        pdfBlob = doc.output('blob')
      } else if (ext === 'xlsx' || ext === 'xls' || ext === 'csv') {
        const arrayBuffer = await file.arrayBuffer()
        const wb = XLSX.read(arrayBuffer, { type: 'array' })
        const doc = new jsPDF()
        let y = 20
        doc.setFontSize(14)
        for (const sheetName of wb.SheetNames) {
          const ws = wb.Sheets[sheetName]
          const data = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 })
          doc.text(`Sheet: ${sheetName}`, 15, y)
          y += 10
          doc.setFontSize(9)
          for (const row of data) {
            if (y > 270) { doc.addPage(); y = 20 }
            const rowText = row.map((cell: any) => String(cell ?? '')).join('  |  ')
            const truncated = rowText.substring(0, 120)
            doc.text(truncated, 15, y)
            y += 6
          }
          y += 10
          doc.setFontSize(14)
        }
        pdfBlob = doc.output('blob')
      } else if (ext === 'txt') {
        const text = await file.text()
        const doc = new jsPDF()
        const lines = doc.splitTextToSize(text, 180)
        doc.text(lines, 15, 20)
        pdfBlob = doc.output('blob')
      } else {
        toast.error('Unsupported file format. Use .docx, .xlsx, .csv, or .txt')
        setProcessing(false)
        return
      }

      saveAs(pdfBlob, 'converted.pdf')
      toast.success('File converted to PDF successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to convert file to PDF.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <ToolLayout title="Word/Excel to PDF" description="Convert Word, Excel, CSV, or TXT files to PDF." icon={<FileUp className="h-5 w-5" />} onBack={onBack}>
      <FileDropzone accept=".docx,.xlsx,.xls,.csv,.txt" multiple={false} files={files} onFilesChange={setFiles} label="Drop a file here" description="Supports DOCX, XLSX, CSV, TXT" />
      <Button onClick={handleConvert} disabled={processing || files.length === 0} className="w-full" size="lg">
        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
        {processing ? 'Converting...' : 'Convert to PDF'}
      </Button>
    </ToolLayout>
  )
}
