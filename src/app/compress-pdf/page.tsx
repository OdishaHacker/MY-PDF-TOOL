'use client';
import dynamic from 'next/dynamic';

const CompressPdf = dynamic(() => import('../../components/pdf-tools/CompressPdf'), { ssr: false });

export default function CompressPdfPage() {
  return <CompressPdf />;
}
