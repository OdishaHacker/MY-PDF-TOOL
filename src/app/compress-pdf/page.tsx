import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import ToolSeoContent from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'Compress PDF Online Free — Reduce PDF File Size | mypdftools',
  description: 'Reduce PDF file size without losing quality. Free online PDF compressor that works in your browser. No upload, no signup, instant results.',
  keywords: ['compress pdf', 'reduce pdf size', 'pdf compressor', 'shrink pdf', 'compress pdf online free', 'make pdf smaller'],
  alternates: { canonical: 'https://mypdftools.in/compress-pdf/' },
  openGraph: {
    title: 'Compress PDF Online Free — Reduce PDF File Size | mypdftools',
    description: 'Reduce PDF file size without losing quality. Free online PDF compressor that works in your browser.',
    url: 'https://mypdftools.in/compress-pdf/',
    siteName: 'mypdftools',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compress PDF Online Free — Reduce PDF File Size | mypdftools',
    description: 'Reduce PDF file size without losing quality. Free, no upload required.',
  },
};

export default function Page() {
  return (
    <>
      <ToolClient />
      <ToolSeoContent
        title="Compress PDF Files Online — Free & High Quality"
        description="Large PDF files can be difficult to share via email or upload to websites. Our free online PDF compressor reduces file size while maintaining document quality. The entire compression process happens in your browser, so your documents never leave your device. Perfect for email attachments, web uploads, and saving storage space."
        howTo={[
          'Upload your PDF file by clicking the upload area or dragging it in.',
          'Choose your preferred compression level (low, medium, or high).',
          'Click "Compress" to reduce the file size.',
          'Download your compressed PDF — typically 50-80% smaller than the original.',
        ]}
        features={[
          'Multiple compression quality levels',
          'Maintains readable text and image quality',
          'Reduce file size by up to 80%',
          'No server uploads — 100% private',
          'Perfect for email attachments',
          'Works on mobile and desktop',
          'No file size limits',
          'Completely free — no hidden costs',
        ]}
        faqs={[
          { q: 'How much can I reduce my PDF file size?', a: 'Typically, our compressor can reduce file size by 50-80% depending on the content. PDFs with many images see the biggest reductions.' },
          { q: 'Will compressing a PDF reduce its quality?', a: 'Our tool offers different compression levels. The medium setting provides a great balance between size reduction and quality. Text remains sharp, and images are optimized intelligently.' },
          { q: 'Is there a limit on PDF file size?', a: 'Since everything runs in your browser, there is no server-imposed limit. Your device memory is the only constraint — most files up to 100MB process without issues.' },
          { q: 'Can I compress multiple PDFs at once?', a: 'Currently, you can compress one PDF at a time. For batch processing, you can merge your PDFs first using our Merge PDF tool, then compress the combined file.' },
        ]}
        relatedTools={[
          { name: 'Merge PDF', href: '/merge-pdf/' },
          { name: 'Split PDF', href: '/split-pdf/' },
          { name: 'PDF to JPG', href: '/pdf-to-jpg/' },
          { name: 'Repair PDF', href: '/repair-pdf/' },
          { name: 'Protect PDF', href: '/protect-pdf/' },
        ]}
      />
    </>
  );
}
