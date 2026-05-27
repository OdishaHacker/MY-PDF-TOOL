'use client';
import dynamic from 'next/dynamic';

const CropPdf = dynamic(() => import('../../components/pdf-tools/CropPdf'), { ssr: false });

export default function CropPdfPage() {
  return <CropPdf />;
}
