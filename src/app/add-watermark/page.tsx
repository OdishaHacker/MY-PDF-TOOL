import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import ToolSeoPage from '@/components/ToolSeoPage';
import ToolPageSkeleton from '@/components/ToolPageSkeleton';

const AddWatermark = dynamic(() => import('../../components/pdf-tools/AddWatermark'), {
  ssr: false,
  loading: () => <ToolPageSkeleton />,
});

export const metadata: Metadata = {
  title: 'Add Watermark to PDF Free — Text & Image Watermarks | mypdftools',
  description:
    'Stamp text or image watermarks onto PDF pages online. Customize font size, rotation, opacity, and positioning for free.',
  keywords: ['add watermark to pdf', 'watermark pdf online free', 'pdf watermark tool', 'stamp pdf'],
  alternates: { canonical: 'https://mypdftools.in/add-watermark/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Add Watermark to PDF Online"
      description="Protect intellectual property by stamping custom text or image watermarks across PDF document pages."
      slug="add-watermark"
      category="Security & Edit"
      howToUseSteps={[
        'Upload your PDF document.',
        'Choose text or image watermark type.',
        'Customize text string, font size, rotation angle, and opacity level.',
        'Click "Apply Watermark" and download your protected PDF.',
      ]}
      aboutContent="Watermarking protects your documents against unauthorized copying and distribution by overlaying custom text (e.g., 'CONFIDENTIAL', 'DRAFT') or logos."
      faqItems={[
        {
          question: 'Can I control watermark transparency?',
          answer: 'Yes, full opacity and rotation sliders are provided.',
        },
      ]}
    >
      <AddWatermark onBack={() => {}} />
    </ToolSeoPage>
  );
}
