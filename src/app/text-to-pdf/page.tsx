'use client';
import dynamic from 'next/dynamic';

const TextToPdf = dynamic(() => import('../../components/pdf-tools/TextToPdf'), { ssr: false });

export default function TextToPdfPage() {
  return <TextToPdf />;
}
