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
      // Load and re-save to fix structure issues
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true })
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, 'repaired.pdf')
      toast.success('PDF repaired successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to repair PDF. The file may be too corrupted.')
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
