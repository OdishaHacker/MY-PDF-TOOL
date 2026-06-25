'use client'

import React, { useState } from 'react'
import { jsPDF } from 'jspdf'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { Code, Loader2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

export default function HtmlToPdf({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [htmlContent, setHtmlContent] = useState('')
  const [mode, setMode] = useState<'file' | 'text'>('text')
  const [processing, setProcessing] = useState(false)

  const handleConvert = async () => {
    setProcessing(true)
    try {
      let html = htmlContent
      if (mode === 'file' && files.length > 0) {
        html = await files[0].text()
      }
      if (!html.trim()) { toast.error('Please provide HTML content'); setProcessing(false); return }

      const html2canvas = (await import('html2canvas-pro')).default
      const container = document.createElement('div')
      container.innerHTML = html
      container.style.position = 'absolute'
      container.style.left = '-9999px'
      container.style.width = '794px'
      container.style.padding = '40px'
      container.style.background = 'white'
      container.style.fontFamily = 'Arial, sans-serif'
      container.style.fontSize = '14px'
      container.style.lineHeight = '1.6'
      document.body.appendChild(container)

      const canvas = await html2canvas(container, { scale: 2, useCORS: true })
      document.body.removeChild(container)

      const doc = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210 // A4 width
      const pageHeight = 297 // A4 height
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let currentPosition = 0

      const imgData = canvas.toDataURL('image/png')
      doc.addImage(imgData, 'PNG', 0, currentPosition, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        currentPosition -= pageHeight
        doc.addPage()
        doc.addImage(imgData, 'PNG', 0, currentPosition, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      const blob = doc.output('blob')
      saveAs(blob, 'converted.pdf')
      toast.success('HTML converted to PDF successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to convert HTML to PDF.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <ToolLayout title="HTML to PDF" description="Convert HTML content or files to PDF documents." icon={<Code className="h-5 w-5" />} onBack={onBack}>
      <div className="flex gap-2 mb-2">
        <Button variant={mode === 'text' ? 'default' : 'outline'} size="sm" onClick={() => setMode('text')}>Paste HTML</Button>
        <Button variant={mode === 'file' ? 'default' : 'outline'} size="sm" onClick={() => setMode('file')}>Upload HTML File</Button>
      </div>
      {mode === 'text' ? (
        <div className="space-y-2">
          <Label>HTML Content</Label>
          <Textarea value={htmlContent} onChange={(e) => setHtmlContent(e.target.value)} placeholder="<h1>Hello World</h1><p>Your HTML here...</p>" className="min-h-48 font-mono text-sm" />
        </div>
      ) : (
        <FileDropzone accept=".html,.htm" multiple={false} files={files} onFilesChange={setFiles} label="Drop an HTML file here" description="Supports .html and .htm files" />
      )}
      <Button onClick={handleConvert} disabled={processing || (mode === 'text' ? !htmlContent.trim() : files.length === 0)} className="w-full" size="lg">
        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
        {processing ? 'Converting...' : 'Convert to PDF'}
      </Button>
    </ToolLayout>
  )
}
