'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import {
  Pencil, MousePointer2, Type, ImagePlus, Pen, Trash2,
  Download, ChevronLeft, ChevronRight, ZoomIn, ZoomOut,
  Loader2, ArrowLeft, RotateCcw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

// ============================================================
// Types
// ============================================================

interface TextElement {
  id: string
  type: 'text'
  x: number        // PDF points from left
  y: number        // PDF points from top
  width: number    // PDF points
  height: number   // PDF points
  content: string
  fontSize: number  // PDF points
  fontFamily: string
  color: string    // hex
  page: number     // 1-indexed
}

interface ImageElement {
  id: string
  type: 'image'
  x: number
  y: number
  width: number
  height: number
  src: string      // data URL
  page: number
}

type EditorElement = TextElement | ImageElement
type ToolType = 'select' | 'text' | 'image' | 'draw' | 'delete'

// ============================================================
// Constants & Helpers
// ============================================================

const FONT_OPTIONS = [
  { label: 'Sans Serif', value: 'Helvetica, Arial, sans-serif', pdf: StandardFonts.Helvetica },
  { label: 'Sans Serif Bold', value: '__helvetica_bold__', pdf: StandardFonts.HelveticaBold },
  { label: 'Serif', value: '"Times New Roman", Times, serif', pdf: StandardFonts.TimesRoman },
  { label: 'Monospace', value: '"Courier New", Courier, monospace', pdf: StandardFonts.Courier },
]

const MIN_EL = 12

let _id = 0
function uid(): string { return `e${++_id}_${Date.now()}` }

function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!m) return [0, 0, 0]
  return [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]
}

async function dataUrlToBuffer(url: string): Promise<ArrayBuffer> {
  const r = await fetch(url)
  return r.arrayBuffer()
}

function mapPdfFont(fontFamily: string): StandardFonts {
  if (fontFamily === '__helvetica_bold__') return StandardFonts.HelveticaBold
  if (fontFamily.includes('Courier') || fontFamily.includes('monospace')) return StandardFonts.Courier
  if (fontFamily.includes('Times') || fontFamily.includes('serif')) return StandardFonts.TimesRoman
  return StandardFonts.Helvetica
}

function displayFont(fontFamily: string): string {
  if (fontFamily === '__helvetica_bold__') return 'Helvetica, Arial, sans-serif'
  return fontFamily
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(r.result as string)
    r.onerror = reject
    r.readAsDataURL(file)
  })
}

// ============================================================
// Component
// ============================================================

export default function EditPdf({ onBack }: { onBack: () => void }) {
  // ---- File ----
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfBuffer, setPdfBuffer] = useState<ArrayBuffer | null>(null)

  // ---- PDF navigation ----
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)
  const [scale, setScale] = useState(1.5)
  const [pageSize, setPageSize] = useState({ w: 0, h: 0 })
  const [rendering, setRendering] = useState(false)

  // ---- Editor ----
  const [elements, setElements] = useState<EditorElement[]>([])
  const [selId, setSelId] = useState<string | null>(null)
  const [tool, setTool] = useState<ToolType>('select')

  // ---- Draw ----
  const [drawColor, setDrawColor] = useState('#000000')
  const [drawSize, setDrawSize] = useState(3)
  const drawDataRef = useRef<Map<number, string>>(new Map())
  const drawingRef = useRef(false)
  const lastPtRef = useRef<{ x: number; y: number } | null>(null)

  // ---- Drag / Resize ----
  const dragRef = useRef<{ id: string; sx: number; sy: number; ex: number; ey: number } | null>(null)
  const resizeRef = useRef<{
    id: string; h: string; sx: number; sy: number;
    ex: number; ey: number; ew: number; eh: number;
  } | null>(null)

  // ---- Export ----
  const [exporting, setExporting] = useState(false)

  // ---- Refs ----
  const pdfCanvasRef = useRef<HTMLCanvasElement>(null)
  const drawCanvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgInputRef = useRef<HTMLInputElement>(null)

  // Derived
  const selEl = elements.find(e => e.id === selId) ?? null
  const pageEls = elements.filter(e => e.page === page)

  // ============================================================
  // PDF Load
  // ============================================================

  useEffect(() => {
    if (!pdfFile) return
    let cancelled = false
    ;(async () => {
      try {
        const buf = await pdfFile.arrayBuffer()
        if (cancelled) return
        setPdfBuffer(buf)
        const lib = await import('pdfjs-dist')
        lib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
        const pdf = await lib.getDocument({ data: buf.slice(0) }).promise
        if (cancelled) return
        setPages(pdf.numPages)
        setPage(1)
        setElements([])
        setSelId(null)
        drawDataRef.current.clear()
      } catch (err) {
        console.error(err)
        toast.error('Failed to load PDF')
      }
    })()
    return () => { cancelled = true }
  }, [pdfFile])

  // ============================================================
  // Render Page
  // ============================================================

  useEffect(() => {
    if (!pdfBuffer || page < 1) return
    let cancelled = false
    let renderTask: ReturnType<typeof Object> | null = null

    ;(async () => {
      setRendering(true)
      try {
        const lib = await import('pdfjs-dist')
        lib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
        const pdf = await lib.getDocument({ data: pdfBuffer.slice(0) }).promise
        if (cancelled) return
        const p = await pdf.getPage(page)
        const base = p.getViewport({ scale: 1.0 })
        if (!cancelled) setPageSize({ w: base.width, h: base.height })

        const vp = p.getViewport({ scale })
        const c = pdfCanvasRef.current
        if (!c || cancelled) return
        c.width = vp.width
        c.height = vp.height
        const ctx = c.getContext('2d')
        if (!ctx || cancelled) return

        renderTask = p.render({ canvasContext: ctx, viewport: vp } as never)
        try { await (renderTask as any).promise } catch (e: any) { if (e?.name !== 'RenderingCancelledException') throw e }

        if (cancelled) return

        // Setup draw canvas
        const dc = drawCanvasRef.current
        if (dc) {
          dc.width = vp.width
          dc.height = vp.height
          const dctx = dc.getContext('2d')
          if (dctx) {
            dctx.clearRect(0, 0, dc.width, dc.height)
            const saved = drawDataRef.current.get(page)
            if (saved) {
              const img = new Image()
              img.onload = () => { if (!cancelled) dctx.drawImage(img, 0, 0, dc.width, dc.height) }
              img.src = saved
            }
          }
        }
      } catch (err) {
        console.error(err)
        if (!cancelled) toast.error('Failed to render page')
      } finally {
        if (!cancelled) setRendering(false)
      }
    })()

    return () => {
      cancelled = true
      try { (renderTask as any)?.cancel() } catch { /* ignore */ }
    }
  }, [pdfBuffer, page, scale])

  // ============================================================
  // Drawing
  // ============================================================

  const saveDrawing = useCallback(() => {
    const dc = drawCanvasRef.current
    if (dc && dc.width > 0 && dc.height > 0) {
      drawDataRef.current.set(page, dc.toDataURL('image/png'))
    }
  }, [page])

  const onDrawStart = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool !== 'draw') return
    e.preventDefault()
    e.stopPropagation()
    drawingRef.current = true
    const dc = drawCanvasRef.current
    if (!dc) return
    const r = dc.getBoundingClientRect()
    const x = (e.clientX - r.left) * (dc.width / r.width)
    const y = (e.clientY - r.top) * (dc.height / r.height)
    lastPtRef.current = { x, y }
    const ctx = dc.getContext('2d')
    if (ctx) {
      ctx.beginPath()
      ctx.arc(x, y, drawSize / 2, 0, Math.PI * 2)
      ctx.fillStyle = drawColor
      ctx.fill()
    }
  }, [tool, drawColor, drawSize])

  const onDrawMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current || tool !== 'draw') return
    e.preventDefault()
    const dc = drawCanvasRef.current
    if (!dc) return
    const ctx = dc.getContext('2d')
    if (!ctx || !lastPtRef.current) return
    const r = dc.getBoundingClientRect()
    const x = (e.clientX - r.left) * (dc.width / r.width)
    const y = (e.clientY - r.top) * (dc.height / r.height)
    ctx.beginPath()
    ctx.moveTo(lastPtRef.current.x, lastPtRef.current.y)
    ctx.lineTo(x, y)
    ctx.strokeStyle = drawColor
    ctx.lineWidth = drawSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
    lastPtRef.current = { x, y }
  }, [tool, drawColor, drawSize])

  const onDrawEnd = useCallback(() => {
    if (drawingRef.current) {
      drawingRef.current = false
      lastPtRef.current = null
      saveDrawing()
    }
  }, [saveDrawing])

  const clearDraw = useCallback(() => {
    const dc = drawCanvasRef.current
    if (!dc) return
    const ctx = dc.getContext('2d')
    if (ctx) ctx.clearRect(0, 0, dc.width, dc.height)
    drawDataRef.current.delete(page)
  }, [page])

  // ============================================================
  // Element Management
  // ============================================================

  const addText = useCallback((cx: number, cy: number) => {
    const el: TextElement = {
      id: uid(), type: 'text',
      x: cx / scale, y: cy / scale,
      width: 160, height: 28,
      content: 'Type here',
      fontSize: 14,
      fontFamily: FONT_OPTIONS[0].value,
      color: '#000000',
      page,
    }
    setElements(prev => [...prev, el])
    setSelId(el.id)
    setTool('select')
  }, [scale, page])

  const addImage = useCallback(async (file: File) => {
    const src = await readFileAsDataUrl(file)
    const img = new Image()
    img.onload = () => {
      const maxW = Math.min(250, pageSize.w * 0.6)
      const maxH = Math.min(250, pageSize.h * 0.6)
      let w = img.naturalWidth, h = img.naturalHeight
      const ratio = Math.min(maxW / w, maxH / h, 1)
      w *= ratio; h *= ratio
      const el: ImageElement = {
        id: uid(), type: 'image',
        x: (pageSize.w - w) / 2, y: (pageSize.h - h) / 2,
        width: w, height: h, src, page,
      }
      setElements(prev => [...prev, el])
      setSelId(el.id)
      setTool('select')
    }
    img.src = src
  }, [pageSize, page])

  const updateEl = useCallback((id: string, u: Partial<EditorElement>) => {
    setElements(prev => prev.map(e => e.id === id ? { ...e, ...u } : e))
  }, [])

  const delEl = useCallback((id: string) => {
    setElements(prev => prev.filter(e => e.id !== id))
    setSelId(prev => prev === id ? null : prev)
  }, [])

  // ============================================================
  // Drag & Resize
  // ============================================================

  const onElMouseDown = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault()
    e.stopPropagation()
    if (tool === 'delete') { delEl(id); return }
    setSelId(id)
    if (tool === 'select') {
      const el = elements.find(el => el.id === id)
      if (!el) return
      dragRef.current = { id, sx: e.clientX, sy: e.clientY, ex: el.x, ey: el.y }
    }
  }, [tool, elements, delEl])

  const onResizeDown = useCallback((e: React.MouseEvent, id: string, h: string) => {
    e.preventDefault()
    e.stopPropagation()
    const el = elements.find(el => el.id === id)
    if (!el) return
    resizeRef.current = {
      id, h, sx: e.clientX, sy: e.clientY,
      ex: el.x, ey: el.y, ew: el.width, eh: el.height,
    }
  }, [elements])

  const onBgDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const t = e.target as HTMLElement
    if (t !== wrapRef.current && t !== pdfCanvasRef.current && t !== drawCanvasRef.current) return
    if (tool === 'text') {
      const r = wrapRef.current!.getBoundingClientRect()
      addText(e.clientX - r.left, e.clientY - r.top)
    } else if (tool === 'select') {
      setSelId(null)
    }
  }, [tool, addText])

  // Global move / up
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (dragRef.current) {
        const { id, sx, sy, ex, ey } = dragRef.current
        updateEl(id, { x: ex + (e.clientX - sx) / scale, y: ey + (e.clientY - sy) / scale })
      }
      if (resizeRef.current) {
        const { id, h, sx, sy, ex, ey, ew, eh } = resizeRef.current
        const dx = (e.clientX - sx) / scale
        const dy = (e.clientY - sy) / scale
        let nx = ex, ny = ey, nw = ew, nh = eh
        if (h.includes('r')) nw = Math.max(MIN_EL, ew + dx)
        if (h.includes('l')) { nx = ex + dx; nw = Math.max(MIN_EL, ew - dx); if (nw <= MIN_EL) nx = ex + ew - MIN_EL }
        if (h.includes('b')) nh = Math.max(MIN_EL, eh + dy)
        if (h.includes('t')) { ny = ey + dy; nh = Math.max(MIN_EL, eh - dy); if (nh <= MIN_EL) ny = ey + eh - MIN_EL }
        updateEl(id, { x: nx, y: ny, width: nw, height: nh })
      }
    }
    const up = () => { dragRef.current = null; resizeRef.current = null }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up) }
  }, [scale, updateEl])

  // Keyboard
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName ?? '')
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if ((e.key === 'Delete' || e.key === 'Backspace') && selId) { e.preventDefault(); delEl(selId) }
      if (e.key === 'Escape') setSelId(null)
    }
    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [selId, delEl])

  // ============================================================
  // Navigation helpers
  // ============================================================

  const goToPage = useCallback((n: number) => {
    saveDrawing()
    setPage(n)
    setSelId(null)
  }, [saveDrawing])

  const changeZoom = useCallback((d: number) => {
    saveDrawing()
    setScale(s => Math.max(0.5, Math.min(3, s + d)))
  }, [saveDrawing])

  // ============================================================
  // Image upload
  // ============================================================

  const onImgInput = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) await addImage(f)
    if (imgInputRef.current) imgInputRef.current.value = ''
  }, [addImage])

  // ============================================================
  // Export
  // ============================================================

  const handleExport = useCallback(async () => {
    if (!pdfBuffer) return
    setExporting(true)
    try {
      saveDrawing()

      const pdfDoc = await PDFDocument.load(pdfBuffer)
      pdfDoc.setCreator('mypdftools.in')
      pdfDoc.setTitle(pdfDoc.getTitle() || 'Edited PDF')
      const pgs = pdfDoc.getPages()

      for (let i = 0; i < pgs.length; i++) {
        const pg = pgs[i]
        const { width: pw, height: ph } = pg.getSize()
        const pn = i + 1

        // --- Draw freehand ---
        const drawUrl = drawDataRef.current.get(pn)
        if (drawUrl) {
          try {
            const buf = await dataUrlToBuffer(drawUrl)
            const img = await pdfDoc.embedPng(buf)
            pg.drawImage(img, { x: 0, y: 0, width: pw, height: ph })
          } catch (err) { console.warn('draw embed fail p' + pn, err) }
        }

        // --- Elements ---
        const els = elements.filter(e => e.page === pn)
        for (const el of els) {
          if (el.type === 'text') {
            const sfont = mapPdfFont(el.fontFamily)
            const font = await pdfDoc.embedFont(sfont)
            const [r, g, b] = hexToRgb(el.color)
            const lines = el.content.split('\n')
            const lh = el.fontSize * 1.3
            for (let li = 0; li < lines.length; li++) {
              const t = lines[li]
              if (t) {
                pg.drawText(t, {
                  x: el.x,
                  y: ph - el.y - el.fontSize * 0.85 - li * lh,
                  size: el.fontSize,
                  font,
                  color: rgb(r, g, b),
                })
              }
            }
          } else if (el.type === 'image') {
            try {
              const buf = await dataUrlToBuffer(el.src)
              const emb = el.src.includes('image/png')
                ? await pdfDoc.embedPng(buf)
                : await pdfDoc.embedJpg(buf)
              pg.drawImage(emb, { x: el.x, y: ph - el.y - el.height, width: el.width, height: el.height })
            } catch (err) { console.warn('image embed fail', err) }
          }
        }
      }

      const bytes = await pdfDoc.save()
      saveAs(new Blob([bytes], { type: 'application/pdf' }), 'edited.pdf')
      toast.success('PDF exported successfully!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to export PDF')
    } finally {
      setExporting(false)
    }
  }, [pdfBuffer, elements, saveDrawing])

  // ============================================================
  // Reset
  // ============================================================

  const resetEditor = useCallback(() => {
    setPdfFile(null); setPdfBuffer(null); setElements([]); setSelId(null)
    setPages(0); setPage(1); drawDataRef.current.clear()
  }, [])

  // ============================================================
  // RENDER – Upload Phase
  // ============================================================

  if (!pdfFile) {
    return (
      <ToolLayout
        title="Edit PDF"
        description="Full canvas-based PDF editor — add text, images, draw freehand, and more."
        icon={<Pencil className="h-5 w-5" />}
        onBack={onBack}
      >
        <FileDropzone
          accept=".pdf"
          multiple={false}
          files={pdfFile ? [pdfFile] : []}
          onFilesChange={f => setPdfFile(f[0] ?? null)}
          label="Drop a PDF file here"
          description="Select a PDF to edit with the full canvas editor"
        />
      </ToolLayout>
    )
  }

  // ============================================================
  // RENDER – Editor Phase
  // ============================================================

  const cw = pageSize.w * scale
  const ch = pageSize.h * scale

  const TOOLS: { t: ToolType; icon: React.ElementType; label: string }[] = [
    { t: 'select', icon: MousePointer2, label: 'Select / Move' },
    { t: 'text', icon: Type, label: 'Add Text' },
    { t: 'image', icon: ImagePlus, label: 'Add Image' },
    { t: 'draw', icon: Pen, label: 'Free Draw' },
    { t: 'delete', icon: Trash2, label: 'Delete' },
  ]

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] min-h-[520px]">
      {/* ============ TOP BAR ============ */}
      <div className="flex items-center gap-2 border-b px-3 py-1.5 bg-background shrink-0 flex-wrap">
        {/* Left */}
        <Button variant="ghost" size="sm" onClick={resetEditor} className="shrink-0">
          <ArrowLeft className="h-4 w-4 mr-1" />Back
        </Button>
        <Separator orientation="vertical" className="h-6 hidden sm:block" />
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#EE6C4D]/15 to-[#D04526]/10 text-[#EE6C4D]">
            <Pencil className="h-3.5 w-3.5" />
          </div>
          <span className="font-semibold text-sm hidden sm:inline">Edit PDF</span>
        </div>

        {/* Center – Page Nav */}
        <div className="flex items-center gap-1 mx-auto shrink-0">
          <Button variant="outline" size="icon" className="h-7 w-7" disabled={page <= 1} onClick={() => goToPage(page - 1)}>
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <span className="text-xs min-w-[72px] text-center tabular-nums">Page {page} / {pages}</span>
          <Button variant="outline" size="icon" className="h-7 w-7" disabled={page >= pages} onClick={() => goToPage(page + 1)}>
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Right – Zoom + Export */}
        <div className="flex items-center gap-1 shrink-0">
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => changeZoom(-0.25)} disabled={scale <= 0.5}>
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>
          <span className="text-xs min-w-[40px] text-center tabular-nums">{Math.round(scale * 100)}%</span>
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => changeZoom(0.25)} disabled={scale >= 3}>
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>
          <Separator orientation="vertical" className="h-6 mx-1" />
          <Button size="sm" onClick={handleExport} disabled={exporting} className="h-7">
            {exporting ? <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> : <Download className="h-3.5 w-3.5 mr-1" />}
            Export
          </Button>
        </div>
      </div>

      {/* ============ MAIN ============ */}
      <div className="flex flex-1 overflow-hidden">
        {/* ---- Left Toolbar ---- */}
        <div className="flex flex-col items-center gap-1 p-1.5 border-r bg-muted/30 shrink-0 w-11">
          {TOOLS.map(({ t, icon: Ic, label }) => (
            <Button
              key={t}
              variant={tool === t ? 'default' : 'ghost'}
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                setTool(t)
                if (t === 'image') imgInputRef.current?.click()
                if (t !== 'select') setSelId(null)
              }}
              title={label}
            >
              <Ic className="h-4 w-4" />
            </Button>
          ))}
          <Separator className="my-0.5" />
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={clearDraw} title="Clear Drawing">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* ---- Canvas Area ---- */}
        <div className="flex-1 overflow-auto bg-muted/60 flex items-start justify-center p-4 relative">
          {rendering && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-background/90 backdrop-blur px-3 py-1.5 rounded-lg shadow text-xs text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Rendering…
            </div>
          )}
          {cw > 0 && (
            <div
              ref={wrapRef}
              className="relative shadow-xl bg-white shrink-0"
              style={{ width: cw, height: ch }}
              onMouseDown={onBgDown}
            >
              {/* PDF layer */}
              <canvas ref={pdfCanvasRef} className="absolute inset-0" style={{ width: cw, height: ch }} />

              {/* Drawing layer */}
              <canvas
                ref={drawCanvasRef}
                className="absolute inset-0 z-10"
                style={{
                  width: cw, height: ch,
                  pointerEvents: tool === 'draw' ? 'auto' : 'none',
                  cursor: tool === 'draw' ? 'crosshair' : 'default',
                }}
                onMouseDown={onDrawStart}
                onMouseMove={onDrawMove}
                onMouseUp={onDrawEnd}
                onMouseLeave={onDrawEnd}
              />

              {/* Elements */}
              {pageEls.map(el => {
                const sel = el.id === selId
                const lx = el.x * scale
                const ly = el.y * scale
                const lw = el.width * scale
                const lh = el.height * scale
                const cursor = tool === 'select' ? 'cursor-move' : tool === 'delete' ? 'cursor-pointer' : ''

                return (
                  <div
                    key={el.id}
                    className={`absolute z-20 ${cursor} transition-shadow ${sel ? 'ring-2 ring-blue-500 ring-offset-1' : 'hover:ring-1 hover:ring-blue-300'}`}
                    style={{ left: lx, top: ly, width: lw, height: lh }}
                    onMouseDown={e => onElMouseDown(e, el.id)}
                  >
                    {el.type === 'text' ? (
                      <div
                        className="w-full h-full whitespace-pre-wrap break-words overflow-hidden select-none pointer-events-none"
                        style={{
                          fontSize: el.fontSize * scale,
                          fontFamily: displayFont(el.fontFamily),
                          fontWeight: el.fontFamily === '__helvetica_bold__' ? 'bold' : 'normal',
                          color: el.color,
                          lineHeight: 1.3,
                        }}
                      >
                        {el.content}
                      </div>
                    ) : (
                      <img src={el.src} alt="" className="w-full h-full object-fill pointer-events-none select-none" draggable={false} />
                    )}

                    {/* Resize handles */}
                    {sel && tool === 'select' && (
                      <>
                        {(['tl', 'tr', 'bl', 'br'] as const).map(h => (
                          <div
                            key={h}
                            className="absolute w-2.5 h-2.5 bg-white border-2 border-blue-500 rounded-sm z-30"
                            style={{
                              top: h.includes('t') ? -5 : undefined,
                              bottom: h.includes('b') ? -5 : undefined,
                              left: h.includes('l') ? -5 : undefined,
                              right: h.includes('r') ? -5 : undefined,
                              cursor: h === 'tl' || h === 'br' ? 'nwse-resize' : 'nesw-resize',
                            }}
                            onMouseDown={e => onResizeDown(e, el.id, h)}
                          />
                        ))}
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* ---- Right Panel ---- */}
        <div className="w-52 border-l bg-background p-3 overflow-y-auto shrink-0 hidden md:block">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Properties</h3>

          {/* Draw properties */}
          {tool === 'draw' && (
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Pen Color</Label>
                <input type="color" value={drawColor} onChange={e => setDrawColor(e.target.value)} className="h-7 w-full cursor-pointer rounded border" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Pen Size: {drawSize}px</Label>
                <Slider value={[drawSize]} onValueChange={([v]) => setDrawSize(v)} min={1} max={20} step={1} />
              </div>
            </div>
          )}

          {/* Text properties */}
          {selEl?.type === 'text' && (
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Text</Label>
                <Textarea
                  value={selEl.content}
                  onChange={e => updateEl(selEl.id, { content: e.target.value })}
                  className="min-h-[56px] text-xs"
                  rows={3}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Font</Label>
                <Select value={selEl.fontFamily} onValueChange={v => updateEl(selEl.id, { fontFamily: v })}>
                  <SelectTrigger className="h-7 text-xs w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {FONT_OPTIONS.map(f => <SelectItem key={f.label} value={f.value}>{f.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Size: {selEl.fontSize}pt</Label>
                <Slider value={[selEl.fontSize]} onValueChange={([v]) => updateEl(selEl.id, { fontSize: v })} min={6} max={72} step={1} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Color</Label>
                <input type="color" value={selEl.color} onChange={e => updateEl(selEl.id, { color: e.target.value })} className="h-7 w-full cursor-pointer rounded border" />
              </div>
              <Separator />
              <Button variant="destructive" size="sm" className="w-full h-7 text-xs" onClick={() => delEl(selEl.id)}>
                <Trash2 className="h-3 w-3 mr-1" />Delete Text
              </Button>
            </div>
          )}

          {/* Image properties */}
          {selEl?.type === 'image' && (
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Width: {Math.round(selEl.width)}pt</Label>
                <Slider
                  value={[selEl.width]}
                  onValueChange={([v]) => {
                    const ratio = selEl.height / selEl.width
                    updateEl(selEl.id, { width: v, height: v * ratio })
                  }}
                  min={20} max={600} step={1}
                />
              </div>
              <Separator />
              <Button variant="destructive" size="sm" className="w-full h-7 text-xs" onClick={() => delEl(selEl.id)}>
                <Trash2 className="h-3 w-3 mr-1" />Delete Image
              </Button>
            </div>
          )}

          {/* Help text */}
          {!selEl && tool !== 'draw' && (
            <div className="text-xs text-muted-foreground space-y-2">
              <p className="font-medium text-foreground">How to use</p>
              <ul className="space-y-1 list-disc list-inside">
                <li><strong>Select</strong> — click &amp; drag to move</li>
                <li><strong>Add Text</strong> — click canvas to place</li>
                <li><strong>Add Image</strong> — upload &amp; place</li>
                <li><strong>Draw</strong> — freehand pen tool</li>
                <li><strong>Delete</strong> — click element to remove</li>
              </ul>
              <p className="mt-2 text-[10px]">Tip: Press <kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">Delete</kbd> to remove selected element. Drag corner handles to resize.</p>
            </div>
          )}
        </div>
      </div>

      {/* Hidden image input */}
      <input ref={imgInputRef} type="file" accept="image/png,image/jpeg,image/jpg,image/webp" className="hidden" onChange={onImgInput} />
    </div>
  )
}
