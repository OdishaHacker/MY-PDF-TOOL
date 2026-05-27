'use client';
import dynamic from 'next/dynamic';

const AddWatermark = dynamic(() => import('../../components/pdf-tools/AddWatermark'), { ssr: false });

export default function AddWatermarkPage() {
  return <AddWatermark />;
}
