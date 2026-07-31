import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import ToolSeoContent from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'Split PDF Online Free — Extract Pages from PDF | mypdftools',
  description: 'Split PDF files into individual pages or extract specific page ranges. Free, no upload required, works entirely in your browser. Fast and private.',
  keywords: ['split pdf', 'extract pdf pages', 'pdf splitter', 'split pdf online', 'free pdf splitter', 'separate pdf pages'],
  alternates: { canonical: 'https://mypdftools.in/split-pdf/' },
  openGraph: {
    title: 'Split PDF Online Free — Extract Pages from PDF | mypdftools',
    description: 'Split PDF files into individual pages or extract specific page ranges. Free, works entirely in your browser.',
    url: 'https://mypdftools.in/split-pdf/',
    siteName: 'mypdftools',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Split PDF Online Free — Extract Pages from PDF | mypdftools',
    description: 'Split PDF files into individual pages or extract specific page ranges. Free, no upload required.',
  },
};

export default function Page() {
  return (
    <>
      <ToolClient />
      <ToolSeoContent
        title="Split PDF Files Online — Free & Secure"
        description="Need to extract specific pages from a large PDF? Our free online PDF splitter lets you separate a PDF into individual pages or custom page ranges — all without uploading your file to a server. Whether you need a single page or multiple sections, this tool handles it quickly and privately in your browser."
        howTo={[
          'Upload your PDF file by clicking the upload area or dragging it in.',
          'Select the pages or page ranges you want to extract.',
          'Click "Split" to separate the selected pages into new PDFs.',
          'Download the split PDF files instantly to your device.',
        ]}
        features={[
          'Split by individual pages or custom ranges',
          'Extract specific pages from large PDFs',
          'Preview pages before splitting',
          'No file uploads — 100% browser-based',
          'No watermarks on split documents',
          'Works on all devices and browsers',
          'Instant processing and download',
          'Unlimited free usage',
        ]}
        faqs={[
          { q: 'Can I split a PDF into individual pages?', a: 'Yes! You can split a PDF into single pages, or specify custom ranges like pages 1-3, 5, 7-10 to create separate documents.' },
          { q: 'Is there a file size limit for splitting PDFs?', a: 'Since processing happens in your browser, the limit depends on your device memory. Most PDFs up to 100MB work perfectly fine.' },
          { q: 'Are my files secure when splitting PDFs?', a: 'Absolutely. Your files never leave your device. All processing occurs locally in your browser, ensuring complete privacy.' },
          { q: 'Can I split a password-protected PDF?', a: 'You will need to unlock the PDF first using our Unlock PDF tool, then you can split it.' },
        ]}
        relatedTools={[
          { name: 'Merge PDF', href: '/merge-pdf/' },
          { name: 'Organize PDF', href: '/organize-pdf/' },
          { name: 'Compress PDF', href: '/compress-pdf/' },
          { name: 'Rotate PDF', href: '/rotate-pdf/' },
          { name: 'PDF to JPG', href: '/pdf-to-jpg/' },
        ]}
      />
    </>
  );
}
