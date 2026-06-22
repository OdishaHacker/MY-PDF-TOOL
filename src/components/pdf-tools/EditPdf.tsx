'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import {
  Pencil, Loader2, Download, Upload, Type, ImageIcon, Trash2,
  MousePointer2, ZoomIn, ZoomOut, Plus, Minus, ChevronLeft, ChevronRight, X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

// ---------- Types ----------
type ElementType = 'text' | 'image'

interface BaseElement {
  id: string
  pageIdx: number
  x: number  // in rendered px
  y: number  // in rendered px (from top)
  width?: number
  height?: number
}

interface TextElement extends BaseElement {
  type: 'text'
  text: string
  fontSize: number  // in rendered px
  color: string
  fontWeight: number
}

interface ImageElement extends BaseElement {
  type: 'image'
  dataUrl: string
  naturalWidth: number
  naturalHeight: number
}

type AnyElement = TextElement | ImageElement

interface PageInfo {
  pageNum: number
  viewportWidth: number  // rendered px
  viewportHeight: number
  pdfWidth: number  // original pdf pt
  pdfHeight: number
  scale: number
  canvasDataUrl: string  // rendered page image
}

// ---------- pdf.js dynamic loader ----------
let pdfjsLibPromise: Promise<any> | null = null
async function getPdfjs() {
  if (pdfjsLibPromise) return pdfjsLibPromise
  pdfjsLibPromise = (async () => {
    // @ts-ignore
    const pdfjs = await import('pdfjs-dist/build/pdf.mjs')
    // @ts-ignore
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
    return pdfjs
  })()
  return pdfjsLibPromise
}

// ---------- Helper: hex to rgb(0-1) ----------
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16) / 255
  const g = parseInt(h.substring(2, 4), 16) / 255
  const b = parseInt(h.substring(4, 6), 16) / 255
  return [r, g, b]
}

// ---------- Component ----------
export default function EditPdf({ onBack }: { onBack: () => void }) {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pages, setPages] = useState<PageInfo[]>([])
  const [elements, setElements] = useState<AnyElement[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [tool, setTool] = useState<'select' | 'text'>('select')
  const [scale, setScale] = useState(1.3)
  const [loading, setLoading] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [editingTextId, setEditingTextId] = useState<string | null>(null)
  const [showTextToolbar, setShowTextToolbar] = useState(false)
  const [textSize, setTextSize] = useState(18)
  const [textColor, setTextColor] = useState('#000000')
  const [textBold, setTextBold] = useState(false)
  const [pendingImage, setPendingImage] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const pageContainerRefs = useRef<(HTMLDivElement | null)[]>([])
  const dragRef = useRef<{
    id: string
    startX: number
    startY: number
    origX: number
    origY: number
    mode: 'move' | 'resize'
  } | null>(null)

  // ---------- Load and render PDF ----------
  const loadPdf = useCallback(async (file: File) => {
    setLoading(true)
    try {
      const pdfjs = await getPdfjs()
      const arrayBuffer = await file.arrayBuffer()
      const loadingTask = pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) })
      const pdfDoc = await loadingTask.promise
      const numPages = pdfDoc.numPages
      const rendered: PageInfo[] = []

      for (let i = 1; i <= numPages; i++) {
        const page = await pdfDoc.getPage(i)
        const viewport = page.getViewport({ scale })
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')!
        canvas.width = viewport.width
        canvas.height = viewport.height
        await page.render({ canvasContext: ctx, viewport }).promise
        rendered.push({
          pageNum: i,
          viewportWidth: viewport.width,
          viewportHeight: viewport.height,
          pdfWidth: page.view[2] - page.view[0],
          pdfHeight: page.view[3] - page.view[1],
          scale,
          canvasDataUrl: canvas.toDataURL('image/jpeg', 0.85),
        })
      }
      setPages(rendered)
      setElements([])
      setSelectedId(null)
      setCurrentPage(0)
      toast.success(`Loaded ${numPages} page(s). Click anywhere on a page to add text.`)
    } catch (e) {
      console.error(e)
      toast.error('Failed to load PDF for editing.')
    } finally {
      setLoading(false)
    }
  }, [scale])

  // Re-render on scale change with file present
  useEffect(() => {
    if (pdfFile) loadPdf(pdfFile)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scale])

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      setPdfFile(files[0])
      loadPdf(files[0])
    }
  }

  // ---------- Add Text ----------
  const addTextAt = (pageIdx: number, x: number, y: number) => {
    const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    const el: TextElement = {
      id,
      type: 'text',
      pageIdx,
      x,
      y,
      text: 'Double-click to edit',
      fontSize: textSize,
      color: textColor,
      fontWeight: textBold ? 700 : 400,
      width: 220,
    }
    setElements((prev) => [...prev, el])
    setSelectedId(id)
    setEditingTextId(id)
  }

  // ---------- Add Image ----------
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      const img = new Image()
      img.onload = () => {
        setPendingImage(dataUrl)
        // store natural size for later use
        (img as any)._natural = { w: img.naturalWidth, h: img.naturalHeight }
        // stash natural size on a global tmp variable
        pendingImageNaturalRef.current = { w: img.naturalWidth, h: img.naturalHeight }
        toast.info('Click on a page to place the image.')
      }
      img.src = dataUrl
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }
  const pendingImageNaturalRef = useRef<{ w: number; h: number } | null>(null)

  const addImageAt = (pageIdx: number, x: number, y: number) => {
    if (!pendingImage || !pendingImageNaturalRef.current) return
    const nat = pendingImageNaturalRef.current
    // Scale image to fit reasonably (max 200px wide)
    const maxW = 220
    const w = Math.min(maxW, nat.w)
    const h = (nat.h / nat.w) * w
    const id = `i-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    const el: ImageElement = {
      id,
      type: 'image',
      pageIdx,
      x,
      y,
      width: w,
      height: h,
      dataUrl: pendingImage,
      naturalWidth: nat.w,
      naturalHeight: nat.h,
    }
    setElements((prev) => [...prev, el])
    setSelectedId(id)
    setPendingImage(null)
    pendingImageNaturalRef.current = null
  }

  // ---------- Click on page ----------
  const handlePageClick = (e: React.MouseEvent, pageIdx: number) => {
    if (editingTextId) return  // don't add while editing
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (pendingImage) {
      addImageAt(pageIdx, x, y)
    } else if (tool === 'text') {
      addTextAt(pageIdx, x, y)
    } else {
      setSelectedId(null)
    }
  }

  // ---------- Element drag/resize ----------
  const startDrag = (e: React.MouseEvent, el: AnyElement, mode: 'move' | 'resize') => {
    e.stopPropagation()
    e.preventDefault()
    setSelectedId(el.id)
    dragRef.current = {
      id: el.id,
      startX: e.clientX,
      startY: e.clientY,
      origX: el.x,
      origY: el.y,
      mode,
    }
    document.addEventListener('mousemove', onDragMove)
    document.addEventListener('mouseup', onDragEnd)
  }

  const onDragMove = (e: MouseEvent) => {
    const d = dragRef.current
    if (!d) return
    const dx = e.clientX - d.startX
    const dy = e.clientY - d.startY
    setElements((prev) =>
      prev.map((el) => {
        if (el.id !== d.id) return el
        if (d.mode === 'move') {
          return { ...el, x: d.origX + dx, y: d.origY + dy }
        } else {
          // resize - only for images and text width
          const newW = Math.max(40, (el.width || 200) + dx)
          if (el.type === 'image') {
            const ratio = el.height! / el.width!
            return { ...el, width: newW, height: newW * ratio }
          }
          return { ...el, width: newW }
        }
      })
    )
  }

  const onDragEnd = () => {
    dragRef.current = null
    document.removeEventListener('mousemove', onDragMove)
    document.removeEventListener('mouseup', onDragEnd)
  }

  // ---------- Delete selected ----------
  const deleteSelected = () => {
    if (!selectedId) return
    setElements((prev) => prev.filter((el) => el.id !== selectedId))
    setSelectedId(null)
    setEditingTextId(null)
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (editingTextId) return
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
        e.preventDefault()
        deleteSelected()
      }
      if (e.key === 'Escape') {
        setSelectedId(null)
        setPendingImage(null)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selectedId, editingTextId])

  // ---------- Update text element ----------
  const updateText = (id: string, patch: Partial<TextElement>) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id && el.type === 'text' ? { ...el, ...patch } : el))
    )
  }

  // ---------- Save PDF ----------
  const handleSave = async () => {
    if (!pdfFile) {
      toast.error('No PDF loaded.')
      return
    }
    setProcessing(true)
    try {
      const arrayBuffer = await pdfFile.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const helv = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const helvBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
      const pdfPages = pdfDoc.getPages()

      for (const el of elements) {
        const page = pdfPages[el.pageIdx]
        if (!page) continue
        const pageInfo = pages[el.pageIdx]
        if (!pageInfo) continue
        // Convert rendered px to pdf pt
        // Rendered y is from top; pdf y is from bottom
        const sx = pageInfo.pdfWidth / pageInfo.viewportWidth
        const sy = pageInfo.pdfHeight / pageInfo.viewportHeight
        const pdfX = el.x * sx
        const pdfYFromTop = el.y * sy
        const pdfY = pageInfo.pdfHeight - pdfYFromTop

        if (el.type === 'text') {
          const font = el.fontWeight >= 700 ? helvBold : helv
          const sizePt = el.fontSize * sy  // scale font size
          // y in pdf-lib is baseline; subtract approx ascender
          const baselineY = pdfY - sizePt
          // Wrap text manually based on width
          const maxWidthPt = (el.width || 220) * sx
          const lines = wrapText(el.text, font, sizePt, maxWidthPt)
          lines.forEach((line, i) => {
            page.drawText(line, {
              x: pdfX,
              y: baselineY - i * sizePt * 1.15,
              size: sizePt,
              font,
              color: rgb(...hexToRgb(el.color)),
            })
          })
        } else if (el.type === 'image') {
          const imgBytes = await fetch(el.dataUrl).then((r) => r.arrayBuffer())
          let embedded
          try {
            embedded = await pdfDoc.embedPng(imgBytes)
          } catch {
            embedded = await pdfDoc.embedJpg(imgBytes)
          }
          const wPt = el.width! * sx
          const hPt = el.height! * sy
          page.drawImage(embedded, {
            x: pdfX,
            y: pdfY - hPt,
            width: wPt,
            height: hPt,
          })
        }
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, 'edited-mypdftools.pdf')
      toast.success('Edited PDF downloaded successfully!')
    } catch (e) {
      console.error(e)
      toast.error('Failed to save edited PDF.')
    } finally {
      setProcessing(false)
    }
  }

  // ---------- Text wrap helper ----------
  function wrapText(text: string, font: any, size: number, maxWidth: number): string[] {
    const paragraphs = text.split('\n')
    const lines: string[] = []
    for (const para of paragraphs) {
      const words = para.split(' ')
      let current = ''
      for (const word of words) {
        const test = current ? current + ' ' + word : word
        try {
          const w = font.widthOfTextAtSize(test, size)
          if (w > maxWidth && current) {
            lines.push(current)
            current = word
          } else {
            current = test
          }
        } catch {
          current = test
        }
      }
      lines.push(current)
    }
    return lines
  }

  // ---------- Reset ----------
  const handleReset = () => {
    setPdfFile(null)
    setPages([])
    setElements([])
    setSelectedId(null)
    setEditingTextId(null)
    setPendingImage(null)
  }

  // ---------- UI ----------
  if (!pdfFile || pages.length === 0) {
    return (
      <ToolLayout title="Edit PDF" description="Visually edit your PDF — add text, images, and logos on any page." icon={<Pencil className="h-5 w-5" />} onBack={onBack}>
        <FileDropzone accept=".pdf" multiple={false} files={pdfFile ? [pdfFile] : []} onFilesChange={handleFiles} label="Drop a PDF here to start editing" description="You'll see every page rendered — add text & images visually" />
        {loading && (
          <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Loading PDF pages for editing...</span>
          </div>
        )}
        <div className="mt-8 rounded-2xl border border-border/60 bg-muted/30 p-5">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Pencil className="h-4 w-4 text-[#EE6C4D]" />
            How Visual Editing Works
          </h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex gap-2"><span className="text-[#EE6C4D]">1.</span> Upload a PDF — all pages render like a preview</li>
            <li className="flex gap-2"><span className="text-[#EE6C4D]">2.</span> Click <b>Add Text</b>, then click anywhere on a page to drop text</li>
            <li className="flex gap-2"><span className="text-[#EE6C4D]">3.</span> Drag text to move, double-click to edit content</li>
            <li className="flex gap-2"><span className="text-[#EE6C4D]">4.</span> Click <b>Add Image</b>, upload a logo, then click to place</li>
            <li className="flex gap-2"><span className="text-[#EE6C4D]">5.</span> Press <kbd className="px-1.5 py-0.5 bg-background border rounded text-xs">Delete</kbd> to remove selected element</li>
            <li className="flex gap-2"><span className="text-[#EE6C4D]">6.</span> Click <b>Save PDF</b> to download your edited file</li>
          </ul>
        </div>
      </ToolLayout>
    )
  }

  return (
    <ToolLayout title="Edit PDF" description="Visually edit your PDF — add text, images, and logos on any page." icon={<Pencil className="h-5 w-5" />} onBack={onBack}>
      {/* Toolbar */}
      <div className="sticky top-0 z-30 -mx-4 mb-4 border-b bg-background/95 backdrop-blur px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={tool === 'select' ? 'default' : 'outline'}
            size="sm"
            onClick={() => { setTool('select'); setPendingImage(null) }}
            className="rounded-lg"
          >
            <MousePointer2 className="h-4 w-4 mr-1" /> Select
          </Button>
          <Button
            variant={tool === 'text' ? 'default' : 'outline'}
            size="sm"
            onClick={() => { setTool('text'); setPendingImage(null) }}
            className="rounded-lg"
          >
            <Type className="h-4 w-4 mr-1" /> Add Text
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg"
          >
            <ImageIcon className="h-4 w-4 mr-1" /> Add Image
          </Button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />

          <div className="h-6 w-px bg-border mx-1" />

          <Button variant="outline" size="sm" onClick={() => setScale((s) => Math.max(0.6, +(s - 0.2).toFixed(1)))} className="rounded-lg">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-xs text-muted-foreground w-12 text-center">{Math.round(scale * 100)}%</span>
          <Button variant="outline" size="sm" onClick={() => setScale((s) => Math.min(2.5, +(s + 0.2).toFixed(1)))} className="rounded-lg">
            <ZoomIn className="h-4 w-4" />
          </Button>

          <div className="h-6 w-px bg-border mx-1" />

          <Button variant="outline" size="sm" onClick={deleteSelected} disabled={!selectedId} className="rounded-lg text-red-600 hover:text-red-700">
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>

          <div className="flex-1" />

          <Button variant="ghost" size="sm" onClick={handleReset} className="rounded-lg">
            <X className="h-4 w-4 mr-1" /> New File
          </Button>
          <Button size="sm" onClick={handleSave} disabled={processing} className="rounded-lg bg-[#EE6C4D] hover:bg-[#D04526]">
            {processing ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Download className="h-4 w-4 mr-1" />}
            {processing ? 'Saving...' : 'Save PDF'}
          </Button>
        </div>

        {/* Text formatting toolbar (when a text element is selected) */}
        {selectedId && (() => {
          const el = elements.find((e) => e.id === selectedId)
          if (!el || el.type !== 'text') return null
          return (
            <div className="mt-2 flex flex-wrap items-center gap-2 pt-2 border-t">
              <span className="text-xs text-muted-foreground">Text Style:</span>
              <Input
                type="number"
                value={el.fontSize}
                onChange={(e) => updateText(el.id, { fontSize: Math.max(8, Number(e.target.value)) })}
                className="w-16 h-8"
                min={8}
                max={72}
              />
              <Input
                type="color"
                value={el.color}
                onChange={(e) => updateText(el.id, { color: e.target.value })}
                className="w-10 h-8 p-1 cursor-pointer"
              />
              <Button
                variant={el.fontWeight >= 700 ? 'default' : 'outline'}
                size="sm"
                className="h-8"
                onClick={() => updateText(el.id, { fontWeight: el.fontWeight >= 700 ? 400 : 700 })}
              >
                <b>B</b>
              </Button>
              <span className="text-xs text-muted-foreground ml-2">Tip: double-click text to edit content</span>
            </div>
          )
        })()}
      </div>

      {/* Pending image indicator */}
      {pendingImage && (
        <div className="mb-4 rounded-xl border border-[#EE6C4D]/40 bg-[#EE6C4D]/10 p-3 flex items-center gap-3">
          <img src={pendingImage} alt="pending" className="h-12 w-12 object-contain rounded bg-white" />
          <div className="flex-1 text-sm">
            <p className="font-medium">Image ready — click on any page to place it</p>
            <p className="text-xs text-muted-foreground">Press Esc to cancel</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setPendingImage(null)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Pages */}
      <div className="space-y-6 pb-12">
        {pages.map((page, idx) => (
          <div key={page.pageNum} className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
              <span className="font-medium">Page {page.pageNum}</span>
              <span>{Math.round(page.pdfWidth)} × {Math.round(page.pdfHeight)} pt</span>
            </div>
            <div
              ref={(el) => { pageContainerRefs.current[idx] = el }}
              className="relative mx-auto bg-white shadow-lg border border-border rounded-md overflow-hidden"
              style={{ width: page.viewportWidth, height: page.viewportHeight, cursor: pendingImage ? 'copy' : tool === 'text' ? 'text' : 'default' }}
              onMouseDown={(e) => {
                // Only handle clicks on the container itself (not on elements)
                if (e.target === e.currentTarget) {
                  handlePageClick(e, idx)
                }
              }}
            >
              {/* Rendered page background */}
              <img
                src={page.canvasDataUrl}
                alt={`Page ${page.pageNum}`}
                className="absolute inset-0 w-full h-full pointer-events-none select-none"
                draggable={false}
              />
              {/* Invisible click catcher (above image, below elements) */}
              <div
                className="absolute inset-0"
                onMouseDown={(e) => {
                  if (e.target === e.currentTarget) handlePageClick(e, idx)
                }}
              />

              {/* Elements on this page */}
              {elements.filter((el) => el.pageIdx === idx).map((el) => {
                const isSelected = el.id === selectedId
                if (el.type === 'text') {
                  const isEditing = editingTextId === el.id
                  return (
                    <div
                      key={el.id}
                      className={`absolute group ${isSelected ? 'ring-2 ring-[#EE6C4D]' : 'hover:ring-1 hover:ring-[#EE6C4D]/50'} rounded-sm`}
                      style={{
                        left: el.x,
                        top: el.y,
                        width: el.width || 220,
                        cursor: 'move',
                      }}
                      onMouseDown={(e) => startDrag(e, el, 'move')}
                      onClick={(e) => { e.stopPropagation(); setSelectedId(el.id) }}
                      onDoubleClick={(e) => {
                        e.stopPropagation()
                        setSelectedId(el.id)
                        setEditingTextId(el.id)
                      }}
                    >
                      {isEditing ? (
                        <textarea
                          autoFocus
                          value={el.text}
                          onChange={(e) => updateText(el.id, { text: e.target.value })}
                          onBlur={() => setEditingTextId(null)}
                          onKeyDown={(e) => {
                            e.stopPropagation()
                            if (e.key === 'Escape') setEditingTextId(null)
                          }}
                          className="w-full bg-transparent outline-none resize-none border-2 border-[#EE6C4D] rounded p-0.5"
                          style={{
                            fontSize: el.fontSize,
                            color: el.color,
                            fontWeight: el.fontWeight,
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            lineHeight: 1.15,
                            minHeight: el.fontSize * 1.4,
                          }}
                          rows={Math.max(1, el.text.split('\n').length)}
                        />
                      ) : (
                        <div
                          style={{
                            fontSize: el.fontSize,
                            color: el.color,
                            fontWeight: el.fontWeight,
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            lineHeight: 1.15,
                            wordBreak: 'break-word',
                            whiteSpace: 'pre-wrap',
                            minHeight: el.fontSize * 1.2,
                          }}
                        >
                          {el.text || ' '}
                        </div>
                      )}
                      {/* Resize handle */}
                      {isSelected && !isEditing && (
                        <div
                          className="absolute -right-1 -bottom-1 h-3 w-3 bg-[#EE6C4D] rounded-full cursor-se-resize"
                          onMouseDown={(e) => startDrag(e, el, 'resize')}
                        />
                      )}
                    </div>
                  )
                } else {
                  // image element
                  return (
                    <div
                      key={el.id}
                      className={`absolute ${isSelected ? 'ring-2 ring-[#EE6C4D]' : 'hover:ring-1 hover:ring-[#EE6C4D]/50'}`}
                      style={{
                        left: el.x,
                        top: el.y,
                        width: el.width,
                        height: el.height,
                        cursor: 'move',
                      }}
                      onMouseDown={(e) => startDrag(e, el, 'move')}
                      onClick={(e) => { e.stopPropagation(); setSelectedId(el.id) }}
                    >
                      <img src={el.dataUrl} alt="placed" className="w-full h-full object-contain pointer-events-none" draggable={false} />
                      {isSelected && (
                        <div
                          className="absolute -right-1.5 -bottom-1.5 h-3.5 w-3.5 bg-[#EE6C4D] rounded-full cursor-se-resize border-2 border-white"
                          onMouseDown={(e) => startDrag(e, el, 'resize')}
                        />
                      )}
                    </div>
                  )
                }
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Floating page nav (for long PDFs) */}
      {pages.length > 1 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 rounded-full border bg-background/95 backdrop-blur px-3 py-1.5 shadow-lg">
          <Button variant="ghost" size="sm" onClick={() => setCurrentPage((p) => Math.max(0, p - 1))} disabled={currentPage === 0}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-xs">{currentPage + 1} / {pages.length}</span>
          <Button variant="ghost" size="sm" onClick={() => setCurrentPage((p) => Math.min(pages.length - 1, p + 1))} disabled={currentPage === pages.length - 1}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </ToolLayout>
  )
}
