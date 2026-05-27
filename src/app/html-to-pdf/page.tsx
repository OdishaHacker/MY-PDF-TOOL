'use client';
import dynamic from 'next/dynamic';

const HtmlToPdf = dynamic(() => import('../../components/pdf-tools/HtmlToPdf'), { ssr: false });

export default function HtmlToPdfPage() {
  return <HtmlToPdf />;
}
