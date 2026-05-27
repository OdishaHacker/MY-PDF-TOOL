'use client';
import dynamic from 'next/dynamic';

const PageNumbers = dynamic(() => import('../../components/pdf-tools/PageNumbers'), { ssr: false });

export default function PageNumbersPage() {
  return <PageNumbers />;
}
