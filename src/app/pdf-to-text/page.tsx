'use client';
import dynamic from 'next/dynamic';

const PdfToText = dynamic(() => import('../../components/pdf-tools/PdfToText'), { ssr: false });

export default function PdfToTextPage() {
  return <PdfToText />;
}
