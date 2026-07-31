import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import ToolSeoPage from '@/components/ToolSeoPage';
import ToolPageSkeleton from '@/components/ToolPageSkeleton';

const RepairPdf = dynamic(() => import('../../components/pdf-tools/RepairPdf'), {
  ssr: false,
  loading: () => <ToolPageSkeleton />,
});

export const metadata: Metadata = {
  title: 'Repair Corrupted PDF Online Free — Fix Damaged PDF Files | mypdftools',
  description:
    'Recover content from damaged or unreadable PDF files. Fix broken PDF structures directly in your browser for free.',
  keywords: ['repair pdf', 'fix corrupted pdf', 'recover damaged pdf', 'pdf repair tool free'],
  alternates: { canonical: 'https://mypdftools.in/repair-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Repair Corrupted PDF Files Online"
      description="Fix damaged, broken, or unreadable PDF documents and recover recoverable page data instantly."
      slug="repair-pdf"
      category="Optimize PDF"
      howToUseSteps={[
        'Upload your damaged or unopenable PDF file.',
        'Our diagnostic engine scans and reconstructs broken cross-reference tables.',
        'Click "Repair PDF" to rebuild a clean PDF structure.',
        'Download your recovered PDF document.',
      ]}
      aboutContent="Repair PDF scans broken byte offsets, missing trailers, and corrupt xref tables to rebuild a valid PDF document whenever possible."
      faqItems={[
        {
          question: 'Can all corrupted PDFs be repaired?',
          answer: 'If key page objects remain intact, our repair engine recovers them successfully.',
        },
      ]}
    >
      <RepairPdf onBack={() => {}} />
    </ToolSeoPage>
  );
}
