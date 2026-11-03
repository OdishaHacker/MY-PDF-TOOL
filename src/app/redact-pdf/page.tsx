import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';
import { toolMeta } from '@/lib/toolMeta';

const meta = toolMeta.find((t) => t.slug === 'redact-pdf')!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: 'https://mypdftools.in/redact-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Redact & Blackout PDF Content"
      description="Permanently black out sensitive text and numbers in your PDF before sharing. Visual redaction, processed locally — nothing is uploaded."
      slug="redact-pdf"
      category="Security"
      howToUseSteps={[
    "Drop your PDF into the dropzone to open the redaction canvas.",
    "Drag boxes over every piece of sensitive content — names, amounts, account numbers.",
    "Adjust each box until the sensitive area is fully covered.",
    "Apply the redaction to burn the black boxes into the pages.",
    "Download the redacted PDF and verify the hidden areas are unreadable."
  ]}
      aboutContent="The mypdftools Redact tool covers sensitive content with solid black boxes and burns them into the page so the information cannot be read or recovered. Redact IDs, bank details, and private names before sharing — privately, in your own browser."
      aboutParagraphs={[
    "Sharing a document often means hiding part of it first. Salary figures before sharing a contract with a third party, patient names before publishing a case study, account numbers before filing a complaint, exam answers before distributing the paper. Redaction is the professional way to do it — opaque, permanent, and verifiable.",
    "The critical difference is between covering and redacting. Drawing a black rectangle in an image editor covers the pixels but leaves the text underneath selectable — anyone clicking and dragging recovers the secret instantly. Proper redaction burns the black box into the document so the covered content is genuinely unreadable in the output file.",
    "The redaction canvas is visual: drag a box over each item, size it precisely, and apply. Everything runs locally in your browser, which is exactly what you want — the most sensitive step of document handling happens on your own machine, never on someone else’s server."
  ]}
      useCases={[
    {
      "title": "Legal & Compliance",
      "description": "Redact privileged clauses and third-party names before disclosing documents externally."
    },
    {
      "title": "Financial Privacy",
      "description": "Black out account numbers, card digits, and balances before sharing statements as proof."
    },
    {
      "title": "Medical Records",
      "description": "Remove patient identifiers from case documents used in training or presentations."
    },
    {
      "title": "Government Filings",
      "description": "Redact personal data from documents submitted to public portals and RTI responses."
    },
    {
      "title": "Education",
      "description": "Hide answer keys and marking schemes before releasing practice papers to students."
    }
  ]}
      tips={[
    "Cover the whole item with margin to spare — partial boxes can leave characters readable at the edges.",
    "Redact every occurrence: search the document for the name or number before you finish.",
    "Headers, footers, and stamps can repeat sensitive data — check every page, not just the body.",
    "Verify the output: open the saved file and try to select text under each box — it must be unreadable.",
    "Keep the original unredacted file separately; redaction is for the copy you share.",
    "Metadata can carry names too — for highly sensitive releases, re-create the document rather than only redacting."
  ]}
      relatedGuides={[
    {
      "name": "PDF Metadata: Hidden Info in Your Files",
      "href": "/blog/pdf-metadata-hidden-info"
    },
    {
      "name": "7 Essential PDF Security Tips",
      "href": "/blog/pdf-security-tips"
    },
    {
      "name": "Password Protect PDF with AES-256",
      "href": "/blog/protect-pdf-password"
    }
  ]}

      relatedTools={[
    {
      "name": "Protect PDF",
      "href": "/protect-pdf"
    },
    {
      "name": "Edit PDF",
      "href": "/edit-pdf"
    },
    {
      "name": "Split PDF",
      "href": "/split-pdf"
    },
    {
      "name": "Crop PDF",
      "href": "/crop-pdf"
    },
    {
      "name": "Compress PDF",
      "href": "/compress-pdf"
    },
    {
      "name": "Merge PDF",
      "href": "/merge-pdf"
    }
  ]}
      faqItems={[
    {
      "question": "Is the redacted content really removed?",
      "answer": "The black boxes are burned into the pages so the covered content is not readable or selectable in the output. After redacting, open the saved file and try selecting under a box — nothing readable should appear."
    },
    {
      "question": "Can I redact only certain pages?",
      "answer": "Yes. You place boxes exactly where needed, page by page — pages without sensitive content simply receive no boxes."
    },
    {
      "question": "Why not just draw a black box in an image editor?",
      "answer": "Image-editor boxes often sit on top of selectable text — copy-paste or a text extractor recovers what is underneath. Proper redaction burns the box into the document so the content cannot be recovered."
    },
    {
      "question": "Is my document uploaded during redaction?",
      "answer": "No. Redaction runs entirely in your browser. Sensitive documents stay on your device through the whole process."
    },
    {
      "question": "Can redaction be undone?",
      "answer": "Not from the output file — that is the point. Keep your original document if you may need the unredacted version later."
    },
    {
      "question": "Does redaction change the rest of my document?",
      "answer": "No. Only the boxed areas are covered; all other text, images, and formatting remain exactly as they were."
    }
  ]}
    >
      <DynamicToolLoader toolSlug="redact-pdf" />
    </ToolSeoPage>
  );
}
