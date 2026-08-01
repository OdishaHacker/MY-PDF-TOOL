'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import ToolPageSkeleton from '@/components/ToolPageSkeleton';

const MergePdf = dynamic(() => import('./pdf-tools/MergePdf'), { ssr: false, loading: () => <ToolPageSkeleton /> });
const SplitPdf = dynamic(() => import('./pdf-tools/SplitPdf'), { ssr: false, loading: () => <ToolPageSkeleton /> });
const CompressPdf = dynamic(() => import('./pdf-tools/CompressPdf'), { ssr: false, loading: () => <ToolPageSkeleton /> });
const OrganizePdf = dynamic(() => import('./pdf-tools/OrganizePdf'), { ssr: false, loading: () => <ToolPageSkeleton /> });
const RotatePdf = dynamic(() => import('./pdf-tools/RotatePdf'), { ssr: false, loading: () => <ToolPageSkeleton /> });
const RepairPdf = dynamic(() => import('./pdf-tools/RepairPdf'), { ssr: false, loading: () => <ToolPageSkeleton /> });
const JpgToPdf = dynamic(() => import('./pdf-tools/JpgToPdf'), { ssr: false, loading: () => <ToolPageSkeleton /> });
const WordToPdf = dynamic(() => import('./pdf-tools/WordToPdf'), { ssr: false, loading: () => <ToolPageSkeleton /> });
const ExcelToPdf = dynamic(() => import('./pdf-tools/ExcelToPdf'), { ssr: false, loading: () => <ToolPageSkeleton /> });
const HtmlToPdf = dynamic(() => import('./pdf-tools/HtmlToPdf'), { ssr: false, loading: () => <ToolPageSkeleton /> });
const TextToPdf = dynamic(() => import('./pdf-tools/TextToPdf'), { ssr: false, loading: () => <ToolPageSkeleton /> });
const PdfToJpg = dynamic(() => import('./pdf-tools/PdfToJpg'), { ssr: false, loading: () => <ToolPageSkeleton /> });
const PdfToWord = dynamic(() => import('./pdf-tools/PdfToWord'), { ssr: false, loading: () => <ToolPageSkeleton /> });
const PdfToExcel = dynamic(() => import('./pdf-tools/PdfToExcel'), { ssr: false, loading: () => <ToolPageSkeleton /> });
const PdfToPowerpoint = dynamic(() => import('./pdf-tools/PdfToPowerpoint'), { ssr: false, loading: () => <ToolPageSkeleton /> });
const PdfToText = dynamic(() => import('./pdf-tools/PdfToText'), { ssr: false, loading: () => <ToolPageSkeleton /> });
const EditPdf = dynamic(() => import('./pdf-tools/EditPdf'), { ssr: false, loading: () => <ToolPageSkeleton /> });
const AddWatermark = dynamic(() => import('./pdf-tools/AddWatermark'), { ssr: false, loading: () => <ToolPageSkeleton /> });
const PageNumbers = dynamic(() => import('./pdf-tools/PageNumbers'), { ssr: false, loading: () => <ToolPageSkeleton /> });
const CropPdf = dynamic(() => import('./pdf-tools/CropPdf'), { ssr: false, loading: () => <ToolPageSkeleton /> });
const RedactPdf = dynamic(() => import('./pdf-tools/RedactPdf'), { ssr: false, loading: () => <ToolPageSkeleton /> });
const ProtectPdf = dynamic(() => import('./pdf-tools/ProtectPdf'), { ssr: false, loading: () => <ToolPageSkeleton /> });
const UnlockPdf = dynamic(() => import('./pdf-tools/UnlockPdf'), { ssr: false, loading: () => <ToolPageSkeleton /> });
const SignPdf = dynamic(() => import('./pdf-tools/SignPdf'), { ssr: false, loading: () => <ToolPageSkeleton /> });

const toolsMap: Record<string, React.ComponentType<{ onBack?: () => void }>> = {
  'merge-pdf': MergePdf,
  'split-pdf': SplitPdf,
  'compress-pdf': CompressPdf,
  'organize-pdf': OrganizePdf,
  'rotate-pdf': RotatePdf,
  'repair-pdf': RepairPdf,
  'jpg-to-pdf': JpgToPdf,
  'word-to-pdf': WordToPdf,
  'excel-to-pdf': ExcelToPdf,
  'html-to-pdf': HtmlToPdf,
  'text-to-pdf': TextToPdf,
  'pdf-to-jpg': PdfToJpg,
  'pdf-to-word': PdfToWord,
  'pdf-to-excel': PdfToExcel,
  'pdf-to-powerpoint': PdfToPowerpoint,
  'pdf-to-text': PdfToText,
  'edit-pdf': EditPdf,
  'add-watermark': AddWatermark,
  'page-numbers': PageNumbers,
  'crop-pdf': CropPdf,
  'redact-pdf': RedactPdf,
  'protect-pdf': ProtectPdf,
  'unlock-pdf': UnlockPdf,
  'sign-pdf': SignPdf,
};

export default function DynamicToolLoader({ toolSlug }: { toolSlug: string }) {
  const Comp = toolsMap[toolSlug];
  if (!Comp) return null;
  return <Comp onBack={() => {}} />;
}
