import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';
import { toolMeta } from '@/lib/toolMeta';

const meta = toolMeta.find((t) => t.slug === 'text-to-pdf')!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: 'https://mypdftools.in/text-to-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Convert Plain Text to PDF Online"
      description="Turn plain text, notes, and code into neatly formatted PDF pages. Paste or upload, pick a layout, and download — no upload to servers."
      slug="text-to-pdf"
      category="Convert to PDF"
      howToUseSteps={[
    "Paste your text into the input area, or drop a .txt file into the dropzone.",
    "Choose page size, font size, margins, and line spacing to taste.",
    "Optionally enable line numbers or a fixed-width font for code listings.",
    "Click \"Convert\" — the text is paginated into a clean PDF locally.",
    "Download the PDF for printing, archiving, or sharing."
  ]}
      aboutContent="The mypdftools Text-to-PDF converter transforms plain text into properly paginated, readable PDF documents. Perfect for notes, scripts, code listings, and manuscripts — you control the typography, and the output is a clean PDF instead of an unformatted .txt file."
      aboutParagraphs={[
    "Plain text is the most portable format in computing — and the least presentable. A .txt file has no pages, no margins, and no typography, so printers produce cramped walls of text and email clients mangle the line breaks. Converting to PDF adds the missing layer: page breaks, margins, consistent fonts, and a layout that looks considered rather than accidental.",
    "The converter gives you the essentials of typesetting without any complexity. Choose a standard paper size, set comfortable margins and font size, and the text flows across pages automatically. Writers use it to format manuscripts for submission; developers use the fixed-width option to keep code indentation intact; students use it to turn lecture notes into printable handouts.",
    "Like every tool here, conversion is local. Your text — which might be a private draft, a legal notice, or unreleased work — is processed inside your browser and saved directly to your device. Nothing is transmitted, stored, or logged anywhere else."
  ]}
      useCases={[
    {
      "title": "Manuscript Submission",
      "description": "Format stories, essays, and articles into page-numbered PDFs that meet submission guidelines."
    },
    {
      "title": "Code Printouts",
      "description": "Convert source files with a fixed-width font so indentation and alignment survive printing."
    },
    {
      "title": "Meeting Notes",
      "description": "Turn rough notes into tidy PDF minutes that can be filed, emailed, and archived."
    },
    {
      "title": "Legal & Official Drafts",
      "description": "Format plain-text notices and applications into printable documents with consistent layout."
    },
    {
      "title": "Reading Copies",
      "description": "Convert long text into comfortable, spaced PDF pages easy on the eyes for proofreading."
    }
  ]}
      tips={[
    "Line spacing of 1.4-1.6 makes long text dramatically easier to read on paper and screen.",
    "Use the fixed-width font for any text where alignment matters — code, tables drawn in ASCII, and columns.",
    "Blank lines in your text become paragraph breaks in the PDF, so add them where you want breathing room.",
    "Larger margins (an inch or more) leave room for handwritten comments after printing.",
    "Add page numbers afterward with the Page Numbers tool for multi-page documents.",
    "Proofread before converting — the PDF freezes your text exactly as pasted, typos included."
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
      "name": "Convert JPG Images to PDF",
      "href": "/blog/jpg-to-pdf-conversion"
    }
  ]}

      relatedTools={[
    {
      "name": "Word to PDF",
      "href": "/word-to-pdf"
    },
    {
      "name": "PDF to Text",
      "href": "/pdf-to-text"
    },
    {
      "name": "Page Numbers",
      "href": "/page-numbers"
    },
    {
      "name": "HTML to PDF",
      "href": "/html-to-pdf"
    },
    {
      "name": "Merge PDF",
      "href": "/merge-pdf"
    },
    {
      "name": "Protect PDF",
      "href": "/protect-pdf"
    }
  ]}
      faqItems={[
    {
      "question": "Can I change the font and size of the PDF text?",
      "answer": "Yes. The converter offers font size and layout options, plus a fixed-width mode for code. You choose the typography before converting."
    },
    {
      "question": "How does the tool decide where pages break?",
      "answer": "Text flows automatically — lines fill each page down to the bottom margin, then continue on the next page. There is no manual page-break management needed for plain text."
    },
    {
      "question": "Will my special characters convert correctly?",
      "answer": "Standard Unicode characters convert as displayed in the input box. If a character shows as a box in the preview, your source text likely contains a symbol the chosen font cannot display."
    },
    {
      "question": "Is there a length limit on the text?",
      "answer": "No hard limit — very long texts simply produce more pages. Your device memory is the only practical ceiling."
    },
    {
      "question": "Does the tool keep my line breaks as typed?",
      "answer": "Yes. Lines and blank lines are preserved, so a poem, a script, or an ASCII table lands in the PDF looking the way you typed it."
    },
    {
      "question": "Is the text uploaded during conversion?",
      "answer": "Never. Everything happens in your browser — the text never leaves your device."
    }
  ]}
    >
      <DynamicToolLoader toolSlug="text-to-pdf" />
    </ToolSeoPage>
  );
}
