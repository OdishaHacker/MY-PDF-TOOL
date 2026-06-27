'use client'

import React, { useState, useMemo } from 'react'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import {
  Lock,
  Loader2,
  Download,
  Eye,
  EyeOff,
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Printer,
  Copy,
  FileEdit,
  MessageSquare,
  FileText,
  Puzzle,
  FileOutput,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import FileDropzone from '@/components/FileDropzone'
import ToolLayout from '@/components/ToolLayout'

// â”€â”€â”€ Password strength calculator â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function getPasswordStrength(password: string): {
  score: number
  label: string
  color: string
  icon: React.ReactNode
} {
  if (!password) return { score: 0, label: 'No password', color: '', icon: <ShieldX className="h-4 w-4" /> }

  let score = 0
  if (password.length >= 6) score++
  if (password.length >= 10) score++
  if (password.length >= 14) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 2) return { score, label: 'Weak', color: 'text-red-500', icon: <ShieldAlert className="h-4 w-4 text-red-500" /> }
  if (score <= 4) return { score, label: 'Medium', color: 'text-yellow-500', icon: <Shield className="h-4 w-4 text-yellow-500" /> }
  if (score <= 5) return { score, label: 'Strong', color: 'text-green-500', icon: <ShieldCheck className="h-4 w-4 text-green-500" /> }
  return { score, label: 'Very Strong', color: 'text-green-600', icon: <ShieldCheck className="h-4 w-4 text-green-600" /> }
}

// â”€â”€â”€ Permission definition â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface PermissionOption {
  key: string
  label: string
  description: string
  jsPdfValue: string
  icon: React.ReactNode
  defaultChecked: boolean
}

const PERMISSION_OPTIONS: PermissionOption[] = [
  {
    key: 'print',
    label: 'Print',
    description: 'Allow printing the document',
    jsPdfValue: 'print',
    icon: <Printer className="h-4 w-4" />,
    defaultChecked: true,
  },
  {
    key: 'printHighRes',
    label: 'High-Res Print',
    description: 'Allow high-resolution printing',
    jsPdfValue: 'printHighRes',
    icon: <FileOutput className="h-4 w-4" />,
    defaultChecked: true,
  },
  {
    key: 'copy',
    label: 'Copy',
    description: 'Allow copying text and images',
    jsPdfValue: 'copy',
    icon: <Copy className="h-4 w-4" />,
    defaultChecked: false,
  },
  {
    key: 'modify',
    label: 'Modify',
    description: 'Allow modifying the document',
    jsPdfValue: 'modify',
    icon: <FileEdit className="h-4 w-4" />,
    defaultChecked: false,
  },
  {
    key: 'annotate',
    label: 'Annotate',
    description: 'Allow adding comments/annotations',
    jsPdfValue: 'annotate',
    icon: <MessageSquare className="h-4 w-4" />,
    defaultChecked: true,
  },
  {
    key: 'fillForms',
    label: 'Fill Forms',
    description: 'Allow filling in form fields',
    jsPdfValue: 'fillForms',
    icon: <FileText className="h-4 w-4" />,
    defaultChecked: true,
  },
  {
    key: 'extract',
    label: 'Extract',
    description: 'Allow extracting content for accessibility',
    jsPdfValue: 'extract',
    icon: <Copy className="h-4 w-4" />,
    defaultChecked: true,
  },
  {
    key: 'assemble',
    label: 'Assemble',
    description: 'Allow inserting/rotating pages',
    jsPdfValue: 'assemble',
    icon: <Puzzle className="h-4 w-4" />,
    defaultChecked: false,
  },
]

// â”€â”€â”€ Format helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

// â”€â”€â”€ Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function ProtectPdf({ onBack }: { onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([])
  const [userPassword, setUserPassword] = useState('')
  const [ownerPassword, setOwnerPassword] = useState('')
  const [confirmUserPassword, setConfirmUserPassword] = useState('')
  const [confirmOwnerPassword, setConfirmOwnerPassword] = useState('')
  const [showUserPassword, setShowUserPassword] = useState(false)
  const [showOwnerPassword, setShowOwnerPassword] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [useOwnerPassword, setUseOwnerPassword] = useState(false)
  const [permissions, setPermissions] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    for (const p of PERMISSION_OPTIONS) {
      initial[p.key] = p.defaultChecked
    }
    return initial
  })
  const [result, setResult] = useState<{
    originalSize: number
    protectedSize: number
    pages: number
    permissions: string[]
  } | null>(null)

  const strength = useMemo(() => getPasswordStrength(userPassword), [userPassword])

  const handlePermissionChange = (key: string, checked: boolean) => {
    setPermissions((prev) => ({ ...prev, [key]: checked }))
  }

  const handleSelectAll = () => {
    const allTrue: Record<string, boolean> = {}
    for (const p of PERMISSION_OPTIONS) {
      allTrue[p.key] = true
    }
    setPermissions(allTrue)
  }

  const handleDeselectAll = () => {
    const allFalse: Record<string, boolean> = {}
    for (const p of PERMISSION_OPTIONS) {
      allFalse[p.key] = false
    }
    setPermissions(allFalse)
  }

  const handleProtect = async () => {
    if (files.length === 0) {
      toast.error('Please select a PDF file')
      return
    }
    if (!userPassword) {
      toast.error('Please enter a user password')
      return
    }
    if (userPassword !== confirmUserPassword) {
      toast.error('User passwords do not match')
      return
    }
    if (useOwnerPassword && ownerPassword !== confirmOwnerPassword) {
      toast.error('Owner passwords do not match')
      return
    }
    if (useOwnerPassword && !ownerPassword) {
      toast.error('Please enter an owner password')
      return
    }

    setProcessing(true)
    setResult(null)
    setProgress(0)

    try {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.7.284/build/pdf.worker.min.mjs'

      const jsPDF = (await import('jspdf')).default

      const arrayBuffer = await files[0].arrayBuffer()
      const originalSizeBytes = arrayBuffer.byteLength

      // Load the original PDF to render pages
      const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise
      const totalPages = pdf.numPages

      // Render each page to canvas and collect images
      const pageImages: { dataUrl: string; width: number; height: number }[] = []

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i)
        // Use a high scale for quality preservation
        const viewport = page.getViewport({ scale: 2.0 })

        const canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        const context = canvas.getContext('2d')!

        await page.render({ canvasContext: context, viewport, canvas } as any).promise

        // Use PNG for best quality â€” this is a protect tool, not compression
        const dataUrl = canvas.toDataURL('image/png')
        pageImages.push({
          dataUrl,
          width: viewport.width,
          height: viewport.height,
        })

        setProgress(Math.round((i / totalPages) * 50))

        // Free canvas memory
        canvas.width = 0
        canvas.height = 0
      }

      // Build the list of user permissions for jsPDF
      const userPermissions: string[] = []
      for (const p of PERMISSION_OPTIONS) {
        if (permissions[p.key]) {
          userPermissions.push(p.jsPdfValue)
        }
      }

      // Create new jsPDF with encryption
      const firstImage = pageImages[0]
      const protectedDoc = new jsPDF({
        orientation: firstImage.width > firstImage.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [firstImage.width, firstImage.height],
        encryption: {
          userPassword: userPassword,
          ownerPassword: useOwnerPassword ? ownerPassword : userPassword,
          userPermissions: userPermissions,
        },
      })

      // Set mypdftools branding
      protectedDoc.setProperties({
        creator: 'mypdftools.in',
        producer: 'mypdftools.in',
      })

      // Add pages
      for (let i = 0; i < pageImages.length; i++) {
        if (i > 0) {
          protectedDoc.addPage(
            [pageImages[i].width, pageImages[i].height],
            pageImages[i].width > pageImages[i].height ? 'landscape' : 'portrait'
          )
        }
        protectedDoc.addImage(
          pageImages[i].dataUrl,
          'PNG',
          0,
          0,
          pageImages[i].width,
          pageImages[i].height,
          undefined,
          'FAST'
        )

        setProgress(50 + Math.round(((i + 1) / pageImages.length) * 50))
      }

      // Generate and download
      const blob = protectedDoc.output('blob')
      const fileName = files[0].name.replace(/\.pdf$/i, '')
      saveAs(blob, `${fileName}-protected.pdf`)

      setResult({
        originalSize: originalSizeBytes,
        protectedSize: blob.size,
        pages: totalPages,
        permissions: userPermissions,
      })

      toast.success('PDF protected with encryption successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to protect PDF. The file may be corrupted or too large.')
    } finally {
      setProcessing(false)
      setProgress(0)
    }
  }

  const canProtect =
    files.length > 0 &&
    userPassword.length > 0 &&
    userPassword === confirmUserPassword &&
    (!useOwnerPassword || (ownerPassword.length > 0 && ownerPassword === confirmOwnerPassword))

  return (
    <ToolLayout
      title="Protect PDF"
      description="Add password protection and encryption to your PDF file."
      icon={<Lock className="h-5 w-5" />}
      onBack={onBack}
    >
      {/* File dropzone */}
      <FileDropzone
        accept=".pdf"
        multiple={false}
        files={files}
        onFilesChange={setFiles}
        label="Drop a PDF file here"
        description="Select a PDF to protect with password encryption"
      />

      {/* File info */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="rounded-xl border bg-muted/30 p-4 space-y-1">
            <p className="text-sm font-medium">Current File</p>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">File name:</span>
              <span className="truncate max-w-[60%] text-right">{files[0].name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Original size:</span>
              <span className="font-medium">{formatSize(files[0].size)}</span>
            </div>
          </div>
          
          <div className="rounded-lg border bg-yellow-500/10 border-yellow-500/20 p-3">
            <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" />
              Important Note on Quality
            </p>
            <p className="text-xs text-yellow-600/80 dark:text-yellow-400/80 mt-1">
              To apply secure encryption entirely in your browser without uploading to a server, this tool converts your PDF pages into high-quality images. The resulting file may be larger, and text will no longer be selectable.
            </p>
          </div>
        </div>
      )}

      {/* Password section */}
      {files.length > 0 && (
        <div className="rounded-xl border bg-muted/20 p-5 space-y-5">
          {/* â”€â”€ User Password â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-[#EE6C4D]" />
              <Label className="text-sm font-semibold">User Password</Label>
              <span className="text-xs text-muted-foreground">(required to open)</span>
            </div>

            <div className="relative">
              <Input
                id="userPassword"
                type={showUserPassword ? 'text' : 'password'}
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="Enter user password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowUserPassword(!showUserPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showUserPassword ? 'Hide password' : 'Show password'}
              >
                {showUserPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* Password strength indicator */}
            {userPassword && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  {strength.icon}
                  <span className={`text-xs font-medium ${strength.color}`}>{strength.label}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      strength.score <= 2
                        ? 'bg-red-500'
                        : strength.score <= 4
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(100, (strength.score / 7) * 100)}%` }}
                  />
                </div>
                <div className="flex gap-3 text-[10px] text-muted-foreground">
                  <span className={userPassword.length >= 6 ? 'text-green-500' : ''}>
                    {userPassword.length >= 6 ? 'âœ“' : 'â—‹'} 6+ chars
                  </span>
                  <span className={/[A-Z]/.test(userPassword) ? 'text-green-500' : ''}>
                    {/[A-Z]/.test(userPassword) ? 'âœ“' : 'â—‹'} Uppercase
                  </span>
                  <span className={/[0-9]/.test(userPassword) ? 'text-green-500' : ''}>
                    {/[0-9]/.test(userPassword) ? 'âœ“' : 'â—‹'} Number
                  </span>
                  <span className={/[^A-Za-z0-9]/.test(userPassword) ? 'text-green-500' : ''}>
                    {/[^A-Za-z0-9]/.test(userPassword) ? 'âœ“' : 'â—‹'} Symbol
                  </span>
                </div>
              </div>
            )}

            <div className="relative">
              <Input
                id="confirmUserPassword"
                type={showUserPassword ? 'text' : 'password'}
                value={confirmUserPassword}
                onChange={(e) => setConfirmUserPassword(e.target.value)}
                placeholder="Confirm user password"
                className={`pr-10 ${
                  confirmUserPassword && confirmUserPassword !== userPassword
                    ? 'border-red-500 focus-visible:border-red-500'
                    : confirmUserPassword && confirmUserPassword === userPassword
                      ? 'border-green-500 focus-visible:border-green-500'
                      : ''
                }`}
              />
              {confirmUserPassword && (
                <span
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium ${
                    confirmUserPassword === userPassword ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {confirmUserPassword === userPassword ? 'âœ“ Match' : 'âœ— Mismatch'}
                </span>
              )}
            </div>
          </div>

          <Separator />

          {/* â”€â”€ Owner Password â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#EE6C4D]" />
                <Label className="text-sm font-semibold">Owner Password</Label>
                <span className="text-xs text-muted-foreground">(controls permissions)</span>
              </div>
              <button
                type="button"
                onClick={() => setUseOwnerPassword(!useOwnerPassword)}
                className={`text-xs font-medium px-2.5 py-1 rounded-full border transition-colors ${
                  useOwnerPassword
                    ? 'bg-[#EE6C4D]/10 text-[#EE6C4D] border-[#EE6C4D]/30'
                    : 'text-muted-foreground border-muted hover:border-muted-foreground/30'
                }`}
              >
                {useOwnerPassword ? 'Enabled' : 'Optional'}
              </button>
            </div>

            <p className="text-xs text-muted-foreground">
              The owner password controls what users can do with the PDF. If not set, the user password is also used as
              the owner password.
            </p>

            {useOwnerPassword && (
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    id="ownerPassword"
                    type={showOwnerPassword ? 'text' : 'password'}
                    value={ownerPassword}
                    onChange={(e) => setOwnerPassword(e.target.value)}
                    placeholder="Enter owner password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOwnerPassword(!showOwnerPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showOwnerPassword ? 'Hide password' : 'Show password'}
                  >
                    {showOwnerPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    id="confirmOwnerPassword"
                    type={showOwnerPassword ? 'text' : 'password'}
                    value={confirmOwnerPassword}
                    onChange={(e) => setConfirmOwnerPassword(e.target.value)}
                    placeholder="Confirm owner password"
                    className={`pr-10 ${
                      confirmOwnerPassword && confirmOwnerPassword !== ownerPassword
                        ? 'border-red-500 focus-visible:border-red-500'
                        : confirmOwnerPassword && confirmOwnerPassword === ownerPassword
                          ? 'border-green-500 focus-visible:border-green-500'
                          : ''
                    }`}
                  />
                  {confirmOwnerPassword && (
                    <span
                      className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium ${
                        confirmOwnerPassword === ownerPassword ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {confirmOwnerPassword === ownerPassword ? 'âœ“ Match' : 'âœ— Mismatch'}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* â”€â”€ Permissions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">User Permissions</Label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
                >
                  Select all
                </button>
                <span className="text-muted-foreground">|</span>
                <button
                  type="button"
                  onClick={handleDeselectAll}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
                >
                  Deselect all
                </button>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Choose what actions users can perform after opening the PDF with the user password.
              Unchecked permissions will be blocked.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PERMISSION_OPTIONS.map((perm) => (
                <label
                  key={perm.key}
                  className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-all ${
                    permissions[perm.key]
                      ? 'border-[#EE6C4D]/40 bg-[#EE6C4D]/5'
                      : 'border-muted hover:border-muted-foreground/20'
                  }`}
                >
                  <Checkbox
                    checked={permissions[perm.key]}
                    onCheckedChange={(checked) => handlePermissionChange(perm.key, checked === true)}
                    className="mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-muted-foreground">{perm.icon}</span>
                      <span className="text-sm font-medium">{perm.label}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{perm.description}</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="rounded-lg border bg-yellow-500/5 border-yellow-500/20 p-3">
              <p className="text-xs text-yellow-600 dark:text-yellow-400">
                <strong>Note:</strong> Permissions are enforced by PDF reader applications. Some readers may not respect
                all permission restrictions. The encryption itself (password required to open) is always enforced.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action button */}
      <Button
        onClick={handleProtect}
        disabled={processing || !canProtect}
        className="w-full"
        size="lg"
      >
        {processing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Protecting... {progress > 0 ? `${progress}%` : ''}
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            Protect & Download
          </>
        )}
      </Button>

      {/* Progress bar */}
      {processing && (
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-[#EE6C4D] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="rounded-xl border bg-muted/30 p-5 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="h-4 w-4 text-green-600" />
            <p className="text-sm font-semibold">Protection Applied Successfully</p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg border bg-background p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Pages</p>
              <p className="text-sm font-bold">{result.pages}</p>
            </div>
            <div className="rounded-lg border bg-background p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Original</p>
              <p className="text-sm font-bold">{formatSize(result.originalSize)}</p>
            </div>
            <div className="rounded-lg border bg-background p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Protected</p>
              <p className="text-sm font-bold text-green-600">{formatSize(result.protectedSize)}</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Applied Permissions:</p>
            <div className="flex flex-wrap gap-1.5">
              {PERMISSION_OPTIONS.map((perm) => (
                <span
                  key={perm.key}
                  className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-full ${
                    result.permissions.includes(perm.jsPdfValue)
                      ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                      : 'bg-red-500/10 text-red-500 dark:text-red-400'
                  }`}
                >
                  {result.permissions.includes(perm.jsPdfValue) ? 'âœ“' : 'âœ—'} {perm.label}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border bg-blue-500/5 border-blue-500/20 p-3">
            <p className="text-xs text-blue-600 dark:text-blue-400">
              <strong>Encrypted PDF:</strong> This file uses AES-256 encryption. Users will need the user password to
              open it. The owner password controls permission settings. Use our <strong>Unlock PDF</strong> tool to
              remove protection if needed.
            </p>
          </div>
        </div>
      )}
    </ToolLayout>
  )
}

