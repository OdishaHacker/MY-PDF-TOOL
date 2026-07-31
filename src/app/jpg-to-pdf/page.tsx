import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import ToolSeoContent from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'JPG to PDF Online Free — Convert Images to PDF | mypdftools',
  description: 'Convert JPG, PNG, and other image files to PDF documents. Free, no upload required, works entirely in your browser. Combine multiple images into one PDF.',
  keywords: ['jpg to pdf', 'image to pdf', 'png to pdf', 'convert jpg to pdf', 'photo to pdf', 'picture to pdf online'],
  alternates: { canonical: 'https://mypdftools.in/jpg-to-pdf/' },
  openGraph: { title: 'JPG to PDF Online Free — Convert Images to PDF | mypdftools', description: 'Convert JPG, PNG, and other image files to PDF documents. Free, works in your browser.', url: 'https://mypdftools.in/jpg-to-pdf/', siteName: 'mypdftools', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'JPG to PDF Online Free | mypdftools', description: 'Convert images to PDF instantly. Free, no upload required.' },
};

export default function Page() {
  return (
    <>
      <ToolClient />
      <ToolSeoContent
        title="Convert JPG & Images to PDF — Free Online Tool"
        description="Easily convert your JPG, PNG, GIF, BMP, or WebP images into professional PDF documents. Combine multiple images into a single PDF, adjust page orientation, and set custom margins — all within your browser. No files are uploaded to any server, ensuring your photos and images remain private."
        howTo={[
          'Click the upload area or drag and drop your image files (JPG, PNG, etc.).',
          'Reorder the images by dragging them into the desired sequence.',
          'Adjust page size and orientation settings if needed.',
          'Click "Convert" to generate your PDF and download it instantly.',
        ]}
        features={[
          'Supports JPG, PNG, GIF, BMP, WebP, and TIFF formats',
          'Combine multiple images into one PDF',
          'Drag-and-drop image reordering',
          'Custom page size and orientation options',
          'No file uploads — 100% private',
          'No watermarks on generated PDFs',
          'Fast conversion in seconds',
          'Completely free to use',
        ]}
        faqs={[
          { q: 'What image formats can I convert to PDF?', a: 'You can convert JPG, JPEG, PNG, GIF, BMP, WebP, and TIFF image formats to PDF documents.' },
          { q: 'Can I convert multiple images into a single PDF?', a: 'Yes! You can upload multiple images and they will be combined into one multi-page PDF document. Simply reorder them as needed before converting.' },
          { q: 'Will the image quality be preserved?', a: 'Yes, your images are embedded in the PDF at their original resolution. No quality is lost during conversion.' },
          { q: 'Is there a limit on the number of images I can convert?', a: 'There is no hard limit. You can convert as many images as your device can handle.' },
        ]}
        relatedTools={[
          { name: 'PDF to JPG', href: '/pdf-to-jpg/' },
          { name: 'Merge PDF', href: '/merge-pdf/' },
          { name: 'Compress PDF', href: '/compress-pdf/' },
          { name: 'Word to PDF', href: '/word-to-pdf/' },
          { name: 'HTML to PDF', href: '/html-to-pdf/' },
        ]}
      />
    </>
  );
}
