import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import ToolSeoPage from '@/components/ToolSeoPage';
import ToolPageSkeleton from '@/components/ToolPageSkeleton';

const RedactPdf = dynamic(() => import('../../components/pdf-tools/RedactPdf'), {
  ssr: false,
  loading: () => <ToolPageSkeleton />,
});

export const metadata: Metadata = {
  title: 'Redact PDF Online Free — Blackout Sensitive Text in PDF | mypdftools',
  description:
    'Permanently blackout or whiteout sensitive text, numbers, and private data in PDF files online for free.',
  keywords: ['redact pdf', 'blackout pdf text', 'hide sensitive info pdf', 'redact pdf free'],
  alternates: { canonical: 'https://mypdftools.in/redact-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Redact & Blackout PDF Content"
      description="Permanently mask out social security numbers, private phone numbers, names, or addresses from PDF files."
      slug="redact-pdf"
      category="Security"
      howToUseSteps={[
        'Upload your PDF file.',
        'Draw rectangular redaction boxes over sensitive text or images.',
        'Choose fill color (Blackout or Whiteout).',
        'Click "Apply Redaction" to permanently burn redactions into pages.',
      ]}
      aboutContent="Unlike simple markup tools, Redact PDF permanently overwrites canvas areas so redacted content cannot be selected or copied."
      faqItems={[
        {
          question: 'Is redacted text recoverable?',
          answer: 'No, redactions are permanently flattened into page image layers.',
        },
      ]}
    >
      <RedactPdf onBack={() => {}} />
    </ToolSeoPage>
  );
}
