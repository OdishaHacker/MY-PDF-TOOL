import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import ToolSeoContent from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'PDF to Text Online Free — Extract Text from PDF | mypdftools',
  description: 'Extract plain text from PDF files instantly. Free, no upload needed, works in your browser. Copy-paste ready text output.',
  keywords: ['pdf to text', 'extract text from pdf', 'pdf to txt', 'copy text from pdf', 'pdf text extractor'],
  alternates: { canonical: 'https://mypdftools.in/pdf-to-text/' },
  openGraph: { title: 'PDF to Text Free | mypdftools', description: 'Extract text from PDF files. Free, browser-based.', url: 'https://mypdftools.in/pdf-to-text/', siteName: 'mypdftools', type: 'website' },
};

export default function Page() {
  return (
    <>
      <ToolClient />
      <ToolSeoContent
        title="Extract Text from PDF — Free Online Tool"
        description="Quickly extract all text content from your PDF documents into plain text format. Perfect for copying content, text analysis, or data extraction. Our tool processes everything locally in your browser — your documents remain completely private and secure."
        howTo={[
          'Upload your PDF file by clicking the upload area or dragging it in.',
          'The tool automatically extracts all text content.',
          'Review and copy the extracted text.',
          'Download as a .txt file or copy to clipboard.',
        ]}
        features={['Extract text from any text-based PDF', 'Copy to clipboard with one click', 'Download as plain text file', 'No server uploads — 100% private', 'Preserves paragraph structure', 'Fast extraction even for long documents', 'Free with no limits', 'Works on all devices']}
        faqs={[
          { q: 'Can I extract text from scanned PDFs?', a: 'This tool works best with text-based PDFs where text was digitally created. Scanned documents (image-only PDFs) may not yield extractable text without OCR.' },
          { q: 'Will the text formatting be preserved?', a: 'The tool extracts plain text, which means styling (bold, italic, colors) is not preserved. However, paragraph breaks and basic structure are maintained.' },
          { q: 'Can I extract text from specific pages?', a: 'The tool extracts text from all pages. You can then select and copy only the portions you need.' },
        ]}
        relatedTools={[
          { name: 'PDF to Word', href: '/pdf-to-word/' },
          { name: 'PDF to Excel', href: '/pdf-to-excel/' },
          { name: 'Text to PDF', href: '/text-to-pdf/' },
          { name: 'Edit PDF', href: '/edit-pdf/' },
        ]}
      />
    </>
  );
}
