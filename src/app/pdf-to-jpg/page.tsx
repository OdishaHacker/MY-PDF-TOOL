import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import ToolSeoPage from '@/components/ToolSeoPage';
import ToolPageSkeleton from '@/components/ToolPageSkeleton';

const PdfToJpg = dynamic(() => import('../../components/pdf-tools/PdfToJpg'), {
  ssr: false,
  loading: () => <ToolPageSkeleton />,
});

export const metadata: Metadata = {
  title: 'PDF to JPG Converter Online Free — Extract Images from PDF | mypdftools',
  description:
    'Convert PDF pages into high-resolution JPG images. Extract high-quality images from PDF files online for free.',
  keywords: ['pdf to jpg', 'pdf to image', 'convert pdf to jpg free', 'extract images from pdf'],
  alternates: { canonical: 'https://mypdftools.in/pdf-to-jpg/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Convert PDF Pages to JPG Images"
      description="Extract PDF pages as crisp JPG images or save all images embedded in a PDF file."
      slug="pdf-to-jpg"
      category="Convert from PDF"
      howToUseSteps={[
        'Upload your PDF file.',
        'Choose image resolution quality (Standard DPI or High DPI).',
        'Click "Convert to JPG" to render page images.',
        'Download individual JPG images or a ZIP package of all pages.',
      ]}
      aboutContent="PDF to JPG renders vector PDF pages into high-resolution JPG images using browser canvas rendering engines, ensuring perfect photo accuracy."
      faqItems={[
        {
          question: 'Are extracted images full quality?',
          answer: 'Yes, rendered images maintain crisp pixel resolution.',
        },
      ]}
    >
      <PdfToJpg onBack={() => {}} />
    </ToolSeoPage>
  );
}
