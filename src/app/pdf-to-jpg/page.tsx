import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import ToolSeoContent from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'PDF to JPG Online Free — Convert PDF Pages to Images | mypdftools',
  description: 'Convert PDF pages to high-quality JPG images. Free, no upload needed. Extract all pages as images or select specific ones. Works entirely in your browser.',
  keywords: ['pdf to jpg', 'pdf to image', 'convert pdf to jpg', 'pdf to jpeg', 'extract images from pdf', 'pdf to picture'],
  alternates: { canonical: 'https://mypdftools.in/pdf-to-jpg/' },
  openGraph: { title: 'PDF to JPG Online Free — Convert PDF Pages to Images | mypdftools', description: 'Convert PDF pages to high-quality JPG images. Free, works in your browser.', url: 'https://mypdftools.in/pdf-to-jpg/', siteName: 'mypdftools', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'PDF to JPG Online Free | mypdftools', description: 'Convert PDF pages to JPG images instantly.' },
};

export default function Page() {
  return (
    <>
      <ToolClient />
      <ToolSeoContent
        title="Convert PDF to JPG Images — Free Online Tool"
        description="Extract high-quality JPG images from your PDF documents. Each page of your PDF is converted into a separate image file that you can use in presentations, social media, or anywhere else. Processing happens entirely in your browser — your documents are never uploaded to any server."
        howTo={[
          'Upload your PDF file by clicking the upload area or dragging it in.',
          'Select the image quality and resolution you prefer.',
          'Choose to convert all pages or select specific ones.',
          'Click "Convert" and download your JPG images.',
        ]}
        features={[
          'Convert all pages or select specific ones',
          'High-quality JPG output with adjustable resolution',
          'Download individual images or all at once as ZIP',
          'No server uploads — complete privacy',
          'Works on desktop and mobile browsers',
          'Fast conversion for multi-page PDFs',
          'No signup or registration required',
          'Free with no watermarks',
        ]}
        faqs={[
          { q: 'What quality are the exported JPG images?', a: 'You can choose the output quality. High quality produces sharp images suitable for printing, while lower quality creates smaller file sizes ideal for web use.' },
          { q: 'Can I convert specific pages to JPG?', a: 'Yes, you can select individual pages or page ranges to convert instead of converting the entire document.' },
          { q: 'How do I download all converted images?', a: 'You can download images individually or all at once as a ZIP file for convenience.' },
          { q: 'Does this work with scanned PDFs?', a: 'Yes! Both regular and scanned PDFs are converted to JPG images. Each page becomes a separate image file.' },
        ]}
        relatedTools={[
          { name: 'JPG to PDF', href: '/jpg-to-pdf/' },
          { name: 'PDF to Word', href: '/pdf-to-word/' },
          { name: 'PDF to Text', href: '/pdf-to-text/' },
          { name: 'Split PDF', href: '/split-pdf/' },
          { name: 'Compress PDF', href: '/compress-pdf/' },
        ]}
      />
    </>
  );
}
