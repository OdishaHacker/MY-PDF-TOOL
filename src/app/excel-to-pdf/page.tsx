'use client';
import dynamic from 'next/dynamic';

const ExcelToPdf = dynamic(() => import('../../components/pdf-tools/ExcelToPdf'), { ssr: false });

export default function ExcelToPdfPage() {
  return <ExcelToPdf />;
}
