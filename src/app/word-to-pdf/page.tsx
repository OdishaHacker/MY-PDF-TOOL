import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';
import { toolMeta } from '@/lib/toolMeta';

const meta = toolMeta.find((t) => t.slug === 'word-to-pdf')!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: 'https://mypdftools.in/word-to-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Convert Word (DOCX) to PDF Online"
      description="Turn Word documents into clean, shareable PDFs right in your browser. No upload, no signup, no watermarks on your output."
      slug="word-to-pdf"
      category="Convert to PDF"
      howToUseSteps={[
    "Drop your .docx file into the dropzone — it is read locally by your browser.",
    "Wait for the conversion to finish; text-based documents convert in seconds.",
    "Check the preview to confirm headings, lists, and images appear as expected.",
    "Click \"Download\" to save the converted PDF to your device.",
    "Share the PDF anywhere — it will look the same on every device that opens it."
  ]}
      aboutContent="The mypdftools Word-to-PDF converter transforms .docx documents into standards-compliant PDFs without uploading them anywhere. Your text, headings, lists, tables, and images are rendered into a fixed-layout PDF that displays identically on every device."
      aboutParagraphs={[
    "Word files are editing formats — they reflow, they depend on installed fonts, and they look different on every computer. PDF is a distribution format: it freezes the layout so your document reaches professors, clients, and officials exactly as you made it. That is why \"please send it as PDF\" has become the standard instruction everywhere from university portals to visa application centers.",
    "The converter reads the document structure — paragraphs, headings, bullet lists, tables, and embedded images — and renders them into PDF pages. Straightforward documents such as letters, resumes, assignments, and reports convert very faithfully. Heavily designed layouts with text boxes and custom effects are simplified to their core content, which is usually what matters for sharing.",
    "Everything happens locally. Your browser reads the .docx file, converts it in memory, and offers the result as a download. The document never crosses the network, which makes the tool suitable for confidential material — employment contracts, personal statements, financial worksheets — that you would not upload to a random website."
  ]}
      useCases={[
    {
      "title": "Resume Submissions",
      "description": "Send recruiters a PDF resume that keeps its formatting on every device and applicant tracking system."
    },
    {
      "title": "Assignment Uploads",
      "description": "Convert essays and reports to the PDF format most universities require for submissions."
    },
    {
      "title": "Official Applications",
      "description": "Produce the fixed-layout files demanded by visa, scholarship, and government application portals."
    },
    {
      "title": "Client Proposals",
      "description": "Lock a proposal’s layout before sending, so it cannot be edited accidentally or intentionally."
    },
    {
      "title": "Print-Ready Documents",
      "description": "Convert letters and forms to PDF so office printers output exactly what you see."
    }
  ]}
      tips={[
    "Use standard fonts (Arial, Calibri, Times New Roman) in your document for the most faithful conversion.",
    "Finish all edits in Word first — a PDF is a snapshot, so convert only the final version.",
    "Complex text-box layouts may simplify; move critical content into normal paragraphs before converting.",
    "Check the preview after conversion, especially page breaks around images and tables.",
    "Very old .doc files should be re-saved as .docx in Word first for reliable conversion.",
    "Need the reverse direction? PDF to Word extracts text from PDFs into an editable DOCX."
  ]}
      relatedGuides={[
    {
      "name": "How to Convert Plain Text to PDF",
      "href": "/blog/text-to-pdf-guide"
    },
    {
      "name": "How to Convert HTML to PDF",
      "href": "/blog/html-to-pdf-guide"
    },
    {
      "name": "Why You Should Stop Paying for PDF Software",
      "href": "/blog/free-pdf-tools-online"
    }
  ]}

      relatedTools={[
    {
      "name": "PDF to Word",
      "href": "/pdf-to-word"
    },
    {
      "name": "Excel to PDF",
      "href": "/excel-to-pdf"
    },
    {
      "name": "Merge PDF",
      "href": "/merge-pdf"
    },
    {
      "name": "Compress PDF",
      "href": "/compress-pdf"
    },
    {
      "name": "Protect PDF",
      "href": "/protect-pdf"
    },
    {
      "name": "Sign PDF",
      "href": "/sign-pdf"
    }
  ]}
      faqItems={[
    {
      "question": "Is my Word document uploaded to a server?",
      "answer": "No. The converter runs entirely in your browser. The .docx file is read, converted, and returned as a download without ever leaving your device."
    },
    {
      "question": "Why does my complex layout look simplified?",
      "answer": "The converter renders core document content — paragraphs, headings, lists, tables, images. Designer elements such as floating text boxes and layered shapes are flattened, because PDF needs fixed placement for every element."
    },
    {
      "question": "Can I convert .doc files from Word 2003?",
      "answer": "The tool supports the modern .docx format. Open legacy .doc files in Word or a free office suite, save them as .docx, then convert."
    },
    {
      "question": "Does the PDF contain a watermark?",
      "answer": "Never. The output PDF is clean — no watermark, no branding, no page limits, no hidden fees."
    },
    {
      "question": "Will my fonts look right on other computers?",
      "answer": "Yes — that is the point of PDF. Text is rendered into fixed glyphs at conversion time, so the document looks the same everywhere, even on devices without your fonts installed."
    },
    {
      "question": "Can I merge several converted PDFs afterward?",
      "answer": "Absolutely — convert each Word file separately, then use the Merge PDF tool to combine them into one document in the order you choose."
    }
  ]}
    >
      <DynamicToolLoader toolSlug="word-to-pdf" />
    </ToolSeoPage>
  );
}
