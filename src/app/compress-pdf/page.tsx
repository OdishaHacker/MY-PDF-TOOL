import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';

export const metadata: Metadata = {
  title: 'Compress PDF Online Free — Reduce PDF File Size | mypdftools',
  description:
    'Shrink PDF file size while maintaining maximum document quality. Free online PDF compressor with no file uploads required.',
  keywords: ['compress pdf', 'reduce pdf size', 'shrink pdf', 'pdf compressor online free'],
  alternates: { canonical: 'https://mypdftools.in/compress-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Compress PDF File Size Online Free"
      description="Reduce the file size of your PDF documents without losing visual clarity. 100% free, browser-based, and private."
      slug="compress-pdf"
      category="Optimize PDF"
      howToUseSteps={[
        'Upload your PDF document by dragging and dropping or browsing your files.',
        'Choose your desired compression quality level (e.g. Recommended, Extreme, or High Quality).',
        'Click the "Compress PDF" button to shrink your document.',
        'Compare original vs compressed size and download your optimized PDF.',
      ]}
      aboutContent="Our PDF compressor uses intelligent optimization algorithms to downscale oversized images and clean redundant metadata from PDF structures. Because compression happens right inside your browser, large files process fast without waiting for slow cloud uploads."
      faqItems={[
        {
          question: 'Will compressing my PDF reduce text quality?',
          answer: 'Text in compressed PDFs remains crisp vector text. Only embedded images are optimized to conserve space.',
        },
        {
          question: 'How much size reduction can I expect?',
          answer: 'Depending on the images in your PDF, file size reduction ranges from 30% up to 80%.',
        },
      ]}
    >
      <DynamicToolLoader toolSlug="compress-pdf" />
    </ToolSeoPage>
  );
}
