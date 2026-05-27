'use client';
import dynamic from 'next/dynamic';

const RepairPdf = dynamic(() => import('../../components/pdf-tools/RepairPdf'), { ssr: false });

export default function RepairPdfPage() {
  return <RepairPdf />;
}
