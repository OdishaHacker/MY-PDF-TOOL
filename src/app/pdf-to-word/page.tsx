import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import ToolSeoPage from '@/components/ToolSeoPage';
import ToolPageSkeleton from '@/components/ToolPageSkeleton';

const PdfToWord = dynamic(() => import('../../components/pdf-tools/PdfToWord'), {
  ssr: false,
  loading: () => <ToolPageSkeleton />,
});

export const metadata: Metadata = {
  title: 'PDF to Word Converter Free — Convert PDF to Editable DOCX | mypdftools',
  description:
    'Convert PDF documents into editable Microsoft Word (.docx) files online for free. Private, fast, no signup.',
  keywords: ['pdf to word', 'convert pdf to docx', 'editable pdf to word', 'pdf to word free'],
  alternates: { canonical: 'https://mypdftools.in/pdf-to-word/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Convert PDF to Editable Word (DOCX)"
      description="Extract text and structure from static PDF documents into editable Microsoft Word files."
      slug="pdf-to-word"
      category="Convert from PDF"
      howToUseSteps={[
        'Upload your PDF document.',
        'Click "Convert to Word" to parse text layers and paragraphs.',
        'Download your editable .docx file and edit in MS Word or Google Docs.',
      ]}
      aboutContent="PDF to Word parses text content, font styles, and paragraphs to generate editable Word documents without server uploads."
      faqItems={[
        {
          question: 'Is converted Word document editable?',
          answer: 'Yes, all extracted text can be freely edited in Word.',
        },
      ]}
    >
      <PdfToWord onBack={() => {}} />
    </ToolSeoPage>
  );
}
