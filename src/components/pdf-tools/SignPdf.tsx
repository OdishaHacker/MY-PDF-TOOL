'use client'

import React, { useState, useRef, useEffect } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { PenTool, Loader2, Download, Eraser } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

export default function SignPdf({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [processing, setProcessing] = useState(false)
  const [signing, setSigning] = useState(false)
  const [penSize, setPenSize] = useState(3)
  const [penColor, setPenColor] = useState('#000000')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [signing])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    ctx.beginPath()
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    ctx.lineWidth = penSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = penColor
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const handleSign = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file')
      return
    }
    setProcessing(true)
    try {
      const canvas = canvasRef.current
      if (!canvas) return

      const signatureDataUrl = canvas.toDataURL('image/png')
      const arrayBuffer = await files[0].arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)

      const signatureImage = await pdfDoc.embedPng(await (await fetch(signatureDataUrl)).arrayBuffer())
      const pages = pdfDoc.getPages()

      if (pages.length > 0) {
        const lastPage = pages[pages.length - 1]
        const { width, height } = lastPage.getSize()
        const sigWidth = 200
        const sigHeight = 80
        lastPage.drawImage(signatureImage, {
          x: width - sigWidth - 50,
          y: 50,
          width: sigWidth,
          height: sigHeight,
        })
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, 'signed.pdf')
      toast.success('PDF signed successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to sign PDF.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <ToolLayout
      title="Sign PDF"
      description="Draw your signature and place it on your PDF document."
      icon={<PenTool className="h-5 w-5" />}
      onBack={onBack}
    >
      <FileDropzone
        accept=".pdf"
        multiple={false}
        files={files}
        onFilesChange={setFiles}
        label="Drop a PDF file here"
        description="Select a PDF to sign"
      />
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Draw Your Signature</Label>
            <Button variant="outline" size="sm" onClick={clearCanvas}>
              <Eraser className="h-4 w-4 mr-1" /> Clear
            </Button>
          </div>
          <div className="flex gap-4 items-center mb-2">
            <div className="flex items-center gap-2">
              <Label className="text-xs">Pen Size: {penSize}</Label>
              <Slider value={[penSize]} onValueChange={([v]) => setPenSize(v)} min={1} max={8} step={1} className="w-24" />
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-xs">Color:</Label>
              <input type="color" value={penColor} onChange={(e) => setPenColor(e.target.value)} className="h-6 w-8 cursor-pointer" />
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden bg-white">
            <canvas
              ref={canvasRef}
              width={500}
              height={200}
              className="w-full cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>
          <p className="text-xs text-muted-foreground">Signature will be placed at the bottom-right of the last page.</p>
        </div>
      )}
      <Button onClick={handleSign} disabled={processing || files.length === 0} className="w-full" size="lg">
        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
        {processing ? 'Signing...' : 'Sign & Download'}
      </Button>
    </ToolLayout>
  )
}
