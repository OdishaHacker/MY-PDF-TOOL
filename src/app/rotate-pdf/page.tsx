import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';
import { toolMeta } from '@/lib/toolMeta';

const meta = toolMeta.find((t) => t.slug === 'rotate-pdf')!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: 'https://mypdftools.in/rotate-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Rotate PDF Pages Online Free"
      description="Rotate individual pages or the whole PDF by 90, 180, or 270 degrees. Everything happens locally in your browser — your file never leaves your device."
      slug="rotate-pdf"
      category="Organize PDF"
      howToUseSteps={[
    "Drop your PDF into the dropzone to load a preview of its pages.",
    "Choose to rotate every page at once, or select just the pages that need fixing.",
    "Pick the rotation angle: 90° clockwise, 180°, or 270° (90° counter-clockwise).",
    "Apply the rotation and check the preview to confirm every page is upright.",
    "Click \"Save\" and download the corrected PDF to your device."
  ]}
      aboutContent="The mypdftools PDF Rotator fixes sideways and upside-down pages in seconds. Rotate the entire document or only selected pages, preview the result, and save a corrected PDF — all processed locally in your browser with no uploads and no loss of quality."
      aboutParagraphs={[
    "Wrong page orientation is one of the most common PDF annoyances. Phone-scanned receipts arrive sideways, some pages in a mixed scanner batch face the other way, and landscape tables inside a portrait report display at 90 degrees. A PDF viewer can rotate pages for display, but that rotation is temporary — printouts, shared copies, and previews on other devices revert to the stored orientation. Permanent rotation fixes the file itself, so every viewer, printer, and phone shows it correctly.",
    "The rotator writes standard PDF rotation flags, which every compliant viewer respects. This is a metadata-level change: pixels are not re-rendered, so there is zero quality loss and the file size stays essentially the same. Text remains selectable, images keep their resolution, and the document behaves identically to the original — just upright.",
    "Selected-page rotation is just as easy. Click the specific pages that need turning, choose an angle, and leave the rest untouched. This mixed-mode support matters for real-world scans, where a document often has a few misoriented pages among many correct ones."
  ]}
      useCases={[
    {
      "title": "Fixing Phone Scans",
      "description": "Straighten receipt and document scans captured sideways with a phone camera in one click."
    },
    {
      "title": "Landscape Tables & Charts",
      "description": "Turn wide financial tables or engineering drawings so they read naturally without tilting your head."
    },
    {
      "title": "Mixed Scanner Batches",
      "description": "Correct only the few misoriented pages in an otherwise perfect scan batch, leaving good pages untouched."
    },
    {
      "title": "Print Preparation",
      "description": "Make sure every page prints upright — printers follow the stored orientation, not your viewer’s temporary rotation."
    },
    {
      "title": "Presentation Exports",
      "description": "Rotate slides or diagrams exported to PDF so they display correctly on projectors and second screens."
    }
  ]}
      tips={[
    "Rotation in your PDF viewer is temporary — use this tool when you need the fix to stay in the actual file.",
    "Rotate one test page first if you are unsure of the direction; 90° turns clockwise, 270° turns counter-clockwise.",
    "A page that is upside down needs 180°, not two 90° rotations — same result, but faster to apply.",
    "Combine with the Organizer when a scan batch is both misordered and misoriented — fix order first, then rotate.",
    "Rotated pages keep full text quality; if text still looks soft after rotation, the original scan itself was low quality.",
    "Check the preview thumbnails before saving — it is the fastest way to confirm the whole document is now upright."
  ]}
      relatedTools={[
    {
      "name": "Organize PDF",
      "href": "/organize-pdf"
    },
    {
      "name": "Crop PDF",
      "href": "/crop-pdf"
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
      "name": "Split PDF",
      "href": "/split-pdf"
    },
    {
      "name": "JPG to PDF",
      "href": "/jpg-to-pdf"
    }
  ]}
      faqItems={[
    {
      "question": "Is the rotation permanent?",
      "answer": "Yes. The tool writes the standard PDF rotation attribute into the file itself, so the new orientation appears in every viewer, on every device, and in every print job."
    },
    {
      "question": "Does rotating reduce file quality?",
      "answer": "No. Rotation is a page-level setting, not a re-rendering. Pixels, text, and fonts remain exactly as they were — file size and sharpness are unchanged."
    },
    {
      "question": "Can I rotate only some pages?",
      "answer": "Yes. Click the pages you want to turn, choose the angle, and apply. Pages you did not select stay exactly as they are."
    },
    {
      "question": "Which angle fixes a sideways scan?",
      "answer": "Usually 90° or 270° — one turns the page clockwise, the other counter-clockwise. Try one, check the preview, and apply the other if needed."
    },
    {
      "question": "Will rotation work on scanned documents?",
      "answer": "Yes. Rotation works identically on scanned image pages and on digital text pages, because it adjusts how the page is displayed, not what the page contains."
    },
    {
      "question": "Is my file uploaded during rotation?",
      "answer": "Never. The PDF is processed inside your own browser. The rotation happens on your device and the corrected file downloads straight from there."
    }
  ]}
    >
      <DynamicToolLoader toolSlug="rotate-pdf" />
    </ToolSeoPage>
  );
}
