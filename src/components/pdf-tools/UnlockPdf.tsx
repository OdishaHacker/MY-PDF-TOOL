'use client'

import React, { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { Unlock, Loader2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

export default function UnlockPdf({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [password, setPassword] = useState('')
  const [processing, setProcessing] = useState(false)

  const handleUnlock = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file')
      return
    }
    if (!password) {
      toast.error('Please enter the password')
      return
    }
    setProcessing(true)
    try {
      const arrayBuffer = await files[0].arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer, { password })

      // Save without password
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, 'unlocked.pdf')
      toast.success('PDF unlocked successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to unlock PDF. Check your password.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <ToolLayout
      title="Unlock PDF"
      description="Remove password protection from a PDF file."
      icon={<Unlock className="h-5 w-5" />}
      onBack={onBack}
    >
      <FileDropzone
        accept=".pdf"
        multiple={false}
        files={files}
        onFilesChange={setFiles}
        label="Drop a protected PDF file here"
        description="Select a password-protected PDF"
      />
      <div className="space-y-2">
        <Label htmlFor="unlockPassword">PDF Password</Label>
        <Input
          id="unlockPassword"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter the PDF password"
        />
      </div>
      <Button onClick={handleUnlock} disabled={processing || files.length === 0} className="w-full" size="lg">
        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
        {processing ? 'Unlocking...' : 'Unlock & Download'}
      </Button>
    </ToolLayout>
  )
}
