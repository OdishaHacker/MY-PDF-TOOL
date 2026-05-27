'use client'

import React, { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { FileDown, Loader2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

export default function CompressPdf({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<{ original: number; compressed: number } | null>(null)

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  const handleCompress = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file')
      return
    }
    setProcessing(true)
    setResult(null)
    try {
      const arrayBuffer = await files[0].arrayBuffer()
      const originalSize = arrayBuffer.byteLength
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true })

      // Remove metadata to reduce size
      pdfDoc.setTitle('')
      pdfDoc.setAuthor('')
      pdfDoc.setSubject('')
      pdfDoc.setKeywords([])
      pdfDoc.setProducer('')
      pdfDoc.setCreator('')

      const pdfBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      })

      const compressedSize = pdfBytes.byteLength
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, 'compressed.pdf')
      setResult({ original: originalSize, compressed: compressedSize })

      const reduction = ((1 - compressedSize / originalSize) * 100).toFixed(1)
      toast.success(`PDF compressed! Size reduced by ${reduction}%`)
    } catch (error) {
      console.error(error)
      toast.error('Failed to compress PDF.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <ToolLayout
      title="Compress PDF"
      description="Reduce PDF file size by removing metadata and optimizing structure."
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
      <Button onClick={handleCompress} disabled={processing || files.length === 0} className="w-full" size="lg">
        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
        {processing ? 'Compressing...' : 'Compress & Download'}
      </Button>
      {result && (
        <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
          <p className="text-sm font-medium">Compression Results:</p>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Original:</span>
            <span>{formatSize(result.original)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Compressed:</span>
            <span className="font-medium text-green-600">{formatSize(result.compressed)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Reduction:</span>
            <span className="font-medium">
              {((1 - result.compressed / result.original) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      )}
    </ToolLayout>
  )
}
