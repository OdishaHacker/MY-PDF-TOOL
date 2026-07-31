import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import ToolSeoPage from '@/components/ToolSeoPage';
import ToolPageSkeleton from '@/components/ToolPageSkeleton';

const SignPdf = dynamic(() => import('../../components/pdf-tools/SignPdf'), {
  ssr: false,
  loading: () => <ToolPageSkeleton />,
});

export const metadata: Metadata = {
  title: 'Sign PDF Online Free — Add Electronic Signature to PDF | mypdftools',
  description:
    'Draw, type, or upload an electronic signature to sign PDF documents online for free. No signup, 100% private.',
  keywords: ['sign pdf', 'electronic signature pdf', 'sign pdf online free', 'digital signature pdf'],
  alternates: { canonical: 'https://mypdftools.in/sign-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Sign PDF Documents Online Free"
      description="Draw your signature, type styled signatures, or upload signature images to sign contracts and forms."
      slug="sign-pdf"
      category="Security & Edit"
      howToUseSteps={[
        'Upload your contract or PDF form.',
        'Draw your signature on the digital pad, type your name, or upload an image signature.',
        'Drag and position your signature onto the PDF page.',
        'Click "Sign PDF" to burn the signature into the document and download.',
      ]}
      aboutContent="Sign PDF lets you electronically sign agreements, lease forms, and tax documents in seconds without printing or scanning paper."
      faqItems={[
        {
          question: 'Are electronic signatures legally binding?',
          answer: 'Yes, electronic signatures are legally recognized for most commercial and personal contracts.',
        },
      ]}
    >
      <SignPdf onBack={() => {}} />
    </ToolSeoPage>
  );
}
