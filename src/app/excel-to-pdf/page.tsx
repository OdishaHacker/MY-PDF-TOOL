import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';
import { toolMeta } from '@/lib/toolMeta';

const meta = toolMeta.find((t) => t.slug === 'excel-to-pdf')!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: 'https://mypdftools.in/excel-to-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Convert Excel (XLSX) to PDF Online"
      description="Turn spreadsheets into clean, printable PDF documents in your browser. No upload, no account, and no conversion limits."
      slug="excel-to-pdf"
      category="Convert to PDF"
      howToUseSteps={[
    "Drop your .xlsx or .xls file into the dropzone — it opens locally in your browser.",
    "Review the detected sheets and confirm which data should appear in the PDF.",
    "Adjust page settings such as orientation if your table is wide.",
    "Click \"Convert\" to render the spreadsheet into PDF pages.",
    "Download the PDF and check that columns and totals look right before sharing."
  ]}
      aboutContent="The mypdftools Excel-to-PDF converter turns spreadsheets into presentable, print-ready PDF pages. Instead of sending fragile .xlsx files that everyone edits differently, you share a fixed document that keeps your numbers, columns, and formatting exactly where you put them."
      aboutParagraphs={[
    "Spreadsheets are terrible sharing formats. Open an .xlsx file on a phone and columns collapse; open it without the right fonts and formulas display as errors; send it to a client and the first thing they do is accidentally overwrite a cell. A PDF fixes all of this — one file, one layout, readable everywhere from a desktop monitor to a printed page.",
    "The converter reads your workbook sheet by sheet and lays the data out across PDF pages. Wide tables can be placed on landscape pages so every column stays readable, and multi-sheet workbooks are converted in order so the PDF follows the same structure as your file. Text cells, numbers, and basic styling carry over; the goal is a clean document, not a pixel copy of Excel’s interface.",
    "Everything is processed in your browser. Financial data, salary sheets, and inventory lists never touch a server — the file is read from your disk, rendered to PDF in memory, and handed back as a download. For businesses that handle sensitive numbers, that local guarantee is the difference between convenient and safe."
  ]}
      useCases={[
    {
      "title": "Financial Reports",
      "description": "Share monthly budgets and P&L summaries as fixed PDFs that stakeholders cannot accidentally modify."
    },
    {
      "title": "Invoice Sheets",
      "description": "Convert billing spreadsheets into PDF pages that clients can read and print without Excel."
    },
    {
      "title": "Class Marks & Lists",
      "description": "Teachers turn mark sheets and student lists into printable PDFs for notice boards and files."
    },
    {
      "title": "Inventory Snapshots",
      "description": "Archive stock lists as dated PDF snapshots that show exactly what inventory looked like on a given day."
    },
    {
      "title": "Data Submission",
      "description": "Meet portal requirements that ask for spreadsheet data uploaded as a PDF document."
    }
  ]}
      tips={[
    "Landscape orientation keeps wide tables readable — switch it on when your sheet has many columns.",
    "Delete helper columns and scratch calculations before converting; the PDF shows what the sheet contains.",
    "One sheet per topic converts cleanest — split busy workbooks into focused sheets before export.",
    "Round display numbers with cell formatting first; the PDF preserves what the cells display.",
    "Check the last page of the PDF for orphan rows, then adjust if a stray table fragment needs cleaning up.",
    "For multi-sheet workbooks, the PDF follows sheet order — rename sheets so the order reads naturally."
  ]}
      relatedTools={[
    {
      "name": "PDF to Excel",
      "href": "/pdf-to-excel"
    },
    {
      "name": "Word to PDF",
      "href": "/word-to-pdf"
    },
    {
      "name": "Merge PDF",
      "href": "/merge-pdf"
    },
    {
      "name": "Compress PDF",
      "href": "/compress-pdf"
    },
    {
      "name": "Page Numbers",
      "href": "/page-numbers"
    },
    {
      "name": "Protect PDF",
      "href": "/protect-pdf"
    }
  ]}
      faqItems={[
    {
      "question": "Will formulas still work in the PDF?",
      "answer": "No — and that is by design. A PDF is a fixed snapshot: you see the calculated values, not the live formulas. That is exactly what makes it safe to share."
    },
    {
      "question": "Can I convert a workbook with multiple sheets?",
      "answer": "Yes. Every sheet is converted in order, so the final PDF follows the same structure as your workbook."
    },
    {
      "question": "Why do wide tables look cramped?",
      "answer": "Very wide sheets need landscape pages. Switch the orientation option and re-convert so all columns get room to breathe."
    },
    {
      "question": "Is my spreadsheet uploaded anywhere?",
      "answer": "No. The conversion runs entirely in your browser. Salary sheets and financial data never leave your device."
    },
    {
      "question": "Does the PDF keep my cell colors and borders?",
      "answer": "Basic styling such as bold headers and cell shading carries over where the PDF format supports it. The focus is a clean, readable document rather than a pixel-perfect Excel clone."
    },
    {
      "question": "Can I convert .csv files too?",
      "answer": "CSV files open in any spreadsheet app — import one, save as .xlsx, then convert. This keeps column types and formatting under your control."
    }
  ]}
    >
      <DynamicToolLoader toolSlug="excel-to-pdf" />
    </ToolSeoPage>
  );
}
