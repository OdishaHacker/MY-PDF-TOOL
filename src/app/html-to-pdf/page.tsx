import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';

export const metadata: Metadata = {
  title: 'HTML to PDF Converter Free — Convert HTML Code to PDF | mypdftools',
  description:
    'Convert HTML code, web content, or HTML files into PDF documents. Free online HTML to PDF converter.',
  keywords: ['html to pdf', 'convert html to pdf', 'webpage to pdf', 'html code to pdf free'],
  alternates: { canonical: 'https://mypdftools.in/html-to-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Convert HTML to PDF Online"
      description="Render and convert raw HTML code or web page markup into clean PDF documents."
      slug="html-to-pdf"
      category="Convert to PDF"
      howToUseSteps={[
        'Paste raw HTML code or upload an .html file.',
        'Preview rendered layout styles and page margins.',
        'Click "Convert to PDF" to generate the vector PDF.',
        'Download your converted PDF document.',
      ]}
      aboutContent="HTML to PDF renders HTML/CSS structures directly into formatted vector PDF pages. Ideal for developers, invoices, and reports."
      faqItems={[
        {
          question: 'Are CSS styles supported?',
          answer: 'Yes, standard CSS inline and block styling are rendered accurately.',
        },
      ]}
    >
      <DynamicToolLoader toolSlug="html-to-pdf" />
    </ToolSeoPage>
  );
}
