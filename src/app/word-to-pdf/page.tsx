import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';

export const metadata: Metadata = {
  title: 'Word to PDF Converter Free — Convert DOCX to PDF Online | mypdftools',
  description:
    'Convert Microsoft Word DOCX and DOC documents into formatted PDF files right in your browser. Free and private.',
  keywords: ['word to pdf', 'docx to pdf', 'convert word to pdf free', 'doc to pdf online'],
  alternates: { canonical: 'https://mypdftools.in/word-to-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Convert Word (DOCX) to PDF Online"
      description="Transform Word documents into professional PDF files with layout, fonts, and images preserved."
      slug="word-to-pdf"
      category="Convert to PDF"
      howToUseSteps={[
        'Select or drag your Word file (.docx) into the converter.',
        'Wait a moment while the document is rendered and formatted.',
        'Click "Download PDF" to save your converted document.',
      ]}
      aboutContent="Convert Word files to PDF instantly without opening Microsoft Office or installing desktop extensions. Clean client-side conversion."
      faqItems={[
        {
          question: 'Are my formatting and fonts preserved?',
          answer: 'Yes, document layout, headings, and formatting are maintained.',
        },
      ]}
    >
      <DynamicToolLoader toolSlug="word-to-pdf" />
    </ToolSeoPage>
  );
}
