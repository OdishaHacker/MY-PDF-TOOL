import type { Metadata } from 'next';
import ToolSeoPage from '@/components/ToolSeoPage';
import DynamicToolLoader from '@/components/DynamicToolLoader';

export const metadata: Metadata = {
  title: 'Unlock PDF Online Free — Remove Password from PDF | mypdftools',
  description:
    'Remove password security restrictions from PDF files online. Unlock PDF documents for free in your browser.',
  keywords: ['unlock pdf', 'remove pdf password', 'pdf password remover free', 'unlock pdf online'],
  alternates: { canonical: 'https://mypdftools.in/unlock-pdf/' },
};

export default function Page() {
  return (
    <ToolSeoPage
      title="Remove Password from PDF Files"
      description="Unlock password-protected PDF files to remove open restrictions and enable editing or printing."
      slug="unlock-pdf"
      category="Security"
      howToUseSteps={[
        'Upload your password-protected PDF file.',
        'Enter the correct password when prompted.',
        'Click "Unlock PDF" to remove security encryption.',
        'Download your unlocked, password-free PDF.',
      ]}
      aboutContent="Remove owner passwords and printing restrictions from PDFs you own so you can edit and share them easily."
      faqItems={[
        {
          question: 'Do I need to know the original password?',
          answer: 'Yes, for user-encrypted PDFs you must provide the password once to decrypt the file stream.',
        },
      ]}
    >
      <DynamicToolLoader toolSlug="unlock-pdf" />
    </ToolSeoPage>
  );
}
