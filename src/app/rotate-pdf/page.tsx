'use client';
import dynamic from 'next/dynamic';

const RotatePdf = dynamic(() => import('../../components/pdf-tools/RotatePdf'), { ssr: false });

export default function RotatePdfPage() {
  return <RotatePdf />;
}
