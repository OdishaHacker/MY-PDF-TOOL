import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';
import { toolMeta } from '@/lib/toolMeta';

const meta = toolMeta.find((t) => t.slug === 'pdf-to-excel')!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: 'https://mypdftools.in/pdf-to-excel/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Convert PDF Tables to Excel (XLSX)"
      description="Pull tabular data out of PDF files into spreadsheets — locally, free, and without uploading your numbers anywhere."
      slug="pdf-to-excel"
      category="Convert from PDF"
      howToUseSteps={[
    "Drop a PDF that contains tables or columnar data into the dropzone.",
    "The tool scans pages locally and extracts the text in structured rows.",
    "Click \"Convert\" to generate an .xlsx spreadsheet from the extracted data.",
    "Open the preview to check how rows and columns were interpreted.",
    "Download the Excel file and tidy up any merged cells or totals in your spreadsheet app."
  ]}
      aboutContent="The mypdftools PDF-to-Excel converter extracts tabular content from PDF documents into a spreadsheet you can actually work with. Instead of retyping figures from bank statements, price lists, or reports, you get the data in cells — ready to sort, filter, and calculate."
      aboutParagraphs={[
    "Data locked inside a PDF is a special kind of frustration. The figures are right there on the page, but you cannot sum them, filter them, or chart them. Accountants retyping statement rows, analysts rebuilding report tables, and students copying experiment data all face the same wall — until the data lands in a spreadsheet.",
    "The converter reads the text layer of your PDF and reconstructs rows and columns based on the page layout. Clean, consistently formatted tables convert well; heavily decorated or multi-page tables may need a little cleanup in Excel afterward. Treat the output as a strong first draft of the spreadsheet — usually 95 percent of the typing already done.",
    "As with every tool on the site, the extraction runs locally in your browser. Financial statements, payroll data, and client figures never touch a server. The PDF is read from your disk, parsed in memory, and the workbook is saved straight back to your device."
  ]}
      useCases={[
    {
      "title": "Bank Statement Data",
      "description": "Move transaction rows from statement PDFs into a spreadsheet for budgeting and reconciliation."
    },
    {
      "title": "Price List Rebuilds",
      "description": "Convert supplier price-list PDFs into working sheets you can sort and update."
    },
    {
      "title": "Report Analysis",
      "description": "Extract the tables of an annual report so you can chart and analyze the numbers yourself."
    },
    {
      "title": "Survey Results",
      "description": "Turn tabulated survey summaries into data ready for charts and pivot tables."
    },
    {
      "title": "Academic Data",
      "description": "Recover experiment results and statistical tables from published PDF papers for coursework."
    }
  ]}
      tips={[
    "The cleaner the table borders and alignment in the PDF, the cleaner the extracted columns will be.",
    "Multi-page tables convert page by page — stack the pages’ output in order inside Excel.",
    "Totals and formulas will not convert — PDFs store displayed values, so re-add calculations in Excel.",
    "Check number formats after extraction; PDFs lose the comma/decimal conventions of the original.",
    "Scanned tables need OCR first — the tool reads text layers, not photos of tables.",
    "Verify a few sample rows against the PDF before trusting the whole sheet — a 30-second check prevents bad analysis."
  ]}
      relatedTools={[
    {
      "name": "Excel to PDF",
      "href": "/excel-to-pdf"
    },
    {
      "name": "PDF to Word",
      "href": "/pdf-to-word"
    },
    {
      "name": "PDF to Text",
      "href": "/pdf-to-text"
    },
    {
      "name": "Split PDF",
      "href": "/split-pdf"
    },
    {
      "name": "PDF to JPG",
      "href": "/pdf-to-jpg"
    },
    {
      "name": "Merge PDF",
      "href": "/merge-pdf"
    }
  ]}
      faqItems={[
    {
      "question": "Will the converter keep my table structure exactly?",
      "answer": "It reconstructs rows and columns from the page layout. Well-aligned tables convert closely; decorative or rotated tables may need column fixes in Excel afterward."
    },
    {
      "question": "Can it read tables from scanned PDFs?",
      "answer": "No — scanned pages are images without a text layer. Run the document through an OCR tool first, then convert the resulting text-based PDF."
    },
    {
      "question": "Are formulas included in the output?",
      "answer": "No. PDFs store displayed values, not formulas. Your spreadsheet will contain the numbers as plain values, ready for you to add formulas on top."
    },
    {
      "question": "Is my financial data uploaded anywhere?",
      "answer": "Never. Extraction happens entirely in your browser — statements and reports stay on your device."
    },
    {
      "question": "Why are some columns merged or shifted?",
      "answer": "The PDF’s visual spacing was ambiguous — common with multi-level headers or irregular columns. Fix the affected columns manually; the rest of the data is usually fine."
    },
    {
      "question": "What format is the output file?",
      "answer": "A standard .xlsx workbook that opens in Microsoft Excel, Google Sheets, LibreOffice Calc, and Numbers."
    }
  ]}
    >
      <DynamicToolLoader toolSlug="pdf-to-excel" />
    </ToolSeoPage>
  );
}
