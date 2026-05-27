'use client';
import dynamic from 'next/dynamic';

const OrganizePdf = dynamic(() => import('../../components/pdf-tools/OrganizePdf'), { ssr: false });

export default function OrganizePdfPage() {
  return <OrganizePdf />;
}
