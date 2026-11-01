import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';
import { toolMeta } from '@/lib/toolMeta';

const meta = toolMeta.find((t) => t.slug === 'edit-pdf')!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: 'https://mypdftools.in/edit-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Edit PDF Online Free"
      description="Add text, shapes, and drawings on top of any PDF page. Visual editing, instant download — and your file never leaves the browser."
      slug="edit-pdf"
      category="Edit PDF"
      howToUseSteps={[
    "Drop your PDF into the dropzone to load it in the visual editor.",
    "Pick a page and choose the tool: text box, shape, or freehand drawing.",
    "Click on the page where you want to add content, then type or draw.",
    "Adjust size, color, and position until the addition sits exactly right.",
    "Click \"Save\" to apply the edits locally and download the updated PDF."
  ]}
      aboutContent="The mypdftools PDF Editor lets you write on, draw on, and mark up PDF pages directly in your browser. Add missing text, fill simple blanks, circle key figures, or sketch corrections — then download a clean, updated PDF in seconds."
      aboutParagraphs={[
    "Most PDF editing needs are small and urgent: a date that must be filled in, a name spelled wrong on a cover page, a number that needs circling before the meeting, a quick note beside a paragraph. Dedicated PDF suites are expensive overkill for these moments. A lightweight browser editor that opens instantly and does exactly this — add text, shapes, and drawings — covers 90 percent of real-world editing requests.",
    "The editor works on a visual canvas: each page appears as you know it, and you place content exactly where it belongs. Text boxes take any size and color; shapes include boxes and lines for emphasis; the drawing tool handles freehand marks and signatures. What you see while editing is precisely what the saved PDF will show.",
    "Your document stays local throughout. The PDF is read from your device, edited in browser memory, and written back as a new file. Originals are never overwritten — every edit session produces a fresh copy, so you can experiment without fear."
  ]}
      useCases={[
    {
      "title": "Filling Simple Blanks",
      "description": "Type dates, reference numbers, and short answers directly onto forms that lack fillable fields."
    },
    {
      "title": "Review Markups",
      "description": "Circle figures, underline clauses, and add margin notes before sending feedback to a colleague."
    },
    {
      "title": "Correcting Typos",
      "description": "Fix a wrong date or misspelled word by placing a clean text box over the error."
    },
    {
      "title": "Teaching & Tutoring",
      "description": "Annotate worksheets and exam papers with explanations during online lessons."
    },
    {
      "title": "Quick Signatures",
      "description": "Draw or place a short approval note where a formal signature tool is more than needed."
    }
  ]}
      tips={[
    "Place text boxes slightly larger than needed — text does not wrap automatically once placed.",
    "Match the font color to the document for invisible-looking corrections, or use red for visible review notes.",
    "Zoom in before placing small text so the box lands exactly on the right line.",
    "Save a copy first for big annotation sessions — the editor outputs a new file, keeping your original safe.",
    "Draw signatures with a mouse, trackpad, or finger — or use the dedicated Sign PDF tool for reusable signatures.",
    "For permanent redaction of sensitive text, use the Redact PDF tool instead of drawn black boxes."
  ]}
      relatedTools={[
    {
      "name": "Sign PDF",
      "href": "/sign-pdf"
    },
    {
      "name": "Add Watermark",
      "href": "/add-watermark"
    },
    {
      "name": "Redact PDF",
      "href": "/redact-pdf"
    },
    {
      "name": "Page Numbers",
      "href": "/page-numbers"
    },
    {
      "name": "Crop PDF",
      "href": "/crop-pdf"
    },
    {
      "name": "Merge PDF",
      "href": "/merge-pdf"
    }
  ]}
      faqItems={[
    {
      "question": "Can I edit the existing text of my PDF?",
      "answer": "The editor adds new content on top of pages — text boxes, shapes, and drawings. Rewriting the PDF’s original embedded text is a different operation; for that, convert to Word with PDF to Word, edit, and convert back."
    },
    {
      "question": "Will my edits look the same on other devices?",
      "answer": "Yes. Additions are saved into the PDF at fixed positions, so every viewer on every device shows them exactly where you placed them."
    },
    {
      "question": "Does editing upload my document?",
      "answer": "No. The editor runs entirely in your browser — the file is read locally, edited in memory, and saved back to your device."
    },
    {
      "question": "Can I undo a misplaced text box?",
      "answer": "Yes. Remove the element on the canvas before saving, or reload the page to discard the whole session — your original file is never modified."
    },
    {
      "question": "What can I add with the editor?",
      "answer": "Text of any size and color, basic shapes for emphasis, and freehand drawings. It covers annotations, corrections, fills, and quick markup."
    },
    {
      "question": "Is there a page limit or watermark?",
      "answer": "None. Edit as many pages as you like and download without watermarks — the same free policy as every mypdftools tool."
    }
  ]}
    >
      <DynamicToolLoader toolSlug="edit-pdf" />
    </ToolSeoPage>
  );
}
