import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import ToolSeoPage from '@/components/ToolSeoPage';
import ToolPageSkeleton from '@/components/ToolPageSkeleton';

const ProtectPdf = dynamic(() => import('../../components/pdf-tools/ProtectPdf'), {
  ssr: false,
  loading: () => <ToolPageSkeleton />,
});

export const metadata: Metadata = {
  title: 'Password Protect PDF Free — Encrypt PDF Online | mypdftools',
  description:
    'Encrypt your PDF files with strong password protection. Secure PDF documents online for free without uploading files.',
  keywords: ['protect pdf', 'password protect pdf', 'encrypt pdf free', 'secure pdf online'],
  alternates: { canonical: 'https://mypdftools.in/protect-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Password Protect PDF Files"
      description="Encrypt confidential PDF documents with strong user passwords to prevent unauthorized opening or printing."
      slug="protect-pdf"
      category="Security"
      howToUseSteps={[
        'Upload the PDF document you want to secure.',
        'Enter and confirm your chosen password.',
        'Click "Protect PDF" to encrypt the file with AES encryption.',
        'Download your password-protected PDF.',
      ]}
      aboutContent="Secure sensitive PDF documents with robust 128-bit AES encryption. Passwords and encryption keys are processed locally on your device."
      faqItems={[
        {
          question: 'Do you store my password or files?',
          answer: 'Never! Encryption happens in your web browser. We have zero knowledge of your password or documents.',
        },
      ]}
    >
      <ProtectPdf onBack={() => {}} />
    </ToolSeoPage>
  );
}
