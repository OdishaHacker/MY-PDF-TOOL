import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';

export const metadata: Metadata = {
  title: 'Merge PDF Online Free — Combine PDF Files in Browser | mypdftools',
  description:
    'Combine multiple PDF files into one document right in your browser. Free, no upload, no signup, no watermark. Drag to reorder and merge in seconds.',
  keywords: ['merge pdf', 'combine pdf', 'join pdf', 'merge pdf online', 'free pdf merger', 'no upload pdf merge'],
  alternates: { canonical: 'https://mypdftools.in/merge-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Merge PDF Files Online Free"
      description="Combine multiple PDF files into a single, organized PDF document directly in your web browser. 100% free, confidential, and fast."
      slug="merge-pdf"
      category="Organize PDF"
      howToUseSteps={[
        'Click the file dropzone or drag and drop multiple PDF files into the merger area.',
        'Reorder your PDF files by using the arrow buttons or dragging them into your desired order.',
        'Click the "Merge & Download" button to stitch all selected PDFs into one file.',
        'Save your merged PDF document directly to your computer or mobile device.',
      ]}
      aboutContent="Our online PDF Merger tool is engineered to combine separate PDF documents into a single unified file without compromising layout, formatting, or data privacy. Everything is processed 100% inside your web browser — your files are never uploaded to external cloud servers, guaranteeing maximum privacy and confidentiality."
      faqItems={[
        {
          question: 'Is it safe to merge private documents on mypdftools.in?',
          answer: 'Yes, absolutely. All PDF merging operations take place locally inside your browser using client-side JavaScript. Your files never touch our servers.',
        },
        {
          question: 'How many PDF files can I merge at once?',
          answer: 'You can merge as many PDF files as your device memory permits. There are no artificial limits or restrictions.',
        },
        {
          question: 'Do I need to register or install software?',
          answer: 'No registration, email, or software installation is required. It works instantly across all desktop and mobile browsers.',
        },
      ]}
    >
      <DynamicToolLoader toolSlug="merge-pdf" />
    </ToolSeoPage>
  );
}
