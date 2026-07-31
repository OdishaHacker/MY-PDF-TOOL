import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import ToolSeoContent from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'Organize PDF Online Free — Reorder & Remove Pages | mypdftools',
  description: 'Reorder, remove, or rearrange PDF pages. Drag and drop pages to organize your document. Free, no upload, browser-based.',
  keywords: ['organize pdf', 'reorder pdf pages', 'rearrange pdf', 'remove pdf pages', 'delete pages from pdf'],
  alternates: { canonical: 'https://mypdftools.in/organize-pdf/' },
  openGraph: { title: 'Organize PDF Free | mypdftools', description: 'Reorder and remove PDF pages. Free, browser-based.', url: 'https://mypdftools.in/organize-pdf/', siteName: 'mypdftools', type: 'website' },
};

export default function Page() {
  return (
    <>
      <ToolClient />
      <ToolSeoContent
        title="Organize PDF Pages — Free Online Tool"
        description="Take full control of your PDF pages. Drag and drop to reorder, remove unwanted pages, and reorganize your document exactly the way you need it. Our visual page organizer makes it easy to see and manage every page. All processing happens in your browser — no files are uploaded."
        howTo={['Upload your PDF file.', 'View thumbnail previews of all pages.', 'Drag pages to reorder or click to remove unwanted ones.', 'Download the reorganized PDF.']}
        features={['Drag-and-drop page reordering', 'Remove unwanted pages', 'Visual thumbnail previews', 'No server uploads — 100% private', 'Works with multi-page documents', 'Fast and intuitive interface', 'Free and unlimited', 'No registration needed']}
        faqs={[
          { q: 'Can I add pages from another PDF?', a: 'For adding pages from different PDFs, use our Merge PDF tool first, then organize the combined document.' },
          { q: 'Is there a page limit?', a: 'No artificial limit. Large documents with many pages work fine, though performance depends on your device.' },
        ]}
        relatedTools={[{ name: 'Merge PDF', href: '/merge-pdf/' }, { name: 'Split PDF', href: '/split-pdf/' }, { name: 'Rotate PDF', href: '/rotate-pdf/' }, { name: 'Compress PDF', href: '/compress-pdf/' }]}
      />
    </>
  );
}
