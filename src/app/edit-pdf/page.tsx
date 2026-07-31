import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import ToolSeoContent from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'Edit PDF Online Free — Add Text & Shapes to PDF | mypdftools',
  description: 'Edit PDF files online for free. Add text, shapes, highlights, and annotations directly to your PDF. No upload, works in your browser.',
  keywords: ['edit pdf', 'pdf editor', 'edit pdf online', 'add text to pdf', 'annotate pdf', 'pdf editor free'],
  alternates: { canonical: 'https://mypdftools.in/edit-pdf/' },
  openGraph: { title: 'Edit PDF Online Free | mypdftools', description: 'Edit PDF files — add text, shapes, and annotations. Free, browser-based.', url: 'https://mypdftools.in/edit-pdf/', siteName: 'mypdftools', type: 'website' },
};

export default function Page() {
  return (
    <>
      <ToolClient />
      <ToolSeoContent
        title="Edit PDF Files Online — Free PDF Editor"
        description="Make changes to your PDF documents without expensive software. Add text, draw shapes, highlight important sections, and annotate pages directly in your browser. Our free PDF editor gives you the essential tools to modify any PDF quickly and privately — no files are uploaded to any server."
        howTo={['Upload your PDF file.', 'Use the toolbar to add text, shapes, or highlights.', 'Position and style your additions as needed.', 'Save and download the edited PDF.']}
        features={['Add text anywhere on the page', 'Draw rectangles, circles, and lines', 'Highlight and underline text', 'Free-form drawing tool', 'Undo and redo support', 'No server uploads — 100% private', 'Works on all devices', 'Completely free']}
        faqs={[
          { q: 'Can I edit existing text in the PDF?', a: 'Our tool lets you add new text, shapes, and annotations on top of the PDF. Editing the original embedded text requires specialized software.' },
          { q: 'Can I add images to the PDF?', a: 'Yes, you can add images and position them on any page of your PDF document.' },
          { q: 'Will the edits be permanent?', a: 'Yes, when you download the edited PDF, all your additions are permanently embedded in the document.' },
        ]}
        relatedTools={[{ name: 'Sign PDF', href: '/sign-pdf/' }, { name: 'Add Watermark', href: '/add-watermark/' }, { name: 'Page Numbers', href: '/page-numbers/' }, { name: 'Redact PDF', href: '/redact-pdf/' }, { name: 'Crop PDF', href: '/crop-pdf/' }]}
      />
    </>
  );
}
