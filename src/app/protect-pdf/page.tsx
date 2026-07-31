import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import ToolSeoContent from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'Protect PDF Online Free — Add Password to PDF | mypdftools',
  description: 'Add password protection to your PDF files. Encrypt PDFs with a password to prevent unauthorized access. Free, no upload, browser-based.',
  keywords: ['protect pdf', 'password protect pdf', 'encrypt pdf', 'lock pdf', 'secure pdf', 'add password to pdf'],
  alternates: { canonical: 'https://mypdftools.in/protect-pdf/' },
  openGraph: { title: 'Protect PDF Free | mypdftools', description: 'Add password protection to PDF files. Free, browser-based.', url: 'https://mypdftools.in/protect-pdf/', siteName: 'mypdftools', type: 'website' },
};

export default function Page() {
  return (
    <>
      <ToolClient />
      <ToolSeoContent
        title="Password Protect PDF — Free Online Tool"
        description="Secure your PDF documents by adding password protection and encryption. Prevent unauthorized access to sensitive documents like contracts, financial reports, and personal files. The encryption process happens entirely in your browser — your confidential files never leave your device."
        howTo={['Upload the PDF file you want to protect.', 'Enter a strong password.', 'Choose encryption settings if available.', 'Download your password-protected PDF.']}
        features={['Strong AES encryption', 'Custom password protection', 'Prevent unauthorized access', 'No server uploads — 100% private', 'Works with any PDF file', 'Fast encryption process', 'No registration needed', 'Completely free']}
        faqs={[
          { q: 'How strong is the encryption?', a: 'Our tool uses industry-standard encryption to protect your PDF files, making them unreadable without the correct password.' },
          { q: 'Can I remove the password later?', a: 'Yes, use our Unlock PDF tool to remove the password from a protected PDF (you will need to know the current password).' },
          { q: 'Is my password stored anywhere?', a: 'No. Your password is used only during the encryption process in your browser and is never transmitted or stored.' },
        ]}
        relatedTools={[{ name: 'Unlock PDF', href: '/unlock-pdf/' }, { name: 'Sign PDF', href: '/sign-pdf/' }, { name: 'Redact PDF', href: '/redact-pdf/' }, { name: 'Compress PDF', href: '/compress-pdf/' }]}
      />
    </>
  );
}
