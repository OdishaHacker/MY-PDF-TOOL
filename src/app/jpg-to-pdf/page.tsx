import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';
import { toolMeta } from '@/lib/toolMeta';

const meta = toolMeta.find((t) => t.slug === 'jpg-to-pdf')!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: 'https://mypdftools.in/jpg-to-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Convert JPG Images to PDF Online"
      description="Turn photos, scans, and screenshots into a single tidy PDF. Multiple images, custom order, page-size options — all inside your browser."
      slug="jpg-to-pdf"
      category="Convert to PDF"
      howToUseSteps={[
    "Drop one or more JPG images into the dropzone — order them by dragging.",
    "Choose a page size: match each image, or standard A4/Letter with margins.",
    "Set the orientation if you want portrait or landscape pages.",
    "Click \"Convert\" — the images are placed into a new PDF locally.",
    "Download your finished PDF, ready to email, print, or archive."
  ]}
      aboutContent="The mypdftools JPG-to-PDF converter packs images into a clean, professional PDF. Combine dozens of photos into one document, control the page size and order, and produce a file that prints and shares predictably — with the entire conversion happening on your own device."
      aboutParagraphs={[
    "Emailing twelve separate photos is a chore for the sender and worse for the receiver. A single PDF, on the other hand, opens once, keeps a fixed page order, prints without surprises, and looks deliberate rather than improvised. That is why institutions ask for documents — scans of ID cards, filled forms, photographed receipts — as PDF files rather than loose images.",
    "The converter gives you the two decisions that matter. Page size: either let each page match its image exactly, or place images onto standard A4 or Letter sheets with consistent margins — the right choice for printing. Order: drag the thumbnails until the sequence matches the document you are producing, whether that is a set of expense receipts or a portfolio.",
    "Conversion is local and lossless where it counts: your JPG files are embedded into the PDF at their native resolution. Nothing is compressed behind your back, nothing is uploaded, and no watermark is stamped on the output. What you get is a standards-compliant PDF that every reader, printer, and office software opens without complaint."
  ]}
      useCases={[
    {
      "title": "ID & Form Submissions",
      "description": "Combine photos of your ID card, signature, and filled forms into the single PDF most portals demand."
    },
    {
      "title": "Receipt Archives",
      "description": "Photograph expense receipts during a trip, then convert them into one ordered PDF for reimbursement."
    },
    {
      "title": "Document Scans",
      "description": "Turn page-by-page phone photos of a paper document into a proper multi-page PDF."
    },
    {
      "title": "Photo Portfolios",
      "description": "Artists and photographers assemble work samples into a fixed-order PDF that clients cannot reshuffle."
    },
    {
      "title": "Class Notes",
      "description": "Students convert photographed whiteboards and notebook pages into study PDFs organized by lecture."
    }
  ]}
      tips={[
    "Shoot documents on a flat surface in even light — the PDF is only as clean as the photos you feed it.",
    "Drag thumbnails into order before converting; the sequence you see is the sequence the PDF will have.",
    "Choose fit-to-A4 when the PDF will be printed, and match-image-size when it will only be viewed on screens.",
    "PNG screenshots work too — use the tool’s image picker and add them alongside JPG files.",
    "For a document that must be text-searchable, scan with OCR apps first; photographed pages are stored as images.",
    "Convert once at high quality rather than converting, printing, and re-scanning — every generation loses sharpness."
  ]}
      relatedTools={[
    {
      "name": "PDF to JPG",
      "href": "/pdf-to-jpg"
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
      "name": "Organize PDF",
      "href": "/organize-pdf"
    },
    {
      "name": "Rotate PDF",
      "href": "/rotate-pdf"
    },
    {
      "name": "Word to PDF",
      "href": "/word-to-pdf"
    }
  ]}
      faqItems={[
    {
      "question": "Does converting to PDF reduce my image quality?",
      "answer": "No. Your JPG files are embedded at their original resolution — the converter does not downscale or re-compress them. The PDF is effectively a container for your exact images."
    },
    {
      "question": "How many images can I put in one PDF?",
      "answer": "As many as your device can handle. Dozens of photos are routine; very large sets simply take a few extra seconds of local processing."
    },
    {
      "question": "Can I choose the page order?",
      "answer": "Yes. Drag the image thumbnails into the exact order you want before converting — that order becomes the page order of the PDF."
    },
    {
      "question": "Which page size should I pick for printing?",
      "answer": "Choose A4 (or Letter in North America) with margins. Your images will be placed on standard paper-sized pages that print predictably on any printer."
    },
    {
      "question": "Are my photos uploaded during conversion?",
      "answer": "Never. The PDF is assembled inside your browser and saved directly from your device. No image ever reaches a server."
    },
    {
      "question": "Can I add PNG or other image types too?",
      "answer": "Yes — the tool accepts common image formats including PNG, so screenshots can be mixed with JPG photos in the same PDF."
    }
  ]}
    >
      <DynamicToolLoader toolSlug="jpg-to-pdf" />
    </ToolSeoPage>
  );
}
