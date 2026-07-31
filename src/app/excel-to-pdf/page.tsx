import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import ToolSeoContent from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'Excel to PDF Online Free — Convert Spreadsheets to PDF | mypdftools',
  description: 'Convert Excel spreadsheets (XLSX) to PDF documents. Free, no upload, works in your browser.',
  keywords: ['excel to pdf', 'xlsx to pdf', 'convert excel to pdf', 'spreadsheet to pdf'],
  alternates: { canonical: 'https://mypdftools.in/excel-to-pdf/' },
  openGraph: { title: 'Excel to PDF Free | mypdftools', description: 'Convert Excel to PDF. Free, browser-based.', url: 'https://mypdftools.in/excel-to-pdf/', siteName: 'mypdftools', type: 'website' },
};

export default function Page() {
  return (
    <>
      <ToolClient />
      <ToolSeoContent
        title="Convert Excel to PDF — Free Online Tool"
        description="Convert your Excel spreadsheets into professional PDF documents that preserve your data, formatting, and layout. Share spreadsheet data as universally readable PDFs without requiring recipients to have Excel installed. Processing happens entirely in your browser for complete privacy."
        howTo={['Upload your Excel file (.xlsx or .xls).', 'The tool converts the spreadsheet to PDF format.', 'Preview the output to verify formatting.', 'Download the PDF file instantly.']}
        features={['Supports .xlsx and .xls formats', 'Preserves table formatting and data', 'No server uploads — 100% private', 'Free with no watermarks', 'Fast browser-based conversion', 'Works on all devices', 'No registration needed', 'Unlimited conversions']}
        faqs={[
          { q: 'Will my charts and formulas be preserved?', a: 'Charts are converted as images in the PDF. Formulas are shown as their calculated values since PDFs do not support live formulas.' },
          { q: 'Can I convert multiple sheets?', a: 'The tool converts all sheets in your workbook into the PDF document.' },
          { q: 'Is there a row or column limit?', a: 'There is no artificial limit. Large spreadsheets may take slightly longer to process depending on your device.' },
        ]}
        relatedTools={[{ name: 'PDF to Excel', href: '/pdf-to-excel/' }, { name: 'Word to PDF', href: '/word-to-pdf/' }, { name: 'HTML to PDF', href: '/html-to-pdf/' }, { name: 'Compress PDF', href: '/compress-pdf/' }]}
      />
    </>
  );
}
