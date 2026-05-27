'use client'

import React, { useState } from 'react'
import { jsPDF } from 'jspdf'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { Type, Loader2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ToolLayout from '@/components/ToolLayout'

export default function TextToPdf({ onBack }: { onBack: () => void }) {
  const [text, setText] = useState('')
  const [fontSize, setFontSize] = useState('12')
  const [pageSize, setPageSize] = useState('a4')
  const [processing, setProcessing] = useState(false)

  const handleConvert = async () => {
    if (!text.trim()) { toast.error('Please enter some text'); return }
    setProcessing(true)
    try {
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: pageSize as 'a4' | 'letter' })
      const fs = Number(fontSize)
      doc.setFontSize(fs)
      const margin = 20
      const pageWidth = doc.internal.pageSize.getWidth()
      const maxWidth = pageWidth - 2 * margin
      const lines = doc.splitTextToSize(text, maxWidth)
      let y = margin

      for (const line of lines) {
        if (y > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage()
          y = margin
        }
        doc.text(line, margin, y)
        y += fs * 0.5
      }

      const blob = doc.output('blob')
      saveAs(blob, 'text_to_pdf.pdf')
      toast.success('Text converted to PDF successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to convert text to PDF.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <ToolLayout title="Text to PDF" description="Convert plain text content to a PDF document." icon={<Type className="h-5 w-5" />} onBack={onBack}>
      <div className="space-y-2">
        <Label>Enter Your Text</Label>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type or paste your text here..." className="min-h-48 text-sm" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Font Size</Label>
          <Input type="number" min={8} max={48} value={fontSize} onChange={(e) => setFontSize(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Page Size</Label>
          <Select value={pageSize} onValueChange={setPageSize}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="a4">A4</SelectItem>
              <SelectItem value="letter">Letter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={handleConvert} disabled={processing || !text.trim()} className="w-full" size="lg">
        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
        {processing ? 'Converting...' : 'Convert to PDF'}
      </Button>
    </ToolLayout>
  )
}
