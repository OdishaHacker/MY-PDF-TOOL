import type { Metadata } from 'next';
import ToolClient from './ToolClient';
import ToolSeoContent from '@/components/ToolSeoContent';

export const metadata: Metadata = {
  title: 'Sign PDF Online Free — Add Signature to PDF | mypdftools',
  description: 'Add your signature to PDF documents for free. Draw, type, or upload your signature. No upload, works in your browser. Legally sign documents online.',
  keywords: ['sign pdf', 'add signature to pdf', 'pdf signature', 'e-sign pdf', 'electronic signature pdf', 'sign pdf online free'],
  alternates: { canonical: 'https://mypdftools.in/sign-pdf/' },
  openGraph: { title: 'Sign PDF Online Free | mypdftools', description: 'Add your signature to PDF documents. Free, browser-based.', url: 'https://mypdftools.in/sign-pdf/', siteName: 'mypdftools', type: 'website' },
};

export default function Page() {
  return (
    <>
      <ToolClient />
      <ToolSeoContent
        title="Sign PDF Documents Online — Free E-Signature Tool"
        description="Add your signature to any PDF document without printing or scanning. Draw your signature with a mouse or touchscreen, type it with a custom font, or upload an image of your signature. Position it precisely on the document and download the signed PDF. Everything happens in your browser — your sensitive documents remain private."
        howTo={['Upload the PDF document you need to sign.', 'Draw, type, or upload your signature.', 'Drag and position the signature on the correct page and location.', 'Download the signed PDF document.']}
        features={['Draw signature with mouse or touch', 'Type signature with stylish fonts', 'Upload signature image', 'Resize and reposition freely', 'Multi-page support', 'No server uploads — 100% private', 'No watermarks', 'Free and unlimited']}
        faqs={[
          { q: 'Is an electronic signature legally valid?', a: 'Electronic signatures are legally recognized in most countries under laws like the ESIGN Act (US) and eIDAS (EU). However, for highly sensitive legal documents, check your local regulations.' },
          { q: 'Can I sign multiple pages?', a: 'Yes, you can add your signature to multiple pages within the same document.' },
          { q: 'Is my signature data stored?', a: 'No. Since everything runs in your browser, your signature is never sent to or stored on any server.' },
        ]}
        relatedTools={[{ name: 'Edit PDF', href: '/edit-pdf/' }, { name: 'Protect PDF', href: '/protect-pdf/' }, { name: 'Add Watermark', href: '/add-watermark/' }, { name: 'Merge PDF', href: '/merge-pdf/' }]}
      />
    </>
  );
}
