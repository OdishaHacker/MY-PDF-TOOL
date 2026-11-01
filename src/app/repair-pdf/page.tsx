import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';
import { toolMeta } from '@/lib/toolMeta';

const meta = toolMeta.find((t) => t.slug === 'repair-pdf')!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: 'https://mypdftools.in/repair-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Repair Corrupted PDF Files Online"
      description="Recover pages from damaged or broken PDF files. The tool rebuilds readable content locally in your browser — private and free."
      slug="repair-pdf"
      category="Optimize PDF"
      howToUseSteps={[
    "Drag the corrupted PDF into the dropzone — even files that refuse to open.",
    "The tool analyzes the file structure and identifies readable objects.",
    "Click \"Repair\" to rebuild a clean PDF from every recoverable page.",
    "Review the repaired preview to see which pages were recovered.",
    "Download the repaired PDF and verify it opens normally in your reader."
  ]}
      aboutContent="The mypdftools PDF Repair tool rescues documents that will not open. A corrupted download, an interrupted transfer, a crashed app mid-save — the repair engine reads whatever valid page data survives inside the broken file and rebuilds a clean, openable PDF from it."
      aboutParagraphs={[
    "PDF files break more often than people expect. An email attachment truncated at 99 percent, a USB drive pulled out during a copy, a laptop battery dying while a scanner uploads — all of these can strip the internal index that tells readers where pages begin and end. The underlying page content often survives untouched; it is the map to that content that got damaged.",
    "Repair works by scanning the raw file for recognizable page objects instead of trusting the damaged index. Every intact page it finds is copied into a freshly built PDF with a clean, correct structure. Results depend on the damage: files with a broken index but intact body recover almost completely, while files truncated mid-way recover everything up to the cut-off point.",
    "Like every mypdftools tool, the repair runs in your browser. The damaged file is read locally, reconstructed in memory, and the fixed copy is saved straight to your device. There is no upload of your broken document to anyone’s server, no account, and no fee — just a second chance for a file that looked like a total loss."
  ]}
      useCases={[
    {
      "title": "Failed Downloads",
      "description": "Recover documents interrupted mid-download where the file refuses to open in any reader."
    },
    {
      "title": "Interrupted Transfers",
      "description": "Fix PDFs copied from a faulty USB stick or an unstable network share that dropped mid-transfer."
    },
    {
      "title": "Crashed Applications",
      "description": "Rescue files saved by an editor or scanner app that crashed before finishing the write."
    },
    {
      "title": "Old Backups",
      "description": "Attempt recovery of legacy PDFs from old drives whose contents degraded over years of storage."
    },
    {
      "title": "Email Attachment Issues",
      "description": "Rebuild attachments that arrived truncated because the mail gateway clipped them."
    }
  ]}
      tips={[
    "Repair recovers pages up to the point of damage — a file truncated halfway usually returns its first half intact.",
    "If one reader refuses the file, try opening it in another before repairing — some viewers tolerate damage better.",
    "After a successful repair, compress the recovered file once to normalize its structure for future sharing.",
    "Keep the original damaged file until you have confirmed the repaired copy is complete.",
    "Scanned and image-heavy PDFs often repair fully because their page objects are large and self-contained.",
    "Prevention beats repair: use cloud sync or verify file sizes after large transfers to catch corruption early."
  ]}
      relatedTools={[
    {
      "name": "Compress PDF",
      "href": "/compress-pdf"
    },
    {
      "name": "Merge PDF",
      "href": "/merge-pdf"
    },
    {
      "name": "Split PDF",
      "href": "/split-pdf"
    },
    {
      "name": "Organize PDF",
      "href": "/organize-pdf"
    },
    {
      "name": "PDF to JPG",
      "href": "/pdf-to-jpg"
    },
    {
      "name": "Protect PDF",
      "href": "/protect-pdf"
    }
  ]}
      faqItems={[
    {
      "question": "Can all corrupted PDFs be repaired?",
      "answer": "No tool can guarantee that. Repair recovers whatever intact page data remains inside the file. Files with a damaged index usually recover almost fully; files truncated mid-download recover up to the break point."
    },
    {
      "question": "Will the repaired file look exactly like the original?",
      "answer": "Recovered pages keep their original text and image content. Interactive extras such as form fields, bookmarks, or annotations may not survive the rebuild, since the repair reconstructs the document from page data."
    },
    {
      "question": "Is my broken file uploaded anywhere?",
      "answer": "No. The repair analysis and rebuild both happen inside your browser. Your damaged document never leaves your device."
    },
    {
      "question": "Why does my repaired file end at page 12 of 30?",
      "answer": "The file was most likely truncated — the data after the damage point simply no longer exists in the copy you have. Repair recovers everything that physically survived."
    },
    {
      "question": "Is it free to repair PDFs here?",
      "answer": "Yes, completely. There is no page limit, no watermark, and no account required — the same as every other tool on mypdftools."
    },
    {
      "question": "What should I do after a successful repair?",
      "answer": "Open the repaired file and check the page count against what you expect. Then keep both the repaired copy and, if space allows, the original — in case you later find the damage was on your side of the transfer."
    }
  ]}
    >
      <DynamicToolLoader toolSlug="repair-pdf" />
    </ToolSeoPage>
  );
}
