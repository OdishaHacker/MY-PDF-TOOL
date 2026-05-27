'use client';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const ToolComponent = dynamic(() => import('../../components/pdf-tools/RepairPdf'), { ssr: false });

export default function Page() {
  const router = useRouter();
  return <ToolComponent onBack={() => router.push('/')} />;
}
