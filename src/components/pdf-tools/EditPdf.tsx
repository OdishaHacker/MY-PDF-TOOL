'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import {
  Pencil, MousePointer2, Type, ImagePlus, Pen, Trash2,
  Download, ChevronLeft, ChevronRight, ZoomIn, ZoomOut,
  Loader2, ArrowLeft, RotateCcw, Square, Minus, Copy,
  Undo2, Redo2, BringToFront, SendToBack, Type as TypeIcon,
  LayoutTemplate, UploadCloud, Bold, Italic, AlignLeft,
  AlignCenter, AlignRight, Palette
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

// ============================================================
// Types
// ============================================================

interface BaseElement {
  id: string
  x: number
  y: number
  width: number
  height: number
  page: number
  rotation?: number
  zIndex?: number
}

interface TextElement extends BaseElement {
  type: 'text'
  content: string
  fontSize: number
  fontFamily: string
  color: string
  bold?: boolean
  italic?: boolean
  align?: 'left' | 'center' | 'right'
  isOriginal?: boolean
  pdfFontKey?: StandardFonts
}

interface ImageElement extends BaseElement {
  type: 'image'
  src: string
}

interface ShapeElement extends BaseElement {
  type: 'shape'
  shape: 'rect' | 'line'
  strokeColor: string
  strokeWidth: number
  fillColor: string | null
}

type EditorElement = TextElement | ImageElement | ShapeElement
type ToolType = 'select' | 'text' | 'image' | 'draw' | 'delete' | 'rect' | 'line'

// ============================================================
// Constants & Helpers
// ============================================================

const GOOGLE_FONTS = [
  { label: 'Helvetica (Standard)', value: 'Helvetica', url: null },
  { label: 'Roboto', value: 'Roboto', url: 'https://raw.githubusercontent.com/googlefonts/roboto/main/src/hinted/Roboto-Regular.ttf' },
  { label: 'Open Sans', value: 'Open Sans', url: 'https://raw.githubusercontent.com/googlefonts/opensans/main/fonts/ttf/OpenSans-Regular.ttf' },
  { label: 'Lato', value: 'Lato', url: 'https://raw.githubusercontent.com/googlefonts/lato/main/fonts/ttf/Lato-Regular.ttf' },
  { label: 'Montserrat', value: 'Montserrat', url: 'https://raw.githubusercontent.com/JulietaUla/Montserrat/master/fonts/ttf/Montserrat-Regular.ttf' },
  { label: 'Oswald', value: 'Oswald', url: 'https://raw.githubusercontent.com/googlefonts/OswaldFont/master/fonts/ttf/Oswald-Regular.ttf' },
  { label: 'Playfair Display', value: 'Playfair Display', url: 'https://raw.githubusercontent.com/googlefonts/Playfair/main/fonts/ttf/PlayfairDisplay-Regular.ttf' },
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

function detectPdfFont(fontName: string): StandardFonts {
  const name = (fontName || '').toLowerCase()
  if (name.includes('courier') || name.includes('mono')) return StandardFonts.Courier
  if (name.includes('times') || name.includes('serif') || name.includes('roman')) return StandardFonts.TimesRoman
  return StandardFonts.Helvetica
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(r.result as string)
    r.onerror = reject
    r.readAsDataURL(file)
  })
}

function wrapText(
  text: string,
  maxWidth: number,
  fontSize: number,
  fontFamily: string,
  bold?: boolean
): string[] {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  const fam = fontFamily === 'Helvetica' ? 'sans-serif' : `"${fontFamily}", sans-serif`
  ctx.font = `${bold ? 'bold ' : ''}${fontSize}px ${fam}`
  const lines: string[] = []
  const paragraphs = text.split('\n')

  for (const para of paragraphs) {
    if (!para) { lines.push(''); continue }
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
  const [originalMasks, setOriginalMasks] = useState<{page: number, x: number, y: number, w: number, h: number}[]>([])
  
  const [selId, setSelId] = useState<string | null>(null)
  const [tool, setTool] = useState<ToolType>('select')
  const [editingTextId, setEditingTextId] = useState<string | null>(null)
  const [leftTab, setLeftTab] = useState('text')

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
  const maskCanvasRef = useRef<HTMLCanvasElement>(null)
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
    if (hist.length > 50) hist.shift()
    else historyIndexRef.current = hist.length - 1
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
    snapshotTimerRef.current = setTimeout(() => pushHistory(newElements), 400)
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
        lib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${lib.version}/pdf.worker.min.mjs`
        const pdf = await lib.getDocument({ data: new Uint8Array(buf) }).promise
        if (cancelled) return
        setPages(pdf.numPages)
        setPage(1)
        
        // Extract text content from ALL pages into standard TextElements
        const allElements: EditorElement[] = []
        const masks = []
        for (let p = 1; p <= pdf.numPages; p++) {
          const pg = await pdf.getPage(p)
          const baseViewport = pg.getViewport({ scale: 1.0 })
          const pageHeight = baseViewport.height
          const textContent = await pg.getTextContent()

          for (const item of textContent.items as any[]) {
            if (!item.str || !item.str.trim()) continue
            if (!item.transform) continue

            const tx = item.transform
            const fontSize = Math.sqrt(tx[0] * tx[0] + tx[1] * tx[1]) || 12
            const x = tx[4]
            const yFromBottom = tx[5]
            const y = pageHeight - yFromBottom - fontSize
            const width = item.width || (fontSize * item.str.length * 0.5)

            allElements.push({
              id: uid(),
              type: 'text',
              page: p,
              content: item.str,
              x, y,
              width,
              height: fontSize * 1.2,
              fontSize,
              fontFamily: 'Helvetica',
              pdfFontKey: detectPdfFont(item.fontName || ''),
              color: '#000000',
              zIndex: allElements.length,
              isOriginal: true,
            } as TextElement)

            masks.push({ page: p, x, y, w: width, h: fontSize * 1.2 })
          }
        }
        
        if (!cancelled) {
          setOriginalMasks(masks)
          setElements(allElements)
          setSelId(null)
          drawDataRef.current.clear()
          historyRef.current = [JSON.parse(JSON.stringify(allElements))]
          historyIndexRef.current = 0
        }
      } catch (err) {
        console.error(err)
        toast.error('Failed to load PDF')
      }
    })()
    return () => { cancelled = true }
  }, [pdfFile])

  // ============================================================
  // Render Page & Mask
  // ============================================================

  useEffect(() => {
    if (!pdfBuffer || page < 1) return
    let cancelled = false
    let renderTask: any = null

    ;(async () => {
      setRendering(true)
      try {
        const lib = await import('pdfjs-dist')
        lib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${lib.version}/pdf.worker.min.mjs`
        const pdf = await lib.getDocument({ data: new Uint8Array(pdfBuffer) }).promise
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

        // Render Mask Canvas
        const mc = maskCanvasRef.current
        if (mc) {
          mc.width = vp.width
          mc.height = vp.height
          const mctx = mc.getContext('2d')
          if (mctx) {
            mctx.clearRect(0, 0, mc.width, mc.height)
            mctx.fillStyle = '#ffffff' // We draw white rectangles over original text
            originalMasks
              .filter(m => m.page === page)
              .forEach(b => {
                // Add tiny padding to hide anti-aliasing artifacts of baked font
                mctx.fillRect((b.x - 1) * scale, (b.y - 1) * scale, (b.w + 2) * scale, (b.h + 2) * scale)
              })
          }
        }

        // Render Drawing Canvas
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
  }, [pdfBuffer, page, scale, originalMasks])

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
      content: 'New Text',
      fontSize: 16,
      fontFamily: 'Helvetica',
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
    setElements(prev => prev.map(e => e.id === id ? { ...e, ...u } as EditorElement : e))
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
      isOriginal: false,
    }
    const newEls = [...elements, copy]
    setElements(newEls)
    setSelId(copy.id)
    scheduleSnapshot(newEls)
    toast.success('Element duplicated')
  }, [elements, scheduleSnapshot])

  // ============================================================
  // Shape Drawing
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
    if (t !== wrapRef.current && t !== pdfCanvasRef.current && t !== drawCanvasRef.current && t !== maskCanvasRef.current) return

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
      if (e.key === 'Escape') {
        setSelId(null); setEditingTextId(null)
      }
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
    if (editingTextId) scheduleSnapshot(elements)
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
      pdfDoc.registerFontkit(fontkit)
      pdfDoc.setCreator('mypdftools.in')
      pdfDoc.setProducer('mypdftools.in')
      pdfDoc.setTitle(pdfDoc.getTitle() || 'Edited PDF')
      const pgs = pdfDoc.getPages()

      // Font Caching
      const fontCache = new Map<string, any>()
      
      const getPdfFont = async (fontFamily: string, fallbackKey?: StandardFonts) => {
        if (fontCache.has(fontFamily)) return fontCache.get(fontFamily)
        
        const googleFont = GOOGLE_FONTS.find(f => f.value === fontFamily)
        if (googleFont && googleFont.url) {
          try {
            const fontBytes = await dataUrlToBuffer(googleFont.url)
            const customFont = await pdfDoc.embedFont(fontBytes)
            fontCache.set(fontFamily, customFont)
            return customFont
          } catch (e) {
            console.error("Failed to load custom font", e)
            // fallback to standard
          }
        }
        
        // Fallback
        const std = fallbackKey || StandardFonts.Helvetica
        const font = await pdfDoc.embedFont(std)
        fontCache.set(fontFamily, font)
        return font
      }

      for (let i = 0; i < pgs.length; i++) {
        const pg = pgs[i]
        const { width: pw, height: ph } = pg.getSize()
        const pn = i + 1

        const pageElements = elements.filter(e => e.page === pn)

        // 1. Mask original text (always mask them based on originalMasks to handle deletions)
        const pageMasks = originalMasks.filter(m => m.page === pn)
        for (const b of pageMasks) {
          pg.drawRectangle({
            x: b.x - 1,
            y: ph - b.y - b.h - 1,
            width: b.w + 2,
            height: b.h + 2,
            color: rgb(1, 1, 1),
          })
        }

        // 2. Drawings (freehand)
        const drawUrl = drawDataRef.current.get(pn)
        if (drawUrl) {
          try {
            const buf = await dataUrlToBuffer(drawUrl)
            const img = await pdfDoc.embedPng(buf)
            pg.drawImage(img, { x: 0, y: 0, width: pw, height: ph })
          } catch (err) { console.warn('draw embed fail', err) }
        }

        // 3. Render all overlay elements
        const sortedEls = pageElements.sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0))
        for (const el of sortedEls) {
          if (el.type === 'text') {
            const font = await getPdfFont(el.fontFamily, el.pdfFontKey)
            const [r, g, b] = hexToRgb(el.color)
            const wrappedLines = wrapText(el.content, el.width - 4, el.fontSize, el.fontFamily, el.bold)
            const lh = el.fontSize * 1.3
            for (let li = 0; li < wrappedLines.length; li++) {
              const textLine = wrappedLines[li]
              if (textLine) {
                let textX = el.x
                if (el.align === 'center') {
                  const tw = font.widthOfTextAtSize(textLine, el.fontSize)
                  textX = el.x + (el.width - tw) / 2
                } else if (el.align === 'right') {
                  const tw = font.widthOfTextAtSize(textLine, el.fontSize)
                  textX = el.x + el.width - tw
                }
                pg.drawText(textLine, {
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
  }, [pdfBuffer, elements, originalMasks, saveDrawing])

  // ============================================================
  // Reset
  // ============================================================

  const resetEditor = useCallback(() => {
    setPdfFile(null); setPdfBuffer(null); setElements([]); setSelId(null)
    setOriginalMasks([]); setPages(0); setPage(1); drawDataRef.current.clear()
    historyRef.current = []; historyIndexRef.current = -1
  }, [])

  // ============================================================
  // RENDER - Upload Phase
  // ============================================================

  if (!pdfFile) {
    return (
      <ToolLayout
        title="Canva-Style PDF Editor"
        description="A full-featured PDF editor. Edit existing text seamlessly with custom Google Fonts, add images, draw shapes, and more."
        icon={<Pencil className="h-5 w-5" />}
        onBack={onBack}
      >
        <FileDropzone
          accept=".pdf"
          multiple={false}
          files={pdfFile ? [pdfFile] : []}
          onFilesChange={f => setPdfFile(f[0] ?? null)}
          label="Drop a PDF file here"
          description="Your PDF background stays perfect while text becomes 100% editable."
        />
        <div className="rounded-xl border bg-muted/30 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Pencil className="h-4 w-4 text-[#EE6C4D]" />
            <span className="text-sm font-semibold">Pro Editor Features</span>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1.5 ml-6 list-disc">
            <li><strong>Seamless Text Editing:</strong> Original text is automatically detected and converted to editable text boxes.</li>
            <li><strong>Rich Fonts:</strong> Choose from popular Google Fonts (Roboto, Montserrat, Lato, etc.).</li>
            <li><strong>Full Control:</strong> Add new text, upload images, draw rectangles, lines, and freehand.</li>
            <li><strong>Canva Layout:</strong> Professional sidebars and contextual top toolbars for rapid editing.</li>
          </ul>
        </div>
      </ToolLayout>
    )
  }

  // ============================================================
  // RENDER - Editor Phase
  // ============================================================

  const cw = pageSize.w * scale
  const ch = pageSize.h * scale

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] min-h-[520px]">
      
      {/* ============ TOP CONTEXTUAL TOOLBAR ============ */}
      <div className="flex items-center gap-2 border-b px-4 py-2 bg-background shrink-0 flex-wrap min-h-[52px]">
        <Button variant="ghost" size="sm" onClick={resetEditor} className="shrink-0 mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />Home
        </Button>
        <Separator orientation="vertical" className="h-6 hidden sm:block mx-1" />
        
        {selEl && selEl.type === 'text' && (
          <div className="flex items-center gap-1.5 bg-muted/30 rounded-md p-1 shadow-sm border">
            <Select value={selEl.fontFamily} onValueChange={v => updateEl(selEl.id, { fontFamily: v })}>
              <SelectTrigger className="h-8 text-xs w-[140px] bg-background border-dashed">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GOOGLE_FONTS.map(f => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-1 bg-background border border-dashed rounded-md px-1">
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => updateEl(selEl.id, { fontSize: Math.max(6, selEl.fontSize - 1) })}><Minus className="h-3 w-3" /></Button>
              <span className="text-xs w-6 text-center">{Math.round(selEl.fontSize)}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => updateEl(selEl.id, { fontSize: selEl.fontSize + 1 })}><div className="text-xs">+</div></Button>
            </div>
            <input type="color" value={selEl.color} onChange={e => updateEl(selEl.id, { color: e.target.value })} className="h-8 w-8 cursor-pointer rounded border p-0.5 bg-background" title="Text Color" />
            <Separator orientation="vertical" className="h-6 mx-1" />
            <Button variant={selEl.bold ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => updateEl(selEl.id, { bold: !selEl.bold })}><Bold className="h-3.5 w-3.5" /></Button>
            <Button variant={selEl.italic ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => updateEl(selEl.id, { italic: !selEl.italic })}><Italic className="h-3.5 w-3.5" /></Button>
            <div className="flex bg-background border border-dashed rounded-md">
              <Button variant={selEl.align === 'left' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8 rounded-none" onClick={() => updateEl(selEl.id, { align: 'left' })}><AlignLeft className="h-3.5 w-3.5" /></Button>
              <Button variant={selEl.align === 'center' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8 rounded-none" onClick={() => updateEl(selEl.id, { align: 'center' })}><AlignCenter className="h-3.5 w-3.5" /></Button>
              <Button variant={selEl.align === 'right' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8 rounded-none" onClick={() => updateEl(selEl.id, { align: 'right' })}><AlignRight className="h-3.5 w-3.5" /></Button>
            </div>
            <Separator orientation="vertical" className="h-6 mx-1" />
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => duplicateEl(selEl.id)} title="Duplicate"><Copy className="h-3.5 w-3.5" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => delEl(selEl.id)} title="Delete"><Trash2 className="h-3.5 w-3.5" /></Button>
          </div>
        )}

        {selEl && selEl.type === 'shape' && (
          <div className="flex items-center gap-1.5 bg-muted/30 rounded-md p-1 shadow-sm border">
             <div className="flex items-center gap-2 px-2 text-xs text-muted-foreground"><Palette className="w-3.5 h-3.5" /> Stroke</div>
             <input type="color" value={selEl.strokeColor} onChange={e => updateEl(selEl.id, { strokeColor: e.target.value })} className="h-8 w-8 cursor-pointer rounded border p-0.5 bg-background" />
             <div className="flex items-center gap-2 px-2 text-xs text-muted-foreground ml-2">Weight</div>
             <Slider className="w-24" value={[selEl.strokeWidth]} onValueChange={([v]) => updateEl(selEl.id, { strokeWidth: v })} min={1} max={10} step={1} />
             {selEl.shape === 'rect' && (
               <>
                 <Separator orientation="vertical" className="h-6 mx-2" />
                 <div className="flex items-center gap-2 px-2 text-xs text-muted-foreground">Fill</div>
                 <input type="color" value={selEl.fillColor ?? '#ffffff'} onChange={e => updateEl(selEl.id, { fillColor: e.target.value + '20' })} className="h-8 w-8 cursor-pointer rounded border p-0.5 bg-background" />
               </>
             )}
             <Separator orientation="vertical" className="h-6 mx-1" />
             <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => delEl(selEl.id)} title="Delete"><Trash2 className="h-3.5 w-3.5" /></Button>
          </div>
        )}

        {/* Global Toolbar items */}
        <div className="ml-auto flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-0.5">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={undo} disabled={historyIndexRef.current <= 0} title="Undo (Ctrl+Z)"><Undo2 className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={redo} disabled={historyIndexRef.current >= historyRef.current.length - 1} title="Redo (Ctrl+Y)"><Redo2 className="h-4 w-4" /></Button>
          </div>
          <Separator orientation="vertical" className="h-6 mx-1" />
          <div className="flex items-center gap-1 shrink-0">
            <Button variant="outline" size="icon" className="h-8 w-8" disabled={page <= 1} onClick={() => goToPage(page - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-xs min-w-[72px] text-center font-medium">Page {page} / {pages}</span>
            <Button variant="outline" size="icon" className="h-8 w-8" disabled={page >= pages} onClick={() => goToPage(page + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Separator orientation="vertical" className="h-6 mx-1" />
          <div className="flex items-center gap-1 shrink-0 bg-muted/20 rounded-md border p-0.5 hidden sm:flex">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => changeZoom(-0.25)} disabled={scale <= 0.5}><ZoomOut className="h-3.5 w-3.5" /></Button>
            <span className="text-xs min-w-[40px] text-center font-medium">{Math.round(scale * 100)}%</span>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => changeZoom(0.25)} disabled={scale >= 3}><ZoomIn className="h-3.5 w-3.5" /></Button>
          </div>
          <Button size="sm" onClick={handleExport} disabled={exporting} className="h-9 ml-2 bg-gradient-to-r from-[#EE6C4D] to-[#D04526] text-white hover:opacity-90 shadow-md">
            {exporting ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> : <Download className="h-4 w-4 mr-1.5" />}
            Export PDF
          </Button>
        </div>
      </div>

      {/* ============ MAIN WORKSPACE ============ */}
      <div className="flex flex-1 overflow-hidden bg-muted/30">
        
        {/* ---- Left Sidebar (Canva Style) ---- */}
        <div className="w-16 sm:w-20 border-r bg-background flex flex-col items-center py-4 gap-4 shrink-0 z-10 shadow-sm">
          <Button variant={leftTab === 'text' ? 'secondary' : 'ghost'} className="w-14 h-14 sm:w-16 sm:h-16 flex-col gap-1 rounded-xl" onClick={() => { setLeftTab('text'); setTool('select'); }}>
            <TypeIcon className="w-5 h-5 text-blue-500" />
            <span className="text-[10px]">Text</span>
          </Button>
          <Button variant={leftTab === 'elements' ? 'secondary' : 'ghost'} className="w-14 h-14 sm:w-16 sm:h-16 flex-col gap-1 rounded-xl" onClick={() => { setLeftTab('elements'); setTool('select'); }}>
            <LayoutTemplate className="w-5 h-5 text-purple-500" />
            <span className="text-[10px]">Elements</span>
          </Button>
          <Button variant={leftTab === 'uploads' ? 'secondary' : 'ghost'} className="w-14 h-14 sm:w-16 sm:h-16 flex-col gap-1 rounded-xl" onClick={() => { setLeftTab('uploads'); setTool('image'); imgInputRef.current?.click(); }}>
            <UploadCloud className="w-5 h-5 text-orange-500" />
            <span className="text-[10px]">Uploads</span>
          </Button>
          <Button variant={leftTab === 'draw' ? 'secondary' : 'ghost'} className="w-14 h-14 sm:w-16 sm:h-16 flex-col gap-1 rounded-xl" onClick={() => { setLeftTab('draw'); setTool('draw'); }}>
            <Pen className="w-5 h-5 text-green-500" />
            <span className="text-[10px]">Draw</span>
          </Button>
        </div>

        {/* ---- Sidebar Panel Content ---- */}
        <div className="w-64 border-r bg-card shrink-0 overflow-y-auto hidden md:block z-10 shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
          <div className="p-4">
            {leftTab === 'text' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-sm mb-3">Add Text</h3>
                <Button className="w-full justify-start h-12 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 shadow-none font-bold text-lg" onClick={() => addText(100, 100)}>
                  Add a heading
                </Button>
                <Button className="w-full justify-start h-10 bg-muted/50 hover:bg-muted text-foreground border border-dashed font-semibold text-sm" onClick={() => addText(100, 160)}>
                  Add a subheading
                </Button>
                <Button className="w-full justify-start h-8 bg-transparent hover:bg-muted text-muted-foreground text-xs" onClick={() => addText(100, 220)}>
                  Add a little bit of body text
                </Button>
                <div className="mt-6 pt-4 border-t">
                  <p className="text-xs font-semibold text-foreground mb-2">Edit Existing Text!</p>
                  <p className="text-[11px] text-muted-foreground bg-muted p-2 rounded-md leading-relaxed border">
                    All original PDF text has been converted into editable blocks. Click any text on the right canvas to rewrite it, change its font, or move it around seamlessly.
                  </p>
                </div>
              </div>
            )}
            
            {leftTab === 'elements' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-sm mb-3">Shapes & Lines</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant={tool === 'rect' ? 'default' : 'outline'} className="h-16 flex flex-col gap-2 bg-muted/30 hover:bg-muted" onClick={() => setTool('rect')}>
                    <Square className="h-5 w-5" />
                    <span className="text-[10px]">Rectangle</span>
                  </Button>
                  <Button variant={tool === 'line' ? 'default' : 'outline'} className="h-16 flex flex-col gap-2 bg-muted/30 hover:bg-muted" onClick={() => setTool('line')}>
                    <Minus className="h-5 w-5" />
                    <span className="text-[10px]">Line</span>
                  </Button>
                </div>
              </div>
            )}

            {leftTab === 'uploads' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-sm mb-3">Images</h3>
                <Button className="w-full h-12 border-dashed border-2 bg-orange-50/50 hover:bg-orange-50 text-orange-600 border-orange-200 shadow-none" onClick={() => { setTool('image'); imgInputRef.current?.click(); }}>
                  <UploadCloud className="mr-2 h-4 w-4" /> Upload Image
                </Button>
                <p className="text-[11px] text-muted-foreground text-center mt-2">JPEG, PNG supported.</p>
              </div>
            )}

            {leftTab === 'draw' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-sm mb-3">Freehand Drawing</h3>
                <Button className={`w-full justify-start h-10 ${tool === 'draw' ? 'ring-2 ring-green-500 bg-green-50 text-green-700' : 'bg-muted/50 text-muted-foreground'} border`} onClick={() => setTool('draw')}>
                  <Pen className="mr-2 h-4 w-4" /> Enable Pen
                </Button>
                <div className="space-y-3 mt-4">
                  <Label className="text-xs font-semibold">Pen Color</Label>
                  <input type="color" value={drawColor} onChange={e => setDrawColor(e.target.value)} className="h-8 w-full cursor-pointer rounded-md border p-1" />
                  
                  <Label className="text-xs font-semibold mt-3 block">Pen Size: {drawSize}px</Label>
                  <Slider value={[drawSize]} onValueChange={([v]) => setDrawSize(v)} min={1} max={20} step={1} />
                </div>
                <Button variant="outline" className="w-full mt-4 text-xs h-8 text-destructive hover:bg-destructive/10" onClick={clearDraw}>
                  <RotateCcw className="mr-2 h-3 w-3" /> Clear Drawings
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* ---- Canvas Area ---- */}
        <div className="flex-1 overflow-auto flex items-start justify-center p-6 relative">
          {rendering && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-background/90 backdrop-blur px-4 py-2 rounded-full shadow-lg text-sm font-medium border text-foreground">
              <Loader2 className="h-4 w-4 animate-spin text-[#EE6C4D]" /> Rendering...
            </div>
          )}
          {cw > 0 && (
            <div
              ref={wrapRef}
              className="relative shadow-2xl bg-white shrink-0 transition-transform duration-200 ring-1 ring-border"
              style={{
                width: cw, height: ch,
                cursor: tool === 'text' ? 'text'
                  : (tool === 'draw' || tool === 'rect' || tool === 'line') ? 'crosshair'
                  : 'default',
                touchAction: 'none',
              }}
              onPointerDown={onBgPointerDown}
            >
              {/* PDF page canvas */}
              <canvas ref={pdfCanvasRef} className="absolute inset-0 pointer-events-none" style={{ width: cw, height: ch }} />

              {/* Mask Canvas (hides original text) */}
              <canvas ref={maskCanvasRef} className="absolute inset-0 pointer-events-none z-[5]" style={{ width: cw, height: ch }} />

              {/* Drawing canvas */}
              <canvas
                ref={drawCanvasRef}
                className="absolute inset-0 z-10"
                style={{
                  width: cw, height: ch,
                  pointerEvents: tool === 'draw' ? 'auto' : 'none',
                }}
              />

              {/* Overlay elements (added text, images, shapes, and extracted PDF text) */}
              {pageEls.map(el => {
                const sel = el.id === selId
                const isEditing = el.id === editingTextId
                const lx = el.x * scale
                const ly = el.y * scale
                const lw = el.width * scale
                const lh = el.height * scale
                const cursor = tool === 'select' ? 'cursor-move' : tool === 'delete' ? 'cursor-pointer' : ''
                const rot = el.rotation ?? 0
                
                // For original text, we want to show a subtle hover effect to indicate it's editable
                const isOriginalTextHoverable = el.isOriginal && !sel && tool === 'select'

                return (
                  <div
                    key={el.id}
                    className={`absolute z-20 ${cursor} ${sel ? 'ring-2 ring-primary ring-offset-0 shadow-sm bg-primary/5' : isOriginalTextHoverable ? 'hover:ring-1 hover:ring-primary/40 hover:bg-primary/5 rounded-sm' : 'hover:ring-1 hover:ring-primary/50'}`}
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
                            fontFamily: el.fontFamily === 'Helvetica' ? 'sans-serif' : `"${el.fontFamily}", sans-serif`,
                            fontWeight: el.bold ? 'bold' : 'normal',
                            fontStyle: el.italic ? 'italic' : 'normal',
                            color: el.color,
                            lineHeight: 1.2,
                            textAlign: el.align ?? 'left',
                          }}
                        />
                      ) : (
                        <div
                          className="w-full h-full whitespace-pre-wrap break-words overflow-hidden select-none pointer-events-none"
                          style={{
                            fontSize: el.fontSize * scale,
                            fontFamily: el.fontFamily === 'Helvetica' ? 'sans-serif' : `"${el.fontFamily}", sans-serif`,
                            fontWeight: el.bold ? 'bold' : 'normal',
                            fontStyle: el.italic ? 'italic' : 'normal',
                            color: el.color,
                            lineHeight: 1.2,
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
                            className="absolute w-2.5 h-2.5 bg-white border border-primary rounded-full z-30 shadow-sm"
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
                          className="absolute w-5 h-5 bg-white border border-primary text-primary rounded-full z-30 flex items-center justify-center shadow-md cursor-grab active:cursor-grabbing"
                          style={{
                            top: -28,
                            left: '50%',
                            transform: 'translateX(-50%)',
                          }}
                          onPointerDown={e => onRotateDown(e, el.id)}
                          title="Rotate"
                        >
                          <RotateCcw className="w-2.5 h-2.5" />
                        </div>
                        <div
                          className="absolute bg-primary/30 z-20 pointer-events-none"
                          style={{ top: -20, left: '50%', width: 1, height: 20, transform: 'translateX(-50%)' }}
                        />
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>

      <input ref={imgInputRef} type="file" accept="image/png,image/jpeg,image/jpg,image/webp" className="hidden" onChange={onImgInput} />
    </div>
  )
}
