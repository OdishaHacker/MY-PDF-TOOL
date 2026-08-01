import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';

export const metadata: Metadata = {
  title: 'Excel to PDF Converter Free — Convert XLSX to PDF | mypdftools',
  description:
    'Convert Excel spreadsheets (.xlsx, .xls) to PDF documents online for free. Private, fast, and no software installation required.',
  keywords: ['excel to pdf', 'xlsx to pdf', 'convert spreadsheet to pdf', 'excel to pdf online'],
  alternates: { canonical: 'https://mypdftools.in/excel-to-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Convert Excel (XLSX) to PDF Online"
      description="Turn Excel spreadsheets into clean, printable PDF documents with table grids and formatting."
      slug="excel-to-pdf"
      category="Convert to PDF"
      howToUseSteps={[
        'Upload your Excel spreadsheet (.xlsx or .xls).',
        'Choose sheet orientation and table pagination settings.',
        'Click "Convert to PDF" to generate the document.',
        'Download your formatted PDF spreadsheet.',
      ]}
      aboutContent="Convert complex financial sheets, invoices, or tables from Excel into shareable PDF files seamlessly in your browser."
      faqItems={[
        {
          question: 'Are all worksheet tabs converted?',
          answer: 'You can choose to convert active sheets or all worksheets into PDF pages.',
        },
      ]}
    >
      <DynamicToolLoader toolSlug="excel-to-pdf" />
    </ToolSeoPage>
  );
}
