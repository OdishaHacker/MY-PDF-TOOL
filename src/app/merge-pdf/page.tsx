import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';
import { toolMeta } from '@/lib/toolMeta';

const meta = toolMeta.find((t) => t.slug === 'merge-pdf')!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: 'https://mypdftools.in/merge-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Merge PDF Files Online Free"
      description="Combine multiple PDF files into a single, organized document directly in your web browser. 100% free, confidential, and fast."
      slug="merge-pdf"
      category="Organize PDF"
      howToUseSteps={[
    "Click the file dropzone or drag and drop two or more PDF files into the merger area.",
    "Arrange the files in the exact order you want them to appear in the final document.",
    "Use the move-up and move-down buttons to fine-tune the sequence before merging.",
    "Click the \"Merge\" button — all files are combined locally inside your browser.",
    "Download the merged PDF straight to your computer, tablet, or phone."
  ]}
      aboutContent="The mypdftools PDF Merger combines separate PDF documents into one clean, unified file without altering the layout, fonts, or images on any page. Because the entire merge runs inside your browser, your documents are never uploaded to a server — nobody else ever sees them."
      aboutParagraphs={[
    "Merging PDFs is one of those everyday tasks that shows up everywhere: a student combining assignment chapters, an accountant bundling invoices for the month, or a job seeker attaching a cover letter, CV, and portfolio into a single application file. Sending one well-ordered PDF instead of five loose attachments looks more professional and guarantees the reader sees everything in the order you intended.",
    "Our merger preserves the original page size, text quality, and image resolution of every source file. Mixed page sizes are handled gracefully — an A4 report can be merged with an A3 drawing sheet and each page keeps its own dimensions. Text stays selectable and searchable after merging, so the combined document remains just as useful as the originals.",
    "The tool runs entirely client-side using modern JavaScript PDF libraries. Your files are read into browser memory, combined there, and written back to your device as a new PDF. There is no upload step, no queue, no file-size cap imposed by a server, and no waiting for other users — the merge completes as fast as your own device can process it."
  ]}
      useCases={[
    {
      "title": "Job Applications",
      "description": "Bundle your cover letter, resume, certificates, and portfolio into one polished PDF that recruiters can open in a single click."
    },
    {
      "title": "Invoice & Receipt Bundles",
      "description": "Accountants and freelancers combine monthly invoices or expense receipts into one archive-ready document for clients or tax filing."
    },
    {
      "title": "Academic Submissions",
      "description": "Students merge assignment chapters, references, and appendices into a single file that matches university submission rules."
    },
    {
      "title": "Legal & Contract Packs",
      "description": "Join agreements, annexures, and signed pages into one numbered contract file before sending it for signature or filing."
    },
    {
      "title": "Scanned Document Sets",
      "description": "Combine separately scanned sections — for example, a 10-page scan done on a phone — back into one continuous document."
    }
  ]}
      tips={[
    "Name your files with number prefixes (01-cover.pdf, 02-resume.pdf) so you can verify the order at a glance before merging.",
    "Merged PDFs keep the page order of the file list — double-check the sequence with the arrow buttons before you click Merge.",
    "If one source file is password-protected, unlock it first with the Unlock PDF tool, then merge.",
    "Merging never overwrites your originals — the tool always creates a new output file, so keep your sources safe.",
    "For very large combined files (hundreds of pages), close other heavy browser tabs so more memory is available.",
    "Need only part of a document inside the bundle? Split it first with the Split PDF tool, then merge just the pages you need."
  ]}
      relatedGuides={[
    {
      "name": "How to Merge PDF Files: Step-by-Step",
      "href": "/blog/merge-pdf-guide"
    },
    {
      "name": "How to Split PDF Files & Extract Pages",
      "href": "/blog/split-pdf-tips"
    },
    {
      "name": "How to Organize & Reorder PDF Pages",
      "href": "/blog/organize-pdf-pages"
    }
  ]}

      relatedTools={[
    {
      "name": "Split PDF",
      "href": "/split-pdf"
    },
    {
      "name": "Organize PDF",
      "href": "/organize-pdf"
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
      "name": "Rotate PDF",
      "href": "/rotate-pdf"
    },
    {
      "name": "Unlock PDF",
      "href": "/unlock-pdf"
    }
  ]}
      faqItems={[
    {
      "question": "Is it safe to merge private documents on mypdftools?",
      "answer": "Yes. All merging happens locally in your browser using client-side JavaScript. Your files are never uploaded to any server, so confidential documents such as contracts, medical records, or ID scans stay on your device at all times."
    },
    {
      "question": "How many PDF files can I merge at once?",
      "answer": "There is no artificial limit. You can merge as many files as your device memory allows — a typical laptop comfortably handles dozens of files or several hundred pages in one go."
    },
    {
      "question": "Do I need to register or install anything?",
      "answer": "No. The tool works instantly in every modern desktop or mobile browser — Chrome, Firefox, Safari, or Edge. There is no account, no email required, and no software to install."
    },
    {
      "question": "Will the text in my PDF remain selectable after merging?",
      "answer": "Yes. Merging keeps the original text layer intact, so the combined document stays searchable, selectable, and copy-paste friendly. Only scanned image pages remain images, exactly as they were in the source."
    },
    {
      "question": "Can I merge files with different page sizes?",
      "answer": "Absolutely. Each page keeps its original dimensions, so you can combine A4 reports with A3 drawings, letter-size scans, or any other mix without the tool forcing one size on all pages."
    },
    {
      "question": "Are bookmarks and links preserved after merging?",
      "answer": "Page content, text, and images are preserved. Interactive extras such as bookmarks, form fields, and internal links may not carry over, because the merge rebuilds the document from the page contents of each source file."
    }
  ]}
    >
      <DynamicToolLoader toolSlug="merge-pdf" />
    </ToolSeoPage>
  );
}
