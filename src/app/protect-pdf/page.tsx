'use client';
import dynamic from 'next/dynamic';

const ProtectPdf = dynamic(() => import('../../components/pdf-tools/ProtectPdf'), { ssr: false });

export default function ProtectPdfPage() {
  return <ProtectPdf />;
}
