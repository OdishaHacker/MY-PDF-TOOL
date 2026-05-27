'use client'

import React, { useCallback, useState, useRef } from 'react'
import { Upload, X, FileIcon, CloudUpload } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FileDropzoneProps {
  accept: string
  multiple?: boolean
  maxSize?: number
  files: File[]
  onFilesChange: (files: File[]) => void
  label?: string
  description?: string
}

export default function FileDropzone({
  accept,
  multiple = true,
  maxSize = 50,
  files,
  onFilesChange,
  label = 'Drop files here or click to browse',
  description = '',
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const dropped = Array.from(e.dataTransfer.files)
      const filtered = dropped.filter((f) => f.size <= maxSize * 1024 * 1024)
      if (multiple) {
        onFilesChange([...files, ...filtered])
      } else {
        onFilesChange(filtered.slice(0, 1))
      }
    },
    [files, maxSize, multiple, onFilesChange]
  )

  const handleClick = () => inputRef.current?.click()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || [])
    const filtered = selected.filter((f) => f.size <= maxSize * 1024 * 1024)
    if (multiple) {
      onFilesChange([...files, ...filtered])
    } else {
      onFilesChange(filtered.slice(0, 1))
    }
    if (inputRef.current) inputRef.current.value = ''
  }

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index))
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="space-y-3">
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-8 sm:p-10 text-center transition-all duration-300 group ${
          isDragging
            ? 'border-[#EE6C4D] bg-[#EE6C4D]/5 scale-[1.01] shadow-lg shadow-[#EE6C4D]/10'
            : 'border-muted-foreground/20 hover:border-[#EE6C4D]/40 hover:bg-[#EE6C4D]/[0.02]'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
        />
        <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 ${
          isDragging ? 'bg-[#EE6C4D]/15 scale-110' : 'bg-muted/50 group-hover:bg-[#EE6C4D]/10'
        }`}>
          <CloudUpload className={`h-8 w-8 transition-colors duration-300 ${
            isDragging ? 'text-[#EE6C4D]' : 'text-muted-foreground group-hover:text-[#EE6C4D]/70'
          }`} />
        </div>
        <p className="text-sm font-semibold mb-1">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        <p className="text-[10px] text-muted-foreground/60 mt-2">
          Max file size: {maxSize}MB per file
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between rounded-xl bg-muted/40 px-4 py-2.5 border border-transparent hover:border-primary/20 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EE6C4D]/10">
                  <FileIcon className="h-4 w-4 text-[#EE6C4D]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-[10px] text-muted-foreground">{formatSize(file.size)}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="h-7 w-7 p-0 shrink-0 rounded-lg hover:bg-red-500/10 hover:text-red-500"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
