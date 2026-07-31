import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import ToolSeoContent from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'HTML to PDF Online Free — Convert Web Pages to PDF | mypdftools',
  description: 'Convert HTML content or web pages to PDF documents. Free, no upload, works in your browser.',
  keywords: ['html to pdf', 'convert html to pdf', 'webpage to pdf', 'save webpage as pdf', 'html to pdf converter'],
  alternates: { canonical: 'https://mypdftools.in/html-to-pdf/' },
  openGraph: { title: 'HTML to PDF Free | mypdftools', description: 'Convert HTML to PDF. Free, browser-based.', url: 'https://mypdftools.in/html-to-pdf/', siteName: 'mypdftools', type: 'website' },
};

export default function Page() {
  return (
    <>
      <ToolClient />
      <ToolSeoContent
        title="Convert HTML to PDF — Free Online Tool"
        description="Transform HTML content into professional PDF documents. Whether you have raw HTML code or want to save web page content as a PDF, our tool handles it smoothly. All processing runs in your browser — no data is sent to any server."
        howTo={['Paste your HTML code into the input area.', 'Preview how the HTML renders as a PDF.', 'Adjust page settings if needed.', 'Click "Convert" and download the PDF.']}
        features={['Paste HTML code directly', 'Accurate rendering of HTML elements', 'Custom page size and margins', 'No server uploads — 100% private', 'Supports CSS styling', 'Fast conversion', 'Free and unlimited', 'Works on all browsers']}
        faqs={[
          { q: 'Can I convert a live website to PDF?', a: 'You can paste the HTML source code of any web page into our tool to convert it. For dynamic pages, you may need to copy the rendered HTML from your browser.' },
          { q: 'Are CSS styles preserved?', a: 'Yes, inline CSS styles and embedded stylesheets are rendered in the PDF output.' },
          { q: 'Can I set custom page sizes?', a: 'Yes, you can choose from standard page sizes like A4, Letter, or set custom dimensions.' },
        ]}
        relatedTools={[{ name: 'Text to PDF', href: '/text-to-pdf/' }, { name: 'Word to PDF', href: '/word-to-pdf/' }, { name: 'JPG to PDF', href: '/jpg-to-pdf/' }, { name: 'Edit PDF', href: '/edit-pdf/' }]}
      />
    </>
  );
}
