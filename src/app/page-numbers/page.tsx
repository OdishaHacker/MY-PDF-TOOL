import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';

export const metadata: Metadata = {
  title: 'Add Page Numbers to PDF Free — Number PDF Pages Online | mypdftools',
  description:
    'Insert custom page numbers into PDF documents online. Select position, format, font, and starting page number for free.',
  keywords: ['add page numbers to pdf', 'number pdf pages', 'pdf page numbering free'],
  alternates: { canonical: 'https://mypdftools.in/page-numbers/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Add Page Numbers to PDF"
      description="Format and insert clean page numbers into headers or footers of your PDF pages."
      slug="page-numbers"
      category="Organize PDF"
      howToUseSteps={[
        'Upload your PDF file.',
        'Choose numbering position (top-left, top-center, bottom-right, etc.).',
        'Select number format (e.g. "Page X of Y" or simple numbers).',
        'Click "Add Page Numbers" and download your numbered PDF.',
      ]}
      aboutContent="Add page numbers to legal contracts, academic papers, or ebooks easily with custom font sizing and alignment."
      faqItems={[
        {
          question: 'Can I skip the cover page?',
          answer: 'Yes, set starting page number options to skip numbering page 1.',
        },
      ]}
    >
      <DynamicToolLoader toolSlug="page-numbers" />
    </ToolSeoPage>
  );
}
