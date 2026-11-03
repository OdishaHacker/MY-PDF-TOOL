import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';
import { toolMeta } from '@/lib/toolMeta';

const meta = toolMeta.find((t) => t.slug === 'organize-pdf')!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: 'https://mypdftools.in/organize-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Organize & Reorder PDF Pages"
      description="Rearrange, duplicate, or delete pages in your PDF with a visual page manager. Runs fully in your browser — no upload, no signup."
      slug="organize-pdf"
      category="Organize PDF"
      howToUseSteps={[
    "Drop your PDF into the dropzone to load a visual grid of all its pages.",
    "Click any page to select it, or select several pages at once.",
    "Use the toolbar to rotate, delete, or duplicate the selected pages.",
    "Drag pages (or use the arrow buttons) to reorder the document exactly how you want it.",
    "Click \"Apply\" to build the new PDF locally, then download it to your device."
  ]}
      aboutContent="The mypdftools PDF Organizer gives you a visual page manager for any PDF. See every page as a thumbnail, drag it where it belongs, delete the ones you do not need, and export a clean, reordered document — all without uploading a single byte to a server."
      aboutParagraphs={[
    "Scanners, phones, and download folders have a talent for producing documents in the wrong order. Pages come out rotated, a duplicate scan sneaks in, a blank page lands in the middle, or the signature page ends up before the terms it signs. The Organizer fixes all of this visually: you see exactly what each page looks like and arrange it with simple clicks instead of guessing page numbers.",
    "Beyond reordering, the tool handles page-level cleanup. Delete blank or accidental pages, duplicate a template page so it can be filled several times, or rotate individual scans that came in sideways. Because every action is applied to a copy, the original file remains intact — you can always start over with a fresh arrangement.",
    "The whole workflow is client-side. Thumbnails are rendered in your browser, the new page order is written by a local PDF library, and the output is saved directly from your browser. This makes the Organizer a practical choice for confidential material — HR files, legal drafts, medical scans — that should never pass through a third-party server."
  ]}
      useCases={[
    {
      "title": "Fixing Scan Order",
      "description": "Put accidentally shuffled scan batches back into the correct sequence before sending the file onward."
    },
    {
      "title": "Removing Junk Pages",
      "description": "Delete blank pages, test scans, and duplicate captures so the final PDF contains only real content."
    },
    {
      "title": "Building Reports",
      "description": "Assemble a report by dragging sections into the required order, then export the polished version."
    },
    {
      "title": "Preparing Handouts",
      "description": "Duplicate a worksheet page several times, then save the expanded file ready for printing."
    },
    {
      "title": "Correcting Orientation",
      "description": "Rotate individual sideways pages so every page in the document faces the reader correctly."
    }
  ]}
      tips={[
    "Select multiple pages with individual clicks, then delete or rotate them together in one action.",
    "Compare the thumbnail grid against a printed copy once before exporting — visual checking catches order mistakes fast.",
    "Combine the Organizer with Page Numbers afterward: reorder first, then number the corrected document.",
    "Large documents render thumbnails gradually — scroll a little and let the grid fill in before dragging pages.",
    "Duplicated pages are perfect for fillable templates; duplicate, then export and fill each copy separately.",
    "Rotated thumbnails show exactly how the page will print, so use rotation here instead of rotating in the printer dialog."
  ]}
      relatedGuides={[
    {
      "name": "How to Organize & Reorder PDF Pages",
      "href": "/blog/organize-pdf-pages"
    },
    {
      "name": "How to Merge PDF Files: Step-by-Step",
      "href": "/blog/merge-pdf-guide"
    },
    {
      "name": "How to Split PDF Files & Extract Pages",
      "href": "/blog/split-pdf-tips"
    }
  ]}

      relatedTools={[
    {
      "name": "Merge PDF",
      "href": "/merge-pdf"
    },
    {
      "name": "Split PDF",
      "href": "/split-pdf"
    },
    {
      "name": "Rotate PDF",
      "href": "/rotate-pdf"
    },
    {
      "name": "Page Numbers",
      "href": "/page-numbers"
    },
    {
      "name": "Compress PDF",
      "href": "/compress-pdf"
    },
    {
      "name": "Crop PDF",
      "href": "/crop-pdf"
    }
  ]}
      faqItems={[
    {
      "question": "Can I undo a change before saving?",
      "answer": "Yes. The organizer works on a copy in browser memory — simply reload the page to discard every change, or re-drop the original file to start fresh. Your source PDF is never modified."
    },
    {
      "question": "How do I delete several pages at once?",
      "answer": "Click each unwanted page to select it (selected pages are highlighted), then press the Delete button. All selected pages are removed in a single step."
    },
    {
      "question": "Does reordering affect page quality?",
      "answer": "Not at all. Pages are copied as-is into the new document — no re-rendering happens, so text stays sharp and images keep their original resolution."
    },
    {
      "question": "Can I move multiple pages together?",
      "answer": "Yes. Select the pages first, then drag them as a group to the new position, or use the arrow buttons to shift the whole selection."
    },
    {
      "question": "Is my document uploaded while I edit?",
      "answer": "No. Thumbnails are generated and the new PDF is built entirely inside your browser. Nothing is transmitted to any server at any point."
    },
    {
      "question": "Can I also rotate pages here?",
      "answer": "Yes — the organizer includes rotation for selected pages. For a document where every page needs the same rotation, the dedicated Rotate PDF tool is even faster."
    }
  ]}
    >
      <DynamicToolLoader toolSlug="organize-pdf" />
    </ToolSeoPage>
  );
}
