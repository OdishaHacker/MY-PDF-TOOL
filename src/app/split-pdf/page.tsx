import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import ToolSeoPage from '@/components/ToolSeoPage';
import ToolPageSkeleton from '@/components/ToolPageSkeleton';

const SplitPdf = dynamic(() => import('../../components/pdf-tools/SplitPdf'), {
  ssr: false,
  loading: () => <ToolPageSkeleton />,
});

export const metadata: Metadata = {
  title: 'Split PDF Online Free — Extract Pages from PDF | mypdftools',
  description:
    'Split PDF files or extract pages into separate PDF documents online. Free, fast, private, and no file size limits.',
  keywords: ['split pdf', 'extract pdf pages', 'separate pdf pages', 'split pdf online free'],
  alternates: { canonical: 'https://mypdftools.in/split-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Split PDF Pages Online Free"
      description="Divide large PDF documents into smaller files or extract specific pages instantly in your browser. 100% free and private."
      slug="split-pdf"
      category="Organize PDF"
      howToUseSteps={[
        'Upload your PDF document by dragging and dropping or selecting from your device.',
        'Specify page ranges (e.g. 1-5, 8, 11-14) or select individual pages to extract.',
        'Click the "Split PDF" button to generate separate PDF documents.',
        'Download your split PDF files instantly as individual files or a ZIP archive.',
      ]}
      aboutContent="Our online Split PDF tool provides granular control over PDF page extraction. Whether you need to split a 100-page report into chapters or remove specific confidential pages, our tool processes everything locally in your web browser for maximum privacy."
      faqItems={[
        {
          question: 'Can I split password-protected PDFs?',
          answer: 'If your PDF is password protected, unlock it first using our Unlock PDF tool, then split it freely.',
        },
        {
          question: 'Are my split pages uploaded to any cloud server?',
          answer: 'No. All splitting operations are performed 100% locally inside your web browser engine.',
        },
      ]}
    >
      <SplitPdf onBack={() => {}} />
    </ToolSeoPage>
  );
}
