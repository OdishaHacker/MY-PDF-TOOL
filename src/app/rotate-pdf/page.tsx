import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';

export const metadata: Metadata = {
  title: 'Rotate PDF Pages Online Free — Permanent PDF Rotation | mypdftools',
  description:
    'Rotate upside down or sideways PDF pages clockwise or counterclockwise. Permanently save rotated PDF files for free.',
  keywords: ['rotate pdf', 'turn pdf pages', 'rotate pdf online free', 'fix sideways pdf'],
  alternates: { canonical: 'https://mypdftools.in/rotate-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Rotate PDF Pages Online Free"
      description="Permanently fix landscape, upside-down, or sideways PDF pages. Rotate specific pages or the entire document."
      slug="rotate-pdf"
      category="Organize PDF"
      howToUseSteps={[
        'Select and upload your PDF file.',
        'Choose rotation angle (90° clockwise, 180°, or 90° counter-clockwise).',
        'Apply rotation to all pages or selected individual pages.',
        'Click "Download" to save your permanently rotated PDF.',
      ]}
      aboutContent="Fix upside down scans or sideways documents easily. Our PDF Rotation tool updates the internal page orientation attributes permanently."
      faqItems={[
        {
          question: 'Is rotation saved permanently when opened in Adobe Reader?',
          answer: 'Yes, rotation is permanently embedded into the PDF structure.',
        },
      ]}
    >
      <DynamicToolLoader toolSlug="rotate-pdf" />
    </ToolSeoPage>
  );
}
