import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import ToolSeoPage from '@/components/ToolSeoPage';
import ToolPageSkeleton from '@/components/ToolPageSkeleton';

const PdfToPowerpoint = dynamic(() => import('../../components/pdf-tools/PdfToPowerpoint'), {
  ssr: false,
  loading: () => <ToolPageSkeleton />,
});

export const metadata: Metadata = {
  title: 'PDF to PowerPoint Converter Free — Convert PDF to PPTX | mypdftools',
  description:
    'Convert PDF slides and presentations into editable PowerPoint (.pptx) slide decks online for free.',
  keywords: ['pdf to powerpoint', 'pdf to pptx', 'convert pdf slides to ppt', 'pdf to powerpoint free'],
  alternates: { canonical: 'https://mypdftools.in/pdf-to-powerpoint/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Convert PDF to PowerPoint (PPTX)"
      description="Turn PDF document slides into editable PowerPoint presentations ready for slide shows."
      slug="pdf-to-powerpoint"
      category="Convert from PDF"
      howToUseSteps={[
        'Upload your PDF presentation or document.',
        'Click "Convert to PowerPoint" to format slides.',
        'Download your editable .pptx presentation file.',
      ]}
      aboutContent="Convert PDF pitch decks and slide notes into Microsoft PowerPoint presentations cleanly inside your web browser."
      faqItems={[
        {
          question: 'Are slides converted into individual PowerPoint pages?',
          answer: 'Yes, each PDF page becomes a distinct slide in the PPTX deck.',
        },
      ]}
    >
      <PdfToPowerpoint onBack={() => {}} />
    </ToolSeoPage>
  );
}
