import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';

export const metadata: Metadata = {
  title: 'JPG to PDF Converter Online Free — Convert Images to PDF | mypdftools',
  description:
    'Convert JPG, PNG, WEBP, and BMP images into a single PDF document online. Free, fast, no quality loss, no watermark.',
  keywords: ['jpg to pdf', 'image to pdf', 'convert png to pdf', 'jpg to pdf converter online'],
  alternates: { canonical: 'https://mypdftools.in/jpg-to-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Convert JPG Images to PDF Online"
      description="Turn photos, scans, and graphic images (JPG, PNG, WEBP) into clean PDF documents in seconds."
      slug="jpg-to-pdf"
      category="Convert to PDF"
      howToUseSteps={[
        'Upload your image files (JPG, PNG, WEBP, etc.).',
        'Adjust page orientation, margins, and layout preferences.',
        'Reorder images by dragging thumbnails into your preferred order.',
        'Click "Convert to PDF" and download your compiled PDF.',
      ]}
      aboutContent="Easily convert photos, receipts, or scanned documents into clean PDFs. Supports multi-image merging into single multi-page PDF files."
      faqItems={[
        {
          question: 'Can I combine multiple JPG images into one PDF?',
          answer: 'Yes! Select multiple images and they will be compiled into pages of a single PDF.',
        },
      ]}
    >
      <DynamicToolLoader toolSlug="jpg-to-pdf" />
    </ToolSeoPage>
  );
}
