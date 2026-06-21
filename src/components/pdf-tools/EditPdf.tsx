'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import {
  Pencil, MousePointer2, Type, ImagePlus, Pen, Trash2,
  Download, ChevronLeft, ChevronRight, ZoomIn, ZoomOut,
  Loader2, ArrowLeft, RotateCcw, Square, Minus, Copy,
  Undo2, Redo2, BringToFront, SendToBack,
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

interface BaseElement {
  id: string
  x: number        // PDF points from left
  y: number        // PDF points from top
  width: number    // PDF points
  height: number   // PDF points
  page: number     // 1-indexed
  rotation?: number // degrees
  zIndex?: number
}

interface TextElement extends BaseElement {
  type: 'text'
  content: string
  fontSize: number  // PDF points
  fontFamily: string
  color: string    // hex
  bold?: boolean
  italic?: boolean
  align?: 'left' | 'center' | 'right'
}

interface ImageElement extends BaseElement {
  type: 'image'
  src: string      // data URL
}

interface ShapeElement extends BaseElement {
  type: 'shape'
  shape: 'rect' | 'line'
  strokeColor: string
  strokeWidth: number
  fillColor: string | null  // null = transparent
}

type EditorElement = TextElement | ImageElement | ShapeElement
type ToolType = 'select' | 'text' | 'image' | 'draw' | 'delete' | 'rect' | 'line'

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
function uid(): string { return `e${++_id}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}` }

function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!m) return [0, 0, 0]
  return [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]
}

async function dataUrlToBuffer(url: string): Promise<ArrayBuffer> {
  const r = await fetch(url)
  return r.arrayBuffer()
}

function mapPdfFont(fontFamily: string, bold?: boolean): StandardFonts {
  if (bold || fontFamily === '__helvetica_bold__') return StandardFonts.HelveticaBold
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

// Wrap text to fit width using canvas measureText
function wrapText(
  text: string,
  maxWidth: number,
  fontSize: number,
  fontFamily: string,
  bold?: boolean
): string[] {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  ctx.font = `${bold ? 'bold ' : ''}${fontSize}px ${displayFont(fontFamily)}`
  const lines: string[] = []
  const paragraphs = text.split('\n')

  for (const para of paragraphs) {
    if (!para) {
      lines.push('')
      continue
    }
    const words = para.split(' ')
    let currentLine = ''

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word
      const metrics = ctx.measureText(testLine)
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine)
        currentLine = word
      } else {
        currentLine = testLine
      }
    }
    if (currentLine) lines.push(currentLine)
  }
  return lines
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
  const [editingTextId, setEditingTextId] = useState<string | null>(null)

  // ---- History (Undo/Redo) ----
  const historyRef = useRef<EditorElement[][]>([])
  const historyIndexRef = useRef(-1)
  const [, setHistoryVersion] = useState(0)

  // ---- Draw ----
  const [drawColor, setDrawColor] = useState('#EE6C4D')
  const [drawSize, setDrawSize] = useState(3)
  const drawDataRef = useRef<Map<number, string>>(new Map())
  const drawingRef = useRef(false)
  const lastPtRef = useRef<{ x: number; y: number } | null>(null)

  // ---- Shape drawing ----
  const [shapeColor, setShapeColor] = useState('#EE6C4D')
  const [shapeWidth, setShapeWidth] = useState(2)
  const shapeStartRef = useRef<{ x: number; y: number } | null>(null)
  const tempShapeRef = useRef<EditorElement | null>(null)

  // ---- Drag / Resize / Rotate ----
  const dragRef = useRef<{ id: string; sx: number; sy: number; ex: number; ey: number } | null>(null)
  const resizeRef = useRef<{
    id: string; h: string; sx: number; sy: number;
    ex: number; ey: number; ew: number; eh: number;
    shiftKey: boolean;
  } | null>(null)
  const rotateRef = useRef<{
    id: string; cx: number; cy: number; startAngle: number; startRotation: number;
  } | null>(null)

  // ---- Export ----
  const [exporting, setExporting] = useState(false)

  // ---- Refs ----
  const pdfCanvasRef = useRef<HTMLCanvasElement>(null)
  const drawCanvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgInputRef = useRef<HTMLInputElement>(null)
  const textInputRef = useRef<HTMLTextAreaElement>(null)

  // Derived
  const selEl = elements.find(e => e.id === selId) ?? null
  const pageEls = elements.filter(e => e.page === page).sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0))

  // ============================================================
  // History Management
  // ============================================================

  const pushHistory = useCallback((newElements: EditorElement[]) => {
    const hist = historyRef.current
    hist.splice(historyIndexRef.current + 1)
    hist.push(JSON.parse(JSON.stringify(newElements)))
    if (hist.length > 50) {
      hist.shift()
    } else {
      historyIndexRef.current = hist.length - 1
    }
    setHistoryVersion(v => v + 1)
  }, [])

  const undo = useCallback(() => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current--
      setElements(JSON.parse(JSON.stringify(historyRef.current[historyIndexRef.current])))
      setHistoryVersion(v => v + 1)
    }
  }, [])

  const redo = useCallback(() => {
    const hist = historyRef.current
    if (historyIndexRef.current < hist.length - 1) {
      historyIndexRef.current++
      setElements(JSON.parse(JSON.stringify(hist[historyIndexRef.current])))
      setHistoryVersion(v => v + 1)
    }
  }, [])

  const snapshotTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scheduleSnapshot = useCallback((newElements: EditorElement[]) => {
    if (snapshotTimerRef.current) clearTimeout(snapshotTimerRef.current)
    snapshotTimerRef.current = setTimeout(() => {
      pushHistory(newElements)
    }, 400)
  }, [pushHistory])

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
        historyRef.current = [[]]
        historyIndexRef.current = 0
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
    let renderTask: any = null

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
        try { await renderTask.promise } catch (e: any) { if (e?.name !== 'RenderingCancelledException') throw e }

        if (cancelled) return

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
      try { renderTask?.cancel() } catch { /* ignore */ }
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

  const getCanvasPoint = (clientX: number, clientY: number) => {
    const dc = drawCanvasRef.current
    if (!dc) return { x: 0, y: 0 }
    const r = dc.getBoundingClientRect()
    return {
      x: (clientX - r.left) * (dc.width / r.width),
      y: (clientY - r.top) * (dc.height / r.height),
    }
  }

  const onDrawStart = useCallback((clientX: number, clientY: number) => {
    if (tool !== 'draw') return
    drawingRef.current = true
    const pt = getCanvasPoint(clientX, clientY)
    lastPtRef.current = pt
    const dc = drawCanvasRef.current
    if (!dc) return
    const ctx = dc.getContext('2d')
    if (ctx) {
      ctx.beginPath()
      ctx.arc(pt.x, pt.y, drawSize / 2, 0, Math.PI * 2)
      ctx.fillStyle = drawColor
      ctx.fill()
    }
  }, [tool, drawColor, drawSize])

  const onDrawMove = useCallback((clientX: number, clientY: number) => {
    if (!drawingRef.current || tool !== 'draw') return
    const dc = drawCanvasRef.current
    if (!dc) return
    const ctx = dc.getContext('2d')
    if (!ctx || !lastPtRef.current) return
    const pt = getCanvasPoint(clientX, clientY)
    ctx.beginPath()
    ctx.moveTo(lastPtRef.current.x, lastPtRef.current.y)
    ctx.lineTo(pt.x, pt.y)
    ctx.strokeStyle = drawColor
    ctx.lineWidth = drawSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
    lastPtRef.current = pt
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
    toast.success('Drawing cleared')
  }, [page])

  // ============================================================
  // Element Management
  // ============================================================

  const addText = useCallback((cx: number, cy: number) => {
    const el: TextElement = {
      id: uid(), type: 'text',
      x: cx / scale, y: cy / scale,
      width: 200, height: 30,
      content: 'Double-click to edit',
      fontSize: 14,
      fontFamily: FONT_OPTIONS[0].value,
      color: '#000000',
      page,
      zIndex: elements.length,
    }
    const newEls = [...elements, el]
    setElements(newEls)
    setSelId(el.id)
    setTool('select')
    scheduleSnapshot(newEls)
  }, [scale, page, elements, scheduleSnapshot])

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
        zIndex: elements.length,
      }
      const newEls = [...elements, el]
      setElements(newEls)
      setSelId(el.id)
      setTool('select')
      scheduleSnapshot(newEls)
    }
    img.src = src
  }, [pageSize, page, elements, scheduleSnapshot])

  const updateEl = useCallback((id: string, u: Partial<EditorElement>) => {
    setElements(prev => prev.map(e => e.id === id ? { ...e, ...u } : e))
  }, [])

  const delEl = useCallback((id: string) => {
    setElements(prev => {
      const newEls = prev.filter(e => e.id !== id)
      scheduleSnapshot(newEls)
      return newEls
    })
    setSelId(prev => prev === id ? null : prev)
  }, [scheduleSnapshot])

  const duplicateEl = useCallback((id: string) => {
    const el = elements.find(e => e.id === id)
    if (!el) return
    const copy: EditorElement = {
      ...JSON.parse(JSON.stringify(el)),
      id: uid(),
      x: el.x + 20,
      y: el.y + 20,
      zIndex: elements.length,
    }
    const newEls = [...elements, copy]
    setElements(newEls)
    setSelId(copy.id)
    scheduleSnapshot(newEls)
    toast.success('Element duplicated')
  }, [elements, scheduleSnapshot])

  const bringToFront = useCallback((id: string) => {
    setElements(prev => {
      const maxZ = Math.max(...prev.map(p => p.zIndex ?? 0), 0)
      const newEls = prev.map(e => e.id === id ? { ...e, zIndex: maxZ + 1 } : e)
      scheduleSnapshot(newEls)
      return newEls
    })
  }, [scheduleSnapshot])

  const sendToBack = useCallback((id: string) => {
    setElements(prev => {
      const minZ = Math.min(...prev.map(p => p.zIndex ?? 0), 0)
      const newEls = prev.map(e => e.id === id ? { ...e, zIndex: minZ - 1 } : e)
      scheduleSnapshot(newEls)
      return newEls
    })
  }, [scheduleSnapshot])

  // ============================================================
  // Shape Drawing (Rectangle, Line)
  // ============================================================

  const onShapeStart = useCallback((clientX: number, clientY: number) => {
    if (tool !== 'rect' && tool !== 'line') return
    const r = wrapRef.current!.getBoundingClientRect()
    const x = (clientX - r.left) / scale
    const y = (clientY - r.top) / scale
    shapeStartRef.current = { x, y }
    const el: ShapeElement = {
      id: uid(), type: 'shape',
      shape: tool,
      x, y, width: 0, height: 0,
      strokeColor: shapeColor,
      strokeWidth: shapeWidth,
      fillColor: tool === 'rect' ? shapeColor + '20' : null,
      page,
      zIndex: elements.length,
    }
    tempShapeRef.current = el
    setElements(prev => [...prev, el])
  }, [tool, scale, shapeColor, shapeWidth, page, elements])

  const onShapeMove = useCallback((clientX: number, clientY: number) => {
    if (!shapeStartRef.current || !tempShapeRef.current) return
    const r = wrapRef.current!.getBoundingClientRect()
    const cx = (clientX - r.left) / scale
    const cy = (clientY - r.top) / scale
    const sx = shapeStartRef.current.x
    const sy = shapeStartRef.current.y
    const el = tempShapeRef.current
    updateEl(el.id, {
      x: Math.min(sx, cx),
      y: Math.min(sy, cy),
      width: Math.abs(cx - sx),
      height: Math.abs(cy - sy),
    })
  }, [scale, updateEl])

  const onShapeEnd = useCallback(() => {
    if (tempShapeRef.current) {
      const el = tempShapeRef.current
      if (el.width < 5 && el.height < 5) {
        setElements(prev => prev.filter(e => e.id !== el.id))
      } else {
        setSelId(el.id)
        scheduleSnapshot(elements)
      }
    }
    shapeStartRef.current = null
    tempShapeRef.current = null
    setTool('select')
  }, [elements, scheduleSnapshot])

  // ============================================================
  // Pointer handlers
  // ============================================================

  const onElPointerDown = useCallback((e: React.PointerEvent, id: string) => {
    if (editingTextId === id) return
    e.preventDefault()
    e.stopPropagation()
    if (tool === 'delete') { delEl(id); return }
    setSelId(id)
    if (tool === 'select') {
      const el = elements.find(el => el.id === id)
      if (!el) return
      dragRef.current = { id, sx: e.clientX, sy: e.clientY, ex: el.x, ey: el.y }
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    }
  }, [tool, elements, delEl, editingTextId])

  const onResizeDown = useCallback((e: React.PointerEvent, id: string, h: string) => {
    e.preventDefault()
    e.stopPropagation()
    const el = elements.find(el => el.id === id)
    if (!el) return
    resizeRef.current = {
      id, h, sx: e.clientX, sy: e.clientY,
      ex: el.x, ey: el.y, ew: el.width, eh: el.height,
      shiftKey: e.shiftKey,
    }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [elements])

  const onRotateDown = useCallback((e: React.PointerEvent, id: string) => {
    e.preventDefault()
    e.stopPropagation()
    const el = elements.find(el => el.id === id)
    if (!el || !wrapRef.current) return
    const r = wrapRef.current.getBoundingClientRect()
    const cx = (el.x + el.width / 2) * scale + r.left
    const cy = (el.y + el.height / 2) * scale + r.top
    const startAngle = Math.atan2(e.clientY - cy, e.clientX - cx) * 180 / Math.PI
    rotateRef.current = {
      id, cx, cy, startAngle, startRotation: el.rotation ?? 0,
    }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [elements, scale])

  const onBgPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const t = e.target as HTMLElement
    if (t !== wrapRef.current && t !== pdfCanvasRef.current && t !== drawCanvasRef.current) return

    if (tool === 'text') {
      const r = wrapRef.current!.getBoundingClientRect()
      addText(e.clientX - r.left, e.clientY - r.top)
    } else if (tool === 'rect' || tool === 'line') {
      onShapeStart(e.clientX, e.clientY)
    } else if (tool === 'draw') {
      onDrawStart(e.clientX, e.clientY)
    } else if (tool === 'select') {
      setSelId(null)
      setEditingTextId(null)
    }
  }, [tool, addText, onShapeStart, onDrawStart])

  // Global pointer move / up
  useEffect(() => {
    const move = (e: PointerEvent) => {
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
        if (e.shiftKey && (h === 'tl' || h === 'tr' || h === 'bl' || h === 'br')) {
          const ratio = eh / ew
          nh = nw * ratio
          if (h.includes('t')) ny = ey + eh - nh
        }
        updateEl(id, { x: nx, y: ny, width: nw, height: nh })
      }
      if (rotateRef.current) {
        const { id, cx, cy, startAngle, startRotation } = rotateRef.current
        const currentAngle = Math.atan2(e.clientY - cy, e.clientX - cx) * 180 / Math.PI
        const newRotation = startRotation + (currentAngle - startAngle)
        updateEl(id, { rotation: Math.round(newRotation) })
      }
      if (drawingRef.current) onDrawMove(e.clientX, e.clientY)
      if (shapeStartRef.current) onShapeMove(e.clientX, e.clientY)
    }
    const up = () => {
      if (dragRef.current || resizeRef.current || rotateRef.current) {
        scheduleSnapshot(elements)
      }
      dragRef.current = null
      resizeRef.current = null
      rotateRef.current = null
      if (drawingRef.current) onDrawEnd()
      if (tempShapeRef.current) onShapeEnd()
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
    }
  }, [scale, updateEl, elements, scheduleSnapshot, onDrawMove, onDrawEnd, onShapeMove, onShapeEnd])

  // Keyboard shortcuts
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName ?? '')
      const isEditing = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || editingTextId !== null
      if (isEditing) return

      if ((e.key === 'Delete' || e.key === 'Backspace') && selId) { e.preventDefault(); delEl(selId) }
      if (e.key === 'Escape') { setSelId(null); setEditingTextId(null) }
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo() }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); redo() }
      if ((e.ctrlKey || e.metaKey) && e.key === 'd' && selId) { e.preventDefault(); duplicateEl(selId) }
    }
    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [selId, delEl, undo, redo, duplicateEl, editingTextId])

  // ============================================================
  // Inline Text Editing
  // ============================================================

  const startTextEdit = useCallback((id: string) => {
    setEditingTextId(id)
    setSelId(id)
    setTimeout(() => {
      if (textInputRef.current) {
        textInputRef.current.focus()
        textInputRef.current.select()
      }
    }, 50)
  }, [])

  const finishTextEdit = useCallback(() => {
    if (editingTextId) {
      scheduleSnapshot(elements)
    }
    setEditingTextId(null)
  }, [editingTextId, elements, scheduleSnapshot])

  // ============================================================
  // Navigation helpers
  // ============================================================

  const goToPage = useCallback((n: number) => {
    saveDrawing()
    setPage(n)
    setSelId(null)
    setEditingTextId(null)
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
      pdfDoc.setProducer('mypdftools.in')
      pdfDoc.setTitle(pdfDoc.getTitle() || 'Edited PDF')
      const pgs = pdfDoc.getPages()

      const fontCache = new Map<StandardFonts, Awaited<ReturnType<typeof pdfDoc.embedFont>>>()
      async function getFont(font: StandardFonts) {
        if (!fontCache.has(font)) fontCache.set(font, await pdfDoc.embedFont(font))
        return fontCache.get(font)!
      }

      for (let i = 0; i < pgs.length; i++) {
        const pg = pgs[i]
        const { width: pw, height: ph } = pg.getSize()
        const pn = i + 1

        const drawUrl = drawDataRef.current.get(pn)
        if (drawUrl) {
          try {
            const buf = await dataUrlToBuffer(drawUrl)
            const img = await pdfDoc.embedPng(buf)
            pg.drawImage(img, { x: 0, y: 0, width: pw, height: ph })
          } catch (err) { console.warn('draw embed fail p' + pn, err) }
        }

        const els = elements.filter(e => e.page === pn).sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0))
        for (const el of els) {
          if (el.type === 'text') {
            const sfont = mapPdfFont(el.fontFamily, el.bold)
            const font = await getFont(sfont)
            const [r, g, b] = hexToRgb(el.color)
            const wrappedLines = wrapText(el.content, el.width - 4, el.fontSize, el.fontFamily, el.bold)
            const lh = el.fontSize * 1.3
            for (let li = 0; li < wrappedLines.length; li++) {
              const t = wrappedLines[li]
              if (t) {
                let textX = el.x
                if (el.align === 'center') {
                  const tw = font.widthOfTextAtSize(t, el.fontSize)
                  textX = el.x + (el.width - tw) / 2
                } else if (el.align === 'right') {
                  const tw = font.widthOfTextAtSize(t, el.fontSize)
                  textX = el.x + el.width - tw
                }
                pg.drawText(t, {
                  x: textX,
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
              pg.drawImage(emb, {
                x: el.x, y: ph - el.y - el.height,
                width: el.width, height: el.height,
              })
            } catch (err) { console.warn('image embed fail', err) }
          } else if (el.type === 'shape') {
            const [r, g, b] = hexToRgb(el.strokeColor)
            if (el.shape === 'rect') {
              const fillRgb = el.fillColor ? hexToRgb(el.fillColor.slice(0, 7)) : null
              pg.drawRectangle({
                x: el.x, y: ph - el.y - el.height,
                width: el.width, height: el.height,
                borderColor: rgb(r, g, b),
                borderWidth: el.strokeWidth,
                color: fillRgb ? rgb(fillRgb[0], fillRgb[1], fillRgb[2]) : undefined,
                opacity: fillRgb ? 0.15 : 1,
              })
            } else if (el.shape === 'line') {
              pg.drawLine({
                start: { x: el.x, y: ph - el.y },
                end: { x: el.x + el.width, y: ph - el.y - el.height },
                thickness: el.strokeWidth,
                color: rgb(r, g, b),
              })
            }
          }
        }
      }

      const bytes = await pdfDoc.save()
      saveAs(new Blob([bytes], { type: 'application/pdf' }), 'edited-mypdftools.pdf')
      toast.success('PDF exported successfully!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to export PDF. Please try again.')
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
    historyRef.current = []; historyIndexRef.current = -1
  }, [])

  // ============================================================
  // RENDER – Upload Phase
  // ============================================================

  if (!pdfFile) {
    return (
      <ToolLayout
        title="Edit PDF"
        description="Full canvas-based PDF editor — add text, images, shapes, draw freehand, and more."
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

        <div className="rounded-xl border bg-muted/30 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Pencil className="h-4 w-4 text-[#EE6C4D]" />
            <span className="text-sm font-semibold">Editor Features</span>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1.5 ml-6 list-disc">
            <li>Add <strong>text</strong> with custom font, size, color, and alignment</li>
            <li>Add <strong>images</strong> and position them anywhere on the page</li>
            <li>Draw <strong>shapes</strong> — rectangles and lines</li>
            <li>Freehand <strong>drawing</strong> with adjustable pen color and size</li>
            <li>Move, resize, rotate, and arrange elements</li>
            <li><strong>Undo/Redo</strong> support (Ctrl+Z / Ctrl+Y)</li>
            <li>Multi-page support with page navigation</li>
            <li>Zoom in/out for precise editing</li>
            <li>Works on desktop and touch devices</li>
          </ul>
        </div>
      </ToolLayout>
    )
  }

  // ============================================================
  // RENDER – Editor Phase
  // ============================================================

  const cw = pageSize.w * scale
  const ch = pageSize.h * scale

  const TOOLS: { t: ToolType; icon: React.ElementType; label: string }[] = [
    { t: 'select', icon: MousePointer2, label: 'Select / Move (V)' },
    { t: 'text', icon: Type, label: 'Add Text (T)' },
    { t: 'image', icon: ImagePlus, label: 'Add Image (I)' },
    { t: 'rect', icon: Square, label: 'Rectangle (R)' },
    { t: 'line', icon: Minus, label: 'Line (L)' },
    { t: 'draw', icon: Pen, label: 'Free Draw (D)' },
    { t: 'delete', icon: Trash2, label: 'Delete (X)' },
  ]

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] min-h-[520px]">
      {/* ============ TOP BAR ============ */}
      <div className="flex items-center gap-2 border-b px-3 py-1.5 bg-background shrink-0 flex-wrap">
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

        <div className="flex items-center gap-0.5 shrink-0">
          <Button
            variant="ghost" size="icon" className="h-7 w-7"
            onClick={undo}
            disabled={historyIndexRef.current <= 0}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost" size="icon" className="h-7 w-7"
            onClick={redo}
            disabled={historyIndexRef.current >= historyRef.current.length - 1}
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-1 mx-auto shrink-0">
          <Button variant="outline" size="icon" className="h-7 w-7" disabled={page <= 1} onClick={() => goToPage(page - 1)}>
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <span className="text-xs min-w-[72px] text-center tabular-nums">Page {page} / {pages}</span>
          <Button variant="outline" size="icon" className="h-7 w-7" disabled={page >= pages} onClick={() => goToPage(page + 1)}>
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => changeZoom(-0.25)} disabled={scale <= 0.5}>
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>
          <span className="text-xs min-w-[40px] text-center tabular-nums">{Math.round(scale * 100)}%</span>
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => changeZoom(0.25)} disabled={scale >= 3}>
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>
          <Separator orientation="vertical" className="h-6 mx-1" />
          <Button size="sm" onClick={handleExport} disabled={exporting} className="h-7 bg-gradient-to-r from-[#EE6C4D] to-[#D04526] text-white hover:opacity-90">
            {exporting ? <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> : <Download className="h-3.5 w-3.5 mr-1" />}
            Export PDF
          </Button>
        </div>
      </div>

      {/* ============ MAIN ============ */}
      <div className="flex flex-1 overflow-hidden">
        {/* ---- Left Toolbar ---- */}
        <div className="flex flex-col items-center gap-1 p-1.5 border-r bg-muted/30 shrink-0 w-11 overflow-y-auto">
          {TOOLS.map(({ t, icon: Ic, label }) => (
            <Button
              key={t}
              variant={tool === t ? 'default' : 'ghost'}
              size="icon"
              className={`h-8 w-8 ${tool === t ? 'bg-gradient-to-br from-[#EE6C4D] to-[#D04526] text-white' : ''}`}
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
              style={{
                width: cw, height: ch,
                cursor: tool === 'text' ? 'text' : (tool === 'draw' || tool === 'rect' || tool === 'line') ? 'crosshair' : 'default',
                touchAction: 'none',
              }}
              onPointerDown={onBgPointerDown}
            >
              <canvas ref={pdfCanvasRef} className="absolute inset-0 pointer-events-none" style={{ width: cw, height: ch }} />

              <canvas
                ref={drawCanvasRef}
                className="absolute inset-0 z-10"
                style={{
                  width: cw, height: ch,
                  pointerEvents: tool === 'draw' ? 'auto' : 'none',
                }}
              />

              {pageEls.map(el => {
                const sel = el.id === selId
                const isEditing = el.id === editingTextId
                const lx = el.x * scale
                const ly = el.y * scale
                const lw = el.width * scale
                const lh = el.height * scale
                const cursor = tool === 'select' ? 'cursor-move' : tool === 'delete' ? 'cursor-pointer' : ''
                const rot = el.rotation ?? 0

                return (
                  <div
                    key={el.id}
                    className={`absolute z-20 ${cursor} ${sel ? 'ring-2 ring-[#EE6C4D] ring-offset-1' : 'hover:ring-1 hover:ring-[#EE6C4D]/50'}`}
                    style={{
                      left: lx, top: ly, width: lw, height: lh,
                      transform: `rotate(${rot}deg)`,
                      transformOrigin: 'center center',
                    }}
                    onPointerDown={e => onElPointerDown(e, el.id)}
                    onDoubleClick={(e) => {
                      e.stopPropagation()
                      if (el.type === 'text') startTextEdit(el.id)
                    }}
                  >
                    {el.type === 'text' ? (
                      isEditing ? (
                        <textarea
                          ref={textInputRef}
                          value={el.content}
                          onChange={e => updateEl(el.id, { content: e.target.value })}
                          onBlur={finishTextEdit}
                          onPointerDown={e => e.stopPropagation()}
                          onKeyDown={e => {
                            e.stopPropagation()
                            if (e.key === 'Escape' || (e.key === 'Enter' && (e.ctrlKey || e.metaKey))) {
                              finishTextEdit()
                            }
                          }}
                          className="w-full h-full p-0 m-0 border-0 outline-none resize-none bg-transparent"
                          style={{
                            fontSize: el.fontSize * scale,
                            fontFamily: displayFont(el.fontFamily),
                            fontWeight: el.bold || el.fontFamily === '__helvetica_bold__' ? 'bold' : 'normal',
                            color: el.color,
                            lineHeight: 1.3,
                            textAlign: el.align ?? 'left',
                          }}
                        />
                      ) : (
                        <div
                          className="w-full h-full whitespace-pre-wrap break-words overflow-hidden select-none pointer-events-none"
                          style={{
                            fontSize: el.fontSize * scale,
                            fontFamily: displayFont(el.fontFamily),
                            fontWeight: el.bold || el.fontFamily === '__helvetica_bold__' ? 'bold' : 'normal',
                            color: el.color,
                            lineHeight: 1.3,
                            textAlign: el.align ?? 'left',
                          }}
                        >
                          {el.content || ' '}
                        </div>
                      )
                    ) : el.type === 'image' ? (
                      <img src={el.src} alt="" className="w-full h-full object-fill pointer-events-none select-none" draggable={false} />
                    ) : (
                      <svg className="w-full h-full pointer-events-none" preserveAspectRatio="none">
                        {el.shape === 'rect' && (
                          <rect
                            x={el.strokeWidth / 2}
                            y={el.strokeWidth / 2}
                            width={Math.max(0, lw - el.strokeWidth)}
                            height={Math.max(0, lh - el.strokeWidth)}
                            fill={el.fillColor ?? 'none'}
                            fillOpacity={el.fillColor ? 0.15 : 0}
                            stroke={el.strokeColor}
                            strokeWidth={el.strokeWidth}
                          />
                        )}
                        {el.shape === 'line' && (
                          <line
                            x1={0} y1={0}
                            x2={lw} y2={lh}
                            stroke={el.strokeColor}
                            strokeWidth={el.strokeWidth}
                            strokeLinecap="round"
                          />
                        )}
                      </svg>
                    )}

                    {sel && tool === 'select' && !isEditing && (
                      <>
                        {(['tl', 'tr', 'bl', 'br'] as const).map(h => (
                          <div
                            key={h}
                            className="absolute w-2.5 h-2.5 bg-white border-2 border-[#EE6C4D] rounded-sm z-30"
                            style={{
                              top: h.includes('t') ? -5 : undefined,
                              bottom: h.includes('b') ? -5 : undefined,
                              left: h.includes('l') ? -5 : undefined,
                              right: h.includes('r') ? -5 : undefined,
                              cursor: h === 'tl' || h === 'br' ? 'nwse-resize' : 'nesw-resize',
                            }}
                            onPointerDown={e => onResizeDown(e, el.id, h)}
                          />
                        ))}
                        <div
                          className="absolute w-2.5 h-2.5 bg-white border-2 border-[#7B68EE] rounded-full z-30"
                          style={{
                            top: -25,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            cursor: 'grab',
                          }}
                          onPointerDown={e => onRotateDown(e, el.id)}
                          title="Rotate"
                        />
                        <div
                          className="absolute bg-[#7B68EE] z-20"
                          style={{ top: -20, left: '50%', width: 1, height: 15, transform: 'translateX(-50%)' }}
                        />
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* ---- Right Panel ---- */}
        <div className="w-56 border-l bg-background p-3 overflow-y-auto shrink-0 hidden md:block">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Properties</h3>

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

          {(tool === 'rect' || tool === 'line') && (
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Stroke Color</Label>
                <input type="color" value={shapeColor} onChange={e => setShapeColor(e.target.value)} className="h-7 w-full cursor-pointer rounded border" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Stroke Width: {shapeWidth}px</Label>
                <Slider value={[shapeWidth]} onValueChange={([v]) => setShapeWidth(v)} min={1} max={10} step={1} />
              </div>
              <p className="text-[10px] text-muted-foreground">Click and drag on the canvas to draw.</p>
            </div>
          )}

          {selEl?.type === 'text' && (
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Text</Label>
                <Textarea
                  value={selEl.content}
                  onChange={e => updateEl(selEl.id, { content: e.target.value })}
                  className="min-h-[56px] text-xs"
                  rows={3}
                  placeholder="Enter text..."
                />
                <p className="text-[10px] text-muted-foreground mt-1">Tip: Double-click on canvas to edit inline.</p>
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
              <div className="space-y-1">
                <Label className="text-xs">Alignment</Label>
                <div className="grid grid-cols-3 gap-1">
                  {(['left', 'center', 'right'] as const).map(a => (
                    <Button
                      key={a}
                      variant={selEl.align === a ? 'default' : 'outline'}
                      size="sm"
                      className="h-7 text-[10px] capitalize"
                      onClick={() => updateEl(selEl.id, { align: a })}
                    >
                      {a}
                    </Button>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-1">
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => duplicateEl(selEl.id)}>
                  <Copy className="h-3 w-3 mr-1" />Duplicate
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => bringToFront(selEl.id)}>
                  <BringToFront className="h-3 w-3 mr-1" />Front
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => sendToBack(selEl.id)}>
                  <SendToBack className="h-3 w-3 mr-1" />Back
                </Button>
                <Button variant="destructive" size="sm" className="h-7 text-xs" onClick={() => delEl(selEl.id)}>
                  <Trash2 className="h-3 w-3 mr-1" />Delete
                </Button>
              </div>
            </div>
          )}

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
              <div className="space-y-1">
                <Label className="text-xs">Rotation: {selEl.rotation ?? 0}°</Label>
                <Slider
                  value={[selEl.rotation ?? 0]}
                  onValueChange={([v]) => updateEl(selEl.id, { rotation: v })}
                  min={-180} max={180} step={1}
                />
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-1">
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => duplicateEl(selEl.id)}>
                  <Copy className="h-3 w-3 mr-1" />Duplicate
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => bringToFront(selEl.id)}>
                  <BringToFront className="h-3 w-3 mr-1" />Front
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => sendToBack(selEl.id)}>
                  <SendToBack className="h-3 w-3 mr-1" />Back
                </Button>
                <Button variant="destructive" size="sm" className="h-7 text-xs" onClick={() => delEl(selEl.id)}>
                  <Trash2 className="h-3 w-3 mr-1" />Delete
                </Button>
              </div>
            </div>
          )}

          {selEl?.type === 'shape' && (
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Stroke Color</Label>
                <input type="color" value={selEl.strokeColor} onChange={e => updateEl(selEl.id, { strokeColor: e.target.value })} className="h-7 w-full cursor-pointer rounded border" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Stroke Width: {selEl.strokeWidth}px</Label>
                <Slider value={[selEl.strokeWidth]} onValueChange={([v]) => updateEl(selEl.id, { strokeWidth: v })} min={1} max={10} step={1} />
              </div>
              {selEl.shape === 'rect' && (
                <div className="space-y-1">
                  <Label className="text-xs">Fill Color</Label>
                  <input
                    type="color"
                    value={selEl.fillColor ?? '#ffffff'}
                    onChange={e => updateEl(selEl.id, { fillColor: e.target.value + '20' })}
                    className="h-7 w-full cursor-pointer rounded border"
                  />
                </div>
              )}
              <div className="space-y-1">
                <Label className="text-xs">Rotation: {selEl.rotation ?? 0}°</Label>
                <Slider
                  value={[selEl.rotation ?? 0]}
                  onValueChange={([v]) => updateEl(selEl.id, { rotation: v })}
                  min={-180} max={180} step={1}
                />
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-1">
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => duplicateEl(selEl.id)}>
                  <Copy className="h-3 w-3 mr-1" />Duplicate
                </Button>
                <Button variant="destructive" size="sm" className="h-7 text-xs" onClick={() => delEl(selEl.id)}>
                  <Trash2 className="h-3 w-3 mr-1" />Delete
                </Button>
              </div>
            </div>
          )}

          {!selEl && tool === 'select' && (
            <div className="text-xs text-muted-foreground space-y-2">
              <p className="font-medium text-foreground">How to use</p>
              <ul className="space-y-1 list-disc list-inside">
                <li><strong>Select</strong> — click &amp; drag to move</li>
                <li><strong>Add Text</strong> — click canvas to place</li>
                <li><strong>Add Image</strong> — upload &amp; place</li>
                <li><strong>Rectangle/Line</strong> — click &amp; drag</li>
                <li><strong>Draw</strong> — freehand pen tool</li>
                <li><strong>Delete</strong> — click element to remove</li>
              </ul>
              <div className="mt-3 pt-3 border-t space-y-1">
                <p className="font-medium text-foreground">Shortcuts</p>
                <p><kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">Ctrl+Z</kbd> Undo</p>
                <p><kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">Ctrl+Y</kbd> Redo</p>
                <p><kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">Ctrl+D</kbd> Duplicate</p>
                <p><kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">Del</kbd> Delete element</p>
                <p><kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">Shift+Drag</kbd> Proportional resize</p>
                <p><kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">Dbl-Click</kbd> Edit text inline</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <input ref={imgInputRef} type="file" accept="image/png,image/jpeg,image/jpg,image/webp" className="hidden" onChange={onImgInput} />
    </div>
  )
}
