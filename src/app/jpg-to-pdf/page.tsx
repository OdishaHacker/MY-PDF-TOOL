'use client';
import dynamic from 'next/dynamic';

const JpgToPdf = dynamic(() => import('../../components/pdf-tools/JpgToPdf'), { ssr: false });

export default function JpgToPdfPage() {
  return <JpgToPdf />;
}
