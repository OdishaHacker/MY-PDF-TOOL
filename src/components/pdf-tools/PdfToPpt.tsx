'use client'

import React, { useState } from 'react'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { Presentation, Loader2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

export default function PdfToPpt({ onBack }: { onBack: () => void }) {
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

      // Render each page as image and create a simple PPT-like download
      // Note: Full PPTX creation requires pptxgenjs, using image-based approach
      const { default: PptxGenJS } = await import('pptxgenjs')
      const pptx = new PptxGenJS()

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const viewport = page.getViewport({ scale: 2 })
        const canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        const ctx = canvas.getContext('2d')!
        await page.render({ canvasContext: ctx, viewport }).promise

        const imgData = canvas.toDataURL('image/png')
        const slide = pptx.addSlide()
        slide.addImage({ data: imgData, x: 0, y: 0, w: '100%', h: '100%' })
      }

      const pptxBuf = await pptx.write({ outputType: 'arraybuffer' }) as ArrayBuffer
      const blob = new Blob([pptxBuf], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' })
      saveAs(blob, 'converted.pptx')
      toast.success('PDF converted to PowerPoint successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to convert PDF to PowerPoint. Try a smaller PDF.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <ToolLayout title="PDF to PowerPoint" description="Convert PDF pages into PowerPoint slides." icon={<Presentation className="h-5 w-5" />} onBack={onBack}>
      <FileDropzone accept=".pdf" multiple={false} files={files} onFilesChange={setFiles} label="Drop a PDF file here" description="Select a PDF to convert to PowerPoint" />
      <Button onClick={handleConvert} disabled={processing || files.length === 0} className="w-full" size="lg">
        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
        {processing ? 'Converting...' : 'Convert to PowerPoint'}
      </Button>
    </ToolLayout>
  )
}
