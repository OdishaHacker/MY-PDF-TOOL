import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';
import { toolMeta } from '@/lib/toolMeta';

const meta = toolMeta.find((t) => t.slug === 'pdf-to-jpg')!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: 'https://mypdftools.in/pdf-to-jpg/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Convert PDF Pages to JPG Images"
      description="Export every PDF page as a high-quality JPG image. Choose resolution and quality — all rendering happens in your own browser."
      slug="pdf-to-jpg"
      category="Convert from PDF"
      howToUseSteps={[
    "Drop your PDF into the dropzone and wait for the page previews to appear.",
    "Choose the output resolution or quality level for the JPG images.",
    "Select which pages to export — all of them, or just the ones you need.",
    "Click \"Convert\" — each page is rendered to an image locally in your browser.",
    "Download the images individually or as a set."
  ]}
      aboutContent="The mypdftools PDF-to-JPG converter turns PDF pages into sharp image files. Ideal for thumbnails, social posts, slides, and previews — pick your pages, choose the quality, and download rendered images without uploading the document anywhere."
      aboutParagraphs={[
    "Sometimes a page needs to be a picture. Social platforms accept JPG, not PDF. Websites want image thumbnails. Messaging apps preview photos instantly but treat PDFs as anonymous attachments. Converting pages to JPG makes your document content usable in all of these image-first worlds.",
    "The converter renders each page with a browser-based PDF engine at your chosen resolution — text stays crisp, colors come through accurately, and quality scales with the setting you pick. Low-to-medium resolution suits web thumbnails and chat previews; high resolution produces print-worthy images of certificates, artwork pages, and scanned documents.",
    "Rendering happens entirely on your device. The PDF never leaves your browser — no upload, no queue, no waiting for a server to email you results. The moment rendering finishes, your images are ready to download, already on the same machine where the document lives."
  ]}
      useCases={[
    {
      "title": "Social Media Posts",
      "description": "Turn flyer and poster pages into JPGs ready for Instagram, Facebook, and WhatsApp status updates."
    },
    {
      "title": "Website Thumbnails",
      "description": "Generate preview images of document pages for listings, portfolios, and download cards."
    },
    {
      "title": "Chat Previews",
      "description": "Send certificate or invoice pages as images that friends and clients see instantly in chat."
    },
    {
      "title": "Presentation Exports",
      "description": "Convert slide pages into images for embeds, docs, and platforms that do not accept PDF."
    },
    {
      "title": "Print Snippets",
      "description": "Export a single page — a form, a coupon, a diagram — as a high-resolution image for quick printing."
    }
  ]}
      tips={[
    "Higher resolution equals bigger files — pick high only when printing, medium for screens and chat.",
    "Export only the pages you need when a PDF is long; rendering all pages costs time and memory.",
    "JPG is best for scans and photos; it introduces minor compression on sharp-contrast graphics.",
    "Check the first rendered image before exporting the whole document — it confirms the quality setting.",
    "Text pages stay readable in JPG form at medium-high resolution, but remain images — they are not searchable.",
    "Need the images back as a PDF later? The JPG-to-PDF tool rebuilds a document from them in seconds."
  ]}
      relatedGuides={[
    {
      "name": "How to Convert PDF to JPG Images",
      "href": "/blog/pdf-to-jpg-guide"
    },
    {
      "name": "Convert JPG Images to PDF",
      "href": "/blog/jpg-to-pdf-conversion"
    },
    {
      "name": "Reduce PDF File Size Without Losing Quality",
      "href": "/blog/compress-pdf-guide"
    }
  ]}

      relatedTools={[
    {
      "name": "JPG to PDF",
      "href": "/jpg-to-pdf"
    },
    {
      "name": "PDF to PNG",
      "href": "/pdf-to-jpg"
    },
    {
      "name": "PDF to Word",
      "href": "/pdf-to-word"
    },
    {
      "name": "PDF to Text",
      "href": "/pdf-to-text"
    },
    {
      "name": "Compress PDF",
      "href": "/compress-pdf"
    },
    {
      "name": "Split PDF",
      "href": "/split-pdf"
    }
  ]}
      faqItems={[
    {
      "question": "What resolution should I choose?",
      "answer": "For screens, chat, and web use, medium resolution is ideal. For printing or zooming into details, choose high resolution — the file sizes grow, but sharpness holds up."
    },
    {
      "question": "Will the text in my pages stay sharp?",
      "answer": "Yes, within the resolution you choose. Pages are rendered like a photograph of the page at that resolution — higher settings produce sharper text."
    },
    {
      "question": "Can I export only some pages?",
      "answer": "Yes. Select the specific pages you need and only those are rendered, which is faster and keeps the output folder tidy."
    },
    {
      "question": "Is my PDF uploaded for conversion?",
      "answer": "No. Rendering happens in your browser with the file read from your device. Nothing is transmitted to any server."
    },
    {
      "question": "Why is my exported image file large?",
      "answer": "High resolution and image-dense pages produce large JPGs. Lower the resolution, or compress the source PDF first if you need smaller images."
    },
    {
      "question": "Can I convert scanned PDFs too?",
      "answer": "Absolutely — scanned pages render just like any other page. The resulting JPG looks exactly like the scan, at the resolution you selected."
    }
  ]}
    >
      <DynamicToolLoader toolSlug="pdf-to-jpg" />
    </ToolSeoPage>
  );
}
