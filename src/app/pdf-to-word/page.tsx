'use client';
import dynamic from 'next/dynamic';

const PdfToWord = dynamic(() => import('../../components/pdf-tools/PdfToWord'), { ssr: false });

export default function PdfToWordPage() {
  return <PdfToWord />;
}
