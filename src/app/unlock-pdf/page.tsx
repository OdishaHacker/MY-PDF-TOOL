'use client';
import dynamic from 'next/dynamic';

const UnlockPdf = dynamic(() => import('../../components/pdf-tools/UnlockPdf'), { ssr: false });

export default function UnlockPdfPage() {
  return <UnlockPdf />;
}
