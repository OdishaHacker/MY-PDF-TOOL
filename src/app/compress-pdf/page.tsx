import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';
import { toolMeta } from '@/lib/toolMeta';

const meta = toolMeta.find((t) => t.slug === 'compress-pdf')!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: 'https://mypdftools.in/compress-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Compress PDF File Size Online Free"
      description="Shrink large PDF files without destroying readability. Choose your compression level and process everything locally in your browser."
      slug="compress-pdf"
      category="Optimize PDF"
      howToUseSteps={[
    "Drag your PDF into the dropzone and wait for the size preview to appear.",
    "Pick a compression level — low for near-original quality, high for the smallest file.",
    "Click \"Compress\" and let the tool re-encode the document inside your browser.",
    "Compare the before/after size shown in the result panel.",
    "Download the smaller PDF, or try a different level if you want a better size/quality balance."
  ]}
      aboutContent="The mypdftools PDF Compressor reduces file size by intelligently re-encoding the heavy parts of a document — mostly large images and scans — while keeping text crisp. Because compression runs in your browser, even confidential files can be optimized without ever leaving your computer."
      aboutParagraphs={[
    "Email providers cap attachments at 20-25 MB, university portals often accept only 2-10 MB, and government upload forms can be stricter still. Meanwhile, modern phone scans produce PDFs of enormous size because cameras embed high-resolution photos into every page. Compression bridges this gap: it keeps the document perfectly usable while cutting the bytes dramatically.",
    "Where does the size actually go? In scanned documents, almost all of it sits in page images. The compressor renders each page and re-encodes the imagery at a controlled quality level, smoothing out invisible high-frequency detail that screens and printers never show. Digital-born PDFs with real text already compress lightly — their text streams are tiny, and the tool focuses on whatever embedded images remain.",
    "The level you choose is a direct trade-off dial. Low compression keeps images near their original fidelity for archival copies. Medium suits everyday sharing and email. High chases the smallest possible file for upload forms where readability just needs to survive. Each run is local, so you can try two levels and keep whichever result you prefer — nothing was ever uploaded in the first place."
  ]}
      useCases={[
    {
      "title": "Email Attachments",
      "description": "Bring a PDF under the 25 MB attachment limit of Gmail, Outlook, and other mail providers without splitting it."
    },
    {
      "title": "Portal Uploads",
      "description": "Fit job applications, exam forms, and government portals that enforce strict per-file size ceilings."
    },
    {
      "title": "Faster Sharing",
      "description": "Send contracts and reports over WhatsApp or slow connections without long upload waits."
    },
    {
      "title": "Storage Cleanup",
      "description": "Shrink a folder of heavy scans so it fits comfortably in cloud storage free tiers."
    },
    {
      "title": "Website Downloads",
      "description": "Optimize PDFs you host on a website so visitors download them in seconds, not minutes."
    }
  ]}
      tips={[
    "Scanned PDFs shrink the most — image-heavy files often drop by 50-80 percent with medium compression.",
    "Digital PDFs that were born as text documents compress less; they were small to begin with.",
    "Choose Low compression for documents that will be printed professionally, Medium for email, High only for upload forms.",
    "If the result looks too soft, re-run the original file at a lower level — the source is never touched.",
    "Text stays sharp at every level; quality changes affect embedded images first.",
    "Compress after merging, not before — merge your separate files first, then compress once for a cleaner result."
  ]}
      relatedGuides={[
    {
      "name": "Reduce PDF File Size Without Losing Quality",
      "href": "/blog/compress-pdf-guide"
    },
    {
      "name": "Why You Should Stop Paying for PDF Software",
      "href": "/blog/free-pdf-tools-online"
    },
    {
      "name": "How to Convert PDF to Word (DOCX)",
      "href": "/blog/pdf-to-word-conversion"
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
      "name": "PDF to JPG",
      "href": "/pdf-to-jpg"
    },
    {
      "name": "Repair PDF",
      "href": "/repair-pdf"
    },
    {
      "name": "Organize PDF",
      "href": "/organize-pdf"
    },
    {
      "name": "JPG to PDF",
      "href": "/jpg-to-pdf"
    }
  ]}
      faqItems={[
    {
      "question": "Will compression make my text blurry?",
      "answer": "No. Text objects in the PDF are preserved digitally and stay perfectly sharp at every compression level. Only embedded images and scans are re-encoded at reduced quality."
    },
    {
      "question": "How much smaller will my file get?",
      "answer": "It depends on the content. Image-heavy scans commonly shrink by 50-80 percent, while digital text PDFs may shrink only slightly because there is little waste to remove."
    },
    {
      "question": "Is my document uploaded to a server for compression?",
      "answer": "Never. The compressor runs entirely in your browser using client-side processing. Your file stays on your device from start to finish."
    },
    {
      "question": "Which compression level should I choose?",
      "answer": "Start with Medium — it suits most email and upload needs. Use Low when print quality matters most, and High when a strict size limit matters more than image crispness."
    },
    {
      "question": "Can I compress a password-protected PDF?",
      "answer": "Unlock it first — encrypted files cannot be read or re-encoded. After unlocking and compressing, you can re-protect it with the Protect PDF tool."
    },
    {
      "question": "Why is my compressed file still large?",
      "answer": "The document may contain very many pages or unusually dense imagery. Try High compression, or split the PDF and compress sections separately to find the page that carries the weight."
    }
  ]}
    >
      <DynamicToolLoader toolSlug="compress-pdf" />
    </ToolSeoPage>
  );
}
