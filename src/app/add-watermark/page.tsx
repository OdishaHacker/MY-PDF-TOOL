import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import ToolSeoContent from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'Add Watermark to PDF Online Free | mypdftools',
  description: 'Add text watermarks to PDF documents. Customize text, color, opacity, and position. Free, no upload, works in your browser.',
  keywords: ['add watermark to pdf', 'pdf watermark', 'watermark pdf online', 'text watermark pdf', 'stamp pdf'],
  alternates: { canonical: 'https://mypdftools.in/add-watermark/' },
  openGraph: { title: 'Add Watermark to PDF Free | mypdftools', description: 'Add watermarks to PDF files. Free, browser-based.', url: 'https://mypdftools.in/add-watermark/', siteName: 'mypdftools', type: 'website' },
};

export default function Page() {
  return (
    <>
      <ToolClient />
      <ToolSeoContent
        title="Add Watermark to PDF — Free Online Tool"
        description="Protect your PDF documents by adding custom text watermarks. Mark documents as 'Confidential', 'Draft', 'Sample', or any custom text. Control the opacity, size, color, and rotation of your watermark. All processing happens in your browser — your documents remain private."
        howTo={['Upload your PDF file.', 'Enter your watermark text (e.g., "Confidential", "Draft").', 'Customize font, color, size, opacity, and position.', 'Download the watermarked PDF.']}
        features={['Custom text watermarks', 'Adjustable opacity and size', 'Multiple color options', 'Diagonal and horizontal positioning', 'Apply to all or selected pages', 'No server uploads — 100% private', 'Free and unlimited', 'No registration needed']}
        faqs={[
          { q: 'Can I make the watermark semi-transparent?', a: 'Yes, you can adjust the opacity from fully transparent to fully opaque to create a subtle or prominent watermark.' },
          { q: 'Can I add watermarks to specific pages only?', a: 'Yes, you can choose to apply the watermark to all pages or select specific ones.' },
        ]}
        relatedTools={[{ name: 'Edit PDF', href: '/edit-pdf/' }, { name: 'Sign PDF', href: '/sign-pdf/' }, { name: 'Page Numbers', href: '/page-numbers/' }, { name: 'Protect PDF', href: '/protect-pdf/' }]}
      />
    </>
  );
}
