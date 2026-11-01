import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';
import { toolMeta } from '@/lib/toolMeta';

const meta = toolMeta.find((t) => t.slug === 'html-to-pdf')!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: 'https://mypdftools.in/html-to-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Convert HTML to PDF Online"
      description="Render HTML pages or code snippets into polished PDF documents. Paste markup or upload a file — processing stays in your browser."
      slug="html-to-pdf"
      category="Convert to PDF"
      howToUseSteps={[
    "Paste your HTML code into the input box, or drop an .html file into the dropzone.",
    "Set the PDF page size and orientation if the defaults do not match your needs.",
    "Click \"Convert\" — the markup is rendered locally, exactly as a browser would display it.",
    "Review the generated preview to confirm the layout captured correctly.",
    "Download the PDF, ready for archiving, printing, or sharing."
  ]}
      aboutContent="The mypdftools HTML-to-PDF converter turns web markup into fixed, shareable PDF documents. Paste raw HTML or upload a saved .html file and get a paginated PDF that preserves the rendered look of the page — headings, colors, images, and layout included."
      aboutParagraphs={[
    "Web pages are living documents: they change, they depend on network access, and they reflow across screen sizes. Saving a page as PDF freezes it at a moment in time — useful for receipts, booking confirmations, documentation snapshots, court records of online content, and design approvals. The PDF becomes evidence of exactly what the page looked like when you saved it.",
    "The converter renders your HTML with a real browser engine and then prints that rendering to PDF pages. This means what you get is what a browser shows — styled headings, background colors, lists, tables, and embedded images — paginated across A4 or Letter sheets. It is far more faithful than copy-pasting text, which strips styling and structure.",
    "Because rendering happens in your own browser, the page never touches a server. Converted content can include confidential dashboards, internal documentation, or personal correspondence saved from the web. Paste, render, download — three steps, zero uploads, zero cost."
  ]}
      useCases={[
    {
      "title": "Order & Ticket Receipts",
      "description": "Save e-commerce order pages and e-tickets as PDFs that never expire with the website."
    },
    {
      "title": "Documentation Snapshots",
      "description": "Archive technical documentation or API references at a specific version for offline teams."
    },
    {
      "title": "Design Approvals",
      "description": "Send clients a fixed PDF mockup of a web page so feedback refers to a stable version."
    },
    {
      "title": "Legal Records",
      "description": "Preserve web content as evidence with a timestamped, fixed-layout copy of the page."
    },
    {
      "title": "HTML Report Templates",
      "description": "Generate reports from HTML templates and deliver them as professional PDF files."
    }
  ]}
      tips={[
    "Self-contained HTML converts best — inline CSS and embedded images rather than external links.",
    "Pages that load content with JavaScript may need the fully rendered HTML; save the page from your browser first, then upload the file.",
    "Set landscape orientation for wide tables and dashboards so nothing gets clipped at the page edge.",
    "Check page breaks in the preview; add CSS page-break rules in your HTML to control where pages split.",
    "For receipts and confirmations, capture the page right after loading — session pages often expire later.",
    "White backgrounds print better; if the page has a dark theme, switch it to light before converting."
  ]}
      relatedTools={[
    {
      "name": "Text to PDF",
      "href": "/text-to-pdf"
    },
    {
      "name": "Word to PDF",
      "href": "/word-to-pdf"
    },
    {
      "name": "PDF to JPG",
      "href": "/pdf-to-jpg"
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
      "name": "Sign PDF",
      "href": "/sign-pdf"
    }
  ]}
      faqItems={[
    {
      "question": "Will the PDF look exactly like the web page?",
      "answer": "Very close. The page is rendered with a real browser engine before printing to PDF, so styling, colors, and layout carry over. Features that require scrolling or interaction become their visible state on the page."
    },
    {
      "question": "Can I convert a live URL instead of HTML code?",
      "answer": "The tool works on markup you provide — paste the page’s HTML or upload a saved .html file. Saving the page from your browser first gives you complete, rendered markup to work with."
    },
    {
      "question": "Do external images and fonts load during conversion?",
      "answer": "Rendering happens in your browser with your network, so external assets referenced by the HTML can load if reachable. Inline assets always work, even offline."
    },
    {
      "question": "Is the converted page uploaded to any server?",
      "answer": "No. Your HTML is rendered to PDF entirely within your browser. Nothing about the content or its source is transmitted anywhere."
    },
    {
      "question": "Which page sizes are supported?",
      "answer": "Standard paper sizes such as A4 and Letter, in portrait or landscape orientation — choose whichever suits the content you are capturing."
    },
    {
      "question": "Can I control where page breaks happen?",
      "answer": "Yes — add standard CSS page-break properties in your HTML. The renderer respects them, letting you push a heading or table cleanly onto the next page."
    }
  ]}
    >
      <DynamicToolLoader toolSlug="html-to-pdf" />
    </ToolSeoPage>
  );
}
