'use client';
import dynamic from 'next/dynamic';

const PdfToExcel = dynamic(() => import('../../components/pdf-tools/PdfToExcel'), { ssr: false });

export default function PdfToExcelPage() {
  return <PdfToExcel />;
}
