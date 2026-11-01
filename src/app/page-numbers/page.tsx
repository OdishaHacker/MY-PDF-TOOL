import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';
import { toolMeta } from '@/lib/toolMeta';

const meta = toolMeta.find((t) => t.slug === 'page-numbers')!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: 'https://mypdftools.in/page-numbers/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Add Page Numbers to PDF"
      description="Insert page numbers with your choice of position, format, and starting number. Quick, precise, and fully local to your browser."
      slug="page-numbers"
      category="Organize PDF"
      howToUseSteps={[
    "Drop your PDF into the dropzone to load its pages.",
    "Choose a position: bottom-center, bottom-right, top-right, and more.",
    "Pick a format — plain numbers, \"Page X\", or \"Page X of Y\".",
    "Set the starting number if the document continues an existing sequence.",
    "Click \"Apply\" and download the numbered PDF, ready for printing or filing."
  ]}
      aboutContent="The mypdftools Page Numbers tool adds clean, consistent page numbering to any PDF. Choose position, format, and starting value — then stamp every page in one pass, entirely inside your browser."
      aboutParagraphs={[
    "Page numbers look trivial until their absence causes chaos. A printed contract gets shuffled and nobody can verify the order. A 60-page submission is discussed as \"the chart on the, um, twelfth page or so\". Courts, universities, and offices rely on numbered pages — \"as per page 23 of the agreement\" only works when the pages are actually numbered.",
    "The tool covers the formatting decisions that matter. Position puts numbers where convention expects them — bottom-center for most documents, bottom-right for reports, top corners for handouts. Format handles phrasing: a bare number, \"Page 4\", or the legally useful \"Page 4 of 17\", which proves a document is complete. Starting number supports documents that continue an earlier file — start at 18 and the sequence flows on.",
    "Numbering is a metadata-level stamp applied locally: the PDF is read, every page gets its number, and the finished file is saved to your device. No upload, no account, and no limit on page count."
  ]}
      useCases={[
    {
      "title": "Legal Documents",
      "description": "Number agreements with \"Page X of Y\" so completeness is provable and references are exact."
    },
    {
      "title": "Academic Submissions",
      "description": "Meet dissertation and assignment rules that require numbered pages in a set position."
    },
    {
      "title": "Print Preparation",
      "description": "Number reports before printing so shuffled paper can always be re-collated correctly."
    },
    {
      "title": "Continued Documents",
      "description": "Start numbering at a custom value when a document follows an earlier volume."
    },
    {
      "title": "Business Reports",
      "description": "Give proposals and reports the professional finish of consistent page numbers."
    }
  ]}
      tips={[
    "\"Page X of Y\" is the strongest format for legal and official files — it proves nothing is missing.",
    "Bottom-center is the universal default; bottom-right reads naturally in ring binders.",
    "Start at 0 for a cover page so the first content page becomes page 1.",
    "Number after final reordering — number first and the labels break when pages move.",
    "Skip watermarking conflicts: watermarks sit mid-page, numbers at the edge, so they coexist cleanly.",
    "Margins matter — numbers sit inside the standard margin, so avoid extreme margin settings first."
  ]}
      relatedTools={[
    {
      "name": "Organize PDF",
      "href": "/organize-pdf"
    },
    {
      "name": "Merge PDF",
      "href": "/merge-pdf"
    },
    {
      "name": "Add Watermark",
      "href": "/add-watermark"
    },
    {
      "name": "Protect PDF",
      "href": "/protect-pdf"
    },
    {
      "name": "Compress PDF",
      "href": "/compress-pdf"
    },
    {
      "name": "Split PDF",
      "href": "/split-pdf"
    }
  ]}
      faqItems={[
    {
      "question": "Can numbering start from a number other than 1?",
      "answer": "Yes. Set the starting value — for example 18 — and the pages continue that sequence, which is ideal for volumes and appendices."
    },
    {
      "question": "Which positions can I choose?",
      "answer": "The common conventions: bottom-center, bottom corners, and top corners. Pick the one that matches your document’s style."
    },
    {
      "question": "Does \"Page X of Y\" update automatically?",
      "answer": "Yes. The tool counts the document’s pages and stamps the correct total on each one at the time of numbering."
    },
    {
      "question": "Will numbers appear on top of my content?",
      "answer": "Numbers are placed in the margin area at the edge of the page, so they stay clear of body text in standard documents."
    },
    {
      "question": "Is the numbering permanent?",
      "answer": "Yes — the numbers are saved into the page content itself, so they appear in every viewer and every printout."
    },
    {
      "question": "Is my document uploaded for numbering?",
      "answer": "Never. The tool runs entirely in your browser; the numbered file is written directly back to your device."
    }
  ]}
    >
      <DynamicToolLoader toolSlug="page-numbers" />
    </ToolSeoPage>
  );
}
