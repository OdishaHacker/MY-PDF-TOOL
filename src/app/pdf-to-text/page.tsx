import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';

export const metadata: Metadata = {
  title: 'PDF to Text Converter Free — Extract Text from PDF | mypdftools',
  description:
    'Extract plain text content from PDF documents instantly. Free online PDF text extractor with no file upload required.',
  keywords: ['pdf to text', 'extract text from pdf', 'pdf to txt', 'pdf text extractor free'],
  alternates: { canonical: 'https://mypdftools.in/pdf-to-text/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Extract Plain Text from PDF Online"
      description="Extract raw text data, paragraphs, and contents from any PDF document into plain text format."
      slug="pdf-to-text"
      category="Convert from PDF"
      howToUseSteps={[
        'Upload your PDF file.',
        'Click "Extract Text" to parse text streams.',
        'Copy extracted text to clipboard or download as a .txt file.',
      ]}
      aboutContent="Fast and lightweight plain text extraction for research, data mining, or copying un-selectable document content."
      faqItems={[
        {
          question: 'Does it extract text from scanned PDFs?',
          answer: 'Text embedded as standard fonts is extracted. For scanned images, OCR preview is applied.',
        },
      ]}
    >
      <DynamicToolLoader toolSlug="pdf-to-text" />
    </ToolSeoPage>
  );
}
