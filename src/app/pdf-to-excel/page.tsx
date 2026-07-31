import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import ToolSeoContent from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'PDF to Excel Online Free — Convert PDF to XLSX | mypdftools',
  description: 'Extract tables and data from PDF files into editable Excel spreadsheets. Free, no upload, works in your browser.',
  keywords: ['pdf to excel', 'pdf to xlsx', 'convert pdf to excel', 'extract table from pdf', 'pdf to spreadsheet'],
  alternates: { canonical: 'https://mypdftools.in/pdf-to-excel/' },
  openGraph: { title: 'PDF to Excel Online Free | mypdftools', description: 'Extract tables from PDF to Excel. Free, browser-based.', url: 'https://mypdftools.in/pdf-to-excel/', siteName: 'mypdftools', type: 'website' },
};

export default function Page() {
  return (
    <>
      <ToolClient />
      <ToolSeoContent
        title="Convert PDF to Excel Spreadsheets — Free Online Tool"
        description="Need to extract data tables from PDF documents into editable Excel spreadsheets? Our free tool converts PDF files to XLSX format, preserving table structures and data integrity. All processing happens locally in your browser — your sensitive financial documents and data never leave your device."
        howTo={[
          'Upload your PDF file containing tables or data.',
          'The tool automatically detects and extracts table structures.',
          'Review the extracted data preview.',
          'Download the Excel file (.xlsx) to your device.',
        ]}
        features={[
          'Automatic table detection in PDFs',
          'Preserves data structure and formatting',
          'Outputs standard .xlsx Excel format',
          'No server uploads — complete data privacy',
          'Works with financial reports and invoices',
          'Fast processing even for large documents',
          'No registration required',
          'Free with no usage limits',
        ]}
        faqs={[
          { q: 'Can the tool detect tables automatically?', a: 'Yes, our tool uses intelligent algorithms to detect table structures in your PDF and converts them into organized spreadsheet rows and columns.' },
          { q: 'Does it work with scanned PDF invoices?', a: 'Our tool works best with text-based PDFs. Scanned documents may not extract data accurately without OCR processing.' },
          { q: 'Will the data be accurate?', a: 'For well-structured tables in text-based PDFs, the extraction is highly accurate. Complex merged cells or irregular layouts may need minor adjustments in Excel.' },
        ]}
        relatedTools={[
          { name: 'PDF to Word', href: '/pdf-to-word/' },
          { name: 'Excel to PDF', href: '/excel-to-pdf/' },
          { name: 'PDF to Text', href: '/pdf-to-text/' },
          { name: 'PDF to PowerPoint', href: '/pdf-to-powerpoint/' },
        ]}
      />
    </>
  );
}
