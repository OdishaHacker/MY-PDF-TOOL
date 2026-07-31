import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import ToolSeoPage from '@/components/ToolSeoPage';
import ToolPageSkeleton from '@/components/ToolPageSkeleton';

const PdfToExcel = dynamic(() => import('../../components/pdf-tools/PdfToExcel'), {
  ssr: false,
  loading: () => <ToolPageSkeleton />,
});

export const metadata: Metadata = {
  title: 'PDF to Excel Converter Free — Convert PDF Tables to XLSX | mypdftools',
  description:
    'Extract tabular data from PDF files into editable Excel (.xlsx) spreadsheets online. Free and private.',
  keywords: ['pdf to excel', 'convert pdf to xlsx', 'pdf table extractor', 'pdf to excel free'],
  alternates: { canonical: 'https://mypdftools.in/pdf-to-excel/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Convert PDF Tables to Excel (XLSX)"
      description="Extract financial statements, invoices, and data tables from PDF files into editable Excel spreadsheets."
      slug="pdf-to-excel"
      category="Convert from PDF"
      howToUseSteps={[
        'Upload your PDF file containing data tables.',
        'Click "Convert to Excel" to extract tabular data.',
        'Download your formatted .xlsx spreadsheet.',
      ]}
      aboutContent="Automatically detect table rows and columns inside PDF documents and export structured data straight into Excel."
      faqItems={[
        {
          question: 'Are table structures preserved?',
          answer: 'Yes, rows and columns are extracted into separate Excel cells.',
        },
      ]}
    >
      <PdfToExcel onBack={() => {}} />
    </ToolSeoPage>
  );
}
