import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import ToolSeoContent from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'Text to PDF Online Free — Convert Plain Text to PDF | mypdftools',
  description: 'Convert plain text to PDF documents. Free, no upload, works in your browser. Create professional PDFs from text instantly.',
  keywords: ['text to pdf', 'txt to pdf', 'convert text to pdf', 'notepad to pdf', 'plain text to pdf'],
  alternates: { canonical: 'https://mypdftools.in/text-to-pdf/' },
  openGraph: { title: 'Text to PDF Free | mypdftools', description: 'Convert plain text to PDF. Free, browser-based.', url: 'https://mypdftools.in/text-to-pdf/', siteName: 'mypdftools', type: 'website' },
};

export default function Page() {
  return (
    <>
      <ToolClient />
      <ToolSeoContent
        title="Convert Text to PDF — Free Online Tool"
        description="Transform plain text content into clean, professional PDF documents. Simply paste or type your text, customize fonts and margins, and generate a PDF instantly. Perfect for creating quick documents, saving notes, or formatting text for sharing. All processing happens in your browser."
        howTo={['Paste or type your text into the editor.', 'Customize font, size, and page settings.', 'Click "Convert" to generate the PDF.', 'Download your PDF file instantly.']}
        features={['Type or paste text directly', 'Customizable fonts and sizes', 'Adjustable margins and page size', 'No server uploads — 100% private', 'Clean, professional output', 'Fast instant conversion', 'Free and unlimited', 'No registration needed']}
        faqs={[
          { q: 'Can I choose different fonts?', a: 'Yes, you can select from several font options and adjust the font size to create the look you want.' },
          { q: 'Is there a character or page limit?', a: 'There is no artificial limit. You can convert as much text as your device can handle.' },
          { q: 'Can I add headers or footers?', a: 'The basic text-to-PDF converter focuses on content conversion. For headers and footers, consider using our Edit PDF tool after conversion.' },
        ]}
        relatedTools={[{ name: 'PDF to Text', href: '/pdf-to-text/' }, { name: 'HTML to PDF', href: '/html-to-pdf/' }, { name: 'Word to PDF', href: '/word-to-pdf/' }, { name: 'Edit PDF', href: '/edit-pdf/' }]}
      />
    </>
  );
}
