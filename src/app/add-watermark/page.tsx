import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';
import { toolMeta } from '@/lib/toolMeta';

const meta = toolMeta.find((t) => t.slug === 'add-watermark')!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: 'https://mypdftools.in/add-watermark/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Add Watermark to PDF Online"
      description="Stamp text watermarks across your PDF pages — draft labels, branding, confidentiality notes. Processed locally, free forever."
      slug="add-watermark"
      category="Security & Edit"
      howToUseSteps={[
    "Drop your PDF into the dropzone to load its pages.",
    "Type your watermark text — DRAFT, CONFIDENTIAL, or your brand name.",
    "Adjust font size, color, opacity, and rotation until it looks right.",
    "Choose the position: center, diagonal, or custom placement on the page.",
    "Click \"Apply\" to stamp every page locally, then download the watermarked PDF."
  ]}
      aboutContent="The mypdftools Watermark tool stamps your text across PDF pages with full control over size, opacity, angle, and position. Mark drafts, protect shared documents, and brand your outputs — all processed privately in your browser."
      aboutParagraphs={[
    "A watermark does a quiet, important job. It tells every reader at a glance that a document is a draft, not the final version. It marks a file as belonging to your organization when it travels outside. It signals confidentiality on material that must not circulate. And unlike a footer, a diagonal watermark survives cropping, printing, and screenshots — it is on the page, not beside it.",
    "The tool gives you the controls that matter. Text is the obvious one, but presentation is what makes a watermark professional: opacity tuned so content stays readable beneath it, rotation set to the classic 45-degree diagonal or straight horizontal, size scaled to the page, and position placed center or corner. Preview shows the exact result before you commit.",
    "Watermarking runs locally — the PDF is read, stamped, and saved in your browser. Contracts, unpublished reports, and internal documents never leave your device, and the output carries no tool branding of any kind: only your watermark appears."
  ]}
      useCases={[
    {
      "title": "Draft Marking",
      "description": "Label review copies with DRAFT so nobody mistakes them for the approved final version."
    },
    {
      "title": "Confidential Notices",
      "description": "Stamp CONFIDENTIAL or INTERNAL ONLY across documents shared with limited audiences."
    },
    {
      "title": "Brand Protection",
      "description": "Add your company name to outbound PDFs so shared copies always carry your mark."
    },
    {
      "title": "Sample Previews",
      "description": "Watermark portfolio and catalog samples sent to prospects before purchase."
    },
    {
      "title": "Student Handouts",
      "description": "Mark practice papers and solution files with your institute’s name before distribution."
    }
  ]}
      tips={[
    "Opacity around 30-50 percent keeps body text readable under the watermark.",
    "Diagonal (45°) center placement is the classic draft stamp — instantly recognizable, hard to miss.",
    "Light gray watermarks look more professional than loud red on business documents.",
    "Apply watermarks to final output only — re-watermarking a watermarked file stacks the marks.",
    "Use short text; one strong word reads better across a page than a full sentence.",
    "For ownership on leaked files, combine a watermark with document metadata via Protect PDF for stronger control."
  ]}
      relatedTools={[
    {
      "name": "Edit PDF",
      "href": "/edit-pdf"
    },
    {
      "name": "Protect PDF",
      "href": "/protect-pdf"
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
      "name": "Crop PDF",
      "href": "/crop-pdf"
    },
    {
      "name": "Page Numbers",
      "href": "/page-numbers"
    }
  ]}
      faqItems={[
    {
      "question": "Can I use an image as a watermark?",
      "answer": "This tool specializes in text watermarks — the most common need. Text stamps are crisp at every zoom level and can be tuned for opacity and angle."
    },
    {
      "question": "Will the watermark appear on every page?",
      "answer": "Yes — the stamp is applied across all pages of the document so the mark travels with the whole file."
    },
    {
      "question": "Can the watermark be removed later?",
      "answer": "The watermark becomes part of the page content. Removing it would require editing the page graphics, so treat the watermarked file as the marked version and keep an unmarked original if you may need one."
    },
    {
      "question": "Does watermarking upload my file?",
      "answer": "No. Stamping happens entirely in your browser — the document never leaves your device."
    },
    {
      "question": "Can I control where the watermark sits?",
      "answer": "Yes. Choose center placement with rotation for the classic diagonal stamp, or adjust position, size, and angle for a custom look with the live preview."
    },
    {
      "question": "Will the watermark print?",
      "answer": "Yes. The watermark is part of the page content, so it prints exactly as shown — on every page, from any printer."
    }
  ]}
    >
      <DynamicToolLoader toolSlug="add-watermark" />
    </ToolSeoPage>
  );
}
