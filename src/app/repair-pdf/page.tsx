import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import ToolSeoContent from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'Repair PDF Online Free — Fix Corrupted PDF Files | mypdftools',
  description: 'Repair corrupted or damaged PDF files. Recover content from broken PDFs. Free, no upload, works in your browser.',
  keywords: ['repair pdf', 'fix corrupted pdf', 'pdf repair', 'recover pdf', 'broken pdf fix', 'damaged pdf repair'],
  alternates: { canonical: 'https://mypdftools.in/repair-pdf/' },
  openGraph: { title: 'Repair PDF Free | mypdftools', description: 'Fix corrupted PDF files. Free, browser-based.', url: 'https://mypdftools.in/repair-pdf/', siteName: 'mypdftools', type: 'website' },
};

export default function Page() {
  return (
    <>
      <ToolClient />
      <ToolSeoContent
        title="Repair Corrupted PDF Files — Free Online Tool"
        description="Fix damaged or corrupted PDF files that won't open properly. Our repair tool attempts to recover the content and structure of broken PDFs, saving your important documents from being lost. All processing happens locally in your browser for complete privacy and security."
        howTo={['Upload your corrupted or damaged PDF file.', 'The tool analyzes and attempts to repair the file structure.', 'Review the repaired document.', 'Download the fixed PDF.']}
        features={['Fix corrupted PDF structures', 'Recover content from damaged files', 'No server uploads — 100% private', 'Works with various corruption types', 'Fast analysis and repair', 'Free and unlimited', 'No registration needed', 'Works on all devices']}
        faqs={[
          { q: 'Can all corrupted PDFs be repaired?', a: 'Not all corruption can be fixed. Our tool handles common issues like broken cross-reference tables and malformed objects. Severely damaged files may not be fully recoverable.' },
          { q: 'Will the repaired PDF look the same?', a: 'In most cases, yes. The tool preserves as much of the original content and formatting as possible during repair.' },
        ]}
        relatedTools={[{ name: 'Compress PDF', href: '/compress-pdf/' }, { name: 'Merge PDF', href: '/merge-pdf/' }, { name: 'Unlock PDF', href: '/unlock-pdf/' }, { name: 'Edit PDF', href: '/edit-pdf/' }]}
      />
    </>
  );
}
