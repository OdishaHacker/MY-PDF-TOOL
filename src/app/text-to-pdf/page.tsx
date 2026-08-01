import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';

export const metadata: Metadata = {
  title: 'Text to PDF Converter Free — Convert TXT to PDF | mypdftools',
  description:
    'Convert plain text (.txt) files or typed notes into formatted PDF documents online for free.',
  keywords: ['text to pdf', 'txt to pdf', 'convert text file to pdf', 'text to pdf online free'],
  alternates: { canonical: 'https://mypdftools.in/text-to-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Convert Plain Text to PDF Online"
      description="Type or upload plain text files and instantly format them into downloadable PDF documents."
      slug="text-to-pdf"
      category="Convert to PDF"
      howToUseSteps={[
        'Type/paste text or upload a plain text (.txt) file.',
        'Choose font style, font size, page margins, and line spacing.',
        'Click "Generate PDF" to format pages.',
        'Download your formatted PDF file.',
      ]}
      aboutContent="Turn plain text notes, articles, or code snippets into clean PDF documents with custom typography and page layouts."
      faqItems={[
        {
          question: 'Can I customize line spacing and font size?',
          answer: 'Yes, full control over font size, line height, and page margins is provided.',
        },
      ]}
    >
      <DynamicToolLoader toolSlug="text-to-pdf" />
    </ToolSeoPage>
  );
}
