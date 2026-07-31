import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import ToolSeoContent from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'Word to PDF Online Free — Convert DOCX to PDF | mypdftools',
  description: 'Convert Word documents (DOCX) to PDF format. Free, no upload required, works in your browser. Preserves formatting perfectly.',
  keywords: ['word to pdf', 'docx to pdf', 'convert word to pdf', 'doc to pdf', 'word to pdf converter free'],
  alternates: { canonical: 'https://mypdftools.in/word-to-pdf/' },
  openGraph: { title: 'Word to PDF Free | mypdftools', description: 'Convert Word documents to PDF. Free, browser-based.', url: 'https://mypdftools.in/word-to-pdf/', siteName: 'mypdftools', type: 'website' },
};

export default function Page() {
  return (
    <>
      <ToolClient />
      <ToolSeoContent
        title="Convert Word to PDF — Free Online Tool"
        description="Transform your Microsoft Word documents into universally compatible PDF files. Our converter preserves your document's formatting, fonts, and layout while creating a PDF that looks the same on every device. All processing happens in your browser — your documents stay private."
        howTo={[
          'Upload your Word document (.docx or .doc) by clicking or dragging.',
          'The tool automatically converts the document to PDF format.',
          'Preview the generated PDF if available.',
          'Download your PDF file instantly.',
        ]}
        features={['Supports .docx and .doc formats', 'Preserves text formatting and layout', 'Fast browser-based conversion', 'No server uploads — complete privacy', 'No watermarks added', 'No registration needed', 'Works on all devices', 'Completely free']}
        faqs={[
          { q: 'Will my Word formatting be preserved in the PDF?', a: 'Yes, our tool preserves text formatting, paragraph styles, and basic layout elements. Complex features like macros are not carried over since PDFs do not support them.' },
          { q: 'Can I convert .doc files (older Word format)?', a: 'Our tool primarily supports .docx files. For best results, save older .doc files as .docx in Word before converting.' },
          { q: 'Is there a page limit?', a: 'No, there is no limit on the number of pages in your Word document.' },
        ]}
        relatedTools={[
          { name: 'PDF to Word', href: '/pdf-to-word/' },
          { name: 'Excel to PDF', href: '/excel-to-pdf/' },
          { name: 'HTML to PDF', href: '/html-to-pdf/' },
          { name: 'Text to PDF', href: '/text-to-pdf/' },
          { name: 'Merge PDF', href: '/merge-pdf/' },
        ]}
      />
    </>
  );
}
