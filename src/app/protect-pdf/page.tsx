import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';
import { toolMeta } from '@/lib/toolMeta';

const meta = toolMeta.find((t) => t.slug === 'protect-pdf')!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: 'https://mypdftools.in/protect-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Password Protect PDF Files"
      description="Add password protection to your PDF so only intended readers can open it. Encrypted locally in your browser — your file stays yours."
      slug="protect-pdf"
      category="Security"
      howToUseSteps={[
    "Drop your PDF into the dropzone to load it locally.",
    "Enter a strong password — long phrases beat short complex codes.",
    "Click \"Protect\" to encrypt the document in your browser.",
    "Download the protected PDF — it now asks for the password on opening.",
    "Share the password through a different channel than the file itself."
  ]}
      aboutContent="The mypdftools Protect tool encrypts your PDF with a password so it cannot be opened without it. The encryption runs entirely in your browser — the unencrypted document never touches any server, and only you ever see the password."
      aboutParagraphs={[
    "Some documents are simply not for everyone: salary structures, medical reports, unpublished manuscripts, board minutes, tender prices. Email can be forwarded, cloud links can be shared, and once a file escapes you cannot call it back. A password-protected PDF carries its own lock — whoever holds the file still cannot read it without the password.",
    "The protection is real encryption applied to the document, not a viewer gimmick. When you set a password, the tool encrypts the file locally before it is saved; the copy that leaves your device is already locked. PDF readers everywhere — Adobe, browsers, phones — understand the standard and prompt for the password on opening.",
    "Choose the password like you would choose a key: length beats cleverness. A four-word passphrase is far stronger than an eight-character scramble, and infinitely easier to type on a phone. And remember the golden rule of document security — send the file and the password through different channels."
  ]}
      useCases={[
    {
      "title": "Confidential Reports",
      "description": "Lock financial and strategy documents before they travel by email or file transfer."
    },
    {
      "title": "Personal Records",
      "description": "Protect scans of IDs, tax documents, and medical records stored or shared digitally."
    },
    {
      "title": "Client Deliverables",
      "description": "Deliver contracted work products with password protection as agreed with the client."
    },
    {
      "title": "Exam & Assessment Files",
      "description": "Secure question papers and answer keys until the moment of release."
    },
    {
      "title": "Archive Security",
      "description": "Encrypt sensitive archives on USB drives and cloud folders as a second layer."
    }
  ]}
      tips={[
    "Use a passphrase of three or more unrelated words — long and memorable beats short and complex.",
    "Never send the password in the same email as the file — use a call, SMS, or chat message instead.",
    "Test the protected file once yourself before distributing it: close it, reopen it, enter the password.",
    "Store the password in your password manager the moment you set it — locked files with lost passwords stay locked.",
    "Protect after all other edits: compress, merge, and number first, then lock the final version.",
    "Need to remove protection later? Unlock PDF does it when you know the password."
  ]}
      relatedGuides={[
    {
      "name": "Password Protect PDF with AES-256",
      "href": "/blog/protect-pdf-password"
    },
    {
      "name": "7 Essential PDF Security Tips",
      "href": "/blog/pdf-security-tips"
    },
    {
      "name": "PDF Metadata: Hidden Info in Your Files",
      "href": "/blog/pdf-metadata-hidden-info"
    }
  ]}

      relatedTools={[
    {
      "name": "Unlock PDF",
      "href": "/unlock-pdf"
    },
    {
      "name": "Redact PDF",
      "href": "/redact-pdf"
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
    },
    {
      "name": "Split PDF",
      "href": "/split-pdf"
    }
  ]}
      faqItems={[
    {
      "question": "Can I recover a protected PDF if I forget the password?",
      "answer": "No — that is what the protection means. The file is genuinely encrypted. Save the password in a password manager the moment you set it."
    },
    {
      "question": "Will every PDF reader ask for the password?",
      "answer": "Yes. Standard PDF encryption is supported by Adobe Reader, Chrome, Edge, Firefox, Preview on Mac, and mobile readers — all prompt for the password before opening."
    },
    {
      "question": "Is my document uploaded during protection?",
      "answer": "No. Encryption happens entirely inside your browser. The unlocked document never leaves your device — only the already-protected file is saved."
    },
    {
      "question": "Does the tool store my password?",
      "answer": "No. The password is used in your browser for the encryption step and is never transmitted or stored anywhere."
    },
    {
      "question": "What makes a good PDF password?",
      "answer": "Length first: a passphrase of 12+ characters. Add a number or symbol if the document is highly sensitive, and never reuse passwords from other accounts."
    },
    {
      "question": "Can I remove the password later?",
      "answer": "Yes — with the password. Use the Unlock PDF tool, enter the password once, and save an unprotected copy for your own records."
    }
  ]}
    >
      <DynamicToolLoader toolSlug="protect-pdf" />
    </ToolSeoPage>
  );
}
