import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import ToolSeoPage from '@/components/ToolSeoPage';
import ToolPageSkeleton from '@/components/ToolPageSkeleton';

const CropPdf = dynamic(() => import('../../components/pdf-tools/CropPdf'), {
  ssr: false,
  loading: () => <ToolPageSkeleton />,
});

export const metadata: Metadata = {
  title: 'Crop PDF Online Free — Trim Margins of PDF Pages | mypdftools',
  description:
    'Crop PDF pages online to trim whitespace margins or focus on specific content areas. Free and private.',
  keywords: ['crop pdf', 'trim pdf margins', 'crop pdf online free', 'cut pdf margins'],
  alternates: { canonical: 'https://mypdftools.in/crop-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Crop PDF Pages Online Free"
      description="Trim unnecessary margins, headers, or footers from your PDF document pages with visual crop boxes."
      slug="crop-pdf"
      category="Organize PDF"
      howToUseSteps={[
        'Upload your PDF document.',
        'Adjust the crop bounding box over the desired page area.',
        'Choose whether to apply crop area to current page or all pages.',
        'Click "Crop PDF" and download your trimmed document.',
      ]}
      aboutContent="Trim white margins or focus on specific table/figure content using visual drag handles."
      faqItems={[
        {
          question: 'Does cropping reduce file size?',
          answer: 'Cropping adjusts visual bounding boxes, making pages look cleaner.',
        },
      ]}
    >
      <CropPdf onBack={() => {}} />
    </ToolSeoPage>
  );
}
