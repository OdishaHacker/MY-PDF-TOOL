import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import ToolSeoContent from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'Add Page Numbers to PDF Online Free | mypdftools',
  description: 'Add page numbers to your PDF documents. Customize position, format, and style. Free, no upload, works in your browser.',
  keywords: ['add page numbers to pdf', 'pdf page numbers', 'number pdf pages', 'page numbering pdf', 'pdf page counter'],
  alternates: { canonical: 'https://mypdftools.in/page-numbers/' },
  openGraph: { title: 'Add Page Numbers to PDF Free | mypdftools', description: 'Add page numbers to PDF documents. Free, browser-based.', url: 'https://mypdftools.in/page-numbers/', siteName: 'mypdftools', type: 'website' },
};

export default function Page() {
  return (
    <>
      <ToolClient />
      <ToolSeoContent
        title="Add Page Numbers to PDF — Free Online Tool"
        description="Add professional page numbering to your PDF documents. Choose from various position options (top, bottom, left, center, right), customize the number format, and set starting page numbers. Perfect for reports, theses, manuals, and multi-page documents. All processing runs in your browser."
        howTo={['Upload your PDF file.', 'Choose the page number position (e.g., bottom center).', 'Customize format, font, and starting number.', 'Download the numbered PDF.']}
        features={['Multiple position options', 'Customizable number format', 'Set starting page number', 'Apply to all or selected pages', 'No server uploads — 100% private', 'Works on all devices', 'Free and unlimited', 'No registration needed']}
        faqs={[
          { q: 'Can I start numbering from a specific number?', a: 'Yes, you can set any starting number for your page numbering.' },
          { q: 'Can I exclude the first page?', a: 'Yes, you can choose to skip certain pages like the cover page when adding numbers.' },
        ]}
        relatedTools={[{ name: 'Edit PDF', href: '/edit-pdf/' }, { name: 'Add Watermark', href: '/add-watermark/' }, { name: 'Merge PDF', href: '/merge-pdf/' }, { name: 'Organize PDF', href: '/organize-pdf/' }]}
      />
    </>
  );
}
