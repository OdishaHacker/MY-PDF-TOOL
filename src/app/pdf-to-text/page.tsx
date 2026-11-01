import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';
import { toolMeta } from '@/lib/toolMeta';

const meta = toolMeta.find((t) => t.slug === 'pdf-to-text')!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: 'https://mypdftools.in/pdf-to-text/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Extract Plain Text from PDF Online"
      description="Pull clean, plain text out of any text-based PDF — in your browser, with no uploads and no watermarks."
      slug="pdf-to-text"
      category="Convert from PDF"
      howToUseSteps={[
    "Drop a text-based PDF into the dropzone — reports, papers, and e-books convert best.",
    "The tool reads the text layer from every page locally in your browser.",
    "Click \"Extract\" to gather the text in reading order.",
    "Review or edit the extracted text directly in the output panel.",
    "Copy it to your clipboard or download it as a .txt file."
  ]}
      aboutContent="The mypdftools PDF-to-Text extractor pulls the raw text out of PDF documents and hands it to you as clean, plain text. Perfect for quoting, indexing, translating, or feeding content into another tool — fast, private, and free."
      aboutParagraphs={[
    "PDF is a print format pretending to be a data format — the text is inside, but selecting and copying across hundreds of pages is painful and unreliable. A bulk text extraction solves this: one click produces the whole document’s text as a single plain file you can search, edit, translate, or analyze.",
    "The extractor reads the embedded text layer — the actual characters stored in the PDF — and outputs them in reading order. Research workflows use it to mine papers for quotes; writers use it to recover their own out-of-print articles; developers feed the output into search indexes and data pipelines. Because output is plain text, it drops cleanly into any downstream tool without formatting surprises.",
    "Extraction happens entirely on your device. Academic papers under license, confidential reports, and personal archives never touch a server. The tool simply reads the file you provide, pulls the characters out, and shows them to you — the fastest possible path from locked-down PDF to usable text."
  ]}
      useCases={[
    {
      "title": "Research & Quotes",
      "description": "Extract passages from papers and reports for accurate citation in your own writing."
    },
    {
      "title": "Translation Prep",
      "description": "Produce plain source text ready for translation tools and translators."
    },
    {
      "title": "Content Indexing",
      "description": "Feed document text into search engines, databases, or AI tools that need plain input."
    },
    {
      "title": "Data Mining",
      "description": "Pull names, dates, and figures from many documents for further processing."
    },
    {
      "title": "Accessibility",
      "description": "Convert text-based PDFs into screen-reader-friendly plain text files."
    }
  ]}
      tips={[
    "Test whether a PDF has a text layer by selecting text with your cursor — if you can select, you can extract.",
    "Scanned documents are images; run OCR software first to create a text layer, then extract.",
    "Multi-column layouts may interleave in the output — check the first page and adjust your reading of the text.",
    "Plain text strips bold, italics, and layout — add formatting afterward in your editor if needed.",
    "Use the downloaded .txt for bulk work, and clipboard copy for quick single-page grabs.",
    "For exact visual references, pair extraction with PDF to JPG so you keep images of the original pages."
  ]}
      relatedTools={[
    {
      "name": "PDF to Word",
      "href": "/pdf-to-word"
    },
    {
      "name": "PDF to Excel",
      "href": "/pdf-to-excel"
    },
    {
      "name": "Text to PDF",
      "href": "/text-to-pdf"
    },
    {
      "name": "PDF to JPG",
      "href": "/pdf-to-jpg"
    },
    {
      "name": "Split PDF",
      "href": "/split-pdf"
    },
    {
      "name": "Merge PDF",
      "href": "/merge-pdf"
    }
  ]}
      faqItems={[
    {
      "question": "Why is my extracted text empty or garbled?",
      "answer": "The PDF likely has no text layer — it is a scan. Or it uses an unusual font encoding. Try another PDF to confirm the tool works, and use OCR for scanned documents."
    },
    {
      "question": "Does extraction keep the reading order?",
      "answer": "Yes, pages are processed in order and text is emitted in the document’s reading sequence. Complex multi-column layouts can still interleave, so spot-check the output."
    },
    {
      "question": "Is there a page limit for extraction?",
      "answer": "No hard limit. Large documents simply take a little longer to process locally on your device."
    },
    {
      "question": "Is my document uploaded anywhere?",
      "answer": "No. Extraction happens entirely inside your browser. The text never leaves your device unless you choose to save or share it."
    },
    {
      "question": "Does the output include images?",
      "answer": "No — this tool outputs text only. Use PDF to JPG if you need the visual pages as images."
    },
    {
      "question": "Can I extract text from a password-protected PDF?",
      "answer": "Not while it is encrypted. Unlock the PDF first with the Unlock PDF tool, then extract the text."
    }
  ]}
    >
      <DynamicToolLoader toolSlug="pdf-to-text" />
    </ToolSeoPage>
  );
}
