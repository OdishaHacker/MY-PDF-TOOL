'use client';
import dynamic from 'next/dynamic';

const WordToPdf = dynamic(() => import('../../components/pdf-tools/WordToPdf'), { ssr: false });

export default function WordToPdfPage() {
  return <WordToPdf />;
}
