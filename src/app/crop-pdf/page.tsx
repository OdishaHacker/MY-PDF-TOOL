import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';
import { toolMeta } from '@/lib/toolMeta';

const meta = toolMeta.find((t) => t.slug === 'crop-pdf')!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: 'https://mypdftools.in/crop-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Crop PDF Pages Online Free"
      description="Trim margins and excess whitespace from PDF pages with visual precision. Set one crop for all pages or crop individually."
      slug="crop-pdf"
      category="Organize PDF"
      howToUseSteps={[
    "Drop your PDF into the dropzone and view its pages on the canvas.",
    "Drag the crop box to mark the area you want to keep.",
    "Apply the same crop to every page, or adjust it for individual pages.",
    "Check the live preview showing exactly what remains after cropping.",
    "Click \"Apply\" and download the trimmed PDF."
  ]}
      aboutContent="The mypdftools PDF Crop tool trims unwanted margins, borders, and whitespace from PDF pages with a visual crop box. Tighten loose scans, remove black scan edges, and prepare pages for clean printing — all locally in your browser."
      aboutParagraphs={[
    "Documents pick up baggage around their edges. Scans arrive with thick black borders from the scanner lid, presentation slides keep wide empty margins when printed, and book scans carry dark page edges from the binding. Cropping removes that baggage — the content stays untouched, only the dead space around it goes.",
    "The visual crop box makes precision easy. Drag it over the page exactly as you would in an image editor: see the region that will remain, adjust until it frames the content perfectly, then apply. One crop for the whole document handles uniform scans; per-page cropping handles mixed content such as a wide table that needs its own treatment.",
    "Cropping adjusts the page’s visible area — the PDF display box — without re-rendering the underlying content, so text stays sharp and file size barely changes. Everything happens in your browser: no uploads, no accounts, no watermarks on the output."
  ]}
      useCases={[
    {
      "title": "Cleaning Scans",
      "description": "Cut away black scanner borders and dust edges so documents look digitally native."
    },
    {
      "title": "Tightening Margins",
      "description": "Trim oversized margins from slides and handouts so content prints larger and clearer."
    },
    {
      "title": "Book Scan Prep",
      "description": "Remove dark binding edges from scanned book pages before reading or sharing."
    },
    {
      "title": "Extracting Figures",
      "description": "Crop a page down to a single chart or diagram for use in your own documents."
    },
    {
      "title": "E-Reader Optimization",
      "description": "Fit pages to a small screen by removing margins that waste display space."
    }
  ]}
      tips={[
    "Leave a thin margin (2-3 mm) around content so text never kisses the page edge.",
    "Scan a single test page first, fix its crop, then apply the same box to the whole batch.",
    "Cropping hides content outside the box rather than deleting it — do not rely on cropping to hide secrets; use Redact PDF for that.",
    "Wide tables often need their own crop — use per-page mode instead of forcing one box on all pages.",
    "Combine with Rotate PDF when scans are both tilted and over-margined: rotate straight, then crop.",
    "Check the last page too — final pages often hold footnotes that a uniform crop could trim away."
  ]}
      relatedTools={[
    {
      "name": "Rotate PDF",
      "href": "/rotate-pdf"
    },
    {
      "name": "Redact PDF",
      "href": "/redact-pdf"
    },
    {
      "name": "Compress PDF",
      "href": "/compress-pdf"
    },
    {
      "name": "Organize PDF",
      "href": "/organize-pdf"
    },
    {
      "name": "Edit PDF",
      "href": "/edit-pdf"
    },
    {
      "name": "Split PDF",
      "href": "/split-pdf"
    }
  ]}
      faqItems={[
    {
      "question": "Does cropping delete the content outside the box?",
      "answer": "Cropping changes the visible page area; the underlying content outside remains in the file. Use the Redact PDF tool when content must be permanently and securely removed."
    },
    {
      "question": "Can I crop different pages differently?",
      "answer": "Yes. Apply one crop to all pages, or switch to per-page mode and give specific pages their own crop boxes."
    },
    {
      "question": "Will cropping reduce file size?",
      "answer": "Slightly at most. Cropping adjusts the visible area rather than re-encoding content — for real size reduction, use the Compress PDF tool."
    },
    {
      "question": "Is the crop preview accurate?",
      "answer": "Yes. The preview shows exactly the region that will remain — what you frame is what the page becomes."
    },
    {
      "question": "Does cropping affect text quality?",
      "answer": "No. Text and images are not re-rendered; only the page boundary moves. Everything inside the crop stays at full original quality."
    },
    {
      "question": "Is my PDF uploaded during cropping?",
      "answer": "No. The tool works entirely in your browser and saves the cropped file directly to your device."
    }
  ]}
    >
      <DynamicToolLoader toolSlug="crop-pdf" />
    </ToolSeoPage>
  );
}
