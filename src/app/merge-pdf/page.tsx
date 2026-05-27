'use client';
import dynamic from 'next/dynamic';

const MergePdf = dynamic(() => import('../../components/pdf-tools/MergePdf'), { ssr: false });

export default function MergePdfPage() {
  return <MergePdf />;
}
