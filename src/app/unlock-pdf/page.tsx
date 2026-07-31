import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import ToolSeoContent from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'Unlock PDF Online Free — Remove PDF Password | mypdftools',
  description: 'Remove password protection from PDF files. Unlock encrypted PDFs to edit, print, and copy content. Free, no upload, browser-based.',
  keywords: ['unlock pdf', 'remove pdf password', 'pdf unlocker', 'decrypt pdf', 'remove pdf protection', 'unlock pdf online free'],
  alternates: { canonical: 'https://mypdftools.in/unlock-pdf/' },
  openGraph: { title: 'Unlock PDF Free | mypdftools', description: 'Remove PDF password protection. Free, browser-based.', url: 'https://mypdftools.in/unlock-pdf/', siteName: 'mypdftools', type: 'website' },
};

export default function Page() {
  return (
    <>
      <ToolClient />
      <ToolSeoContent
        title="Unlock Password-Protected PDFs — Free Online Tool"
        description="Remove password protection from your PDF files so you can freely edit, print, and copy content. Simply enter the document password and our tool will create an unlocked version. Processing happens entirely in your browser — your sensitive documents and passwords remain private."
        howTo={['Upload your password-protected PDF.', 'Enter the document password.', 'Click "Unlock" to remove the password protection.', 'Download the unlocked PDF.']}
        features={['Remove open and permission passwords', 'Enable editing, printing, and copying', 'No server uploads — 100% private', 'Your password stays on your device', 'Fast processing', 'Works on all devices', 'No registration needed', 'Completely free']}
        faqs={[
          { q: 'Do I need to know the password to unlock the PDF?', a: 'Yes, you must provide the correct password to decrypt and unlock the PDF file. This tool does not crack or bypass passwords.' },
          { q: 'Is unlocking a PDF legal?', a: 'Yes, if you are the owner of the document or have authorization to access it. This tool is meant for legitimate use with documents you have the right to unlock.' },
          { q: 'Will the content be affected?', a: 'No, unlocking only removes the password restriction. All content, formatting, and images remain exactly the same.' },
        ]}
        relatedTools={[{ name: 'Protect PDF', href: '/protect-pdf/' }, { name: 'Edit PDF', href: '/edit-pdf/' }, { name: 'Merge PDF', href: '/merge-pdf/' }, { name: 'Compress PDF', href: '/compress-pdf/' }]}
      />
    </>
  );
}
