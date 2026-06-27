'use client'

import React, { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { Wrench, Loader2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

export default function RepairPdf({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [processing, setProcessing] = useState(false)

  const handleRepair = async () => {
    if (files.length === 0) { toast.error('Please select a PDF file'); return }
    setProcessing(true)
    try {
      const arrayBuffer = await files[0].arrayBuffer()
      let pdfBlob: Blob
      
      try {
        // Strategy 1: Load and re-save using pdf-lib (fixes structural issues like xref tables)
        const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true })
        const pdfBytes = await pdfDoc.save()
        pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' })
        toast.success('PDF structure repaired successfully!')
      } catch (err) {
        console.warn('pdf-lib failed, trying pdfjs fallback', err)
        // Strategy 2: Fallback to rasterization via pdfjs and jspdf
        const pdfjsLib = await import('pdfjs-dist')
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`
        const { jsPDF } = await import('jspdf')
        
        const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise
        const doc = new jsPDF()
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i)
          const viewport = page.getViewport({ scale: 2.0 })
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')
          canvas.height = viewport.height
          canvas.width = viewport.width
          if (context) await page.render({ canvasContext: context, viewport }).promise
          
          if (i > 1) doc.addPage()
          const imgData = canvas.toDataURL('image/jpeg', 0.95)
          const pdfWidth = doc.internal.pageSize.getWidth()
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width
          doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight)
        }
        pdfBlob = doc.output('blob')
        toast.success('PDF repaired via content extraction (rasterized)!')
      }
      
      saveAs(pdfBlob, 'repaired.pdf')
    } catch (error) {
      console.error(error)
      toast.error('Failed to repair PDF. The file is severely corrupted.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <ToolLayout title="Repair PDF" description="Repair corrupted or damaged PDF files by rebuilding their structure." icon={<Wrench className="h-5 w-5" />} onBack={onBack}>
      <FileDropzone accept=".pdf" multiple={false} files={files} onFilesChange={setFiles} label="Drop a PDF file here" description="Select a damaged PDF to repair" />
      <Button onClick={handleRepair} disabled={processing || files.length === 0} className="w-full" size="lg">
        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
        {processing ? 'Repairing...' : 'Repair & Download'}
      </Button>
    </ToolLayout>
  )
}
