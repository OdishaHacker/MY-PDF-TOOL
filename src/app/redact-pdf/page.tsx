import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import ToolSeoContent from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'Redact PDF Online Free — Black Out Sensitive Text | mypdftools',
  description: 'Permanently redact sensitive information from PDF files. Black out text, images, and data. Free, no upload, works in your browser.',
  keywords: ['redact pdf', 'black out text in pdf', 'censor pdf', 'hide text in pdf', 'pdf redaction', 'remove sensitive info from pdf'],
  alternates: { canonical: 'https://mypdftools.in/redact-pdf/' },
  openGraph: { title: 'Redact PDF Free | mypdftools', description: 'Black out sensitive information in PDFs. Free, browser-based.', url: 'https://mypdftools.in/redact-pdf/', siteName: 'mypdftools', type: 'website' },
};

export default function Page() {
  return (
    <>
      <ToolClient />
      <ToolSeoContent
        title="Redact Sensitive Information from PDF — Free Online Tool"
        description="Permanently remove sensitive information from your PDF documents by blacking out text, numbers, images, or any content you want to hide. Unlike simply covering text with a shape, proper redaction permanently removes the underlying data so it cannot be recovered. Processing happens entirely in your browser for maximum security."
        howTo={['Upload your PDF file.', 'Select the areas you want to redact by clicking or drawing boxes.', 'Apply the redaction to permanently black out the selected areas.', 'Download the redacted PDF.']}
        features={['Permanent content removal — not just visual covering', 'Select text or draw redaction boxes', 'Black out any area on any page', 'No server uploads — 100% secure', 'GDPR and compliance-friendly', 'Works on all devices', 'Free and unlimited', 'No registration needed']}
        faqs={[
          { q: 'Is the redacted information truly removed?', a: 'Yes, proper redaction permanently removes the underlying content from the file. Unlike placing a black box over text, redacted content cannot be selected, searched, or recovered.' },
          { q: 'Can I redact specific text throughout the document?', a: 'You can select individual areas on each page to redact. For document-wide redaction, you would need to mark each occurrence.' },
          { q: 'Is this suitable for legal documents?', a: 'Our redaction tool permanently removes content, making it suitable for legal and compliance purposes. Always verify the output to ensure all sensitive data has been properly redacted.' },
        ]}
        relatedTools={[{ name: 'Edit PDF', href: '/edit-pdf/' }, { name: 'Protect PDF', href: '/protect-pdf/' }, { name: 'Sign PDF', href: '/sign-pdf/' }, { name: 'Crop PDF', href: '/crop-pdf/' }]}
      />
    </>
  );
}
