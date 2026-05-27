'use client';
import dynamic from 'next/dynamic';

const PdfToPowerpoint = dynamic(() => import('../../components/pdf-tools/PdfToPowerpoint'), { ssr: false });

export default function PdfToPowerpointPage() {
  return <PdfToPowerpoint />;
}
