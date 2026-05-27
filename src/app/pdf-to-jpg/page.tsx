'use client';
import dynamic from 'next/dynamic';

const PdfToJpg = dynamic(() => import('../../components/pdf-tools/PdfToJpg'), { ssr: false });

export default function PdfToJpgPage() {
  return <PdfToJpg />;
}
