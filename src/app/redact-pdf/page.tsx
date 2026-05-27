'use client';
import dynamic from 'next/dynamic';

const RedactPdf = dynamic(() => import('../../components/pdf-tools/RedactPdf'), { ssr: false });

export default function RedactPdfPage() {
  return <RedactPdf />;
}
