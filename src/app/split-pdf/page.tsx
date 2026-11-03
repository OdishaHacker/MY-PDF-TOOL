import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';
import { toolMeta } from '@/lib/toolMeta';

const meta = toolMeta.find((t) => t.slug === 'split-pdf')!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: 'https://mypdftools.in/split-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Split PDF Pages Online Free"
      description="Split one PDF into multiple documents or extract specific pages — right in your browser, with no upload and no signup."
      slug="split-pdf"
      category="Organize PDF"
      howToUseSteps={[
    "Drag and drop your PDF file into the dropzone, or click it to pick a file from your device.",
    "Choose how you want to split: extract selected pages, split by fixed page ranges, or one file per page.",
    "Enter the page numbers or ranges you want — for example 1-3, 5, 8-10.",
    "Click the \"Split\" button and let the tool cut the document locally in your browser.",
    "Download each resulting PDF, or grab them all and rename as needed."
  ]}
      aboutContent="The mypdftools PDF Splitter cuts a large PDF into smaller, focused documents in seconds. Extract a single page, pull out a chapter, or divide a 200-page report into weekly chunks — every operation happens inside your browser, so the file never leaves your device."
      aboutParagraphs={[
    "A large PDF is rarely useful as one block. An 80-page tender document may need to be shared with three different departments, each responsible for its own section. A scanned book chapter might be needed as a separate handout. Bank statements arrive as 12-months-in-one files, but each month has to be submitted separately. Splitting solves all of these — you keep the master copy and hand out only the relevant slices.",
    "The splitter offers three practical modes. Page extraction picks just the pages you list and leaves the rest out. Range splitting divides the document into fixed, equal or custom ranges — perfect for turning one file into predictable parts. Per-page splitting creates one PDF for every single page, which is handy when each page is an independent certificate, ticket, or voucher.",
    "Splitting is a purely local operation: the browser reads your PDF, copies the pages you asked for into new documents, and saves them to your downloads folder. Nothing is transmitted, so even sensitive files — payslips, contracts, medical reports — stay private. The original PDF is never modified, so you can experiment freely."
  ]}
      useCases={[
    {
      "title": "Monthly Statement Separation",
      "description": "Turn a single 12-month bank or card statement into twelve individual files, one for each month you need to submit."
    },
    {
      "title": "Chapter Extraction",
      "description": "Pull one chapter or lecture out of a course pack or e-book so students receive only the material they need."
    },
    {
      "title": "Section-Based Sharing",
      "description": "Share just the financial appendix or technical annex of a long report with the colleague who actually needs it."
    },
    {
      "title": "Certificate per Page",
      "description": "Event organizers split a bulk PDF of participation certificates into one personalized file per attendee."
    },
    {
      "title": "Reducing File Size",
      "description": "When an email attachment is too large, split the document in half and send the parts separately."
    }
  ]}
      tips={[
    "Use hyphens for ranges and commas between them — for example \"1-4, 9, 12-15\" — to extract several sections in one pass.",
    "Open the PDF first and note the exact page numbers you need; PDF page numbers count from the cover, not from printed labels.",
    "Per-page mode produces many small files — move them into a new folder afterward to keep your downloads tidy.",
    "Splitting never changes page content or quality; the extracted pages are byte-identical copies of the original pages.",
    "After splitting a big report, use the Merge PDF tool later if you ever need to stitch selected parts back together.",
    "Want to delete just a few pages instead? Organize PDF lets you remove pages visually, which is often faster than splitting."
  ]}
      relatedGuides={[
    {
      "name": "How to Split PDF Files & Extract Pages",
      "href": "/blog/split-pdf-tips"
    },
    {
      "name": "How to Merge PDF Files: Step-by-Step",
      "href": "/blog/merge-pdf-guide"
    },
    {
      "name": "How to Organize & Reorder PDF Pages",
      "href": "/blog/organize-pdf-pages"
    }
  ]}

      relatedTools={[
    {
      "name": "Merge PDF",
      "href": "/merge-pdf"
    },
    {
      "name": "Organize PDF",
      "href": "/organize-pdf"
    },
    {
      "name": "Compress PDF",
      "href": "/compress-pdf"
    },
    {
      "name": "Page Numbers",
      "href": "/page-numbers"
    },
    {
      "name": "PDF to JPG",
      "href": "/pdf-to-jpg"
    },
    {
      "name": "Unlock PDF",
      "href": "/unlock-pdf"
    }
  ]}
      faqItems={[
    {
      "question": "Can I split a PDF without uploading it anywhere?",
      "answer": "Yes — that is exactly how this tool works. The PDF is read by your own browser and split locally. No file is ever sent to a server, so your document never leaves your computer."
    },
    {
      "question": "How do I extract only pages 5 to 9?",
      "answer": "Choose the extract option and enter the range 5-9. The tool creates a new PDF containing only those five pages, in their original order and quality."
    },
    {
      "question": "Will splitting reduce the quality of my pages?",
      "answer": "No. Splitting copies existing pages into new files without re-rendering them, so text, fonts, and images stay exactly as sharp as in the original document."
    },
    {
      "question": "How many smaller PDFs can one split produce?",
      "answer": "As many as you need — from one extracted range up to one file per page for a document with hundreds of pages. Limits depend only on your device memory."
    },
    {
      "question": "Can I split a password-protected PDF?",
      "answer": "You need to unlock it first, because encrypted files cannot be read by any tool without the password. Use the Unlock PDF tool, then split the unlocked file."
    },
    {
      "question": "Is the original file changed in any way?",
      "answer": "Never. Splitting creates brand-new output files; your source PDF stays untouched on your device exactly as it was."
    }
  ]}
    >
      <DynamicToolLoader toolSlug="split-pdf" />
    </ToolSeoPage>
  );
}
