'use client';
import dynamic from 'next/dynamic';

const EditPdf = dynamic(() => import('../../components/pdf-tools/EditPdf'), { ssr: false });

export default function EditPdfPage() {
  return <EditPdf />;
}
