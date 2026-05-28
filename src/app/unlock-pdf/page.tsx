'use client';
import dynamic from 'next/dynamic';
import ToolPageSkeleton from '@/components/ToolPageSkeleton';
import { useRouter } from 'next/navigation';

const ToolComponent = dynamic(() => import('../../components/pdf-tools/UnlockPdf'), { ssr: false, loading: () => <ToolPageSkeleton /> });

export default function Page() {
  const router = useRouter();
  return <ToolComponent onBack={() => router.push('/')} />;
}
