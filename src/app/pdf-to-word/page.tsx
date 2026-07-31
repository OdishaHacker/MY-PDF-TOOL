import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import ToolSeoContent from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'PDF to Word Online Free — Convert PDF to DOCX | mypdftools',
  description: 'Convert PDF files to editable Word documents (DOCX). Free, no upload, no signup. Preserves formatting and layout. Works entirely in your browser.',
  keywords: ['pdf to word', 'pdf to docx', 'convert pdf to word', 'pdf to word converter', 'pdf to word online free', 'extract text from pdf'],
  alternates: { canonical: 'https://mypdftools.in/pdf-to-word/' },
  openGraph: { title: 'PDF to Word Online Free — Convert PDF to DOCX | mypdftools', description: 'Convert PDF files to editable Word documents. Free, works in your browser.', url: 'https://mypdftools.in/pdf-to-word/', siteName: 'mypdftools', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'PDF to Word Free | mypdftools', description: 'Convert PDF to editable Word documents instantly.' },
};

export default function Page() {
  return (
    <>
      <ToolClient />
      <ToolSeoContent
        title="Convert PDF to Word (DOCX) — Free Online Tool"
        description="Transform your PDF documents into fully editable Microsoft Word files. Our converter extracts text and preserves the document structure so you can edit, copy, and reformat content easily. The conversion happens entirely in your browser for complete privacy — no files are uploaded to any server."
        howTo={[
          'Upload your PDF file by clicking the upload area or dragging it in.',
          'Wait for the conversion to process (usually takes a few seconds).',
          'Preview the converted document if available.',
          'Click "Download" to save the Word file (.docx) to your device.',
        ]}
        features={[
          'Accurate text extraction from PDFs',
          'Preserves document formatting and structure',
          'Outputs standard .docx Word format',
          'No server uploads — 100% private',
          'No registration or email required',
          'Works on mobile and desktop browsers',
          'Fast processing for multi-page documents',
          'Completely free to use',
        ]}
        faqs={[
          { q: 'Will the formatting be preserved when converting to Word?', a: 'Our tool does its best to preserve the original formatting including text styles, paragraphs, and basic layouts. Complex layouts with many columns or embedded elements may need minor adjustments.' },
          { q: 'Can I convert scanned PDFs to Word?', a: 'Our browser-based tool works best with text-based PDFs. For scanned documents (image-only PDFs), the output will contain the images but may not extract text without OCR.' },
          { q: 'Is the converted Word file editable?', a: 'Yes! The output .docx file is fully editable in Microsoft Word, Google Docs, LibreOffice, and other word processors.' },
          { q: 'How large of a PDF can I convert?', a: 'There is no fixed limit. The tool runs in your browser, so conversion speed depends on your device capabilities. Most documents under 50MB convert smoothly.' },
        ]}
        relatedTools={[
          { name: 'Word to PDF', href: '/word-to-pdf/' },
          { name: 'PDF to Excel', href: '/pdf-to-excel/' },
          { name: 'PDF to Text', href: '/pdf-to-text/' },
          { name: 'PDF to JPG', href: '/pdf-to-jpg/' },
          { name: 'Edit PDF', href: '/edit-pdf/' },
        ]}
      />
    </>
  );
}
