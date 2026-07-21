// Centralized SEO metadata for every tool page.
// Kept in sync with the tools array in src/app/page.tsx.
// Used by per-route layout.tsx files to provide unique <title> and
// meta description per tool (critical for AdSense + SEO).

export interface ToolMeta {
  slug: string;          // route folder name, e.g. "merge-pdf"
  name: string;          // display name, e.g. "Merge PDF"
  title: string;         // <title> tag
  description: string;   // meta description (<=155 chars ideal)
  keywords: string[];
}

export const SITE_NAME = "mypdftools";
export const SITE_URL = "https://mypdftools.in";

export const toolMeta: ToolMeta[] = [
  {
    slug: "merge-pdf",
    name: "Merge PDF",
    title: "Merge PDF Online Free — Combine PDF Files in Browser | mypdftools",
    description: "Combine multiple PDF files into one document right in your browser. Free, no upload, no signup, no watermark. Drag to reorder and merge in seconds.",
    keywords: ["merge pdf", "combine pdf", "join pdf", "merge pdf online", "free pdf merger", "no upload pdf merge"],
  },
  {
    slug: "split-pdf",
    name: "Split PDF",
    title: "Split PDF Online Free — Extract PDF Pages in Browser | mypdftools",
    description: "Split a PDF by page ranges or extract individual pages. All processing runs in your browser — your file never gets uploaded anywhere. Free, no signup.",
    keywords: ["split pdf", "extract pdf pages", "divide pdf", "split pdf online", "free pdf splitter"],
  },
  {
    slug: "organize-pdf",
    name: "Organize PDF",
    title: "Organize PDF — Reorder, Rotate & Delete Pages Free | mypdftools",
    description: "Rearrange, rotate, or delete pages in your PDF with a simple drag-and-drop interface. Runs fully in your browser. No upload, no signup, 100% free.",
    keywords: ["organize pdf", "reorder pdf pages", "delete pdf pages", "arrange pdf", "pdf page organizer"],
  },
  {
    slug: "rotate-pdf",
    name: "Rotate PDF",
    title: "Rotate PDF Pages Online Free — 90/180/270° in Browser | mypdftools",
    description: "Rotate individual pages or the whole PDF by 90, 180, or 270 degrees. Everything happens locally in your browser — your file never leaves your device.",
    keywords: ["rotate pdf", "rotate pdf pages", "fix pdf orientation", "rotate pdf online free"],
  },
  {
    slug: "compress-pdf",
    name: "Compress PDF",
    title: "Compress PDF Online Free — Reduce PDF File Size in Browser | mypdftools",
    description: "Shrink large PDF files without losing quality. Choose your compression level, process in your browser, and keep your document private. Free, no upload.",
    keywords: ["compress pdf", "reduce pdf size", "pdf compressor", "shrink pdf", "optimize pdf", "free pdf compression"],
  },
  {
    slug: "repair-pdf",
    name: "Repair PDF",
    title: "Repair PDF Online Free — Fix Corrupted PDF Files in Browser | mypdftools",
    description: "Recover content from corrupted or damaged PDF files. The tool analyzes the file structure locally in your browser and tries to rebuild readable content.",
    keywords: ["repair pdf", "fix corrupted pdf", "recover damaged pdf", "pdf repair tool", "fix broken pdf"],
  },
  {
    slug: "jpg-to-pdf",
    name: "JPG to PDF",
    title: "JPG to PDF Online Free — Convert Images to PDF in Browser | mypdftools",
    description: "Turn JPG, PNG, or other images into a single PDF document. Reorder images, process locally, and download — no upload, no signup, completely free.",
    keywords: ["jpg to pdf", "image to pdf", "png to pdf", "convert images to pdf", "jpg to pdf online free"],
  },
  {
    slug: "word-to-pdf",
    name: "Word to PDF",
    title: "Word to PDF Online Free — Convert DOCX to PDF in Browser | mypdftools",
    description: "Convert Word (DOCX), Excel, or text files into clean PDFs without installing anything. Runs in your browser — your documents stay private and never get uploaded.",
    keywords: ["word to pdf", "docx to pdf", "convert word to pdf", "document to pdf", "free docx converter"],
  },
  {
    slug: "excel-to-pdf",
    name: "Excel to PDF",
    title: "Excel to PDF Online Free — Convert XLSX to PDF in Browser | mypdftools",
    description: "Convert Excel (XLSX) spreadsheets into a clean PDF. The conversion runs locally in your browser so your data stays private. Free and no signup required.",
    keywords: ["excel to pdf", "xlsx to pdf", "convert spreadsheet to pdf", "excel to pdf online free"],
  },
  {
    slug: "html-to-pdf",
    name: "HTML to PDF",
    title: "HTML to PDF Online Free — Convert Web Pages to PDF | mypdftools",
    description: "Convert HTML content or web pages into a PDF document right in your browser. No upload, no signup, completely free. Your data never leaves your device.",
    keywords: ["html to pdf", "webpage to pdf", "convert html to pdf", "html to pdf online free"],
  },
  {
    slug: "text-to-pdf",
    name: "Text to PDF",
    title: "Text to PDF Online Free — Convert TXT to PDF in Browser | mypdftools",
    description: "Convert plain text into a formatted PDF document. Choose page size and margins, process in your browser, and download. Free, private, no signup.",
    keywords: ["text to pdf", "txt to pdf", "convert text to pdf", "text to pdf online free"],
  },
  {
    slug: "pdf-to-jpg",
    name: "PDF to JPG",
    title: "PDF to JPG Online Free — Convert PDF Pages to Images | mypdftools",
    description: "Convert each PDF page into a JPG image. All conversion happens locally in your browser — your PDF is never uploaded anywhere. Free, no signup required.",
    keywords: ["pdf to jpg", "pdf to image", "convert pdf to jpg", "pdf to jpg online free", "extract images from pdf"],
  },
  {
    slug: "pdf-to-word",
    name: "PDF to Word",
    title: "PDF to Word Online Free — Convert PDF to DOCX in Browser | mypdftools",
    description: "Extract editable text from your PDF into a Word (DOCX) document. Processing runs in your browser so your file stays private. Free, no signup required.",
    keywords: ["pdf to word", "pdf to docx", "convert pdf to word", "pdf to word online free", "edit pdf in word"],
  },
  {
    slug: "pdf-to-excel",
    name: "PDF to Excel",
    title: "PDF to Excel Online Free — Extract Tables to XLSX | mypdftools",
    description: "Pull tabular data out of a PDF into an Excel (XLSX) file. The extraction runs locally in your browser — your data stays on your device. Free and no signup.",
    keywords: ["pdf to excel", "pdf to xlsx", "extract table from pdf", "pdf to excel online free"],
  },
  {
    slug: "pdf-to-powerpoint",
    name: "PDF to PowerPoint",
    title: "PDF to PowerPoint Online Free — Convert PDF to PPTX | mypdftools",
    description: "Convert your PDF into an editable PowerPoint (PPTX) presentation. Everything happens in your browser — no upload, no signup, completely free to use.",
    keywords: ["pdf to powerpoint", "pdf to pptx", "convert pdf to ppt", "pdf to ppt online free"],
  },
  {
    slug: "pdf-to-text",
    name: "PDF to Text",
    title: "PDF to Text Online Free — Extract Text from PDF | mypdftools",
    description: "Pull plain text out of any PDF so you can copy, edit, or reuse it. The extraction runs entirely in your browser. Free, no upload, no signup needed.",
    keywords: ["pdf to text", "extract text from pdf", "pdf to txt", "pdf to text online free"],
  },
  {
    slug: "edit-pdf",
    name: "Edit PDF",
    title: "Edit PDF Online Free — Add Text, Shapes & Annotations | mypdftools",
    description: "Add text, shapes, and annotations to your PDF directly in your browser. No expensive software, no upload, no signup. Free and completely private.",
    keywords: ["edit pdf", "annotate pdf", "add text to pdf", "pdf editor online free", "free pdf editor"],
  },
  {
    slug: "add-watermark",
    name: "Watermark PDF",
    title: "Add Watermark to PDF Online Free — Stamp PDF in Browser | mypdftools",
    description: "Add text watermarks to your PDF to protect ownership or brand your documents. Custom text, position, and opacity. Runs in your browser, free, no signup.",
    keywords: ["watermark pdf", "add watermark to pdf", "stamp pdf", "pdf watermark online free", "brand pdf"],
  },
  {
    slug: "page-numbers",
    name: "Page Numbers PDF",
    title: "Add Page Numbers to PDF Online Free | mypdftools",
    description: "Insert page numbers into your PDF with full control over position, format, and starting number. Everything runs in your browser — free and private.",
    keywords: ["page numbers pdf", "add page numbers to pdf", "number pdf pages", "pdf pagination online free"],
  },
  {
    slug: "crop-pdf",
    name: "Crop PDF",
    title: "Crop PDF Online Free — Trim PDF Margins in Browser | mypdftools",
    description: "Crop unwanted margins or whitespace from your PDF pages. Apply to one page or all pages. Runs locally in your browser, free, no signup required.",
    keywords: ["crop pdf", "trim pdf", "cut pdf margins", "crop pdf pages", "crop pdf online free"],
  },
  {
    slug: "redact-pdf",
    name: "Redact PDF",
    title: "Redact PDF Online Free — Black Out Sensitive Text | mypdftools",
    description: "Permanently black out sensitive information in your PDF before sharing. All redaction happens in your browser so nothing ever gets uploaded. Free, private.",
    keywords: ["redact pdf", "black out pdf", "censor pdf", "hide text in pdf", "redact pdf online free"],
  },
  {
    slug: "protect-pdf",
    name: "Protect PDF",
    title: "Protect PDF with Password Online Free | mypdftools",
    description: "Add password encryption to your PDF so only authorized people can open it. Encryption runs locally in your browser — your file and password never get uploaded.",
    keywords: ["protect pdf", "password protect pdf", "encrypt pdf", "secure pdf", "lock pdf", "free pdf protection"],
  },
  {
    slug: "unlock-pdf",
    name: "Unlock PDF",
    title: "Unlock PDF Online Free — Remove Password in Browser | mypdftools",
    description: "Remove password protection from a PDF when you know the password. Runs entirely in your browser — your file and password stay on your device. Free.",
    keywords: ["unlock pdf", "remove pdf password", "decrypt pdf", "unlock pdf online free"],
  },
  {
    slug: "sign-pdf",
    name: "Sign PDF",
    title: "Sign PDF Online Free — Draw & Place Electronic Signature | mypdftools",
    description: "Draw your signature with mouse or touch and place it anywhere on your PDF. No printing, no signup, no upload. Runs in your browser, completely free.",
    keywords: ["sign pdf", "electronic signature", "esign pdf", "draw signature on pdf", "sign pdf online free"],
  },
];

// Quick lookup by slug
export function getToolMeta(slug: string): ToolMeta | undefined {
  return toolMeta.find((t) => t.slug === slug);
}

// Helper to build a standard Metadata object for a tool route
export function buildToolMetadata(slug: string) {
  const t = getToolMeta(slug);
  if (!t) return undefined;
  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    alternates: {
      canonical: `${SITE_URL}/${t.slug}/`,
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: `${SITE_URL}/${t.slug}/`,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: t.title,
      description: t.description,
    },
  };
}
