'use client';
import dynamic from 'next/dynamic';

const SplitPdf = dynamic(() => import('../../components/pdf-tools/SplitPdf'), { ssr: false });

export default function SplitPdfPage() {
  return <SplitPdf />;
}
