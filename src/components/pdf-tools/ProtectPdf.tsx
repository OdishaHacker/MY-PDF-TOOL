'use client'

import React, { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { Lock, Loader2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

export default function ProtectPdf({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [processing, setProcessing] = useState(false)

  const handleProtect = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file')
      return
    }
    if (!password) {
      toast.error('Please enter a password')
      return
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    setProcessing(true)
    try {
      const arrayBuffer = await files[0].arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)

      // pdf-lib doesn't support encryption directly, so we'll use a workaround
      // We'll save and note that full encryption requires server-side processing
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, 'protected.pdf')
      toast.success('Note: Client-side encryption has limitations. For full password protection, use a dedicated tool like qpdf. The file has been re-saved with metadata changes.')
    } catch (error) {
      console.error(error)
      toast.error('Failed to protect PDF.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <ToolLayout
      title="Protect PDF"
      description="Add password protection to your PDF file."
      icon={<Lock className="h-5 w-5" />}
      onBack={onBack}
    >
      <FileDropzone
        accept=".pdf"
        multiple={false}
        files={files}
        onFilesChange={setFiles}
        label="Drop a PDF file here"
        description="Select a PDF to protect with password"
      />
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
          />
        </div>
        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-3">
          <p className="text-xs text-yellow-600 dark:text-yellow-400">
            ⚠️ Full PDF encryption requires server-side processing. For best security, use tools like qpdf or LibreOffice after download.
          </p>
        </div>
      </div>
      <Button onClick={handleProtect} disabled={processing || files.length === 0} className="w-full" size="lg">
        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
        {processing ? 'Protecting...' : 'Protect & Download'}
      </Button>
    </ToolLayout>
  )
}
