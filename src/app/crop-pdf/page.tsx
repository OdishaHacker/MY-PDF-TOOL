import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import ToolSeoContent from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'Crop PDF Online Free — Trim PDF Page Margins | mypdftools',
  description: 'Crop and trim PDF page margins. Remove whitespace and adjust visible area of PDF pages. Free, no upload, browser-based.',
  keywords: ['crop pdf', 'trim pdf', 'cut pdf margins', 'resize pdf pages', 'remove pdf whitespace', 'crop pdf online free'],
  alternates: { canonical: 'https://mypdftools.in/crop-pdf/' },
  openGraph: { title: 'Crop PDF Free | mypdftools', description: 'Crop PDF page margins. Free, browser-based.', url: 'https://mypdftools.in/crop-pdf/', siteName: 'mypdftools', type: 'website' },
};

export default function Page() {
  return (
    <>
      <ToolClient />
      <ToolSeoContent
        title="Crop PDF Pages — Free Online Tool"
        description="Trim margins and adjust the visible area of your PDF pages. Remove unwanted whitespace, crop to specific dimensions, or resize the page view. Perfect for cleaning up scanned documents or adjusting print margins. All processing happens in your browser."
        howTo={['Upload your PDF file.', 'Set the crop area by adjusting margins or drawing a crop box.', 'Apply to all pages or selected ones.', 'Download the cropped PDF.']}
        features={['Precise margin control', 'Visual crop area selection', 'Apply to all or individual pages', 'Remove excess whitespace', 'No server uploads — 100% private', 'Works on all devices', 'Free and unlimited', 'No registration needed']}
        faqs={[
          { q: 'Does cropping permanently remove content?', a: 'Cropping adjusts the visible area of the page. In most cases, the hidden content is still in the file but not visible. For permanent removal, use our Redact PDF tool.' },
          { q: 'Can I crop different pages differently?', a: 'You can apply the same crop settings to all pages or adjust individual pages as needed.' },
        ]}
        relatedTools={[{ name: 'Rotate PDF', href: '/rotate-pdf/' }, { name: 'Edit PDF', href: '/edit-pdf/' }, { name: 'Compress PDF', href: '/compress-pdf/' }, { name: 'Organize PDF', href: '/organize-pdf/' }]}
      />
    </>
  );
}
