'use client';
import dynamic from 'next/dynamic';

const SignPdf = dynamic(() => import('../../components/pdf-tools/SignPdf'), { ssr: false });

export default function SignPdfPage() {
  return <SignPdf />;
}
