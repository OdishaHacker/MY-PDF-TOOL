import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import ToolSeoContent from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'Rotate PDF Online Free — Rotate PDF Pages | mypdftools',
  description: 'Rotate PDF pages 90°, 180°, or 270°. Fix upside-down or sideways scanned pages. Free, no upload, works in your browser.',
  keywords: ['rotate pdf', 'rotate pdf pages', 'turn pdf pages', 'fix pdf orientation', 'rotate pdf online free'],
  alternates: { canonical: 'https://mypdftools.in/rotate-pdf/' },
  openGraph: { title: 'Rotate PDF Free | mypdftools', description: 'Rotate PDF pages easily. Free, browser-based.', url: 'https://mypdftools.in/rotate-pdf/', siteName: 'mypdftools', type: 'website' },
};

export default function Page() {
  return (
    <>
      <ToolClient />
      <ToolSeoContent
        title="Rotate PDF Pages — Free Online Tool"
        description="Fix the orientation of your PDF pages by rotating them 90°, 180°, or 270°. Perfect for correcting scanned documents that ended up sideways or upside down. Rotate individual pages or all pages at once. Processing happens in your browser for complete privacy."
        howTo={['Upload your PDF file.', 'Select the pages you want to rotate.', 'Choose the rotation direction and angle.', 'Download the corrected PDF.']}
        features={['Rotate 90°, 180°, or 270°', 'Rotate individual or all pages', 'Fix scanned document orientation', 'No server uploads — 100% private', 'Visual page preview', 'Fast processing', 'Free and unlimited', 'No registration needed']}
        faqs={[
          { q: 'Can I rotate just one page?', a: 'Yes, you can select and rotate individual pages without affecting the rest of the document.' },
          { q: 'Will rotation affect the content quality?', a: 'No, rotation only changes the orientation. All text, images, and formatting remain perfectly intact.' },
        ]}
        relatedTools={[{ name: 'Organize PDF', href: '/organize-pdf/' }, { name: 'Crop PDF', href: '/crop-pdf/' }, { name: 'Merge PDF', href: '/merge-pdf/' }, { name: 'Split PDF', href: '/split-pdf/' }]}
      />
    </>
  );
}
